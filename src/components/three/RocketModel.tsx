import { useEffect, useLayoutEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import { createRocketGeometries, rocketRadiusAt } from "./rocket-geometry";

export type RocketModelProps = {
  motion: boolean;
  progressRef?: RefObject<number>;
  pointerRef?: RefObject<{ x: number; y: number }>;
};

function disposeGeometries(geometries: object) {
  for (const geometry of Object.values(geometries)) {
    if (geometry instanceof THREE.BufferGeometry) geometry.dispose();
  }
}

export function RocketModel({ motion, progressRef, pointerRef }: RocketModelProps) {
  const rootRef = useRef<THREE.Group>(null);
  const fastenersRef = useRef<THREE.InstancedMesh>(null);
  const motionTime = useRef(0);
  const geometries = useMemo(createRocketGeometries, []);

  const materials = useMemo(
    () => ({
      shell: new THREE.MeshPhysicalMaterial({
        color: "#e7e5de",
        metalness: 0.08,
        roughness: 0.22,
        clearcoat: 0.92,
        clearcoatRoughness: 0.12,
        envMapIntensity: 1.3,
      }),
      fin: new THREE.MeshPhysicalMaterial({
        color: "#bcc6c8",
        metalness: 0.42,
        roughness: 0.2,
        clearcoat: 0.85,
        clearcoatRoughness: 0.14,
        envMapIntensity: 1.25,
      }),
      titanium: new THREE.MeshPhysicalMaterial({
        color: "#8d969b",
        metalness: 0.91,
        roughness: 0.24,
        clearcoat: 0.32,
        clearcoatRoughness: 0.18,
        anisotropy: 0.55,
        anisotropyRotation: Math.PI / 2,
      }),
      finEdge: new THREE.MeshPhysicalMaterial({
        color: "#818c91",
        metalness: 0.87,
        roughness: 0.25,
        clearcoat: 0.5,
        anisotropy: 0.4,
      }),
      darkMetal: new THREE.MeshPhysicalMaterial({
        color: "#333b3e",
        metalness: 0.88,
        roughness: 0.3,
        clearcoat: 0.35,
        envMapIntensity: 1.1,
        side: THREE.DoubleSide,
      }),
      gasket: new THREE.MeshStandardMaterial({
        color: "#111a20",
        metalness: 0.3,
        roughness: 0.29,
      }),
      glass: new THREE.MeshPhysicalMaterial({
        color: "#1f3848",
        metalness: 0,
        roughness: 0.08,
        ior: 1.52,
        clearcoat: 1,
        clearcoatRoughness: 0.075,
        side: THREE.DoubleSide,
      }),
      orange: new THREE.MeshPhysicalMaterial({
        color: "#bd6039",
        metalness: 0.38,
        roughness: 0.26,
        clearcoat: 0.72,
        clearcoatRoughness: 0.18,
      }),
      bolt: new THREE.MeshStandardMaterial({
        color: "#758087",
        metalness: 0.94,
        roughness: 0.2,
      }),
      engine: new THREE.MeshStandardMaterial({
        color: "#242b30",
        metalness: 0.82,
        roughness: 0.31,
        emissive: "#bd5f32",
        emissiveIntensity: 0.3,
        side: THREE.DoubleSide,
      }),
    }),
    [],
  );

  useEffect(
    () => () => {
      disposeGeometries(geometries);
      for (const material of Object.values(materials)) material.dispose();
    },
    [geometries, materials],
  );

  useLayoutEffect(() => {
    const mesh = fastenersRef.current;
    if (!mesh) return;

    const marker = new THREE.Object3D();
    let instance = 0;
    for (const height of [-1.67, -1.88]) {
      const radius = rocketRadiusAt(height) + 0.018;
      for (let index = 0; index < 12; index += 1) {
        const angle = (index / 12) * Math.PI * 2 + 0.12;
        marker.position.set(Math.sin(angle) * radius, height, Math.cos(angle) * radius);
        marker.updateMatrix();
        mesh.setMatrixAt(instance, marker.matrix);
        instance += 1;
      }
    }
    marker.scale.set(0.55, 0.55, 0.28);
    for (let index = 0; index < 8; index += 1) {
      const angle = (index / 8) * Math.PI * 2;
      const x = Math.cos(angle) * 0.285;
      const y = 0.42 + Math.sin(angle) * 0.375;
      const radius = rocketRadiusAt(y);
      marker.position.set(x, y, Math.sqrt(radius * radius - x * x) + 0.067);
      marker.updateMatrix();
      mesh.setMatrixAt(instance, marker.matrix);
      instance += 1;
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((_, delta) => {
    const root = rootRef.current;
    if (!root) return;

    if (!motion) return;

    const step = Math.min(delta, 0.05);
    motionTime.current += step;
    const time = motionTime.current;
    const pointer = pointerRef?.current;
    const progress = THREE.MathUtils.clamp(progressRef?.current ?? 0, 0, 1);
    root.position.y = Math.sin(time * 0.75) * 0.08;
    root.rotation.x = THREE.MathUtils.damp(
      root.rotation.x,
      Math.sin(time * 0.21) * 0.016 + (pointer?.y ?? 0) * 0.035,
      2.4,
      step,
    );
    root.rotation.y = THREE.MathUtils.damp(
      root.rotation.y,
      Math.sin(time * 0.17) * 0.045 + (pointer?.x ?? 0) * 0.085,
      2.4,
      step,
    );
    root.rotation.z = THREE.MathUtils.damp(root.rotation.z, progress * -0.08, 2.2, step);
    materials.engine.emissiveIntensity = 0.34 + Math.sin(time * 1.3) * 0.045;
  });

  return (
    <group ref={rootRef}>
      <mesh geometry={geometries.hull} material={materials.shell} />

      {[Math.PI / 9, Math.PI / 9 + (Math.PI * 2) / 3, Math.PI / 9 + (Math.PI * 4) / 3].map(
        (rotationY, index) => (
          <mesh
            key={rotationY}
            geometry={geometries.fin}
            material={[materials.fin, materials.finEdge]}
            rotation-y={rotationY}
            castShadow
            receiveShadow
            name={`swept-fin-${index + 1}`}
          />
        ),
      )}

      <mesh geometry={geometries.portholeRim} material={materials.titanium} />
      <mesh geometry={geometries.portholeGasket} material={materials.gasket} />
      <mesh geometry={geometries.portholeGlass} material={materials.glass} />
      <mesh geometry={geometries.accentLine} material={materials.orange} />
      <mesh geometry={geometries.serviceHatch} material={materials.titanium} />

      <mesh geometry={geometries.noseSeam} material={materials.titanium} />
      <mesh geometry={geometries.shoulderRing} material={materials.titanium} />
      <mesh geometry={geometries.lowerRing} material={materials.titanium} />
      <mesh geometry={geometries.aftRing} material={materials.titanium} />
      <mesh geometry={geometries.lowerAccentRing} material={materials.orange} />

      <instancedMesh ref={fastenersRef} args={[geometries.bolts, materials.bolt, 32]} castShadow />

      <mesh geometry={geometries.nozzle} material={materials.titanium} castShadow />
      <mesh geometry={geometries.nozzleRibs} material={materials.titanium} />
      <mesh geometry={geometries.nozzleLiner} material={materials.darkMetal} />
      <mesh geometry={geometries.nozzleLip} material={materials.titanium} />
      <mesh geometry={geometries.engineFace} material={materials.engine} />
    </group>
  );
}
