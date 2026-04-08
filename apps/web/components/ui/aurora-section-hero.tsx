"use client";

import React, { useState } from "react";

export interface BackgroundSceneProps {
  /** Number of animated light beams */
  beamCount?: number;
}

const BACKGROUND_BEAM_COUNT = 60;

const BackgroundScene: React.FC<BackgroundSceneProps> = ({
  beamCount = BACKGROUND_BEAM_COUNT,
}) => {
  // Lazy initializer: random beam geometry is computed once on mount (client-only— SSR returns
  // an empty array so the initial server HTML is beam-free; the client hydrates with beams).
  const [beams] = useState(() =>
    Array.from({ length: beamCount }).map((_, i) => {
      const riseDur = Math.random() * 2 + 4; // 4–6s rise
      const fadeDur = riseDur; // sync fade
      const dropDur = Math.random() * 3 + 3; // 3–6s drop
      return {
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          width: `${Math.floor(Math.random() * 3) + 1}px`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${riseDur}s, ${fadeDur}s, ${dropDur}s`,
        },
      };
    })
  );

  return (
    <div
      className="scene"
      role="img"
      aria-label="Animated digital data background"
    >
      <div className="floor" />
      <div className="main-column" />
      <div className="light-stream-container">
        {beams.map((beam) => (
          <div key={beam.id} className="light-beam" style={beam.style} />
        ))}
      </div>
    </div>
  );
};

export default BackgroundScene;
