import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { BackSide, Box3, Group, Mesh, MeshStandardMaterial, PMREMGenerator, Vector3 } from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

import { RocketModel } from "./RocketModel";
import { SceneBoundary } from "./SceneBoundary";
import { cameraDistance, heroProgress } from "./scene-layout";

type HomeSceneProps = { rootRef: RefObject<HTMLDivElement | null>; motion: boolean };

export default function HomeScene({ rootRef, motion }: HomeSceneProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [failed, setFailed] = useState(false);
  const [warmed, setWarmed] = useState(false);
  const [dpr, setDpr] = useState(1);
  const progressRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const invalidateRef = useRef<(() => void) | null>(null);
  const reducedQuality = useRef(false);
  const inView = useRef(true);
  const onWarmed = useCallback(() => setWarmed(true), []);

  useEffect(() => {
    const root = rootRef.current;
    const stage = root?.querySelector<HTMLElement>('[data-three-anchor="rocket"]');
    const target = root?.querySelector<HTMLElement>(".home-rocket-stage");
    if (!root || !stage || !target) return;
    setAnchor(stage);
    const observer = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting;
      setVisible(entry.isIntersecting);
    });
    observer.observe(target);
    const hero = root.querySelector<HTMLElement>("#home");
    const updateScroll = () => {
      if (hero) {
        const rect = hero.getBoundingClientRect();
        progressRef.current = heroProgress(rect.top, rect.height);
      }
      if (inView.current) invalidateRef.current?.();
    };
    const updateVisibility = () => setTabVisible(!document.hidden);
    const updateResolution = () =>
      setDpr(
        reducedQuality.current
          ? 1
          : Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1 : 1.5),
      );
    const updatePointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      if (root.dataset.loading === "true") return;
      const rect = target.getBoundingClientRect();
      pointerRef.current.x = Math.max(
        -1,
        Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1),
      );
      pointerRef.current.y = Math.max(
        -1,
        Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1),
      );
    };
    const resetPointer = () => {
      pointerRef.current.x = 0;
      pointerRef.current.y = 0;
    };
    updateScroll();
    updateVisibility();
    updateResolution();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateResolution);
    document.addEventListener("visibilitychange", updateVisibility);
    hero?.addEventListener("pointermove", updatePointer, { passive: true });
    hero?.addEventListener("pointerleave", resetPointer);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateResolution);
      document.removeEventListener("visibilitychange", updateVisibility);
      hero?.removeEventListener("pointermove", updatePointer);
      hero?.removeEventListener("pointerleave", resetPointer);
      root.removeAttribute("data-scene-ready");
      invalidateRef.current = null;
    };
  }, [rootRef]);

  function failScene() {
    rootRef.current?.removeAttribute("data-scene-ready");
    window.dispatchEvent(new Event("rocket3dev:scene-ready"));
    setFailed(true);
  }
  if (!anchor || failed) return null;
  const running = motion && visible && tabVisible;

  return createPortal(
    <SceneBoundary onFailure={failScene}>
      <div className="home-canvas" aria-hidden="true">
        <Canvas
          dpr={dpr}
          // Ignore the launch transform when measuring the render area.
          resize={{ offsetSize: true, scroll: false }}
          frameloop={!warmed ? "never" : running ? "always" : "demand"}
          camera={{ fov: 32, position: [0, 0, 12], near: 0.1, far: 100 }}
          gl={{ alpha: true, antialias: true, powerPreference: "default" }}
          onCreated={({ gl, invalidate }) => {
            invalidateRef.current = invalidate;
            gl.setClearColor(0x000000, 0);
            gl.domElement.addEventListener("webglcontextlost", failScene, { once: true });
          }}
        >
          <StudioRocket
            rootRef={rootRef}
            motion={running}
            progressRef={progressRef}
            pointerRef={pointerRef}
            onWarmed={onWarmed}
            onSlow={() => {
              reducedQuality.current = true;
              setDpr(1);
            }}
          />
        </Canvas>
      </div>
    </SceneBoundary>,
    anchor,
  );
}

function StudioRocket({
  rootRef,
  motion,
  progressRef,
  pointerRef,
  onWarmed,
  onSlow,
}: {
  rootRef: HomeSceneProps["rootRef"];
  motion: boolean;
  progressRef: RefObject<number>;
  pointerRef: RefObject<{ x: number; y: number }>;
  onWarmed: () => void;
  onSlow: () => void;
}) {
  const model = useRef<Group>(null);
  const { gl, scene, camera, size, invalidate } = useThree();
  const readyFrames = useRef(0);
  const stats = useRef({ elapsed: 0, frames: 0, lowered: false });

  useLayoutEffect(() => {
    if (!model.current) return;
    model.current.updateWorldMatrix(true, true);
    const box = new Box3().setFromObject(model.current);
    const center = box.getCenter(new Vector3());
    model.current.position.sub(center);
    const bounds = box.getSize(new Vector3());
    camera.position.set(
      0,
      0,
      cameraDistance(bounds.x * 1.04, bounds.y * 1.04, size.width / size.height, 32),
    );
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, invalidate, size.width, size.height]);

  useLayoutEffect(() => {
    let cancelled = false;
    const room = new RoomEnvironment();
    room.traverse((object) => {
      if (
        object instanceof Mesh &&
        object.material instanceof MeshStandardMaterial &&
        object.material.side === BackSide
      )
        object.material.color.set("#354655");
    });
    const generator = new PMREMGenerator(gl);
    const target = generator.fromScene(room, 0.02, 0.1, 100, {
      size: window.innerWidth < 768 ? 128 : 256,
    });
    scene.environment = target.texture;
    scene.environmentIntensity = 0.9;
    room.dispose();
    generator.dispose();
    // Warm shaders before the first visible frame so the launch stays responsive.
    void gl.compileAsync(scene, camera).then(
      () => {
        if (!cancelled) onWarmed();
      },
      () => {
        if (!cancelled) onWarmed();
      },
    );
    return () => {
      cancelled = true;
      scene.environment = null;
      target.dispose();
    };
  }, [gl, scene, camera, onWarmed]);

  useFrame((state, delta) => {
    if (readyFrames.current < 3) {
      readyFrames.current += 1;
      if (readyFrames.current === 3) {
        rootRef.current?.setAttribute("data-scene-ready", "true");
        window.dispatchEvent(new Event("rocket3dev:scene-ready"));
      } else state.invalidate();
    }
    if (!motion || stats.current.lowered) return;
    stats.current.elapsed += Math.min(delta, 0.1);
    stats.current.frames += 1;
    if (stats.current.elapsed > 3) {
      if (stats.current.frames / stats.current.elapsed < 40) {
        stats.current.lowered = true;
        onSlow();
      }
      stats.current.elapsed = 0;
      stats.current.frames = 0;
    }
  });

  return (
    <>
      <hemisphereLight args={["#e1edff", "#0b2136", 0.6]} />
      <directionalLight position={[-3, 5, 6]} intensity={2.5} color="#fff2e0" />
      <directionalLight position={[4, 1, -3]} intensity={2.8} color="#c8e3ff" />
      <group ref={model} rotation={[-0.12, 0.34, -0.5]}>
        <RocketModel motion={motion} progressRef={progressRef} pointerRef={pointerRef} />
      </group>
    </>
  );
}
