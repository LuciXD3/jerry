document.getElementById("captureBtn").addEventListener("click", function () {
    chrome.runtime.sendMessage({action: "capture_screenshot"}, function(response) {
        const image = response.image;
        const screenshotContainer = document.getElementById("screenshotContainer");
        screenshotContainer.innerHTML = `<img src="${image}" />`;
    });
});

// Afișează răspunsul din content.js în popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'show_response') {
        const responseContainer = document.getElementById("responseContainer");
        responseContainer.textContent = message.response;  // Afișează răspunsul primit
    }
});
