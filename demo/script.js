import Viewer from '../src';

//Init the viewer
var myViewer = new Viewer(document.querySelector('.viewer img'));

//Zoom on click the button
document.querySelector('.viewer-button').addEventListener('click', () => myViewer.zoom());

//Register a zoom event
myViewer.on('zoom', zoom => console.log(zoom));
