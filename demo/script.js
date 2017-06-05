import Viewer from '../src';

//Init the viewer
var myViewer = new Viewer(document.querySelector('.viewer img'));

var currentStatus = 0;
var statuses = [
    {
        transform: {
            scale: 2
        },
        drag: true
    },
    {
        transform: {
            scale: 3
        },
        drag: true
    }
];

//Zoom on click the button
document.querySelector('.viewer-button').addEventListener('click', () => {
    let status = statuses[currentStatus++];

    if (!status) {
        currentStatus = 0;
        myViewer.reset();
        return;
    }

    if (status.transform) {
        myViewer.transform(status.transform);
    }

    if (status.drag) {
        myViewer.drag(true);
    }
});
