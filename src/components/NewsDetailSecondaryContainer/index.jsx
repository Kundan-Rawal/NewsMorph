import "./index.css";
import { Component } from "react";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

class NewsDetailSecondaryContainer extends Component {
  state = {
    newsListnew: [],
    nextPage: 0,
    source_name: this.props.source_id,
    api: 0,
    currentIndex: 0,
  };

  componentDidMount() {
    this.getdatasource();
  }

  getdatasource = async () => {
    const { source_name } = this.props;
    const { api } = this.state;

    const API_KEY_ARRAY = [
      "pub_792024dcd61aeea2e22f18e8f9b363af95e53",
      "pub_79207b11d89a30ab35e7123c3a4a54f5b9e32",
      "pub_7893874894b7380c7d7e3720acfbd1a413138",
    ];

    const baseURL = "https://newsdata.io/api/1/news";
    const URL = `${baseURL}?apikey=${API_KEY_ARRAY[api]}&language=en&domain=${source_name}`;

    this.setState({ isLoading: true });

    try {
      const response = await fetch(URL);
      const data = await response.json();

      if (data.status === "error") {
        console.warn("❌ API Error: Changing Active api", data.message);
        if (api < API_KEY_ARRAY.length - 1) {
          this.setState((prev) => ({ isLoading: false, api: prev.api + 1 }));
        } else {
          this.setState({ isLoading: false, api: 0 });
        }
        return;
      }

      if (Array.isArray(data.results)) {
        console.log(data.results);
        this.setState({
          newsListnew: data.results,
          nextPage: data.nextPage || null,
          isLoading: false,
        });
      } else {
        console.warn("⚠️ Unexpected or empty response.");
        this.setState({ isLoading: false, nextPage: null });
      }
    } catch (err) {
      console.error("🔥 Fetch error:", err);
      this.setState({ isLoading: false });
    }
  };

  handleNext = () => {
    this.setState((prevState) => ({
      currentIndex: Math.min(
        prevState.currentIndex + 1,
        prevState.newsListnew.length - 1
      ),
    }));
  };

  handlePrev = () => {
    this.setState((prevState) => ({
      currentIndex: Math.max(prevState.currentIndex - 1, 0),
    }));
  };

  render() {
    const { source_name } = this.props;
    const { newsListnew, currentIndex } = this.state;

    const currentNews = newsListnew[currentIndex];

    return (
      <div className="NewsDetailSecondaryContainer">
        <div className="MoreFromSourceContainer">
          <h1 className="headingformoresourcecont">
            More from{" "}
            <span className="text-white font-extrabold">{source_name}</span>
          </h1>

          {currentNews ? (
            <div className="news-card">
              {currentNews.image_url && (
                <img
                  src={currentNews.image_url}
                  alt={currentNews.title}
                  className="news-img"
                />
              )}
              <h2 className="titleofrelatednews">{currentNews.title}</h2>
              <p className="paragraphforrelatednews">
                {currentNews.description}
              </p>
            </div>
          ) : (
            <p>Loading...</p>
          )}

          {/* Navigation Buttons */}
          <div className="carousel-controls">
            <button
              onClick={this.handlePrev}
              disabled={currentIndex === 0}
              className="arraowbutton"
            >
              <GrPrevious size={20} color="#fff" />
            </button>
            <p className="postindicator">{`Post : ${currentIndex + 1}/10`}</p>
            <button
              onClick={this.handleNext}
              disabled={currentIndex === newsListnew.length - 1}
              className="arraowbutton"
            >
              <GrNext size={20} color="#fff" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default NewsDetailSecondaryContainer;
