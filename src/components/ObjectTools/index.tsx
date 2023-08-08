import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ReactComponent as DuplicateIcon } from "../../assets/icons/duplicate.svg";
import { ReactComponent as RemoveIcon } from "../../assets/icons/delete.svg";


import {
  DuplicateCanvasObject,
  deleteObjects,
} from "../../utils/helpers/canvasFuncs";

import { TextTools } from "../textTools";
import CanvasesContext from "../../contexts/CanvasesContext";
import 'fabric-history';


export const ObjectTools = () => {
  const { canvas } = useContext(CanvasesContext);

  const [menuPos, setMenuPos] = useState<{
    top: number,
    left: number
  } | undefined>(undefined);

  useEffect(() => {
    const obj = canvas?.getActiveObject();
    if (!canvas?.getActiveObject()) {
      return setMenuPos(undefined);
    }
    return setMenuPos({
      top: obj?.top! < 0 ? 0 : obj?.top!,
      left: obj?.left! < 0 ? 0 : obj?.left!
    })
    
  }, [canvas?.getActiveObject()])

  function toggleTextMenu() {
    const text_tools = document.getElementById('text-tools') as HTMLDivElement;
    text_tools.style.visibility = "visible";
  }

  useEffect(() => {
    if (!canvas) return;
      canvas.on('selection:created', function (e) {
        setMenuPos({ left: e.selected![0].left!, top: e.selected![0].top! });
      });

      canvas.on('selection:updated', (e) => {
        setMenuPos({ left: e.selected![0].left!, top: e.selected![0].top! });
      });

      canvas.on('selection:cleared', function () {
        canvas.discardActiveObject();
      });

      canvas.on('object:modified', (e) => {
        const {left, top} = e.target ?? {left:0, top:0}
        setMenuPos({ left: left! < 0 ? 0 : left!, top: top! < 0 ? 0 : top! });
      });

      canvas.on('object:moving', function (e) {
        const {left, top} = e.target ?? {left:0, top:0}
        setMenuPos({ left: left! < 0 ? 0 : left!, top: top! < 0 ? 0 : top! });
      });

      canvas.on("mouse:dblclick", (e: any) => {
        const obj = canvas.getActiveObject();
        if (obj?.type === 'textbox') {
          toggleTextMenu()
        }
      });

      return () => {
        canvas.off('selection:created', function (e) {
          setMenuPos({ left: e.selected![0].left!, top: e.selected![0].top! });
        });

        canvas.off('selection:updated', (e) => {
          setMenuPos({ left: e.selected![0].left!, top: e.selected![0].top! });
        });

        canvas.off('selection:cleared', function () {
          canvas.discardActiveObject();
        });

        canvas.off('object:modified', (e) => {
          const {left, top} = e.target ?? {left:0, top:0}
          setMenuPos({ left: left! < 0 ? 0 : left!, top: top! < 0 ? 0 : top! });
        });

        canvas.off('object:moving', function (e) {
          const {left, top} = e.target ?? {left:0, top:0}
          setMenuPos({ left: left! < 0 ? 0 : left!, top: top! < 0 ? 0 : top! });
        });

        canvas.off("mouse:dblclick", (e: any) => {
          const obj = canvas.getActiveObject();
          if (obj?.type === 'textbox') {
            toggleTextMenu()
          }
        });
      }
  },[canvas]);


  return (
    menuPos ?

      <div className="object-tools"
        id='object-tool'
        key={canvas?.getElement().id}
        style={

          { ...menuPos }
        }
      >
        <DuplicateIcon onClick={() => DuplicateCanvasObject(canvas!)} title="Duplicate" />
        <RemoveIcon onClick={() => deleteObjects(canvas!)} title="Remove" />

        {canvas &&
          canvas.getActiveObject()?.type === "textbox" &&
          <TextTools />
        }
      </div>
      :
      <></>
  )
}