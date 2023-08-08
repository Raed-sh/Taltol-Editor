import { FC, useContext, useMemo, useState } from "react";
import DragAndDrop from "../DnD";
import fill from "../../assets/icons/fill.svg";
import decor from "../../assets/icons/decor.svg";
import remove from "../../assets/icons/remove.svg";
import { onAddImg } from "../../utils/helpers/canvasFuncs";
import CanvasesContext from "../../contexts/CanvasesContext";

const UploadImages: FC = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const { canvasesList, setCanvas, canvas } = useContext(CanvasesContext);


  const images = useMemo(() => uploadedImages, [uploadedImages]);


  return (
    <div className="images-handler">
      <DragAndDrop
        uploadedImages={uploadedImages!}
        setUploadedImages={setUploadedImages}
      />
      {/* <ol>
        <div>
          <li>
            <img src={fill} alt="" />
          </li>
          <li>
            <img src={decor} alt="" />
          </li>
        </div>
        <li>
          <img src={remove} alt="" />
        </li>
      </ol> */}

      <ul className="gallery">
        {images &&
          images.length > 0 &&
          images.map((image, idx) => {
            return (
              <li
                key={idx}
                onClick={() =>
                  onAddImg(canvas!, URL.createObjectURL(image))
                }
              >
                <img src={URL.createObjectURL(image)} />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default UploadImages;
