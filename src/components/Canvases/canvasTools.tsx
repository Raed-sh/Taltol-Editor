import { CARDSIZES, CARDTOOLS } from "../../utils/constants";
import { CardIconComponent } from "../IconComponent";
import { cardToImage, setCanvasBackgroundColor } from "../../utils/helpers/canvasFuncs";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import CanvasesContext from "../../contexts/CanvasesContext";
import { ReactComponent as LockIcon } from "../../assets/icons/lock.svg";
import arrow from "../../assets/icons/left_arr.svg";
import { ICanvasTools, ISIZE } from "../../utils/types";
import { handleEnterKey } from "../../utils/helpers";



const CanvasTools: FC<ICanvasTools> = ({ addNewCanvas, cloneCanvas, deleteCanvas }) => {
    const { canvas, canvasesList } = useContext(CanvasesContext);

    const [dimCard, setDimCard] = useState<boolean>(false);
    const [isLockedRatio, setIsLockedRatio] = useState<boolean>(false);
    const [sizesErr, setSizesErr] = useState('');
    const [canvasDimensions, setCanvasDimensions] = useState<ISIZE>({
        width: 500,
        height: 500
    });

    useEffect(() => {
        if (!canvas) return;
        setCanvasDimensions({
            width: canvas.getWidth(),
            height: canvas.getHeight()
        })
    }, [canvas, canvasesList])


    const IconsFunctions = (icon: string, val?: string) => {
        if (canvas) {
            switch (icon) {
                case "download":
                    return cardToImage(canvas);
                case "fill":
                    return setCanvasBackgroundColor(canvas, val!);
                case "new":
                    return addNewCanvas();
                case "duplicate":
                    return cloneCanvas();
                case "delete":
                    return deleteCanvas();
                default:
                    return null;
            }
        }

    };

    const setCardWidth = (value: number) => {
        if (value <= 1300) {
            setCanvasDimensions((val: ISIZE) => ({
                ...val,
                width: value,
            }));
            canvas?.setDimensions({
                width: value,
                height: canvasDimensions.height,
            });
        }
        canvas?.renderAll();
    };

    const setCardHeight = (value: number) => {
        if (value <= 800) {
            setCanvasDimensions((val: ISIZE) => ({
                ...val,
                height: value,
            }));
            canvas?.setDimensions({
                width: canvasDimensions.width,
                height: value,
            });
        }
        canvas?.renderAll();
    };

    const handleKeyboardSizes = (
        event: React.KeyboardEvent<HTMLInputElement>,
        dim: string
    ) => {
        const aspectRatio = canvasDimensions.width / canvasDimensions.height
        const value: number = parseInt(handleEnterKey(event) as string);
        if (value && value >= 100) {
            if (isLockedRatio) {
                if (dim === "width") {
                    setCardWidth(value);
                    setCardHeight(value / aspectRatio);
                } else {
                    setCardHeight(value);
                    setCardWidth(value * aspectRatio);
                }
                setDimCard(false);
            } else {
                if (dim === "width") {
                    setCardWidth(value);
                } else {
                    setCardHeight(value);
                }
            }

        }
    };

    const handleSizes = (e: React.ChangeEvent<HTMLInputElement>, dim: string) => {
        setSizesErr('')
        const aspectRatio = canvasDimensions.width / canvasDimensions.height
        const value = parseInt(e.target.value);
        if (value && value >= 100) {
            if (isLockedRatio) {
                if (dim === "width") {
                    setCardWidth(value);
                    setCardHeight(value / aspectRatio);
                } else {
                    setCardHeight(value);
                    setCardWidth(value * aspectRatio);
                }
                setDimCard(false);

            } else {
                if (dim === "width") {
                    setCardWidth(value);
                } else {
                    setCardHeight(value);
                }
            }

        } else {
            setSizesErr(`Enter ${dim} value higher than 100px`);
        }

        e.currentTarget.value = value.toString()
    };

    const toggleLockRatio = () => {
        setIsLockedRatio(!isLockedRatio);
    };

    const Sizesview = useCallback(() => {
        return (
            <div className="size-view">
                <button onClick={() => setDimCard((val) => !val)}>
                    <h3>
                        Size: {canvasDimensions.width.toFixed()} x {canvasDimensions.height.toFixed()}
                    </h3>
                    <img
                        src={arrow}
                        alt=""
                        style={{
                            transform: dimCard ? "rotateZ(90deg)" : "",
                        }}
                    />{" "}
                </button>

                <ul className={dimCard ? "dim-card" : "dim-card closed"}>
                    {Object.keys(CARDSIZES).map((key) => {
                        return (
                            <li key={key}>
                                <p>{key} </p>
                                <div>
                                    <label>
                                        W
                                        <input
                                            placeholder={canvasDimensions.width.toString()}
                                            onKeyDown={(e) => handleKeyboardSizes(e, "width")}
                                            onBlur={(e) => handleSizes(e, "width")}
                                            defaultValue={canvasDimensions.width.toString()}
                                        />
                                    </label>
                                    <label>
                                        H
                                        <input
                                            placeholder={canvasDimensions.height.toString()}
                                            onKeyDown={(e) => handleKeyboardSizes(e, "height")}
                                            onBlur={(e) => handleSizes(e, "height")}
                                            defaultValue={canvasDimensions.height.toString()}
                                        />
                                    </label>
                                </div>
                            </li>
                        );
                    })}
                    {sizesErr && <span>{sizesErr}</span>}
                    <LockIcon
                        className={isLockedRatio ? "locked-icon" : ''}
                        onClick={toggleLockRatio}
                        title="Lock Ratio" />
                </ul>
            </div>

        )
    }, [canvasDimensions, dimCard, isLockedRatio, canvas, canvasesList])


    return (
        <>
            <Sizesview />
            <ol className="canvas-tools">
                {CARDTOOLS.map((t) => {
                    return t.title === "fill" ? (
                        <li key={t.title}>
                            <label>
                                <CardIconComponent title={t.title} />
                                <input
                                    type="color"
                                    onChange={(e) => IconsFunctions("fill", e.target.value)}
                                />
                            </label>
                        </li>
                    ) : (
                        <li key={t.title}>
                            <CardIconComponent
                                title={t.title}
                                onClick={() => IconsFunctions(t.title)}
                            />
                        </li>
                    );
                })}
            </ol>
        </>

    )
};

export default CanvasTools;