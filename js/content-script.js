// 向页面注入JS
function injectCustomJs(jsPath) {
    jsPath = jsPath || 'js/inject.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    // src: chrome-extension://mbfmcfjjadlmkbljflpeeeamhpmomjmo/js/inject.js
    temp.src = chrome.runtime.getURL(jsPath);
    temp.onload = function () {
        // 放在页面不好看，执行完后移除掉
        this.parentNode.removeChild(this);
    };
    document.head.appendChild(temp);
}



document.addEventListener('DOMContentLoaded', function () {
    injectCustomJs();

    chrome.runtime.sendMessage({ action: 'getBrowserInfo' }, function (response) {
        console.log(response);
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log('onMessage.addListener', message);
        sendResponse(JSON.stringify({ msg: '你好👋' }))
        // if (message.action === 'getBrowserInfo') {
        //     sendResponse({
        //         browserInfo: '你好！'
        //     });
        // }
    });

    // 监听长连接
    chrome.runtime.onConnect.addListener(function (port) {
        console.log(port);
        if (port.name == 'test-connect') {
            port.onMessage.addListener(function (msg) {
                console.log('收到长连接消息：', msg);
                if (msg.question == '你是谁啊？') port.postMessage({ answer: '我是你爸！' });
            });
        }
    });

    // window.addEventListener("message", function (e) {
    //     console.log(e.data);
    // }, false);

    // setTimeout(() => {
    //     window.postMessage({ "test": '你好！' }, '*');

    // }, 3000)



});


