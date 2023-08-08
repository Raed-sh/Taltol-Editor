import { FC, useContext, useEffect, useState } from "react";
import { fabric } from 'fabric';
import { ReactComponent as AddIcon } from "../../assets/icons/add.svg";
import { CanvasCard } from "./canvas";
import CanvasesContext from "../../contexts/CanvasesContext";
import { ObjectTools } from "../ObjectTools";
import ContextMenu from "../ObjectTools/ContextMenu";
import { moveArray } from "../../utils/helpers";
import { ICanvasesProps } from "../../utils/types";
import './styles.css';


export const Canvases: FC<ICanvasesProps> = ({addNewCanvas, add_child, childCounRef}) => {

    const { canvasesList, setCanvasesList, canvas, setCanvas } = useContext(CanvasesContext);
    const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null)
    

    function cloneCanvas() {
        const clonedCanvas = canvas;
        let duplicatedCanvas = new fabric.Canvas(`canvas-element-${childCounRef.last_child}`);
        add_child();
        duplicatedCanvas.loadFromJSON(
            JSON.stringify(clonedCanvas), () => {

                duplicatedCanvas.setDimensions({
                    width: clonedCanvas?.width!,
                    height: clonedCanvas?.height!
                })
                duplicatedCanvas.stopContextMenu = true
                duplicatedCanvas.fireRightClick = true
                duplicatedCanvas.renderAll();
            }
        );
        var temp = [...childCounRef.children];
        const sourceIndex = temp.findIndex(c => c === duplicatedCanvas.getElement().id);
        const initId = temp.findIndex(c => c === clonedCanvas!.getElement().id!);
        temp = moveArray(temp, sourceIndex, initId + 1);
        childCounRef.children = temp;
        var canvases = [...canvasesList];
        canvases.push(duplicatedCanvas);
        setCanvasesList(canvases);
    };

    const deleteCanvas = () => {
        if (childCounRef.children.length > 2 && canvas) {
            let tempList = [...canvasesList];
            const canvasId = canvas?.getElement().id;
            canvas?.dispose();
            const deletedIdx = canvasesList.indexOf(canvas, 0);
            if (deletedIdx > -1) {
                tempList.splice(deletedIdx, 1)
            }
            // temp.slice(canvasesList.indexOf(canvas!), 1);
            setCanvasesList(tempList);
            let cc = [...childCounRef.children];
            cc = cc.filter(c => c !== canvasId);
            childCounRef.children = cc;

        } else {
            alert('Cannot remove all canvases')
            return
        }
        // childCounRef.current = childCounRef.current -1;
    };

    function Scroll() {
        const canv = document.getElementById(`c${canvas?.getElement().id!}`);
        return canv?.scrollIntoView({ behavior: 'smooth' })
    };

    useEffect(() => {
        if (childCounRef?.last_child === 0) addNewCanvas();
    }, []);
   
    useEffect(() => {
        // setSelectedObject(undefined);
        // canvas?.discardActiveObject();
        canvas?.renderAll()
        Scroll();

    }, [canvas])

    useEffect(() => {
        setCanvas(canvasesList.slice(-1)[0]);
    }, [canvasesList]);

    useEffect(() => {
        canvasesList.forEach((canv) => {
            canv.on("selection:created", () => {
                setSelectedObject(canv.getActiveObject())
            }
            );
            canv.on("selection:cleared", () => setSelectedObject(null));
        });
    }, [canvasesList, canvas]);

    return (
        <div className="canvases-container" >
            {childCounRef.children.map((id, idx) => {
                const isLastChildrenIndex = idx === childCounRef.children.length - 1;
                return (
                    <CanvasCard
                        key={id}
                        canvasId={id}
                        index={idx}
                        isLastChildrenIndex={isLastChildrenIndex}
                        childCounRef={childCounRef}
                        addNewCanvas={addNewCanvas}
                        cloneCanvas={cloneCanvas}
                        deleteCanvas={deleteCanvas}
                    >
                        {selectedObject && selectedObject.canvas === canvasesList.find((c) => c.getElement().id === id) && (
                            <>
                                <ObjectTools />
                                {/* <ContextMenu /> */}
                            </>
                        )}
                        {canvas === canvasesList.find((c) => c.getElement().id === id) && (
                            <ContextMenu 
                                addNewCanvas={addNewCanvas}
                                cloneCanvas={cloneCanvas}
                            
                            />
                        )}

                    </CanvasCard>
                )
            }
            )}
            <button className="add-page-btn" onClick={addNewCanvas}> <AddIcon /> Add Page</button>
        </div>
    )
}