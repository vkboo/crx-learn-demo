document.getElementById('button').addEventListener('click', function() {
    console.log('123 button')
    chrome.tabs.create({ url: 'popup.html' });
})