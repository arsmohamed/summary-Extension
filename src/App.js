/* global chrome */
import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [tabContent, setTabContent] = useState("");
  const handleClick = () => {
    // Get the current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Use the first tab in the array, which is the active tab
      let tab = tabs[0];

      // Execute the script on the tab
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          function: () => {
            return document.body.innerText;
          },
        },
        (result) => {
          const content = result[0].result;
          setTabContent(content);
        }
      );
    });
  };

  return (
    <div className="App">
      <header className="App_header">working on the extension</header>
      <button className="button_Style" onClick={handleClick}>
        Scan Page
      </button>
      <pre className="Content_Style">{tabContent}</pre>
    </div>
  );
};

export default App;
