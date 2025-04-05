import "./index.css";
import FeaturesLandingCard from "../FeaturesLandingCard";
import Navbar from "../Navbar";

const LandingPage = () => {
  const featuresArray = [
    {
      title: "AI Summarizer",
      descr:
        "Summarises News Instantly With Gemini AI, Long Articles Made Short & Sweet",
    },
    {
      title: "Length Control",
      descr: "Need More Detail Or Less Clutter ? Choose Info You Want To Read.",
    },
    {
      title: "Clean UI",
      descr: "Designed for Focus,Minimal UI with Dark Mode",
    },
  ];

  return (
    <div className="LandingPage">
      <Navbar />
      <div className="Landingpagemaincontainer">
        <h1 className="MainTagline">
          Shape The News,
          <br />
          Your Way.
        </h1>
        <p className="TitleDescr">
          NewsMorph lets you read articles the way YOU want Shorter, Longer,
          More Focused.
          <br />
          Built with AI to fill the flow.
        </p>
        <div>
          <button class="relative flex items-center px-6 py-3 mt-10 mb-10 cursor-pointer overflow-hidden font-medium transition-all bg-red-500 rounded-md group">
            <span class="absolute top-0 right-0 inline-block w-5 h-5 transition-all duration-500 ease-in-out bg-red-800 rounded group-hover:-mr-4 group-hover:-mt-4">
              <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span class="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-800 rounded group-hover:-ml-4 group-hover:-mb-4">
              <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-red-800 rounded-md group-hover:translate-x-0"></span>
            <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
              Get Started
            </span>
          </button>
        </div>
        <h1 className="Featurstagline">Features That Stand Out</h1>
        <ul type="none" className="rowalignerul">
          {featuresArray.map((each) => (
            <li key={each.title}>
              <FeaturesLandingCard eachitem={each} />
            </li>
          ))}
        </ul>
        <p className="copyrighttextlast">
          © 2025{" "}
          <span className="logofullinspan">
            News<span className="copyrightlogospan">Morph</span>
          </span>
          . All rights reserved.
        </p>
      </div>
    </div>
  );
};
export default LandingPage;
