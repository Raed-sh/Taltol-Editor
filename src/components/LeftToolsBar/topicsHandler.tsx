import { useCallback, useContext, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import close from "../../assets/icons/close.svg";
import { Loader } from "../Loader";
import { AddCustomText } from "../../utils/helpers/canvasFuncs";
import {ReactComponent as Send} from "../../assets/icons/send.svg";
import CanvasesContext from "../../contexts/CanvasesContext";

const TopicsHandler = () => {
  const {canvas} = useContext(CanvasesContext);
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState<string[]>([]);
  const [topic, setTopic] = useState<string>("");
  const [worsNumber, setWorsNumber] = useState("10");

  const AddToTopics = (value: string) => {
    const exist = topics.includes(value);
    if (value && !exist) {
      setTopics([...topics, value]);
      setTopic('')
      setResults([]);
    }
  };

  const removeTopic = (value: string) => {
    var array = [...topics];
    var index = array.indexOf(value);
    if (index !== -1) {
      array.splice(index, 1);
      setTopics(array);
      setResults([]);
    }
  };

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && topic) {
        event.preventDefault();
        event.stopPropagation();
        AddToTopics(topic);
        setTopic("");
      }
    },
    [topic]
  );

  const handleTopic = useCallback((value: string) => {
    setTopic(value);
  }, []);

  const GenerateQuotes = async (value: string) => {
    setLoading(true);
    var data;
    if (value) {
      setResults([]);
      const configuration = new Configuration({
        apiKey: process.env.REACT_APP_CHATGBT_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        // prompt: `generate 5 topics about (${value}) and i want the response in array of strings to render it inside html page and split them with indexes`,
        // prompt:`generate 5 topics to use in social media about (${value}) and i want the response in array of strings to render it inside html page and split them with indexes`,
        prompt:`provide me 5 social media posts with a limited 250 characters with a combination of the topics ${value}, the response should be an array splitted with index`,
        temperature: 0.9,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop: [" Human:", " AI:"],
      });
      let data = response.data.choices[0].text?.split(/\r?\n/);
      data = data?.filter(topic => topic)
      // var str_: any = str.replace(/\d+|^\s+|\s+$/g, "");
      // (/\d+|^\s+|\s+$/g, "")
      // data = stringToArray(response?.data?.choices[0]?.text!);

      if (data) {
        setResults(data);
      }

    }
    setLoading(false);
  };

  const handleWordsNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setWorsNumber(e.target.value);
    }
  };

  return (
    <div className="topics">
      <h3>
        I'd like to write a post with{" "}
        <input
          placeholder={worsNumber.toString()}
          value={worsNumber}
          onChange={handleWordsNumber}
        />{" "}
        words that covers topics such as:
      </h3>
      <div
        className="topics-input-cont"
      >
        <input
          type="text"
          placeholder="Topic title, eg:Wisdom"
          value={topic! || ""}
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => handleTopic(e.target.value)}
        />
        <Send onClick={() => AddToTopics(topic)} />
      </div>

      <ol>
        {topics.map((t) => (
          <li key={t} onClick={() => removeTopic(t)}>
            {t} <img src={close} alt="" />
          </li>
        ))}
      </ol>
      {loading ? (
        <Loader />
      ) : (
        <div style={{
          width:'100%',
        }}>

        <button
          style={{
            opacity: topics.length === 0 ? 0.5 : 1,
            cursor: topics.length === 0 ? "not-allowed" : "pointer",
          }}
          onClick={() => GenerateQuotes(topics.join(","))}
        >
          {results.length > 0 ? "Regenerate" : "Generate"}
        </button>
        </div>
      )}

      <div className="t-quotes">
        <h4>{results.length} results per request</h4>
        <ul>
          {results.map((res) => {
            return (
              <li key={res}
              onClick={() => AddCustomText(canvas!, {
                textAlign:'left',
                fontSize:16,
                width:canvas?.width! / 2,
                left: canvas?.width! / 4,
                top: canvas?.height! / 4,
              },
              res
              )}
              
              >
                <p>{res}</p>
              </li>
            );
          })}
        </ul>
        <p className="powered">Powered by ChatGPT</p>
      </div>
    </div>
  );
};

export default TopicsHandler;
