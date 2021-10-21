import './style.scss';
import Header from './components/Header';
import HomeContent from './components/HomeContent';
import Footer from './components/Footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div className="App">
      <Header />
      <HomeContent />
      <Footer />
    </div>
  );
}

export default App;
