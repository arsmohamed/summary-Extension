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
  const [inputText, setInputText] = useState(""); // State for input text
  const [summary, setSummary] = useState(""); // State for summary
  const [buttonText, setButtonText] = useState("See Result"); // State for button text
  const [TittleText, setTittleText] = useState("Paste Paragraph :"); // State for button text
  const [isTranslate, setIsTranslate] = useState("Translation");
  const handleInputChange = (event) => {
    setInputText(event.target.value); // Update input text state
  };

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
  const handleTranslateClick = () => {
    setButtonText("Start Over"); // Change button text to 'Start Over'
    const sampleSummary = "Translated";
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
  const ButtonContainer = (
    <div className="Button_container">
      {buttonText === "See Result" && (
        <button className="button_Style" onClick={() => getSummary(inputText)}>
          {buttonText}
        </button>
      )}
      {buttonText === "Translate" && (
        <button className="button_Style" onClick={handleTranslateClick}>
          {buttonText}
        </button>
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
