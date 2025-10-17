import React, { useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useAudio } from "../contexts/AudioContext";

interface AudioPlayerProps {
  streamUrl?: string;
  stationName?: string;
  currentTrack?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  streamUrl = "https://icecast-bulteam.cdnvideo.ru/bolid128",
  stationName = "Радио Болид",
  currentTrack = "Прямая трансляция",
}) => {
  const {
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    isMuted,
    setIsMuted,
    isLoading,
    audioRef,
    togglePlayPause,
  } = useAudio();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted, audioRef]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  const handleAudioError = () => {
    setIsPlaying(false);
    console.error("Audio stream error");
  };

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={streamUrl}
        onEnded={handleAudioEnd}
        onError={handleAudioError}
        preload="auto"
      />

      <div className="player-container">
        {/* Left Section - Play Button */}
        <div className="player-left">
          <button
            className={`play-btn ${isPlaying ? "playing" : ""}`}
            onClick={togglePlayPause}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : isPlaying ? (
              <Pause size={24} />
            ) : (
              <Play size={24} />
            )}
          </button>
        </div>

        {/* Center Section - Station Info */}
        <div className="player-center">
          <div className="station-info">
            <div className="station-name">{stationName}</div>
            <div className="current-track">{currentTrack}</div>
          </div>
        </div>

        {/* Right Section - Volume */}
        <div className="player-right">
          <button className="volume-btn" onClick={toggleMute}>
            {isMuted || volume === 0 ? (
              <VolumeX size={18} />
            ) : (
              <Volume2 size={18} />
            )}
          </button>
          <div className="volume-slider-container">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="volume-slider"
              style={{
                background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${
                  (isMuted ? 0 : volume) * 100
                }%, #e5e7eb ${(isMuted ? 0 : volume) * 100}%, #e5e7eb 100%)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
