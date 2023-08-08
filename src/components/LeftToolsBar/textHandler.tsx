import { useContext } from "react";
import { AddCustomText } from "../../utils/helpers/canvasFuncs";
import CanvasesContext from "../../contexts/CanvasesContext";

const TextHandler = () => {
  const { canvas } = useContext(CanvasesContext);

  return (
    <div className="text">
      <div className="text-props">
        <p>Click text to add to page</p>

        <button
          onClick={() =>
            AddCustomText(canvas!, {
              left: 90,
              top: 20,
              fontSize: 60,
              fontFamily: "Arial",
            },'Add heading')
          }
        >
          <h1>Add a heading</h1>
        </button>
        <button
          onClick={() =>
            AddCustomText(canvas!, {
              left: 100,
              top: 100,
              fontSize: 32,
              fontFamily: "Arial",
            },'Add subheading')
          }
        >
          <h2>Add a subheading</h2>
        </button>
        <button
          onClick={() =>
            AddCustomText(canvas!, {
              left: 100,
              top: 180,
              fontSize: 20,
              fontFamily: "Arial",
            },'Add paragraph')
          }
        >
          <h3>Add a paragraph</h3>
        </button>
      </div>
    </div>
  );
};

export default TextHandler;
