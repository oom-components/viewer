import d from 'd_js';
import Unidragger from 'unidragger';

class Dragger extends Unidragger {

    constructor (viewer) {
        super();
        this.viewer = viewer;
        this.handles = [viewer.element];
    }

    start() {
        this.bindHandles();
        this.offsetX = 0;
        this.offsetY = 0;
    }

    stop(handler) {
        this.unbindHandles();
    }

    dragMove(event, pointer, moveVector) {
        this.lastMove = moveVector;
        d.css(this.viewer.element, 'transition', 'none');

        this.viewer.transform({
            translate: [this.offsetX + moveVector.x, this.offsetY + moveVector.y]
        });
    }

    dragEnd(event, pointer) {
        this.offsetX += this.lastMove.x;
        this.offsetY += this.lastMove.y;
    }
}

export default class Viewer {

    constructor(el, zooms) {
        this.element = el;
        this.transforms = { translate: false, scale: false };
        this.level = 0;
        this.events = { zoom: [] };
        this.zooms = zooms || [
            {
                scale: 1,
                drag: false
            },
            {
                scale: 1.5,
                drag: true
            },
            {
                scale: 2.5,
                drag: true
            }
        ];

        this.zooms[1].init = true;
    }

    init() {
        this.dragger = new Dragger(this);

        var src = d.data(this.element, 'viewerSrc');

        if (!src || !d.is(this.element, 'img')) {
            return;
        }

        if (d.is(this.element.parentElement, 'picture')) {
            d.remove({ source: this.element.parentElement });
        }

        this.element.setAttribute('src', src);
        this.element.removeAttribute('srcset');
    }

    on(event, handler) {
        this.events[event].push(handler);
    }

    zoom() {
        ++this.level;

        if (this.level >= this.zooms.length) {
            this.level = 0;
        }

        d.css(this.element, 'transition', 'transform .5s');

        const zoom = this.zooms[this.level];

        if (zoom.init) {
            this.init();
            zoom.init = false;
        }

        this.transforms.scale = zoom.scale;

        if (zoom.drag) {
            this.dragger.start();
        } else if (this.dragger) {
            this.dragger.stop();
            this.transforms.translate = [0, 0];
        }

        this.transform();

        this.events.zoom.forEach(function(handler) {
            handler.call(this, zoom);
        }, this);
    }

    transform(transforms) {
        const css = [];

        if (transforms) {
            for (let name in transforms) {
                this.transforms[name] = transforms[name];
            }
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
};