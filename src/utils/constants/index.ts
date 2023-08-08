import { ReactComponent as Template } from "../../assets/icons/template.svg";
import { ReactComponent as Elements } from "../../assets/icons/elements.svg";
import { ReactComponent as Image } from "../../assets/icons/image.svg";
import { ReactComponent as Collection } from "../../assets/icons/collection.svg";
import { ReactComponent as Quote } from "../../assets/icons/quote.svg";
import { ReactComponent as Text } from "../../assets/icons/text.svg";
import { ReactComponent as Topic } from "../../assets/icons/topic.svg";
import { ReactComponent as Upload } from "../../assets/icons/upload.svg";
import { ReactComponent as Video } from "../../assets/icons/video.svg";

import { ReactComponent as fill } from "../../assets/icons/fill.svg";
import { ReactComponent as download } from "../../assets/icons/download.svg";
import { ReactComponent as duplicate } from "../../assets/icons/duplicate.svg";
import { ReactComponent as newCard } from "../../assets/icons/new.svg";
import { ReactComponent as deleteCard } from "../../assets/icons/delete.svg";

import { ITool } from "../types";

export const DEMO_IMAGE =
  "https://images.unsplash.com/photo-1678384979881-0a3d5829cd76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MTQ1ODZ8MHwxfGFsbHwzfHx8fHx8Mnx8MTY3ODQ4MzUwOA&ixlib=rb-4.0.3&q=80&w=200";

export const TOOLS: ITool[] = [
  // {
  //   title: "templates",
  //   icon: Template,
  //   opened: false,
  // },
  // {
  //   title: "elements",
  //   icon: Elements,
  //   opened: false,
  // },
  {
    title: "quotes",
    icon: Quote,
    opened: false,
  },
  {
    title: "topics",
    icon: Topic,
    opened: false,
  },
  {
    title: "text",
    icon: Text,
    opened: false,
  },
  {
    title: "images",
    icon: Image,
    opened: false,
  },
  {
    title: "videos",
    icon: Video,
    opened: false,
  },
  {
    title: "uploads",
    icon: Upload,
    opened: false,
  },
  {
    title: "collections",
    icon: Collection,
    opened: false,
  },
];

export const DEMOQUOTES = [
  "I don't believe you have to be better than everybody else. I believe you have to be better than you ever thought you could be1",
  "I don't believe you have to be better than everybody else. I believe you have to be better than you ever thought you could be2",
  "I don't believe you have to be better than everybody else. I believe you have to be better than you ever thought you could be3",
  "I don't believe you have to be better than everybody else. I believe you have to be better than you ever thought you could be4",
  "I don't believe you have to be better than everybody else. I believe you have to be better than you ever thought you could be5",
  "I don't believe you have to be better than everybody else. I believe you have to be better than you ever thought you could be6",
  "I don't believe you have to be better than everybody else. I believe you have to be better than you ever thought you could be8",
  "I don't believe you have to be better than everybody else. I believe you have to be better than you ever thought you could be9 ",
];

export const CARDSIZES = {
  Custom_size: {
    custom: {
      width: 500,
      height: 500,
    },
  },
  // 'Facebook':{
  // },
  // 'Twitter':{
  // },
  // 'LinkedIn':{
  // },
  // 'Instagram':{
  // },
  // 'TickTok':{
  // }
};

export const CARDTOOLS: ITool[] = [
  {
    title: "fill",
    icon: fill,
  },
  {
    title: "download",
    icon: download,
  },
  {
    title: "duplicate",
    icon: duplicate,
  },
  {
    title: "new",
    icon: newCard,
  },
  {
    title: "delete",
    icon: deleteCard,
  },
];

export  const FONTS = [
  "Andale Mono", "Arial", "Arnoldboecklin"
  , "Blippo"
  , "Bookman"
  , "Brushstroke"
  , "Comic Sans"
  , "Comic Sans MS"
  , "Coronetscript"
  , "Courier"
  , "Courier New"
  , "cursive"
  , "fantasy"
  , "Fixed"
  , "Florence"
  , "Gill Sans"
  , "Helvetica"
  , "Helvetica Narrow"
  , "Impact"
  , "Lucida"
  , "Lucidatypewriter"
  , "monospace"
  , "New Century Schoolbook"
  , "Oldtown"
  , "Palatino"
  , "Parkavenue"
  , "sans-serif"
  , "serif"
  , "Times"
  , "Times New Roman"
  , "Zapf Chancery"
];

export const FONTCHECK = [
  // Windows 10
  "Arial",
  "Arial Black",
  "Bahnschrift",
  "Calibri",
  "Cambria",
  "Cambria Math",
  "Candara",
  "Comic Sans MS",
  "Consolas",
  "Constantia",
  "Corbel",
  "Courier New",
  "Ebrima",
  "Franklin Gothic Medium",
  "Gabriola",
  "Gadugi",
  "Georgia",
  "HoloLens MDL2 Assets",
  "Impact",
  "Ink Free",
  "Javanese Text",
  "Leelawadee UI",
  "Lucida Console",
  "Lucida Sans Unicode",
  "Malgun Gothic",
  "Marlett",
  "Microsoft Himalaya",
  "Microsoft JhengHei",
  "Microsoft New Tai Lue",
  "Microsoft PhagsPa",
  "Microsoft Sans Serif",
  "Microsoft Tai Le",
  "Microsoft YaHei",
  "Microsoft Yi Baiti",
  "MingLiU-ExtB",
  "Mongolian Baiti",
  "MS Gothic",
  "MV Boli",
  "Myanmar Text",
  "Nirmala UI",
  "Palatino Linotype",
  "Segoe MDL2 Assets",
  "Segoe Print",
  "Segoe Script",
  "Segoe UI",
  "Segoe UI Historic",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
  "SimSun",
  "Sitka",
  "Sylfaen",
  "Symbol",
  "Tahoma",
  "Times New Roman",
  "Trebuchet MS",
  "Verdana",
  "Webdings",
  "Wingdings",
  "Yu Gothic",
  // macOS
  "American Typewriter",
  "Andale Mono",
  "Arial",
  "Arial Black",
  "Arial Narrow",
  "Arial Rounded MT Bold",
  "Arial Unicode MS",
  "Avenir",
  "Avenir Next",
  "Avenir Next Condensed",
  "Baskerville",
  "Big Caslon",
  "Bodoni 72",
  "Bodoni 72 Oldstyle",
  "Bodoni 72 Smallcaps",
  "Bradley Hand",
  "Brush Script MT",
  "Chalkboard",
  "Chalkboard SE",
  "Chalkduster",
  "Charter",
  "Cochin",
  "Comic Sans MS",
  "Copperplate",
  "Courier",
  "Courier New",
  "Didot",
  "DIN Alternate",
  "DIN Condensed",
  "Futura",
  "Geneva",
  "Georgia",
  "Gill Sans",
  "Helvetica",
  "Helvetica Neue",
  "Herculanum",
  "Hoefler Text",
  "Impact",
  "Lucida Grande",
  "Luminari",
  "Marker Felt",
  "Menlo",
  "Microsoft Sans Serif",
  "Monaco",
  "Noteworthy",
  "Optima",
  "Palatino",
  "Papyrus",
  "Phosphate",
  "Rockwell",
  "Savoye LET",
  "SignPainter",
  "Skia",
  "Snell Roundhand",
  "Tahoma",
  "Times",
  "Times New Roman",
  "Trattatello",
  "Trebuchet MS",
  "Verdana",
  "Zapfino",
];
