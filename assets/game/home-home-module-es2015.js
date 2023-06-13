(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "./node_modules/hammerjs/hammer.js":
/*!*****************************************!*\
  !*** ./node_modules/hammerjs/hammer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
        each(arg, context[fn], context);
        return true;
    }
    return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
    var i;

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function() {
        var e = new Error('get-stack-trace');
        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

        var log = window.console && (window.console.warn || window.console.log);
        if (log) {
            log.call(window.console, deprecationMessage, stack);
        }
        return method.apply(this, arguments);
    };
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;
if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
} else {
    assign = Object.assign;
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */
var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}, 'extend', 'Use `assign`.');

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        assign(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined : undefined, args);
    }
    return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
    return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
    });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
    while (node) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
        }
    };

    this.init();

}

Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
}

function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: now(),
        pointers: pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
    };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;

    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
        }

        // mouse must be down
        if (!this.pressed) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
        });
    }
});

var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;

    Input.apply(this, arguments);

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
    }
});

var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;

    Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
}

var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};

    Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function TouchMouseInput() {
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);

    this.primaryTouch = null;
    this.lastTouches = [];
}

inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
        }

        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
        if (isTouch) {
            recordTouches.call(this, inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
            return;
        }

        this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }
});

function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
        this.primaryTouch = eventData.changedPointers[0].identifier;
        setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        setLastTouch.call(this, eventData);
    }
}

function setLastTouch(eventData) {
    var touch = eventData.changedPointers[0];

    if (touch.identifier === this.primaryTouch) {
        var lastTouch = {x: touch.clientX, y: touch.clientY};
        this.lastTouches.push(lastTouch);
        var lts = this.lastTouches;
        var removeLastTouch = function() {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
                lts.splice(i, 1);
            }
        };
        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
}

function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
    for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
        }
    }
    return false;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
}

TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        if (hasNone) {
            //do not prevent defaults if this is a tap gesture

            var isTapPointer = input.pointers.length === 1;
            var isTapMovement = input.distance < 2;
            var isTapTouchTime = input.deltaTime < 250;

            if (isTapPointer && isTapMovement && isTapTouchTime) {
                return;
            }
        }

        if (hasPanX && hasPanY) {
            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
            return;
        }

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
    }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
        return false;
    }
    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});

    this.id = uniqueId();

    this.manager = null;

    // default is enable true
    this.options.enable = ifUndefined(this.options.enable, true);

    this.state = STATE_POSSIBLE;

    this.simultaneous = {};
    this.requireFail = [];
}

Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function(options) {
        assign(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

        var simultaneous = this.simultaneous;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
            self.manager.emit(event, input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
            emit(input.additionalEvent);
        }

        // panend and pancancel
        if (state >= STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
        var i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                return false;
            }
            i++;
        }
        return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
        }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
    if (state & STATE_CANCELLED) {
        return 'cancel';
    } else if (state & STATE_ENDED) {
        return 'end';
    } else if (state & STATE_CHANGED) {
        return 'move';
    } else if (state & STATE_BEGAN) {
        return 'start';
    }
    return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
        return 'down';
    } else if (direction == DIRECTION_UP) {
        return 'up';
    } else if (direction == DIRECTION_LEFT) {
        return 'left';
    } else if (direction == DIRECTION_RIGHT) {
        return 'right';
    }
    return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
    Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
                return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
                return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);

    this.pX = null;
    this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
    },

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {

        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);

        if (direction) {
            input.additionalEvent = this.options.event + direction;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'pinch',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
        if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            input.additionalEvent = this.options.event + inOut;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
    Recognizer.apply(this, arguments);

    this._timer = null;
    this._input = null;
}

inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
        event: 'press',
        pointers: 1,
        time: 251, // minimal time of the pointer to be pressed
        threshold: 9 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
            this.manager.emit(this.options.event + 'up', input);
        } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
        event: 'rotate',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
    },

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.offsetDirection &&
            input.distance > this.options.threshold &&
            input.maxPointers == this.options.pointers &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.offsetDirection);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
    }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
    Recognizer.apply(this, arguments);

    // previous time and center,
    // used for tap counting
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 9, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
        if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.7';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, {enable: false}],
        [PinchRecognizer, {enable: false}, ['rotate']],
        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
        [PressRecognizer]
    ],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});

    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(this.options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        assign(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }
        return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();
        return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        recognizer = this.get(recognizer);

        // let's make sure this recognizer exists
        if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);

            if (index !== -1) {
                recognizers.splice(index, 1);
                this.touchAction.update();
            }
        }

        return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function(events, handler) {
        if (events === undefined) {
            return;
        }
        if (handler === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        });
        return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function(events, handler) {
        if (events === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
        this.element && toggleCssProps(this, false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
        return;
    }
    var prop;
    each(manager.options.cssProps, function(value, name) {
        prop = prefixed(element.style, name);
        if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
        } else {
            element.style[prop] = manager.oldCssProps[prop] || '';
        }
    });
    if (!add) {
        manager.oldCssProps = {};
    }
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}

assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,

    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,

    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,

    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,

    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,

    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,

    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

// this prevents errors when Hammer is loaded in the presence of an AMD
//  style loader but by script tag, not by the loader.
var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
freeGlobal.Hammer = Hammer;

if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
        return Hammer;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {}

})(window, document, 'Hammer');


/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/chat/chat.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/chat/chat.component.html ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1>chat</h1>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (" <!-- <ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n     <img class=\"home_head\" src=\"assets/icon/home_toolbar_head.png\" width=\"75px\" align=\"middle\"/> -->\n    \n    <!-- <img class=\"gameinfo\" src=\"assets/icon/refresh.png\" width=\"75px\" align=\"middle\" width=\"40px\" (click)=\"doRefresh($event)\"/> -->\n    <!-- <img class=\"gameinfo\" src=\"assets/icon/about.png\" width=\"75px\" align=\"middle\" width=\"40px\" (click)=\"presentModal(true)\"/>     -->\n    <!-- <ion-icon name=\"md-paper-plane\" width=\"100px\"></ion-icon> -->\n  \n    <!-- </ion-toolbar>\n</ion-header>  -->\n\n\n\n\n  \n<!-- <ion-content color=\"secondary\" padding>\n  \n<div class=\"logo\" style=\"display: flex; width: 100%; margin: 0 auto; padding: 1%; text-align: center; background-color: transparent;\">\n  \n    <div style=\"width: 25%;\">\n    \n      <a  *ngIf=\"classReference.letter_bank_full_status==false\" (click)=\"openWordGameModal(0)\" ><img src=\"assets/icon/letterbank.png\"></a>\n      <a  (click)=\"openWordGameModal(0)\" *ngIf=\"classReference.letter_bank_full_status==true\" ><img src=\"assets/icon/letterbank.gif\"></a>\n  </div>\n  <div style=\"width: 25%;\">\n    \n    <a  *ngIf=\"classReference.letter_bank_full_status==false\" (click)=\"openWordGameModal(1)\" ><img src=\"assets/icon/wordbank.png\" ></a>\n    <a  (click)=\"openWordGameModal(1)\" *ngIf=\"classReference.letter_bank_full_status==true\" ><img src=\"assets/icon/wordbank.gif\"></a>\n  </div>\n  <div style=\"width: 25%; margin-top: 2%;\">\n    <a><img  src=\"assets/icon/rest_game.png\" (click)=\"presentModal(false)\"/></a>\n  </div>\n  </div>\n  \n  \n\n\n\n  \n\n \n          <div id=\"game-canvas\" style=\"padding-top: -15%;\"></div>\n  \n  \n  \n</ion-content> -->\n\n<ion-content>\n\n  <div style=\"width:100%;height: 100%;\" >\n\n  <div class=\"logo\" style=\"width: 100%;margin-left: 10%; padding: 0%; text-align: center; background-color: transparent;\">\n   \n    <div style=\"width: 25%;\">\n    \n      <a  *ngIf=\"classReference.letter_bank_full_status==false\" (click)=\"openWordGameModal(0)\" ><img src=\"assets/icon/letterbank.png\"></a>\n      <a  (click)=\"openWordGameModal(0)\" *ngIf=\"classReference.letter_bank_full_status==true\" ><img src=\"assets/icon/letterbank.gif\"></a>\n  </div>\n  <div style=\"width: 25%;\">\n    \n    <a  *ngIf=\"classReference.letter_bank_full_status==false\" (click)=\"openWordGameModal(1)\" ><img src=\"assets/icon/wordbank.png\" ></a>\n    <a  (click)=\"openWordGameModal(1)\" *ngIf=\"classReference.letter_bank_full_status==true\" ><img src=\"assets/icon/wordbank.gif\"></a>\n  </div>\n  \n  <div style=\"width: 25%; margin-top: 2%;\">\n    <a><img  src=\"assets/icon/rest_game.png\" (click)=\"presentModal(false)\"/></a>\n  </div>\n  \n  \n  </div>\n\n  \n\n\n\n  \n\n  \n  <div id=\"game-canvas\" style=\"margin-top: -19%;\"></div>\n  </div>\n  \n  \n\n\n</ion-content>\n\n\n\n <!-- <ion-footer class=\"footer\"> \n   <ion-toolbar  class=\"footer_toolbar\" color=\"primary\" (click)=\"presentModal(false)\">\n    <div>\n      <img class=\"up_arrow\" src=\"assets/icon/up-arrow.svg\"  height=\"20px\"  />\n      </div>\n      <div class=\"footer_para\"> \n      <ion-text color=\"tertiary\" class=\"total_write\"><p class=\"parafoot\">\n          <ion-text><ion-text *ngIf=\"classReference.cell_wallet>0\" style=\"font-weight: bold;\" >Bliss[{{classReference.cell_wallet}}]  </ion-text><b>{{classReference.postname}} : </b></ion-text><ion-text>{{classReference.postdesc}}</ion-text></p>\n      </ion-text>\n    </div>\n  </ion-toolbar>\n</ion-footer>   -->\n\n\n");

/***/ }),

/***/ "./src/app/chat/chat.component.scss":
/*!******************************************!*\
  !*** ./src/app/chat/chat.component.scss ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".message {\n  padding: 10px;\n  border-radius: 10px;\n  margin-bottom: 4px;\n  white-space: pre-wrap;\n}\n\n.my-message {\n  background: var(--ion-color-tertiary);\n  color: #fff;\n}\n\n.other-message {\n  background: var(--ion-color-secondary);\n  color: #fff;\n}\n\n.time {\n  color: #dfdfdf;\n  float: right;\n  font-size: small;\n}\n\n.message-input {\n  margin-top: 0px;\n  border: 1px solid var(--ion-color-medium);\n  border-radius: 10px;\n  background: #fff;\n}\n\n.msg-btn {\n  --padding-start: 0.0em;\n  --padding-end: 0.0em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY2hhdC9DOlxcd2ViXFxjYW1lcmFhcHAxL3NyY1xcYXBwXFxjaGF0XFxjaGF0LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jaGF0L2NoYXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLHFCQUFBO0FDQ0o7O0FERUU7RUFDRSxxQ0FBQTtFQUNBLFdBQUE7QUNDSjs7QURFRTtFQUNFLHNDQUFBO0VBQ0EsV0FBQTtBQ0NKOztBREVFO0VBQ0UsY0FBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQ0NKOztBREVFO0VBQ0UsZUFBQTtFQUNBLHlDQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtBQ0NKOztBREVFO0VBQ0Usc0JBQUE7RUFDQSxvQkFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvY2hhdC9jaGF0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1lc3NhZ2Uge1xyXG4gICAgcGFkZGluZzogMTBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA0cHg7XHJcbiAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XHJcbiAgfVxyXG4gICBcclxuICAubXktbWVzc2FnZSB7XHJcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItdGVydGlhcnkpO1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgfVxyXG4gICBcclxuICAub3RoZXItbWVzc2FnZSB7XHJcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5KTtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gIH1cclxuICAgXHJcbiAgLnRpbWUge1xyXG4gICAgY29sb3I6ICNkZmRmZGY7XHJcbiAgICBmbG9hdDogcmlnaHQ7XHJcbiAgICBmb250LXNpemU6IHNtYWxsO1xyXG4gIH1cclxuICAgXHJcbiAgLm1lc3NhZ2UtaW5wdXQge1xyXG4gICAgbWFyZ2luLXRvcDogMHB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcclxuICB9XHJcbiAgIFxyXG4gIC5tc2ctYnRuIHtcclxuICAgIC0tcGFkZGluZy1zdGFydDogMC4wZW07XHJcbiAgICAtLXBhZGRpbmctZW5kOiAwLjBlbTtcclxuICB9XHJcblxyXG4gIC8vIC5saXN0LW1haW57XHJcbiAgICBcclxuICAvLyB9IiwiLm1lc3NhZ2Uge1xuICBwYWRkaW5nOiAxMHB4O1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbn1cblxuLm15LW1lc3NhZ2Uge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItdGVydGlhcnkpO1xuICBjb2xvcjogI2ZmZjtcbn1cblxuLm90aGVyLW1lc3NhZ2Uge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5KTtcbiAgY29sb3I6ICNmZmY7XG59XG5cbi50aW1lIHtcbiAgY29sb3I6ICNkZmRmZGY7XG4gIGZsb2F0OiByaWdodDtcbiAgZm9udC1zaXplOiBzbWFsbDtcbn1cblxuLm1lc3NhZ2UtaW5wdXQge1xuICBtYXJnaW4tdG9wOiAwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xufVxuXG4ubXNnLWJ0biB7XG4gIC0tcGFkZGluZy1zdGFydDogMC4wZW07XG4gIC0tcGFkZGluZy1lbmQ6IDAuMGVtO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/chat/chat.component.ts":
/*!****************************************!*\
  !*** ./src/app/chat/chat.component.ts ***!
  \****************************************/
/*! exports provided: ChatComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatComponent", function() { return ChatComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var ngx_socket_io__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-socket-io */ "./node_modules/ngx-socket-io/fesm2015/ngx-socket-io.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_speech_recognition_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/speech-recognition/ngx */ "./node_modules/@ionic-native/speech-recognition/ngx/index.js");





let ChatComponent = class ChatComponent {
    constructor(socket, toastCtrl, plt, speechrecog) {
        this.socket = socket;
        this.toastCtrl = toastCtrl;
        this.plt = plt;
        this.speechrecog = speechrecog;
        this.message = '';
        this.messages = [];
        this.currentUser = '';
        this.roomer = '';
        this.rooms = [];
        this.currentroom = '';
        this.textBox = false;
        this.isRecording = false;
    }
    ngOnInit() {
        this.socket.connect();
        let name = `user-${new Date().getTime()}`;
        this.currentUser = name;
        this.socket.emit('set-name', name);
        this.socket.fromEvent('users-changed').subscribe(data => {
            let user = data['user'];
            if (data['event'] === 'left') {
                this.showToast('User left: ' + user);
            }
            else {
                this.showToast('User joined: ' + user);
            }
        });
        this.socket.fromEvent('message').subscribe(message => {
            this.messages.push(message);
        });
        this.socket.fromEvent('create-room-ack').subscribe(room => {
            console.log('it is working');
            this.roomdet = room;
            if (this.roomdet.roomdesc != "NO") {
                this.rooms.push(this.roomdet.roomdesc);
                this.showToast("room is created");
                this.textBox = !this.textBox;
            }
            else {
                this.showToast(this.roomdet.roomdesc);
                this.textBox = !this.textBox;
            }
        });
        this.socket.fromEvent('send-message-room-ack').subscribe(message => {
            this.msgforoom = message;
            console.log("ack recieved for room message");
            if (this.msgforoom.msg != "NO") {
                console.log("Room exists");
                this.messages.push(this.msgforoom);
                this.showToast("Message in roomid-" + this.msgforoom.room);
            }
            else {
                console.log("Room doesn't exists");
                this.showToast("No Such room exists");
            }
        });
    }
    startListening() {
        console.log("listening listening");
        let options = {
            language: 'en-US'
        };
        this.speechrecog.startListening().subscribe(matches => {
            this.showToast("Recording....");
            this.matches = matches;
        });
        this.isRecording = true;
    }
    stopListening() {
        console.log("Stop listening");
        this.speechrecog.stopListening().then(() => {
            this.showToast("Recording Stopped");
        });
    }
    getPermission() {
        console.log("getting permission");
        this.speechrecog.hasPermission().then((hasPermission) => {
            console.log(hasPermission);
            if (!hasPermission) {
                this.speechrecog.requestPermission();
            }
        });
    }
    sendMessage() {
        console.log("room message is sent");
        this.socket.emit('send-message-room', { text: this.message, room: this.currentroom });
        this.message = '';
    }
    createRoom() {
        this.socket.emit('create-room', this.roomer);
        this.roomer = '';
    }
    ionViewWillLeave() {
        this.socket.disconnect();
    }
    showToast(msg) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let toast = yield this.toastCtrl.create({
                message: msg,
                position: 'top',
                duration: 2000
            });
            toast.present();
        });
    }
    changeRoom(roomid) {
        this.currentroom = roomid;
    }
    openTextbox() {
        this.textBox = !this.textBox;
    }
    getMatch(textspeech) {
        this.message = textspeech;
        this.matches.splice(0, this.matches.length);
        this.isRecording = false;
    }
};
ChatComponent.ctorParameters = () => [
    { type: ngx_socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"] },
    { type: _ionic_native_speech_recognition_ngx__WEBPACK_IMPORTED_MODULE_4__["SpeechRecognition"] }
];
ChatComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-chat',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./chat.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/chat/chat.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./chat.component.scss */ "./src/app/chat/chat.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngx_socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"], _ionic_native_speech_recognition_ngx__WEBPACK_IMPORTED_MODULE_4__["SpeechRecognition"]])
], ChatComponent);



/***/ }),

/***/ "./src/app/home/home.module.ts":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _modal_modal_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modal/modal.page */ "./src/app/modal/modal.page.ts");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./home.page */ "./src/app/home/home.page.ts");
/* harmony import */ var _chat_chat_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../chat/chat.component */ "./src/app/chat/chat.component.ts");









let HomePageModule = class HomePageModule {
};
HomePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild([
                {
                    path: '',
                    component: _home_page__WEBPACK_IMPORTED_MODULE_7__["HomePage"]
                }
            ]),
        ],
        declarations: [_home_page__WEBPACK_IMPORTED_MODULE_7__["HomePage"], _modal_modal_page__WEBPACK_IMPORTED_MODULE_6__["ModalPage"], _chat_chat_component__WEBPACK_IMPORTED_MODULE_8__["ChatComponent"]],
        entryComponents: [_modal_modal_page__WEBPACK_IMPORTED_MODULE_6__["ModalPage"]]
    })
], HomePageModule);



/***/ }),

/***/ "./src/app/home/home.page.scss":
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".welcome-card img {\n  max-height: 35vh;\n  overflow: hidden;\n}\n\n.gamecanvas {\n  border: 3px solid black;\n}\n\n.parafoot {\n  position: fixed;\n  font-size: 0.9rem;\n  padding-left: 0.75rem;\n  padding-right: 0.85rem;\n  padding-top: 0.2rem;\n  top: 2px;\n}\n\n.home_head {\n  font-size: 0.9rem;\n  padding-top: 0.1rem;\n  padding-left: 0.75rem;\n}\n\n.gameinfo {\n  font-size: 0.9rem;\n  float: right;\n  padding-right: 0.75rem;\n}\n\n.gamerefresh {\n  font-size: 0.9rem;\n  float: right;\n  padding-right: 0.75rem;\n}\n\n.slider-slide {\n  min-height: 200px;\n}\n\n.total_write {\n  padding-bottom: 50px;\n}\n\n.up_arrow {\n  position: relative;\n  padding-left: 25.45rem;\n  padding-top: 0.1rem;\n  bottom: 19px;\n  height: 60;\n  width: 120;\n}\n\n.footer_toolbar {\n  height: 100%;\n}\n\n.footer {\n  height: 10%;\n}\n\n.dice {\n  align-items: center;\n  display: grid;\n  grid-gap: 2rem;\n  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));\n  grid-template-rows: auto;\n  justify-items: center;\n  padding: 2rem;\n  perspective: 600px;\n}\n\n.die-list {\n  display: grid;\n  grid-template-columns: 1fr;\n  grid-template-rows: 1fr;\n  height: 6rem;\n  list-style-type: none;\n  transform-style: preserve-3d;\n  width: 6rem;\n}\n\n.even-roll {\n  transition: transform 1.5s ease-out;\n}\n\n.odd-roll {\n  transition: transform 1.25s ease-out;\n}\n\n.die-item {\n  background-color: #ff5f4c;\n  box-shadow: inset -0.35rem 0.35rem 0.75rem rgba(0, 0, 0, 0), inset 0.5rem -0.25rem 0.5rem rgba(0, 0, 0, 0.15);\n  display: grid;\n  grid-column: 1;\n  grid-row: 1;\n  grid-template-areas: \"one two three\" \"four five six\" \"seven eight nine\";\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(3, 1fr);\n  height: 100%;\n  padding: 1rem;\n  width: 100%;\n}\n\n.dot {\n  align-self: center;\n  background-color: white;\n  border-radius: 50%;\n  box-shadow: inset -0.15rem 0.15rem 0.25rem rgba(0, 0, 0, 0.5);\n  display: block;\n  height: 1.25rem;\n  justify-self: center;\n  width: 1.25rem;\n}\n\n.even-roll[data-roll=\"1\"] {\n  transform: rotateX(360deg) rotateY(720deg) rotateZ(360deg);\n}\n\n.even-roll[data-roll=\"2\"] {\n  transform: rotateX(450deg) rotateY(720deg) rotateZ(360deg);\n}\n\n.even-roll[data-roll=\"3\"] {\n  transform: rotateX(360deg) rotateY(630deg) rotateZ(360deg);\n}\n\n.even-roll[data-roll=\"4\"] {\n  transform: rotateX(360deg) rotateY(810deg) rotateZ(360deg);\n}\n\n.even-roll[data-roll=\"5\"] {\n  transform: rotateX(270deg) rotateY(720deg) rotateZ(360deg);\n}\n\n.even-roll[data-roll=\"6\"] {\n  transform: rotateX(360deg) rotateY(900deg) rotateZ(360deg);\n}\n\n.odd-roll[data-roll=\"1\"] {\n  transform: rotateX(-360deg) rotateY(-720deg) rotateZ(-360deg);\n}\n\n.odd-roll[data-roll=\"2\"] {\n  transform: rotateX(-270deg) rotateY(-720deg) rotateZ(-360deg);\n}\n\n.odd-roll[data-roll=\"3\"] {\n  transform: rotateX(-360deg) rotateY(-810deg) rotateZ(-360deg);\n}\n\n.odd-roll[data-roll=\"4\"] {\n  transform: rotateX(-360deg) rotateY(-630deg) rotateZ(-360deg);\n}\n\n.odd-roll[data-roll=\"5\"] {\n  transform: rotateX(-450deg) rotateY(-720deg) rotateZ(-360deg);\n}\n\n.odd-roll[data-roll=\"6\"] {\n  transform: rotateX(-360deg) rotateY(-900deg) rotateZ(-360deg);\n}\n\n[data-side=\"1\"] {\n  transform: rotate3d(0, 0, 0, 90deg) translateZ(4rem);\n}\n\n[data-side=\"2\"] {\n  transform: rotate3d(-1, 0, 0, 90deg) translateZ(4rem);\n}\n\n[data-side=\"3\"] {\n  transform: rotate3d(0, 1, 0, 90deg) translateZ(4rem);\n}\n\n[data-side=\"4\"] {\n  transform: rotate3d(0, -1, 0, 90deg) translateZ(4rem);\n}\n\n[data-side=\"5\"] {\n  transform: rotate3d(1, 0, 0, 90deg) translateZ(4rem);\n}\n\n[data-side=\"6\"] {\n  transform: rotate3d(1, 0, 0, 180deg) translateZ(4rem);\n}\n\n[data-side=\"1\"] .dot:nth-of-type(1) {\n  grid-area: five;\n}\n\n[data-side=\"2\"] .dot:nth-of-type(1) {\n  grid-area: one;\n}\n\n[data-side=\"2\"] .dot:nth-of-type(2) {\n  grid-area: nine;\n}\n\n[data-side=\"3\"] .dot:nth-of-type(1) {\n  grid-area: one;\n}\n\n[data-side=\"3\"] .dot:nth-of-type(2) {\n  grid-area: five;\n}\n\n[data-side=\"3\"] .dot:nth-of-type(3) {\n  grid-area: nine;\n}\n\n[data-side=\"4\"] .dot:nth-of-type(1) {\n  grid-area: one;\n}\n\n[data-side=\"4\"] .dot:nth-of-type(2) {\n  grid-area: three;\n}\n\n[data-side=\"4\"] .dot:nth-of-type(3) {\n  grid-area: seven;\n}\n\n[data-side=\"4\"] .dot:nth-of-type(4) {\n  grid-area: nine;\n}\n\n[data-side=\"5\"] .dot:nth-of-type(1) {\n  grid-area: one;\n}\n\n[data-side=\"5\"] .dot:nth-of-type(2) {\n  grid-area: three;\n}\n\n[data-side=\"5\"] .dot:nth-of-type(3) {\n  grid-area: five;\n}\n\n[data-side=\"5\"] .dot:nth-of-type(4) {\n  grid-area: seven;\n}\n\n[data-side=\"5\"] .dot:nth-of-type(5) {\n  grid-area: nine;\n}\n\n[data-side=\"6\"] .dot:nth-of-type(1) {\n  grid-area: one;\n}\n\n[data-side=\"6\"] .dot:nth-of-type(2) {\n  grid-area: three;\n}\n\n[data-side=\"6\"] .dot:nth-of-type(3) {\n  grid-area: four;\n}\n\n[data-side=\"6\"] .dot:nth-of-type(4) {\n  grid-area: six;\n}\n\n[data-side=\"6\"] .dot:nth-of-type(5) {\n  grid-area: seven;\n}\n\n[data-side=\"6\"] .dot:nth-of-type(6) {\n  grid-area: nine;\n}\n\n.logo img {\n  width: 20%;\n  padding: 2%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS9DOlxcd2ViXFxjYW1lcmFhcHAxL3NyY1xcYXBwXFxob21lXFxob21lLnBhZ2Uuc2NzcyIsInNyYy9hcHAvaG9tZS9ob21lLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0VBQ0EsZ0JBQUE7QUNDRjs7QURDQTtFQUNBLHVCQUFBO0FDRUE7O0FEQUE7RUFDQyxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxxQkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0FDR0Q7O0FEREE7RUFDQyxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7QUNJRDs7QUREQTtFQUNDLGlCQUFBO0VBQ0EsWUFBQTtFQUNBLHNCQUFBO0FDSUQ7O0FERkE7RUFDQyxpQkFBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtBQ0tEOztBRENBO0VBQ0UsaUJBQUE7QUNFRjs7QURBQTtFQUNDLG9CQUFBO0FDR0Q7O0FEQUE7RUFDQyxrQkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtFQUNBLFVBQUE7QUNHRDs7QUREQTtFQUNDLFlBQUE7QUNJRDs7QURGQTtFQUNDLFdBQUE7QUNLRDs7QURIQTtFQUNDLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLGNBQUE7RUFDQSwwREFBQTtFQUNBLHdCQUFBO0VBQ0EscUJBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7QUNNRDs7QURKRTtFQUNELGFBQUE7RUFDQSwwQkFBQTtFQUNBLHVCQUFBO0VBQ0EsWUFBQTtFQUNBLHFCQUFBO0VBQ0EsNEJBQUE7RUFDQSxXQUFBO0FDT0Q7O0FETEU7RUFDRCxtQ0FBQTtBQ1FEOztBRE5FO0VBQ0Qsb0NBQUE7QUNTRDs7QURQRTtFQUNELHlCQUFBO0VBQ0EsNkdBQUE7RUFFQSxhQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7RUFDQSx1RUFDRTtFQUdGLHFDQUFBO0VBQ0Esa0NBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLFdBQUE7QUNNRDs7QURKRTtFQUNELGtCQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtFQUNBLDZEQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxvQkFBQTtFQUNBLGNBQUE7QUNPRDs7QURMRTtFQUNELDBEQUFBO0FDUUQ7O0FETkU7RUFDRCwwREFBQTtBQ1NEOztBRFBFO0VBQ0QsMERBQUE7QUNVRDs7QURSRTtFQUNELDBEQUFBO0FDV0Q7O0FEVEU7RUFDRCwwREFBQTtBQ1lEOztBRFZFO0VBQ0QsMERBQUE7QUNhRDs7QURYRTtFQUNELDZEQUFBO0FDY0Q7O0FEWkU7RUFDRCw2REFBQTtBQ2VEOztBRGJFO0VBQ0QsNkRBQUE7QUNnQkQ7O0FEZEU7RUFDRCw2REFBQTtBQ2lCRDs7QURmRTtFQUNELDZEQUFBO0FDa0JEOztBRGhCRTtFQUNELDZEQUFBO0FDbUJEOztBRGpCRTtFQUNELG9EQUFBO0FDb0JEOztBRGxCRTtFQUNELHFEQUFBO0FDcUJEOztBRG5CRTtFQUNELG9EQUFBO0FDc0JEOztBRHBCRTtFQUNELHFEQUFBO0FDdUJEOztBRHJCRTtFQUNELG9EQUFBO0FDd0JEOztBRHRCRTtFQUNELHFEQUFBO0FDeUJEOztBRHZCRTtFQUNELGVBQUE7QUMwQkQ7O0FEeEJFO0VBQ0QsY0FBQTtBQzJCRDs7QUR6QkU7RUFDRCxlQUFBO0FDNEJEOztBRDFCRTtFQUNELGNBQUE7QUM2QkQ7O0FEM0JFO0VBQ0QsZUFBQTtBQzhCRDs7QUQ1QkU7RUFDRCxlQUFBO0FDK0JEOztBRDdCRTtFQUNELGNBQUE7QUNnQ0Q7O0FEOUJFO0VBQ0QsZ0JBQUE7QUNpQ0Q7O0FEL0JFO0VBQ0QsZ0JBQUE7QUNrQ0Q7O0FEaENFO0VBQ0QsZUFBQTtBQ21DRDs7QURqQ0U7RUFDRCxjQUFBO0FDb0NEOztBRGxDRTtFQUNELGdCQUFBO0FDcUNEOztBRG5DRTtFQUNELGVBQUE7QUNzQ0Q7O0FEcENFO0VBQ0QsZ0JBQUE7QUN1Q0Q7O0FEckNFO0VBQ0QsZUFBQTtBQ3dDRDs7QUR0Q0U7RUFDRCxjQUFBO0FDeUNEOztBRHZDRTtFQUNELGdCQUFBO0FDMENEOztBRHhDRTtFQUNELGVBQUE7QUMyQ0Q7O0FEekNFO0VBQ0QsY0FBQTtBQzRDRDs7QUQxQ0U7RUFDRCxnQkFBQTtBQzZDRDs7QUQzQ0U7RUFDRCxlQUFBO0FDOENEOztBRDNDQTtFQUFVLFVBQUE7RUFBWSxXQUFBO0FDZ0R0QiIsImZpbGUiOiJzcmMvYXBwL2hvbWUvaG9tZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIud2VsY29tZS1jYXJkIGltZyB7XG4gIG1heC1oZWlnaHQ6IDM1dmg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4uZ2FtZWNhbnZhc3tcbmJvcmRlcjozcHggc29saWQgYmxhY2s7XG59XG4ucGFyYWZvb3R7XG5cdHBvc2l0aW9uOmZpeGVkO1xuXHRmb250LXNpemU6IDAuOXJlbTtcblx0cGFkZGluZy1sZWZ0OiAwLjc1cmVtO1xuXHRwYWRkaW5nLXJpZ2h0OiAwLjg1cmVtO1xuXHRwYWRkaW5nLXRvcDogMC4ycmVtO1xuXHR0b3A6MnB4O1xufVxuLmhvbWVfaGVhZHtcblx0Zm9udC1zaXplOiAwLjlyZW07XG5cdHBhZGRpbmctdG9wOiAwLjFyZW07XG5cdHBhZGRpbmctbGVmdDogMC43NXJlbTtcbn1cblxuLmdhbWVpbmZve1xuXHRmb250LXNpemU6IDAuOXJlbTtcblx0ZmxvYXQ6cmlnaHQ7XG5cdHBhZGRpbmctcmlnaHQ6IDAuNzVyZW07XG59XG4uZ2FtZXJlZnJlc2h7XG5cdGZvbnQtc2l6ZTogMC45cmVtO1xuXHRmbG9hdDpyaWdodDtcblx0cGFkZGluZy1yaWdodDogMC43NXJlbTtcbn1cbi8vIC5wdWxsZG93bntcbi8vIFx0dGV4dC1hbGlnbjogY2VudGVyO1xuLy8gfVxuXG4uc2xpZGVyLXNsaWRlIHtcbiAgbWluLWhlaWdodDogMjAwcHg7XG59XG4udG90YWxfd3JpdGV7XG5cdHBhZGRpbmctYm90dG9tOjUwcHg7XG59XG5cbi51cF9hcnJvd3tcblx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRwYWRkaW5nLWxlZnQ6IDI1LjQ1cmVtO1xuXHRwYWRkaW5nLXRvcDogMC4xcmVtO1xuXHRib3R0b206MTlweDtcblx0aGVpZ2h0OjYwOyBcblx0d2lkdGg6MTIwO1xufVxuLmZvb3Rlcl90b29sYmFye1xuXHRoZWlnaHQ6IDEwMCU7XG59XG4uZm9vdGVye1xuXHRoZWlnaHQ6IDEwJTtcdFxufVxuLmRpY2Uge1xuXHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRkaXNwbGF5OiBncmlkO1xuXHRncmlkLWdhcDogMnJlbTtcblx0Z3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCg4cmVtLCAxZnIpKTtcblx0Z3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvO1xuXHRqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG5cdHBhZGRpbmc6IDJyZW07XG5cdHBlcnNwZWN0aXZlOiA2MDBweDtcbiAgfVxuICAuZGllLWxpc3Qge1xuXHRkaXNwbGF5OiBncmlkO1xuXHRncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcblx0Z3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnI7XG5cdGhlaWdodDogNnJlbTtcblx0bGlzdC1zdHlsZS10eXBlOiBub25lO1xuXHR0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xuXHR3aWR0aDogNnJlbTtcbiAgfVxuICAuZXZlbi1yb2xsIHtcblx0dHJhbnNpdGlvbjogdHJhbnNmb3JtIDEuNXMgZWFzZS1vdXQ7XG4gIH1cbiAgLm9kZC1yb2xsIHtcblx0dHJhbnNpdGlvbjogdHJhbnNmb3JtIDEuMjVzIGVhc2Utb3V0O1xuICB9XG4gIC5kaWUtaXRlbSB7XG5cdGJhY2tncm91bmQtY29sb3I6ICNmZjVmNGM7XG5cdGJveC1zaGFkb3c6IGluc2V0IC0wLjM1cmVtIDAuMzVyZW0gMC43NXJlbSByZ2JhKDAsIDAsIDAsIDApLFxuXHQgIGluc2V0IDAuNXJlbSAtMC4yNXJlbSAwLjVyZW0gcmdiYSgwLCAwLCAwLCAwLjE1KTtcblx0ZGlzcGxheTogZ3JpZDtcblx0Z3JpZC1jb2x1bW46IDE7XG5cdGdyaWQtcm93OiAxO1xuXHRncmlkLXRlbXBsYXRlLWFyZWFzOlxuXHQgIFwib25lIHR3byB0aHJlZVwiXG5cdCAgXCJmb3VyIGZpdmUgc2l4XCJcblx0ICBcInNldmVuIGVpZ2h0IG5pbmVcIjtcblx0Z3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcblx0Z3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMywgMWZyKTtcblx0aGVpZ2h0OiAxMDAlO1xuXHRwYWRkaW5nOiAxcmVtO1xuXHR3aWR0aDogMTAwJTtcbiAgfVxuICAuZG90IHtcblx0YWxpZ24tc2VsZjogY2VudGVyO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcblx0Ym9yZGVyLXJhZGl1czogNTAlO1xuXHRib3gtc2hhZG93OiBpbnNldCAtMC4xNXJlbSAwLjE1cmVtIDAuMjVyZW0gcmdiYSgwLCAwLCAwLCAwLjUpO1xuXHRkaXNwbGF5OiBibG9jaztcblx0aGVpZ2h0OiAxLjI1cmVtO1xuXHRqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcblx0d2lkdGg6IDEuMjVyZW07XG4gIH1cbiAgLmV2ZW4tcm9sbFtkYXRhLXJvbGw9XCIxXCJdIHtcblx0dHJhbnNmb3JtOiByb3RhdGVYKDM2MGRlZykgcm90YXRlWSg3MjBkZWcpIHJvdGF0ZVooMzYwZGVnKTtcbiAgfVxuICAuZXZlbi1yb2xsW2RhdGEtcm9sbD1cIjJcIl0ge1xuXHR0cmFuc2Zvcm06IHJvdGF0ZVgoNDUwZGVnKSByb3RhdGVZKDcyMGRlZykgcm90YXRlWigzNjBkZWcpO1xuICB9XG4gIC5ldmVuLXJvbGxbZGF0YS1yb2xsPVwiM1wiXSB7XG5cdHRyYW5zZm9ybTogcm90YXRlWCgzNjBkZWcpIHJvdGF0ZVkoNjMwZGVnKSByb3RhdGVaKDM2MGRlZyk7XG4gIH1cbiAgLmV2ZW4tcm9sbFtkYXRhLXJvbGw9XCI0XCJdIHtcblx0dHJhbnNmb3JtOiByb3RhdGVYKDM2MGRlZykgcm90YXRlWSg4MTBkZWcpIHJvdGF0ZVooMzYwZGVnKTtcbiAgfVxuICAuZXZlbi1yb2xsW2RhdGEtcm9sbD1cIjVcIl0ge1xuXHR0cmFuc2Zvcm06IHJvdGF0ZVgoMjcwZGVnKSByb3RhdGVZKDcyMGRlZykgcm90YXRlWigzNjBkZWcpO1xuICB9XG4gIC5ldmVuLXJvbGxbZGF0YS1yb2xsPVwiNlwiXSB7XG5cdHRyYW5zZm9ybTogcm90YXRlWCgzNjBkZWcpIHJvdGF0ZVkoOTAwZGVnKSByb3RhdGVaKDM2MGRlZyk7XG4gIH1cbiAgLm9kZC1yb2xsW2RhdGEtcm9sbD1cIjFcIl0ge1xuXHR0cmFuc2Zvcm06IHJvdGF0ZVgoLTM2MGRlZykgcm90YXRlWSgtNzIwZGVnKSByb3RhdGVaKC0zNjBkZWcpO1xuICB9XG4gIC5vZGQtcm9sbFtkYXRhLXJvbGw9XCIyXCJdIHtcblx0dHJhbnNmb3JtOiByb3RhdGVYKC0yNzBkZWcpIHJvdGF0ZVkoLTcyMGRlZykgcm90YXRlWigtMzYwZGVnKTtcbiAgfVxuICAub2RkLXJvbGxbZGF0YS1yb2xsPVwiM1wiXSB7XG5cdHRyYW5zZm9ybTogcm90YXRlWCgtMzYwZGVnKSByb3RhdGVZKC04MTBkZWcpIHJvdGF0ZVooLTM2MGRlZyk7XG4gIH1cbiAgLm9kZC1yb2xsW2RhdGEtcm9sbD1cIjRcIl0ge1xuXHR0cmFuc2Zvcm06IHJvdGF0ZVgoLTM2MGRlZykgcm90YXRlWSgtNjMwZGVnKSByb3RhdGVaKC0zNjBkZWcpO1xuICB9XG4gIC5vZGQtcm9sbFtkYXRhLXJvbGw9XCI1XCJdIHtcblx0dHJhbnNmb3JtOiByb3RhdGVYKC00NTBkZWcpIHJvdGF0ZVkoLTcyMGRlZykgcm90YXRlWigtMzYwZGVnKTtcbiAgfVxuICAub2RkLXJvbGxbZGF0YS1yb2xsPVwiNlwiXSB7XG5cdHRyYW5zZm9ybTogcm90YXRlWCgtMzYwZGVnKSByb3RhdGVZKC05MDBkZWcpIHJvdGF0ZVooLTM2MGRlZyk7XG4gIH1cbiAgW2RhdGEtc2lkZT1cIjFcIl0ge1xuXHR0cmFuc2Zvcm06IHJvdGF0ZTNkKDAsIDAsIDAsIDkwZGVnKSB0cmFuc2xhdGVaKDRyZW0pO1xuICB9XG4gIFtkYXRhLXNpZGU9XCIyXCJdIHtcblx0dHJhbnNmb3JtOiByb3RhdGUzZCgtMSwgMCwgMCwgOTBkZWcpIHRyYW5zbGF0ZVooNHJlbSk7XG4gIH1cbiAgW2RhdGEtc2lkZT1cIjNcIl0ge1xuXHR0cmFuc2Zvcm06IHJvdGF0ZTNkKDAsIDEsIDAsIDkwZGVnKSB0cmFuc2xhdGVaKDRyZW0pO1xuICB9XG4gIFtkYXRhLXNpZGU9XCI0XCJdIHtcblx0dHJhbnNmb3JtOiByb3RhdGUzZCgwLCAtMSwgMCwgOTBkZWcpIHRyYW5zbGF0ZVooNHJlbSk7XG4gIH1cbiAgW2RhdGEtc2lkZT1cIjVcIl0ge1xuXHR0cmFuc2Zvcm06IHJvdGF0ZTNkKDEsIDAsIDAsIDkwZGVnKSB0cmFuc2xhdGVaKDRyZW0pO1xuICB9XG4gIFtkYXRhLXNpZGU9XCI2XCJdIHtcblx0dHJhbnNmb3JtOiByb3RhdGUzZCgxLCAwLCAwLCAxODBkZWcpIHRyYW5zbGF0ZVooNHJlbSk7XG4gIH1cbiAgW2RhdGEtc2lkZT1cIjFcIl0gLmRvdDpudGgtb2YtdHlwZSgxKSB7XG5cdGdyaWQtYXJlYTogZml2ZTtcbiAgfVxuICBbZGF0YS1zaWRlPVwiMlwiXSAuZG90Om50aC1vZi10eXBlKDEpIHtcblx0Z3JpZC1hcmVhOiBvbmU7XG4gIH1cbiAgW2RhdGEtc2lkZT1cIjJcIl0gLmRvdDpudGgtb2YtdHlwZSgyKSB7XG5cdGdyaWQtYXJlYTogbmluZTtcbiAgfVxuICBbZGF0YS1zaWRlPVwiM1wiXSAuZG90Om50aC1vZi10eXBlKDEpIHtcblx0Z3JpZC1hcmVhOiBvbmU7XG4gIH1cbiAgW2RhdGEtc2lkZT1cIjNcIl0gLmRvdDpudGgtb2YtdHlwZSgyKSB7XG5cdGdyaWQtYXJlYTogZml2ZTtcbiAgfVxuICBbZGF0YS1zaWRlPVwiM1wiXSAuZG90Om50aC1vZi10eXBlKDMpIHtcblx0Z3JpZC1hcmVhOiBuaW5lO1xuICB9XG4gIFtkYXRhLXNpZGU9XCI0XCJdIC5kb3Q6bnRoLW9mLXR5cGUoMSkge1xuXHRncmlkLWFyZWE6IG9uZTtcbiAgfVxuICBbZGF0YS1zaWRlPVwiNFwiXSAuZG90Om50aC1vZi10eXBlKDIpIHtcblx0Z3JpZC1hcmVhOiB0aHJlZTtcbiAgfVxuICBbZGF0YS1zaWRlPVwiNFwiXSAuZG90Om50aC1vZi10eXBlKDMpIHtcblx0Z3JpZC1hcmVhOiBzZXZlbjtcbiAgfVxuICBbZGF0YS1zaWRlPVwiNFwiXSAuZG90Om50aC1vZi10eXBlKDQpIHtcblx0Z3JpZC1hcmVhOiBuaW5lO1xuICB9XG4gIFtkYXRhLXNpZGU9XCI1XCJdIC5kb3Q6bnRoLW9mLXR5cGUoMSkge1xuXHRncmlkLWFyZWE6IG9uZTtcbiAgfVxuICBbZGF0YS1zaWRlPVwiNVwiXSAuZG90Om50aC1vZi10eXBlKDIpIHtcblx0Z3JpZC1hcmVhOiB0aHJlZTtcbiAgfVxuICBbZGF0YS1zaWRlPVwiNVwiXSAuZG90Om50aC1vZi10eXBlKDMpIHtcblx0Z3JpZC1hcmVhOiBmaXZlO1xuICB9XG4gIFtkYXRhLXNpZGU9XCI1XCJdIC5kb3Q6bnRoLW9mLXR5cGUoNCkge1xuXHRncmlkLWFyZWE6IHNldmVuO1xuICB9XG4gIFtkYXRhLXNpZGU9XCI1XCJdIC5kb3Q6bnRoLW9mLXR5cGUoNSkge1xuXHRncmlkLWFyZWE6IG5pbmU7XG4gIH1cbiAgW2RhdGEtc2lkZT1cIjZcIl0gLmRvdDpudGgtb2YtdHlwZSgxKSB7XG5cdGdyaWQtYXJlYTogb25lO1xuICB9XG4gIFtkYXRhLXNpZGU9XCI2XCJdIC5kb3Q6bnRoLW9mLXR5cGUoMikge1xuXHRncmlkLWFyZWE6IHRocmVlO1xuICB9XG4gIFtkYXRhLXNpZGU9XCI2XCJdIC5kb3Q6bnRoLW9mLXR5cGUoMykge1xuXHRncmlkLWFyZWE6IGZvdXI7XG4gIH1cbiAgW2RhdGEtc2lkZT1cIjZcIl0gLmRvdDpudGgtb2YtdHlwZSg0KSB7XG5cdGdyaWQtYXJlYTogc2l4O1xuICB9XG4gIFtkYXRhLXNpZGU9XCI2XCJdIC5kb3Q6bnRoLW9mLXR5cGUoNSkge1xuXHRncmlkLWFyZWE6IHNldmVuO1xuICB9XG4gIFtkYXRhLXNpZGU9XCI2XCJdIC5kb3Q6bnRoLW9mLXR5cGUoNikge1xuXHRncmlkLWFyZWE6IG5pbmU7XG4gIH1cblxuLmxvZ28gaW1ne3dpZHRoOiAyMCU7IHBhZGRpbmc6IDIlO31cblxuXG4vLyAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3MDBweCl7XG5cbiBcblxuLy8gIH1cblxuLy8gIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNTAwcHgpe1xuXG4vLyAgLmxvZ28gaW1ne3dpZHRoOiA0MCU7fVxuXG4vLyAgfVxuXG4gLy8ubG9nbyBpbWd7d2lkdGg6IDEwMCU7IHBhZGRpbmc6IDIlO31cblxuXG4vLyBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDcwMHB4KXtcblxuLy8gLmxvZ28gaW1ne3dpZHRoOiAlO31cblxuLy8gfVxuXG4vLyBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDUwMHB4KXtcblxuLy8gLmxvZ28gaW1ne3dpZHRoOiA0MCU7fVxuXG4vLyB9XG4iLCIud2VsY29tZS1jYXJkIGltZyB7XG4gIG1heC1oZWlnaHQ6IDM1dmg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5nYW1lY2FudmFzIHtcbiAgYm9yZGVyOiAzcHggc29saWQgYmxhY2s7XG59XG5cbi5wYXJhZm9vdCB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgZm9udC1zaXplOiAwLjlyZW07XG4gIHBhZGRpbmctbGVmdDogMC43NXJlbTtcbiAgcGFkZGluZy1yaWdodDogMC44NXJlbTtcbiAgcGFkZGluZy10b3A6IDAuMnJlbTtcbiAgdG9wOiAycHg7XG59XG5cbi5ob21lX2hlYWQge1xuICBmb250LXNpemU6IDAuOXJlbTtcbiAgcGFkZGluZy10b3A6IDAuMXJlbTtcbiAgcGFkZGluZy1sZWZ0OiAwLjc1cmVtO1xufVxuXG4uZ2FtZWluZm8ge1xuICBmb250LXNpemU6IDAuOXJlbTtcbiAgZmxvYXQ6IHJpZ2h0O1xuICBwYWRkaW5nLXJpZ2h0OiAwLjc1cmVtO1xufVxuXG4uZ2FtZXJlZnJlc2gge1xuICBmb250LXNpemU6IDAuOXJlbTtcbiAgZmxvYXQ6IHJpZ2h0O1xuICBwYWRkaW5nLXJpZ2h0OiAwLjc1cmVtO1xufVxuXG4uc2xpZGVyLXNsaWRlIHtcbiAgbWluLWhlaWdodDogMjAwcHg7XG59XG5cbi50b3RhbF93cml0ZSB7XG4gIHBhZGRpbmctYm90dG9tOiA1MHB4O1xufVxuXG4udXBfYXJyb3cge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHBhZGRpbmctbGVmdDogMjUuNDVyZW07XG4gIHBhZGRpbmctdG9wOiAwLjFyZW07XG4gIGJvdHRvbTogMTlweDtcbiAgaGVpZ2h0OiA2MDtcbiAgd2lkdGg6IDEyMDtcbn1cblxuLmZvb3Rlcl90b29sYmFyIHtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4uZm9vdGVyIHtcbiAgaGVpZ2h0OiAxMCU7XG59XG5cbi5kaWNlIHtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC1nYXA6IDJyZW07XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoOHJlbSwgMWZyKSk7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogYXV0bztcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAycmVtO1xuICBwZXJzcGVjdGl2ZTogNjAwcHg7XG59XG5cbi5kaWUtbGlzdCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmcjtcbiAgaGVpZ2h0OiA2cmVtO1xuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG4gIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XG4gIHdpZHRoOiA2cmVtO1xufVxuXG4uZXZlbi1yb2xsIHtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDEuNXMgZWFzZS1vdXQ7XG59XG5cbi5vZGQtcm9sbCB7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxLjI1cyBlYXNlLW91dDtcbn1cblxuLmRpZS1pdGVtIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNWY0YztcbiAgYm94LXNoYWRvdzogaW5zZXQgLTAuMzVyZW0gMC4zNXJlbSAwLjc1cmVtIHJnYmEoMCwgMCwgMCwgMCksIGluc2V0IDAuNXJlbSAtMC4yNXJlbSAwLjVyZW0gcmdiYSgwLCAwLCAwLCAwLjE1KTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC1jb2x1bW46IDE7XG4gIGdyaWQtcm93OiAxO1xuICBncmlkLXRlbXBsYXRlLWFyZWFzOiBcIm9uZSB0d28gdGhyZWVcIiBcImZvdXIgZml2ZSBzaXhcIiBcInNldmVuIGVpZ2h0IG5pbmVcIjtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMywgMWZyKTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBwYWRkaW5nOiAxcmVtO1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmRvdCB7XG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYm94LXNoYWRvdzogaW5zZXQgLTAuMTVyZW0gMC4xNXJlbSAwLjI1cmVtIHJnYmEoMCwgMCwgMCwgMC41KTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGhlaWdodDogMS4yNXJlbTtcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XG4gIHdpZHRoOiAxLjI1cmVtO1xufVxuXG4uZXZlbi1yb2xsW2RhdGEtcm9sbD1cIjFcIl0ge1xuICB0cmFuc2Zvcm06IHJvdGF0ZVgoMzYwZGVnKSByb3RhdGVZKDcyMGRlZykgcm90YXRlWigzNjBkZWcpO1xufVxuXG4uZXZlbi1yb2xsW2RhdGEtcm9sbD1cIjJcIl0ge1xuICB0cmFuc2Zvcm06IHJvdGF0ZVgoNDUwZGVnKSByb3RhdGVZKDcyMGRlZykgcm90YXRlWigzNjBkZWcpO1xufVxuXG4uZXZlbi1yb2xsW2RhdGEtcm9sbD1cIjNcIl0ge1xuICB0cmFuc2Zvcm06IHJvdGF0ZVgoMzYwZGVnKSByb3RhdGVZKDYzMGRlZykgcm90YXRlWigzNjBkZWcpO1xufVxuXG4uZXZlbi1yb2xsW2RhdGEtcm9sbD1cIjRcIl0ge1xuICB0cmFuc2Zvcm06IHJvdGF0ZVgoMzYwZGVnKSByb3RhdGVZKDgxMGRlZykgcm90YXRlWigzNjBkZWcpO1xufVxuXG4uZXZlbi1yb2xsW2RhdGEtcm9sbD1cIjVcIl0ge1xuICB0cmFuc2Zvcm06IHJvdGF0ZVgoMjcwZGVnKSByb3RhdGVZKDcyMGRlZykgcm90YXRlWigzNjBkZWcpO1xufVxuXG4uZXZlbi1yb2xsW2RhdGEtcm9sbD1cIjZcIl0ge1xuICB0cmFuc2Zvcm06IHJvdGF0ZVgoMzYwZGVnKSByb3RhdGVZKDkwMGRlZykgcm90YXRlWigzNjBkZWcpO1xufVxuXG4ub2RkLXJvbGxbZGF0YS1yb2xsPVwiMVwiXSB7XG4gIHRyYW5zZm9ybTogcm90YXRlWCgtMzYwZGVnKSByb3RhdGVZKC03MjBkZWcpIHJvdGF0ZVooLTM2MGRlZyk7XG59XG5cbi5vZGQtcm9sbFtkYXRhLXJvbGw9XCIyXCJdIHtcbiAgdHJhbnNmb3JtOiByb3RhdGVYKC0yNzBkZWcpIHJvdGF0ZVkoLTcyMGRlZykgcm90YXRlWigtMzYwZGVnKTtcbn1cblxuLm9kZC1yb2xsW2RhdGEtcm9sbD1cIjNcIl0ge1xuICB0cmFuc2Zvcm06IHJvdGF0ZVgoLTM2MGRlZykgcm90YXRlWSgtODEwZGVnKSByb3RhdGVaKC0zNjBkZWcpO1xufVxuXG4ub2RkLXJvbGxbZGF0YS1yb2xsPVwiNFwiXSB7XG4gIHRyYW5zZm9ybTogcm90YXRlWCgtMzYwZGVnKSByb3RhdGVZKC02MzBkZWcpIHJvdGF0ZVooLTM2MGRlZyk7XG59XG5cbi5vZGQtcm9sbFtkYXRhLXJvbGw9XCI1XCJdIHtcbiAgdHJhbnNmb3JtOiByb3RhdGVYKC00NTBkZWcpIHJvdGF0ZVkoLTcyMGRlZykgcm90YXRlWigtMzYwZGVnKTtcbn1cblxuLm9kZC1yb2xsW2RhdGEtcm9sbD1cIjZcIl0ge1xuICB0cmFuc2Zvcm06IHJvdGF0ZVgoLTM2MGRlZykgcm90YXRlWSgtOTAwZGVnKSByb3RhdGVaKC0zNjBkZWcpO1xufVxuXG5bZGF0YS1zaWRlPVwiMVwiXSB7XG4gIHRyYW5zZm9ybTogcm90YXRlM2QoMCwgMCwgMCwgOTBkZWcpIHRyYW5zbGF0ZVooNHJlbSk7XG59XG5cbltkYXRhLXNpZGU9XCIyXCJdIHtcbiAgdHJhbnNmb3JtOiByb3RhdGUzZCgtMSwgMCwgMCwgOTBkZWcpIHRyYW5zbGF0ZVooNHJlbSk7XG59XG5cbltkYXRhLXNpZGU9XCIzXCJdIHtcbiAgdHJhbnNmb3JtOiByb3RhdGUzZCgwLCAxLCAwLCA5MGRlZykgdHJhbnNsYXRlWig0cmVtKTtcbn1cblxuW2RhdGEtc2lkZT1cIjRcIl0ge1xuICB0cmFuc2Zvcm06IHJvdGF0ZTNkKDAsIC0xLCAwLCA5MGRlZykgdHJhbnNsYXRlWig0cmVtKTtcbn1cblxuW2RhdGEtc2lkZT1cIjVcIl0ge1xuICB0cmFuc2Zvcm06IHJvdGF0ZTNkKDEsIDAsIDAsIDkwZGVnKSB0cmFuc2xhdGVaKDRyZW0pO1xufVxuXG5bZGF0YS1zaWRlPVwiNlwiXSB7XG4gIHRyYW5zZm9ybTogcm90YXRlM2QoMSwgMCwgMCwgMTgwZGVnKSB0cmFuc2xhdGVaKDRyZW0pO1xufVxuXG5bZGF0YS1zaWRlPVwiMVwiXSAuZG90Om50aC1vZi10eXBlKDEpIHtcbiAgZ3JpZC1hcmVhOiBmaXZlO1xufVxuXG5bZGF0YS1zaWRlPVwiMlwiXSAuZG90Om50aC1vZi10eXBlKDEpIHtcbiAgZ3JpZC1hcmVhOiBvbmU7XG59XG5cbltkYXRhLXNpZGU9XCIyXCJdIC5kb3Q6bnRoLW9mLXR5cGUoMikge1xuICBncmlkLWFyZWE6IG5pbmU7XG59XG5cbltkYXRhLXNpZGU9XCIzXCJdIC5kb3Q6bnRoLW9mLXR5cGUoMSkge1xuICBncmlkLWFyZWE6IG9uZTtcbn1cblxuW2RhdGEtc2lkZT1cIjNcIl0gLmRvdDpudGgtb2YtdHlwZSgyKSB7XG4gIGdyaWQtYXJlYTogZml2ZTtcbn1cblxuW2RhdGEtc2lkZT1cIjNcIl0gLmRvdDpudGgtb2YtdHlwZSgzKSB7XG4gIGdyaWQtYXJlYTogbmluZTtcbn1cblxuW2RhdGEtc2lkZT1cIjRcIl0gLmRvdDpudGgtb2YtdHlwZSgxKSB7XG4gIGdyaWQtYXJlYTogb25lO1xufVxuXG5bZGF0YS1zaWRlPVwiNFwiXSAuZG90Om50aC1vZi10eXBlKDIpIHtcbiAgZ3JpZC1hcmVhOiB0aHJlZTtcbn1cblxuW2RhdGEtc2lkZT1cIjRcIl0gLmRvdDpudGgtb2YtdHlwZSgzKSB7XG4gIGdyaWQtYXJlYTogc2V2ZW47XG59XG5cbltkYXRhLXNpZGU9XCI0XCJdIC5kb3Q6bnRoLW9mLXR5cGUoNCkge1xuICBncmlkLWFyZWE6IG5pbmU7XG59XG5cbltkYXRhLXNpZGU9XCI1XCJdIC5kb3Q6bnRoLW9mLXR5cGUoMSkge1xuICBncmlkLWFyZWE6IG9uZTtcbn1cblxuW2RhdGEtc2lkZT1cIjVcIl0gLmRvdDpudGgtb2YtdHlwZSgyKSB7XG4gIGdyaWQtYXJlYTogdGhyZWU7XG59XG5cbltkYXRhLXNpZGU9XCI1XCJdIC5kb3Q6bnRoLW9mLXR5cGUoMykge1xuICBncmlkLWFyZWE6IGZpdmU7XG59XG5cbltkYXRhLXNpZGU9XCI1XCJdIC5kb3Q6bnRoLW9mLXR5cGUoNCkge1xuICBncmlkLWFyZWE6IHNldmVuO1xufVxuXG5bZGF0YS1zaWRlPVwiNVwiXSAuZG90Om50aC1vZi10eXBlKDUpIHtcbiAgZ3JpZC1hcmVhOiBuaW5lO1xufVxuXG5bZGF0YS1zaWRlPVwiNlwiXSAuZG90Om50aC1vZi10eXBlKDEpIHtcbiAgZ3JpZC1hcmVhOiBvbmU7XG59XG5cbltkYXRhLXNpZGU9XCI2XCJdIC5kb3Q6bnRoLW9mLXR5cGUoMikge1xuICBncmlkLWFyZWE6IHRocmVlO1xufVxuXG5bZGF0YS1zaWRlPVwiNlwiXSAuZG90Om50aC1vZi10eXBlKDMpIHtcbiAgZ3JpZC1hcmVhOiBmb3VyO1xufVxuXG5bZGF0YS1zaWRlPVwiNlwiXSAuZG90Om50aC1vZi10eXBlKDQpIHtcbiAgZ3JpZC1hcmVhOiBzaXg7XG59XG5cbltkYXRhLXNpZGU9XCI2XCJdIC5kb3Q6bnRoLW9mLXR5cGUoNSkge1xuICBncmlkLWFyZWE6IHNldmVuO1xufVxuXG5bZGF0YS1zaWRlPVwiNlwiXSAuZG90Om50aC1vZi10eXBlKDYpIHtcbiAgZ3JpZC1hcmVhOiBuaW5lO1xufVxuXG4ubG9nbyBpbWcge1xuICB3aWR0aDogMjAlO1xuICBwYWRkaW5nOiAyJTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/home/home.page.ts":
/*!***********************************!*\
  !*** ./src/app/home/home.page.ts ***!
  \***********************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/camera/ngx */ "./node_modules/@ionic-native/camera/ngx/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm2015/add/operator/map.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _modal_modal_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../modal/modal.page */ "./src/app/modal/modal.page.ts");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _quizmodal_quizmodal_page__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../quizmodal/quizmodal.page */ "./src/app/quizmodal/quizmodal.page.ts");
/* harmony import */ var _wordgame_wordgame_page__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../wordgame/wordgame.page */ "./src/app/wordgame/wordgame.page.ts");
/* harmony import */ var _services_simulator_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../services/simulator.service */ "./src/app/services/simulator.service.ts");
/* harmony import */ var _special_move_special_move_page__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../special-move/special-move.page */ "./src/app/special-move/special-move.page.ts");
/* harmony import */ var _howtoplay_howtoplay_page__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../howtoplay/howtoplay.page */ "./src/app/howtoplay/howtoplay.page.ts");

var HomePage_1;


















let game;
let player = {
    image: null,
    position: 0,
    targetPosition: 0,
    wallet: 100,
    // position: 68,
    movementTween: null,
    global_direction: 0,
    current_cell_type: 0
};
// Aman's Global Variables - For Generic Game Algo
let bDicePause = false;
let gameconfig, positionConfig, questionConfig;
let iDisplacement = 0;
let iSnakeLadderBase = 0;
let iOld_state = 0;
let iCurrent_state = 0;
let iReverseTo = 0;
let iRoll;
let iOld_ReverseTo = 0;
let bank_coins = 0;
let style_bank_score = {};
let move_state = 0; // move state defines the sate of move the token is currently in 
let miss_a_turn = 0;
// let global_direction=1;
//Jit's variables
let dice, result, board, playerSprite, initHeight, positions, diceSound, ladderSound, snakeSound, start, scope, posts, bank_image, happiness_recieved, happiness_image, bank_transfer;
let plots = [];
let scrollStep = 0.05;
let sixRepeat = 0; // Make 0 on reset the game
let retreatPos = 0; // Make 0 on reset the game
let diceRolled = 0; // Make 0 on reset the game
let isShownToast = 0; // Make 0 on reset the game
let special_move_index = 0;
// localStorage.clear();
let arr = {};
let statResultRolled = 0;
let statDiceRoll = [];
let statResult = [];
let statPosition = [];
let gotSnakeOrLadder = false;
let letter_bank = [];
let word_bank = [];
let iFrame = 0;
// let toastShownFor = [67, 69, 70, 71];
let endToastShown = false;
let isToastDisplay = false;
let toastMSG;
let oTxtBankBalance;
let text;
let stageTxt;
let chakraTxt;
let style = {
    font: "24px Arial",
    wordWrap: true,
    align: "center",
    wordWrapWidth: 200
};
let confJson, posConfig;
let bLadderSnakeFacePressed = false;
let boot;
let mainState;
let game_start = false;
let that;
let fromgamestate;
let simulator = [1, 3, 5];
let Dice;
let Diceinstance;
let appinstance;
let simu;
let reset_game;
let letter_index = 0;
let special_move_image;
let cellname;
let sp_title_color;
let sp_tab_color;
let localstorage;
let HomePage = HomePage_1 = class HomePage {
    constructor(navCtrl, platform, camera, router, http, events, modal, storage, loadingCtrl, simulator) {
        // console.log('Started');
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.camera = camera;
        this.router = router;
        this.http = http;
        this.events = events;
        this.modal = modal;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.simulator = simulator;
        this.image = '';
        this.classReference = HomePage_1;
        this.boot = {
            preload() {
                game.load.image("board", "assets/game/board.jpg");
                game.load.image("player", "assets/game/token4.png");
                game.load.spritesheet("dice", "assets/game/dice.png", 60, 60, 13);
                game.load.audio('diceSound', 'assets/game/dice.mp3');
                game.load.audio('ladderSound', 'assets/game/ascend.mp3');
                game.load.audio('snakeSound', 'assets/game/descend.mp3');
                game.load.image('bank', 'assets/icon/bank_icon.png');
                game.load.image('bank_transfer', 'assets/game/cell_transparent_red.png');
                game.load.image('trans_dice', 'assets/game/transparent_dice.png');
                game.load.image('happiness_recieved', 'assets/icon/receving happiness_gif.gif');
                game.load.image('reset_game', 'assets/icon/rest_game.png');
                game.scale.maxWidth = 900;
                game.scale.maxHeight = 900;
                game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                game.scale.pageAlignHorizontally = true;
                game.scale.pageAlignVertically = false;
                game.scale.setShowAll();
                game.scale.refresh();
            },
            create() {
                fromgamestate = Object.create(game.constructor.prototype);
                game.physics.startSystem(Phaser.Physics.ARCADE);
                game.stage.backgroundColor = "#FFFFFF";
                //color code #ffc178
                game.state.start("main");
            }
        };
        this.mainState = {
            preload() {
                gameconfig = [
                    {
                        "x": 0,
                        "y": 0,
                        "topX": -416,
                        "topY": 0,
                        "posX": 360,
                        "posY": 27,
                        "postID": 551,
                        "snakeLadder": 0,
                        "stage": "Sanyaasa",
                        "chakra": "Vaikuntha",
                        "toast": "You have landed in <strong>vaikuṇṭha</strong> as a result of <strong>bhakti</strong>",
                        "toastTitle": "Got Ladder from 54 to 68",
                        "info": {
                            "name": "vaikuṇṭha",
                            "quote": [{
                                    "name": "I am equal in all existences, none is dear to Me, none hated – Gita 9.29"
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -62, -62, -67],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -62, -62, -67],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["a", "b"],
                        "Letter_Vowels": ["a", "e"],
                        "Letter_Consonants": ["h", "b"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 50,
                        "y": 700,
                        "topX": 0,
                        "topY": -800,
                        "posX": 28,
                        "posY": 685,
                        "postID": 10,
                        "snakeLadder": 0,
                        "stage": "Brahmacharya",
                        "chakra": "Mulaadhaara",
                        "info": {
                            "name": "janma",
                            "quote": [{
                                    "saying": "Though birthless, and unchangeable, and supreme I am born through My māyā, defying the laws of Nature – Gita 4.6"
                                },
                                {
                                    "saying": "Landing on this cell is a rare occurance! You start your journey as an 'avatār'; A being who at birth is free from the clutches of 'māyā' and the arshidvarga"
                                }
                            ],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["c", "d"],
                        "Letter_Vowels": ["e", "e"],
                        "Letter_Consonants": ["c", "d"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 136,
                        "y": 700,
                        "topX": -40,
                        "topY": -800,
                        "posX": 110,
                        "posY": 685,
                        "postID": 12,
                        "snakeLadder": 0,
                        "stage": "Brahmacharya",
                        "chakra": "Mulaadhaara",
                        "toast": "You have landed in <strong>māyā</strong> as a result of <strong>ahaṅkāra</strong>",
                        "toastTitle": "It was a Snake from 55 to 2",
                        "info": {
                            "name": "māyā",
                            "quote": [{
                                    "name": "It is difficult indeed to pierce this divine maya of the gunas. But the faithful are able to pierce it – Gita 7.14"
                                },
                                {
                                    "name": "Does'nt the world revolve like a magic wheel? Isn't Brahman the hub? – Gita 18.61."
                                },
                                {
                                    "name": "The scriptures itself declare that all duality is a mere illusion (maya), Non-duality alone is the Absolute Truth. Such is also our direct experience in deep-sleep – Shankara (Vivekachuramani – 406)"
                                },
                                {
                                    "name": "māyā is an illusion, created and destroyed by Prakṛiti"
                                }
                            ],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["e", "f", "g"],
                        "Letter_Vowels": ["e", "o", "u"],
                        "Letter_Consonants": ["l", "f", "g"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 212,
                        "y": 700,
                        "topX": -214,
                        "topY": -800,
                        "posX": 194,
                        "posY": 685,
                        "postID": 15,
                        "snakeLadder": 0,
                        "stage": "Brahmacharya",
                        "chakra": "Mulaadhaara",
                        "toast": "You have landed in <strong>krodha</strong> as a result of <strong>durbuddhi</strong>",
                        "toastTitle": "It was a Snake from 61 to 3",
                        "info": {
                            "name": "krodha",
                            "quote": [{
                                    "name": "Anger leads to confusion, and confusion kills the power of memory; with the destruction of memory choice is rendered impossible; and when moral choice fails, man is doomed – Gita 2.63"
                                },
                                {
                                    "name": "A quick temper will make a fool of you soon enough – Bruce Lee"
                                },
                                {
                                    "name": "Anger is an acid that can do more harm to the vessel in which it is stored than to anything on which it is poured – Mark Twain"
                                },
                                {
                                    "name": "Anger is never without a reason, but seldom with a good one – Benjamin Franklin"
                                },
                                {
                                    "name": "Angry men are blind and foolish, for reason at such time takes flight; and, in her absence, wrath plunders all the riches of the intellect, while the judgement remains the prisoner of it's own pride – Pietro Aretino"
                                }
                            ],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["c", "d"],
                        "Letter_Vowels": ["e", "e"],
                        "Letter_Consonants": ["c", "d"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 302,
                        "y": 700,
                        "topX": -214,
                        "topY": -800,
                        "posX": 277,
                        "posY": 685,
                        "postID": 19,
                        "snakeLadder": 0,
                        "stage": "Brahmacharya",
                        "chakra": "Mulaadhaara",
                        "toast": "You have landed in <strong>lobha</strong> as a result of <strong>dveṣa</strong>",
                        "toastTitle": "It was a Snake from 16 to 4",
                        "info": {
                            "name": "lobha",
                            "quote": [{
                                    "name": "The greed for fruit misses the flower – Rabindranath Tagore"
                                },
                                {
                                    "name": "Beware! Guard against every kind of greed. Life does not consist in an abundance of possessions – Luke 12.15"
                                },
                                {
                                    "name": "Oh, the jealousy, the greed is the unraveling. It's the unraveling and it undoes all the joy that could be – Joni Mitchell"
                                },
                                {
                                    "name": "How many fond fools serve mad jealousy – William Shakespeare (Comedy of Errors Act 2 Scene 1)"
                                }
                            ],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["m", "n"],
                        "Letter_Vowels": ["e", "u"],
                        "Letter_Consonants": ["m", "n"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 380,
                        "y": 700,
                        "topX": -548,
                        "topY": -800,
                        "posX": 360,
                        "posY": 685,
                        "postID": 24,
                        "snakeLadder": 0,
                        "stage": "Brahmacharya",
                        "chakra": "Mulaadhaara",
                        "info": {
                            "name": "bhūloka",
                            "quote": [{
                                    "name": "Bhuloka literally means ‘the earth-world’. Bhumi or the earth is considered as a ‘loka,’ a place for doing karma or actions and enjoy their fruits. Hence, it is this earth with all its living beings, that has been designated as ‘bhuloka.’"
                                },
                                {
                                    "name": "The radius of Bhū-maṇḍala extends as far as the sun spreads its light and heat and as far as the moon and all the stars can be seen – Srimad Bhagvada 5.16.1"
                                },
                                {
                                    "name": "Bhuloka literally means ‘the earth-world’. Bhumi or the earth is considered as a ‘loka,’ a place for doing karma or actions and enjoy their fruits. Hence, it is this earth with all its living beings, that has been designated as ‘bhuloka.’"
                                },
                                {
                                    "name": "The Mūlādhār chakra defines our relation to Earth. It impacts our vitality, passion and survival instincts."
                                }
                            ],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["r", "s", "t"],
                        "Letter_Vowels": ["i", "o", "u"],
                        "Letter_Consonants": ["r", "s", "t"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 468,
                        "y": 700,
                        "topX": -715,
                        "topY": -800,
                        "posX": 444,
                        "posY": 685,
                        "postID": 26,
                        "snakeLadder": 0,
                        "stage": "Brahmacharya",
                        "chakra": "Mulaadhaara",
                        "toast": "You have landed in <strong>moha</strong> as a result of <strong>adharma</strong>",
                        "toastTitle": "It was a Snake from 29 to 6",
                        "info": {
                            "name": "moha",
                            "quote": [{
                                    "name": "That pleasure of which delusion is the beginning and delusion is the consequence, which arises from sleep, indolence and ignorance, that is declared tamasic – Gita 18.39"
                                },
                                {
                                    "name": "Loving, hating, having expectations: all these are attachments. Attachment prevents the growth of one's true being – Laozi"
                                },
                                {
                                    "name": "What we have to learn, in both meditation and in life, is to be free of attachment to the good experiences, and free of aversion to the negative ones – Sogyal Rinpoche"
                                },
                                {
                                    "name": "Real meditation is not about mastering a technique; it's about letting go of control – Unknown "
                                },
                                {
                                    "name": "Non-attachment is not the elimination of desire. It is the spaciousness to allow any quality of mind, any thought or any feeling, to arise without closing around it, without eliminating the pure witness of being. It is an active receptivity to life – Stephen Levine"
                                }
                            ],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["u", "v"],
                        "Letter_Vowels": ["u", "e"],
                        "Letter_Consonants": ["k", "v"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 550,
                        "y": 700,
                        "topX": -800,
                        "topY": -800,
                        "posX": 528,
                        "posY": 685,
                        "postID": 28,
                        "snakeLadder": 0,
                        "stage": "Brahmacharya",
                        "chakra": "Mulaadhaara",
                        "toast": "You have landed in <strong>abhimāna</strong> as a result of <strong>kusangati</strong>",
                        "toastTitle": "It was a Snake from 24 to 7",
                        "info": {
                            "name": "abhimāna",
                            "quote": [{
                                    "name": "Pride, obstreperousness, vanity, anger boorishness, and ignorance are the marks of the anti-divine – Gita 16.4"
                                },
                                {
                                    "name": "It was pride that changed angels into devils; it is humility that makes men as angels – Saint Augustine"
                                },
                                {
                                    "name": "False pride is like the self-esteem curriculum for toddlers where everything is praised and no achievement ultimately has any meaning – Anne-Marie Slaughter"
                                },
                                {
                                    "name": "Bad company corrupts good character – Menander of Athens"
                                }
                            ],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["w", "x"],
                        "Letter_Vowels": ["i", "o"],
                        "Letter_Consonants": ["w", "x"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 632,
                        "y": 700,
                        "topX": -800,
                        "topY": -800,
                        "posX": 610,
                        "posY": 685,
                        "postID": 32,
                        "snakeLadder": 0,
                        "stage": "Brahmacharya",
                        "chakra": "Mulaadhaara",
                        "toast": "You have landed in <strong>mithyā</strong> as a result of <strong>ịrṣyā</strong>",
                        "toastTitle": "It was a Snake from 12 to 8",
                        "info": {
                            "name": "mithyā",
                            "quote": [{
                                    "name": "With two eyes we see the same image, with two feet we walk the same path. Duality is an illusion – Unknown"
                                },
                                {
                                    "name": "Brahman alone is real; the world is non-real; and the individual Self is essentially not-different from Brahman – Shankara (Vivekachuramani)"
                                }
                            ],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["y", "z"],
                        "Letter_Vowels": ["u", "o"],
                        "Letter_Consonants": ["y", "z"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 715,
                        "y": 700,
                        "topX": -800,
                        "topY": -800,
                        "posX": 691,
                        "posY": 685,
                        "postID": 34,
                        "snakeLadder": 0,
                        "stage": "Brahmacharya",
                        "chakra": "Mulaadhaara",
                        "toast": "You have landed in <strong>kāma</strong> as a result of <strong>avidyā</strong>",
                        "toastTitle": "It was a Snake from 44 to 9",
                        "info": {
                            "name": "kāma",
                            "quote": [{
                                    "name": "This is desire and its companion wrath, children of rajas, know thou this as the soul's great enemy (which has to be slain) – Gita 3.37"
                                },
                                {
                                    "name": "Memory creates a hallucination of the past, desire creates a hallucination of the future – Jaggi Vasudev"
                                },
                                {
                                    "name": "All men by nature desire knowledge – Aristotle"
                                },
                                {
                                    "name": "All suffering originates from carving, from attachment, from desire – Edgar Allan Poe"
                                },
                                {
                                    "name": "Buddha's doctrine: Man suffers because of his craving to possess and keep forever things which are essentially impermanent. This frustration of the desire to possess is the immediate cause of suffering – Allan Watts"
                                }
                            ],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["u", "v"],
                        "Letter_Consonants": ["k", "v"],
                        "Letter_Vowels": ["u", "e"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 715,
                        "y": 610,
                        "topX": -800,
                        "topY": -800,
                        "posX": 691,
                        "posY": 590,
                        "postID": 36,
                        "snakeLadder": 23,
                        "stage": "Brahmacharya",
                        "chakra": "Svadhishthaana",
                        "info": {
                            "name": "tapa",
                            "quote": [{
                                    "name": "A gentleman avoids seeking to satisfy his appetite to the full when he eats and avoids seeking comfort when he is at home. He may simply be said to be fond of learning."
                                },
                                {
                                    "name": "The study and the teaching of the vedas is tapa – Nāka son of Mudgala (Taittiriya Upanishad Ninth Anuvak)"
                                },
                                {
                                    "name": "A good student should have the awareness of a crow, the concentration of a crane, shallow sleep like a dog, eat limited food and renounce the attachment to his house and family. To be able to study the vedas, a student must abide by these rules."
                                },
                                {
                                    "name": "Discipline not desire determines your destiny – Unknown"
                                },
                                {
                                    "name": "Tapasya means to accept inconvenience for higher purpose – Radhanath Swami"
                                },
                                {
                                    "name": "With self-discipline most anything is possible – Theodore Roosevelt"
                                }
                            ],
                            "movement": {
                                "displacement": [13, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [13, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["j", "k"],
                        "Letter_Vowels": ["o", "i"],
                        "Letter_Consonants": ["j", "k"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 632,
                        "y": 610,
                        "topX": -800,
                        "topY": -800,
                        "posX": 610,
                        "posY": 590,
                        "postID": 39,
                        "snakeLadder": 0,
                        "stage": "Brahmacharya",
                        "chakra": "Svadhishthaana",
                        "info": {
                            "name": "gandharva",
                            "quote": [{
                                    "name": "Celestial musicians entertain the Gods and those who have risen to this plane by their austerities. A player in this cell experiences inward joy, a feeling of rhythm and a sense of harmony."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["m", "n"],
                        "Letter_Vowels": ["e", "u"],
                        "Letter_Consonants": ["m", "n"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 550,
                        "y": 610,
                        "topX": -800,
                        "topY": -800,
                        "posX": 528,
                        "posY": 590,
                        "postID": 41,
                        "snakeLadder": 8,
                        "stage": "Brahmacharya",
                        "chakra": "Svadhishthaana",
                        "info": {
                            "name": "ịrṣyā",
                            "quote": [{
                                    "name": "Envy is the art of counting another's blessings instead of your own – Harold Coffin"
                                }],
                            "movement": {
                                "displacement": [-4, -4, -4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [-4, -4, -4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["o", "p", "q"],
                        "Letter_Vowels": ["o", "a", "e"],
                        "Letter_Consonants": ["j", "p", "q"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 468,
                        "y": 610,
                        "topX": -593,
                        "topY": -800,
                        "posX": 444,
                        "posY": 590,
                        "postID": 43,
                        "snakeLadder": 0,
                        "stage": "Brahmacharya",
                        "chakra": "Svadhishthaana",
                        "toast": "You have landed in <strong>antarikṣa</strong> as a result of <strong>tāmasloka</strong>",
                        "toastTitle": "It was a Snake from 63 to 13",
                        "info": {
                            "name": "antarikṣa",
                            "quote": [{
                                    "name": "Action is greater than inaction. Therefore, Arjuna, work but work selflessly – Gita 3.8"
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["a", "b"],
                        "Letter_Vowels": ["a", "a"],
                        "Letter_Consonants": ["h", "b"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 380,
                        "y": 610,
                        "topX": -548,
                        "topY": -800,
                        "posX": 360,
                        "posY": 590,
                        "postID": 45,
                        "snakeLadder": 0,
                        "stage": "Brahmacharya",
                        "chakra": "Svadhishthaana",
                        "info": {
                            "name": "bhuvaloka",
                            "quote": [{
                                    "name": "The Astral Plane, where the player becomes alive with possibilities. The player engages in imagination as his physical body is also maturing."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["e", "f"],
                        "Letter_Vowels": ["e", "o"],
                        "Letter_Consonants": ["l", "f"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 302,
                        "y": 610,
                        "topX": -251,
                        "topY": -800,
                        "posX": 277,
                        "posY": 590,
                        "postID": 47,
                        "snakeLadder": 0,
                        "stage": "Brahmacharya",
                        "chakra": "Svadhishthaana",
                        "info": {
                            "name": "nāga loka",
                            "quote": [{
                                    "name": "The realm of the Fantastic. The plane of the semi-divine Nāgas who are masters of great wisdom. Nāgas are known to be guardians of fantastic treasures."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["i", "j"],
                        "Letter_Vowels": ["e", "o"],
                        "Letter_Consonants": ["s", "j"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 212,
                        "y": 610,
                        "topX": -84,
                        "topY": -800,
                        "posX": 194,
                        "posY": 590,
                        "postID": 51,
                        "snakeLadder": 4,
                        "stage": "Brahmacharya",
                        "chakra": "Svadhishthaana",
                        "info": {
                            "name": "dveṣa",
                            "quote": [{
                                    "name": "O, beware, my lord, of jealousy; It is the green-ey'd monster, which doth mock the meat it feeds on – William Shakespeare (Othello Act III Scene III)"
                                }],
                            "movement": {
                                "displacement": [-12, -12, -12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [-12, -12, -12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["c", "d"],
                        "Letter_Vowels": ["e", "e"],
                        "Letter_Consonants": ["c", "d"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 136,
                        "y": 610,
                        "topX": -84,
                        "topY": -800,
                        "posX": 110,
                        "posY": 590,
                        "postID": 54,
                        "snakeLadder": 69,
                        "stage": "Brahmacharya",
                        "chakra": "Svadhishthaana",
                        "info": {
                            "name": "dayā",
                            "quote": [{
                                    "name": "Compassion is an experience that makes the player one with the divine. Love for other completely removes the veil of the ego in the self, thus breaking free of the most basic human bondage; māyā."
                                }],
                            "movement": {
                                "displacement": [52, 52, 52, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [52, 52, 52, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["e", "f"],
                        "Letter_Vowels": ["e", "o"],
                        "Letter_Consonants": ["l", "f"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 50,
                        "y": 610,
                        "topX": 0,
                        "topY": -800,
                        "posX": 28,
                        "posY": 590,
                        "postID": 56,
                        "snakeLadder": 0,
                        "stage": "Brahmacharya",
                        "chakra": "Svadhishthaana",
                        "info": {
                            "name": "harṣa",
                            "quote": [{
                                    "name": "Joy and Excitement are the feelings in this cell, the experiences as she enters from adolescence to youth. She is full of energy. Having moved away from the fear and insecurity of being a child (1st stage) she has risen above the sensual desires of the adolescent (2nd stage)."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["w", "x"],
                        "Letter_Vowels": ["i", "o"],
                        "Letter_Consonants": ["w", "x"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 50,
                        "y": 510,
                        "topX": 0,
                        "topY": -600,
                        "posX": 28,
                        "posY": 495,
                        "postID": 61,
                        "snakeLadder": 0,
                        "stage": "Grihasta",
                        "chakra": "Manipura",
                        "info": {
                            "name": "karmayoga",
                            "quote": [{
                                    "name": "Know that work is born of Brahman!"
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["u", "v"],
                        "Letter_Vowels": ["u", "e"],
                        "Letter_Consonants": ["k", "v"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 136,
                        "y": 510,
                        "topX": 0,
                        "topY": -600,
                        "posX": 110,
                        "posY": 495,
                        "postID": 63,
                        "snakeLadder": 32,
                        "stage": "Grihasta",
                        "chakra": "Manipura",
                        "info": {
                            "name": "dāna",
                            "quote": [{
                                    "name": "Acts of sacrifice, giving, and askesis ought not be renounced at all, but should be performed, for they purify the wise – Gita 18.5"
                                }],
                            "movement": {
                                "displacement": [12, 12, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [12, 12, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["m", "n"],
                        "Letter_Vowels": ["e", "u"],
                        "Letter_Consonants": ["m", "n"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 212,
                        "y": 510,
                        "topX": 50,
                        "topY": -600,
                        "posX": 194,
                        "posY": 495,
                        "postID": 65,
                        "snakeLadder": 0,
                        "stage": "Grihasta",
                        "chakra": "Manipura",
                        "info": {
                            "name": "prāyaścitta",
                            "quote": [{
                                    "name": "Everyday I examine my character in three respects: am I disloyal in my designs for others, am I untrustworthy in my dealings with friends, have I failed to practise what has been passed to me?"
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["o", "p", "q"],
                        "Letter_Vowels": ["o", "a", "e"],
                        "Letter_Consonants": ["j", "p", "q"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 302,
                        "y": 510,
                        "topX": 50,
                        "topY": -600,
                        "posX": 277,
                        "posY": 495,
                        "postID": 67,
                        "snakeLadder": 60,
                        "stage": "Grihasta",
                        "chakra": "Manipura",
                        "info": {
                            "name": "dharma",
                            "quote": [{
                                    "name": "If one sets one's heart on humaneness, one will be without evil"
                                }],
                            "movement": {
                                "displacement": [38, 38, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [38, 38, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["a", "b", "c"],
                        "Letter_Vowels": ["a", "a", "e"],
                        "Letter_Consonants": ["h", "b", "c"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 380,
                        "y": 510,
                        "topX": -407,
                        "topY": -600,
                        "posX": 360,
                        "posY": 495,
                        "postID": 69,
                        "snakeLadder": 0,
                        "stage": "Grihasta",
                        "chakra": "Manipura",
                        "toast": "You have landed in <strong>swargaloka</strong> as a result of <strong>tapa</strong>",
                        "toastTitle": "Got Ladder from 10 to 23",
                        "info": {
                            "name": "swargaloka",
                            "quote": [{
                                    "name": "Heaven is where Indra dwells. Every religion has a heaven, for Marx, this was the classless society. In the Hindu tradition, this is the highest loka that perishes and is reborn every day of each day of Brahmā, the creator."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["e", "f"],
                        "Letter_Consonants": ["l", "f"],
                        "Letter_Vowels": ["e", "o"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 468,
                        "y": 510,
                        "topX": -407,
                        "topY": -600,
                        "posX": 444,
                        "posY": 495,
                        "postID": 71,
                        "snakeLadder": 7,
                        "stage": "Grihasta",
                        "chakra": "Manipura",
                        "info": {
                            "name": "kusaṅgati",
                            "quote": [{
                                    "name": "Bad company ruins good morals – I Corinthians 15.33"
                                }],
                            "movement": {
                                "displacement": [-17, -17, -17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [-17, -17, -17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["g", "h"],
                        "Letter_Vowels": ["u", "a"],
                        "Letter_Consonants": ["g", "h"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 550,
                        "y": 510,
                        "topX": -710,
                        "topY": -600,
                        "posX": 528,
                        "posY": 495,
                        "postID": 73,
                        "snakeLadder": 0,
                        "stage": "Grihasta",
                        "chakra": "Manipura",
                        "info": {
                            "name": "susaṅgati",
                            "quote": [{
                                    "name": "A gentleman is diligent in deed and cautious in word, and he associates with possessors of the Way and is put right by them."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["i", "j"],
                        "Letter_Vowels": ["e", "o"],
                        "Letter_Consonants": ["s", "j"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 632,
                        "y": 510,
                        "topX": -800,
                        "topY": -600,
                        "posX": 610,
                        "posY": 495,
                        "postID": 75,
                        "snakeLadder": 0,
                        "stage": "Grihasta",
                        "chakra": "Manipura",
                        "info": {
                            "name": "cintā",
                            "quote": [{
                                    "name": "Stress & Sorrow are very real experiences. The player is nearing the end of her youth. She is contemplating family, and first experiences cintā. It bears down the player, bringing her back to reality."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["k", "l"],
                        "Letter_Vowels": ["i", "o"],
                        "Letter_Consonants": ["k", "l"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 715,
                        "y": 510,
                        "topX": -800,
                        "topY": -600,
                        "posX": 691,
                        "posY": 495,
                        "postID": 77,
                        "snakeLadder": 41,
                        "stage": "Grihasta",
                        "chakra": "Manipura",
                        "info": {
                            "name": "paramārtha",
                            "quote": [{
                                    "name": "Param means supreme and Arth means meaning. Together they imply actions done harmoniously with nature while being fully conscious and aware of dharma."
                                }],
                            "movement": {
                                "displacement": [14, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [14, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["m", "n"],
                        "Letter_Vowels": ["e", "u"],
                        "Letter_Consonants": ["m", "n"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 715,
                        "y": 420,
                        "topX": -800,
                        "topY": -600,
                        "posX": 691,
                        "posY": 402,
                        "postID": 303,
                        "snakeLadder": 50,
                        "stage": "Grihasta",
                        "chakra": "Anaahata",
                        "info": {
                            "name": "sudharma",
                            "quote": [{
                                    "name": "The gentleman is familiar with what is right, just as the small man is familiar with profit."
                                }],
                            "movement": {
                                "displacement": [22, 22, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [22, 22, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["o", "p", "q"],
                        "Letter_Vowels": ["o", "a", "e"],
                        "Letter_Consonants": ["j", "p", "q"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 632,
                        "y": 420,
                        "topX": -750,
                        "topY": -445,
                        "posX": 610,
                        "posY": 402,
                        "postID": 305,
                        "snakeLadder": 6,
                        "stage": "Grihasta",
                        "chakra": "Anaahata",
                        "info": {
                            "name": "adharma",
                            "quote": [{
                                    "name": "Irreligiosity is the root of all our fears, troubles and sufferings. It is based on moha (attachment). adharma, like dharma, is also a constant, but varies from player to player in interpretation."
                                }],
                            "movement": {
                                "displacement": [-23, -23, -23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [-23, -23, -23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["r", "s"],
                        "Letter_Vowels": ["i", "o"],
                        "Letter_Consonants": ["r", "s"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 550,
                        "y": 420,
                        "topX": -750,
                        "topY": -445,
                        "posX": 528,
                        "posY": 402,
                        "postID": 307,
                        "snakeLadder": 0,
                        "stage": "Grihasta",
                        "chakra": "Anaahata",
                        "info": {
                            "name": "uttamgati",
                            "quote": [{
                                    "name": "Good Tendencies are the result of good habits, as they help the player act in the rhythm of the cosmic laws."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["t", "u"],
                        "Letter_Vowels": ["u", "u"],
                        "Letter_Consonants": ["t", "k"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 468,
                        "y": 420,
                        "topX": -593,
                        "topY": -445,
                        "posX": 444,
                        "posY": 402,
                        "postID": 309,
                        "snakeLadder": 0,
                        "stage": "Grihasta",
                        "chakra": "Anaahata",
                        "info": {
                            "name": "yakṣaloka",
                            "quote": [{
                                    "name": "Abode of the Nature Spirits, is the experience the player is lead to, after Uttam Gati. The player on landing here gains the understanding and knowledge of cosmic principles."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["v", "w"],
                        "Letter_Vowels": ["e", "i"],
                        "Letter_Consonants": ["v", "w"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 380,
                        "y": 420,
                        "topX": -416,
                        "topY": -445,
                        "posX": 360,
                        "posY": 402,
                        "postID": 311,
                        "snakeLadder": 0,
                        "stage": "Grihasta",
                        "chakra": "Anaahata",
                        "toast": "You have landed in <strong>mahaloka</strong> as a result of <strong>dāna</strong>",
                        "toastTitle": "Got Ladder from 20 to 32",
                        "info": {
                            "name": "mahaloka",
                            "quote": [{
                                    "name": "For the unpeaceful how can there be happiness?"
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["x", "y"],
                        "Letter_Vowels": ["o", "u"],
                        "Letter_Consonants": ["x", "y"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 302,
                        "y": 420,
                        "topX": -251,
                        "topY": -445,
                        "posX": 277,
                        "posY": 402,
                        "postID": 313,
                        "snakeLadder": 0,
                        "stage": "Grihasta",
                        "chakra": "Anaahata",
                        "info": {
                            "name": "gandhaloka",
                            "quote": [{
                                    "name": "Plane of Fragrance, that is released when the player is cleansed of the baser weaknesses and the body ceases to produce bad odours. This divine odour is not unlike known fragrances such as sandalwood and lotus."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["z", "b"],
                        "Letter_Vowels": ["o", "a"],
                        "Letter_Consonants": ["z", "b"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 212,
                        "y": 420,
                        "topX": -80,
                        "topY": -445,
                        "posX": 194,
                        "posY": 402,
                        "postID": 315,
                        "snakeLadder": 0,
                        "stage": "Grihasta",
                        "chakra": "Anaahata",
                        "info": {
                            "name": "rasaloka",
                            "quote": [{
                                    "name": "Plane of Taste, is the aesthetic experience of the basic sense of taste.  Here the player enjoys the rasa, the very nature, of the taste."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 34, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 34, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["m", "n", "o"],
                        "Letter_Vowels": ["e", "u", "o"],
                        "Letter_Consonants": ["m", "n", "j"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 136,
                        "y": 420,
                        "topX": 0,
                        "topY": -445,
                        "posX": 110,
                        "posY": 402,
                        "postID": 317,
                        "snakeLadder": 0,
                        "stage": "Grihasta",
                        "chakra": "Anaahata",
                        "toast": "You have landed in <strong>naraka</strong> as a result of <strong>himsā</strong>",
                        "toastTitle": "It was a Snake from 52 to 35",
                        "info": {
                            "name": "naraka",
                            "quote": [{
                                    "name": "Hell is the cleansing experience of a player. However, she is still not cleansed enough to experience the divine. It is a stage of atonement through suffering."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["p", "q"],
                        "Letter_Vowels": ["a", "e"],
                        "Letter_Consonants": ["p", "q"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 50,
                        "y": 420,
                        "topX": 0,
                        "topY": -445,
                        "posX": 28,
                        "posY": 402,
                        "postID": 319,
                        "snakeLadder": 0,
                        "stage": "Grihasta",
                        "chakra": "Anaahata",
                        "info": {
                            "name": "spaṣta cetanā",
                            "quote": [{
                                    "name": "Plane of Clear Sound is the experience of a melodious cosmic rhythm within the player’s self. It means that the player’s body is now transparent to cosmic sound and vibrations. It is a beautiful result after the experience of naraka."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["j", "k"],
                        "Letter_Vowels": ["o", "i"],
                        "Letter_Consonants": ["j", "k"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 50,
                        "y": 335,
                        "topX": 0,
                        "topY": -445,
                        "posX": 28,
                        "posY": 310,
                        "postID": 321,
                        "snakeLadder": 66,
                        "stage": "Vaanaprastha",
                        "chakra": "Vishudhha",
                        "info": {
                            "name": "gyāna",
                            "quote": [{
                                    "name": "True awareness and knowledge are realisations that lead to the experience of bliss. A player who lands on this cell discovers reality through insight, practice and knowledge."
                                }],
                            "movement": {
                                "displacement": [29, 29, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [29, 29, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["m", "n"],
                        "Letter_Vowels": ["e", "u"],
                        "Letter_Consonants": ["m", "n"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 136,
                        "y": 335,
                        "topX": -40,
                        "topY": -250,
                        "posX": 110,
                        "posY": 310,
                        "postID": 323,
                        "snakeLadder": 0,
                        "stage": "Vaanaprastha",
                        "chakra": "Vishudhha",
                        "info": {
                            "name": "prāṇa",
                            "quote": [{
                                    "name": "Life Energy is the energy we draw from our environment to sustain life. Life and consciousness are distinct from each other. Life is the vehicle through which consciousness manifests and prāna is the energising force of life."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["o", "p"],
                        "Letter_Vowels": ["o", "a"],
                        "Letter_Consonants": ["j", "p"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 212,
                        "y": 335,
                        "topX": -214,
                        "topY": -250,
                        "posX": 194,
                        "posY": 310,
                        "postID": 325,
                        "snakeLadder": 0,
                        "stage": "Vaanaprastha",
                        "chakra": "Vishudhha",
                        "info": {
                            "name": "apāna",
                            "quote": [{
                                    "name": "Energy released is the energy that flows downwards through our intestines and is expelled. When apana is weak, we become susceptible to illness, fear, doubt, confusions, insecurity, and loss of purpose."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["w", "x"],
                        "Letter_Vowels": ["i", "o"],
                        "Letter_Consonants": ["w", "x"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 302,
                        "y": 335,
                        "topX": -214,
                        "topY": -250,
                        "posX": 277,
                        "posY": 310,
                        "postID": 327,
                        "snakeLadder": 0,
                        "stage": "Vaanaprastha",
                        "chakra": "Vishudhha",
                        "info": {
                            "name": "vayāna",
                            "quote": [{
                                    "name": "A pervasive and expansive force, vayāna governs the movement of energy through the circulatory system and the nervous system; and the free flow of thoughts and feelings in the mind."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["u", "v"],
                        "Letter_Vowels": ["u", "e"],
                        "Letter_Consonants": ["k", "v"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 380,
                        "y": 335,
                        "topX": -548,
                        "topY": -250,
                        "posX": 360,
                        "posY": 310,
                        "postID": 329,
                        "snakeLadder": 0,
                        "stage": "Vaanaprastha",
                        "chakra": "Vishudhha",
                        "toast": "You have landed in <strong>janaloka</strong> as a result of <strong>paramārtha</strong>",
                        "toastTitle": "Got Ladder from 27 to 41",
                        "info": {
                            "name": "janaloka",
                            "quote": [{
                                    "name": "This is the residence of the Rishis and demigods during the night of Brahmā, and is termed jana because the patriarchs are the progenitors of mankind."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 41, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 41, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["a", "b"],
                        "Letter_Vowels": ["a", "a"],
                        "Letter_Consonants": ["h", "b"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 468,
                        "y": 335,
                        "topX": -715,
                        "topY": -250,
                        "posX": 444,
                        "posY": 310,
                        "postID": 331,
                        "snakeLadder": 0,
                        "stage": "Vaanaprastha",
                        "chakra": "Vishudhha",
                        "info": {
                            "name": "agnikuṇḍ",
                            "quote": [{
                                    "name": "The fire pit is used to venerate the fire-god Agni. He has three sons with Svāhā. They are Pāvaka (produced by energy, eg. electrical fire, lightning), Pāvamāna (produced by friction) and ṣuci (fire of the gods, that which pervades all the galaxies and our self). Agni is an immortal among mortals."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["j", "k"],
                        "Letter_Vowels": ["o", "i"],
                        "Letter_Consonants": ["j", "k"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 550,
                        "y": 335,
                        "topX": -800,
                        "topY": -250,
                        "posX": 528,
                        "posY": 310,
                        "postID": 333,
                        "snakeLadder": 0,
                        "stage": "Vaanaprastha",
                        "chakra": "Vishudhha",
                        "info": {
                            "name": "manuṣyajanman",
                            "quote": [{
                                    "name": "Birth of the Evolved Man is the experience of the player as an evolved man. This is the man of the Sata Yuga. The man who has just been created by the progenitors of the human race, the most powerful ascetics. "
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["c", "d"],
                        "Letter_Vowels": ["e", "e"],
                        "Letter_Consonants": ["c", "d"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 632,
                        "y": 335,
                        "topX": -800,
                        "topY": -250,
                        "posX": 610,
                        "posY": 310,
                        "postID": 335,
                        "snakeLadder": 9,
                        "stage": "Vaanaprastha",
                        "chakra": "Vishudhha",
                        "info": {
                            "name": "avidyā",
                            "quote": [{
                                    "name": "Is ignorance of the self within. If the player lands here, she indulges in this ignorance and falls down to the 1st stage, the realm of kāma (desire). The player experiences the basest vibrations, and must again raise her awareness through the yoga of karma."
                                }],
                            "movement": {
                                "displacement": [-35, -35, -35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [-35, -35, -35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["y", "z"],
                        "Letter_Vowels": ["u", "o"],
                        "Letter_Consonants": ["y", "z"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 715,
                        "y": 335,
                        "topX": -800,
                        "topY": -250,
                        "posX": 691,
                        "posY": 310,
                        "postID": 337,
                        "snakeLadder": 67,
                        "stage": "Vaanaprastha",
                        "chakra": "Vishudhha",
                        "info": {
                            "name": "suvidyā",
                            "quote": [{
                                    "name": "If he appreciates men of quality, if he makes light of sexual attraction, if in serving his father and mother he is capable of using his strength to the utmost, if in serving his lord he is capable of offering up his life, if in his dealings with friends he is trustworthy in what he says, I would certainly call him learned even if it is said that he has never studied"
                                }],
                            "movement": {
                                "displacement": [-22, -22, -22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [-22, -22, -22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["a", "b"],
                        "Letter_Vowels": ["e", "e"],
                        "Letter_Consonants": ["h", "b"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 715,
                        "y": 240,
                        "topX": -800,
                        "topY": -30,
                        "posX": 691,
                        "posY": 215,
                        "postID": 339,
                        "snakeLadder": 62,
                        "stage": "Vaanaprastha",
                        "chakra": "Ajnaa",
                        "info": {
                            "name": "viveka",
                            "quote": [{
                                    "name": "Asuric men have no true knowledge of action or the way of abstention – Gita 16.7"
                                }],
                            "movement": {
                                "displacement": [16, 16, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [16, 16, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["c", "d"],
                        "Letter_Vowels": ["e", "o"],
                        "Letter_Consonants": ["c", "d"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 632,
                        "y": 240,
                        "topX": -800,
                        "topY": -30,
                        "posX": 610,
                        "posY": 215,
                        "postID": 341,
                        "snakeLadder": 0,
                        "stage": "Vaanaprastha",
                        "chakra": "Ajnaa",
                        "info": {
                            "name": "sarasvati",
                            "quote": [{
                                    "name": "The Plane of the Neutral is where the player realises and experiences the sushumna through yogic practices. The sushumna flows through the spine. The idā and the pingalā nāḍī entwine around the sushmna as they meet in the region of the third eye."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 47, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 47, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["e", "f"],
                        "Letter_Vowels": ["u", "a"],
                        "Letter_Consonants": ["l", "f"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 550,
                        "y": 240,
                        "topX": -750,
                        "topY": -30,
                        "posX": 528,
                        "posY": 215,
                        "postID": 343,
                        "snakeLadder": 0,
                        "stage": "Vaanaprastha",
                        "chakra": "Ajnaa",
                        "info": {
                            "name": "yamunā",
                            "quote": [{
                                    "name": "The Plane of the Solar is the male energy in the player. If the player is a female, she will find it difficult to identify with the male in her. However, knowing and realising the male aspect of her self, will help her understand the nature of duality."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["g", "h"],
                        "Letter_Vowels": ["e", "o"],
                        "Letter_Consonants": ["g", "h"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 468,
                        "y": 240,
                        "topX": -593,
                        "topY": -30,
                        "posX": 444,
                        "posY": 215,
                        "postID": 345,
                        "snakeLadder": 0,
                        "stage": "Vaanaprastha",
                        "chakra": "Ajnaa",
                        "info": {
                            "name": "gaṅgā",
                            "quote": [{
                                    "name": "The Plane of the Lunar is the female energy in the player. Ganga is also the only river that is believed to flow through all 3 lokas: heaven, earth and pātāla. Ganga is the purifier and liberator of souls."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["i", "j"],
                        "Letter_Vowels": ["i", "o"],
                        "Letter_Consonants": ["s", "j"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 380,
                        "y": 240,
                        "topX": -416,
                        "topY": -30,
                        "posX": 360,
                        "posY": 215,
                        "postID": 347,
                        "snakeLadder": 0,
                        "stage": "Vaanaprastha",
                        "chakra": "Ajnaa",
                        "toast": "You have landed in <strong>tapaloka</strong> as a result of <strong>sudharma</strong>",
                        "toastTitle": "Got Ladder from 28 to 50",
                        "info": {
                            "name": "tapaloka",
                            "quote": [{
                                    "name": "The Plane of Austerity is the abode of eternal beings engaged in austerities and penance. The player is now in an evolved state, vibrating in the highest realms of creation."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["k", "l"],
                        "Letter_Vowels": ["e", "u"],
                        "Letter_Consonants": ["k", "l"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 302,
                        "y": 240,
                        "topX": -251,
                        "topY": -30,
                        "posX": 277,
                        "posY": 215,
                        "postID": 349,
                        "snakeLadder": 0,
                        "stage": "Vaanaprastha",
                        "chakra": "Ajnaa",
                        "toast": "You have landed in <strong>prithvi</strong> as a result of <strong>tamoguna</strong>",
                        "toastTitle": "It was a Snake from 72 to 51",
                        "info": {
                            "name": "prithvi",
                            "quote": [{
                                    "name": "Earth is a magical loka. Its creation is the result of a lot of austerities. Prithvi is also a symbol of dharma, as she follows the laws of creation selflessly, not distinguishing between different beings."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 51, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 51, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["m", "n"],
                        "Letter_Vowels": ["o", "a"],
                        "Letter_Consonants": ["m", "n"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 212,
                        "y": 240,
                        "topX": -251,
                        "topY": -30,
                        "posX": 194,
                        "posY": 215,
                        "postID": 351,
                        "snakeLadder": 35,
                        "stage": "Vaanaprastha",
                        "chakra": "Ajnaa",
                        "info": {
                            "name": "hiṁsā",
                            "quote": [{
                                    "name": "Violence is a cell that draws the player down to Naraka (hell)."
                                }],
                            "movement": {
                                "displacement": [-17, -17, -17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [-17, -17, -17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["o", "p"],
                        "Letter_Vowels": ["e", "i"],
                        "Letter_Consonants": ["j", "p"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 136,
                        "y": 240,
                        "topX": 0,
                        "topY": -30,
                        "posX": 110,
                        "posY": 215,
                        "postID": 353,
                        "snakeLadder": 0,
                        "stage": "Vaanaprastha",
                        "chakra": "Ajnaa",
                        "info": {
                            "name": "jalaloka",
                            "quote": [{
                                    "name": "The Liquid Plane encapsulates the knowledge of the liquid energy. Humans are formed using 5 elements: prithvi, agni, jala, vāyu and ākāṣ. The player is inspired to realise the power and effects of the jala element within herself."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 53, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 53, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["q", "r"],
                        "Letter_Vowels": ["o", "u"],
                        "Letter_Consonants": ["q", "r"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 50,
                        "y": 240,
                        "topX": 0,
                        "topY": -30,
                        "posX": 28,
                        "posY": 215,
                        "postID": 355,
                        "snakeLadder": 68,
                        "stage": "Vaanaprastha",
                        "chakra": "Ajnaa",
                        "info": {
                            "name": "bhakti",
                            "quote": [{
                                    "name": "But that supreme Purusha has to be won by a bhakti which turn to him alone – Gita 8.22"
                                }],
                            "movement": {
                                "displacement": [14, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [14, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["s", "t"],
                        "Letter_Vowels": ["u", "e"],
                        "Letter_Consonants": ["s", "t"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 50,
                        "y": 150,
                        "topX": 0,
                        "topY": -30,
                        "posX": 28,
                        "posY": 121,
                        "postID": 357,
                        "snakeLadder": 2,
                        "stage": "Sanyaasa",
                        "chakra": "Sahasraara",
                        "info": {
                            "name": "ahaṅkāra",
                            "quote": [{
                                    "name": "While the actions are being entirely done by the modes of Nature, he whose self is bewildered by egoism thinks that it is his “I” which is doing them – Gita 3.27"
                                }],
                            "movement": {
                                "displacement": [-53, -53, -53, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [-53, -53, -53, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["u", "v"],
                        "Letter_Vowels": ["i", "o"],
                        "Letter_Consonants": ["k", "v"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 136,
                        "y": 150,
                        "topX": -40,
                        "topY": 0,
                        "posX": 110,
                        "posY": 121,
                        "postID": 359,
                        "snakeLadder": 0,
                        "stage": "Sanyaasa",
                        "chakra": "Sahasraara",
                        "info": {
                            "name": "oṅkāra",
                            "quote": [{
                                    "name": "Primal & Cosmic vibrations or Ether. The player realises the presence of ether in her body. oṅkāra is the natural sound of her body, a sound that helps her calm and unite all her senses."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["w", "x"],
                        "Letter_Vowels": ["u", "o"],
                        "Letter_Consonants": ["w", "x"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 212,
                        "y": 150,
                        "topX": -214,
                        "topY": 0,
                        "posX": 194,
                        "posY": 121,
                        "postID": 361,
                        "snakeLadder": 0,
                        "stage": "Sanyaasa",
                        "chakra": "Sahasraara",
                        "info": {
                            "name": "vāyuloka",
                            "quote": [{
                                    "name": "The Gaseous State, where the player assumes and realises the formless, lightness of being. The Lord of this cell Mārut is known for his lightness and expansive existence. His son, Hanuman aka Māruti, is known for his supremacy over mass and weight."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 57, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 57, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["y", "z"],
                        "Letter_Vowels": ["o", "a", "e"],
                        "Letter_Consonants": ["y", "z"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 302,
                        "y": 150,
                        "topX": -214,
                        "topY": 0,
                        "posX": 277,
                        "posY": 121,
                        "postID": 363,
                        "snakeLadder": 0,
                        "stage": "Sanyaasa",
                        "chakra": "Sahasraara",
                        "info": {
                            "name": "tejaloka",
                            "quote": [{
                                    "name": "The State of Light is the abode of “Surya”. The player on landing here assumes “zero mass”. She becomes a pure vibration and experiences the state of teja, of light and radiation."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 58, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 58, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["o", "p", "q"],
                        "Letter_Vowels": ["e", "u"],
                        "Letter_Consonants": ["j", "p", "q"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 380,
                        "y": 150,
                        "topX": -548,
                        "topY": 0,
                        "posX": 360,
                        "posY": 121,
                        "postID": 365,
                        "snakeLadder": 0,
                        "stage": "Sanyaasa",
                        "chakra": "Sahasraara",
                        "info": {
                            "name": "satyaloka",
                            "quote": [{
                                    "name": "The World of the Creators, where the player experiences Brahma, the self, the divine consciousness; but does not merge with it."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 59, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 59, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["o", "p", "q"],
                        "Letter_Vowels": ["u", "o"],
                        "Letter_Consonants": ["m", "n"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 468,
                        "y": 150,
                        "topX": -715,
                        "topY": 0,
                        "posX": 444,
                        "posY": 121,
                        "postID": 367,
                        "snakeLadder": 0,
                        "stage": "Sanyaasa",
                        "chakra": "Sahasraara",
                        "toast": "You have landed in <strong>Subuddhi</strong> as a result of <strong>dharma</strong>",
                        "toastTitle": "Got Ladder from 22 to 60",
                        "info": {
                            "name": "subuddhi",
                            "quote": [{
                                    "name": "Positive Intellect. The player guided by subuddhi will keep on the correct karmic path. Intellect which has no ego in it, is Subuddhi."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["y", "z"],
                        "Letter_Vowels": ["o", "u"],
                        "Letter_Consonants": ["s", "t"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 550,
                        "y": 150,
                        "topX": -800,
                        "topY": 0,
                        "posX": 528,
                        "posY": 121,
                        "postID": 369,
                        "snakeLadder": 3,
                        "stage": "Sanyaasa",
                        "chakra": "Sahasraara",
                        "info": {
                            "name": "durbuddhi",
                            "quote": [{
                                    "name": "Weak Mindedness is the experience of a clouded perception. On many occasions, this momentary lapse of reason is the result of anger and frustration."
                                }],
                            "movement": {
                                "displacement": [-58, -58, -58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [-58, -58, -58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["s", "t"],
                        "Letter_Vowels": ["o", "a", "e"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 632,
                        "y": 150,
                        "topX": -800,
                        "topY": 0,
                        "posX": 610,
                        "posY": 121,
                        "postID": 371,
                        "snakeLadder": 0,
                        "stage": "Sanyaasa",
                        "chakra": "Sahasraara",
                        "toast": "You have landed in <strong>Sukhaloka</strong> as a result of <strong>viveka</strong>",
                        "toastTitle": "Got Ladder from 46 to 62",
                        "info": {
                            "name": "sukhaloka",
                            "quote": [{
                                    "name": "Plane of Satisfaction. The player is in the later stages of life. She as a seeker, is satisfied with her achievements and experiences Sukha. Immersed in this experience she feels detached from materialistic needs."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["a", "b"],
                        "Letter_Vowels": ["a", "e"],
                        "Letter_Consonants": ["h", "b"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 715,
                        "y": 150,
                        "topX": -800,
                        "topY": 0,
                        "posX": 691,
                        "posY": 121,
                        "postID": 373,
                        "snakeLadder": 13,
                        "stage": "Sanyaasa",
                        "chakra": "Sahasraara",
                        "info": {
                            "name": "tāmasloka",
                            "quote": [{
                                    "name": "What is action and what is inaction, as to this even the sages are perplexed and deluded – Gita 4.16"
                                }],
                            "movement": {
                                "displacement": [-50, -50, -50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [-50, -50, -50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["c", "d"],
                        "Letter_Vowels": ["e", "e"],
                        "Letter_Consonants": ["c", "d"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 715,
                        "y": 50,
                        "topX": -800,
                        "topY": 0,
                        "posX": 691,
                        "posY": 27,
                        "postID": 375,
                        "snakeLadder": 0,
                        "stage": "Sanyaasa",
                        "chakra": "Vaikuntha",
                        "info": {
                            "name": "prakṛitiloka",
                            "quote": [{
                                    "name": "Prakriti is the cause of the body's and the sense's evolution – Gita 13.20"
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["e", "f", "g"],
                        "Letter_Vowels": ["e", "o", "u"],
                        "Letter_Consonants": ["l", "f", "g"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 632,
                        "y": 50,
                        "topX": -800,
                        "topY": 0,
                        "posX": 610,
                        "posY": 27,
                        "postID": 377,
                        "snakeLadder": 0,
                        "stage": "Sanyaasa",
                        "chakra": "Vaikuntha",
                        "info": {
                            "name": "dushkṛitloka",
                            "quote": [{
                                    "name": "The ill-minded and the ignorant are victims of maya and do not worship Me – Gita 7.15"
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["h", "i"],
                        "Letter_Vowels": ["a", "e"],
                        "Letter_Consonants": ["h", "s"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 550,
                        "y": 50,
                        "topX": -750,
                        "topY": 0,
                        "posX": 528,
                        "posY": 27,
                        "postID": 379,
                        "snakeLadder": 0,
                        "stage": "Sanyaasa",
                        "chakra": "Vaikuntha",
                        "toast": "You have landed in <strong>ānanda loka</strong> as a result of <strong>gyāna</strong>",
                        "toastTitle": "Got Ladder from 37 to 66",
                        "info": {
                            "name": "ānanda loka",
                            "quote": [{
                                    "name": "Abode of Brahma is the abode of supreme bliss. Ānanda loka is the inner most sheath, covering the cosmic consciousness."
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 66, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 66, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["j", "k", "l"],
                        "Letter_Vowels": ["o", "i", "o"],
                        "Letter_Consonants": ["j", "k", "l"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 468,
                        "y": 50,
                        "topX": -593,
                        "topY": 0,
                        "posX": 444,
                        "posY": 27,
                        "postID": 549,
                        "snakeLadder": 0,
                        "stage": "Sanyaasa",
                        "chakra": "Vaikuntha",
                        "toast": "You have landed in <strong>rudra loka</strong> as a result of <strong>suvidyā</strong>",
                        "toastTitle": "Got Ladder from 45 to 67",
                        "endingToast": "You need to throw 1, 2, 3, 4 or 5",
                        "info": {
                            "name": "rudra loka",
                            "quote": [{
                                    "name": "Rudra loka is a group of Vedic Godheads, eleven in number: Hara, Bahurupa, Tryambaka, Aparajita, Vrishakapi, Shambhu, Kapardi, Raivata, Mrigavyadha, Sharva and Kapila.  Shiva is the Lord of Rudraloka. 'I am Shiva among the Rudras' - Gita 10.23"
                                },
                                {
                                    "name": "Which are the Rudras ? The ten organs in the human body, with the prana as the tenth and the atma as the eleventh. When they depart from this mortal body, they make (one’s relatives) weep. Because they then make them weep, therefore they are called Rudras."
                                }
                            ],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 67, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 67, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["m", "n"],
                        "Letter_Vowels": ["e", "u"],
                        "Letter_Consonants": ["m", "n"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 380,
                        "y": 40,
                        "topX": -416,
                        "topY": 0,
                        "posX": 360,
                        "posY": 27,
                        "postID": 551,
                        "snakeLadder": 0,
                        "stage": "Sanyaasa",
                        "chakra": "Vaikuntha",
                        "toast": "You have landed in <strong>vaikuṇṭha</strong> as a result of <strong>bhakti</strong>",
                        "toastTitle": "Got Ladder from 54 to 68",
                        "info": {
                            "name": "vaikuṇṭha",
                            "quote": [{
                                    "name": "I am equal in all existences, none is dear to Me, none hated – Gita 9.29"
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -62, -62, -67],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -62, -62, -67],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["o", "p", "q"],
                        "Letter_Vowels": ["o", "a", "e"],
                        "Letter_Consonants": ["j", "p", "q"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 302,
                        "y": 50,
                        "topX": -251,
                        "topY": 0,
                        "posX": 277,
                        "posY": 27,
                        "postID": 381,
                        "snakeLadder": 0,
                        "stage": "Sanyaasa",
                        "chakra": "Vaikuntha",
                        "toast": "You have landed in <strong>brahma loka</strong> as a result of <strong>dāya</strong>",
                        "toastTitle": "Got Ladder from 17 to 69",
                        "endingToast": "You need to throw 1, 2 or 3",
                        "info": {
                            "name": "brahma loka",
                            "quote": [{
                                    "name": "I am the birth of everything and from me All proceeds into development of action and movement"
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["r", "s", "t"],
                        "Letter_Vowels": ["i", "o", "u"],
                        "Letter_Consonants": ["r", "s", "t"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 212,
                        "y": 50,
                        "topX": -84,
                        "topY": 0,
                        "posX": 194,
                        "posY": 27,
                        "postID": 553,
                        "snakeLadder": 0,
                        "stage": "Sanyaasa",
                        "chakra": "Vaikuntha",
                        "endingToast": "You need to throw 1 or 2",
                        "info": {
                            "name": "sattvaguṇa",
                            "quote": [{
                                    "name": "Sattva unites with its purity and luminosity; its points of reference are happiness and knowledge – Gita 14.6"
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["u", "v"],
                        "Letter_Vowels": ["u", "e"],
                        "Letter_Consonants": ["k", "v"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 136,
                        "y": 50,
                        "topX": 0,
                        "topY": 0,
                        "posX": 110,
                        "posY": 27,
                        "postID": 555,
                        "snakeLadder": 0,
                        "stage": "Sanyaasa",
                        "chakra": "Vaikuntha",
                        "endingToast": "You need to throw 1",
                        "info": {
                            "name": "rajoguṇa",
                            "quote": [{
                                    "name": "Rajas is the quality of passion and causes unrest and attachment: it unites by creating attachment to action – Gita 14.7"
                                }],
                            "movement": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 71, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 999],
                                "state": [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
                                "return": [999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 71, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["w", "x"],
                        "Letter_Vowels": ["i", "o"],
                        "Letter_Consonants": ["w", "x"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }, {
                        "x": 50,
                        "y": 50,
                        "topX": 0,
                        "topY": 0,
                        "posX": 28,
                        "posY": 27,
                        "postID": 557,
                        "snakeLadder": 51,
                        "stage": "Sanyaasa",
                        "chakra": "Vaikuntha",
                        "info": {
                            "name": "tamoguṇa",
                            "quote": [{
                                    "name": "Tamas is born of ignorance; it unites through unknowing, torpor and sleep – Gita 14.8"
                                }],
                            "movement": {
                                "displacement": [-21, -21, -21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            },
                            "movementRule": {
                                "displacement": [-21, -21, -21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "state": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
                                "return": [999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999, 999],
                                "specialMove": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "diceState": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                            }
                        },
                        "give": [0],
                        "to": [],
                        "auto_give": [0],
                        "specialMoveTrigger": [0, 0],
                        "cell_type": 0,
                        "treasure_transfer": [0],
                        "Letter_Collection": ["y", "z"],
                        "Letter_Vowels": ["u", "o"],
                        "Letter_Consonants": ["y", "z"],
                        "questions": [],
                        "images": [],
                        "options": [],
                        "answers": [],
                        "game_restart_exit": [0, 0],
                        "passing_direction": [0],
                        "landing_direction": [1],
                        "Dice_state": [1]
                    }
                ];
                positionConfig = {
                    "initCellPos": 68,
                    "initPlayerPos": 68,
                    "initTargetPos": 68,
                    "shortTitle": "BY",
                    "retreatCellResult": 6,
                    "retreatCellOnCount": 3,
                    "initialMoveResult": 6,
                    "firstLandingCell": 6,
                    "cellDimentionX": 95,
                    "cellDimentionY": 95,
                };
                /*game.load.json('gameconfig', 'assets/game/gameconfig.json');*/
            },
            create() {
                var _changeinstance = this;
                /* confJson = game.cache.json.get('gameconfig');*/
                positions = gameconfig;
                posConfig = positionConfig;
                Dice = function (x, y) {
                    var _diceinstance = this;
                    Phaser.Sprite.call(this, game, x, y, 'dice');
                    this.tween;
                    this.anim;
                    // this.blurX = game.add.filter("BlurX");  // Blur filters taken from
                    // this.blurY = game.add.filter("BlurY");  // Filters -> blur example
                    this.anchor.setTo(0.5, 0.5);
                    var i;
                    var frames = [];
                    for (i = 0; i < 15; i++) {
                        frames[i] = game.rnd.pick([0, 1, 2, 3, 4, 5]);
                    }
                    // the animation displays the frames from the spritesheet in a random order
                    this.anim = this.animations.add("roll", frames);
                    this.anim.onComplete.add(this.rollComplete, this);
                    this.frame = 6;
                    game.add.existing(this);
                };
                Dice.prototype = Object.create(Phaser.Sprite.prototype);
                Dice.prototype.constructor = Dice;
                Dice.prototype.roll = function () {
                    // this.filters = [this.blurX, this.blurY];
                    this.animations.play("roll", 20);
                };
                Dice.prototype.rollComplete = function () {
                    this.filters = null;
                    diceSound.play();
                    diceRolled++;
                    board.scale.set(1);
                    board.position.set(0);
                    if (this.frame == 6) {
                        if (diceRolled == 1) {
                            result = 6;
                        }
                        else {
                            result = game.rnd.integerInRange(1, 6);
                        }
                        this.frame = result - 1;
                    }
                    else if (this.frame > 6) {
                        bLadderSnakeFacePressed = true;
                    }
                    _changeinstance.initiatePawnMovement();
                };
                Dice.prototype.update = function () {
                    if (this.anim.isPlaying) {
                        this.angle = game.rnd.angle();
                    }
                };
                Dice.prototype.isAnimationRunning = function () {
                    return this.anim.isPlaying;
                };
                Dice.prototype.setFrame = function (Frameval) {
                    this.frame = Frameval;
                };
                Dice.prototype.value = function () {
                    switch (this.frame) {
                        case 0:
                            return 0;
                        case 1:
                            return 1;
                        case 2:
                            return 2;
                        case 3:
                            return 3;
                        case 4:
                            return 4;
                        case 5:
                            return 5;
                        case 6:
                            return 6;
                        case 7:
                            return 7;
                        case 8:
                            return 8;
                        case 9:
                            return 9;
                        case 10:
                            return 10;
                        case 11:
                            return 11;
                        case 12:
                            return 12;
                        case 13:
                            return 13;
                        default:
                            return null;
                    }
                };
                board = game.add.sprite(0, 0, "board");
                // playerSprite = game.add.sprite(0, 0);
                // board.addChild(playerSprite);
                playerSprite = game.add.sprite(0, 0, "player");
                board.addChild(playerSprite);
                // game.physics.arcade.enable(player);
                player.image = playerSprite;
                dice = game.add.button(365, 795, "trans_dice", this.rollDiceNew, this);
                bank_image = game.add.button(630, 790, "bank", this.transferCowries, this);
                bank_image.scale.set(0.2, 0.2);
                bank_image.visible = false;
                happiness_recieved = game.add.button(630, 805, "happiness_recieved", this.transferCowries, this);
                happiness_recieved.scale.set(0.1, 0.2);
                happiness_recieved.visible = false;
                // reset_game=game.add.button(100,805,"reset_game",this.game.state.restart(),this);
                // reset_game.scale.set(0.1,0.1);
                // reset_game.visible=true;
                stageTxt = game.add.text(50, 830, "Stage - ", style);
                chakraTxt = game.add.text(580, 830, "Chakra - ", style);
                // bank_image = game.add.button(630,805,"bank",this.transferCowries,this);
                // bank_image.scale.set(0.2,0.2);
                // bank_image.visible=false;
                // bank_transfer=game.add.image(680,680,"bank_transfer");
                // bank_transfer.scale.set(0.55,0.56);
                // bank_transfer.visible=true;
                var style = { font: "50px Arial", fill: "#", wordWrap: true, wordWrapWidth: bank_image.width, align: "center", backgroundColor: "#ffff00" };
                oTxtBankBalance = game.add.text(800, 885, "0", style);
                oTxtBankBalance.visible = false;
                oTxtBankBalance.anchor.set(1);
                dice.frame = 12;
                this.diceGroup = this.game.add.group();
                Diceinstance = this.diceGroup;
                this.dice = [];
                this.oTxtBankBalance = this.game.add.text(this.world.centerX, 10, "");
                this.oTxtBankBalance.fill = "#d3d3d3";
                //  for (var i=0; i < 2; i++) {
                var d = new Dice(399, 845);
                this.diceGroup.add(d);
                //  }
                // roll the dice when a mouse button is clicked
                // this.game.input.onDown.add(this.rollDiceNew,this);
                this.retriveGameState();
                this.retrieveCellInfo(player.position);
                diceSound = game.add.audio('diceSound');
                ladderSound = game.add.audio('ladderSound');
                snakeSound = game.add.audio('snakeSound');
                // board.inputEnabled = true;
                // board.input.enableDrag();
                // board.events.onDragUpdate.add(this.dragUpdate, this);
                // board.enableBody = true;      
                initHeight = board.height;
                this.addTapAreas();
                this.enablePinchToZoom();
            },
            update() {
                //<------ Riwayat-e-dilli code STARTS --------->
                /* if ((player.targetPosition != player.position && (player.movementTween == null || !player.movementTween.isRunning))){
                   // console.log("Target "+player.targetPosition);
                   if (player.targetPosition > player.position && bLadderSnakeFacePressed == false) {
                     if(positions[player.position].passing_direction[0]==0)
                     {
                       
                       player.position+=(player.global_direction);
                     }
                     else if(positions[player.position].passing_direction[0]<0)
                     {
                       player.global_direction=positions[player.position].passing_direction[0];
                       player.targetPosition =player.position-(player.targetPosition-player.position);
                       player.position+=(player.global_direction);
                     }
                       this.movePlayer();
                   } else {
                     // alert("Got Snake");
         
                     
                     
                     // Got Snake
                     // console.log("Here");
                     player.position = player.targetPosition;
                     // alert(player.targetPosition);
                     this.movePlayer();
                     bDicePause = false;
                   }
                   // console.log("Target Position -- "+player.targetPosition);
                   // console.log("Player Position -- "+player.position);
                   player.current_cell_type=positions[player.position].cell_type;
                   // console.log("Player current cell Type :: "+player.current_cell_type);
                 }
         
                 if (player.targetPosition == player.position && (player.movementTween == null || !player.movementTween.isRunning)) {
                   // console.log("Old State "+iOld_state);
                   player.current_cell_type=positions[player.position].cell_type;
                   // console.log("Player current cell Type :: "+player.current_cell_type);
                   var frame=0;
                   this.diceGroup.forEach(function(item) {
         
                     frame=item.value();
                   
                   // item.setFrame(2);
                   });
                   if (frame < 6) {
                     if(iSnakeLadderBase < 0 && iFrame==0) {
                       bDicePause = true;
                       Diceinstance.forEach (function(item) {
         
                         item.setFrame(7);
                       
                       // item.setFrame(2);
                       });
         
                       // console.log("Player in first if condition");
                       
                       this.retrieveCellInfo(player.position);
                     } else if(iSnakeLadderBase > 0 && iFrame==0) {
                       bDicePause = true;
                       
                       Diceinstance.forEach(function(item) {
         
                         item.setFrame(8);
                       
                       // item.setFrame(2);
                       });
                       // console.log("Player in second if condition");
                       this.retrieveCellInfo(player.position);
                     } else {
                       bDicePause = false;
                       if (player.position == posConfig.initPlayerPos) {
                         game.time.events.add(400, function() {
                           Diceinstance.forEach(function(item) {
         
                             item.setFrame(6);
                           
                           // item.setFrame(2);
                           });
                           // console.log("Player in third if condition");
                         });
                       } else {
                         game.time.events.add(400, function() {
                           Diceinstance.forEach(function(item) {
         
                             item.setFrame(6);
                           
                           // item.setFrame(2);
                           });
                         //  console.log("Player in fourth if condition");
                         });
                       }
                       this.retrieveCellInfo(player.position);
         
                     }
                     this.saveGameState();
                     // console.log("Reverse "+ iReverseTo);
                   } else if (frame == 7 && bLadderSnakeFacePressed == true && iFrame==0) {
                     bLadderSnakeFacePressed = false;
                     iSnakeLadderBase = 0;
                     bDicePause = false;
                     this.diceGroup.forEach(function(item) {
         
                       item.setFrame(6);
                     
                     // item.setFrame(2);
                     });
                     // console.log("Player in fifth if condition");
                     this.retrieveCellInfo(player.position);
                     this.saveGameState();
                     // console.log("It's a Snake");
                   } else if (frame == 8 && bLadderSnakeFacePressed == true && iFrame==0) {
                     bLadderSnakeFacePressed = false;
                     iSnakeLadderBase = 0;
                     bDicePause = false;
                     console.log("Successfully setting face back to Roll HERE \n");
                     this.diceGroup.forEach(function(item) {
         
                       item.setFrame(6);
                     
                     // item.setFrame(2);
                     });
                     // console.log("Player in sixth if condition");
                     this.retrieveCellInfo(player.position);
                     this.saveGameState();
                     // console.log("It's a Ladder");
                   }
                   else if(iFrame>0)
                   {
                     // alert("Frame of the site :: "+iFrame);
                     console.log("The value of frame is  :: "+frame+ "\n");
                     console.log("The value of iFrame is :: "+ iFrame+ "\n");
                     console.log("The value of bLadderSnakeFacePressed is :: " + bLadderSnakeFacePressed + "\n");
         
                     Diceinstance.forEach(function(item) {
           
                       item.setFrame(iFrame);
                     
                     // item.setFrame(2);
                     });
           
           
           
                   }  else  {
         
                     // console.log("value of iFrame is  :: "+iFrame);
         
                     Diceinstance.forEach(function(item) {
         
                       item.setFrame(6);
                     
                     // item.setFrame(2);
                     });
         
                   }
         
                   if(positions[player.position].landing_direction[0]==1)
                     {
                        player.global_direction=1;
                     }
                   else if(positions[player.position].landing_direction[0]==0)
                     {
                        player.global_direction=0;
                     }
                     
         
                 }*/
                //<------ Riwayat-e-dilli code ENDS --------->
                //<------BUDDHIYOGA CODE STARTS------>
                //<----- TOKEN PASSING/MOVING PART STARTS----->
                if (player.targetPosition != player.position && (player.movementTween == null || !player.movementTween.isRunning)) {
                    // console.log("Target "+player.targetPosition);
                    if (player.targetPosition > player.position && bLadderSnakeFacePressed == false) {
                        player.position++;
                        this.movePlayer();
                    }
                    else {
                        // Got Snake
                        // console.log("Here");
                        player.position = player.targetPosition;
                        // alert(player.targetPosition);
                        this.movePlayer();
                        bDicePause = false;
                    }
                    // console.log("Target Position -- "+player.targetPosition);
                    // console.log("Player Position -- "+player.position);
                }
                //<----- TOKEN PASSING/MOVING PART ENDS----->
                //<----- TOKEN LANDING ON CELL PART STARTS----->
                if (player.targetPosition == player.position && (player.movementTween == null || !player.movementTween.isRunning)) {
                    console.log("Old State " + iOld_state);
                    var framenew = 0;
                    Diceinstance.forEach(function (item) {
                        framenew = item.value();
                        // item.setFrame(2);
                    });
                    if (framenew < 6) {
                        if (iSnakeLadderBase < 0) {
                            bDicePause = true;
                            // dice.frame = 7;
                            Diceinstance.forEach(function (item) {
                                item.setFrame(7);
                                // item.setFrame(2);
                            });
                            this.retrieveCellInfo(player.position);
                        }
                        else if (iSnakeLadderBase > 0) {
                            bDicePause = true;
                            // dice.frame = 8;
                            Diceinstance.forEach(function (item) {
                                item.setFrame(8);
                                // item.setFrame(2);
                            });
                            this.retrieveCellInfo(player.position);
                        }
                        else {
                            bDicePause = false;
                            if (player.position == posConfig.initPlayerPos) {
                                game.time.events.add(400, function () {
                                    Diceinstance.forEach(function (item) {
                                        item.setFrame(6);
                                        // item.setFrame(2);
                                    });
                                });
                            }
                            else {
                                game.time.events.add(400, function () {
                                    Diceinstance.forEach(function (item) {
                                        item.setFrame(6);
                                        // item.setFrame(2);
                                    });
                                });
                            }
                            this.retrieveCellInfo(player.position);
                        }
                        this.saveGameState();
                        // console.log("Reverse "+ iReverseTo);
                    }
                    else if (framenew == 7 && bLadderSnakeFacePressed == true) {
                        bLadderSnakeFacePressed = false;
                        iSnakeLadderBase = 0;
                        bDicePause = false;
                        Diceinstance.forEach(function (item) {
                            item.setFrame(6);
                            // item.setFrame(2);
                        });
                        this.retrieveCellInfo(player.position);
                        this.saveGameState();
                        // console.log("It's a Snake");
                    }
                    else if (framenew == 8 && bLadderSnakeFacePressed == true) {
                        bLadderSnakeFacePressed = false;
                        iSnakeLadderBase = 0;
                        bDicePause = false;
                        Diceinstance.forEach(function (item) {
                            item.setFrame(6);
                            // item.setFrame(2);
                        });
                        this.retrieveCellInfo(player.position);
                        this.saveGameState();
                        // console.log("It's a Ladder");
                    }
                }
                //<----- TOKEN LANDING ON CELL PART ENDS----->
            },
            rollDiceNew() {
                // this.text.setText("Total: ");
                this.diceGroup.callAll("roll", null);
                var timer = this.game.time.events.add(100, this.rollDiceCompleteNew, this);
            },
            rollDiceCompleteNew() {
                var rollComplete = true;
                this.diceGroup.forEach(function (item) {
                    if (item.isAnimationRunning())
                        rollComplete = false;
                }, this);
                if (rollComplete) {
                    var total = 0;
                    this.diceGroup.forEach(function (item) {
                        total += item.value();
                        // item.rollDice();
                        // item.setFrame(2);
                    });
                    // this.text.setText("Total: "+total);
                    // alert("Total Value :: "+total);
                    // this.initiatePawnMovement();
                }
                else {
                    var timer = this.game.time.events.add(100, this.rollDiceCompleteNew, this);
                }
            },
            rollDice() {
                diceSound.play();
                diceRolled++;
                board.scale.set(1);
                board.position.set(0);
                if (dice.frame == 6) {
                    //  result = game.rnd.integerInRange(1, 6);
                    //  if(positions[player.position].cellno!=27 && positions[player.position].cellno!=36 && positions[player.position].cellno!=41 )
                    //  {
                    //   result = 4;
                    //  }
                    //  else if(positions[player.position].cellno==27)
                    //   {
                    //     result=1;
                    //   }
                    // else if(positions[player.position].cellno==41)
                    //   {
                    //     result=2;
                    //   }
                    // if(positions[player.position].cellno==2)
                    // {
                    //   result=2;
                    // }
                    //  result=1;
                    // if(diceRolled==1)
                    // {
                    //   result=simulator[0];
                    // }
                    // else if(diceRolled==2)
                    // {
                    //   result=simulator[1];
                    // }
                    // else
                    // {
                    //   result=simulator[2];
                    // }
                    if (result == 1 && game_start == false) {
                        fromgamestate.movePlayer();
                        // player.targetPosition=0;
                    }
                    dice.frame = result - 1;
                    // this.initiatePawnMovement();
                }
                else if (dice.frame > 6) {
                    bLadderSnakeFacePressed = true;
                    // this.initiatePawnMovement();
                }
                // console.log("Current Target Position - " + player.targetPosition + " - Current Position " + player.position);
                // else if (dice.frame == 7) {
                //   isLadder = 2;
                // } else if (dice.frame == 8) {
                //   isLadder = 1;
                // }
            },
            initiatePawnMovement() {
                //<-------Riwayat-e-Dilli code STARTS ----->
                /*if (bDicePause == false) {
                 
                  iRoll = result;
                  
                  iOld_state = iCurrent_state;
                 
                  if(positions[player.position].specialMoveTrigger[special_move_index]==1)
                  {
                    iCurrent_state = positions[player.position].info.movementRule.state[(iRoll * 3) + iOld_state];
                  }
                  else
                  {
                    iCurrent_state = positions[player.position].info.movement.state[(iRoll * 3) + iOld_state];
        
                  }
                  
                  // console.log("** Current State -- "+iCurrent_state);
                  if (iCurrent_state == 999) {
                    iCurrent_state = iOld_state;
                  }
                  if(positions[player.position].specialMoveTrigger[special_move_index]==1)
                  {
                    iDisplacement = positions[player.position].info.movementRule.displacement[iOld_state];
                  }
                  else
                  {
                    iDisplacement = positions[player.position].info.movement.displacement[iOld_state];
                  }
                  // console.log("** Calculated Zero Displacement is "+iDisplacement+ "For a Roll of "+iRoll);
                  if (iDisplacement == 0) {
                    if(positions[player.position].specialMoveTrigger[special_move_index]==1){
                          iDisplacement = positions[player.position].info.movementRule.displacement[(iRoll * 3) + iOld_state];
                    }
                    else
                    {
                      iDisplacement = positions[player.position].info.movement.displacement[(iRoll * 3) + iOld_state];
                    }
                    
                  }
                 
                  if (iDisplacement < 999) {
                   
                    if(positions[player.position].specialMoveTrigger[special_move_index]==1)
                    {
                      iSnakeLadderBase = positions[player.position+iDisplacement].info.movementRule.displacement[iCurrent_state];
                    
                    }
                    else
                    {
                      iSnakeLadderBase = positions[player.position+iDisplacement].info.movement.displacement[iCurrent_state];
        
                    }
                    
                  }
                 
                  if ((iDisplacement != 0) && (iDisplacement < 999) && (bDicePause == false)) {
                    console.log("** Ready to set Target Position")
                    iOld_ReverseTo = iReverseTo;
                    if(positions[player.position].specialMoveTrigger[special_move_index]==0)
                    {
                      iReverseTo = positions[player.position].info.movement.return[(iRoll * 3) + iOld_state];
                    }
                    else
                    {
                      iReverseTo = positions[player.position].info.movementRule.return[(iRoll * 3) + iOld_state];
                    }
                      if (iReverseTo == 999) {
                      iReverseTo = iOld_ReverseTo;
                    }
                    console.log("** Reverse "+iReverseTo);
                    player.targetPosition = player.position + iDisplacement;
                  } else if (iDisplacement == 999) {
                    player.targetPosition = iReverseTo;
                  }
                  
                 
                } else {
                 
                  player.targetPosition = player.position + iSnakeLadderBase;
                 
                }
                //REVIEW -- later convert this section to some cell init process
                if(positions[player.position].specialMoveTrigger[special_move_index]==0)
                {
                 
                  special_move_index=0
                  HomePage.temp_player_array=[];
                  bank_image.visible=false;
                  oTxtBankBalance.visible=false;
                }
                if(positions[player.position].specialMoveTrigger[special_move_index]==1)
                {
                  iFrame = positions[player.targetPosition].info.movementRule.diceState[(iRoll * 3) + iCurrent_state];
                  
                }
                else if(positions[player.position].specialMoveTrigger[special_move_index]==0 )
                {
                  iFrame = positions[player.targetPosition].info.movement.diceState[(iRoll * 3) + iCurrent_state];
                 
                }
                
               
              if((move_state==2 || move_state==5) && player.position!=player.targetPosition )
              {
              let i=0;
              positions[player.position].to.forEach(element => {
        
              this["bank_transfer_"+i].visible=false;
              
              
              i++;
              });
              move_state=0;
            }
              
              if(positions[player.targetPosition].auto_give[0]==0 && positions[player.targetPosition].give[0]>0 && positions[player.targetPosition].specialMoveTrigger[special_move_index]==1)
              {
                let i=0;
               
                positions[player.targetPosition].to.forEach(element => {
                 this["bank_transfer_"+i]=game.add.image(positions[element-1].topX,positions[element-1].topY,"bank_transfer");
                 this["bank_transfer_"+i].scale.set(0.55,0.56);
                 this["bank_transfer_"+i].visible=true;
                 i++;
                });
                move_state=1;
              }
              else if(positions[player.targetPosition].auto_give[0]==0 && positions[player.targetPosition].give[0]>0  && positions[player.targetPosition].specialMoveTrigger[special_move_index]!=1 )
              {
                
                let i=0;
               
                 positions[player.targetPosition].to.forEach(element => {
                 this["bank_transfer_"+i]=game.add.image(positions[element-1].topX,positions[element-1].topY,"bank_transfer");
                 this["bank_transfer_"+i].scale.set(0.55,0.56);
                 this["bank_transfer_"+i].visible=true;
                 i++;
                });
                move_state=2;
              }
              else if(positions[player.targetPosition].auto_give[0]<0 && positions[player.targetPosition].give[0]>0 && positions[player.targetPosition].specialMoveTrigger[special_move_index]!=1  )
              {
               
                let i=0;
                
                 positions[player.targetPosition].to.forEach(element => {
                 this["bank_transfer_"+i]=game.add.image(positions[element-1].topX,positions[element-1].topY,"bank_transfer");
                 this["bank_transfer_"+i].scale.set(0.55,0.56);
                 this["bank_transfer_"+i].visible=true;
                 i++;
                });
        
                iFrame=7;
        
                move_state=5;
                HomePage.cellno=positions[player.targetPosition].cellno;
                
              }
              else if(positions[player.targetPosition].auto_give[0]==1 && positions[player.targetPosition].give[0]>0 && positions[player.targetPosition].specialMoveTrigger[special_move_index]!=1  )
              {
                positions[positions[player.targetPosition].to[0]-1].wallet=positions[positions[player.targetPosition].to[0]-1].wallet+positions[player.targetPosition].give[0];
                player.wallet=player.wallet-positions[player.targetPosition].give[0];
                HomePage.wallet=player.wallet;
                move_state=3;
                
              }
              else
              {
                move_state=0;
              }
              that.transferTreasure();
             
             
              if(letter_bank.length<=14)
              {
                letter_bank.push(positions[player.targetPosition].Letter_Consonants[game.rnd.integerInRange(0, (positions[player.targetPosition].Letter_Consonants.length-1))]);
                letter_bank.push(positions[player.targetPosition].Letter_Vowels[game.rnd.integerInRange(0, (positions[player.targetPosition].Letter_Vowels.length-1))]);
               
              }
              else
              {
                HomePage.letter_bank_full_status=true;
                bDicePause=true;
        
              }
              if(iFrame>0)
                {
                  
                  Diceinstance.forEach(function(item) {
        
                    item.setFrame(iFrame);
                  
                  
                  });
        
        
        
                }
        
              
                that.callfn(positions[player.targetPosition].postID,positions[player.targetPosition].name,positions[player.targetPosition].desc,positions[player.targetPosition].blogID,positions[player.targetPosition].lat,positions[player.targetPosition].long,positions[player.targetPosition].wallet);
               
                HomePage.temp_game_restart_exit=positions[player.targetPosition].game_restart_exit;
                this.specialMoveTrans(positions[player.position].info.movement.specialMove[(iRoll * 3) + iOld_state],positions[player.position].cellno);
                this.quizTrans(player.targetPosition);
        
              
                HomePage.recieve_hapyness=false;*/
                //<-------Riwayat-e-Dilli code ENDS ----->
                //<----- BUDDHIYOGA GAME STARTS---->
                if (bDicePause == false) {
                    // iRoll = dice.frame + 1;
                    // iRoll = 6;
                    iRoll = result;
                    // console.log("iRoll Set - "+iRoll);
                    iOld_state = iCurrent_state;
                    // console.log("State of Six Throw Set "+ iOld_state);
                    iCurrent_state = positions[player.position].info.movement.state[(iRoll * 3) + iOld_state];
                    // console.log("Current State -- "+iCurrent_state);
                    if (iCurrent_state == 999) {
                        iCurrent_state = iOld_state;
                    }
                    iDisplacement = positions[player.position].info.movement.displacement[iOld_state];
                    //console.log("Calculated Zero Displacement is "+iDisplacement+ "For a Roll of "+iRoll);
                    if (iDisplacement == 0) {
                        iDisplacement = positions[player.position].info.movement.displacement[(iRoll * 3) + iOld_state];
                        //console.log("Re-calculating Displacement is "+iDisplacement+ "For a Roll of "+iRoll);
                    }
                    // console.log ("Player.Position - " + player.position + " iDisplacement - " + iDisplacement);
                    // console.log ("Return Cell " + iReverseTo)
                    if (iDisplacement < 999) {
                        iSnakeLadderBase = positions[player.position + iDisplacement].info.movement.displacement[iCurrent_state];
                    }
                    console.log("Calculated Displacement is " + iDisplacement + " -- For a Roll of " + iRoll);
                    if ((iDisplacement != 0) && (iDisplacement < 999) && (bDicePause == false)) {
                        // console.log("Ready to set Target Position")
                        iOld_ReverseTo = iReverseTo;
                        iReverseTo = positions[player.position].info.movement.return[(iRoll * 3) + iOld_state];
                        if (iReverseTo == 999) {
                            iReverseTo = iOld_ReverseTo;
                        }
                        // console.log("Reverse "+iReverseTo);
                        player.targetPosition = player.position + iDisplacement;
                        // player.targetPosition = player.position + iDisplacement;
                    }
                    else if (iDisplacement == 999) {
                        player.targetPosition = iReverseTo;
                    }
                    // console.log("Going to the target - " + player.targetPosition + " - Current Position " + player.position);
                }
                else {
                    // console.log("Dice Status -- "+bDicePause);
                    // player.targetPosition = player.position + iDisplacement;
                    player.targetPosition = player.position + iSnakeLadderBase;
                    // console.log("GO TO -- "+player.targetPosition);
                    // console.log("SNAKE LADDER BASE -- "+iSnakeLadderBase);
                    // bDicePause = false;
                    // dice.frame = 6;
                }
                that.callfn(positions[player.targetPosition].postID, positions[player.targetPosition].info.name, positions[player.targetPosition].info.quote[0].name);
                if (letter_bank.length <= 14) {
                    letter_bank.push(positions[player.targetPosition].Letter_Consonants[game.rnd.integerInRange(0, (positions[player.targetPosition].Letter_Consonants.length - 1))]);
                    letter_bank.push(positions[player.targetPosition].Letter_Vowels[game.rnd.integerInRange(0, (positions[player.targetPosition].Letter_Vowels.length - 1))]);
                    // alert("Letter Entered Vowels :: "+positions[player.targetPosition].Letter_Vowels[game.rnd.integerInRange(0, (positions[player.targetPosition].Letter_Vowels.length-1))]);
                    // alert("Letter Entered Vowels :: "+positions[player.targetPosition].Letter_Consonants[game.rnd.integerInRange(0, (positions[player.targetPosition].Letter_Consonants.length-1))]);
                }
                else {
                    HomePage_1.letter_bank_full_status = true;
                    // bDicePause=true;
                }
                //<----- BUDDHIYOGA GAME ENDS---->
                // console.log("** Dice Frame " + dice.frame);
            },
            movePlayer() {
                if (player.movementTween != null) {
                    player.movementTween.stop(); //remove the last tween from the manager, will be garbage collected
                }
                player.movementTween = game.add.tween(player.image).to({
                    x: positions[player.position].x,
                    y: positions[player.position].y
                }, 600, Phaser.Easing.Linear.None, true);
                game.add.tween(player.image.anchor).to({
                    y: 0.5
                }, 200, Phaser.Easing.Linear.None, true, 0, 0, true);
            },
            climbLadder() {
                statDiceRoll.push(diceRolled);
                statResult.push(statResultRolled);
                statPosition.push(player.position);
                if (positions[player.position].snakeLadder != 0) {
                    // window.setTimeout(function(){},3000);
                    if (positions[player.position].snakeLadder > player.position) {
                        ladderSound.play();
                    }
                    else {
                        snakeSound.play();
                    }
                    player.targetPosition = positions[player.position].snakeLadder;
                    player.position = positions[player.position].snakeLadder;
                    statResultRolled = 0;
                    gotSnakeOrLadder = true;
                    this.movePlayer();
                    return true;
                }
                return false;
            },
            saveGameState() {
                localstorage.set(posConfig.shortTitle + "playerPosition", player.position);
                console.log("bDicePause -- " + bDicePause);
                console.log("iDisplacement -- " + iDisplacement);
                console.log("iSnakeLadderBase -- " + iSnakeLadderBase);
                console.log("iOld_state -- " + iOld_state);
                console.log("iCurrent_state -- " + iCurrent_state);
                console.log("iReverseTo -- " + iReverseTo);
                console.log("iOld_ReverseTo -- " + iOld_ReverseTo);
                console.log("bLadderSnakeFacePressed -- " + bLadderSnakeFacePressed);
                var gameSaveObj = {
                    "bDicePause": bDicePause,
                    "iDisplacement": iDisplacement,
                    "iSnakeLadderBase": iSnakeLadderBase,
                    "iOld_state": iOld_state,
                    "iCurrent_state": iCurrent_state,
                    "iReverseTo": iReverseTo,
                    "iOld_ReverseTo": iOld_ReverseTo,
                    "bLadderSnakeFacePressed": bLadderSnakeFacePressed
                };
                localstorage.set(posConfig.shortTitle + "gameSaveObj", gameSaveObj);
                localstorage.set("sixRepeat", sixRepeat);
                localstorage.set("retreatPos", retreatPos);
                localstorage.set("diceRolled", diceRolled);
            },
            retriveGameState() {
                var pos = parseInt(localstorage.get(posConfig.shortTitle + "playerPosition").__zone_symbol__state == null ? 0 : localstorage.get(posConfig.shortTitle + "playerPosition").__zone_symbol__value);
                // if(localstorage.get(posConfig.shortTitle+"playerPosition").__zone_symbol__state==null)
                // {
                //   pos=0;
                // }
                // else
                // {
                //   pos=localstorage.get(posConfig.shortTitle+"playerPosition").__zone_symbol__value;
                // }
                if (pos !== 0) {
                    player.image.x = positions[pos].x;
                    player.image.y = positions[pos].y;
                    player.position = pos;
                    player.targetPosition = pos;
                    stageTxt = game.add.text(50, 830, "Stage - " + positions[pos].stage, style);
                    chakraTxt = game.add.text(580, 830, "Chakra - " + positions[pos].chakra, style);
                }
                else {
                    // Starting position
                    player.image.x = positions[posConfig.initCellPos].x;
                    player.image.y = positions[posConfig.initCellPos].y;
                    player.position = posConfig.initPlayerPos;
                    player.targetPosition = posConfig.initTargetPos;
                    // console.log(posConfig.initCellPos);
                    stageTxt.visible = false;
                    chakraTxt.visible = false;
                    stageTxt = game.add.text(50, 830, "Stage - " + positions[posConfig.initCellPos].stage, style);
                    chakraTxt = game.add.text(580, 830, "Chakra - " + positions[posConfig.initCellPos].chakra, style);
                }
                // console.log(positions[pos].stage);
                player.image.anchor.x = 0.1;
                player.image.anchor.y = 0.1;
                player.image.pivot.x = 0.5;
                player.image.pivot.y = 0.5;
                sixRepeat = parseInt(localstorage.get("sixRepeat").__zone_symbol__state == null ? 0 : localstorage.get("sixRepeat").__zone_symbol__value);
                retreatPos = parseInt(localstorage.get("retreatPos").__zone_symbol__state == null ? 0 : localstorage.get("retreatPos").__zone_symbol__value);
                diceRolled = parseInt(localstorage.get("diceRolled").__zone_symbol__state == null ? 0 : localstorage.get("diceRolled").__zone_symbol__value);
                /* ############ Retrive Game Statistics ################ */
                // var array = localStorage.getObject("gameStatObj");
                // if (array.diceRolled) {
                //   statDiceRoll = array.diceRolled;
                //   statResult = array.result;
                //   statPosition = array.position;
                // }
            },
            openinfoModal() {
                this.presentModal(false);
            },
            retrieveCellInfo(position) {
                stageTxt.visible = false;
                chakraTxt.visible = false;
                // stageTxt.kill();
                // chakraTxt.kill();
                // scope.$parent.cell.name = positions[position].info.name;
                // scope.$parent.cell.quote = positions[position].info.quote[Math.floor(Math.random() * positions[position].info.quote.length)].name;
                // scope.$parent.cell.postID = positions[position].postID;
                stageTxt = game.add.text(50, 830, "Stage - " + positions[position].stage, style);
                chakraTxt = game.add.text(580, 830, "Chakra - " + positions[position].chakra, style);
                stageTxt.visible = true;
                chakraTxt.visible = true;
                // scope.$apply();
            },
            walletTrans(trancposition) {
                // alert("Current Position of player :: "+ trancposition);
                // alert("Punishment :: "+positions[trancposition].give[0]);
                if (positions[trancposition].to[0] == 64) {
                    HomePage_1.bank_of_self_discovery = HomePage_1.bank_of_self_discovery + positions[trancposition].give[0];
                    player.wallet = player.wallet - positions[trancposition].give[0];
                    // alert("player wallet :: "+player.wallet);
                    HomePage_1.wallet = player.wallet;
                    // alert("Homepage wallet :: "+HomePage.wallet);
                    // alert("Bank of self Discovery :: "+HomePage.bank_of_self_discovery);
                }
                // stageTxt.kill();
                // chakraTxt.kill();
                // scope.$parent.cell.name = positions[position].info.name;
                // scope.$parent.cell.quote = positions[position].info.quote[Math.floor(Math.random() * positions[position].info.quote.length)].name;
                // scope.$parent.cell.postID = positions[position].postID;
                // stageTxt = game.add.text(50, 830, "Stage - " + positions[position].stage, style);
                // chakraTxt = game.add.text(580, 830, "Chakra - " + positions[position].chakra, style);
                // scope.$apply();
            },
            quizTrans(trancposition) {
                // alert("Current Position of player :: "+ trancposition);
                // alert("Punishment :: "+positions[trancposition].give[0]);
                // alert("Question is length ::"+ positions[trancposition].questions.length);
                if (positions[trancposition].questions.length > 0) {
                    // alert("Question is length ::"+ positions[trancposition].questions.length);
                    if (positions[trancposition].questions.length == 1) {
                        HomePage_1.question = positions[trancposition].questions[0];
                        //  alert("Question ::"+positions[trancposition].questions[0]);
                        HomePage_1.option = positions[trancposition].options[0];
                        HomePage_1.answer = positions[trancposition].answers[0];
                        HomePage_1.quiz_image = positions[trancposition].images[0];
                        //  alert(HomePage.answer);
                        HomePage_1.question_status = true;
                    }
                    else {
                        // alert("Question ::"+positions[trancposition].questions[0]);
                        //  alert("Answer ::" +positions[trancposition].answers[0]);
                        //  alert("Answer ::" +positions[trancposition].images[0]);
                        let random_number = game.rnd.integerInRange(0, positions[trancposition].questions.length);
                        HomePage_1.question = positions[trancposition].questions[random_number];
                        HomePage_1.option = positions[trancposition].options[random_number];
                        HomePage_1.answer = positions[trancposition].answers[random_number];
                        HomePage_1.option = positions[trancposition].options[random_number];
                        HomePage_1.quiz_image = positions[trancposition].images[random_number];
                        HomePage_1.question_status = true;
                        // alert("Question ::"+HomePage.question);
                        // alert("Answer ::" +HomePage.answer);
                        // alert("image ::" +HomePage.quiz_image);
                    }
                }
                else {
                    HomePage_1.question_status = false;
                }
                // stageTxt.kill();
                // chakraTxt.kill();
                // scope.$parent.cell.name = positions[position].info.name;
                // scope.$parent.cell.quote = positions[position].info.quote[Math.floor(Math.random() * positions[position].info.quote.length)].name;
                // scope.$parent.cell.postID = positions[position].postID;
                // stageTxt = game.add.text(50, 830, "Stage - " + positions[position].stage, style);
                // chakraTxt = game.add.text(580, 830, "Chakra - " + positions[position].chakra, style);
                // scope.$apply();
            },
            specialMoveTrans(move, cellno) {
                if (move == 0) {
                    HomePage_1.special_move_status = false;
                }
                else {
                    special_move_image = positions[player.position].special_move_bg;
                    sp_title_color = positions[player.position].title_color;
                    sp_tab_color = positions[player.position].tab_color;
                    cellname = positions[player.position].name;
                    HomePage_1.special_move_status = true;
                    HomePage_1.cellno = cellno;
                }
            },
            enablePinchToZoom() {
                let myElement = document.getElementById('game-canvas');
                let hammertime = new hammerjs__WEBPACK_IMPORTED_MODULE_9__(myElement);
                hammertime.get('pinch').set({
                    enable: true,
                    domEvents: true
                });
                hammertime.on('pinchstart', function (event) {
                    if (event.scale > 1) {
                        board.inputEnabled = false;
                    }
                });
                hammertime.on('pinchout', function (event) {
                    if (event.scale > 1) {
                        board.scale.set(event.scale);
                        board.position.x = 0;
                        board.position.y = 0;
                    }
                    // alert(board.position.y);
                    // if(board.position.y > 800){
                    // }
                    // if (event.scale < 2) {
                    //   if (board.scale.x < event.scale) {
                    //     board.scale.set(event.scale);
                    //     // board.inputEnabled = false;
                    //     // board.input.enableDrag(false);
                    //   }
                    // }
                    // else{
                    //    board.inputEnabled = true;
                    // }
                    // Update Drag
                    //            var fixBottomHeight = board.height - initHeight;
                    //           if (board.position.x > 0) {
                    //             board.position.x = 0;
                    //           }
                    //           if (board.position.y > 0) {
                    //             board.position.y = 0;
                    //           }
                    //           if (board.position.y < fixBottomHeight - (fixBottomHeight * 2)) {
                    //             alert("fixBottomHeight"+fixBottomHeight);
                    // alert("board.position.y"+board.position.y);
                    //             board.position.y = fixBottomHeight - (fixBottomHeight * 2);
                    //           }
                });
                hammertime.on('pinchin', function (event) {
                    if (board.scale.x > 1) {
                        if (event.scale < 1) {
                            board.scale.set(1);
                            board.position.x = 0;
                            board.position.y = 0;
                            board.inputEnabled = false;
                        }
                        else {
                            board.scale.set(event.scale);
                        }
                    }
                    // Update Drag
                    // var fixBottomHeight = board.height - initHeight;
                    // if (board.position.x > 0) {
                    //   board.position.x = 0;
                    // }
                    // if (board.position.y > 0) {
                    //   board.position.y = 0;
                    // }
                    // if (game.world.right < game.world.width) {
                    //   var diff = game.world.width - game.world.right;
                    //   board.position.x = board.position.x + diff;
                    // }
                    // if (board.position.y < fixBottomHeight - (fixBottomHeight * 2)) {
                    //   board.position.y = fixBottomHeight - (fixBottomHeight * 2);
                    // }
                });
                hammertime.on("pinchend", function (event) {
                    if (event.scale < 1) {
                        board.inputEnabled = false;
                    }
                    else {
                        board.inputEnabled = true;
                        board.input.enableDrag(false);
                        // board.events.onDragUpdate.add(this.dragUpdate, this);
                        // alert(board.position.x);
                    }
                    // Update Drag
                    // var fixBottomHeight = board.height - initHeight;
                    // if (board.position.x > 0) {
                    //   board.position.x = 0;
                    // }
                    // if (board.position.y > 0) {
                    //   board.position.y = 0;
                    // }
                    // if (game.world.right < game.world.width) {
                    //   var diff = game.world.width - game.world.right;
                    //   board.position.x = board.position.x + diff;
                    // //   board.inputEnabled = true;
                    // // board.input.enableDrag(false);
                    // }
                    // if (board.position.y < fixBottomHeight - (fixBottomHeight * 2)) {
                    //   board.position.y = fixBottomHeight - (fixBottomHeight * 2);
                    // }
                    // Update Drag
                });
            },
            onDragStart() {
                // alert("hiii");
                // var fixBottomHeight = board.height - initHeight;
                // if (board.position.x > 0) {
                //   board.position.x = 0;
                // }
                // if (board.position.y > 0) {
                //   board.position.y = 0;
                // }
                // if (game.world.right < game.world.width) {
                //   var diff = game.world.width - game.world.right;
                //   board.position.x = board.position.x + diff;
                // }
                // if (board.position.y < fixBottomHeight - (fixBottomHeight * 2)) {
                //   board.position.y = fixBottomHeight - (fixBottomHeight * 2);
                // }
            },
            addTapAreas() {
                var bmd = game.add.bitmapData(posConfig.cellDimentionX, posConfig.cellDimentionY);
                bmd.ctx.beginPath();
                bmd.ctx.rect(0, 0, 80, 90);
                bmd.ctx.fillStyle = '#FFF';
                bmd.ctx.globalAlpha = 0;
                bmd.ctx.fill();
                for (var i = 0; i < positions.length; i++) {
                    plots[i] = game.add.sprite(positions[i].posX, positions[i].posY, bmd);
                    board.addChild(plots[i]);
                }
                //alert(http);
                game.input.onTap.add(this.tapAction, this);
            },
            transferCowries() {
                if (positions[player.position].specialMoveTrigger[special_move_index] == 1) {
                    positions[HomePage_1.cellno - 1].wallet = positions[HomePage_1.cellno - 1].wallet + positions[player.position].give[0];
                    player.wallet = player.wallet - positions[player.position].give[0];
                    special_move_index = 1;
                    HomePage_1.recieve_hapyness = true;
                    // happiness_recieved.visible=true;
                }
                else if ((positions[player.position].auto_give[0] == 0 || positions[player.position].auto_give[0] < 0) && positions[player.position].give[0] > 0 && positions[player.position].specialMoveTrigger[special_move_index] != 1) {
                    move_state = 0;
                    // alert("The position of the cell for undefined :: "+ (HomePage.cellno-1));
                    positions[HomePage_1.cellno - 1].wallet = positions[HomePage_1.cellno - 1].wallet + positions[player.position].give[0];
                    player.wallet = player.wallet - positions[player.position].give[0];
                    HomePage_1.recieve_hapyness = true;
                    iFrame = 0;
                    Diceinstance.forEach(function (item) {
                        item.setFrame(6);
                        // item.setFrame(2);
                    });
                    // bank_image.visible=false;
                    // happiness_recieved.visible=true;
                }
                text.setText("" + positions[HomePage_1.cellno - 1].wallet + "");
                // special_move_index=1;
                HomePage_1.wallet = player.wallet;
                let i = 0;
                positions[player.position].to.forEach(element => {
                    this["bank_transfer_" + i].visible = false;
                    // this["bank_transfer_"+i]=null;
                    i++;
                });
            },
            tapAction(pointer, doubleTap) {
                //let httpObj=new this.http();
                //if (doubleTap) {
                // alert(pointer.x+","+pointer.y);
                for (var i = 0; i < positions.length; i++) {
                    let inside = plots[i].getBounds().contains(pointer.x, pointer.y);
                    //alert(inside);
                    if (inside) {
                        //alert(positions[i].desc);
                        if (positions[player.position].to.includes(positions[i].cellno) && positions[player.position].specialMoveTrigger[special_move_index] == 1) {
                            // positions[i].wallet=positions[i].wallet+positions[player.position].give[0];
                            bank_image.visible = true;
                            HomePage_1.cellno = positions[i].cellno;
                            text.visible = true;
                            text.setText("" + positions[HomePage_1.cellno - 1].wallet + "");
                            // alert("Cell Wallet ::"+positions[i].wallet);
                            // special_move_index=1;
                        }
                        else if (positions[player.position].to.includes(positions[i].cellno) && (positions[player.targetPosition].auto_give[0] == 0 || positions[player.targetPosition].auto_give[0] < 0) && positions[player.targetPosition].give[0] > 0 && positions[player.targetPosition].specialMoveTrigger[special_move_index] != 1) {
                            bank_image.visible = true;
                            HomePage_1.cellno = positions[i].cellno;
                            text.visible = true;
                            text.setText("" + positions[HomePage_1.cellno - 1].wallet + "");
                        }
                        else {
                            HomePage_1.cellno = 999;
                        }
                        that.callfn(positions[i].postID, positions[i].name, positions[i].desc, positions[i].blogID, positions[i].lat, positions[i].long, positions[i].wallet, true);
                        break;
                    }
                }
                //}
            }
        };
        // alert(this.constructor.name);
        // this.subscribeexit=this.platform.backButton.subscribeWithPriority(666666,()=>{
        //   if(this.constructor.name=='HomePage')
        //   {
        //     navigator["app"].exitApp();
        //   }
        // });
        this.reloadContent();
        // this.http.get('https://riwayatedilli.com/site/wp-json/wp/v2/fetch/initialpost').subscribe(data => {
        // storage.set('postlist', data);
        // console.log(data);
        // },error=>{
        // });
        that = Object.create(this.constructor.prototype);
        game = new Phaser.Game(900, 900, Phaser.AUTO, 'game-canvas');
        game.state.add('boot', this.boot);
        game.state.add('main', this.mainState);
        game.state.start('boot');
        appinstance = this;
        simu = Object.create(this.simulator);
        localstorage = Object.create(this.storage);
        // this.openHowToPlay();
        //this.callfn();
    }
    static callfn() { }
    ;
    ngAfterViewInit() {
    }
    ngOnInit() {
    }
    // async backbttsub()
    // {
    //   this.backsub=this.subscribe=this.platform.backButton.subscribeWithPriority(666666,()=>{
    //     if(this.constructor.name=="HomePage"){
    //       if(window.confirm("Do you want to exit?"))
    //       {
    //         navigator["app"].exitApp();
    //       }
    //     }
    //   });
    //   return await this.backbttsub().then(()=>console.log('subscribed')); 
    // }
    // async backbttunsub(){
    //   return await this.backsub.unsubscribe().then(()=>console.log('unsunscribed'));
    // }
    reloadContent() {
        this.http.get('https://riwayatedilli.com/site/wp-json/wp/v2/fetch/initialpost').subscribe(data => {
            this.storage.set('postlist', data);
            // console.log(data);
            this.pulldown = false;
        }, error => {
            this.pulldown = true;
        });
    }
    ngOnDestroy() {
    }
    doRefresh(event) {
        // console.log('Begin async operation');
        // this.loadingPresent();
        setTimeout(() => {
            this.reloadContent();
            // this.loadingdismiss();
            event.target.complete();
        }, 2000);
    }
    loadingPresent() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return yield this.loadingCtrl.create({
                message: "Please wait until data is loaded",
            }).then(a => {
                a.present().then(() => {
                });
            });
        });
    }
    loadingdismiss() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return yield this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
        });
    }
    presentModal(isWalkThrough) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // alert("postID is :: "+HomePage.post_id);
            if (isWalkThrough) {
                that.modal = yield appinstance.modal.create({
                    component: _modal_modal_page__WEBPACK_IMPORTED_MODULE_8__["ModalPage"],
                    componentProps: {
                        'isWalkThrough': isWalkThrough,
                        'blogID': HomePage_1.post_id
                    },
                    cssClass: 'my-how-modal-css'
                });
            }
            else {
                // alert("entering second Modal");
                that.modal = yield appinstance.modal.create({
                    component: _modal_modal_page__WEBPACK_IMPORTED_MODULE_8__["ModalPage"],
                    componentProps: {
                        'header': HomePage_1.postname,
                        'description': HomePage_1.postdesc,
                        'post_id': "/post/" + HomePage_1.post_id + "/" + HomePage_1.blogID + "/" + 1,
                        'isWalkThrough': isWalkThrough,
                        'blogID': HomePage_1.blogID,
                        'lat': HomePage_1.lat,
                        'long': HomePage_1.long
                    },
                    cssClass: 'my-custom-modal-css'
                });
            }
            // alert("opening Modal");
            return yield that.modal.present();
        });
    }
    callfn(postid, postname, postdesc, blogID, lat, long, wallet, modal = false) {
        // alert("Okay going");
        HomePage_1.post_id = postid;
        HomePage_1.postname = postname;
        HomePage_1.postdesc = postdesc;
        HomePage_1.blogID = blogID;
        HomePage_1.lat = lat;
        HomePage_1.cell_wallet = wallet;
        if (modal == true) {
            this.presentModal(false);
        }
        // this.presentModal(false);
        // alert("Wallet for a cell :: "+HomePage.cell_wallet);
        // alert(HomePage.blogID);
    }
    ;
    changeGameDirections(change_special_move_state = true) {
        if (change_special_move_state == true) {
            special_move_index = 1;
        }
    }
    playerWalletTrans(playerInfo) {
        // alert("Player Wallet is Transfered :: ");
        // alert("Transfer amount "+positions[player.position].give[0]);
        // alert("Transfer Player Wallet :: "+player_Array[playerInfo.player_no].wallet);
        // alert("CURRENT PLAYER INFO : "+playerInfo.player_no);
        // HomePage.bank_of_self_discovery=HomePage.bank_of_self_discovery+positions[trancposition].give[0];
        // alert("JSON Stringfy :: "+playerInfo.player_no);
        // alert("Wallet for the base :: "+ HomePage.playerArray[playerInfo.player_no].wallet);
        // player.wallet=player.wallet-positions[player.position].give[0];
        // HomePage.playerArray[playerInfo.player_no].wallet=HomePage.playerArray[playerInfo.player_no].wallet+positions[player.position].give[0];
        // alert("player wallet :: "+player.wallet);
        // text.setText(""+HomePage.bank_of_self_discovery+"");
        special_move_index = 1;
        HomePage_1.wallet = player.wallet;
    }
    openCam() {
        const options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            //alert(imageData)
            this.image = window.Ionic.WebView.convertFileSrc(imageData);
        }, (err) => {
            // Handle error
            // alert("error "+JSON.stringify(err))
        });
    }
    openModal(question = "", answer = "", option = {}, image = "", postid = 0) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (HomePage_1.question_status == true) {
                this.quizmodal = yield this.modal.create({
                    component: _quizmodal_quizmodal_page__WEBPACK_IMPORTED_MODULE_10__["QuizmodalPage"],
                    componentProps: {
                        Que: question,
                        ans: answer,
                        opt: option,
                        image: image,
                        postID: postid,
                    }
                });
                this.quizmodal.onDidDismiss().then((dataReturned) => {
                    if (dataReturned !== null) {
                        console.log(dataReturned.data.result);
                        if (dataReturned.data.result == false) {
                            player.wallet = player.wallet - 2;
                            HomePage_1.wallet = player.wallet;
                        }
                        else {
                            player.wallet = player.wallet + 2;
                            HomePage_1.wallet = player.wallet;
                        }
                        dice.inputEnabled = true;
                        HomePage_1.question_status = false;
                    }
                });
                return yield this.quizmodal.present();
            }
        });
    }
    openspecialmoveModal() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // if(HomePage.question_status==true)
            // {
            // alert("cell Name is :: "+cellname);
            this.specialmodal = yield this.modal.create({
                component: _special_move_special_move_page__WEBPACK_IMPORTED_MODULE_13__["SpecialMovePage"],
                componentProps: {
                    cellno: HomePage_1.cellno,
                    background: special_move_image,
                    celltitle: cellname,
                    tab_color: sp_title_color,
                    title_color: sp_tab_color
                }
            });
            this.specialmodal.onDidDismiss().then(() => {
            });
            return yield this.specialmodal.present();
            // }
        });
    }
    openHowToPlay() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // if(HomePage.question_status==true)
            // {
            // alert("cell Name is :: "+cellname);
            this.specialmodal = yield this.modal.create({
                component: _howtoplay_howtoplay_page__WEBPACK_IMPORTED_MODULE_14__["HowtoplayPage"],
                componentProps: {}
            });
            this.specialmodal.onDidDismiss().then(() => {
            });
            return yield this.specialmodal.present();
            // }
        });
    }
    openWordGameModal(type_of_bank = 0) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // alert("length of word bank :: "+letter_bank.length);
            // if(HomePage.question_status==true)
            // {
            if (type_of_bank == 0) {
                this.wordmodal = yield this.modal.create({
                    component: _wordgame_wordgame_page__WEBPACK_IMPORTED_MODULE_11__["WordgamePage"],
                    componentProps: {
                        letterbank: letter_bank,
                        type: type_of_bank
                    },
                    backdropDismiss: false
                });
                this.wordmodal.onDidDismiss().then((dataReturned) => {
                    // console.log(JSON.stringify(dataReturned));
                    //  alert("Hello World");
                    if (dataReturned != null) {
                        // console.log(JSON.stringify(dataReturned));
                        if (dataReturned.data.result == false) {
                            // console.log(JSON.stringify(dataReturned));
                            //  alert("Working");
                            // letter_bank=[];
                            // alert("The Length of the letter bank"+letter_bank.length);
                            letter_bank = dataReturned.data.letter_array;
                            HomePage_1.letter_bank_full_status = false;
                            bDicePause = false;
                        }
                        else if (dataReturned.data.result == true) {
                            // console.log(JSON.stringify(dataReturned));
                            // alert("Working");
                            letter_bank = [];
                            letter_bank = dataReturned.data.letter_array;
                            // alert("The Length of the letter bank"+letter_bank.length);
                            word_bank.push(dataReturned.data.word);
                            player.wallet = player.wallet + 2;
                            HomePage_1.wallet = player.wallet;
                            // console.log("The word array is ::"+ JSON.stringify(word_bank) );
                            HomePage_1.letter_bank_full_status = false;
                            bDicePause = false;
                        }
                    }
                });
            }
            else if (type_of_bank == 1) {
                this.wordmodal = yield this.modal.create({
                    component: _wordgame_wordgame_page__WEBPACK_IMPORTED_MODULE_11__["WordgamePage"],
                    componentProps: {
                        wordbank: word_bank,
                        type: type_of_bank
                    }
                });
                this.wordmodal.onDidDismiss().then((dataReturned) => {
                    // console.log(JSON.stringify(dataReturned));
                    //  alert("Hello World");
                    // if(dataReturned!=null)
                    // {
                    //   // console.log(JSON.stringify(dataReturned));
                    //   if(dataReturned.data.result==false)
                    //   {
                    //     // console.log(JSON.stringify(dataReturned));
                    //     //  alert("Working");
                    //     letter_bank=dataReturned.data.letter_array;
                    //     HomePage.letter_bank_full_status=false;
                    //     bDicePause=false;
                    //   }
                    //   else if(dataReturned.data.result==true)
                    //   {
                    //     // console.log(JSON.stringify(dataReturned));
                    //     // alert("Working");
                    //     letter_bank=dataReturned.data.letter_array;
                    //     word_bank.push(dataReturned.data.word);
                    //     HomePage.letter_bank_full_status=false;
                    //     bDicePause=false;
                    //   }
                    // }
                });
            }
            return yield this.wordmodal.present();
            // }
        });
    }
    transferTreasure() {
        if (positions[player.targetPosition].wallet >= positions[player.targetPosition].treasure_transfer[0] && positions[player.targetPosition].treasure_transfer[0] > 0 && positions[player.targetPosition].treasure_transfer[0] != 999) {
            player.wallet = player.wallet + positions[player.targetPosition].treasure_transfer;
            HomePage_1.wallet = player.wallet;
            positions[player.targetPosition].wallet = positions[player.targetPosition].wallet - positions[player.targetPosition].treasure_transfer;
        }
        else if (positions[player.targetPosition].wallet >= positions[player.targetPosition].treasure_transfer[0] && positions[player.targetPosition].treasure_transfer[0] > 0 && positions[player.targetPosition].wallet) {
            player.wallet = player.wallet + positions[player.targetPosition].wallet;
            HomePage_1.wallet = player.wallet;
            positions[player.targetPosition].wallet = 0;
        }
    }
    //  rollDice(diceRolled) {
    //   const dice = [...document.querySelectorAll(".die-list")];
    //   dice.forEach(die => {
    //     this.toggleClasses(die);
    //     die.dataset.roll = diceRolled;
    //   });
    // }
    //  toggleClasses(die) {
    //   die.classList.toggle("odd-roll");
    //   die.classList.toggle("even-roll");
    // }
    ionViewWillLeave() {
        // that.modal.dismiss();
    }
};
HomePage.to_array = [];
HomePage.bank_of_self_discovery = 0;
HomePage.bankcoin = 0;
HomePage.wallet = 100;
HomePage.question = "";
HomePage.answer = "";
HomePage.option = {};
HomePage.question_status = false;
HomePage.special_move_status = false;
HomePage.quiz_image = "";
HomePage.temp_player_array = [];
HomePage.temp_game_restart_exit = [0, 0];
HomePage.letter_bank_full_status = false;
HomePage.recieve_hapyness = false;
HomePage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["NavController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"] },
    { type: _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_2__["Camera"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"] },
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"] },
    { type: _services_simulator_service__WEBPACK_IMPORTED_MODULE_12__["SimulatorService"] }
];
HomePage = HomePage_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-home',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./home.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./home.page.scss */ "./src/app/home/home.page.scss")).default]
    }),
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["NavController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"], _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_2__["Camera"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"], _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Events"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"], _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"], _services_simulator_service__WEBPACK_IMPORTED_MODULE_12__["SimulatorService"]])
], HomePage);



/***/ })

}]);