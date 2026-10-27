import assert from "node:assert/strict";
import {
  cameraDistance,
  heroProgress,
  introRocketTransform,
} from "../src/components/three/scene-layout.ts";

for (const aspect of [0.55, 0.85, 1, 1.8, 3]) {
  const distance = cameraDistance(4.2, 6.65, aspect);
  const visibleHeight = 2 * distance * Math.tan((34 * Math.PI) / 360);
  assert.ok(Number.isFinite(distance) && distance > 0);
  assert.ok(
    visibleHeight >= 6.65 && visibleHeight * aspect >= 4.2,
    "rocket must fit portrait and landscape",
  );
}
assert.equal(heroProgress(100, 800), 0);
assert.equal(heroProgress(-360, 800), 0.5);
assert.equal(heroProgress(-1000, 800), 1);
assert.ok(Number.isFinite(heroProgress(-10, 0)));

for (const [width, height] of [
  [1440, 1000],
  [390, 844],
  [320, 568],
  [844, 390],
]) {
  const target = { left: width * 0.5, top: 450, width: 560, height: 620 };
  const transform = introRocketTransform(target, width, height);
  const [, x, y, rotation, scale] = transform
    .match(/translate3d\(([-.\d]+)px, ([-.\d]+)px, 0\) rotate\(([-.\d]+)deg\) scale\(([-.\d]+)\)/)
    .map(Number);
  const landscape = height <= 540 && width > height;
  assert.ok([x, y, rotation, scale].every(Number.isFinite));
  assert.ok(
    Math.abs(target.left + target.width / 2 + x - width * (landscape ? 0.35 : 0.5)) < 0.001,
  );
  assert.ok(
    Math.abs(target.top + target.height / 2 + y - height * (landscape ? 0.48 : 0.3)) < 0.001,
  );
  assert.ok(scale > 0 && target.width * scale <= width * 0.84);
}
assert.ok(
  !/NaN|Infinity/.test(introRocketTransform({ left: 0, top: 0, width: 0, height: 0 }, 320, 568)),
);
console.log("Scene layout: framing, scroll progress, and launch positioning passed.");
