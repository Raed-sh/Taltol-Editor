import { FC, useContext, useState } from "react";
import search from "../../assets/icons/search.svg";
import prefrences from "../../assets/icons/prefrences.svg";
import author from "../../assets/images/author.png";
import like from "../../assets/icons/like.svg";
import { AddCustomText } from "../../utils/helpers/canvasFuncs";
import CanvasesContext from "../../contexts/CanvasesContext";

const QuotesHandler: FC = () => {
  const QUOTES = [
    {
      id: 1,
      author: "John Doe",
      quote:
        "I don't believe you have to be better than everybody else. I believe you have to be better than you ever thought you could be",
      img: author,
      likes: 1.8,
    },
    {
      id: 2,
      author: "John Doe",
      quote:
        "I don't believe you have to be better than everybody else. I believe you have to be better than you ever thought you could be",
      img: author,
      likes: 1.8,
    },
    {
      id: 3,
      author: "John Doe",
      quote:
        "I don't believe you have to be better than everybody else. I believe you have to be better than you ever thought you could be",
      img: author,
      likes: 1.8,
    },
    {
      id: 4,
      author: "John Doe",
      quote:
        "I don't believe you have to be better than everybody else. I believe you have to be better than you ever thought you could be",
      img: author,
      likes: 1.8,
    },
    {
      id: 5,
      author: "John Doe",
      quote:
        "I don't believe you have to be better than everybody else. I believe you have to be better than you ever thought you could be",
      img: author,
      likes: 1.8,
    },
  ];

  const [quotes, setQuotes] = useState(QUOTES);

  const { canvas } = useContext(CanvasesContext);

  return (
    <div className="quotes">
      <div className="quotes-search">
        <img src={search} alt="" />
        <input placeholder="Search for quotes" type={"text"} />
        <img src={prefrences} />
      </div>
      <div>
        <h4>{quotes.length} results</h4>
        <ul>
          {quotes.map((quote) => {
            return (
              <li
                key={quote.id}
                onClick={() => AddCustomText(canvas!, {
                  textAlign:'left',
                  fontSize:16,
                  width:canvas?.width! / 2,
                  left: canvas?.width! / 4,
                  top: canvas?.height! / 4,
                },
                quote.quote
                )}

              >
                <section>
                  <h3>
                    <img src={quote.img} alt="" />
                    {quote.author}
                  </h3>
                  <h3>
                    {<img src={like} alt="" />}
                    <span>{quote.likes}k</span>
                  </h3>
                </section>
                <p>{quote.quote}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default QuotesHandler;
