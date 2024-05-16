
function getCurrentTabId(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('pupup received message:', request);
    sendResponse('xxx')
});

document.getElementById('button').addEventListener('click', function () {
    // console.log('123 button')
    // // chrome.tabs.create({ url: 'popup.html' });

    // chrome.runtime.sendMessage(
    //     { message: 'message value' },
    //     (res) => {
    //         console.log('>>>', res)
    //     },
    // )


    //     {cmd:'test', value:'你好，我是popup！'}, function(response)
    // {
    // 	console.log('来自content的回复：'+response);
    // }
    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //     chrome.tabs.sendMessage(
    //         tabs[0].id,
    //         { cmd: 'test', value: '你好，我是popup！' },
    //         response => {
    //             console.log('来自content的回复：' + response);
    //         });
    // });
    getCurrentTabId((tabId) => {
        var port = chrome.tabs.connect(tabId, { name: 'test-connect' });
        port.postMessage({ question: '你是谁啊？' });
        port.onMessage.addListener(function (msg) {
            console.log('收到消息：' + msg.answer);
            if (msg.answer && msg.answer.startsWith('我是')) {
                port.postMessage({ question: '哦，原来是你啊！' });
            }
        });
    });
})
