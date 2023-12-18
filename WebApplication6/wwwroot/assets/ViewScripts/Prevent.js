document.addEventListener('keydown', function () {
    if (event.keyCode == 123) {
        event.preventDefault();
    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
        event.preventDefault();
    } else if (event.ctrlKey && event.keyCode == 85) {
        event.preventDefault();
    }
}, false);

if (document.addEventListener) {
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    }, false);
} else {
    document.attachEvent('oncontextmenu', function () {
        window.event.returnValue = false;
    });
}