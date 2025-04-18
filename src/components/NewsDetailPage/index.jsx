import "./index.css";
import { Component } from "react";
import Navbar from "../Navbar";
import NewsDetailSecondaryContainer from "../NewsDetailSecondaryContainer";
import { formatDistanceToNow } from "date-fns";
import { useLocation, useParams } from "react-router-dom";
import PyramidLoader from "../PyramidLoader";
import InputWord from "../ImportedinputWordLimit";
import {
  getExtendedContent,
  getCompressedContent,
  getDefaultExtendedContent,
} from "../../GeminiFolders/geminiAPI";
import { LiaEthernetSolid } from "react-icons/lia";

function withRouter(Component) {
  return function WrappedComponent(props) {
    const location = useLocation();
    const params = useParams();
    return <Component {...props} location={location} params={params} />;
  };
}

class NewsDetailPage extends Component {
  state = {
    isArranged: false,
    extendedText: null,
    compressedText: null,
    defaultExtended: null,
    isLoading: false,
  };

  async componentDidMount() {
    let newsData = this.props.location.state?.newsData;

    // Try to load from localStorage if state is missing (like on page reload)
    if (!newsData) {
      const stored = localStorage.getItem("selectedNews");
      if (stored) {
        newsData = JSON.parse(stored);
      }
    }

    if (!newsData) {
      return this.setState({ defaultExtended: "News not found." });
    }

    const defaultExtended = await getDefaultExtendedContent(newsData);

    this.setState({
      defaultExtended: defaultExtended,
      compressedText: null,
      isLoading: false,
    });
  }
  handleDonate = () => {
    const options = {
      key: "rzp_test_cJNh05sqWW2ctq", // Replace with your Razorpay Key ID
      amount: 5 * 100, // 100 INR in paise
      currency: "INR",
      name: "NewsMorph",
      description: "Support the Creator",
      image: "/logo.png", // Optional logo
      handler: function (response) {
        alert(`Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "NewsMorph Supporter",
        email: "donor@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#C20202", // Match NewsMorph branding
      },
      method: {
        upi: true,
        card: false,
        netbanking: false,
        wallet: false,
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  handleExtend = async () => {
    this.setState({ isLoading: true });

    const baseText =
      this.state.defaultExtended ||
      this.props.location.state.newsData.description ||
      this.props.location.state.newsData.title;

    const extended = await getExtendedContent(baseText);

    this.setState({
      extendedText: extended,
      isLoading: false,
      compressedText: null,
    });
  };

  handleCompress = async () => {
    this.setState({ isLoading: true });

    const baseText =
      this.state.extendedText ||
      this.state.defaultExtended ||
      this.props.location.state.newsData.description ||
      this.props.location.state.newsData.title;

    const compressed = await getCompressedContent(baseText);

    this.setState({
      compressedText: compressed,
      isLoading: false,
      extendedText: null,
    });
  };

  render() {
    const { isArranged, isLoading, extendedText, compressedText } = this.state;
    const { location } = this.props;
    let newsData = location?.state?.newsData;
    if (!newsData) {
      const stored = localStorage.getItem("selectedNews");
      if (stored) {
        newsData = JSON.parse(stored);
      }
    }

    const objectrequired = newsData;

    const dateString = objectrequired.pubDate;
    if (!dateString) {
      return <p>Invalid date format</p>;
    }
    const timeAgo = formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
    });

    let text =
      compressedText ||
      extendedText ||
      this.state.defaultExtended ||
      objectrequired.description;

    const paragraphs = text
      ? text
          .split(". ")
          .map((p) => p.trim())
          .filter((p) => p)
          .map((p) => p + ".")
      : [];

    const rearrange = () => {
      this.setState((prev) => ({ isArranged: !prev.isArranged }));
    };
    return (
      <>
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
              <h1 className="mainHeadingfornewsdetail">
                {objectrequired.title}
              </h1>
              <div className="newsdetailsformain ">
                <div className="newsdetsourcedetails justify-between w-full pl-5 pr-5">
                  <div className="sourcecontainerinmain">
                    <p className="sourec">Source : </p>
                    <img
                      src={objectrequired.source_icon}
                      className="NewsDetailsSourcelogo"
                    />
                    <p className="text-sm ml-2">{objectrequired.source_name}</p>
                  </div>
                  <div>
                    <p className="sourec">{`Posted : ${timeAgo}`}</p>
                  </div>
                </div>
                <div className="imagecontainerinnewsdetpage">
                  <img
                    src={objectrequired.image_url}
                    className="imagedescriptionativeurl"
                  />
                </div>
                <div className="AIfeaturesContainer">
                  <div>
                    <h1 className="gradient-breathing-text">Use AI : </h1>
                  </div>
                  <div className="buttonsofaimaincontainer">
                    <div className="container-aifeatures">
                      <button
                        className={`buttonforaifeat buttonforaifeat${
                          extendedText !== null
                        }`}
                        onClick={this.handleExtend}
                      >
                        {extendedText === null ? "Extend" : "Extended"}
                      </button>
                    </div>
                    <div className="container-aifeatures">
                      <button
                        className={`buttonforaifeat buttonforaifeat${isArranged}`}
                        onClick={() => rearrange()}
                      >
                        {isArranged ? "Rearranged" : "Rearrange"}
                      </button>
                    </div>
                    <div className="container-aifeatures">
                      <button
                        className={`buttonforaifeat buttonforaifeat${
                          compressedText !== null
                        }`}
                        onClick={this.handleCompress}
                      >
                        {compressedText === null ? "Compress" : "Compressed"}
                      </button>
                    </div>
                    <InputWord />
                  </div>
                </div>
                <div className="bordercont">
                  <hr className="borderlineafterai" />
                </div>
                {isLoading || this.state.defaultExtended === null ? (
                  <PyramidLoader />
                ) : (
                  <div className="mainparafornewsdetailcontainer">
                    {isArranged ? (
                      <ul className="list-disc flex flex-col items-center">
                        {paragraphs.map((para, index) => (
                          <li
                            key={index}
                            style={{ marginBottom: "10px" }}
                            className="parafornewsdet"
                          >
                            {para}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="list-disc flex flex-col items-center p-0">
                        <p
                          style={{ marginBottom: "10px" }}
                          className="parafornewsdet"
                        >
                          {text}
                        </p>
                      </ul>
                    )}
                  </div>
                )}
              </div>
              <NewsDetailSecondaryContainer
                source_name={objectrequired.source_id}
              />
              <footer className="bg-black text-white mt-12 pb-5 w-screen z-50 flex flex-col justify-between">
                <div className="w-screen mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Brand Section */}
                  <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold text-red-600">
                      NewsMorph
                    </h2>
                    <p className="mt-2 text-gray-400 text-center">
                      Morph your news. Read it your way.
                    </p>
                  </div>

                  {/* Useful Links */}
                  <div className="flex flex-col items-center">
                    <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
                    <ul className="space-y-1 text-gray-400">
                      <li>
                        <a href="/" className="hover:text-white">
                          Home
                        </a>
                      </li>
                      <li>
                        <a href="/about" className="hover:text-white">
                          About
                        </a>
                      </li>
                      <li>
                        <a href="/privacy" className="hover:text-white">
                          Privacy Policy
                        </a>
                      </li>
                      <li>
                        <a href="/contact" className="hover:text-white">
                          Contact
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Creator Support */}
                  <div className="flex flex-col items-center">
                    <h3 className="text-xl font-semibold mb-2">
                      Support the Creator
                    </h3>
                    <p className="text-gray-400 mb-2 text-center">
                      Liked what we built ? Show some love 💖
                    </p>
                    <button
                      className="bg-red-600 hover:bg-red-800 transition-colors px-4 py-2 rounded-md font-medium cursor-pointer"
                      onClick={this.handleDonate}
                    >
                      Donate via UPI
                    </button>
                  </div>
                </div>

                {/* Bottom Text */}
                <div className="mt-5 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
                  © 2025 NewsMorph. All rights reserved.
                </div>
              </footer>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(NewsDetailPage);

//AIzaSyBHmkXlD4a5vftbfSm-FbvxGEZYFkJsJmI
