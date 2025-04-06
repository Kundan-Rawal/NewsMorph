import { Component } from "react";
import { Navigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import StateContext from "../../context/StateContext";
import "./index.css";

class LoginPage extends Component {
  render() {
    return (
      <StateContext.Consumer>
        {(value) => {
          const { isLoggedIn, handleGoogleSignIn } = value;
          const storedUser = localStorage.getItem("userInfo");
          if (isLoggedIn) {
            return <Navigate to="/home" />;
          }
          if (storedUser) {
            return <Navigate to="/home" />;
          }
          return (
            <div className="loginPageBackground">
              <h1 className="MainLoginPageheading">
                News<span className="spaninlogo">Morph</span>
              </h1>
              <form className="mainloginformcontainer">
                <p className="logintext">Login/Register</p>
                <div className="inputfieldcontainer">
                  <label htmlFor="username" className="inputlabeltext">
                    Email Address
                  </label>
                  <input id="username" className="inputfield" />
                </div>
                <div className="inputfieldcontainer">
                  <label htmlFor="password" className="inputlabeltext">
                    Password
                  </label>
                  <input id="password" className="inputfield" />
                </div>
                <button type="submit" className="Loginbuttonmain">
                  Login
                </button>
                <p className="forgotpassword">
                  <span className="forgetpassspan">Forgot Password ?</span> /
                  New User <span className="signupalltime">Signup</span>
                </p>
                <button
                  type="button"
                  className="buttongooglelogin"
                  onClick={handleGoogleSignIn}
                >
                  <FcGoogle className="googlelogo" />
                  <div className="continuegoogle">
                    <p>Continue With Google...</p>
                  </div>
                </button>
              </form>
            </div>
          );
        }}
      </StateContext.Consumer>
    );
  }
}
export default LoginPage;
