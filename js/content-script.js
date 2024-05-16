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

    // window.addEventListener("message", function (e) {
    //     console.log(e.data);
    // }, false);

    setTimeout(() => {
        window.postMessage({ "test": '你好！' }, '*');

    }, 3000)



});


