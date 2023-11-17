// https://rapidapi.com/Glavier/api/chatgpt53/
import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { LoadingOutlined } from '@ant-design/icons';

const headers = {
  "content-type": "application/json",
  "X-RapidAPI-Key": "d21e22b6aemsh31775c1a1d8ff0cp111a5bjsned4612084d2a",
  "X-RapidAPI-Host": "chatgpt-api8.p.rapidapi.com",
};
const languageOptions = [
  { label: "Arabic", value: "ar" },
  { label: "Chinese (Simplified)", value: "zh" },
  { label: "Chinese (Traditional)", value: "zh-TW" },
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Greek", value: "el" },
  { label: "Italian", value: "it" },
  { label: "Hindi", value: "hi" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Russian", value: "ru" },
  { label: "Swedish", value: "sv" },
  { label: "Turkish", value: "tr" },
];

const App = () => {
  // _________________________________________________ State Section __________________
  const [inputText, setInputText] = useState("");  
  const [summary, setSummary] = useState(""); 
  const [buttonText, setButtonText] = useState("See Result"); 
  const [TittleText, setTittleText] = useState("Paste Paragraph :"); 
  const [TranslateSummary, setTranslateSummary] = useState("Translation");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const TranslationError = 'We apologize for any inconvenience caused by the current issue with our translation service. Our team is working diligently to resolve the problem and we appreciate your patience.'
  const SummarizationError = 'We apologize for any inconvenience caused by the current issue with our Summarization service. Our team is working diligently to resolve the problem and we appreciate your patience.'
  const [Transloading, setTransLoading] = useState(false);

  // _________________________________________________ API Section __________________
  const ApiEndPoint =
    "https://6762qvddil.execute-api.ca-central-1.amazonaws.com/Translate/myTranslation";
  const body = { 
    "Val": summary,
    "Lang": selectedLanguage 
  }

  // _________________________________________________ Function API Section __________________
    //Getting the summary from ChatAPI Rapid API 
    const getSummary = (inputText) => {
      setTransLoading(true);
      const text = inputText;
      const data = [
        {
          content:
            "Hello! I'm an AI assistant bot based on ChatGPT 3. How may I help you?",
          role: "system",
        },
        {
          role: "user",
          content: `Please summarize the following paragraph ${text}`,
        },
      ];
      axios
        .post("https://chatgpt5f3.p.rapidapi.com/", data, {
          headers: headers,
        })
        .then((response) => {
          const summary = response.data;
          console.log(summary.text);
          setSummary(summary.text);
          setButtonText("Translate");
          setTittleText("Summarized Paragraph :");
          setTransLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setSummary(summary.text);
          setButtonText("Translate");
          setTittleText("Summarized Paragraph :");
          setTransLoading(false);
        });
      

    };
    //Getting translation from AWS translate
    const handleTranslateClick = async () => {
      setTransLoading(true);
      axios.post(ApiEndPoint,body)
      .then( res => {
        console.log(res.data)
        setTranslateSummary(res.data);
        setTittleText("Translateded Paragraph :");
        setButtonText("Start Over");
        setTransLoading(false);
      })
      .catch(error => {
        console.log(error)
        setTranslateSummary(TranslationError);
        setTittleText("Translateded Paragraph :");
        setButtonText("Start Over");
      })
    };
    //Cleaning the translate section 
    const handleStartOverClick = () => {
      setButtonText("See Result");
      setInputText("");
      setSummary("");
      setTittleText("Paste Paragraph :");
    };

  // _________________________________________________ Function state Section __________________
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };
  const handleInputChange = (event) => {
    setInputText(event.target.value); 
  };

  // _________________________________________________ Loading Section __________________
  const LoadingView = <div className="Loading_Style">
      <LoadingOutlined className="Spin_Loading_Style"/>
      <span className="Text_Loading_Style">Loading...</span>
    </div>

  // _________________________________________________ Display Section __________________
  const DisplayContainer = (
    <>
      <header className="App_header">{TittleText}</header>
      {buttonText === "See Result" && (
        Transloading ? LoadingView : <textarea
          className="Input_Style"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter text..."
        />
      )}
      {buttonText === "Translate" && (
        Transloading ?
        LoadingView
        :
        <div className="Result_Style">{summary}</div>
      )}
      {buttonText === "Start Over" && (
        <div className="Result_Style">{TranslateSummary}</div>
      )}
    </>
  );
  
  // _________________________________________________ Button Section __________________
  const ButtonContainer = (
    <div className="Button_container">
      {buttonText === "See Result" && (
        !Transloading && <button 
        className="button_Style" 
        onClick={() => getSummary(inputText)}
        disabled={!inputText}
        >
          {buttonText}
        </button>
      )}
      {buttonText === "Translate" && (
        <div className="Lang_DropDown_Style">
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="button_Style"
          >
            <option value="">Select Language</option>
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button 
          className="button_Style" 
          onClick={handleTranslateClick}
          disabled={!selectedLanguage}
          >
            {buttonText}
          </button>
        </div>
      )}
      {buttonText === "Start Over" && (
        <button 
        className="button_Style" 
        onClick={handleStartOverClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  );

  return (
    <div className="App">
      {DisplayContainer}
      {ButtonContainer}
    </div>
  );
};

export default App;
