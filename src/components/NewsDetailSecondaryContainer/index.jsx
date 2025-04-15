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

      if (response.status === 429) {
        console.warn("🔁 Rate limit hit. Switching API key...");
        if (api < API_KEY_ARRAY.length - 1) {
          this.setState((prev) => ({ api: prev.api + 1 }), this.getdatasource);
        } else {
          this.setState({ api: 0 }, this.getdatasource);
        }
        return;
      }

      const data = await response.json();
      if (Array.isArray(data.results)) {
        this.setState({
          newsListnew: data.results,
          nextPage: data.nextPage || null,
          isLoading: false,
        });
      } else {
        console.warn("⚠️ Unexpected response format.");
        this.setState({ isLoading: false });
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
              <div>
                <button
                  onClick={this.handlePrev}
                  disabled={currentIndex === 0}
                  className="arraowbuttonlg"
                >
                  <GrPrevious size={20} color="#fff" />
                </button>
              </div>
              <div className="news-card-after-cont">
                {currentNews.image_url && (
                  <img
                    src={currentNews.image_url}
                    alt={currentNews.title}
                    className="news-img"
                  />
                )}
                <div className="morefromtextdetailsfornews">
                  <h2 className="titleofrelatednews">{currentNews.title}</h2>
                  <p className="paragraphforrelatednews">
                    {currentNews.description}
                  </p>
                </div>
              </div>
              <div>
                <button
                  onClick={this.handleNext}
                  disabled={currentIndex === newsListnew.length - 1}
                  className="arraowbuttonlg"
                >
                  <GrNext size={20} color="#fff" />
                </button>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}

          <button className="bg-red-600 hover:bg-red-800 transition-colors px-4 py-2 rounded-md font-medium cursor-pointer text-white">
            Read More
          </button>
          <div className="carousel-controls">
            <button
              onClick={this.handlePrev}
              disabled={currentIndex === 0}
              className="arraowbuttonsm"
            >
              <GrPrevious size={20} color="#fff" />
            </button>
            <p className="postindicator mb-5">{`Post : ${
              currentIndex + 1
            }/10`}</p>
            <button
              onClick={this.handleNext}
              disabled={currentIndex === newsListnew.length - 1}
              className="arraowbuttonsm"
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
