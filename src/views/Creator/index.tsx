import {
  FC, useCallback, useContext, useEffect, useRef, useState,
} from "react";
import { fabric } from 'fabric';
import { LeftToolsBar } from "../../components/LeftToolsBar";
import { Canvases } from "../../components/Canvases";
import CanvasesContext from "../../contexts/CanvasesContext";
import { ReactComponent as Arrow } from '../../assets/icons/left_arr.svg';
import { ReactComponent as Add } from '../../assets/icons/add.svg';
import { initAligningGuidelines } from "../../utils/helpers/initAligningGuidelines";
import { IcanvasesRef } from "../../utils/types";


const Creator: FC = () => {

  const childCounRef = useRef<IcanvasesRef>({
    children: ['canvas-element-0'],
    last_child: 0
  });
  const { canvas, canvasesList, setCanvas, setCanvasesList } = useContext(CanvasesContext);
  const [previews, setPreviews] = useState<string[]>([]);

  const updatePreview = (list: fabric.Canvas[]) => {
    canvas?.renderAll();
    let temp:string[] = list.map((c) => c?.toDataURL({
      format: 'png',
      enableRetinaScaling: true
    }
  )
  )
    setPreviews(temp);
  };
 

  useEffect(() => {
    // updatePreview(canvasesList);
    canvas?.on('object:added', () => updatePreview(canvasesList));
    canvas?.on('selection:updated', () => updatePreview(canvasesList));
    // canvas?.on('object:moving', () => updatePreview(canvasesList));
    canvas?.on('mouse:out', () => updatePreview(canvasesList));
  }, [canvas]);

  const toggleState = () => {
    const _cont = document.getElementById('canvases-viwer') as HTMLDivElement;
    if (_cont.className === 'canvases-viwer') {
      _cont!.className += ' hide';
    } else {
      _cont!.className = 'canvases-viwer'
    }
    return;
  };

  const add_child = () => {
    childCounRef.current.last_child += 1;
    childCounRef.current.children.push(`canvas-element-${childCounRef.current.last_child}`);
  };

  const addNewCanvas = () => {
    initCanvas(childCounRef.current.last_child);
    add_child();
  };

  const initCanvas = (idx: number) => {
    canvas?.discardActiveObject();
    let _canvas = new fabric.Canvas(`canvas-element-${idx}`, {
      width: 500,
      height: 500,
      fireRightClick: true,
      stopContextMenu: true,
      backgroundColor: '#fff',
      hoverCursor: 'move',
      preserveObjectStacking: true,
      selection: true,
      imageSmoothingEnabled:false
    });


    initAligningGuidelines(_canvas);
    fabric.Object.prototype.set({
      // transparentCorners: false,
      // borderColor: '#FF3294',
      // cornerColor: '#f2f2f2',
      // cornerStyle: 'circle',
      // cornerSize: 10,
      // borderScaleFactor: 3,
      // selectionDashArray: ['5', '0'],

      borderColor: '#FF3294',
      cornerColor: '#fff',
      cornerStrokeColor: '#999',
      cornerStyle: 'circle',
      cornerSize: 10,
      borderScaleFactor: 3,
      minScaleLimit: 0,
      lockScalingFlip: true,
      borderDashArray: [100, 0],
      cornerDashArray: [100, 100],
      transparentCorners: false,
      centeredRotation: true
    });
    _canvas.renderAll();
    var temp = [...canvasesList];
    temp.push(_canvas);
    setCanvasesList(temp);
    setCanvas(_canvas);

  };

  const CanvasPagination = useCallback(() => {
    const cuurent_idx = canvasesList.findIndex((_canvas) => {
      return _canvas === canvas
    });
    const length = canvasesList.length ?? 1;

    return (
      <>
        <div className="canvases-viwer hide" id="canvases-viwer">
          <div className="arr-cont" onClick={toggleState}>
            <Arrow />
          </div>
          <div className="cv-cont">
            {canvasesList.map((c, idx) => {
              const id = c.getElement().id;
              return (
                <img key={id}
                  className={canvas === c ? '_canvas selected' : '_canvas'}
                  onClick={() => setCanvas(c)}
                  src={previews[idx]}
                  />
              )
            })}
            <div className="_canvas add-canvas" onClick={addNewCanvas}>
              <Add />
            </div>
          </div>
        </div>

        <div className="c-counter">
          <span>Page {cuurent_idx + 1} of {length}</span>
        </div>
      </>

    )
  }, [canvasesList, canvas, previews]);


  return (
    <div className="creator-wrapper">
      <div className="tool-wrapper">
        <LeftToolsBar />
      </div>

      <div className="canvases-wrapper">
        <Canvases addNewCanvas={addNewCanvas} add_child={add_child} childCounRef={childCounRef.current} />
        <CanvasPagination />
      </div>
    </div>
  );
};

export default Creator;
