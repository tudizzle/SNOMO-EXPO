"use client";

import { useRef } from "react";

export function HeroAudioButton() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = async () => {
    const audio = audioRef.current;

    if (!audio) {
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
        onClick={playAudio}
        type="button"
      >
        Press for Joy
      </button>
      <audio ref={audioRef} preload="none" src="/audio/snowmobile-joy.mp3" />
    </div>
  );
}
