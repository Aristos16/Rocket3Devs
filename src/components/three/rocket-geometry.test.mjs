import assert from "node:assert/strict";
import test from "node:test";

import { createRocketGeometries, ROCKET_BOUNDS } from "./rocket-geometry.ts";

function assertWellFormed(geometry, label) {
  geometry.computeBoundingBox();
  const position = geometry.getAttribute("position");
  const normal = geometry.getAttribute("normal");
  assert.ok(position?.count > 0, `${label} has vertices`);
  assert.ok(normal?.count === position.count, `${label} has matching normals`);
  for (const value of position.array)
    assert.ok(Number.isFinite(value), `${label} vertex is finite`);
  for (const value of normal.array) assert.ok(Number.isFinite(value), `${label} normal is finite`);

  const index = geometry.getIndex();
  if (index) {
    assert.ok(index.count > 0 && index.count % 3 === 0, `${label} indices form triangles`);
    for (const value of index.array)
      assert.ok(value < position.count, `${label} index is in range`);
  }
  assert.ok(geometry.boundingBox, `${label} has bounds`);
}

test("photographic rocket geometry is smooth, bounded and economical", () => {
  const geometries = createRocketGeometries();

  try {
    for (const [name, geometry] of Object.entries(geometries)) assertWellFormed(geometry, name);

    const hullBounds = geometries.hull.boundingBox;
    assert.ok(hullBounds.min.y >= ROCKET_BOUNDS.minY);
    assert.ok(hullBounds.max.y <= ROCKET_BOUNDS.maxY);
    assert.ok(hullBounds.max.x > 0.73 && hullBounds.max.x < 0.76, "hull keeps its 1.5m scale");
    assert.ok(ROCKET_BOUNDS.maxY - ROCKET_BOUNDS.minY >= 5.5);
    assert.ok(ROCKET_BOUNDS.maxY - ROCKET_BOUNDS.minY <= 5.7);
    assert.ok(ROCKET_BOUNDS.radius >= 1.3 && ROCKET_BOUNDS.radius <= 1.35);

    const instanceCounts = { fin: 3, bolts: 32 };
    const triangles = Object.entries(geometries).reduce((sum, [name, geometry]) => {
      const instanceCount = instanceCounts[name] ?? 1;
      return (
        sum +
        ((geometry.index?.count ?? geometry.getAttribute("position").count) / 3) * instanceCount
      );
    }, 0);
    assert.ok(triangles < 70_000, `triangle budget: ${triangles}`);
  } finally {
    for (const geometry of Object.values(geometries)) geometry.dispose();
  }
});
