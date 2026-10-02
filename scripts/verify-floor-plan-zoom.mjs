import assert from "node:assert/strict";
import { createFloorPlanZoomController, fitFloorPlanScale, clampFloorPlanScale, scrollForFocalPoint,
  FLOOR_PLAN_WIDTH, FLOOR_PLAN_HEIGHT } from "../src/lib/floor-plan-zoom.ts";

const near = (actual, expected, message) => assert.ok(Math.abs(actual - expected) < 0.0001,
  `${message}: expected ${expected}, received ${actual}`);

assert.equal(fitFloorPlanScale(0, 600), 0);
assert.equal(fitFloorPlanScale(400, Number.NaN), 0);
near(fitFloorPlanScale(336, 576), 336 / 2048, "Portrait fit uses width");
near(fitFloorPlanScale(820, 220), 220 / 1552, "Landscape fit uses height");
assert.equal(clampFloorPlanScale(4, 0.2), 2);
assert.equal(clampFloorPlanScale(0.1, 0.2), 0.2);
assert.deepEqual(scrollForFocalPoint({ x: 400, y: 200 }, 2, { x: 10, y: 20 },
  { x: 210, y: 120 }, { x: 0, y: 0 }, { x: 900, y: 900 }), { x: 600, y: 300 });
assert.deepEqual(scrollForFocalPoint({ x: 0, y: 1000 }, 2, { x: 10, y: 20 },
  { x: 210, y: 120 }, { x: 0, y: 0 }, { x: 900, y: 900 }), { x: 0, y: 900 });

// The fake frame models real layout sizing, auto centering, scroll clamping,
// native listener dispatch and pointer capture. No implementation mocks for
// the gesture state machine or zoom calculations are used.
function harness(width = 360, height = 600) {
  const surface = { closest: (selector) => selector === "[data-map-gesture]" ? surface : null };
  const control = { closest: () => null };
  const map = { style: { width: "" }, getBoundingClientRect: () => ({
    left: 101 + 12 + Math.max(0, (frame.clientWidth - 24 - mapWidth()) / 2) - frame.scrollLeft,
    top: 51 + 12 + Math.max(0, (frame.clientHeight - 24 - mapHeight()) / 2) - frame.scrollTop,
    width: mapWidth(), height: mapHeight(),
  }) };
  const mapWidth = () => Number.parseFloat(map.style.width) || FLOOR_PLAN_WIDTH;
  const mapHeight = () => mapWidth() * FLOOR_PLAN_HEIGHT / FLOOR_PLAN_WIDTH;
  class Frame extends EventTarget {
    clientWidth = width;
    clientHeight = height;
    clientLeft = 1;
    clientTop = 1;
    captured = new Set();
    x = 0;
    y = 0;
    get scrollWidth() { return Math.max(this.clientWidth, mapWidth() + 24); }
    get scrollHeight() { return Math.max(this.clientHeight, mapHeight() + 24); }
    get scrollLeft() { return this.x; }
    set scrollLeft(value) {
      this.x = Math.max(0, Math.min(this.scrollWidth - this.clientWidth, value));
      this.dispatchEvent(new Event("scroll"));
    }
    get scrollTop() { return this.y; }
    set scrollTop(value) {
      this.y = Math.max(0, Math.min(this.scrollHeight - this.clientHeight, value));
      this.dispatchEvent(new Event("scroll"));
    }
    getBoundingClientRect() { return { left: 100, top: 50, right: 102 + this.clientWidth, bottom: 52 + this.clientHeight }; }
    setPointerCapture(id) { this.captured.add(id); }
    hasPointerCapture(id) { return this.captured.has(id); }
    releasePointerCapture(id) { this.captured.delete(id); }
  }
  const frame = new Frame();
  let resize;
  let disconnected = false;
  let state;
  let gestures = 0;
  const zoom = createFloorPlanZoomController(frame, map, {
    onGestureStart: () => gestures++, onChange: (next) => { state = next; },
    getPadding: () => ({ left: 12, right: 12, top: 12, bottom: 12 }),
    observeResize: (_, callback) => { resize = callback; return () => { disconnected = true; }; },
  });
  const send = (type, values = {}, target = surface) => {
    const event = new Event(type, { cancelable: true, bubbles: true });
    Object.defineProperty(event, "target", { value: target });
    Object.assign(event, { pointerId: 1, pointerType: "touch", button: 0, buttons: 1, clientX: 200, clientY: 200, detail: 1 }, values);
    frame.dispatchEvent(event);
    return event;
  };
  const source = (x, y) => {
    const rect = map.getBoundingClientRect();
    const scale = mapWidth() / FLOOR_PLAN_WIDTH;
    return { x: (x - rect.left) / scale, y: (y - rect.top) / scale };
  };
  return { frame, map, zoom, send, source, surface, control, mapWidth, mapHeight,
    get state() { return state; }, get gestures() { return gestures; }, get disconnected() { return disconnected; },
    resize: (w, h) => { frame.clientWidth = w; frame.clientHeight = h; frame.scrollLeft = frame.scrollLeft;
      frame.scrollTop = frame.scrollTop; resize(); },
  };
}

const fit = harness();
near(fit.mapWidth(), 336, "Initial map fits padded frame width");
assert.ok(fit.mapHeight() <= 576);
assert.deepEqual(fit.state, { zoomPercent: 100, canZoomIn: true, canZoomOut: false });
fit.zoom.zoomIn();
assert.equal(fit.state.zoomPercent, 125);
assert.equal(fit.gestures, 1, "Zoom controls clear the selected vendor");
near(fit.source(281, 351).x, 1024, "Button zoom preserves viewport source center X");
near(fit.source(281, 351).y, 776, "Button zoom preserves viewport source center Y");
fit.zoom.zoomOut();
fit.zoom.zoomOut();
assert.equal(fit.state.zoomPercent, 100);
for (let index = 0; index < 30; index++) fit.zoom.zoomIn();
near(fit.mapWidth(), 4096, "Zoom cannot exceed twice source resolution");
assert.equal(fit.state.canZoomIn, false);
fit.zoom.fitMap();
const gesturesAfterFit = fit.gestures;
fit.resize(844, 244);
assert.equal(fit.gestures, gesturesAfterFit, "Automatic resize is not a new user gesture");
near(fit.mapHeight(), 220, "Fit mode follows landscape frame height");
assert.equal(fit.state.zoomPercent, 100);
fit.zoom.destroy();
assert.equal(fit.disconnected, true);
assert.equal(fit.map.style.width, "");

const resized = harness(600, 500);
for (let index = 0; index < 8; index++) resized.zoom.zoomIn();
resized.frame.scrollLeft = 700;
resized.frame.scrollTop = 650;
const before = resized.source(401, 301);
const beforeWidth = resized.mapWidth();
resized.resize(500, 400);
const after = resized.source(351, 251);
near(resized.mapWidth(), beforeWidth, "Resizing does not reset a manually zoomed map");
near(after.x, before.x, "Resize preserves viewed source center X");
near(after.y, before.y, "Resize preserves viewed source center Y");
resized.zoom.destroy();

const touch = harness();
touch.send("pointerdown");
assert.equal(touch.frame.captured.size, 0, "A tap is not captured away from its booth");
touch.send("pointerup");
assert.equal(touch.send("click").defaultPrevented, false, "Normal booth click survives");
assert.equal(touch.gestures, 0);
touch.send("pointerdown", { clientX: 180, clientY: 250 });
touch.send("pointerdown", { pointerId: 2, clientX: 280, clientY: 250 });
touch.send("lostpointercapture", {}, touch.surface);
assert.equal(touch.frame.captured.size, 2, "Implicit SVG capture transfer does not cancel the pinch");
const anchor = touch.source(230, 250);
touch.send("pointermove", { clientX: 160, clientY: 250 });
touch.send("pointermove", { pointerId: 2, clientX: 300, clientY: 250 });
near(touch.mapWidth(), 336 * 1.4, "Pinch ratio changes map layout width");
near(touch.source(230, 250).x, anchor.x, "Pinch keeps horizontal focal source under midpoint");
assert.equal(touch.gestures, 1, "Pinch clears selection once, not on every move");
assert.deepEqual([...touch.frame.captured].sort(), [1, 2]);
touch.send("pointerup", { pointerId: 1 });
const scrollBeforePan = touch.frame.scrollLeft;
touch.send("pointermove", { pointerId: 2, clientX: 290, clientY: 250 });
near(touch.frame.scrollLeft, scrollBeforePan + 10, "Pinch-to-one-finger transition pans without a jump");
touch.send("pointerup", { pointerId: 2 });
assert.equal(touch.send("click").defaultPrevented, true, "Pinch cannot select a booth through synthetic click");
assert.equal(touch.send("click", { detail: 0 }).defaultPrevented, false, "Keyboard activation is retained");
touch.send("pointerdown", {}, touch.control);
assert.equal(touch.send("click", {}, touch.control).defaultPrevented, false, "Popup and zoom controls remain interactive");
assert.equal(touch.frame.captured.size, 0);

touch.send("pointerdown", { pointerType: "mouse", clientX: 240 });
touch.send("pointermove", { pointerType: "mouse", clientX: 237 });
assert.equal(touch.frame.captured.size, 0, "Subthreshold movement retains a tap");
touch.send("pointermove", { pointerType: "mouse", clientX: 225 });
assert.equal(touch.frame.captured.size, 1, "Dragging captures the pointer after threshold");
touch.send("pointercancel");
assert.equal(touch.frame.captured.size, 0);
const cancelledWidth = touch.mapWidth();
touch.send("pointermove", { clientX: 100 });
near(touch.mapWidth(), cancelledWidth, "Cancelled pointers no longer affect zoom");
touch.send("pointerdown");
touch.send("pointerdown", { pointerId: 2, clientX: 280 });
touch.frame.captured.delete(1);
touch.send("lostpointercapture", {}, touch.frame);
assert.equal(touch.frame.captured.size, 0, "Lost capture clears all gesture pointers");
touch.send("pointerdown");
touch.send("pointerup");
assert.equal(touch.send("click").defaultPrevented, false, "A fresh tap works after cancellation");
touch.send("pointerdown", { pointerType: "mouse", clientX: 300 });
const phantomScroll = touch.frame.scrollLeft;
const phantomGestures = touch.gestures;
touch.send("pointermove", { pointerType: "mouse", clientX: 180, buttons: 0 });
near(touch.frame.scrollLeft, phantomScroll, "Mouse release outside the frame cannot cause a phantom drag");
assert.equal(touch.gestures, phantomGestures);
touch.send("pointerdown");
touch.send("pointerup");
assert.equal(touch.send("click").defaultPrevented, false);
touch.zoom.destroy();

const diagonal = harness(360, 400);
for (let index = 0; index < 8; index++) diagonal.zoom.zoomIn();
diagonal.frame.scrollLeft = 600;
diagonal.frame.scrollTop = 500;
diagonal.send("pointerdown", { clientX: 180, clientY: 160 });
diagonal.send("pointerdown", { pointerId: 2, clientX: 280, clientY: 260 });
const diagonalAnchor = diagonal.source(230, 210);
diagonal.send("pointermove", { clientX: 160, clientY: 150 });
diagonal.send("pointermove", { pointerId: 2, clientX: 320, clientY: 310 });
near(diagonal.source(240, 230).x, diagonalAnchor.x, "Moving diagonal pinch midpoint preserves source X");
near(diagonal.source(240, 230).y, diagonalAnchor.y, "Moving diagonal pinch midpoint preserves source Y");
diagonal.send("pointermove", { pointerId: 2, clientX: 161, clientY: 151 });
near(diagonal.mapWidth(), 336, "Pinch contraction cannot shrink below fit");
diagonal.zoom.destroy();

const hidden = harness(0, 0);
assert.equal(hidden.map.style.width, "", "Zero-sized frame does not write invalid dimensions");
hidden.resize(360, 600);
near(hidden.mapWidth(), 336, "A later measurable frame initializes fit");
hidden.zoom.destroy();

console.log("PASS: floor-plan fit, bounds, focal zoom, resize preservation, pinch/pan transitions, tap/keyboard/control isolation, and cancellation.");
