import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "../../pages/AboutPage";
import Contact from "../../pages/ContactPage";
import HomePage from "../../pages/HomePage";
import PostDetails from "../../pages/PostDetails";
import MainNav from "./MainNav";
import './style.css';

function Header() {
  return (
    <Router>
      <MainNav />
      <div className="mainContainer">
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path=":id" element={<PostDetails />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default Header;
