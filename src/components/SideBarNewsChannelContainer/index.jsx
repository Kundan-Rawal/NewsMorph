import "./index.css";
const SideBarNewsChannelContainer = (props) => {
  const { country, onClickSource, onwebview } = props;

  const TopReturner = () => {
    if (country === "in") {
      return [
        {
          id: "thehindu",
          dispname: "The Hindu",
          logoUrl: "https://i.bytvi.com/domain_icons/thehindu.png",
        },
        {
          id: "economictimes_indiatimes",
          dispname: "Economic Times",
          logoUrl:
            "https://i.bytvi.com/domain_icons/economictimes_indiatimes.png",
        },
        {
          id: "toi",
          dispname: "Times Of India",
          logoUrl: "https://i.bytvi.com/domain_icons/toi.png",
        },
        {
          id: "hindustantimes",
          dispname: "Hindustan Times",
          logoUrl:
            "https://cdn.freelogovectors.net/wp-content/uploads/2021/12/hindustan-times-logo-freelogovectors.net_.png",
        },
      ];
    } else if (country === "us") {
      return [
        {
          id: "newser",
          dispname: "Newser",
          logoUrl:
            "https://cdn.freelogovectors.net/wp-content/uploads/2021/12/hindustan-times-logo-freelogovectors.net_.png",
        },
        {
          id: "gamespot",
          dispname: "Gamespot",
          logoUrl: "https://i.bytvi.com/domain_icons/gamespot.png",
        },
        {
          id: "cnbc",
          dispname: "CNBC",
          logoUrl: "https://i.bytvi.com/domain_icons/cnbc.png",
        },
        {
          id: "yahoo",
          dispname: "Yahoo! News",
          logoUrl:
            "https://cdn.freelogovectors.net/wp-content/uploads/2021/12/hindustan-times-logo-freelogovectors.net_.png",
        },
      ];
    } else if (country === "gb") {
      return [
        {
          id: "cambrian_news",
          dispname: "Cambrian News",
          logoUrl: "https://i.bytvi.com/domain_icons/cambrian_news.jpg",
        },
        {
          id: "edinburghnews",
          dispname: "Edinburgh News",
          logoUrl: "https://i.bytvi.com/domain_icons/edinburghnews.png",
        },
        {
          id: "blackpoolgazette",
          dispname: "Blackpool Gazette",
          logoUrl: "https://i.bytvi.com/domain_icons/blackpoolgazette.png",
        },
        {
          id: "yorkshirepost",
          dispname: "Yorkshire Post",
          logoUrl: "https://i.bytvi.com/domain_icons/yorkshirepost.png",
        },
      ];
    } else if (country === "ca") {
      return [
        {
          id: "torontosun",
          dispname: "Toronto Sun",
          logoUrl: "https://i.bytvi.com/domain_icons/torontosun.png",
        },
        {
          id: "investing_ca",
          dispname: "Investing Canada",
          logoUrl: "https://i.bytvi.com/domain_icons/investing_ca.jpg",
        },
        {
          id: "seekingalpha",
          dispname: "Seeking Alpha",
          logoUrl: "https://i.bytvi.com/domain_icons/seekingalpha.png",
        },
        {
          id: "cbc",
          dispname: "CBC",
          logoUrl: "https://i.bytvi.com/domain_icons/cbc.jpg",
        },
      ];
    }
  };
  return (
    <div className={`ChannelSuggestionsContainer${onwebview === "mb"}`}>
      <div className="mainHeading">
        <h3 className="ReadHead">Read From Top Channels</h3>
      </div>
      <ul className="ulcontainer" type="none">
        {TopReturner().map((each) => (
          <li
            key={each.id}
            className="topeachcontainer"
            onClick={() => onClickSource(each.id)}
          >
            <img src={each.logoUrl} className="logoimagetop" />
            <p className="toppara">{each.dispname}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SideBarNewsChannelContainer;
