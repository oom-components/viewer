import Viewer from '../';

//Init the viewer
var myViewer = new Viewer(document.querySelector('.viewer img'));

//Zoom on click the button
document.querySelector('.viewer-button').addEventListener('click', function () {
    myViewer.zoom();
});

//Register a zoom event
myViewer.on('zoom', function (zoom) {
    console.log(zoom);
});