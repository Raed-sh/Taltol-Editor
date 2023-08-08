import React, { FC, useState } from "react";
import { useDragAndDrop } from "./useDragAndDrop";
import images_coll from "../../assets/icons/images_coll.svg";
import { IUPLOADEDIMAGES } from "../../utils/types";



const DragAndDrop: FC<IUPLOADEDIMAGES> = ({
  uploadedImages,
  setUploadedImages,
}) => {
  const [isUrl, setIsUrl] = useState(false);
  const [url, setUrl] = useState<string>();

  const {
    dragOver,
    setDragOver,
    onDragOver,
    onDragLeave,
    fileDropError,
    setFileDropError,
  } = useDragAndDrop();

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    setDragOver(false);

    const selectedFile = e?.dataTransfer?.files[0];

    if (selectedFile.type.split("/")[0] !== "image") {
      return setFileDropError("Please provide an image file to upload!");
    }

    setUploadedImages([...uploadedImages!, selectedFile]);
  };

  const fileSelect = (e: any) => {
    let selectedFile = e?.target?.files[0];
    if (selectedFile.type.split("/")[0] !== "image") {
      return setFileDropError("Please provide an image file to upload!");
    }
    // check if image exisit
    // console.log(uploadedImages.indexOf(selectedFile) > -1); //true

    setUploadedImages([...uploadedImages, selectedFile]);
  };

  const handleUrlImport = async (url?: string) => {
    if (url) {
      const file = await createFile(url);
      if (file) {
        setUploadedImages([...uploadedImages, file]);
      }
    }
    setUrl("");
    setIsUrl((val) => !val);
  };

  async function createFile(url: string) {
    let file;
    if (url) {
      let response = await fetch(url);
      let data = await response.blob();
      let metadata = {
        type: "image/png",
      };
      file = new File([data], "image.png", metadata);
    }
    return file;
  }

  return (
    <div
      className="dnd-cont"
      style={{ borderColor: `${dragOver ? "green" : ""}` }}
    >
      {!isUrl ? (
        <div className={!dragOver ? "dnd-title" : "dnd-title drop"}>
          {!dragOver ? (
            <h3 style={{ color: `${dragOver ? " green" : ""}` }}>
              <img src={images_coll} />
              Drag and drop image
            </h3>
          ) : (
            <h3>Drop here...</h3>
          )}
        </div>
      ) : (
        <input
          type={"url"}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Add Image URL..."
        />
      )}

      <form>
        {/* {fileDropError && (
          <span className="file-drop-error">{fileDropError}</span>
        )} */}

        <label
          htmlFor="file"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div
            className="dnd-btn browse"
            style={{
              opacity: dragOver ? 0 : 1,
              transition: "all 200ms ease",
              backgroundColor: !isUrl ? "#C4C4C4" : "",
              color: !isUrl ? "#4F4F4F" : "",
            }}
            onClick={() => handleUrlImport()}
          >
            Browse
          </div>
          <input type="file" name="file" id="file" onChange={fileSelect} />
        </label>
      </form>
      <div className="dnd-btns">
        <button
          className="dnd-btn import"
          onClick={() => handleUrlImport(url)}
          style={{
            opacity: dragOver ? 0 : 1,
            transition: "all 200ms ease",
            backgroundColor: isUrl ? "#C4C4C4" : "",
            color: isUrl ? "#4F4F4F" : "",
          }}
        >
          Import From URL
        </button>
      </div>
    </div>
  );
};

export default DragAndDrop;

// <span>
//   <img src={URL.createObjectURL(file)} />
// </span>
