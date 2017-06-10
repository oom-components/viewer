import d from 'd_js';
import AlloyFinger from 'alloyfinger';

export default class Viewer {
    constructor(el) {
        this.element = el;
        this.transformsLimits = {};
        this.transforms = {
            translate: [0, 0],
            scale: 1,
            rotate: 0
        };
    }

    reset() {
        this.transform({
            translate: [0, 0],
            scale: 1,
            rotate: 0
        });
    }

    touch(options) {
        if (this.dragger) {
            this.untouch();
        }
        options = options || { scale: true, translate: true };
        this.dragger = createDragger(this, options);
    }

    untouch() {
        if (this.dragger) {
            this.dragger.destroy();
            delete this.dragger;
        }
    }

    limits(limits) {
        this.transformsLimits = limits;
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

        this.transforms.scale = range(
            this.transforms.scale,
            this.transformsLimits.scale
        );

        for (let name in this.transforms) {
            let value = this.transforms[name];

            if (value === false) {
                continue;
            }

            if (Array.isArray(value)) {
                value = value.map(v => v + 'px').join(', ');
            }

            if (name === 'rotate') {
                value += 'deg';
            }

            css.push(name + '(' + value + ')');
        }

        d.css(this.element, 'transform', css.length ? css.join(' ') : 'none');
    }
}

function range(value, minmax) {
    if (!minmax) {
        return value;
    }

    if (value < minmax[0]) {
        return minmax[0];
    }

    if (value > minmax[1]) {
        return minmax[1];
    }

    return value;
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

function createDragger(viewer, options) {
    const element = viewer.element;
    const transforms = viewer.transforms;
    let initScale, initTransition;

    let dragger = {
        multipointStart: () => {
            initScale = transforms.scale;
        },
        touchStart: () => {
            initTransition = d.css(element, 'transition');
            d.css(element, 'transition', 'none');
        },
        touchEnd: () => {
            d.css(element, 'transition', initTransition);
        }
    };

    if (options.scale) {
        dragger.pinch = event => {
            viewer.transform({
                scale: initScale * event.zoom
            });
        };
    }

    if (options.translate) {
        dragger.pressMove = event => {
            viewer.transform({
                translate: [
                    transforms.translate[0] + event.deltaX,
                    transforms.translate[1] + event.deltaY
                ]
            });
        };
    }

    if (options.rotate) {
        dragger.rotate = event => {
            viewer.transform({
                rotate: transforms.rotate + event.angle
            });
        };
    }

    return new AlloyFinger(element, dragger);
}
