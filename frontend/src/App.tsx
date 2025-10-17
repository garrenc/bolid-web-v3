import Header from "./components/Header";
import AudioPlayer from "./components/AudioPlayer";
import Home from "./pages/Home";
import Reglament from "./pages/Reglament";
import Privacy from "./pages/Privacy";
import { AudioProvider } from "./contexts/AudioContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <AudioProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/reglament" element={<Reglament />} />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
          </main>

          {/* Global Fixed Bottom Audio Player */}
          <div className="global-audio-player">
            <AudioPlayer />
          </div>

          {/* Footer */}
          <footer className="footer">
            <div className="container">
              <div className="footer-content">
                {" "}
                <div className="footer-section">
                  <h4>Радио Болид</h4>
                  <p>Подключайтесь!</p>
                </div>
                <div className="footer-section">
                  <h4>Контакты</h4>
                  <p>
                    Телефон: <a href="tel:+73422334149">+73422334149</a>
                  </p>
                  <p>
                    Email:{" "}
                    <a href="mailto:office@bolidfm.ru">office@bolidfm.ru</a>
                  </p>
                </div>
                <div className="footer-section">
                  <h4>Адрес</h4>
                  <p>614000, г. Пермь, ул. Куйбышева 37-602</p>
                </div>
                <div className="footer-section">
                  <h4>Следите за нами</h4>
                  <div className="social-links">
                    <a
                      href="https://vk.com/radiobolid"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="ВКонтакте"
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1.33-1.48-1.508-1.744-1.508-.357 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.644v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.644-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .763.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z" />
                      </svg>
                    </a>
                    <a
                      href="https://t.me/radiobolid_bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Telegram"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.youtube.com/@radiobolidVPSV"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </div>
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
        </div>
      </Router>
    </AudioProvider>
  );
}

export default App;
