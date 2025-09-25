import "./index.css";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import StateContext from "../../context/StateContext";

const Navbar = (props) => {
  const { requiredclass } = props;
  return (
    <StateContext.Consumer>
      {(value) => {
        const { dropdown, onClickDropdown } = value;

        return (
          <div className={`NavbarContainer ${requiredclass}`}>
            <h1 className="logomain">
              News<span className="logospan">Morph</span>
            </h1>
            <ul type="none" className="OptionsonNavbar">
              <Link className="LinkEffectremove">
                <button className="optionbuttoncontainer">
                  <li>Home</li>
                </button>
              </Link>
              <Link className="LinkEffectremove">
                <button className="optionbuttoncontainer">
                  <li>Features</li>
                </button>
              </Link>
              <Link className="LinkEffectremove">
                <button className="optionbuttoncontainer">
                  <li>About</li>
                </button>
              </Link>
              <Link className="LinkEffectremove">
                <button className="optionbuttoncontainer">
                  <li>Contact</li>
                </button>
              </Link>
            </ul>
            {dropdown && (
              <ul className="dropdownMenu">
                <li className="dropdownItem" onClick={value.onClickDropdown}>
                  <Link to="/" className="dropdownLink">
                    Home
                  </Link>
                </li>
                <li className="dropdownItem" onClick={value.onClickDropdown}>
                  <Link to="/features" className="dropdownLink">
                    Features
                  </Link>
                </li>
                <li className="dropdownItem" onClick={value.onClickDropdown}>
                  <Link to="/about" className="dropdownLink">
                    About
                  </Link>
                </li>
                <li className="dropdownItem" onClick={value.onClickDropdown}>
                  <Link to="/contact" className="dropdownLink">
                    Contact
                  </Link>
                </li>
              </ul>
            )}
            <div className="dropdown" onClick={onClickDropdown}>
              <GiHamburgerMenu className="hamburgermenu" />
            </div>
          </div>
        );
      }}
    </StateContext.Consumer>
    
  );
};
//fake comment for azure deployment
export default Navbar;
