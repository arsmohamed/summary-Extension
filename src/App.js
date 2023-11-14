// https://rapidapi.com/Glavier/api/chatgpt53/
import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const headers = {
  "content-type": "application/json",
  "X-RapidAPI-Key": "d21e22b6aemsh31775c1a1d8ff0cp111a5bjsned4612084d2a",
  "X-RapidAPI-Host": "chatgpt-api8.p.rapidapi.com",
};

const App = () => {
  const [inputText, setInputText] = useState(""); // State for input text
  const [summary, setSummary] = useState(""); // State for summary

  const handleInputChange = (event) => {
    setInputText(event.target.value); // Update input text state
  };

  const getSummary = (inputText) => {
    const text = inputText; // Store the inputText value in a separate variable
    // const data = {
    //   messages: [
    //     {
    //       role: "user",
    //       content: "how to be create ",
    //     },
    //   ],
    //   temperature: 1,
    // };
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
      .post("https://chatgpt53.p.rapidapi.com/", data, {
        headers: headers,
      })
      .then((response) => {
        // Handle the response from the OpenAI API
        const summary = response.data;
        console.log(summary.text);
        setSummary(summary.text);
      })
      .catch((error) => {
        // Handle any errors that may occur
        console.error(error);
      });
  };

  return (
    <div className="App">
      <header className="App_header">Summarize Paragraph :</header>
      <textarea
        className="Input_Style"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter text..."
      />
      <div className="Button_container">
        <button
          className="button_Style"
          // onClick={() => getSummary(inputText)}
        >
          See Result
        </button>
      </div>
      <div className="Result_Style">{summary}</div>
    </div>
  );
};

export default App;
