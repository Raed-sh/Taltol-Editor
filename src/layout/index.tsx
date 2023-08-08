import { FC, memo, ReactNode, useState } from "react";
import CanvasesContext from "../contexts/CanvasesContext";

const Layout: FC<any> = memo((props: { children: ReactNode[] }) => {
  const [canvasesList, setCanvasesList] = useState<fabric.Canvas[]>([]);
  const [selectedCanvas, setSelectedCanvas] = useState<fabric.Canvas>();

  const setCanvases = (canvases: fabric.Canvas[]) => {
    setCanvasesList(canvases);
  };

  const setCanvas = (canvas: fabric.Canvas) => {
    setSelectedCanvas(canvas);
  };

  return (
    <CanvasesContext.Provider
      value={{
        canvasesList:canvasesList,
        setCanvasesList: setCanvases,
        canvas:selectedCanvas,
        setCanvas:setCanvas
      }}
    >
      
        {props.children}
    </CanvasesContext.Provider>
  );
});

export default Layout;
