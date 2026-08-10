import Header from "./components/Header";
import Footer from "./components/Footer";
import AudioPlayer from "./components/AudioPlayer";
import Home from "./pages/Home";
import Reglament from "./pages/Reglament";
import Privacy from "./pages/Privacy";
import VkMiniApp from "./pages/VkMiniApp";
import { AudioProvider } from "./contexts/AudioContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";

function AppLayout() {
  const { pathname } = useLocation();
  const isVkPage = pathname === "/vk";

  if (isVkPage) {
    return (
      <div className="App vk-app">
        <Routes>
          <Route path="/vk" element={<VkMiniApp />} />
        </Routes>
      </div>
    );
  }

  return (
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
  );
}

function App() {
  return (
    <AudioProvider>
      <Router>
        <AppLayout />
      </Router>
    </AudioProvider>
  );
}

export default App;
