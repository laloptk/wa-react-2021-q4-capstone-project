import './style.scss';
import Header from './components/Header';
import HomeContent from './components/HomeContent';
import ListingContent from './components/ListingContent';
import Footer from './components/Footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const pageSlug = window.location.pathname;
   console.log(pageSlug);
  return (
    <div className="App">
      <Header />
      { 
        pageSlug === '/' &&
          <HomeContent />
      }
      {
        pageSlug === '/list' &&
          <ListingContent />
      }
      <Footer />
    </div>
  );
}

export default App;
