"use client";

import dynamic from "next/dynamic";

const Spline = dynamic(
  async () => (await import("@splinetool/react-spline")).default,
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-transparent">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/15 border-t-cyan-300" />
      </div>
    ),
  }
);

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return <Spline scene={scene} className={className} />;
}
