"use client";

import { useRef, useState } from "react";

export function HeroAudioButton() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const pulseTimerRef = useRef<number | null>(null);
  const [isPressed, setIsPressed] = useState(false);

  const toggleAudio = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (pulseTimerRef.current) {
      window.clearTimeout(pulseTimerRef.current);
    }

    setIsPressed(true);
    pulseTimerRef.current = window.setTimeout(() => {
      setIsPressed(false);
      pulseTimerRef.current = null;
    }, 320);

    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
      return;
    }

    audio.pause();
    audio.currentTime = 0;

    try {
      await audio.play();
    } catch {
      audio.currentTime = 0;
    }
  };

  return (
    <div className="hero-audio">
      <button
        aria-label="Play snowmobile sound"
        className="hero-audio-button"
        data-pressed={isPressed ? "true" : "false"}
        onClick={toggleAudio}
        type="button"
      >
        <svg
          aria-hidden="true"
          className="hero-audio-label"
          focusable="false"
          viewBox="0 0 120 120"
        >
          <defs>
            <path
              d="M 60 60 m -42 0 a 42 42 0 1 1 84 0 a 42 42 0 1 1 -84 0"
              id="hero-audio-label-path"
            />
          </defs>
          <text>
            <textPath
              href="#hero-audio-label-path"
              startOffset="50%"
              textAnchor="middle"
            >
              PRESS &bull; FOR &bull; JOY
            </textPath>
          </text>
        </svg>
        <svg
          aria-hidden="true"
          className="hero-audio-ignition"
          focusable="false"
          viewBox="0 0 32 32"
        >
          <path d="M16 5v9" />
          <path d="M10.1 10.6a9 9 0 1 0 11.8 0" />
        </svg>
      </button>
      <p className="hero-audio-hint">(Turn your volume on)</p>
      <audio ref={audioRef} preload="none" src="/audio/snowmobile-joy.mp3" />
    </div>
  );
}
