import { createContext } from "react";
import { fabric } from "fabric";

type CanvasesContext = {
    canvasesList: fabric.Canvas[];
    setCanvasesList: (canvas:fabric.Canvas[]) => void;
    canvas: fabric.Canvas | undefined;
    setCanvas: (canvas: fabric.Canvas) => void;
};

export default createContext<CanvasesContext>({
    canvasesList: [],
    setCanvasesList: () => [],
    canvas: undefined,
    setCanvas: () => {}
});
