import Viewer from '../src';

//Init the viewer
var myViewer = new Viewer(document.querySelector('.viewer img'));

//Limit the scale
myViewer.limits({ scale: [1, 4] });

//Zoom on click the button
let zoomed = false;

document.querySelector('.viewer-button').addEventListener('click', () => {
    if (!zoomed) {
        //scale and enable touch
        myViewer.transform({ scale: 2.5 });
        myViewer.touch();
    } else {
        //reset and disable touch
        myViewer.reset();
        myViewer.untouch();
    }

    zoomed = !zoomed;
});
