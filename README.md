# PW Viewer

Image viewer with the following features:

* Follows the progressive enhancement strategy: **if javascript fails, the web page keeps working**
* CSS powered:
  * **High performance:** Use css transform to scale, rotate, translate elements
  * No styles or themes are provided with this package. **You decide how the viewer must look.**
* Responsive:
  * **Suport for touch devices**
  * **Works with `<picture>`** element
  * **Light and fast**
* Modern
  * Build with ES6 and modern tools (webpack, babel, etc)
  * Easy to extend and adapt to your needs
  * Support for **all modern browsers.** IE10+ should work


## Install

Requirements:

* NPM to install the [package and the dependencies](https://www.npmjs.com/package/pw-viewer)
* Webpack (or any other javascript loader)

```
npm install pw-viewer
```

## Usage

### Html

Let's say we have the following html code:

```html
<button class="viewer-zoom">Zoom</button>
<button class="viewer-reset">Reset</button>

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

Note the `data-viewer-src` attribute in the image. It's used to load a full quality image on zoom.

### CSS

The following css code is optional (but recommended):

```css
.viewer {
    overflow: hidden;
    margin: 0;
}
.viewer img {
    max-width: 100%;
    display: block;
    margin: 0 auto;
    transition: transform .5s;
}
```

### JS

And finally the javascript to build the viewer:

```js
import Viewer from 'pw-viewer';

//Init the viewer
var myViewer = new Viewer(document.querySelector('.viewer img'));

//Zoom on click the button
document.querySelector('.viewer-zoom')
    .addEventListener('click', event => {
      myViewer.transform({ scale: 1.5 }); //zoom
      myViewer.drag(true); //enable dragging
    });

document.querySelector('.viewer-reset')
    .addEventListener('click', event => {
      myViewer.reset(); //Remove zoom and dragging
    });
```
