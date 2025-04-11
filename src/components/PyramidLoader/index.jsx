import "./index.css";
const PyramidLoader = () => {
  return (
    <div className="pyramid-loader-wrapper flex justify-center items-center py-10">
      <div
        className="pyramid-loader 
      flex justify-center items-center h-screen"
      >
        <div className="wrapper">
          <span className="side side1"></span>
          <span className="side side2"></span>
          <span className="side side3"></span>
          <span className="side side4"></span>
          <span className="shadow"></span>
        </div>
      </div>
    </div>
  );
};

export default PyramidLoader;
