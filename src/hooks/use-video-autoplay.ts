import { useEffect, useRef, type RefObject } from "react";

export function useVideoAutoplay(videoRef: RefObject<HTMLVideoElement | null>) {
  const videoIsVisible = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.defaultMuted = true;

    const tryAutoplayVideo = async () => {
      const currentVideo = videoRef.current;
      if (!currentVideo || document.visibilityState === "hidden") return;
      try {
        await currentVideo.play();
      } catch {
        // Browsers can still require a user gesture. The play button remains available.
      }
    };

    const prepareAndPlayVideo = async () => {
      const currentVideo = videoRef.current;
      if (!currentVideo) return;
      if (currentVideo.preload === "none") {
        currentVideo.preload = "metadata";
        currentVideo.load();
      }
      await tryAutoplayVideo();
    };

    const handleVisibilityChange = () => {
      const currentVideo = videoRef.current;
      if (!currentVideo) return;
      if (document.visibilityState === "hidden") {
        currentVideo.pause();
      } else if (videoIsVisible.current) {
        void prepareAndPlayVideo();
      }
    };

    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          videoIsVisible.current = Boolean(entry?.isIntersecting);
          const currentVideo = videoRef.current;
          if (!currentVideo) return;
          if (videoIsVisible.current) {
            void prepareAndPlayVideo();
          } else {
            currentVideo.pause();
          }
        },
        { rootMargin: "180px 0px", threshold: 0.08 },
      );
      observer.observe(video);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [videoRef]);
}
