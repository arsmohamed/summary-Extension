/* global chrome */
import "./App.css";
import React, { useState, useEffect } from "react";

const App = () => {
  const [result, setResult] = useState("");

  const scanPage = () => {
    // // Implement your scanning logic here
    // const htmlText = document.documentElement.outerHTML;
    // console.log(htmlText);
    // setResult(htmlText);
  };

  useEffect(() => {
    // Check if running in a Chrome extension
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "scanPage" });
      });

      chrome.runtime.onMessage.addListener(function (
        request,
        sender,
        sendResponse
      ) {
        if (request.action === "displayResult") {
          setResult(request.result);
        }
      });
    } else {
      // Handle the case when not running in a Chrome extension
      console.warn(
        "The 'chrome' object is not defined. Make sure you are running the app in a Chrome extension context."
      );
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">working on the extension</header>
      {typeof chrome !== "undefined" && chrome.tabs ? (
        <button onClick={scanPage}>Scan Page</button>
      ) : null}
      <pre className="Content_Style">{result}</pre>
    </div>
  );
};

export default App;
