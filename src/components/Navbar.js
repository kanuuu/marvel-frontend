import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  return (
    <div className="nav">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/lereacteur-apollo/image/upload/v1582097342/react-new-exercices/Marvel/langfr-1920px-MarvelLogo.svg_uw9pi8.png"
          className="nav-logo"
          alt=""
        />
      </Link>

      <div style={{ display: "flex", gap: "15px", fontSize: "20px" }}>
        <Link to="/comics" className="navbar-item">
          <FontAwesomeIcon icon="fa-book-open" />
          <span className="hidden">Comics</span>
        </Link>
        <Link to="/characters" className="navbar-item">
          <FontAwesomeIcon icon="fa-mask" />
          <span className="hidden">Characters</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
