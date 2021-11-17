import './style.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import ListingContent from './components/ListingContent';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Search from './components/Search';
import Footer from './components/Footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Checkout from './components/Checkout';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path={["/products", "/products/:page"]}>
            <ListingContent />
          </Route>
          <Route exact path={["/", "/home"]}>
            <Home />
          </Route>
          <Route path="/product/:id">
            <ProductDetail />
          </Route>
          <Route exact path={["/search", "/search/:page"]}>
            <Search />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
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
