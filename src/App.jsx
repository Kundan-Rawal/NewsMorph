import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import { Navigate } from "react-router-dom";
import StateContext from "./context/StateContext";
import { auth, provider, signInWithPopup } from "./firebase";
import "./App.css";
import NewsDetailPage from "./components/NewsDetailPage";
import Features from "./components/Features";

class App extends Component {
  state = { dropdown: false, isLoggedIn: false, user: null };

  onClickDropdown = () => {
    this.setState((prev) => ({ dropdown: !prev.dropdown }));
  };

  handleGoogleSignIn = async (event) => {
    event.preventDefault();
    try {
      const storedUser = localStorage.getItem("userInfo");
      if (!storedUser) {
        const result = await signInWithPopup(auth, provider);
        this.setState({ isLoggedIn: true });
        localStorage.setItem("userInfo", JSON.stringify(result.user));
      } else {
        <Navigate to="/login" />;
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  render() {
    const { dropdown, isLoggedIn, user } = this.state;
    return (
      <StateContext.Provider
        value={{
          dropdown,
          isLoggedIn,
          user,
          onClickDropdown: this.onClickDropdown,
          handleGoogleSignIn: this.handleGoogleSignIn,
        }}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/features" element={<Features />} />
        </Routes>
      </StateContext.Provider>
    );
  }
}
export default App;
