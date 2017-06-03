# PW Viewer

Image viewer with the following features:

* Follows the progressive enhancement strategy: if the javascript fail, the web page keeps working.
* Works with `<picture>` element
* Allows to apply transformations to the element (scale, rotate, translate, etc)
* Allows to drag the element
* No css provided: you have all control about how this component must look.

## Requirements

* NPM to install the package and the dependencies
* Webpack (or any other javascript loader with ES6 modules support)

## Browser supports

* Any modern web
* IE11


## Usage

Let's say we have the following html code:

```html
<figure id="viewer">
	<picture>
		<source srcset="http://placehold.it/2000x1200" media="(min-width:2000px)">
		<source srcset="http://placehold.it/1500x900" media="(min-width:1500px)">
		<source srcset="http://placehold.it/1000x600" media="(min-width:1000px)">
		<source srcset="http://placehold.it/500x300" media="(min-width:500px)">
		<img srcset="http://placehold.it/500x300" data-viewer-src="http://placehold.it/2000x1200">
	</picture>
</figure>

<button id="viewer-button">Zoom</button>
```
Note the `data-viewer-src` attribute in the image. It's used to load a full quality image on zoom. Then, write some css code (optional but recommended):

```css
.pw-viewer {
	overflow: hidden;
	margin: 0;
}
img {
	max-width: 100%;
	display: block;
	margin: 0 auto;
}
```

And finally init the viewer:

```js
import Viewer from 'pw-viewer';

//Init the viewer
var myViewer = new Viewer(document.querySelector('#viewer img'));

//Zoom on click the button
document.getElementById('viewer-button').addEventListener('click', function () {
    myViewer.zoom();
});

//Register a zoom event
myViewer.on('zoom', function (zoom) {
    console.log(zoom);
});
```
