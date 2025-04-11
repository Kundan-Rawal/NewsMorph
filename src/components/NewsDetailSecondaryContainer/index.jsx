import "./index.css";
import { Component } from "react";

class NewsDetailSecondaryContainer extends Component {
  componentDidMount() {
    this.getdata;
  }
  render() {
    const { source_name } = this.props;
    return (
      <div className="NewsDetailSecondaryContainer">
        <div className="MoreFromSourceContainer">
          <h1 className="headingformoresourcecont">{`More from ${source_name}`}</h1>
        </div>
      </div>
    );
  }
}
export default NewsDetailSecondaryContainer;
