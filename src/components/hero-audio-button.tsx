"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";

type AudioWindow = Window & {
  webkitAudioContext?: typeof AudioContext;
};

export function HeroAudioButton() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const analyserDataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const pulseTimerRef = useRef<number | null>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [smokeLevel, setSmokeLevel] = useState(0);

  const stopSmoke = () => {
    if (animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    setIsPlaying(false);
    setSmokeLevel(0);
  };

  const setupAnalyser = (audio: HTMLAudioElement) => {
    if (analyserRef.current) {
      return analyserRef.current;
    }

    const AudioContextClass =
      window.AudioContext || (window as AudioWindow).webkitAudioContext;

    if (!AudioContextClass) {
      return null;
    }

    const audioContext = new AudioContextClass();
    const source = audioContext.createMediaElementSource(audio);
    const analyser = audioContext.createAnalyser();

    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.82;
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    audioContextRef.current = audioContext;
    audioSourceRef.current = source;
    analyserRef.current = analyser;
    analyserDataRef.current = new Uint8Array(analyser.fftSize);

    return analyser;
  };

  const startSmoke = () => {
    const analyser = analyserRef.current;
    const analyserData = analyserDataRef.current;

    setIsPlaying(true);

    if (!analyser || !analyserData) {
      setSmokeLevel(0.42);
      return;
    }

    const updateSmoke = () => {
      analyser.getByteTimeDomainData(analyserData);

      const sum = analyserData.reduce((total, value) => {
        const normalized = (value - 128) / 128;

        return total + normalized * normalized;
      }, 0);
      const rms = Math.sqrt(sum / analyserData.length);
      const level = Math.min(1, Math.max(0.08, rms * 4.4));

      setSmokeLevel(level);
      animationFrameRef.current = window.requestAnimationFrame(updateSmoke);
    };

    updateSmoke();
  };

  useEffect(() => {
    return () => {
      stopSmoke();

      if (pulseTimerRef.current) {
        window.clearTimeout(pulseTimerRef.current);
      }

      void audioContextRef.current?.close();
    };
  }, []);

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
      stopSmoke();
      return;
    }

    audio.pause();
    audio.currentTime = 0;

    try {
      const analyser = setupAnalyser(audio);

      if (audioContextRef.current?.state === "suspended") {
        await audioContextRef.current.resume();
      }

      await audio.play();
      startSmoke();

      if (!analyser) {
        setSmokeLevel(0.42);
      }
    } catch {
      audio.currentTime = 0;
      stopSmoke();
    }
  };

  const smokeStyle = {
    "--smoke-intensity": smokeLevel.toFixed(3),
  } as CSSProperties;

  return (
    <div
      className="hero-audio"
      data-playing={isPlaying ? "true" : "false"}
      style={smokeStyle}
    >
      <span className="hero-audio-smoke" aria-hidden="true" />
      <button
        aria-label="Play snowmobile sound"
        className="hero-audio-button"
        data-pressed={isPressed ? "true" : "false"}
        onClick={toggleAudio}
        type="button"
      >
        <Image
          alt=""
          className="hero-audio-image"
          draggable="false"
          height={1024}
          src="/images/icons/press-for-joy-track-ring-button-transparent.png"
          unoptimized
          width={1024}
        />
      </button>
      <span className="hero-audio-label">sound ON</span>
      <audio
        onEnded={stopSmoke}
        ref={audioRef}
        preload="none"
        src="/audio/snowmobile-joy.mp3"
      />
    </div>
  );
}
