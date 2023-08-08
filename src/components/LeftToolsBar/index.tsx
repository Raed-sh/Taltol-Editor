import { ImagesHandler } from "./imagesHandler";
import { useEffect, useState } from "react";
import { ITool } from "../../utils/types";
import { TOOLS } from "../../utils/constants";
import { IconComponent } from "../IconComponent";
import { ReactComponent as LeftArr } from "../../assets/icons/left_arr.svg";
import QuotesHandler from "./quotesHandler";
import TopicsHandler from "./topicsHandler";
import TextHandler from "./textHandler";
import UploadImages from "./uploadHandler";
import VideosHandler from "./videosHandler";

export const LeftToolsBar = () => {
  const [tool, setTool] = useState<ITool>(TOOLS[1]);
  const [closeMenu, setCloseMenu] = useState(false);

  const handleTool = (t: any) => {
    setTool(t);
    setCloseMenu((val) => val && false);
  };

 
  return (
    <div className="tools-bar">
      <ul className="left-tools">
        {TOOLS.map((t) => {
          return (
            <li
              key={t.title}
              onClick={() => handleTool(t)}
              className={t.title === tool?.title ? "active" : ""}
            >
              <IconComponent
                className={t.title === tool?.title ? "home__icon" : ""}
                title={t.title}
              />
              <span>{t.title}</span>
            </li>
          );
        })}
      </ul>
      <div
        className={
          !closeMenu ? "slide-menu-wrapper" : "slide-menu-wrapper closed"
        }
      >
        <div className="slide-menu">
          {tool.title === "images" && <ImagesHandler />}
          {tool.title === "quotes" && <QuotesHandler />}
          {tool.title === "topics" && <TopicsHandler />}
          {tool.title === "text" && <TextHandler />}
          {tool.title === "uploads" && <UploadImages />}
          {tool.title === 'videos' && <VideosHandler/>}
        </div>
        <div className="close-menu" onClick={() => setCloseMenu((val) => !val)}>
          <LeftArr />
        </div>
      </div>
    </div>
  );
};
