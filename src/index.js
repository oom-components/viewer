import d from 'd_js';
import Pointer from './Pointer';

export default class Viewer {
    constructor(el) {
        this.element = el;
        this.transformsLimits = {};
        this.transforms = {
            translate: [0, 0],
            scale: 1,
            rotate: 0
        };

        this.pointer = new Pointer(this);
    }

    reset() {
        this.transform({
            translate: [0, 0],
            scale: 1,
            rotate: 0
        });
    }

    limits(limits) {
        this.transformsLimits = limits;
    }

    drag(enable) {
        if (enable || !arguments.length) {
            this.pointer.start();
        } else {
            this.pointer.stop();
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
    const src = element.dataset.viewerSrc;

    if (!src || !element.matches('img')) {
        return;
    }

    if (element.parentElement.matches('picture')) {
        d.getAll({ source: element.parentElement }).forEach(source => source.remove());
    }

    element.setAttribute('src', src);
    element.removeAttribute('srcset');
    element.dataset.viewerSrc = '';
}
