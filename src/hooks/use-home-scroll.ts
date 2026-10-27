import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import { setHomeScroller } from "../components/sections/scroll-to-section";

export function useHomeScroll() {
  useEffect(() => {
    const desktopPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const scroller = new Lenis({
      autoRaf: true,
      anchors: false,
      lerp: 0.08,
      smoothWheel: desktopPointer,
      stopInertiaOnNavigate: true,
      syncTouch: false,
      respectReducedMotion: true,
    });

    document.documentElement.classList.add("rocket-home-scroll");
    setHomeScroller(scroller);

    return () => {
      setHomeScroller(null);
      scroller.destroy();
      document.documentElement.classList.remove("rocket-home-scroll");
    };
  }, []);
}
