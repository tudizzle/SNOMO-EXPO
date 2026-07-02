"use client";

import { useRef } from "react";

export function HeroAudioButton() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

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
        aria-label="Play snowmobile audio"
        className="hero-audio-button"
        onClick={toggleAudio}
        type="button"
      >
        Press for Joy
      </button>
      <audio ref={audioRef} preload="none" src="/audio/snowmobile-joy.mp3" />
    </div>
  );
}
