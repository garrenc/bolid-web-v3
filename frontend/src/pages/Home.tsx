import React, { useEffect, useRef } from "react";
import {
  MapPin,
  Phone,
  Radio,
  Globe,
  Smartphone,
  Play,
  Pause,
  Send,
} from "lucide-react";
import ContactForm from "../components/ContactForm";
import { useAudio } from "../contexts/AudioContext";

const Home: React.FC = () => {
  const { isPlaying, isLoading, togglePlayPause } = useAudio();

  const handleMobileAppClick = () => {
    const userAgent =
      navigator.userAgent || navigator.vendor || (window as any).opera;

    // Check if it's an iOS device
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      // Redirect to iOS App Store
      window.open(
        "https://apps.apple.com/us/app/%D1%80%D0%B0%D0%B4%D0%B8%D0%BE-%D0%B1%D0%BE%D0%BB%D0%B8%D0%B4/id1483483936",
        "_blank"
      );
    }
    // Check if it's an Android device
    else if (/android/i.test(userAgent)) {
      // Redirect to Google Play Store
      window.open(
        "https://www.rustore.ru/catalog/app/fm.bolid.android",
        "_blank"
      );
    }
    // For any other devices
    else {
      // Redirect to main website
      window.open("https://bolidfm.ru", "_blank");
    }
  };

  const [showQRCode, setShowQRCode] = React.useState(false);

  const qrCodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showQRCode && qrCodeRef.current) {
      qrCodeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showQRCode]);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-main">
              <div className="hero-text">
                <h1 className="hero-title">Радио БОЛИД</h1>
                <p className="hero-subtitle">
                  То, что нужно, из всего, что можно!
                </p>
              </div>

              {/* Player Widget in Hero */}
              <div className="hero-player-widget">
                <div className="player-widget-content">
                  <div className="current-track-info">
                    <div className="live-badge">
                      <span className="live-dot"></span>
                      <span>LIVE</span>
                    </div>
                    <div className="track-details">
                      <h3>Слушать онлайн</h3>
                    </div>
                  </div>
                  <div className="play-controls">
                    <button
                      className="hero-play-btn"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-info-grid">
            <div className="contact-info-card">
              <div className="contact-icon">
                <Globe size={24} />
              </div>
              <div className="contact-details">
                <h3>Реклама на радио</h3>
                <a
                  href="https://advradio.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  advradio.ru
                </a>
              </div>
            </div>{" "}
            <div className="contact-info-card">
              <div className="contact-icon">
                <Phone size={24} />
              </div>
              <div className="contact-details">
                <h3>Офис</h3>
                <a href="tel:+73422334149" className="contact-link">
                  +7 342 233 41 49
                </a>
              </div>
            </div>{" "}
            <div className="contact-info-card">
              <div className="contact-icon">
                <MapPin size={24} />
              </div>
              <div className="contact-details">
                <h3>Адрес</h3>
                <p className="contact-address">
                  614000, г. Пермь
                  <br />
                  ул. Куйбышева 37-602
                </p>
              </div>
            </div>{" "}
            <div className="contact-info-card">
              <div className="contact-icon">
                <Radio size={24} />
              </div>
              <div className="contact-details">
                <h3>Телефон эфира</h3>
                <a href="tel:+73422393399" className="contact-link">
                  +7 342 239 33 99
                </a>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-icon">
                <Send size={24} />
              </div>
              <div className="contact-details">
                <h3>Утро Болид</h3>
                <a href="https://t.me/utrobolid" className="contact-link">
                  @utrobolid
                </a>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-icon">
                <Smartphone size={24} />
              </div>
              <div className="contact-details">
                <h3>Мобильное приложение</h3>
                <div className="app-links">
                  {window.innerWidth <= 768 ? (
                    <button
                      onClick={handleMobileAppClick}
                      className="contact-link mobile-app-button"
                    >
                      Скачать приложение
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowQRCode(!showQRCode)}
                      className="contact-link qr-code-button"
                    >
                      Показать QR-код
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QR Code Section */}
      {showQRCode && (
        <section className="qr-code-section" ref={qrCodeRef}>
          <div className="container">
            <div className="qr-code-content">
              <h2>Скачайте приложение</h2>
              <p>Отсканируйте QR-код для скачивания</p>
              <div className="qr-codes">
                <div className="qr-code-item">
                  <img src="/qr-ios.png" alt="QR Code for iOS" />
                  <h3>iOS (App Store)</h3>
                  <p>Для iPhone и iPad</p>
                </div>
                <div className="qr-code-item">
                  <img src="/qr-android.png" alt="QR Code for Android" />
                  <h3>Android (RuStore)</h3>
                  <p>Для Android устройств</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Form - Full Width */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-form-full-width">
            <div className="contact-form-header">
              <h2>Напишите нам</h2>
              <p>Оставьте сообщение и мы обязательно вам ответим</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map - Full Width */}
      <section className="contact-map-section">
        <div className="container">
          <div className="contact-map-full-width">
            <div className="contact-map-header">
              <h2>Найти нас</h2>
              <p>614000, г. Пермь, ул. Куйбышева 37-602</p>
            </div>

            <div className="map-container">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3Afec41a22ea2f8d32a6acc8f93c0b235404b600d7384cf4a63d7e36fef90204ae&amp;source=constructor"
                width="100%"
                height="300"
                frameBorder="0"
                title="Радио Болид - Местоположение"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
