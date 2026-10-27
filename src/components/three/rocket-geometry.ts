import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

/** Model-space bounds, including the engine bell and swept fins. */
export const ROCKET_BOUNDS = Object.freeze({
  minY: -2.58,
  maxY: 3,
  radius: 1.34,
});

const BARREL_PROFILE = [
  [-1.96, 0.52],
  [-1.9, 0.6],
  [-1.82, 0.69],
  [-1.68, 0.735],
  [-1.55, 0.75],
  [-1.1, 0.755],
  [-0.4, 0.755],
  [0.3, 0.75],
  [0.58, 0.74],
] as const;

const NOSE_BASE_Y = 0.58;
const NOSE_LENGTH = 2.42;
const NOSE_BASE_RADIUS = 0.74;

export function rocketRadiusAt(height: number) {
  if (height >= NOSE_BASE_Y) {
    const t = THREE.MathUtils.clamp((height - NOSE_BASE_Y) / NOSE_LENGTH, 0, 1);
    return NOSE_BASE_RADIUS * Math.sqrt(Math.max(0, 1 - t * t));
  }

  const profile = BARREL_PROFILE;
  const index = profile.findIndex(([y]) => y >= height);
  if (index <= 0) return profile[0][1];

  const [lowerY, lowerRadius] = profile[index - 1];
  const [upperY, upperRadius] = profile[index];
  const t = THREE.MathUtils.clamp((height - lowerY) / (upperY - lowerY), 0, 1);
  const smooth = t * t * (3 - 2 * t);
  return THREE.MathUtils.lerp(lowerRadius, upperRadius, smooth);
}

function createHull() {
  const profile: THREE.Vector2[] = BARREL_PROFILE.map(
    ([y, radius]) => new THREE.Vector2(radius, y),
  );

  // The elliptical cap meets the shoulder without a visible corner.
  for (let index = 1; index <= 96; index += 1) {
    const t = index / 96;
    profile.push(
      new THREE.Vector2(
        NOSE_BASE_RADIUS * Math.sqrt(Math.max(0, 1 - t * t)),
        NOSE_BASE_Y + NOSE_LENGTH * t,
      ),
    );
  }

  const geometry = new THREE.LatheGeometry(profile, 128);
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return geometry;
}

function createPortholeSurface(offset: number, inset: number) {
  const segments = 64;
  const rings = 24;
  const centerY = 0.42;
  const radiusX = 0.27;
  const radiusY = 0.36;
  const positions: number[] = [];
  const indices: number[] = [];

  for (let ring = 0; ring <= rings; ring += 1) {
    const radius = ring / rings;
    for (let segment = 0; segment <= segments; segment += 1) {
      const angle = (segment / segments) * Math.PI * 2;
      const x = Math.cos(angle) * radiusX * radius;
      const y = centerY + Math.sin(angle) * radiusY * radius;
      const bodyRadius = rocketRadiusAt(y);
      const z =
        Math.sqrt(Math.max(0, bodyRadius * bodyRadius - x * x)) +
        offset +
        inset * (1 - radius * radius);
      positions.push(x, y, z);

      if (ring < rings && segment < segments) {
        const current = ring * (segments + 1) + segment;
        const nextRing = current + segments + 1;
        indices.push(current, nextRing, current + 1, current + 1, nextRing, nextRing + 1);
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return geometry;
}

function createPortholeRing(tubeRadius: number, offset: number) {
  const points = Array.from({ length: 96 }, (_, index) => {
    const angle = (index / 96) * Math.PI * 2;
    const x = Math.cos(angle) * 0.285;
    const y = 0.42 + Math.sin(angle) * 0.375;
    const radius = rocketRadiusAt(y);
    return new THREE.Vector3(x, y, Math.sqrt(radius * radius - x * x) + offset);
  });
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points, true), 128, tubeRadius, 8, true);
}

function createFin() {
  const profile = new THREE.Shape();
  profile.moveTo(0.61, -1.42);
  profile.bezierCurveTo(0.78, -1.47, 0.98, -1.82, 1.18, -2.15);
  profile.bezierCurveTo(1.25, -2.3, 1.24, -2.49, 1.15, -2.53);
  profile.bezierCurveTo(0.95, -2.53, 0.72, -2.43, 0.56, -2.3);
  profile.bezierCurveTo(0.59, -2.06, 0.55, -1.78, 0.58, -1.59);
  profile.closePath();

  const geometry = new THREE.ExtrudeGeometry(profile, {
    depth: 0.13,
    bevelEnabled: true,
    bevelSegments: 5,
    bevelSize: 0.035,
    bevelThickness: 0.04,
    curveSegments: 12,
  });
  geometry.translate(0, 0, -0.1);
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return geometry;
}

function createLongitudinalAccent() {
  const points = Array.from({ length: 48 }, (_, index) => {
    const t = index / 47;
    const y = THREE.MathUtils.lerp(-1.55, 0.48, t);
    const angle = 0.72;
    const radius = rocketRadiusAt(y) + 0.006;
    return new THREE.Vector3(Math.sin(angle) * radius, y, Math.cos(angle) * radius);
  });
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 80, 0.012, 6, false);
}

function createServiceRing(y: number, tubeRadius: number, radialOffset = 0.012) {
  const ring = new THREE.TorusGeometry(rocketRadiusAt(y) + radialOffset, tubeRadius, 10, 128);
  ring.rotateX(Math.PI / 2);
  ring.translate(0, y, 0);
  ring.computeBoundingBox();
  ring.computeBoundingSphere();
  return ring;
}

function createServiceHatch() {
  const outline = new THREE.Shape();
  outline.moveTo(-0.38, -1.14);
  outline.lineTo(-0.2, -1.14);
  outline.quadraticCurveTo(-0.15, -1.14, -0.15, -1.09);
  outline.lineTo(-0.15, -0.69);
  outline.quadraticCurveTo(-0.15, -0.64, -0.2, -0.64);
  outline.lineTo(-0.38, -0.64);
  outline.quadraticCurveTo(-0.43, -0.64, -0.43, -0.69);
  outline.lineTo(-0.43, -1.09);
  outline.quadraticCurveTo(-0.43, -1.14, -0.38, -1.14);

  const points = outline
    .getSpacedPoints(64)
    .slice(0, -1)
    .map(({ x, y }) => {
      const radius = rocketRadiusAt(y);
      return new THREE.Vector3(x, y, Math.sqrt(radius * radius - x * x) + 0.004);
    });
  const seam = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points, true), 80, 0.005, 6, true);
  const latch = new THREE.BoxGeometry(0.05, 0.016, 0.012);
  latch.rotateY(-0.24);
  latch.translate(-0.18, -0.89, Math.sqrt(rocketRadiusAt(-0.89) ** 2 - 0.18 ** 2) + 0.008);
  const geometry = mergeGeometries([seam, latch])!;
  seam.dispose();
  latch.dispose();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return geometry;
}

function createNozzleRibs() {
  const rings = [0.28, 0.5, 0.72].map((t) => {
    const radius = 0.355 + 0.19 * Math.pow(t, 1.7);
    const ring = new THREE.TorusGeometry(radius + 0.004, 0.009, 6, 64);
    ring.rotateX(Math.PI / 2);
    ring.translate(0, -1.92 - t * 0.62, 0);
    return ring;
  });
  const geometry = mergeGeometries(rings)!;
  for (const ring of rings) ring.dispose();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return geometry;
}

function createBoltGeometry() {
  const geometry = new THREE.SphereGeometry(0.024, 12, 8);
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return geometry;
}

export function createRocketGeometries() {
  const hull = createHull();
  const fin = createFin();
  const nozzleProfile = Array.from({ length: 25 }, (_, index) => {
    const t = index / 24;
    return new THREE.Vector2(0.355 + 0.19 * Math.pow(t, 1.7), -1.92 - t * 0.62);
  }).reverse();
  const nozzle = new THREE.LatheGeometry(nozzleProfile, 96);
  nozzle.computeBoundingBox();
  nozzle.computeBoundingSphere();

  const nozzleLiner = new THREE.CylinderGeometry(0.3, 0.43, 0.48, 64, 6, true);
  nozzleLiner.translate(0, -2.24, 0);
  nozzleLiner.computeVertexNormals();
  nozzleLiner.computeBoundingBox();
  nozzleLiner.computeBoundingSphere();

  const nozzleLip = new THREE.TorusGeometry(0.535, 0.034, 12, 96);
  nozzleLip.rotateX(Math.PI / 2);
  nozzleLip.translate(0, -2.54, 0);
  nozzleLip.computeBoundingBox();
  nozzleLip.computeBoundingSphere();

  const engineFace = new THREE.CircleGeometry(0.36, 64);
  engineFace.rotateX(Math.PI / 2);
  engineFace.translate(0, -2.48, 0);
  engineFace.computeBoundingBox();
  engineFace.computeBoundingSphere();

  return {
    hull,
    fin,
    nozzle,
    nozzleRibs: createNozzleRibs(),
    nozzleLiner,
    nozzleLip,
    engineFace,
    portholeRim: createPortholeRing(0.045, 0.024),
    portholeGasket: createPortholeRing(0.023, 0.041),
    portholeGlass: createPortholeSurface(0.046, 0.024),
    accentLine: createLongitudinalAccent(),
    serviceHatch: createServiceHatch(),
    noseSeam: createServiceRing(2.5, 0.008, 0.004),
    shoulderRing: createServiceRing(0.54, 0.012, 0.012),
    lowerRing: createServiceRing(-1.64, 0.018, 0.014),
    aftRing: createServiceRing(-1.96, 0.014, 0.012),
    lowerAccentRing: createServiceRing(-1.78, 0.012, 0.015),
    bolts: createBoltGeometry(),
  };
}

export type RocketGeometries = ReturnType<typeof createRocketGeometries>;
