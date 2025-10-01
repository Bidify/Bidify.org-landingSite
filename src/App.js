import Navbar from "./patterns/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import PartnersPage from "./pages/partnersPage";
import Footer from "./patterns/Footer";
// import IntroAnimation from "./components/IntroAnimation";

function App() {
  return (
    <Router>
      {/* <IntroAnimation /> */}
      <Navbar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/partners" component={PartnersPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
