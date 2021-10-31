import './style.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header';
import HomeContent from './components/HomeContent';
import ListingContent from './components/ListingContent';
import Footer from './components/Footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/products">
            <ListingContent />
          </Route>
          <Route exact path={["/", "/home"]}>
            <HomeContent />
          </Route>
          <Route path="*">
            Page Not Found
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
