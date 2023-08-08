import { useContext, useRef } from "react";
import { StyleTextObject } from "../../utils/helpers/canvasFuncs";
import { ReactComponent as BoldIcon } from "../../assets/icons/font-bold.svg";
import { ReactComponent as ItalicIcon } from "../../assets/icons/font-italic.svg";
import { ReactComponent as UnderlineIcon } from "../../assets/icons/font-underline.svg";
import { ReactComponent as ColorIcon } from "../../assets/icons/font-color.svg";
import { ReactComponent as BackgroundIcon } from "../../assets/icons/font-bg.svg";
import { ReactComponent as AlignmentIcon } from "../../assets/icons/font-alignment.svg";

import { TextOptions } from "fabric/fabric-impl";
import CanvasesContext from "../../contexts/CanvasesContext";
import { FONTS } from "../../utils/constants";


export const TextTools = () => {

  const { canvas } = useContext(CanvasesContext);
 

  const TextStylesRef = useRef<TextOptions>(

    (canvas?.getActiveObject() as any)?.getCompleteStyleDeclaration(1, 1)
    );

  const handleTextStyle = (styleName: string, value: any, defaultValue?: any) => {
    const currentVal:TextOptions = (canvas?.getActiveObject() as any)?.getCompleteStyleDeclaration(1, 1)[styleName];

    if(defaultValue !== undefined ){
      StyleTextObject(canvas!, {
        [styleName]: currentVal === value ? defaultValue : value
      });
    }else{
      StyleTextObject(canvas!, {
        [styleName]: value
      });
    }
    TextStylesRef.current = (canvas?.getActiveObject() as any)?.getCompleteStyleDeclaration(1, 1);
  }

  const TextAlignment = (canvas:fabric.Canvas) => {
    let val = TextStylesRef.current.textAlign;
    switch(val){
      case "right":
        val = 'left';
        break;
      case "left":
        val = 'center'
        break;
      case "center":
        val = "right";
        break;
      default:
        val = "center"
    }
    StyleTextObject(canvas, {
      textAlign:val
    })
    TextStylesRef.current.textAlign = val

  }

  if (!canvas || !canvas?.getActiveObject() || canvas?.getActiveObject()?.type !== "textbox") {
    return null
  }
  return (
    <div
      className="text-tools"
      id="text-tools"
    >
      <BoldIcon
        onClick={() =>
          handleTextStyle('fontWeight', 'bold', 'normal')
        }
      />
      <ItalicIcon onClick={() => handleTextStyle('fontStyle', 'italic', 'normal')} />
      <UnderlineIcon onClick={() => handleTextStyle('underline', true, false)} />
      <AlignmentIcon onClick={() => TextAlignment(canvas)}/>
      <label htmlFor="font-color">
        <ColorIcon style={{
          marginTop: '0.2em',
          position:'relative'
        }} 
       
        />
        <input
          type={"color"}
          onChange={(e) =>
            handleTextStyle('fill',e.target.value )
          }

          id="font-color"
        />
      </label>
      <label htmlFor="font-bg">
      <BackgroundIcon  />
      <input
          type={"color"}
          onChange={(e) =>
            handleTextStyle('backgroundColor',e.target.value )
          }
          id="font-bg"
        />
      </label>
      <select
        onChange={(e) =>
          handleTextStyle('fontSize',e.target.value )
        }
        defaultValue={TextStylesRef.current.fontSize}
        className="font-size"
      >
        {Array(25)
          .fill(1)
          .map((_, idx) => (
            <option key={idx} value={(idx + 1) * 4}>
              {(idx + 1) * 4}
            </option>
          ))}
      </select>

      <div style={{
        height: '70%',
        width: '1px',
        backgroundColor: '#000'
      }} />
      <select
        onChange={(e) =>
          handleTextStyle('fontFamily',e.target.value )
        }
        className="font-family"
        defaultValue={TextStylesRef.current.fontFamily || 'Select Family'}
      >
        {FONTS.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
    </div>
  )
}