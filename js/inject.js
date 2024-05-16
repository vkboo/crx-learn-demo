// function foo() {
//     window.postMessage({ "test": '你好！' }, '*');
// }

window.addEventListener("message", function (e) {
    console.log(e.data);
}, false);