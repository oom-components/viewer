import d from 'd_js';
import Unidragger from 'unidragger';

class Dragger extends Unidragger {
    constructor(viewer) {
        super();
        this.viewer = viewer;
        this.handles = [viewer.element];
        this.offsetX = 0;
        this.offsetY = 0;
    }

    start() {
        this.bindHandles();
    }

    stop(reset) {
        this.unbindHandles();

        if (reset) {
            this.offsetX = 0;
            this.offsetY = 0;
        }
    }

    dragStart(event, pointer) {
        this.transition = d.css(this.viewer.element, 'transition');
        d.css(this.viewer.element, 'transition', 'none');
        console.log(this.viewer.transforms);
    }

    dragMove(event, pointer, moveVector) {
        this.lastMove = moveVector;

        this.viewer.transform({
            translate: [
                this.offsetX + moveVector.x,
                this.offsetY + moveVector.y
            ]
        });
    }

    dragEnd(event, pointer) {
        this.offsetX += this.lastMove.x;
        this.offsetY += this.lastMove.y;
        d.css(this.viewer.element, 'transition', this.transition);
    }
}

export default class Viewer {
    constructor(el, zooms) {
        this.element = el;
        this.transforms = { translate: false, scale: false };
    }

    reset() {
        this.drag(false, true);
        this.transform({
            translate: [0, 0],
            scale: 1
        });
    }

    drag(enable, reset) {
        if (enable) {
            if (!this.dragger) {
                this.dragger = new Dragger(this);
            }

            this.dragger.start();
        } else if (this.dragger) {
            this.dragger.stop(reset);
        }
    }

    transform(transforms) {
        const css = [];

        if (transforms) {
            for (let name in transforms) {
                this.transforms[name] = transforms[name];
            }
        }

        if (this.transforms.scale > 1) {
            loadFullResolutionImage(this.element);
        }

        for (let name in this.transforms) {
            let value = this.transforms[name];

            if (!value) {
                continue;
            }

            if (Array.isArray(value)) {
                value = value
                    .map(function(unit) {
                        if (typeof unit === 'number') {
                            return unit + 'px';
                        }

                        return unit;
                    })
                    .join(', ');
            }

            if (value) {
                css.push(name + '(' + value + ')');
            }
        }

        d.css(this.element, 'transform', css.length ? css.join(' ') : 'none');
    }
}

function loadFullResolutionImage(element) {
    const src = d.data(element, 'viewerSrc');

    if (!src || !d.is(element, 'img')) {
        return;
    }

    if (d.is(element.parentElement, 'picture')) {
        d.remove({ source: element.parentElement });
    }

    element.setAttribute('src', src);
    element.removeAttribute('srcset');
    d.data(element, 'viewerSrc', '');
}
