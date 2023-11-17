// https://rapidapi.com/Glavier/api/chatgpt53/
import React, { useState } from "react";
import "./App.css";
import axios from "axios";

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
  const [isTranslate, setIsTranslate] = useState("Translation");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  // _________________________________________________ API Section __________________
  const ApiEndPoint =
    "https://6762qvddil.execute-api.ca-central-1.amazonaws.com/Translate/myTranslation";
  const body = { 
    "Val": "This is a sample paragraph.",
    "Lang": "ja" 
  }

  // _________________________________________________ Function Section __________________
  const getSummary = (inputText) => {
    const text = inputText;
    // const data = [
    //   {
    //     content:
    //       "Hello! I'm an AI assistant bot based on ChatGPT 3. How may I help you?",
    //     role: "system",
    //   },
    //   {
    //     role: "user",
    //     content: `Please summarize the following paragraph ${text}`,
    //   },
    // ];
    // axios
    //   .post("https://chatgpt53.p.rapidapi.com/", data, {
    //     headers: headers,
    //   })
    //   .then((response) => {
    //     // Handle the response from the OpenAI API
    //     const summary = response.data;
    //     console.log(summary.text);
    //     setSummary(summary.text);
    //   })
    //   .catch((error) => {
    //     // Handle any errors that may occur
    //     console.error(error);
    //   });
    const sampleSummary =
      "To be creative, there are several things you can try: explore different perspectives, experiment, and you'll find your creative spark.";
    setSummary(sampleSummary);
    setButtonText("Translate");
    setTittleText("Summarized Paragraph :");
  };
  const handleTranslateClick = async () => {
    axios.post(ApiEndPoint,body)
    .then( res => {
      console.log(res.data)
      setIsTranslate(res.data);
    })
    .catch(error => {
      console.log(error)
    })

    setButtonText("Start Over");
    const sampleSummary = "checking translation";
    setSummary(sampleSummary);
    setTittleText("Translateded Paragraph :");
    // Handle additional actions for Translate button if needed
  };
  const handleStartOverClick = () => {
    setButtonText("See Result");
    setInputText("");
    setSummary("");
    setTittleText("Paste Paragraph :");
    // Handle additional actions for Start Over button if needed
  };
  const handleLanguageChange = (event) => {
    console.log(event.target.value);
    setSelectedLanguage(event.target.value);
    // You can perform any additional actions based on the selected language here
  };
  const handleInputChange = (event) => {
    setInputText(event.target.value); 
  };

  // _________________________________________________ Display Section __________________
  const DisplayContainer = (
    <>
      <header className="App_header">{TittleText}</header>
      {buttonText === "See Result" && (
        <textarea
          className="Input_Style"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter text..."
        />
      )}
      {buttonText === "Translate" && (
        <div className="Result_Style">{summary}</div>
      )}
      {buttonText === "Start Over" && (
        <div className="Result_Style">{isTranslate}</div>
      )}
    </>
  );
  
  // _________________________________________________ Button Section __________________
  const ButtonContainer = (
    <div className="Button_container">
      {buttonText === "See Result" && (
        <button className="button_Style" onClick={() => getSummary(inputText)}>
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
          <button className="button_Style" onClick={handleTranslateClick}>
            {buttonText}
          </button>
        </div>
      )}
      {buttonText === "Start Over" && (
        <button className="button_Style" onClick={handleStartOverClick}>
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
