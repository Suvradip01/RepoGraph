"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import "lenis/dist/lenis.css";

export function SmoothScroll({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    // Ultra-smooth gliding inertia configuration
    const lenis = new Lenis({
      lerp: 0.045, // Floatier deceleration for that distinctive gliding feel
      wheelMultiplier: 1.25, // Ample scroll distance per wheel click
      touchMultiplier: 1.8,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.06,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
