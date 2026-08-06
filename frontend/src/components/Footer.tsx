import React from "react";
import { Link } from "react-router-dom";
import { useAudio } from "../contexts/AudioContext";
import SocialLinks from "./SocialLinks";

const Footer: React.FC = () => {
  const { togglePlayPause } = useAudio();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {" "}
          <div className="footer-section">
            <h4>Радио Болид</h4>
            <p>
              <button
                type="button"
                className="footer-connect-button"
                onClick={togglePlayPause}
              >
                Подключайтесь
              </button>
              !
            </p>
          </div>
          <div className="footer-section">
            <h4>Контакты</h4>
            <p>
              Телефон: <a href="tel:+73422334149">+73422334149</a>
            </p>
            <p>
              Email: <a href="mailto:office@bolidfm.ru">office@bolidfm.ru</a>
            </p>
          </div>
          <div className="footer-section">
            <h4>Адрес</h4>
            <p>614000, г. Пермь, ул. Куйбышева 37-602</p>
          </div>
          <div className="footer-section">
            <h4>Следите за нами</h4>
            <SocialLinks />
          </div>{" "}
          <div className="footer-section">
            <nav className="footer-links">
              <Link to="/reglament">Регламент</Link> |{" "}
              <Link to="/privacy">Политика конфиденциальности</Link>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 БОЛИД radio. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
