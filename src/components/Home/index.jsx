import "./index.css";
import { CgProfile } from "react-icons/cg";
import { IoLogOut } from "react-icons/io5";
import { Navigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Component } from "react";
import Navbar from "../Navbar";

const category = [
  { id: "all", dispText: "All" },
  { id: "business", dispText: "Business" },
  { id: "entertainment", dispText: "Entertainment" },
  { id: "sports", dispText: "Sports" },
  { id: "market", dispText: "Market" },
];

class Home extends Component {
  state = { activecat: "all" };

  onClickCatOption = (idnew) => {
    this.setState({ activecat: idnew });
  };

  onClickLogout = () => {
    localStorage.removeItem("userInfo");
    this.setState({ login: false });
    window.location.href = "/login";
  };

  render() {
    const { activecat } = this.state;
    const storedUser = localStorage.getItem("userInfo");
    const parsedUser = JSON.parse(storedUser);
    if (!storedUser) {
      return <Navigate to="/login" />;
    }
    return (
      <div className="mainHomeContainer">
        <div className="leftSideBar">
          <div className="profilecontainer">
            <p className="userproftext">User Profile</p>
            <CgProfile className="mainprofilelogo" />
            <p className="emailtext">{parsedUser.displayName}</p>
            <p className="emailmaintexttext">{parsedUser.email}</p>
            <button
              className="editprofilebutton"
              onClick={() => this.onClickLogout()}
            >
              <p>Logout</p>
              <IoLogOut className="editlogo" />
            </button>
          </div>
        </div>
        <div className="rightsideMainContainer">
          <Navbar />
          <div className="searchandcountrycontainer">
            <div className="inputmaincontainer">
              <input
                className="searchnewsBar"
                placeholder="Search"
                type="search"
              />
              <FaSearch className="searchiconinbar" />
            </div>
            <div class="dropdown-container">
              <select id="country" name="country" class="custom-select">
                <option value="us" className="optionincoutrysel">
                  United States
                </option>
                <option value="in" selected className="optionincoutrysel">
                  India
                </option>
                <option value="uk" className="optionincoutrysel">
                  United Kingdom
                </option>
                <option value="ca" className="optionincoutrysel">
                  Canada
                </option>
              </select>
            </div>
          </div>
          <div className="CategoryContainer">
            <h2 className="Categeorytext">Categeory :</h2>
            <ul type="none" className="ulnewscatcontianer">
              {category.map((each) => {
                return (
                  <li
                    className={`optionulactive${activecat === each.id}`}
                    onClick={() => this.onClickCatOption(each.id)}
                  >
                    {each.dispText}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
