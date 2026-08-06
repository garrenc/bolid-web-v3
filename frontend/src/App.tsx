import Header from "./components/Header";
import Footer from "./components/Footer";
import AudioPlayer from "./components/AudioPlayer";
import Home from "./pages/Home";
import Reglament from "./pages/Reglament";
import Privacy from "./pages/Privacy";
import { AudioProvider } from "./contexts/AudioContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

          <Footer />
        </div>
      </Router>
    </AudioProvider>
  );
}

export default App;
