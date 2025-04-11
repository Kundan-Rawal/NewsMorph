import { RiAiGenerate2 } from "react-icons/ri";
import "./index.css";
const InputWord = () => {
  return (
    <div className="mainshadowonfocus">
      <div className="wordsinputcontainer">
        <div className="anothercontainer">
          <input
            type="number"
            className="maininpyuttoadd"
            placeholder="Custom Number of words"
          />
        </div>
        <RiAiGenerate2 size={55} className="ailogo" />
      </div>
    </div>
  );
};
export default InputWord;
