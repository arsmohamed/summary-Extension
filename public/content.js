chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "scanPage") {
    const htmlText = document.documentElement.outerHTML;
    chrome.runtime.sendMessage({ action: "displayResult", result: htmlText });
  }
});
