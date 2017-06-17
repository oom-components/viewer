import d from 'd_js';
import Pep from 'pepjs';

export default class Pointer {
    constructor(viewer) {
        this.viewer = viewer;
    }

    start() {
        const element = this.viewer.element;
        element.setAttribute('touch-action', 'none');

        this.pointers = {};
        this.events = {
            down: e => {
                e.preventDefault();
                this.transition = d.css(element, 'transition');
                d.css(element, 'transition', 'none');
                this.pointers[e.pointerId] = {
                    x: e.clientX - this.viewer.transforms.translate[0],
                    y: e.clientY - this.viewer.transforms.translate[1]
                };
            },

            up: e => {
                if (this.pointers[e.pointerId]) {
                    e.preventDefault();
                    d.css(element, 'transition', this.transition);
                    delete this.pointers[e.pointerId];
                }
            },

            move: e => {
                const pointer = this.pointers[e.pointerId];

                if (pointer) {
                    e.preventDefault();
                    this.viewer.transform({
                        translate: [
                            e.clientX - pointer.x,
                            e.clientY - pointer.y
                        ]
                    })
                }
            }
        };

        d.on('pointerdown', element, this.events.down);
        d.on('pointerup', element, this.events.up);
        d.on('pointermove', element, this.events.move);
    }

    stop() {
        const element = this.viewer.element;
        element.removeAttribute('touch-action', 'none');

        if (this.events) {
            d.off('pointerdown', element, this.events.down);
            d.off('pointerup', element, this.events.up);
            d.off('pointermove', element, this.events.move);
            delete this.events;
        }
    }
}
