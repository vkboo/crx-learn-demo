
document.addEventListener('DOMContentLoaded', function () {
    // var div = document.querySelector('#trans-to');
    injectCustomJs();

    chrome.runtime.sendMessage({ action: 'getBrowserInfo' }, function (response) {
        console.log(response);
        // console.log(response.browserInfo);
    });


    // const backgroundPage = chrome.extension.getBackgroundPage()
    // const button = document.querySelector('#button');
    // console.log('>>>button', button)
    // button.addEventListener('click', () => {
    //     console.log('>>>backgroundPage')
    // }, false)
});

// chrome.extension.setIcon('../images/icon-128.png')

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

