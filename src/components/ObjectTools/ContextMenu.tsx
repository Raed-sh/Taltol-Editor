import { FC, useCallback, useContext, useEffect, useState } from "react";
import CanvasesContext from "../../contexts/CanvasesContext";
import { ReactComponent as SendToBack } from "../../assets/icons/to-back.svg";
import { ReactComponent as SendToFront } from "../../assets/icons/to-front.svg";
import { ReactComponent as SetBackgroundIcon } from "../../assets/icons/asBg.svg";
import { ReactComponent as DuplicateIcon } from "../../assets/icons/duplicate.svg";
import { ReactComponent as RemoveIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as LockIcon } from "../../assets/icons/lock2.svg";

import { ReactComponent as NewCanvas } from "../../assets/icons/new.svg";
import { ReactComponent as DownloadCanvas } from "../../assets/icons/download.svg";
import { fabric } from "fabric";

import { OrderObjects, setAsBackground, DuplicateCanvasObject, deleteObjects, cardToImage, RemoveBackgroundImage } from "../../utils/helpers/canvasFuncs";

const ContextMenu:FC<{
  addNewCanvas: () => void
  cloneCanvas:() => void
}> = (props) => {
const {canvas} = useContext(CanvasesContext);

const hideMenu = (menu?:HTMLDivElement) => {
    if(!menu){
      menu = document.getElementById('context-menu') as HTMLDivElement;
    }
    menu.style.display = 'none'
};

const [isObject, setIsObject ] = useState<boolean>(false);

useEffect(() => {
    const menu = document.getElementById('context-menu') as HTMLDivElement;
    if(!canvas) return;
    canvas.on('selection:created', function() {
          hideMenu(menu);
      });
  
      canvas.on('selection:updated', function() {
          hideMenu(menu);
      });
      canvas.on('object:removed', () => {
          hideMenu(menu);
      });
      canvas.on('object:modified', () => hideMenu(menu));
      (canvas as any).wrapperEl.addEventListener('contextmenu', function(event:any) {
        if (menu) {
          event.preventDefault();
          menu.style.display = 'flex';
          menu.style.left = event.clientX + 'px';
          menu.style.top = event.clientY + 'px';
        }
      });

      canvas.on('mouse:down', (e) => {
        canvas.renderAll()
        const {x, y} = e.pointer ?? { x: 0, y: 0 }
        const objTool = document.getElementById('object-tool') as HTMLDivElement;
        if (e.button === 3) {
          if(e.target){
            setIsObject(true);
            canvas.setActiveObject(e.target);
            canvas.renderAll();
          }else{
            setIsObject(false);
          }
            ;

            menu.style.display = 'flex'
            menu.style.left = (x + 0) + 'px' ;
            menu.style.top = (y + 80) + 'px';
          if(objTool){
            objTool.style.display='none'
          }
        }
    });

  
      document.addEventListener('click', function(e) {
        if (!menu.contains(e.target as Node)) {
          hideMenu(menu);
        }
      });
    },[canvas]);

    const SetImageAsBackground = (obj:fabric.Object) => {
      setAsBackground(canvas!, obj);
    };


    const BackgroundIconView = useCallback(() => {
      const obj =canvas?.getActiveObject();
      const isBg = (canvas?.backgroundImage as any)?._element!;
      if(obj?.type === 'image'){
        return <li onClick={() => SetImageAsBackground(obj)}><SetBackgroundIcon title="Set As Background" />Set image bg</li>
      }
      if(isBg){
        return <li onClick={() => {hideMenu(); RemoveBackgroundImage(canvas!)}}><SetBackgroundIcon style={{
          transform:'rotateZ(180deg)'
        }} title="Remove Background" />Remove background</li>
      }
      
      return null
    
    },[canvas, isObject]);

    return(
        <div id="context-menu" className="context-menu" style={{
          display:'none'
        }}>
          <ul >
          {!isObject ? 
          <>
                <li onClick={() => {hideMenu();props.cloneCanvas()}}><DuplicateIcon  />Duplicate</li>
                <li onClick={ () => {hideMenu(); props.addNewCanvas()}}><NewCanvas  />New</li>
                <li onClick={() => {hideMenu(); cardToImage(canvas!)}}><DownloadCanvas  />Download</li>
                {/* <li onClick={() => RemoveBackgroundImage(canvas!)}> Detach</li> */}
          </>
          : 
          <>
          <li onClick={() => DuplicateCanvasObject(canvas!)}><DuplicateIcon  />Duplicate</li>
          <li onClick={() => deleteObjects(canvas!)}><RemoveIcon  />Remove</li>
          <li onClick={() => OrderObjects(canvas!, 'back')}><SendToBack />Send To Back</li>
          <li onClick={() => OrderObjects(canvas!, 'front')}><SendToFront/>Bring To Front</li>
          <li><LockIcon/>Lock</li>
          </>
        }
          <BackgroundIconView/>

          </ul>
      </div>
    )
}

export default ContextMenu;
