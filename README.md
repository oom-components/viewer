# PW Viewer

Image viewer with the following features:

* Follows the progressive enhancement strategy: if the javascript fail, the web page keeps working.
* Works with `<picture>` element
* Allows to apply transformations to the element (scale, rotate, translate, etc)
* Allows to drag the element
* No css provided: you have all control about how this component must look.

## Requirements

* NPM to install the package and the dependencies
* Webpack + Babel (or any other javascript loader with ES6 support)

## Browser supports

* Any modern web
* Not tested in IE but should work (at least in IE11)

## Install

Use `npm` or yarn to install this package

```
npm install pw-viewer
```

You should install also some dev dependencies:

```
npm install webpack babel-core babel-loader
```

And configure webpack to use babel:

```
module.exports = {
    module: {
        rules: [
            {
                test: /wp-viewer\/.*\.js$/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    }
};
```

## Usage

Let's say we have the following html code:

```html
<button class="viewer-button">Zoom</button>

<figure class="viewer">
	<picture>
		<source srcset="http://placehold.it/2000x1200" media="(min-width:2000px)">
		<source srcset="http://placehold.it/1500x900" media="(min-width:1500px)">
		<source srcset="http://placehold.it/1000x600" media="(min-width:1000px)">
		<source srcset="http://placehold.it/500x300" media="(min-width:500px)">
		<img srcset="http://placehold.it/500x300" data-viewer-src="http://placehold.it/2000x1200">
	</picture>
</figure>
```
Note the `data-viewer-src` attribute in the image. It's used to load a full quality image on zoom. Then, write some css code (optional but recommended):

```css
.viewer {
	overflow: hidden;
	margin: 0;
}
.viewer img {
	max-width: 100%;
	display: block;
	margin: 0 auto;
}
```

And finally init the viewer:

```js
import Viewer from 'pw-viewer';

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
```
