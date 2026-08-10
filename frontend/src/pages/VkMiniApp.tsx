import React, { useEffect } from "react";
import { MessageCircle, Pause, Play } from "lucide-react";
import bolidLogo from "../assets/images/bolid-logo.jpg";
import { useAudio } from "../contexts/AudioContext";

const STREAM_URL = "https://icecast-bulteam.cdnvideo.ru/bolid128";

const VkMiniApp: React.FC = () => {
  const { isPlaying, isLoading, audioRef, togglePlayPause, setIsPlaying } =
    useAudio();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = STREAM_URL;
    }
  }, [audioRef]);

  return (
    <div className="vk-page">
      <audio
        ref={audioRef}
        src={STREAM_URL}
        preload="none"
        onEnded={() => setIsPlaying(false)}
        onError={() => setIsPlaying(false)}
      />

      <main className="vk-shell">
        <section className="vk-player-panel">
          <div className="vk-brand-row">
            <img src={bolidLogo} alt="БОЛИД" className="vk-logo" />
            <div className="vk-live-indicator">
              <span className="live-dot" />
              <span>В эфире</span>
            </div>
          </div>

          <div className="vk-player-body">
            <div className="vk-station-kicker">Радио Болид 88.0 FM</div>
            <h1>Слушать прямой эфир</h1>

            <button
              type="button"
              className="vk-play-button"
              onClick={togglePlayPause}
              disabled={isLoading}
              aria-label={isPlaying ? "Пауза" : "Слушать"}
            >
              {isLoading ? (
                <span className="loading-spinner" />
              ) : isPlaying ? (
                <Pause size={34} />
              ) : (
                <Play size={34} />
              )}
              <span>{isPlaying ? "Пауза" : "Слушать"}</span>
            </button>
          </div>
        </section>

        <a
          className="vk-message-button"
          href="https://vk.me/radiobolid"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={24} />
          <span>Написать сообщение</span>
        </a>
      </main>
    </div>
  );
};

export default VkMiniApp;
