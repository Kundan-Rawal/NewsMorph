import "./index.css";
import { Component } from "react";
import Navbar from "../Navbar";
import NewsDetailSecondaryContainer from "../NewsDetailSecondaryContainer";
import { formatDistanceToNow } from "date-fns";
import PyramidLoader from "../PyramidLoader";
import InputWord from "../ImportedinputWordLimit";

class NewsDetailPage extends Component {
  render() {
    const objectrequired = {
      article_id: "2401c4e578ca1a26726b452fa788f06c",
      category: ["top"],
      country: ["india"],
      creator: ["ABP Live News"],
      description:
        "To ensure a smoother and more comfortable travel experience for passengers during the summer holiday rush, Indian Railways has announced a series of special trains. These special trains are scheduled to run from April 21 to July 12, targeting heavily crowded routes and popular destinations.In view of the crowd, the Railway will run three special trains. Special trains including Delhi-Varanasi will run from 21 April to 12 July. There will be 35 trips of weekly and triweekly trains, officials confirmed.Among the highlighted services is the Delhi-Varanasi (04024/23) Special Train, which will commence on April 21 and continue operations until July 11. This weekly train will run 35 trips in total, departing from Delhi at 10:30 PM and from Varanasi at 5:17 AM. The train will make a key stoppage at Moradabad after Ghaziabad. Another addition is the Bhatinda-Varanasi (04518/17) Special Train, which will operate on a biweekly schedule during the same period—April 21 to July 12—with a total of 35 trips. This train will halt at Moradabad and Bareilly, arriving at Moradabad at 5:40 AM and departing from Varanasi at 8:00 AM.Also included in the lineup is the Lucknow-Chandigarh (04209/10) Special Train, which will run three times a week. It will operate from April 21 to July 10, departing from Lucknow on Monday, Wednesday, and Friday, and from Chandigarh on Tuesday, Thursday, and Saturday. The Lucknow departure is scheduled for 8:45 PM, reaching Moradabad at 2:15 AM, while the return train will arrive in Moradabad at 3:25 PM.These three services are part of a broader effort. “Railways has run 29 special trains so far” to manage peak travel demands during the summer, particularly during the Vaishnodevi Yatra and holiday travel towards Bihar.The other special trains include services between Varanasi to Shri Mata Vaishnodevi, Varanasi-Chandigarh, Anand Vihar-Muzaffarpur, Anand Vihar-Barauni, Lucknow-New Delhi, Rajgir-Haridwar, and Rajgir to Shaheed Captain Tushar Mahajan Udhampur. According to Senior DCM, there will be six and twelve trips of special trains. These trains will also run till July.",
      duplicate: false,
      image_url:
        "https://feeds.abplive.com/onecms/images/uploaded-images/2025/03/07/e9306d2f1877b67a378abcf83b94c5e41741321493321645_original.jpg",
      keywords: ["news"],
      language: "english",
      link: "https://news.abplive.com/news/summer-special-trains-3-new-trains-to-run-from-april-21-check-dates-routes-timings-stoppages-1764334",
      pubDate: "2025-04-10 10:19:00",
      pubDateTZ: "UTC",
      source_icon: "https://i.bytvi.com/domain_icons/abplive.jpg",
      source_id: "bbc",
      source_name: "Abp News",
      source_priority: 7754,
      source_url: "http://abplive.com",
      title:
        "Summer Special Trains: 3 New Trains to Run From April 21 – Check Dates, Routes, Timings & Stoppages",
      video_url: null,
    };

    const tagsarray = [
      ...objectrequired.keywords,
      ...objectrequired.category,
      ...objectrequired.country,
    ];

    const dateString = objectrequired.pubDate; // your date
    const timeAgo = formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
    });

    const text = objectrequired.description;

    const paragraphs = text
      ? text
          .split(". ")
          .map((p) => p.trim())
          .filter((p) => p)
          .map((p) => p + ".")
      : [];
    return (
      <div className="allLegendaryNewsdetcontainer">
        <Navbar requiredclass="navbarshadow" />
        <div className="NewsDetailAlphacontainer">
          <div className="NewsDetailMainContainer">
            <div className="newsHeadline">
              <p>NEWS HEADLINE ...</p>
            </div>
            <div>
              <hr className="linesnewarheadline" />
              <hr className="linesnewarheadline" />
              <hr className="linesnewarheadline" />
            </div>
            <h1 className="mainHeadingfornewsdetail">{objectrequired.title}</h1>
            <div className="newsdetailsformain ">
              <div className="newsdetsourcedetails justify-between w-full">
                <div className="sourcecontainerinmain">
                  <p className="sourec">Source : </p>
                  <img
                    src={objectrequired.source_icon}
                    className="NewsDetailsSourcelogo"
                  />
                  <p className="text-lg ml-2">{objectrequired.source_name}</p>
                </div>
                <div>
                  <p className="sourec mr-10">{`Posted : ${timeAgo}`}</p>
                </div>
              </div>
              <div className="imagecontainerinnewsdetpage">
                <img
                  src={objectrequired.image_url}
                  className="imagedescriptionativeurl"
                />
              </div>
              <div className="AIfeaturesContainer">
                <h1 className="gradient-breathing-text">
                  Tune News with AI :{" "}
                </h1>
                <div className="container-aifeatures">
                  <button className="buttonforaifeat">Extend</button>
                </div>
                <div className="container-aifeatures">
                  <button className="buttonforaifeat">Rearrange</button>
                </div>
                <div className="container-aifeatures">
                  <button className="buttonforaifeat">Compress</button>
                </div>
                <InputWord />
              </div>
              <div className="bordercont">
                <hr className="borderlineafterai" />
              </div>
              <div className="mainparafornewsdetailcontainer">
                {paragraphs.map((para, index) => (
                  <p
                    key={index}
                    style={{ marginBottom: "10px" }}
                    className="parafornewsdet"
                  >
                    {para}
                  </p>
                ))}
                {paragraphs.map((para, index) => (
                  <p
                    key={index}
                    style={{ marginBottom: "10px" }}
                    className="parafornewsdet"
                  >
                    {para}
                  </p>
                ))}
                {paragraphs.map((para, index) => (
                  <p
                    key={index}
                    style={{ marginBottom: "10px" }}
                    className="parafornewsdet"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <NewsDetailSecondaryContainer
            source_name={objectrequired.source_id}
          />
        </div>
      </div>
    );
  }
}

export default NewsDetailPage;
