import "./index.css";
import Navbar from "../Navbar";
import imageinai from "../../assets/image (1).png";
import { AiOutlineSlack } from "react-icons/ai";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { TbVacuumCleaner } from "react-icons/tb";
import { VscWordWrap } from "react-icons/vsc";
import { FaAd } from "react-icons/fa";

const Features = () => {
  return (
    <div>
      <Navbar />
      <div className="featureslandingmaincontainer">
        <div className="page1features">
          <div className="mainpagetextcontainer">
            <h1 className="feat_Main_heading animate-on-load delay-1">
              Read the news Your Way !
            </h1>
            <p className="heading_descr_para animate-on-load delay-2">
              AI Powers Now In A News Application..
            </p>
            <h1 className="feat_Main_heading animate-on-load delay-3">
              Why we stand out ?
            </h1>
            <ul>
              <li className="licontainermix mt-3 animate-on-load delay-4">
                <AiOutlineSlack color="#c20202" size={50} />
                <p className="WWSOtitles ml-5">AI Based Optimisations.</p>
              </li>
              <li className="licontainermix animate-on-load delay-5">
                <MdOutlinePublishedWithChanges
                  className="mainlogoinsidefeatli mt-3"
                  size={50}
                />
                <p className="WWSOtitles ml-5">Easy News Tweaking.</p>
              </li>
              <li className="licontainermix mt-3 animate-on-load delay-6">
                <TbVacuumCleaner className="mainlogoinsidefeatli" size={50} />
                <p className="WWSOtitles ml-5">Clean UI.</p>
              </li>
              <li className="licontainermix mt-3 animate-on-load delay-7">
                <VscWordWrap className="mainlogoinsidefeatli" size={50} />
                <p className="WWSOtitles ml-5">Custom Word Length.</p>
              </li>
              <li className="licontainermix mt-3 animate-on-load delay-8">
                <FaAd className="mainlogoinsidefeatli" size={50} />
                <p className="WWSOtitles ml-5">Less Advertisements.</p>
              </li>
            </ul>
          </div>

          <div className="vignette-wrapper">
            <img src={imageinai} className="imageofaiinfeatures" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
