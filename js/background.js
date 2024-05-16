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
        // chrome.tabs.create({ url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(info.selectionText) });
        chrome.permissions.request({
            permissions: ['notifications']
        }, function (granted) {
            if (granted) {
                console.log('Notification permission granted.');
                chrome.notifications.create('notification-id', {
                    type: 'basic',
                    iconUrl: '../images/icons8-wechat-48.png',
                    title: '这是标题',
                    message: '您刚才点击了自定义右键菜单！'
                });
            } else {
                console.log('Notification permission not granted.');
            }
        });

    });


});

// omnibox 演示
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
    console.log('inputChanged: ' + text);
    if (!text) return;
    if (text == '美女') {
        suggest([
            { content: '中国' + text, description: '你要找“中国美女”吗？' },
            { content: '日本' + text, description: '你要找“日本美女”吗？' },
            { content: '泰国' + text, description: '你要找“泰国美女或人妖”吗？' },
            { content: '韩国' + text, description: '你要找“韩国美女”吗？' }
        ]);
    }
    else if (text == '微博') {
        suggest([
            { content: '新浪' + text, description: '新浪' + text },
            { content: '腾讯' + text, description: '腾讯' + text },
            { content: '搜狐' + text, description: '搜索' + text },
        ]);
    }
    else {
        suggest([
            { content: '百度搜索 ' + text, description: '百度搜索 ' + text },
            { content: '谷歌搜索 ' + text, description: '谷歌搜索 ' + text },
        ]);
    }
});

// 当用户接收关键字建议时触发
chrome.omnibox.onInputEntered.addListener((text) => {
    console.log('inputEntered: ' + text);
    if (!text) return;
    var href = '';
    if (text.endsWith('美女')) href = 'http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=' + text;
    else if (text.startsWith('百度搜索')) href = 'https://www.baidu.com/s?ie=UTF-8&wd=' + text.replace('百度搜索 ', '');
    else if (text.startsWith('谷歌搜索')) href = 'https://www.google.com.tw/search?q=' + text.replace('谷歌搜索 ', '');
    else href = 'https://www.baidu.com/s?ie=UTF-8&wd=' + text;
    openUrlCurrentTab(href);
});
// 获取当前选项卡ID
function getCurrentTabId(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}

// 当前标签打开某个链接
function openUrlCurrentTab(url) {
    getCurrentTabId(tabId => {
        chrome.tabs.update(tabId, { url: url });
    })
}