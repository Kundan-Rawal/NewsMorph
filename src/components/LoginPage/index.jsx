import { Component } from "react";
import { FcGoogle } from "react-icons/fc";
import "./index.css";

class LoginPage extends Component {
  render() {
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
            <input id="username" className="inputfield" />
          </div>
          <button type="submit" className="Loginbuttonmain">
            Login
          </button>
          <p className="forgotpassword">
            <span className="forgetpassspan">Forgot Password ?</span> / New User{" "}
            <span className="signupalltime">Signup</span>
          </p>
          <button className="buttongooglelogin">
            <FcGoogle className="googlelogo" />
            <div className="continuegoogle">
              <p>Continue With Google...</p>
            </div>
          </button>
        </form>
      </div>
    );
  }
}
export default LoginPage;
