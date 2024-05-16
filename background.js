// background.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'getBrowserInfo') {
        sendResponse({ browserInfo: 'browser' });
    }
});

