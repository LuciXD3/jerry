chrome.runtime.onInstalled.addListener(() => {
    console.log("Extensia AI Answer a fost instalată!");
});

// Captura de ecran
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "capture_screenshot") {
        chrome.tabs.captureVisibleTab(null, {}, function (image) {
            sendResponse({image: image});
        });
        return true;  // Indică faptul că se va răspunde asincron
    }
});
