import "./index.css";
import React, { Component } from "react";
import { formatDistanceToNow } from "date-fns";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";

// ✅ YOUR REAL IMPORTS (Restored)
import Navbar from "../Navbar";
import NewsDetailSecondaryContainer from "../NewsDetailSecondaryContainer";
import PyramidLoader from "../PyramidLoader";
import InputWord from "../ImportedinputWordLimit";

// 🛑 CORRECT BACKEND URL (Must include '/api' to match your server.js)
const BACKEND_URL = "https://newsmorphbackend.onrender.com/gemini";

function withRouter(Component) {
  return function WrappedComponent(props) {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    return (
      <Component
        {...props}
        location={location}
        params={params}
        navigate={navigate}
      />
    );
  };
}

class NewsDetailPage extends Component {
  state = {
    isArranged: false,
    extendedText: null,
    compressedText: null,
    defaultExtended: null,
    isLoading: false,
    isCooldown: false, // 🔒 Anti-Spam Cooldown
    error: null,
  };

  async componentDidMount() {
    const newsData = this.getNewsDataFromLocation();

    if (!newsData) {
      this.setState({
        defaultExtended:
          "News not found. Please go back and select an article.",
        isLoading: false,
      });
      return;
    }

    if (!localStorage.getItem("userInfo")) {
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ displayName: "Guest", email: "guest@example.com" })
      );
    }

    try {
      this.setState({ isLoading: true });
      const baseText = newsData.description || newsData.title;
      const improvedText = await this.callBackendAI("improve", baseText);

      this.setState({
        defaultExtended: improvedText,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to load default content:", error);
      this.setState({
        defaultExtended: newsData.description,
        isLoading: false,
        error: "AI content unavailable. Showing original text.",
      });
    }
  }

  getNewsDataFromLocation = () => {
    const { location } = this.props;
    if (location?.state?.newsData) {
      return location.state.newsData;
    }
    const stored = localStorage.getItem("selectedNews");
    return stored ? JSON.parse(stored) : null;
  };

  callBackendAI = async (endpoint, baseText) => {
    try {
      const response = await fetch(`${BACKEND_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ baseText }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || `Server Error: ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(`AI Backend Error (${endpoint}):`, error);
      throw error;
    }
  };

  // 🛡️ High-Security Action Wrapper
  handleAction = async (actionType) => {
    const { isLoading, isCooldown } = this.state;

    // Reality Check: If we are already working or cooling down, GTFO.
    if (isLoading || isCooldown) return;

    const newsData = this.getNewsDataFromLocation();
    let baseText = "";

    if (actionType === "extend") {
      baseText =
        this.state.defaultExtended || newsData?.description || newsData?.title;
    } else {
      baseText =
        this.state.extendedText ||
        this.state.defaultExtended ||
        newsData?.description;
    }

    if (!baseText) return;

    this.setState({ isLoading: true, error: null });

    try {
      const result = await this.callBackendAI(actionType, baseText);

      this.setState({
        [actionType === "extend" ? "extendedText" : "compressedText"]: result,
        [actionType === "extend" ? "compressedText" : "extendedText"]: null,
        isLoading: false,
        isCooldown: true, // Start cooldown after success
      });

      // ⏳ Release cooldown after 3 seconds to prevent rapid toggling
      setTimeout(() => this.setState({ isCooldown: false }), 3000);
    } catch (error) {
      this.setState({
        isLoading: false,
        error: error.message,
        isCooldown: false,
      });
    }
  };

  handleDonate = () => {
    const options = {
      key: "rzp_test_cJNh05sqWW2ctq",
      amount: 5 * 100,
      currency: "INR",
      name: "NewsMorph",
      description: "Support the Creator",
      image: "/logo.png",
      handler: (response) =>
        alert(`Payment ID: ${response.razorpay_payment_id}`),
      prefill: { name: "NewsMorph Supporter", email: "donor@example.com" },
      theme: { color: "#C20202" },
    };

    if (window.Razorpay) {
      new window.Razorpay(options).open();
    } else {
      alert("Razorpay SDK failed to load.");
    }
  };

  render() {
    const {
      isLoading,
      isCooldown,
      extendedText,
      compressedText,
      defaultExtended,
      isArranged,
      error,
    } = this.state;

    const newsData = this.getNewsDataFromLocation();

    if (!newsData) {
      return (
        <div className="error-fallback">
          <h2>Article Not Found</h2>
          <p>Please go back and select a valid news article.</p>
          <Link to="/">Return to Home</Link>
        </div>
      );
    }

    const timeAgo = newsData.pubDate
      ? formatDistanceToNow(new Date(newsData.pubDate), { addSuffix: true })
      : "Recently";

    let text =
      compressedText || extendedText || defaultExtended || newsData.description;

    const paragraphs = text
      ? text
          .split(/\n\n|\. /)
          .map((p) => p.trim())
          .filter((p) => p.length > 0)
      : [];

    const isLocked = isLoading || isCooldown;

    return (
      <div className="allLegendaryNewsdetcontainer">
        <Navbar requiredclass="navbarshadow" />
        <div className="NewsDetailAlphacontainer">
          <div className="NewsDetailMainContainer">
            <div className="newsHeadline">
              <p>NEWS HEADLINE ...</p>
            </div>
            <div className="ml-6 w-11/12">
              <hr className="linesnewarheadline" />
              <hr className="linesnewarheadline" />
              <hr className="linesnewarheadline" />
            </div>

            <h1 className="mainHeadingfornewsdetail">{newsData.title}</h1>

            <div className="newsdetailsformain">
              <div className="newsdetsourcedetails justify-between w-full pl-5 pr-5">
                <div className="sourcecontainerinmain">
                  <p className="sourec">Source : </p>
                  {newsData.source_icon && (
                    <img
                      src={newsData.source_icon}
                      className="NewsDetailsSourcelogo"
                      alt="source"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  )}
                  <p className="text-sm ml-2">{newsData.source_name}</p>
                </div>
                <div>
                  <p className="sourec">{`Posted : ${timeAgo}`}</p>
                </div>
              </div>

              <div className="imagecontainerinnewsdetpage">
                <img
                  src={
                    newsData.image_url ||
                    "https://placehold.co/800x400?text=No+Image"
                  }
                  className="imagedescriptionativeurl"
                  alt={newsData.title}
                  onError={(e) =>
                    (e.target.src =
                      "https://placehold.co/800x400?text=No+Image")
                  }
                />
              </div>

              {/* AI Controls */}
              <div className="AIfeaturesContainer">
                <div>
                  <h1 className="gradient-breathing-text">Use AI : </h1>
                </div>
                <div className="buttonsofaimaincontainer">
                  <div className="container-aifeatures">
                    <button
                      className={`buttonforaifeat ${
                        extendedText ? "active-ai" : ""
                      } ${isLocked ? "opacity-50 grayscale" : ""}`}
                      onClick={() => this.handleAction("extend")}
                      disabled={isLocked}
                    >
                      {isLoading && !compressedText
                        ? "Extending..."
                        : extendedText
                        ? "Extended"
                        : "Extend"}
                    </button>
                  </div>
                  <div className="container-aifeatures">
                    <button
                      className={`buttonforaifeat ${
                        isArranged ? "active-ai" : ""
                      }`}
                      onClick={() => this.setState({ isArranged: !isArranged })}
                    >
                      {isArranged ? "Rearranged" : "Rearrange"}
                    </button>
                  </div>
                  <div className="container-aifeatures">
                    <button
                      className={`buttonforaifeat ${
                        compressedText ? "active-ai" : ""
                      } ${isLocked ? "opacity-50 grayscale" : ""}`}
                      onClick={() => this.handleAction("compress")}
                      disabled={isLocked}
                    >
                      {isLoading && !extendedText
                        ? "Compressing..."
                        : compressedText
                        ? "Compressed"
                        : "Compress"}
                    </button>
                  </div>
                  <InputWord />
                </div>
              </div>

              <div className="bordercont">
                <hr className="borderlineafterai" />
              </div>

              {error && (
                <div className="p-4 text-red-600 text-center font-bold text-sm bg-red-50 rounded-lg">
                  {error}
                </div>
              )}

              {isLoading ? (
                <PyramidLoader />
              ) : (
                <div className="mainparafornewsdetailcontainer">
                  {isArranged ? (
                    <ul className="list-disc flex flex-col items-center">
                      {paragraphs.map((para, index) => (
                        <li key={index} className="parafornewsdet mb-4">
                          {para + (para.endsWith(".") ? "" : ".")}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex flex-col items-center p-0">
                      {text.split("\n").map((chunk, idx) => (
                        <p key={idx} className="parafornewsdet mb-4">
                          {chunk}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <NewsDetailSecondaryContainer source_name={newsData.source_id} />

            <footer className="bg-black text-white mt-12 pb-5 w-screen z-50 flex flex-col justify-between">
              <div className="w-screen mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                  <h2 className="text-2xl font-bold text-red-600">NewsMorph</h2>
                  <p className="mt-2 text-gray-400 text-center">
                    Morph your news. Read it your way.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
                  <ul className="space-y-1 text-gray-400">
                    <li>
                      <Link to="/" className="hover:text-white">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/about" className="hover:text-white">
                        About
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="text-xl font-semibold mb-2">
                    Support the Creator
                  </h3>
                  <button
                    className="bg-red-600 hover:bg-red-800 px-4 py-2 rounded-md transition-colors"
                    onClick={this.handleDonate}
                  >
                    Donate via UPI
                  </button>
                </div>
              </div>
              <div className="mt-5 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
                © 2025 NewsMorph. All rights reserved.
              </div>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NewsDetailPage);
