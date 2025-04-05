import "./index.css";

const FeaturesLandingCard = (props) => {
  const { eachitem } = props;
  return (
    <div className="featurescard">
      <h2 className="featurescardheading">{eachitem.title}</h2>
      <p className="featuresdescr">{eachitem.descr}</p>
    </div>
  );
};
export default FeaturesLandingCard;
