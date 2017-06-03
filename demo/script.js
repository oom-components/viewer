import Viewer from '../'

var v = new Viewer(document.querySelector('img'));

v.on('zoom', function (zoom) {
    console.log(zoom);
});

document.getElementById('zoom').addEventListener('click', function () {
    v.zoom();
});