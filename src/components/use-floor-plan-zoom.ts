"use client";

import { useCallback, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { createFloorPlanZoomController, type FloorPlanZoomState } from "@/lib/floor-plan-zoom";

type Options = {
  enabled: boolean;
  frameRef: RefObject<HTMLDivElement | null>;
  mapRef: RefObject<HTMLDivElement | null>;
  onGestureStart: () => void;
};

export function useFloorPlanZoom({ enabled, frameRef, mapRef, onGestureStart }: Options) {
  const [state, setState] = useState<FloorPlanZoomState>({ zoomPercent: 100, canZoomIn: false, canZoomOut: false });
  const controller = useRef<ReturnType<typeof createFloorPlanZoomController> | null>(null);
  const gestureStart = useRef(onGestureStart);

  useLayoutEffect(() => { gestureStart.current = onGestureStart; }, [onGestureStart]);
  useLayoutEffect(() => {
    if (!enabled || !frameRef.current || !mapRef.current) return;
    const current = createFloorPlanZoomController(frameRef.current, mapRef.current, {
      onGestureStart: () => gestureStart.current(),
      onChange: (next) => setState((previous) => previous.zoomPercent === next.zoomPercent &&
        previous.canZoomIn === next.canZoomIn && previous.canZoomOut === next.canZoomOut ? previous : next),
    });
    controller.current = current;
    return () => { controller.current = null; current.destroy(); };
  }, [enabled, frameRef, mapRef]);

  const zoomIn = useCallback(() => controller.current?.zoomIn(), []);
  const zoomOut = useCallback(() => controller.current?.zoomOut(), []);
  const fitMap = useCallback(() => controller.current?.fitMap(), []);
  return { ...state, zoomIn, zoomOut, fitMap };
}
