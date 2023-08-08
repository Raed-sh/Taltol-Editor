import { ReactNode } from "react";

export interface IFetchedImages {
  full: string;
  raw: string;
  regular: string;
  small: string;
  small_s3: string;
  thumb: string;
}

export interface ITool {
  title: string;
  icon: any;
  opened?: boolean;
}

export interface ISIZE {
  width: number;
  height: number;
}
export type BoxProps = {
  children?: ReactNode;
  height?: number;
  width?: number;
  resizable?: boolean;
};

export interface ICHILDREN {
  children?: ReactNode;
}

export interface IcanvasesRef {
  children: string[],
  last_child: number
};

export interface IUPLOADEDIMAGES {
  uploadedImages: File[];
  setUploadedImages: (files: File[]) => void;
}


export interface IPhoto {
  id: number;
  src: {
    medium: string;
    large2x:string;
    large:string;
    landscape:string;
    original:string;
    portrait:string;
  };
  photographer: string;
}

export interface IVideo {
    id: number;
    width: number;
    height: number;
    image: string;
    video_files: {
        link:string;
        id?:number;
    }[];
  }

export interface ICanvasProps {
  canvasId: string;
  isLastChildrenIndex?: boolean;
  index?: number;
  childCounRef: any
  addNewCanvas: () => void;
  cloneCanvas: () => void;
  deleteCanvas: () => void;
  children: ReactNode
}

export interface ICanvasTools {
  addNewCanvas: () => void;
  cloneCanvas: () => void;
  deleteCanvas: () => void
}
export interface ICanvasesProps {
  addNewCanvas: () => void;
  add_child: () => void;
  childCounRef: IcanvasesRef
}