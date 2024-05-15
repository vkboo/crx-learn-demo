document.addEventListener('DOMContentLoaded', function () {
    // var div = document.querySelector('#trans-to');
    console.log('我被执行了！', {
        'chrome': chrome,
    });

    // const backgroundPage = chrome.extension.getBackgroundPage()
    const button = document.querySelector('#button');
    console.log('>>>button', button)
    // button.addEventListener('click', () => {
    //     console.log('>>>backgroundPage')
    // }, false)
});

// chrome.extension.setIcon('../images/icon-128.png')