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
        <span>Press</span>
        <span>For</span>
        <span>Joy</span>
      </button>
      <p className="hero-audio-hint">(Turn your volume on)</p>
      <audio ref={audioRef} preload="none" src="/audio/snowmobile-joy.mp3" />
    </div>
  );
}
