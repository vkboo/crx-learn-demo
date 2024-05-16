// background.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'getBrowserInfo') {
        sendResponse({ browserInfo: 'browser' });
    }
});


chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: 'contextId',
        title: "测试右键菜单",
        // onclick: function () { alert('您点击了右键菜单！'); }
        contexts: ['all'],
    });
    chrome.contextMenus.onClicked.addListener(function (info, tab) {
        // Handle the click here
        chrome.tabs.create({ url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(info.selectionText) });
    });

});


