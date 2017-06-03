/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

(function (root, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
            return factory();
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.d = factory();
    }
}(this, function () {
    var div = document.createElement('div');

    function d (query) {
        //constructor
        if (this instanceof d) {
            Array.prototype.splice.apply(this, [0, 0].concat(query));
        } else {
            return new d(selectOrParse(query));
        }
    }

    /*
     * Select the first element
     */
    d.get = function (query) {
        if (typeof query === 'string') {
            return document.querySelector(query);
        }

        if (query instanceof NodeList || query instanceof HTMLCollection || query instanceof Array || query instanceof d) {
            return query[0];
        }

        if (Object.prototype.toString.call(query) === '[object Object]') {
            for (var q in query) {
                return query[q].querySelector(q);
            }
        }

        return query;
    };

    /*
     * Select an array of elements
     */
    d.getAll = function (query) {
        if (Array.isArray(query)) {
            return query;
        }

        if (typeof query === 'string') {
            query = document.querySelectorAll(query);
        } else if (Object.prototype.toString.call(query) === '[object Object]' && !(query instanceof d)) {
            for (var q in query) {
                query = query[q].querySelectorAll(q);
                break;
            }
        }

        if (query instanceof NodeList || query instanceof HTMLCollection || query instanceof d) {
            return Array.prototype.slice.call(query);
        }


        return [query];
    };

    /**
     * Select the siblings of an element
     */
    d.getSiblings = function (element, query) {
        element = d.get(element);

        if (!element) {
            return [];
        }

        return d.getAll(element.parentNode.children).filter(function (child) {
            return child !== element && (!query || d.is(child, query));
        });
    };

    /*
     * Check whether the element matches with a selector
     */
    d.is = function (element, query) {
        if (typeof query === 'string') {
            return (element.matches || element.matchesSelector || element.msMatchesSelector || element.mozMatchesSelector || element.webkitMatchesSelector || element.oMatchesSelector).call(element, query);
        }

        return element === query;
    };

    /*
     * Attach an event to the elements.
     */
    d.on = function (events, query, callback, useCapture) {
        d.getAll(query).forEach(function (el) {
            events.split(' ').forEach(function (event) {
                el.addEventListener(event, callback, useCapture || false);
            });
        });
    };

    /*
     * Delegate an event to the elements.
     */
    d.delegate = function (events, query, selector, callback) {
        d.on(events, query, function (event) {
            for (var target = event.target; target && target !== this; target = target.parentNode) {
                if (d.is(target, selector)) {
                    callback.call(target, event);
                    break;
                }
            }
        }, true);
    };

    /*
     * detach an event from the elements.
     */
    d.off = function (events, query, callback, useCapture) {
        d.getAll(query).forEach(function (el) {
            events.split(' ').forEach(function (event) {
                el.removeEventListener(event, callback, useCapture || false);
            });
        });
    };

    /*
     * dispatch an event.
     */
    d.trigger = function (event, query, data) {
        if (typeof event === 'string') {
            event = createEvent(event, data);
        }

        d.getAll(query).forEach(function (el) {
            el.dispatchEvent(event);
        });
    };

    /*
     * Remove elements
     */
    d.remove = function (query) {
        d.getAll(query).forEach(function (el) {
            el.parentNode.removeChild(el);
        });
    };

    /*
     * Insert a new element before other
     */
    d.insertBefore = function (query, content) {
        var element = d.get(query);

        if (element) {
            selectOrParse(content).forEach(function (el) {
                element.parentNode.insertBefore(el, element);
            });
        }
    };

    /*
     * Insert a new element after other
     */
    d.insertAfter = function (query, content) {
        var element = d.get(query);

        if (element) {
            selectOrParse(content).reverse().forEach(function (el) {
                element.parentNode.insertBefore(el, element.nextSibling);
            });
        }
    };

    /*
     * Insert a new element as the first child of other
     */
    d.prepend = function (query, content) {
        var element = d.get(query);

        if (element) {
            selectOrParse(content).reverse().forEach(function (el) {
                element.insertBefore(el, element.firstChild);
            });
        }
    };

    /*
     * Insert a new element as the last child of other
     */
    d.append = function (query, content) {
        var element = d.get(query);

        if (element) {
            selectOrParse(content).forEach(function (el) {
                element.appendChild(el);
            });
        }
    };

    /*
     * Get/set the styles of elements
     */
    d.css = function (query, prop, value) {
        if (arguments.length < 3 && (typeof prop !== 'object')) {
            var style = getComputedStyle(d.get(query));

            return (arguments.length === 1) ? style : style[styleProp(prop)];
        }

        var rules = {};

        if (typeof prop === 'object') {
            rules = prop;
        } else {
            rules[prop] = value;
        }

        d.getAll(query).forEach(function (el, index, elements) {
            for (var prop in rules) {
                var val = rules[prop];

                if (typeof val === 'function') {
                    val = val.call(this, el, index, elements);
                } else if (Array.isArray(val)) {
                    val = val[index % val.length];
                }

                el.style[styleProp(prop)] = val;
            }
        });
    };

    /*
     * Get/set data-* attributes
     */
    d.data = function (query, name, value) {
        if (arguments.length < 3 && (typeof name !== 'object')) {
            var element = d.get(query);

            if (!element || !element.dataset[name]) {
                return;
            }

            return dataValue(element.dataset[name]);
        }

        var values = {};

        if (typeof name === 'object') {
            values = name;
        } else {
            values[name] = value;
        }

        d.getAll(query).forEach(function (el) {
            for (var name in values) {
                var value = values[name];

                if (typeof value === 'object') {
                    value = JSON.stringify(value);
                }

                el.dataset[name] = value;
            }
        });
    };

    /*
     * Parses a html code
     */
    d.parse = function (html, forceArray) {
        div.innerHTML = html;

        if (div.children.length === 0) {
            return forceArray ? [] : null;
        }

        if (div.children.length === 1 && !forceArray) {
            return div.children[0];
        }

        return d.getAll(div.children);
    };


    /******************************
     * Wrapper for chaining
     ******************************/
    d.prototype = Object.create(Array.prototype, {
        on: {
            value: function (event, callback, useCapture) {
                d.on(event, this, callback, useCapture);
                return this;
            }
        },
        delegate: {
            value: function (event, selector, callback, useCapture) {
                d.delegate(event, this, selector, callback, useCapture);
                return this;
            }
        },
        off: {
            value: function (event, callback, useCapture) {
                d.off(event, this, callback, useCapture);
                return this;
            }
        },
        trigger: {
            value: function (event, data) {
                d.trigger(event, this, data);
                return this;
            }
        },
        css: {
            value: function () {
                return getSet(this, arguments, d.css);
            }
        },
        data: {
            value: function () {
                return getSet(this, arguments, d.data);
            }
        },
        insertBefore: {
            value: function (content) {
                d.insertBefore(this, content);
                return this;
            }
        },
        insertAfter: {
            value: function (content) {
                d.insertAfter(this, content);
                return this;
            }
        },
        prepend: {
            value: function (content) {
                d.prepend(this, content);
                return this;
            }
        },
        append: {
            value: function (content) {
                d.append(this, content);
                return this;
            }
        },
        insertBeforeTo: {
            value: function (query) {
                d.insertBefore(query, this);
                return this;
            }
        },
        insertAfterTo: {
            value: function (query) {
                d.insertAfter(query, this);
                return this;
            }
        },
        prependTo: {
            value: function (query) {
                d.prepend(query, this);
                return this;
            }
        },
        appendTo: {
            value: function (query) {
                d.append(query, this);
                return this;
            }
        }
    });


    /******************************
     * Helpers functions
     ******************************/

    function selectOrParse(query) {
        if (typeof query === 'string' && query[0] === '<') {
            return d.parse(query, true) || [];
        }

        return d.getAll(query);
    }

    function getSet(el, args, fn) {
        args = Array.prototype.slice.call(args);
        args.unshift(el);

        //getter
        if (args.length < 3 && (typeof args[1] !== 'object')) {
            return fn.apply(null, args);
        }

        fn.apply(null, args);
        return el;
    }

    function styleProp (prop) {
        //camelCase (ex: font-family => fontFamily)
        prop = prop.replace(/(-\w)/g, function (match) {
            return match[1].toUpperCase();
        });

        if (prop in div.style) {
            return prop;
        }

        //prefixed property
        var vendorProp,
            capProp = prop.charAt(0).toUpperCase() + prop.slice(1),
            prefixes = ['Moz', 'Webkit', 'O', 'ms'];

        for (var i = 0; i < prefixes.length; i++) {
            vendorProp = prefixes[i] + capProp;
            
            if (vendorProp in div.style) {
                return vendorProp;
            }
        }
    }

    function dataValue(value) {
        switch (value.toLowerCase()) {
        case 'true':
            return true;

        case 'false':
            return false;

        case 'undefined':
            return undefined;

        case 'null':
            return null;
        }

        var s = value.substr(0, 1);
        var e = value.substr(-1);

        if ((s === '[' && e === ']') || (s === '{' && e === '}')) {
            return JSON.parse(value);
        }

        if (/^\d+$/.test(value)) {
            return parseInt(value);
        }

        if (/^\d+\.\d+$/.test(value)) {
            return parseFloat(value);
        }

        return value;
    }

    function createEvent (type, data) {
        var event;

        //native event
        if (('on' + type) in div) {
            event = document.createEvent('HTMLEvents');
            event.initEvent(type, true, false);
            return event;
        }

        //custom event
        if (window.CustomEvent) {
            return new CustomEvent(type, {detail: data || {}});
        }

        event = document.createEvent('CustomEvent');
        event.initCustomEvent(type, true, true, data || {});
        return event;
    }

    return d;
}));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Unidragger v2.2.2
 * Draggable base class
 * MIT license
 */

/*jshint browser: true, unused: true, undef: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(6)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = function( Unipointer ) {
      return factory( window, Unipointer );
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('unipointer')
    );
  } else {
    // browser global
    window.Unidragger = factory(
      window,
      window.Unipointer
    );
  }

}( window, function factory( window, Unipointer ) {

'use strict';

// -------------------------- Unidragger -------------------------- //

function Unidragger() {}

// inherit Unipointer & EvEmitter
var proto = Unidragger.prototype = Object.create( Unipointer.prototype );

// ----- bind start ----- //

proto.bindHandles = function() {
  this._bindHandles( true );
};

proto.unbindHandles = function() {
  this._bindHandles( false );
};

/**
 * works as unbinder, as you can .bindHandles( false ) to unbind
 * @param {Boolean} isBind - will unbind if falsey
 */
proto._bindHandles = function( isBind ) {
  // munge isBind, default to true
  isBind = isBind === undefined ? true : !!isBind;
  // bind each handle
  var bindMethod = isBind ? 'addEventListener' : 'removeEventListener';
  for ( var i=0; i < this.handles.length; i++ ) {
    var handle = this.handles[i];
    this._bindStartEvent( handle, isBind );
    handle[ bindMethod ]( 'click', this );
    // touch-action: none to override browser touch gestures
    // metafizzy/flickity#540
    if ( window.PointerEvent ) {
      handle.style.touchAction = isBind ? 'none' : '';
    }
  }
};

// ----- start event ----- //

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerDown = function( event, pointer ) {
  // dismiss range sliders
  if ( event.target.nodeName == 'INPUT' && event.target.type == 'range' ) {
    // reset pointerDown logic
    this.isPointerDown = false;
    delete this.pointerIdentifier;
    return;
  }

  this._dragPointerDown( event, pointer );
  // kludge to blur focused inputs in dragger
  var focused = document.activeElement;
  if ( focused && focused.blur ) {
    focused.blur();
  }
  // bind move and end events
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// base pointer down logic
proto._dragPointerDown = function( event, pointer ) {
  // track to see when dragging starts
  this.pointerDownPoint = Unipointer.getPointerPoint( pointer );

  var canPreventDefault = this.canPreventDefaultOnPointerDown( event, pointer );
  if ( canPreventDefault ) {
    event.preventDefault();
  }
};

// overwriteable method so Flickity can prevent for scrolling
proto.canPreventDefaultOnPointerDown = function( event ) {
  // prevent default, unless touchstart or <select>
  return event.target.nodeName != 'SELECT';
};

// ----- move event ----- //

/**
 * drag move
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

// base pointer move logic
proto._dragPointerMove = function( event, pointer ) {
  var movePoint = Unipointer.getPointerPoint( pointer );
  var moveVector = {
    x: movePoint.x - this.pointerDownPoint.x,
    y: movePoint.y - this.pointerDownPoint.y
  };
  // start drag if pointer has moved far enough to start drag
  if ( !this.isDragging && this.hasDragStarted( moveVector ) ) {
    this._dragStart( event, pointer );
  }
  return moveVector;
};

// condition if pointer has moved far enough to start drag
proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
};


// ----- end event ----- //

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
  this._dragPointerUp( event, pointer );
};

proto._dragPointerUp = function( event, pointer ) {
  if ( this.isDragging ) {
    this._dragEnd( event, pointer );
  } else {
    // pointer didn't move enough for drag to start
    this._staticClick( event, pointer );
  }
};

// -------------------------- drag -------------------------- //

// dragStart
proto._dragStart = function( event, pointer ) {
  this.isDragging = true;
  this.dragStartPoint = Unipointer.getPointerPoint( pointer );
  // prevent clicks
  this.isPreventingClicks = true;

  this.dragStart( event, pointer );
};

proto.dragStart = function( event, pointer ) {
  this.emitEvent( 'dragStart', [ event, pointer ] );
};

// dragMove
proto._dragMove = function( event, pointer, moveVector ) {
  // do not drag if not dragging yet
  if ( !this.isDragging ) {
    return;
  }

  this.dragMove( event, pointer, moveVector );
};

proto.dragMove = function( event, pointer, moveVector ) {
  event.preventDefault();
  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
};

// dragEnd
proto._dragEnd = function( event, pointer ) {
  // set flags
  this.isDragging = false;
  // re-enable clicking async
  setTimeout( function() {
    delete this.isPreventingClicks;
  }.bind( this ) );

  this.dragEnd( event, pointer );
};

proto.dragEnd = function( event, pointer ) {
  this.emitEvent( 'dragEnd', [ event, pointer ] );
};

// ----- onclick ----- //

// handle all clicks and prevent clicks when dragging
proto.onclick = function( event ) {
  if ( this.isPreventingClicks ) {
    event.preventDefault();
  }
};

// ----- staticClick ----- //

// triggered after pointer down & up with no/tiny movement
proto._staticClick = function( event, pointer ) {
  // ignore emulated mouse up clicks
  if ( this.isIgnoringMouseUp && event.type == 'mouseup' ) {
    return;
  }

  // allow click in <input>s and <textarea>s
  var nodeName = event.target.nodeName;
  if ( nodeName == 'INPUT' || nodeName == 'TEXTAREA' ) {
    event.target.focus();
  }
  this.staticClick( event, pointer );

  // set flag for emulated clicks 300ms after touchend
  if ( event.type != 'mouseup' ) {
    this.isIgnoringMouseUp = true;
    // reset flag after 300ms
    setTimeout( function() {
      delete this.isIgnoringMouseUp;
    }.bind( this ), 400 );
  }
};

proto.staticClick = function( event, pointer ) {
  this.emitEvent( 'staticClick', [ event, pointer ] );
};

// ----- utils ----- //

Unidragger.getPointerPoint = Unipointer.getPointerPoint;

// -----  ----- //

return Unidragger;

}));


/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = Viewer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_unidragger__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_unidragger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_unidragger__);



function Viewer (el, zooms) {
    this.element = el;
    this.transforms = {translate: false, scale: false};
    this.level = 0;
    this.events = { zoom: [] };
    this.zooms = zooms || [
        {
            scale: 1,
            drag: false
        },{
            scale: 1.5,
            drag: true
        },{
            scale: 2.5,
            drag: true
        }
    ];

    this.zooms[1].init = true;
};

Viewer.prototype = {
    init: function () {
        var src = __WEBPACK_IMPORTED_MODULE_0_d_js___default.a.data(this.element, 'viewerSrc');

        if (!src || !__WEBPACK_IMPORTED_MODULE_0_d_js___default.a.is(this.element, 'img')) {
            return;
        }

        if (__WEBPACK_IMPORTED_MODULE_0_d_js___default.a.is(this.element.parentElement, 'picture')) {
            __WEBPACK_IMPORTED_MODULE_0_d_js___default.a.remove({'source': this.element.parentElement});
        }

        this.element.setAttribute('src', src);
        this.element.removeAttribute('srcset');
        this.dragger = new Dragger(this);
    },

    on: function (event, handler) {
        this.events[event].push(handler);
    },

    zoom: function () {
        ++this.level;

        if (this.level >= this.zooms.length) {
            this.level = 0;
        }

        __WEBPACK_IMPORTED_MODULE_0_d_js___default.a.css(this.element, 'transition', 'transform .5s');

        var zoom = this.zooms[this.level];

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

        this.events.zoom.forEach(function (handler) {
            handler.call(this, zoom);
        }, this);
    },

    transform: function (transforms) {
        var name;

        if (transforms) {
            for (name in transforms) {
                this.transforms[name] = transforms[name];
            }
        }

        var css = [];

        for (name in this.transforms) {
            var value = this.transforms[name];

            if (!value) {
                continue;
            }

            if (Array.isArray(value)) {
                value = value.map(function (unit) {
                    if (typeof unit === 'number') {
                        return unit + 'px';
                    }

                    return unit;
                }).join(', ');
            }

            if (value) {
                css.push(name + '(' + value + ')');
            }
        }

        css = css.length ? css.join(' ') : 'none';
        __WEBPACK_IMPORTED_MODULE_0_d_js___default.a.css(this.element, 'transform', css);
    }
};

function Dragger (viewer) {
    this.viewer = viewer;
    this.handles = [viewer.element];
}

Dragger.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_1_unidragger___default.a.prototype);

Dragger.prototype.start = function () {
    this.bindHandles();
    this.offsetX = 0;
    this.offsetY = 0;
};

Dragger.prototype.stop = function (handler) {
    this.unbindHandles();
};

Dragger.prototype.dragMove = function (event, pointer, moveVector) {
    this.lastMove = moveVector;
    __WEBPACK_IMPORTED_MODULE_0_d_js___default.a.css(this.viewer.element, 'transition', 'none');

    this.viewer.transform({
        translate: [
            this.offsetX + moveVector.x,
            this.offsetY + moveVector.y
        ]
    });
};

Dragger.prototype.dragEnd = function (event, pointer) {
    this.offsetX += this.lastMove.x;
    this.offsetY += this.lastMove.y;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( true ) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {

"use strict";

function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var i = 0;
  var listener = listeners[i];
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  while ( listener ) {
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
    // get next listener
    i += isOnce ? 0 : 1;
    listener = listeners[i];
  }

  return this;
};

proto.allOff =
proto.removeAllListeners = function() {
  delete this._events;
  delete this._onceEvents;
};

return EvEmitter;

}));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Unipointer v2.2.0
 * base class for doing one thing with pointer event
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*global define, module, require */
  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(5)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = function( EvEmitter ) {
      return factory( window, EvEmitter );
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.Unipointer = factory(
      window,
      window.EvEmitter
    );
  }

}( window, function factory( window, EvEmitter ) {

'use strict';

function noop() {}

function Unipointer() {}

// inherit EvEmitter
var proto = Unipointer.prototype = Object.create( EvEmitter.prototype );

proto.bindStartEvent = function( elem ) {
  this._bindStartEvent( elem, true );
};

proto.unbindStartEvent = function( elem ) {
  this._bindStartEvent( elem, false );
};

/**
 * works as unbinder, as you can ._bindStart( false ) to unbind
 * @param {Boolean} isBind - will unbind if falsey
 */
proto._bindStartEvent = function( elem, isBind ) {
  // munge isBind, default to true
  isBind = isBind === undefined ? true : !!isBind;
  var bindMethod = isBind ? 'addEventListener' : 'removeEventListener';

  if ( window.PointerEvent ) {
    // Pointer Events. Chrome 55, IE11, Edge 14
    elem[ bindMethod ]( 'pointerdown', this );
  } else {
    // listen for both, for devices like Chrome Pixel
    elem[ bindMethod ]( 'mousedown', this );
    elem[ bindMethod ]( 'touchstart', this );
  }
};

// trigger handler methods for events
proto.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// returns the touch that we're keeping track of
proto.getTouch = function( touches ) {
  for ( var i=0; i < touches.length; i++ ) {
    var touch = touches[i];
    if ( touch.identifier == this.pointerIdentifier ) {
      return touch;
    }
  }
};

// ----- start event ----- //

proto.onmousedown = function( event ) {
  // dismiss clicks from right or middle buttons
  var button = event.button;
  if ( button && ( button !== 0 && button !== 1 ) ) {
    return;
  }
  this._pointerDown( event, event );
};

proto.ontouchstart = function( event ) {
  this._pointerDown( event, event.changedTouches[0] );
};

proto.onpointerdown = function( event ) {
  this._pointerDown( event, event );
};

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto._pointerDown = function( event, pointer ) {
  // dismiss other pointers
  if ( this.isPointerDown ) {
    return;
  }

  this.isPointerDown = true;
  // save pointer identifier to match up touch events
  this.pointerIdentifier = pointer.pointerId !== undefined ?
    // pointerId for pointer events, touch.indentifier for touch events
    pointer.pointerId : pointer.identifier;

  this.pointerDown( event, pointer );
};

proto.pointerDown = function( event, pointer ) {
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// hash of events to be bound after start event
var postStartEvents = {
  mousedown: [ 'mousemove', 'mouseup' ],
  touchstart: [ 'touchmove', 'touchend', 'touchcancel' ],
  pointerdown: [ 'pointermove', 'pointerup', 'pointercancel' ],
};

proto._bindPostStartEvents = function( event ) {
  if ( !event ) {
    return;
  }
  // get proper events to match start event
  var events = postStartEvents[ event.type ];
  // bind events to node
  events.forEach( function( eventName ) {
    window.addEventListener( eventName, this );
  }, this );
  // save these arguments
  this._boundPointerEvents = events;
};

proto._unbindPostStartEvents = function() {
  // check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
  if ( !this._boundPointerEvents ) {
    return;
  }
  this._boundPointerEvents.forEach( function( eventName ) {
    window.removeEventListener( eventName, this );
  }, this );

  delete this._boundPointerEvents;
};

// ----- move event ----- //

proto.onmousemove = function( event ) {
  this._pointerMove( event, event );
};

proto.onpointermove = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerMove( event, event );
  }
};

proto.ontouchmove = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerMove( event, touch );
  }
};

/**
 * pointer move
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerMove = function( event, pointer ) {
  this.pointerMove( event, pointer );
};

// public
proto.pointerMove = function( event, pointer ) {
  this.emitEvent( 'pointerMove', [ event, pointer ] );
};

// ----- end event ----- //


proto.onmouseup = function( event ) {
  this._pointerUp( event, event );
};

proto.onpointerup = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerUp( event, event );
  }
};

proto.ontouchend = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerUp( event, touch );
  }
};

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerUp = function( event, pointer ) {
  this._pointerDone();
  this.pointerUp( event, pointer );
};

// public
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
};

// ----- pointer done ----- //

// triggered on pointer up & pointer cancel
proto._pointerDone = function() {
  // reset properties
  this.isPointerDown = false;
  delete this.pointerIdentifier;
  // remove events
  this._unbindPostStartEvents();
  this.pointerDone();
};

proto.pointerDone = noop;

// ----- pointer cancel ----- //

proto.onpointercancel = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerCancel( event, event );
  }
};

proto.ontouchcancel = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerCancel( event, touch );
  }
};

/**
 * pointer cancel
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerCancel = function( event, pointer ) {
  this._pointerDone();
  this.pointerCancel( event, pointer );
};

// public
proto.pointerCancel = function( event, pointer ) {
  this.emitEvent( 'pointerCancel', [ event, pointer ] );
};

// -----  ----- //

// utility function for getting x/y coords from event
Unipointer.getPointerPoint = function( pointer ) {
  return {
    x: pointer.pageX,
    y: pointer.pageY
  };
};

// -----  ----- //

return Unipointer;

}));


/***/ })
/******/ ]);