import { FC, useContext, useEffect, useRef } from "react";
import CanvasesContext from "../../contexts/CanvasesContext";
import CanvasTools from "./canvasTools";
import './styles.css';
import { fabric } from 'fabric';
import { deleteObjects, handleCopy, handlePaste } from "../../utils/helpers/canvasFuncs";
import { ICanvasProps } from "../../utils/types";



export const CanvasCard: FC<ICanvasProps> = (props) => {

    const { canvasesList, canvas, setCanvas } = useContext(CanvasesContext);
    const CanvasContainerRef = useRef<HTMLDivElement>(null);

    const canvasSetter = () => {
        setCanvas(canvasesList.filter((canv) => canv?.getElement()?.id! === props.canvasId)[0]);
    };

    function onKeyDownHandler(event: KeyboardEvent) {

      const activeElement = document.activeElement;
      if (activeElement?.tagName === 'INPUT' || activeElement?.tagName === 'TEXTAREA') {
        // Allow typing in input or textarea elements
        return;
      }
        event.preventDefault();
        event.stopPropagation();
        if (!canvas) return;
        if (event.ctrlKey) {
          switch (event.key) {
            case "z":
              (canvas as any).undo();
              break;
            case "y":
              (canvas as any).redo();
              break;
            case "c":
              handleCopy(canvas!);
              break;
            case "v":
              handlePaste(canvas!);
              break;
            case "x":
              handleCopy(canvas!);
              deleteObjects(canvas!)
              break;
            case "a":
              canvas?.discardActiveObject();
              canvas?.setActiveObject(new fabric.ActiveSelection(canvas.getObjects(), {
                canvas: canvas,
              })).renderAll();
              break;
            default:
              break;
          }
        }
        if (event.key === 'Delete') {
          deleteObjects(canvas!)
        }
    };
      

    useEffect(() => {
      document.addEventListener('keydown', onKeyDownHandler)

      return () => document.removeEventListener('keydown',onKeyDownHandler)
    });

      // document.onkeydown = onKeyDownHandler;


    return (
        <div className="canvas-container" style={{
            display: !props.isLastChildrenIndex ? '' : 'none',
            zIndex: 2
        }
    }
            ref={CanvasContainerRef}
            onClick={canvasSetter }
            id={`c${props.canvasId}`}
        >
            <label className="canvas-title">Page title: <input placeholder="we are the champions"/>
            
            </label>
            <CanvasTools
                addNewCanvas={props.addNewCanvas}
                cloneCanvas={props.cloneCanvas}
                deleteCanvas={props.deleteCanvas}
            />
            <canvas
                key={props.canvasId}
                id={props.canvasId}
                style={{
                boxShadow: canvas?.getElement()?.id! === props.canvasId ? ' rgba(0, 0, 0, 0.35) 0px 5px 15px' : '',
                }}
            />
            {props.children}
        </div>
    )
}