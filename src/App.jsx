import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import StateContext from "./context/StateContext";
import "./App.css";

class App extends Component {
  state = { dropdown: false };

  onClickDropdown = () => {
    this.setState((prev) => ({ dropdown: !prev.dropdown }));
  };

  render() {
    const { dropdown } = this.state;
    return (
      <StateContext.Provider
        value={{
          dropdown,
          onClickDropdown: this.onClickDropdown,
        }}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </StateContext.Provider>
    );
  }
}
export default App;
