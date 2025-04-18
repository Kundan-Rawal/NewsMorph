import "./index.css";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoLogOut } from "react-icons/io5";
import { TailSpin } from "react-loader-spinner";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Component } from "react";
import SideBarNewsChannelContainer from "../SideBarNewsChannelContainer";
import Navbar from "../Navbar";

const category = [
  { id: "all", dispText: "All" },
  { id: "business", dispText: "Business" },
  { id: "entertainment", dispText: "Entertainment" },
  { id: "environment", dispText: "Environment" },
  { id: "food", dispText: "Food" },
  { id: "health", dispText: "Health" },
  { id: "lifestyle", dispText: "Lifestyle" },
  { id: "politics", dispText: "Politics" },
  { id: "science", dispText: "Science" },
  { id: "sports", dispText: "Sports" },
  { id: "technology", dispText: "Technology" },
  { id: "top", dispText: "Top" },
  { id: "tourism", dispText: "Tourism" },
  { id: "world", dispText: "World" },
];

function withNavigation(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activecat: "all",
      newsList: [],
      SearchItem: "",
      country: "in",
      nextPage: null,
      selectedSource: null,
      isLoading: false,
      api: 1,
    };
    this.scrollRef = React.createRef(); // <-- Add this
  }

  componentDidMount() {
    this.getNewsData();
    if (this.scrollRef.current) {
      this.scrollRef.current.addEventListener("scroll", this.handleScroll);
    }
  }
  componentWillUnmount() {
    if (this.scrollRef.current) {
      this.scrollRef.current.removeEventListener("scroll", this.handleScroll);
    }
  }

  scrollTimeout = null;

  onClickSource = (sourceId) => {
    this.setState(
      {
        selectedSource: sourceId,
        newsList: [],
        nextPage: null,
      },
      this.getNewsData
    );
  };

  handleScroll = () => {
    if (this.scrollTimeout) return;

    this.scrollTimeout = setTimeout(() => {
      const container = this.scrollRef.current;
      const { isLoading, nextPage } = this.state;

      if (
        container.scrollTop + container.clientHeight >=
          container.scrollHeight - 200 &&
        !isLoading &&
        nextPage !== null
      ) {
        this.getNewsData();
      }

      this.scrollTimeout = null;
    }, 300); // delay to avoid rapid fire
  };

  getNewsData = async () => {
    const {
      activecat,
      SearchItem,
      country,
      newsList,
      nextPage,
      selectedSource,
      api,
    } = this.state;

    const API_KEY_ARRAY = [
      "pub_792024dcd61aeea2e22f18e8f9b363af95e53",
      "pub_79207b11d89a30ab35e7123c3a4a54f5b9e32",
      "pub_7893874894b7380c7d7e3720acfbd1a413138",
    ];
    const API_KEY = "pub_79207b11d89a30ab35e7123c3a4a54f5b9e32";
    const baseURL = "https://newsdata.io/api/1/news";

    const usingSource = !!selectedSource;

    const categoryParam =
      !usingSource && activecat !== "all" ? `&category=${activecat}` : "";
    const countryParam = !usingSource ? `&country=${country}` : "";
    const sourceParam = usingSource ? `&domain=${selectedSource}` : "";
    const searchParam = SearchItem
      ? `&q=${encodeURIComponent(SearchItem)}`
      : "";
    const pageParam = nextPage ? `&page=${nextPage}` : "";

    const URL = `${baseURL}?apikey=${API_KEY_ARRAY[api]}&language=en${countryParam}${categoryParam}${searchParam}${pageParam}${sourceParam}`;

    this.setState({ isLoading: true });

    try {
      console.log("📡 API Call:", URL);

      const response = await fetch(URL);
      const data = await response.json();

      if (data.status === "error") {
        console.warn("❌ API Error:", data.message);
        if (api < 3) {
          this.setState((prev) => ({ isLoading: false, api: prev.api + 1 }));
        } else if (api === 3) {
          this.setState({ isLoading: false, api: 0 });
        } else {
          this.setState({ isLoading: false });
        }
        return;
      }

      if (Array.isArray(data.results)) {
        console.log(data.results);
        this.setState({
          newsList: [...newsList, ...data.results],
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

  onClickCatOption = (idnew) => {
    this.setState(
      {
        activecat: idnew,
        newsList: [],
        nextPage: null,
        selectedSource: null,
      },
      this.getNewsData
    );
  };

  onClickLogout = () => {
    localStorage.removeItem("userInfo");
    this.setState({ login: false });
    window.location.href = "/login";
  };

  onChangeSearchNews = (event) => {
    this.setState({ SearchItem: event.target.value });
  };

  handleCountryChange = (event) => {
    this.setState(
      {
        country: event.target.value,
        newsList: [],
        nextPage: null,
        selectedSource: null,
      },
      this.getNewsData
    );
  };
  render() {
    const { newsList, SearchItem, isLoading, country } = this.state;
    const { activecat } = this.state;
    const storedUser = localStorage.getItem("userInfo");
    const parsedUser = JSON.parse(storedUser);
    if (!storedUser) {
      return <Navigate to="/login" />;
    }

    return (
      <div className="mainHomeContainer">
        <div className="leftSideBar">
          <div className="profilecontainer">
            <p className="userproftext">User Profile</p>
            <CgProfile className="mainprofilelogo" />
            <p className="emailtext">{parsedUser.displayName}</p>
            <p className="emailmaintexttext">{parsedUser.email}</p>
            <button
              className="editprofilebutton"
              onClick={() => this.onClickLogout()}
            >
              <p>Logout</p>
              <IoLogOut className="editlogo" />
            </button>
          </div>
        </div>
        <div className="rightsideMainContainer" ref={this.scrollRef}>
          <Navbar />
          <div className="searchandcountrycontainer">
            <div className="inputmaincontainer">
              <input
                className="searchnewsBar"
                placeholder="Search"
                type="search"
                value={SearchItem}
                onChange={this.onChangeSearchNews}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    this.setState(
                      {
                        newsList: [],
                        activecat: "all",
                        nextPage: null,
                      },
                      this.getNewsData
                    );
                  }
                }}
              />
              <FaSearch className="searchiconinbar" />
            </div>
            <div class="dropdown-container">
              <select
                id="country"
                name="country"
                className="custom-select"
                value={this.state.country}
                onChange={this.handleCountryChange}
              >
                <option value="us" className="optionincoutrysel">
                  United States
                </option>
                <option value="in" selected className="optionincoutrysel">
                  India
                </option>
                <option value="gb" className="optionincoutrysel">
                  United Kingdom
                </option>
                <option value="ca" className="optionincoutrysel">
                  Canada
                </option>
              </select>
            </div>
          </div>
          <div className="CategoryContainer">
            <h2 className="Categeorytext">Categeory :</h2>
            <ul type="none" className="ulnewscatcontianer">
              {category.map((each) => {
                return (
                  <li
                    className={`optionulactive${activecat === each.id}`}
                    onClick={() => this.onClickCatOption(each.id)}
                  >
                    {each.dispText}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="NewsContainerAlpha">
            <SideBarNewsChannelContainer
              onClickSource={this.onClickSource}
              country={country}
              onwebview="mb"
            />
            <div className="MainNewsContainer">
              {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                  <TailSpin
                    height="60"
                    width="60"
                    color="#C20202"
                    ariaLabel="loading"
                  />
                </div>
              ) : (
                <ul className="MainnewsCardContainer" type="none">
                  {newsList.length > 0 &&
                    newsList.map((item, index) => {
                      if (!item || !item.title) return null; // Skip if item is invalid

                      return (
                        <li className="newsCard" key={index}>
                          <img
                            src={
                              item.image_url ||
                              "https://bloximages.chicago2.vip.townnews.com/kdminer.com/content/tncms/assets/v3/editorial/b/f2/bf2524e1-56f0-57ff-a99e-c0995bed36df/645b37343c293.image.jpg?resize=1200%2C800"
                            }
                            alt={item.title}
                            className="newsImage"
                          />
                          <div className="mainNewsTextsContainer">
                            <h3 className="newsTitle">{item.title}</h3>
                            <div className="newssupplierdetails">
                              <p className="PublishDate">{`Publish Date : ${item.pubDate.substr(
                                0,
                                10
                              )}`}</p>
                              <div className="Source_Details">
                                <img
                                  src={item.source_icon}
                                  className="soursceIcon"
                                />
                                <p className="PublishDate">
                                  {item.source_name}
                                </p>
                              </div>
                            </div>
                            <button
                              className="readmorebutton"
                              onClick={() => {
                                localStorage.setItem(
                                  "selectedNews",
                                  JSON.stringify(item)
                                ); // Save to localStorage
                                this.props.navigate(
                                  `/news/${item.article_id}`,
                                  {
                                    state: { newsData: item },
                                  }
                                );
                              }}
                            >
                              Read more
                            </button>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              )}
            </div>
            <div className="sidebarNewsContainer">
              <SideBarNewsChannelContainer
                onClickSource={this.onClickSource}
                country={country}
                onwebview="pc"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withNavigation(Home);
