export const FLOOR_PLAN_WIDTH = 2048;
export const FLOOR_PLAN_HEIGHT = 1552;
export const MAX_FLOOR_PLAN_SCALE = 2;

type Point = { x: number; y: number };
type Padding = { left: number; right: number; top: number; bottom: number };
type Pointer = Point & { startX: number; startY: number };
// Safari exposes trackpad pinches as GestureEvents, outside the standard DOM types.
type MapGestureEvent = Event & { scale: number; clientX?: number; clientY?: number };
export type FloorPlanZoomState = { zoomPercent: number; canZoomIn: boolean; canZoomOut: boolean };

export function fitFloorPlanScale(width: number, height: number) {
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) return 0;
  return Math.min(width / FLOOR_PLAN_WIDTH, height / FLOOR_PLAN_HEIGHT, MAX_FLOOR_PLAN_SCALE);
}

export function clampFloorPlanScale(scale: number, fit: number) {
  return Math.max(fit, Math.min(MAX_FLOOR_PLAN_SCALE, scale));
}

export function scrollForFocalPoint(source: Point, scale: number, mapOrigin: Point, focal: Point,
  scroll: Point, limits: Point): Point {
  const clamp = (value: number, max: number) => Math.max(0, Math.min(Math.max(0, max), value));
  return {
    x: clamp(scroll.x + mapOrigin.x + source.x * scale - focal.x, limits.x),
    y: clamp(scroll.y + mapOrigin.y + source.y * scale - focal.y, limits.y),
  };
}

type Options = {
  onGestureStart: () => void;
  onChange: (state: FloorPlanZoomState) => void;
  // Injectable platform edges let the same controller be checked without a browser.
  getPadding?: (frame: HTMLDivElement) => Padding;
  observeResize?: (frame: HTMLDivElement, callback: () => void) => () => void;
};

export function createFloorPlanZoomController(frame: HTMLDivElement, map: HTMLDivElement, options: Options) {
  const originalWidth = map.style.width;
  const pointers = new Map<number, Pointer>();
  let scale = 1;
  let fit = 0;
  let atFit = true;
  let gestureActive = false;
  let suppressClick = false;
  let size = { width: 0, height: 0 };
  let sourceCenter: Point = { x: FLOOR_PLAN_WIDTH / 2, y: FLOOR_PLAN_HEIGHT / 2 };
  let pinch: { distance: number; scale: number; source: Point } | null = null;
  let desktopPinch: { scale: number; source: Point } | null = null;

  const padding = () => {
    if (options.getPadding) return options.getPadding(frame);
    const style = getComputedStyle(frame);
    const number = (value: string) => Number.parseFloat(value) || 0;
    return { left: number(style.paddingLeft), right: number(style.paddingRight),
      top: number(style.paddingTop), bottom: number(style.paddingBottom) };
  };
  const measure = () => {
    const p = padding();
    const rect = frame.getBoundingClientRect();
    const width = frame.clientWidth - p.left - p.right;
    const height = frame.clientHeight - p.top - p.bottom;
    return { width, height, center: {
      x: rect.left + frame.clientLeft + p.left + width / 2,
      y: rect.top + frame.clientTop + p.top + height / 2,
    } };
  };
  const sourceAt = (point: Point): Point => {
    const rect = map.getBoundingClientRect();
    return { x: (point.x - rect.left) / scale, y: (point.y - rect.top) / scale };
  };
  const rememberCenter = () => {
    const current = measure();
    // A resize can clamp scroll before ResizeObserver runs. Keep the old center
    // until the observer has reconciled the new viewport dimensions.
    if (current.width === size.width && current.height === size.height) sourceCenter = sourceAt(current.center);
  };
  const publish = () => options.onChange({ zoomPercent: Math.round(scale / fit * 100),
    canZoomIn: scale < MAX_FLOOR_PLAN_SCALE - 0.00001, canZoomOut: scale > fit + 0.00001 });
  const apply = (requested: number, source: Point, focal: Point) => {
    if (!fit) return;
    scale = clampFloorPlanScale(requested, fit);
    atFit = Math.abs(scale - fit) < 0.00001;
    map.style.width = `${FLOOR_PLAN_WIDTH * scale}px`;
    // Reading after the width write includes auto margins and the browser's
    // scroll clamping, keeping the chosen source point under the fingers.
    const rect = map.getBoundingClientRect();
    const scroll = scrollForFocalPoint(source, scale, { x: rect.left, y: rect.top }, focal,
      { x: frame.scrollLeft, y: frame.scrollTop },
      { x: frame.scrollWidth - frame.clientWidth, y: frame.scrollHeight - frame.clientHeight });
    frame.scrollLeft = scroll.x;
    frame.scrollTop = scroll.y;
    rememberCenter();
    publish();
  };
  const fitMap = () => {
    if (!fit) return;
    scale = fit;
    atFit = true;
    map.style.width = `${FLOOR_PLAN_WIDTH * scale}px`;
    frame.scrollLeft = 0;
    frame.scrollTop = 0;
    rememberCenter();
    publish();
  };
  const zoomBy = (factor: number) => {
    if (!fit) return;
    options.onGestureStart();
    const focal = measure().center;
    apply(scale * factor, sourceAt(focal), focal);
  };
  const onSurface = (target: EventTarget | null) => {
    const element = target as Element | null;
    return !!element?.closest?.("[data-map-gesture]");
  };
  const onMap = (target: EventTarget | null) => target === frame || target === map || onSurface(target);
  const consumeZoom = (event: Event) => {
    if (event.cancelable) event.preventDefault();
    event.stopPropagation();
  };
  const wheel = (event: WheelEvent) => {
    // Chrome/Firefox trackpad pinches arrive as Ctrl+wheel, not touch pointers.
    // Keep ordinary two-finger scrolling available for panning the map.
    if (!fit || !event.ctrlKey || !onMap(event.target) || !Number.isFinite(event.deltaY)) return;
    consumeZoom(event);
    if (desktopPinch || pointers.size >= 2) return;
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? frame.clientHeight : 1;
    const focal = { x: event.clientX, y: event.clientY };
    options.onGestureStart();
    apply(scale * Math.exp(-event.deltaY * unit * 0.01), sourceAt(focal), focal);
  };
  const gestureFocal = (event: MapGestureEvent): Point =>
    Number.isFinite(event.clientX) && Number.isFinite(event.clientY)
      ? { x: event.clientX!, y: event.clientY! } : measure().center;
  const gestureStart = (event: Event) => {
    if (!fit || !onMap(event.target)) return;
    consumeZoom(event);
    // Touchscreen pointers already handle pinch; do not apply it twice on Safari.
    if (pointers.size >= 2) return;
    desktopPinch = { scale, source: sourceAt(gestureFocal(event as MapGestureEvent)) };
    options.onGestureStart();
  };
  const gestureChange = (event: Event) => {
    if (!desktopPinch && !(pointers.size >= 2 && onMap(event.target))) return;
    consumeZoom(event);
    const gesture = event as MapGestureEvent;
    if (!desktopPinch || pointers.size >= 2 || !Number.isFinite(gesture.scale) || gesture.scale <= 0) return;
    apply(desktopPinch.scale * gesture.scale, desktopPinch.source, gestureFocal(gesture));
  };
  const gestureEnd = (event: Event) => {
    if (!desktopPinch) return;
    consumeZoom(event);
    desktopPinch = null;
  };
  const capture = (id: number) => {
    try { frame.setPointerCapture(id); } catch { /* The pointer may already have ended. */ }
  };
  const release = (id: number) => {
    try { if (frame.hasPointerCapture(id)) frame.releasePointerCapture(id); } catch { /* Detached or ended pointer. */ }
  };
  const startGesture = () => {
    suppressClick = true;
    if (gestureActive) return;
    gestureActive = true;
    options.onGestureStart();
  };
  const clearPointers = () => {
    const ids = [...pointers.keys()];
    pointers.clear();
    pinch = null;
    gestureActive = false;
    ids.forEach(release);
  };
  const pair = () => {
    const [first, second] = [...pointers.values()];
    return { midpoint: { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 },
      distance: Math.hypot(second.x - first.x, second.y - first.y) };
  };
  const beginPinch = () => {
    const { midpoint, distance } = pair();
    pinch = { distance: Math.max(1, distance), scale, source: sourceAt(midpoint) };
  };
  const down = (event: PointerEvent) => {
    if (!pointers.size) suppressClick = false;
    if (!fit || !onSurface(event.target) || (event.pointerType === "mouse" && event.button !== 0)) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY, startX: event.clientX, startY: event.clientY });
    if (pointers.size === 2) {
      startGesture();
      pointers.forEach((_, id) => capture(id));
      beginPinch();
      if (event.cancelable) event.preventDefault();
    }
  };
  const move = (event: PointerEvent) => {
    const previous = pointers.get(event.pointerId);
    if (!previous) {
      // A trackpad gesture has no pressed pointer; cursor movement must not
      // reopen booth hover details while Safari is still zooming the map.
      if (desktopPinch) event.stopPropagation();
      return;
    }
    // A mouse released outside the frame before crossing the capture threshold
    // has no pointerup here. Do not turn its later hover into a phantom drag.
    if (event.pointerType === "mouse" && event.buttons === 0) {
      clearPointers();
      return;
    }
    const point = { ...previous, x: event.clientX, y: event.clientY };
    pointers.set(event.pointerId, point);
    if (pointers.size >= 2) {
      startGesture();
      if (!pinch) beginPinch();
      const current = pair();
      if (pinch) apply(pinch.scale * current.distance / pinch.distance, pinch.source, current.midpoint);
    } else {
      const wasActive = gestureActive;
      if (!wasActive && Math.hypot(point.x - point.startX, point.y - point.startY) < 6) return;
      startGesture();
      capture(event.pointerId);
      frame.scrollLeft -= point.x - (wasActive ? previous.x : point.startX);
      frame.scrollTop -= point.y - (wasActive ? previous.y : point.startY);
      rememberCenter();
    }
    if (event.cancelable) event.preventDefault();
    event.stopPropagation();
  };
  const up = (event: PointerEvent) => {
    if (!pointers.has(event.pointerId)) return;
    pointers.delete(event.pointerId);
    release(event.pointerId);
    pinch = null;
    if (pointers.size >= 2) beginPinch();
    else if (pointers.size === 1) {
      pointers.forEach((point) => { point.startX = point.x; point.startY = point.y; });
    } else gestureActive = false;
  };
  const cancel = (event: PointerEvent) => {
    if (!pointers.has(event.pointerId)) return;
    suppressClick = true;
    clearPointers();
  };
  const lostCapture = (event: PointerEvent) => {
    // Touch starts with implicit capture on its SVG/image target. Transferring
    // that capture to the frame emits a descendant lostpointercapture event.
    if (event.target !== frame || frame.hasPointerCapture(event.pointerId)) return;
    cancel(event);
  };
  const click = (event: MouseEvent) => {
    if (!suppressClick || !onSurface(event.target) || event.detail === 0) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  };
  const over = (event: PointerEvent) => { if (gestureActive || desktopPinch) event.stopPropagation(); };
  const drag = (event: DragEvent) => { if (onSurface(event.target)) event.preventDefault(); };
  const resize = () => {
    const current = measure();
    const nextFit = fitFloorPlanScale(current.width, current.height);
    if (!nextFit || (current.width === size.width && current.height === size.height)) return;
    if (pointers.size) { suppressClick = true; clearPointers(); }
    desktopPinch = null;
    size = { width: current.width, height: current.height };
    fit = nextFit;
    if (atFit) fitMap();
    else apply(scale, sourceCenter, current.center);
  };

  frame.addEventListener("pointerdown", down, true);
  frame.addEventListener("pointermove", move, true);
  frame.addEventListener("pointerup", up, true);
  frame.addEventListener("pointercancel", cancel, true);
  frame.addEventListener("lostpointercapture", lostCapture, true);
  frame.addEventListener("pointerover", over, true);
  frame.addEventListener("click", click, true);
  frame.addEventListener("dragstart", drag, true);
  // These must be non-passive so the browser does not zoom the entire page.
  frame.addEventListener("wheel", wheel, { passive: false });
  frame.addEventListener("gesturestart", gestureStart, { passive: false });
  frame.addEventListener("gesturechange", gestureChange, { passive: false });
  frame.addEventListener("gestureend", gestureEnd, { passive: false });
  frame.addEventListener("scroll", rememberCenter, { passive: true });
  const observe = options.observeResize ?? ((element, callback) => {
    const observer = new ResizeObserver(callback);
    observer.observe(element);
    return () => observer.disconnect();
  });
  const disconnect = observe(frame, resize);
  resize();

  return {
    zoomIn: () => zoomBy(1.25), zoomOut: () => zoomBy(1 / 1.25),
    fitMap: () => { if (fit) options.onGestureStart(); fitMap(); },
    destroy: () => {
      disconnect();
      clearPointers();
      desktopPinch = null;
      frame.removeEventListener("pointerdown", down, true);
      frame.removeEventListener("pointermove", move, true);
      frame.removeEventListener("pointerup", up, true);
      frame.removeEventListener("pointercancel", cancel, true);
      frame.removeEventListener("lostpointercapture", lostCapture, true);
      frame.removeEventListener("pointerover", over, true);
      frame.removeEventListener("click", click, true);
      frame.removeEventListener("dragstart", drag, true);
      frame.removeEventListener("wheel", wheel);
      frame.removeEventListener("gesturestart", gestureStart);
      frame.removeEventListener("gesturechange", gestureChange);
      frame.removeEventListener("gestureend", gestureEnd);
      frame.removeEventListener("scroll", rememberCenter);
      map.style.width = originalWidth;
    },
  };
}
