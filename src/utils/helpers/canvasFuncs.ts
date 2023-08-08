import { forEachChild } from "typescript";
import { DEMO_IMAGE } from "../constants";
import { fabric } from "fabric";

export const cardToImage = (canvas: fabric.Canvas) => {
  const ext = "png";
  const base64 = canvas.toDataURL({
    format: ext,
    enableRetinaScaling: true,
  });

  var anchor = document.createElement("a");
  anchor.setAttribute("href", base64 as string);
  anchor.setAttribute("download", "Card");
  anchor.click();
  anchor.remove();
};

export const setCanvasBackgroundColor = (canvas: fabric.Canvas, color: string) => {
    canvas.setBackgroundColor(color, () => canvas.renderAll());
};

export const onAddImg = (
  canvas: fabric.Canvas,
  img: string
) => {
  fabric.Image.fromURL(
    img,
     (img) => {
      canvas.add(img);

      const scaleFactor = Math.max(canvas.width! / img.width!, canvas.height! / img.height!);
      img.scale(scaleFactor);
      img.set({
        left: 0,
        top: 0
      });
      // img.scaleToWidth(canvas.getWidth());
      // img.scaleToHeight(canvas.getHeight());
      canvas.bringToFront(img);
      canvas.renderAll();
    },
    {
      crossOrigin: "anonymous"
    }
  );

};

export const setAsBackground = (
  canvas: fabric.Canvas,
  obj: fabric.Object
) => {
  const img_src = (obj! as any)._element.src
  fabric.Image.fromURL(img_src, (cloned) => {
        canvas.setBackgroundImage(img_src, canvas.renderAll.bind(canvas), {
          crossOrigin: 'anonymous',
          scaleX: canvas.width! / cloned.width!,
          scaleY: canvas.height! / cloned.height!
        });
      });
    canvas.remove(obj);
    canvas.renderAll();
}

export const RemoveBackgroundImage = (canvas:fabric.Canvas) => {
    const image = new fabric.Image('');
    canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas));
}

export const AddCustomText = (canvas: fabric.Canvas, styles?: any, value:string="Add Heading") => {
  var text = new fabric.Textbox(value, {
    ...styles,
    editable:true,
  });
  canvas.add(text);
};

export const StyleTextObject = (canvas:fabric.Canvas, style:any) => {
  var obj = canvas.getActiveObject();
  obj?.setOptions(style);
  canvas.renderAll();
}

export const DuplicateCanvasObject = (canvas: fabric.Canvas) => {
  var object = canvas.getActiveObject();
  if (object) {
    object.clone((clone: fabric.Object) => {
      canvas.add(clone.set({
        left: object?.left! + 10,
        top: object?.top! + 10
      }));
      canvas.setActiveObject(clone);
    });
  };
};

export const OrderObjects = (canvas: fabric.Canvas, dir:string) => {
  const obj = canvas.getActiveObject();
  if(!obj){
    return
  }
  if(dir === 'back'){
    // Obj.sendToBack(); => Send Object to latest index;
    obj.sendBackwards();
  }else{
    obj.bringForward();
    // Obj.bringToFront(); => Bring Object to first index;
  }
}

export function deleteObjects(canvas: fabric.Canvas) {

  var doomedObj = canvas.getActiveObjects()!;

  if (doomedObj.length > 1) {
    doomedObj.forEach(function (obj) {
        obj.canvas = canvas;
        canvas.remove(obj);
    });
  } else {
    var activeObject = canvas.getActiveObject();
    if (activeObject !== null) {
      canvas.remove(activeObject);
    }
  }
  canvas.discardActiveObject();
}
export const handleCut = (canvas:fabric.Canvas) => {
  const activeObject = canvas.getActiveObject();
  if (!activeObject) return;
  (canvas as any).clipboard = activeObject.toJSON();
  canvas.remove(activeObject);
}

export const handleCopy = (canvas:fabric.Canvas) => {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    (canvas as any).clipboard = activeObject;
  }
};



export function handlePaste(canvas:fabric.Canvas) {
  const _clipboard = (canvas as any).clipboard;
  if(_clipboard === false){
    return;
  }
  // clone again, so you can do multiple copies.
  _clipboard.clone(function(clonedObj:any) {
    canvas.discardActiveObject();
    clonedObj.set({
      left: clonedObj.left + 10,
      top: clonedObj.top + 10,
      evented: true,
    });
    if (clonedObj.type === 'activeSelection') {
      // active selection needs a reference to the canvas.
      clonedObj.canvas = canvas;
      clonedObj.forEachObject(function(obj:any) {
        canvas.add(obj);
      });
      // this should solve the unselectability
      clonedObj.setCoords();
    } else {
      canvas.add(clonedObj);
    }
    _clipboard.top += 10;
    _clipboard.left += 10;
    canvas.setActiveObject(clonedObj);
    canvas.requestRenderAll();
  });
}



// Used for later


const handleZoomIn = (canvas:fabric.Canvas) => {
  if (canvas) {
    const zoomFactor = 1.1;
    const zoom = canvas.getZoom();
    canvas.setZoom(zoom * zoomFactor);
  }
};

const handleZoomOut = (canvas:fabric.Canvas) => {
  if (canvas) {
    const zoomFactor = 1.1;
    const zoom = canvas.getZoom();
    canvas.setZoom(zoom / zoomFactor);
  }
};