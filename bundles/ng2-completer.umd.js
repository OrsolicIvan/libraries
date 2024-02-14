(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/operators'), require('@angular/common/http'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/operators', '@angular/common/http', '@angular/forms', '@angular/common'], factory) :
    (global = global || self, factory((global.ng2 = global.ng2 || {}, global.ng2.completer = {}), global.ng.core, global.Rx.Observable.prototype, global.ng.common.http, global.ng.forms, global.ng.common));
}(this, (function (exports, core, operators, http, forms, common) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    function isFunction(value) {
        return typeof value === 'function';
    }

    function createErrorClass(createImpl) {
        var _super = function (instance) {
            Error.call(instance);
            instance.stack = new Error().stack;
        };
        var ctorFunc = createImpl(_super);
        ctorFunc.prototype = Object.create(Error.prototype);
        ctorFunc.prototype.constructor = ctorFunc;
        return ctorFunc;
    }

    var UnsubscriptionError = createErrorClass(function (_super) {
        return function UnsubscriptionErrorImpl(errors) {
            _super(this);
            this.message = errors
                ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
                : '';
            this.name = 'UnsubscriptionError';
            this.errors = errors;
        };
    });

    function arrRemove(arr, item) {
        if (arr) {
            var index = arr.indexOf(item);
            0 <= index && arr.splice(index, 1);
        }
    }

    var Subscription = (function () {
        function Subscription(initialTeardown) {
            this.initialTeardown = initialTeardown;
            this.closed = false;
            this._parentage = null;
            this._finalizers = null;
        }
        Subscription.prototype.unsubscribe = function () {
            var e_1, _a, e_2, _b;
            var errors;
            if (!this.closed) {
                this.closed = true;
                var _parentage = this._parentage;
                if (_parentage) {
                    this._parentage = null;
                    if (Array.isArray(_parentage)) {
                        try {
                            for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                                var parent_1 = _parentage_1_1.value;
                                parent_1.remove(this);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                    else {
                        _parentage.remove(this);
                    }
                }
                var initialFinalizer = this.initialTeardown;
                if (isFunction(initialFinalizer)) {
                    try {
                        initialFinalizer();
                    }
                    catch (e) {
                        errors = e instanceof UnsubscriptionError ? e.errors : [e];
                    }
                }
                var _finalizers = this._finalizers;
                if (_finalizers) {
                    this._finalizers = null;
                    try {
                        for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
                            var finalizer = _finalizers_1_1.value;
                            try {
                                execFinalizer(finalizer);
                            }
                            catch (err) {
                                errors = errors !== null && errors !== void 0 ? errors : [];
                                if (err instanceof UnsubscriptionError) {
                                    errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                                }
                                else {
                                    errors.push(err);
                                }
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                if (errors) {
                    throw new UnsubscriptionError(errors);
                }
            }
        };
        Subscription.prototype.add = function (teardown) {
            var _a;
            if (teardown && teardown !== this) {
                if (this.closed) {
                    execFinalizer(teardown);
                }
                else {
                    if (teardown instanceof Subscription) {
                        if (teardown.closed || teardown._hasParent(this)) {
                            return;
                        }
                        teardown._addParent(this);
                    }
                    (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
                }
            }
        };
        Subscription.prototype._hasParent = function (parent) {
            var _parentage = this._parentage;
            return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
        };
        Subscription.prototype._addParent = function (parent) {
            var _parentage = this._parentage;
            this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
        };
        Subscription.prototype._removeParent = function (parent) {
            var _parentage = this._parentage;
            if (_parentage === parent) {
                this._parentage = null;
            }
            else if (Array.isArray(_parentage)) {
                arrRemove(_parentage, parent);
            }
        };
        Subscription.prototype.remove = function (teardown) {
            var _finalizers = this._finalizers;
            _finalizers && arrRemove(_finalizers, teardown);
            if (teardown instanceof Subscription) {
                teardown._removeParent(this);
            }
        };
        Subscription.EMPTY = (function () {
            var empty = new Subscription();
            empty.closed = true;
            return empty;
        })();
        return Subscription;
    }());
    var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
    function isSubscription(value) {
        return (value instanceof Subscription ||
            (value && 'closed' in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe)));
    }
    function execFinalizer(finalizer) {
        if (isFunction(finalizer)) {
            finalizer();
        }
        else {
            finalizer.unsubscribe();
        }
    }

    var config = {
        onUnhandledError: null,
        onStoppedNotification: null,
        Promise: undefined,
        useDeprecatedSynchronousErrorHandling: false,
        useDeprecatedNextContext: false,
    };

    var timeoutProvider = {
        setTimeout: function (handler, timeout) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var delegate = timeoutProvider.delegate;
            if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
                return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
            }
            return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
        },
        clearTimeout: function (handle) {
            var delegate = timeoutProvider.delegate;
            return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
        },
        delegate: undefined,
    };

    function reportUnhandledError(err) {
        timeoutProvider.setTimeout(function () {
            {
                throw err;
            }
        });
    }

    function noop() { }

    function errorContext(cb) {
        {
            cb();
        }
    }

    var Subscriber = (function (_super) {
        __extends(Subscriber, _super);
        function Subscriber(destination) {
            var _this = _super.call(this) || this;
            _this.isStopped = false;
            if (destination) {
                _this.destination = destination;
                if (isSubscription(destination)) {
                    destination.add(_this);
                }
            }
            else {
                _this.destination = EMPTY_OBSERVER;
            }
            return _this;
        }
        Subscriber.create = function (next, error, complete) {
            return new SafeSubscriber(next, error, complete);
        };
        Subscriber.prototype.next = function (value) {
            if (this.isStopped) ;
            else {
                this._next(value);
            }
        };
        Subscriber.prototype.error = function (err) {
            if (this.isStopped) ;
            else {
                this.isStopped = true;
                this._error(err);
            }
        };
        Subscriber.prototype.complete = function () {
            if (this.isStopped) ;
            else {
                this.isStopped = true;
                this._complete();
            }
        };
        Subscriber.prototype.unsubscribe = function () {
            if (!this.closed) {
                this.isStopped = true;
                _super.prototype.unsubscribe.call(this);
                this.destination = null;
            }
        };
        Subscriber.prototype._next = function (value) {
            this.destination.next(value);
        };
        Subscriber.prototype._error = function (err) {
            try {
                this.destination.error(err);
            }
            finally {
                this.unsubscribe();
            }
        };
        Subscriber.prototype._complete = function () {
            try {
                this.destination.complete();
            }
            finally {
                this.unsubscribe();
            }
        };
        return Subscriber;
    }(Subscription));
    var _bind = Function.prototype.bind;
    function bind(fn, thisArg) {
        return _bind.call(fn, thisArg);
    }
    var ConsumerObserver = (function () {
        function ConsumerObserver(partialObserver) {
            this.partialObserver = partialObserver;
        }
        ConsumerObserver.prototype.next = function (value) {
            var partialObserver = this.partialObserver;
            if (partialObserver.next) {
                try {
                    partialObserver.next(value);
                }
                catch (error) {
                    handleUnhandledError(error);
                }
            }
        };
        ConsumerObserver.prototype.error = function (err) {
            var partialObserver = this.partialObserver;
            if (partialObserver.error) {
                try {
                    partialObserver.error(err);
                }
                catch (error) {
                    handleUnhandledError(error);
                }
            }
            else {
                handleUnhandledError(err);
            }
        };
        ConsumerObserver.prototype.complete = function () {
            var partialObserver = this.partialObserver;
            if (partialObserver.complete) {
                try {
                    partialObserver.complete();
                }
                catch (error) {
                    handleUnhandledError(error);
                }
            }
        };
        return ConsumerObserver;
    }());
    var SafeSubscriber = (function (_super) {
        __extends(SafeSubscriber, _super);
        function SafeSubscriber(observerOrNext, error, complete) {
            var _this = _super.call(this) || this;
            var partialObserver;
            if (isFunction(observerOrNext) || !observerOrNext) {
                partialObserver = {
                    next: (observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined),
                    error: error !== null && error !== void 0 ? error : undefined,
                    complete: complete !== null && complete !== void 0 ? complete : undefined,
                };
            }
            else {
                var context_1;
                if (_this && config.useDeprecatedNextContext) {
                    context_1 = Object.create(observerOrNext);
                    context_1.unsubscribe = function () { return _this.unsubscribe(); };
                    partialObserver = {
                        next: observerOrNext.next && bind(observerOrNext.next, context_1),
                        error: observerOrNext.error && bind(observerOrNext.error, context_1),
                        complete: observerOrNext.complete && bind(observerOrNext.complete, context_1),
                    };
                }
                else {
                    partialObserver = observerOrNext;
                }
            }
            _this.destination = new ConsumerObserver(partialObserver);
            return _this;
        }
        return SafeSubscriber;
    }(Subscriber));
    function handleUnhandledError(error) {
        {
            reportUnhandledError(error);
        }
    }
    function defaultErrorHandler(err) {
        throw err;
    }
    var EMPTY_OBSERVER = {
        closed: true,
        next: noop,
        error: defaultErrorHandler,
        complete: noop,
    };

    var observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();

    function identity(x) {
        return x;
    }

    function pipeFromArray(fns) {
        if (fns.length === 0) {
            return identity;
        }
        if (fns.length === 1) {
            return fns[0];
        }
        return function piped(input) {
            return fns.reduce(function (prev, fn) { return fn(prev); }, input);
        };
    }

    var Observable = (function () {
        function Observable(subscribe) {
            if (subscribe) {
                this._subscribe = subscribe;
            }
        }
        Observable.prototype.lift = function (operator) {
            var observable = new Observable();
            observable.source = this;
            observable.operator = operator;
            return observable;
        };
        Observable.prototype.subscribe = function (observerOrNext, error, complete) {
            var _this = this;
            var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
            errorContext(function () {
                var _a = _this, operator = _a.operator, source = _a.source;
                subscriber.add(operator
                    ?
                        operator.call(subscriber, source)
                    : source
                        ?
                            _this._subscribe(subscriber)
                        :
                            _this._trySubscribe(subscriber));
            });
            return subscriber;
        };
        Observable.prototype._trySubscribe = function (sink) {
            try {
                return this._subscribe(sink);
            }
            catch (err) {
                sink.error(err);
            }
        };
        Observable.prototype.forEach = function (next, promiseCtor) {
            var _this = this;
            promiseCtor = getPromiseCtor(promiseCtor);
            return new promiseCtor(function (resolve, reject) {
                var subscriber = new SafeSubscriber({
                    next: function (value) {
                        try {
                            next(value);
                        }
                        catch (err) {
                            reject(err);
                            subscriber.unsubscribe();
                        }
                    },
                    error: reject,
                    complete: resolve,
                });
                _this.subscribe(subscriber);
            });
        };
        Observable.prototype._subscribe = function (subscriber) {
            var _a;
            return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
        };
        Observable.prototype[observable] = function () {
            return this;
        };
        Observable.prototype.pipe = function () {
            var operations = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                operations[_i] = arguments[_i];
            }
            return pipeFromArray(operations)(this);
        };
        Observable.prototype.toPromise = function (promiseCtor) {
            var _this = this;
            promiseCtor = getPromiseCtor(promiseCtor);
            return new promiseCtor(function (resolve, reject) {
                var value;
                _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
            });
        };
        Observable.create = function (subscribe) {
            return new Observable(subscribe);
        };
        return Observable;
    }());
    function getPromiseCtor(promiseCtor) {
        var _a;
        return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
    }
    function isObserver(value) {
        return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
    }
    function isSubscriber(value) {
        return (value && value instanceof Subscriber) || (isObserver(value) && isSubscription(value));
    }

    var ObjectUnsubscribedError = createErrorClass(function (_super) {
        return function ObjectUnsubscribedErrorImpl() {
            _super(this);
            this.name = 'ObjectUnsubscribedError';
            this.message = 'object unsubscribed';
        };
    });

    var Subject = (function (_super) {
        __extends(Subject, _super);
        function Subject() {
            var _this = _super.call(this) || this;
            _this.closed = false;
            _this.currentObservers = null;
            _this.observers = [];
            _this.isStopped = false;
            _this.hasError = false;
            _this.thrownError = null;
            return _this;
        }
        Subject.prototype.lift = function (operator) {
            var subject = new AnonymousSubject(this, this);
            subject.operator = operator;
            return subject;
        };
        Subject.prototype._throwIfClosed = function () {
            if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
        };
        Subject.prototype.next = function (value) {
            var _this = this;
            errorContext(function () {
                var e_1, _a;
                _this._throwIfClosed();
                if (!_this.isStopped) {
                    if (!_this.currentObservers) {
                        _this.currentObservers = Array.from(_this.observers);
                    }
                    try {
                        for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var observer = _c.value;
                            observer.next(value);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            });
        };
        Subject.prototype.error = function (err) {
            var _this = this;
            errorContext(function () {
                _this._throwIfClosed();
                if (!_this.isStopped) {
                    _this.hasError = _this.isStopped = true;
                    _this.thrownError = err;
                    var observers = _this.observers;
                    while (observers.length) {
                        observers.shift().error(err);
                    }
                }
            });
        };
        Subject.prototype.complete = function () {
            var _this = this;
            errorContext(function () {
                _this._throwIfClosed();
                if (!_this.isStopped) {
                    _this.isStopped = true;
                    var observers = _this.observers;
                    while (observers.length) {
                        observers.shift().complete();
                    }
                }
            });
        };
        Subject.prototype.unsubscribe = function () {
            this.isStopped = this.closed = true;
            this.observers = this.currentObservers = null;
        };
        Object.defineProperty(Subject.prototype, "observed", {
            get: function () {
                var _a;
                return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
            },
            enumerable: false,
            configurable: true
        });
        Subject.prototype._trySubscribe = function (subscriber) {
            this._throwIfClosed();
            return _super.prototype._trySubscribe.call(this, subscriber);
        };
        Subject.prototype._subscribe = function (subscriber) {
            this._throwIfClosed();
            this._checkFinalizedStatuses(subscriber);
            return this._innerSubscribe(subscriber);
        };
        Subject.prototype._innerSubscribe = function (subscriber) {
            var _this = this;
            var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
            if (hasError || isStopped) {
                return EMPTY_SUBSCRIPTION;
            }
            this.currentObservers = null;
            observers.push(subscriber);
            return new Subscription(function () {
                _this.currentObservers = null;
                arrRemove(observers, subscriber);
            });
        };
        Subject.prototype._checkFinalizedStatuses = function (subscriber) {
            var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
            if (hasError) {
                subscriber.error(thrownError);
            }
            else if (isStopped) {
                subscriber.complete();
            }
        };
        Subject.prototype.asObservable = function () {
            var observable = new Observable();
            observable.source = this;
            return observable;
        };
        Subject.create = function (destination, source) {
            return new AnonymousSubject(destination, source);
        };
        return Subject;
    }(Observable));
    var AnonymousSubject = (function (_super) {
        __extends(AnonymousSubject, _super);
        function AnonymousSubject(destination, source) {
            var _this = _super.call(this) || this;
            _this.destination = destination;
            _this.source = source;
            return _this;
        }
        AnonymousSubject.prototype.next = function (value) {
            var _a, _b;
            (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
        };
        AnonymousSubject.prototype.error = function (err) {
            var _a, _b;
            (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
        };
        AnonymousSubject.prototype.complete = function () {
            var _a, _b;
            (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
        AnonymousSubject.prototype._subscribe = function (subscriber) {
            var _a, _b;
            return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
        };
        return AnonymousSubject;
    }(Subject));

    var dateTimestampProvider = {
        now: function () {
            return ( Date).now();
        },
        delegate: undefined,
    };

    var Action = (function (_super) {
        __extends(Action, _super);
        function Action(scheduler, work) {
            return _super.call(this) || this;
        }
        Action.prototype.schedule = function (state, delay) {
            return this;
        };
        return Action;
    }(Subscription));

    var intervalProvider = {
        setInterval: function (handler, timeout) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var delegate = intervalProvider.delegate;
            if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
                return delegate.setInterval.apply(delegate, __spreadArray([handler, timeout], __read(args)));
            }
            return setInterval.apply(void 0, __spreadArray([handler, timeout], __read(args)));
        },
        clearInterval: function (handle) {
            var delegate = intervalProvider.delegate;
            return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
        },
        delegate: undefined,
    };

    var AsyncAction = (function (_super) {
        __extends(AsyncAction, _super);
        function AsyncAction(scheduler, work) {
            var _this = _super.call(this, scheduler, work) || this;
            _this.scheduler = scheduler;
            _this.work = work;
            _this.pending = false;
            return _this;
        }
        AsyncAction.prototype.schedule = function (state, delay) {
            var _a;
            if (delay === void 0) { delay = 0; }
            if (this.closed) {
                return this;
            }
            this.state = state;
            var id = this.id;
            var scheduler = this.scheduler;
            if (id != null) {
                this.id = this.recycleAsyncId(scheduler, id, delay);
            }
            this.pending = true;
            this.delay = delay;
            this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
            return this;
        };
        AsyncAction.prototype.requestAsyncId = function (scheduler, _id, delay) {
            if (delay === void 0) { delay = 0; }
            return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
        };
        AsyncAction.prototype.recycleAsyncId = function (_scheduler, id, delay) {
            if (delay === void 0) { delay = 0; }
            if (delay != null && this.delay === delay && this.pending === false) {
                return id;
            }
            if (id != null) {
                intervalProvider.clearInterval(id);
            }
            return undefined;
        };
        AsyncAction.prototype.execute = function (state, delay) {
            if (this.closed) {
                return new Error('executing a cancelled action');
            }
            this.pending = false;
            var error = this._execute(state, delay);
            if (error) {
                return error;
            }
            else if (this.pending === false && this.id != null) {
                this.id = this.recycleAsyncId(this.scheduler, this.id, null);
            }
        };
        AsyncAction.prototype._execute = function (state, _delay) {
            var errored = false;
            var errorValue;
            try {
                this.work(state);
            }
            catch (e) {
                errored = true;
                errorValue = e ? e : new Error('Scheduled action threw falsy error');
            }
            if (errored) {
                this.unsubscribe();
                return errorValue;
            }
        };
        AsyncAction.prototype.unsubscribe = function () {
            if (!this.closed) {
                var _a = this, id = _a.id, scheduler = _a.scheduler;
                var actions = scheduler.actions;
                this.work = this.state = this.scheduler = null;
                this.pending = false;
                arrRemove(actions, this);
                if (id != null) {
                    this.id = this.recycleAsyncId(scheduler, id, null);
                }
                this.delay = null;
                _super.prototype.unsubscribe.call(this);
            }
        };
        return AsyncAction;
    }(Action));

    var Scheduler = (function () {
        function Scheduler(schedulerActionCtor, now) {
            if (now === void 0) { now = Scheduler.now; }
            this.schedulerActionCtor = schedulerActionCtor;
            this.now = now;
        }
        Scheduler.prototype.schedule = function (work, delay, state) {
            if (delay === void 0) { delay = 0; }
            return new this.schedulerActionCtor(this, work).schedule(state, delay);
        };
        Scheduler.now = dateTimestampProvider.now;
        return Scheduler;
    }());

    var AsyncScheduler = (function (_super) {
        __extends(AsyncScheduler, _super);
        function AsyncScheduler(SchedulerAction, now) {
            if (now === void 0) { now = Scheduler.now; }
            var _this = _super.call(this, SchedulerAction, now) || this;
            _this.actions = [];
            _this._active = false;
            return _this;
        }
        AsyncScheduler.prototype.flush = function (action) {
            var actions = this.actions;
            if (this._active) {
                actions.push(action);
                return;
            }
            var error;
            this._active = true;
            do {
                if ((error = action.execute(action.state, action.delay))) {
                    break;
                }
            } while ((action = actions.shift()));
            this._active = false;
            if (error) {
                while ((action = actions.shift())) {
                    action.unsubscribe();
                }
                throw error;
            }
        };
        return AsyncScheduler;
    }(Scheduler));

    var asyncScheduler = new AsyncScheduler(AsyncAction);
    var async = asyncScheduler;

    function isScheduler(value) {
        return value && isFunction(value.schedule);
    }

    function isValidDate(value) {
        return value instanceof Date && !isNaN(value);
    }

    function timer(dueTime, intervalOrScheduler, scheduler) {
        if (dueTime === void 0) { dueTime = 0; }
        if (scheduler === void 0) { scheduler = async; }
        var intervalDuration = -1;
        if (intervalOrScheduler != null) {
            if (isScheduler(intervalOrScheduler)) {
                scheduler = intervalOrScheduler;
            }
            else {
                intervalDuration = intervalOrScheduler;
            }
        }
        return new Observable(function (subscriber) {
            var due = isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
            if (due < 0) {
                due = 0;
            }
            var n = 0;
            return scheduler.schedule(function () {
                if (!subscriber.closed) {
                    subscriber.next(n++);
                    if (0 <= intervalDuration) {
                        this.schedule(undefined, intervalDuration);
                    }
                    else {
                        subscriber.complete();
                    }
                }
            }, due);
        });
    }

    /**
     * @license ng2-completer
     * MIT license
     */

    var MAX_CHARS = 524288; // the default max length per the html maxlength attribute
    var MIN_SEARCH_LENGTH = 3;
    var PAUSE = 10;
    var TEXT_SEARCHING = "Searching...";
    var TEXT_NO_RESULTS = "No results found";
    var CLEAR_TIMEOUT = 50;
    function isNil(value) {
        return typeof value === "undefined" || value === null;
    }

    var CompleterBaseData = /** @class */ (function (_super) {
        __extends(CompleterBaseData, _super);
        function CompleterBaseData() {
            var _this = _super.call(this) || this;
            _this._searchFields = null;
            _this._titleField = null;
            _this._descriptionField = undefined;
            _this._imageField = undefined;
            return _this;
        }
        CompleterBaseData.prototype.cancel = function () {
            return;
        };
        CompleterBaseData.prototype.searchFields = function (searchFields) {
            this._searchFields = searchFields;
            return this;
        };
        CompleterBaseData.prototype.titleField = function (titleField) {
            this._titleField = titleField;
            return this;
        };
        CompleterBaseData.prototype.descriptionField = function (descriptionField) {
            this._descriptionField = descriptionField;
            return this;
        };
        CompleterBaseData.prototype.imageField = function (imageField) {
            this._imageField = imageField;
            return this;
        };
        CompleterBaseData.prototype.convertToItem = function (data) {
            var image = null;
            var formattedText;
            var formattedDesc = null;
            if (this._titleField) {
                formattedText = this.extractTitle(data);
            }
            else {
                formattedText = data;
            }
            if (typeof formattedText !== "string") {
                formattedText = JSON.stringify(formattedText);
            }
            if (this._descriptionField) {
                formattedDesc = this.extractValue(data, this._descriptionField);
            }
            if (this._imageField) {
                image = this.extractValue(data, this._imageField);
            }
            if (isNil(formattedText)) {
                return null;
            }
            return {
                description: formattedDesc,
                image: image,
                originalObject: data,
                title: formattedText
            };
        };
        CompleterBaseData.prototype.extractMatches = function (data, term) {
            var _this = this;
            var matches = [];
            var searchFields = this._searchFields ? this._searchFields.split(",") : null;
            if (this._searchFields !== null && this._searchFields !== undefined && term !== "") {
                matches = data.filter(function (item) {
                    var values = searchFields ? _this.extractBySearchFields(searchFields, item) : [item];
                    return values.some(function (value) { return value
                        .toString()
                        .toLowerCase()
                        .indexOf(term.toString().toLowerCase()) >= 0; });
                });
            }
            else {
                matches = data;
            }
            return matches;
        };
        CompleterBaseData.prototype.extractTitle = function (item) {
            var _this = this;
            // split title fields and run extractValue for each and join with ' '
            if (!this._titleField) {
                return "";
            }
            return this._titleField.split(",")
                .map(function (field) {
                return _this.extractValue(item, field);
            })
                .reduce(function (acc, titlePart) { return acc ? "".concat(acc, " ").concat(titlePart) : titlePart; });
        };
        CompleterBaseData.prototype.extractValue = function (obj, key) {
            var keys;
            var result;
            if (key) {
                keys = key.split(".");
                result = obj;
                for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    key = keys_1[_i];
                    if (result) {
                        result = result[key];
                    }
                }
            }
            else {
                result = obj;
            }
            return result;
        };
        CompleterBaseData.prototype.processResults = function (matches) {
            var i;
            var results = [];
            if (matches && matches.length > 0) {
                for (i = 0; i < matches.length; i++) {
                    var item = this.convertToItem(matches[i]);
                    if (item) {
                        results.push(item);
                    }
                }
            }
            return results;
        };
        CompleterBaseData.prototype.extractBySearchFields = function (searchFields, item) {
            var _this = this;
            return searchFields
                .map(function (searchField) { return _this.extractValue(item, searchField); }).filter(function (value) { return !!value; });
        };
        return CompleterBaseData;
    }(Subject));

    var LocalData = /** @class */ (function (_super) {
        __extends(LocalData, _super);
        function LocalData() {
            var _this = _super.call(this) || this;
            _this.dataSourceChange = new core.EventEmitter();
            _this._data = [];
            _this.savedTerm = null;
            return _this;
        }
        LocalData.prototype.data = function (data) {
            var _this = this;
            if (data instanceof Observable) {
                var data$ = data;
                data$
                    .pipe(operators.catchError(function () { return []; }))
                    .subscribe(function (res) {
                    _this._data = res;
                    if (_this.savedTerm) {
                        _this.search(_this.savedTerm);
                    }
                    _this.dataSourceChange.emit();
                });
            }
            else {
                this._data = data;
            }
            this.dataSourceChange.emit();
            return this;
        };
        LocalData.prototype.search = function (term) {
            if (!this._data) {
                this.savedTerm = term;
            }
            else {
                this.savedTerm = null;
                var matches = this.extractMatches(this._data, term);
                this.next(this.processResults(matches));
            }
        };
        LocalData.prototype.convertToItem = function (data) {
            return _super.prototype.convertToItem.call(this, data);
        };
        return LocalData;
    }(CompleterBaseData));

    var RemoteData = /** @class */ (function (_super) {
        __extends(RemoteData, _super);
        function RemoteData(http) {
            var _this = _super.call(this) || this;
            _this.http = http;
            _this.dataSourceChange = new core.EventEmitter();
            _this._remoteUrl = null;
            _this.remoteSearch = null;
            _this._urlFormater = null;
            _this._dataField = null;
            return _this;
        }
        RemoteData.prototype.remoteUrl = function (remoteUrl) {
            this._remoteUrl = remoteUrl;
            this.dataSourceChange.emit();
            return this;
        };
        RemoteData.prototype.urlFormater = function (urlFormater) {
            this._urlFormater = urlFormater;
        };
        RemoteData.prototype.dataField = function (dataField) {
            this._dataField = dataField;
        };
        RemoteData.prototype.requestOptions = function (requestOptions) {
            this._requestOptions = requestOptions;
        };
        RemoteData.prototype.search = function (term) {
            var _this = this;
            this.cancel();
            // let params = {};
            var url = "";
            if (this._urlFormater) {
                url = this._urlFormater(term);
            }
            else {
                url = this._remoteUrl + encodeURIComponent(term);
            }
            this.remoteSearch = this.http
                .get(url, Object.assign({}, this._requestOptions))
                .pipe(operators.map(function (data) {
                var matches = _this.extractValue(data, _this._dataField);
                return _this.extractMatches(matches, term);
            }), operators.catchError(function () { return []; }))
                .subscribe(function (matches) {
                var results = _this.processResults(matches);
                _this.next(results);
            });
        };
        RemoteData.prototype.cancel = function () {
            if (this.remoteSearch) {
                this.remoteSearch.unsubscribe();
            }
        };
        RemoteData.prototype.convertToItem = function (data) {
            return _super.prototype.convertToItem.call(this, data);
        };
        return RemoteData;
    }(CompleterBaseData));

    var LocalDataFactory = /** @class */ (function () {
        function LocalDataFactory() {
        }
        LocalDataFactory.prototype.create = function () {
            return new LocalData();
        };
        LocalDataFactory.ɵfac = function LocalDataFactory_Factory(t) { return new (t || LocalDataFactory)(); };
        LocalDataFactory.ɵprov = /*@__PURE__*/ core["ɵɵdefineInjectable"]({ token: LocalDataFactory, factory: LocalDataFactory.ɵfac });
        return LocalDataFactory;
    }());
    (function () { (typeof ngDevMode === "undefined" || ngDevMode) && core["ɵsetClassMetadata"](LocalDataFactory, [{
            type: core.Injectable
        }], null, null); })();

    var RemoteDataFactory = /** @class */ (function () {
        function RemoteDataFactory(http) {
            this.http = http;
        }
        RemoteDataFactory.prototype.create = function () {
            return new RemoteData(this.http);
        };
        RemoteDataFactory.ɵfac = function RemoteDataFactory_Factory(t) { return new (t || RemoteDataFactory)(core["ɵɵinject"](http.HttpClient)); };
        RemoteDataFactory.ɵprov = /*@__PURE__*/ core["ɵɵdefineInjectable"]({ token: RemoteDataFactory, factory: RemoteDataFactory.ɵfac });
        return RemoteDataFactory;
    }());
    (function () { (typeof ngDevMode === "undefined" || ngDevMode) && core["ɵsetClassMetadata"](RemoteDataFactory, [{
            type: core.Injectable
        }], function () { return [{ type: http.HttpClient }]; }, null); })();

    var CompleterService = /** @class */ (function () {
        function CompleterService(localDataFactory, // Using any instead of () => LocalData because of AoT errors
        remoteDataFactory // Using any instead of () => LocalData because of AoT errors
        ) {
            this.localDataFactory = localDataFactory;
            this.remoteDataFactory = remoteDataFactory;
        }
        CompleterService.prototype.local = function (data, searchFields, titleField) {
            if (searchFields === void 0) { searchFields = ""; }
            if (titleField === void 0) { titleField = ""; }
            var localData = this.localDataFactory.create();
            return localData
                .data(data)
                .searchFields(searchFields)
                .titleField(titleField);
        };
        CompleterService.prototype.remote = function (url, searchFields, titleField) {
            if (searchFields === void 0) { searchFields = ""; }
            if (titleField === void 0) { titleField = ""; }
            var remoteData = this.remoteDataFactory.create();
            return remoteData
                .remoteUrl(url)
                .searchFields(searchFields)
                .titleField(titleField);
        };
        CompleterService.ɵfac = function CompleterService_Factory(t) { return new (t || CompleterService)(core["ɵɵinject"](LocalDataFactory), core["ɵɵinject"](RemoteDataFactory)); };
        CompleterService.ɵprov = /*@__PURE__*/ core["ɵɵdefineInjectable"]({ token: CompleterService, factory: CompleterService.ɵfac });
        return CompleterService;
    }());
    (function () { (typeof ngDevMode === "undefined" || ngDevMode) && core["ɵsetClassMetadata"](CompleterService, [{
            type: core.Injectable
        }], function () { return [{ type: LocalDataFactory }, { type: RemoteDataFactory }]; }, null); })();

    var CtrCompleter = /** @class */ (function () {
        function CtrCompleter() {
            this.selected = new core.EventEmitter();
            this.highlighted = new core.EventEmitter();
            this.opened = new core.EventEmitter();
            this.dataSourceChange = new core.EventEmitter();
            this.list = null;
            this.dropdown = null;
            this._hasHighlighted = false;
            this._hasSelected = false;
            this._cancelBlur = false;
            this._isOpen = false;
            this._autoHighlightIndex = null;
        }
        CtrCompleter.prototype.registerList = function (list) {
            this.list = list;
        };
        CtrCompleter.prototype.registerDropdown = function (dropdown) {
            this.dropdown = dropdown;
        };
        CtrCompleter.prototype.onHighlighted = function (item) {
            this.highlighted.emit(item);
            this._hasHighlighted = !!item;
        };
        CtrCompleter.prototype.onSelected = function (item, clearList) {
            if (clearList === void 0) { clearList = true; }
            this.selected.emit(item);
            if (item) {
                this._hasSelected = true;
            }
            if (clearList) {
                this.clear();
            }
        };
        CtrCompleter.prototype.onDataSourceChange = function () {
            if (this.hasSelected) {
                this.selected.emit(null);
                this._hasSelected = false;
            }
            this.dataSourceChange.emit();
        };
        CtrCompleter.prototype.search = function (term) {
            if (this._hasSelected) {
                this.selected.emit(null);
                this._hasSelected = false;
            }
            if (this.list) {
                this.list.search(term);
            }
        };
        CtrCompleter.prototype.clear = function () {
            this._hasHighlighted = false;
            this.isOpen = false;
            if (this.dropdown) {
                this.dropdown.clear();
            }
            if (this.list) {
                this.list.clear();
            }
        };
        CtrCompleter.prototype.selectCurrent = function () {
            if (this.dropdown) {
                this.dropdown.selectCurrent();
            }
        };
        CtrCompleter.prototype.nextRow = function () {
            if (this.dropdown) {
                this.dropdown.nextRow();
            }
        };
        CtrCompleter.prototype.prevRow = function () {
            if (this.dropdown) {
                this.dropdown.prevRow();
            }
        };
        CtrCompleter.prototype.hasHighlighted = function () {
            return this._hasHighlighted;
        };
        CtrCompleter.prototype.cancelBlur = function (cancel) {
            this._cancelBlur = cancel;
        };
        CtrCompleter.prototype.isCancelBlur = function () {
            return this._cancelBlur;
        };
        CtrCompleter.prototype.open = function () {
            if (!this._isOpen && !!this.list) {
                this.isOpen = true;
                this.list.open();
            }
        };
        Object.defineProperty(CtrCompleter.prototype, "isOpen", {
            get: function () {
                return this._isOpen;
            },
            set: function (open) {
                this._isOpen = open;
                this.opened.emit(this._isOpen);
                if (this.list) {
                    this.list.isOpen(open);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CtrCompleter.prototype, "autoHighlightIndex", {
            get: function () {
                return this._autoHighlightIndex;
            },
            set: function (index) {
                this._autoHighlightIndex = index;
                if (this.dropdown) {
                    this.dropdown.highlightRow(this._autoHighlightIndex);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CtrCompleter.prototype, "hasSelected", {
            get: function () {
                return this._hasSelected;
            },
            enumerable: false,
            configurable: true
        });
        CtrCompleter.ɵfac = function CtrCompleter_Factory(t) { return new (t || CtrCompleter)(); };
        CtrCompleter.ɵdir = /*@__PURE__*/ core["ɵɵdefineDirective"]({ type: CtrCompleter, selectors: [["", "ctrCompleter", ""]], outputs: { selected: "selected", highlighted: "highlighted", opened: "opened", dataSourceChange: "dataSourceChange" } });
        return CtrCompleter;
    }());
    (function () { (typeof ngDevMode === "undefined" || ngDevMode) && core["ɵsetClassMetadata"](CtrCompleter, [{
            type: core.Directive,
            args: [{
                    selector: "[ctrCompleter]",
                }]
        }], null, { selected: [{
                type: core.Output
            }], highlighted: [{
                type: core.Output
            }], opened: [{
                type: core.Output
            }], dataSourceChange: [{
                type: core.Output
            }] }); })();

    var CtrRowItem = /** @class */ (function () {
        function CtrRowItem(row, index) {
            this.row = row;
            this.index = index;
        }
        return CtrRowItem;
    }());
    var CtrDropdown = /** @class */ (function () {
        function CtrDropdown(completer, el, zone) {
            this.completer = completer;
            this.el = el;
            this.zone = zone;
            this.rows = [];
            this.isScrollOn = false;
            this._rowMouseDown = false;
            this.completer.registerDropdown(this);
        }
        CtrDropdown.prototype.ngOnDestroy = function () {
            this.completer.registerDropdown(null);
        };
        CtrDropdown.prototype.ngAfterViewInit = function () {
            var _this = this;
            var css = getComputedStyle(this.el.nativeElement);
            var autoHighlightIndex = this.completer.autoHighlightIndex;
            this.isScrollOn = !!css.maxHeight && css.overflowY === "auto";
            if (autoHighlightIndex) {
                this.zone.run(function () {
                    _this.highlightRow(autoHighlightIndex);
                });
            }
        };
        CtrDropdown.prototype.onMouseDown = function (event) {
            var _this = this;
            // Support for canceling blur on IE (issue #158)
            if (!this._rowMouseDown) {
                this.completer.cancelBlur(true);
                this.zone.run(function () {
                    _this.completer.cancelBlur(false);
                });
            }
            else {
                this._rowMouseDown = false;
            }
        };
        CtrDropdown.prototype.registerRow = function (row) {
            var arrIndex = this.rows.findIndex(function (_row) { return _row.index === row.index; });
            if (arrIndex >= 0) {
                this.rows[arrIndex] = row;
            }
            else {
                this.rows.push(row);
            }
        };
        CtrDropdown.prototype.unregisterRow = function (rowIndex) {
            var arrIndex = this.rows.findIndex(function (_row) { return _row.index === rowIndex; });
            this.rows.splice(arrIndex, 1);
            if (this.currHighlighted && rowIndex === this.currHighlighted.index) {
                this.highlightRow(null);
            }
        };
        CtrDropdown.prototype.highlightRow = function (index) {
            var highlighted = this.rows.find(function (row) { return row.index === index; });
            if (isNil(index) || index < 0) {
                if (this.currHighlighted) {
                    this.currHighlighted.row.setHighlighted(false);
                }
                this.currHighlighted = undefined;
                this.completer.onHighlighted(null);
                return;
            }
            if (!highlighted) {
                return;
            }
            if (this.currHighlighted) {
                this.currHighlighted.row.setHighlighted(false);
            }
            this.currHighlighted = highlighted;
            this.currHighlighted.row.setHighlighted(true);
            this.completer.onHighlighted(this.currHighlighted.row.getDataItem());
            if (this.isScrollOn && this.currHighlighted) {
                var rowTop = this.dropdownRowTop();
                if (!rowTop) {
                    return;
                }
                if (rowTop < 0) {
                    this.dropdownScrollTopTo(rowTop - 1);
                }
                else {
                    var row = this.currHighlighted.row.getNativeElement();
                    if (this.dropdownHeight() < row.getBoundingClientRect().bottom) {
                        this.dropdownScrollTopTo(this.dropdownRowOffsetHeight(row));
                        if (this.el.nativeElement.getBoundingClientRect().bottom - this.dropdownRowOffsetHeight(row) < row.getBoundingClientRect().top) {
                            this.dropdownScrollTopTo(row.getBoundingClientRect().top - (this.el.nativeElement.getBoundingClientRect().top + parseInt(getComputedStyle(this.el.nativeElement).paddingTop, 10)));
                        }
                    }
                }
            }
        };
        CtrDropdown.prototype.clear = function () {
            this.rows = [];
        };
        CtrDropdown.prototype.onSelected = function (item) {
            this.completer.onSelected(item);
        };
        CtrDropdown.prototype.rowMouseDown = function () {
            this._rowMouseDown = true;
        };
        CtrDropdown.prototype.selectCurrent = function () {
            if (!!this.currHighlighted && !!this.currHighlighted.row) {
                this.onSelected(this.currHighlighted.row.getDataItem());
            }
            else if (this.rows.length > 0) {
                this.onSelected(this.rows[0].row.getDataItem());
            }
        };
        CtrDropdown.prototype.nextRow = function () {
            var nextRowIndex = 0;
            if (this.currHighlighted) {
                nextRowIndex = this.currHighlighted.index + 1;
            }
            this.highlightRow(nextRowIndex);
        };
        CtrDropdown.prototype.prevRow = function () {
            var nextRowIndex = -1;
            if (this.currHighlighted) {
                nextRowIndex = this.currHighlighted.index - 1;
            }
            this.highlightRow(nextRowIndex);
        };
        CtrDropdown.prototype.dropdownScrollTopTo = function (offset) {
            this.el.nativeElement.scrollTop = this.el.nativeElement.scrollTop + offset;
        };
        CtrDropdown.prototype.dropdownRowTop = function () {
            if (!this.currHighlighted) {
                return;
            }
            return this.currHighlighted.row.getNativeElement().getBoundingClientRect().top -
                (this.el.nativeElement.getBoundingClientRect().top +
                    parseInt(getComputedStyle(this.el.nativeElement).paddingTop, 10));
        };
        CtrDropdown.prototype.dropdownHeight = function () {
            return this.el.nativeElement.getBoundingClientRect().top +
                parseInt(getComputedStyle(this.el.nativeElement).maxHeight, 10);
        };
        CtrDropdown.prototype.dropdownRowOffsetHeight = function (row) {
            var css = getComputedStyle(row.parentElement);
            return row.parentElement.offsetHeight +
                parseInt(css.marginTop, 10) + parseInt(css.marginBottom, 10);
        };
        CtrDropdown.ɵfac = function CtrDropdown_Factory(t) { return new (t || CtrDropdown)(core["ɵɵdirectiveInject"](CtrCompleter, 1), core["ɵɵdirectiveInject"](core.ElementRef), core["ɵɵdirectiveInject"](core.NgZone)); };
        CtrDropdown.ɵdir = /*@__PURE__*/ core["ɵɵdefineDirective"]({ type: CtrDropdown, selectors: [["", "ctrDropdown", ""]], hostBindings: function CtrDropdown_HostBindings(rf, ctx) { if (rf & 1) {
                core["ɵɵlistener"]("mousedown", function CtrDropdown_mousedown_HostBindingHandler($event) { return ctx.onMouseDown($event); });
            } } });
        return CtrDropdown;
    }());
    (function () { (typeof ngDevMode === "undefined" || ngDevMode) && core["ɵsetClassMetadata"](CtrDropdown, [{
            type: core.Directive,
            args: [{
                    selector: "[ctrDropdown]",
                }]
        }], function () { return [{ type: CtrCompleter, decorators: [{
                    type: core.Host
                }] }, { type: core.ElementRef }, { type: core.NgZone }]; }, { onMouseDown: [{
                type: core.HostListener,
                args: ["mousedown", ["$event"]]
            }] }); })();

    // keyboard events
    var KEY_DW = 40;
    var KEY_RT = 39;
    var KEY_UP = 38;
    var KEY_LF = 37;
    var KEY_ES = 27;
    var KEY_EN = 13;
    var KEY_TAB = 9;
    var KEY_BK = 8;
    var KEY_SH = 16;
    var KEY_CL = 20;
    var KEY_F1 = 112;
    var KEY_F12 = 123;
    var CtrInput = /** @class */ (function () {
        function CtrInput(completer, ngModel, el) {
            var _this = this;
            this.completer = completer;
            this.ngModel = ngModel;
            this.el = el;
            this.clearSelected = false;
            this.clearUnselected = false;
            this.overrideSuggested = false;
            this.fillHighlighted = true;
            this.openOnFocus = false;
            this.openOnClick = false;
            this.selectOnClick = false;
            this.selectOnFocus = false;
            this.ngModelChange = new core.EventEmitter();
            this._searchStr = "";
            this._displayStr = "";
            this.blurTimer = null;
            this.completer.selected.subscribe(function (item) {
                if (!item) {
                    return;
                }
                if (_this.clearSelected) {
                    _this.searchStr = "";
                }
                else {
                    _this.searchStr = item.title;
                }
                _this.ngModelChange.emit(_this.searchStr);
            });
            this.completer.highlighted.subscribe(function (item) {
                if (_this.fillHighlighted) {
                    if (item) {
                        _this._displayStr = item.title;
                        _this.ngModelChange.emit(item.title);
                    }
                    else {
                        _this._displayStr = _this.searchStr;
                        _this.ngModelChange.emit(_this.searchStr);
                    }
                }
            });
            this.completer.dataSourceChange.subscribe(function () {
                _this.completer.search(_this.searchStr);
            });
            if (this.ngModel.valueChanges) {
                this.ngModel.valueChanges.subscribe(function (value) {
                    if (!isNil(value) && _this._displayStr !== value) {
                        if (_this.searchStr !== value) {
                            _this.completer.search(value);
                        }
                        _this.searchStr = value;
                    }
                });
            }
        }
        CtrInput.prototype.keyupHandler = function (event) {
            if (event.keyCode === KEY_LF || event.keyCode === KEY_RT || event.keyCode === KEY_TAB) {
                // do nothing
                return;
            }
            if (event.keyCode === KEY_UP || event.keyCode === KEY_EN) {
                event.preventDefault();
            }
            else if (event.keyCode === KEY_DW) {
                event.preventDefault();
                this.completer.search(this.searchStr);
            }
            else if (event.keyCode === KEY_ES) {
                if (this.completer.isOpen) {
                    this.restoreSearchValue();
                    this.completer.clear();
                    event.stopPropagation();
                    event.preventDefault();
                }
            }
        };
        CtrInput.prototype.pasteHandler = function (event) {
            this.completer.open();
        };
        CtrInput.prototype.keydownHandler = function (event) {
            var keyCode = event.keyCode || event.which;
            if (keyCode === KEY_EN) {
                if (this.completer.hasHighlighted()) {
                    event.preventDefault();
                }
                this.handleSelection();
            }
            else if (keyCode === KEY_DW) {
                event.preventDefault();
                this.completer.open();
                this.completer.nextRow();
            }
            else if (keyCode === KEY_UP) {
                event.preventDefault();
                this.completer.prevRow();
            }
            else if (keyCode === KEY_TAB) {
                this.handleSelection();
            }
            else if (keyCode === KEY_BK) {
                this.completer.open();
            }
            else if (keyCode === KEY_ES) {
                // This is very specific to IE10/11 #272
                // without this, IE clears the input text
                event.preventDefault();
                if (this.completer.isOpen) {
                    event.stopPropagation();
                }
            }
            else {
                if (keyCode !== 0 && keyCode !== KEY_SH && keyCode !== KEY_CL &&
                    (keyCode <= KEY_F1 || keyCode >= KEY_F12) &&
                    !event.ctrlKey && !event.metaKey && !event.altKey) {
                    this.completer.open();
                }
            }
        };
        CtrInput.prototype.onBlur = function (event) {
            var _this = this;
            // Check if we need to cancel Blur for IE
            if (this.completer.isCancelBlur()) {
                setTimeout(function () {
                    // get the focus back
                    _this.el.nativeElement.focus();
                }, 0);
                return;
            }
            if (this.completer.isOpen) {
                this.blurTimer = timer(200).pipe(operators.take(1)).subscribe(function () { return _this.doBlur(); });
            }
        };
        CtrInput.prototype.onfocus = function () {
            if (this.blurTimer) {
                this.blurTimer.unsubscribe();
                this.blurTimer = null;
            }
            if (this.selectOnFocus) {
                this.el.nativeElement.select();
            }
            if (this.openOnFocus) {
                this.completer.open();
            }
        };
        CtrInput.prototype.onClick = function (event) {
            if (this.selectOnClick) {
                this.el.nativeElement.select();
            }
            if (this.openOnClick) {
                if (this.completer.isOpen) {
                    this.completer.clear();
                }
                else {
                    this.completer.open();
                }
            }
        };
        Object.defineProperty(CtrInput.prototype, "searchStr", {
            get: function () {
                return this._searchStr;
            },
            set: function (term) {
                this._searchStr = term;
                this._displayStr = term;
            },
            enumerable: false,
            configurable: true
        });
        CtrInput.prototype.handleSelection = function () {
            if (this.completer.hasHighlighted()) {
                this._searchStr = "";
                this.completer.selectCurrent();
            }
            else if (this.overrideSuggested) {
                this.completer.onSelected({ title: this.searchStr, originalObject: null });
            }
            else {
                if (this.clearUnselected && !this.completer.hasSelected) {
                    this.searchStr = "";
                    this.ngModelChange.emit(this.searchStr);
                }
                this.completer.clear();
            }
        };
        CtrInput.prototype.restoreSearchValue = function () {
            if (this.fillHighlighted) {
                if (this._displayStr !== this.searchStr) {
                    this._displayStr = this.searchStr;
                    this.ngModelChange.emit(this.searchStr);
                }
            }
        };
        CtrInput.prototype.doBlur = function () {
            if (this.blurTimer) {
                this.blurTimer.unsubscribe();
                this.blurTimer = null;
            }
            if (this.overrideSuggested) {
                this.completer.onSelected({ title: this.searchStr, originalObject: null });
            }
            else {
                if (this.clearUnselected && !this.completer.hasSelected) {
                    this.searchStr = "";
                    this.ngModelChange.emit(this.searchStr);
                }
                else {
                    this.restoreSearchValue();
                }
            }
            this.completer.clear();
        };
        CtrInput.ɵfac = function CtrInput_Factory(t) { return new (t || CtrInput)(core["ɵɵdirectiveInject"](CtrCompleter, 1), core["ɵɵdirectiveInject"](forms.NgModel), core["ɵɵdirectiveInject"](core.ElementRef)); };
        CtrInput.ɵdir = /*@__PURE__*/ core["ɵɵdefineDirective"]({ type: CtrInput, selectors: [["", "ctrInput", ""]], hostBindings: function CtrInput_HostBindings(rf, ctx) { if (rf & 1) {
                core["ɵɵlistener"]("keyup", function CtrInput_keyup_HostBindingHandler($event) { return ctx.keyupHandler($event); })("paste", function CtrInput_paste_HostBindingHandler($event) { return ctx.pasteHandler($event); })("keydown", function CtrInput_keydown_HostBindingHandler($event) { return ctx.keydownHandler($event); })("blur", function CtrInput_blur_HostBindingHandler($event) { return ctx.onBlur($event); })("focus", function CtrInput_focus_HostBindingHandler() { return ctx.onfocus(); })("click", function CtrInput_click_HostBindingHandler($event) { return ctx.onClick($event); });
            } }, inputs: { clearSelected: "clearSelected", clearUnselected: "clearUnselected", overrideSuggested: "overrideSuggested", fillHighlighted: "fillHighlighted", openOnFocus: "openOnFocus", openOnClick: "openOnClick", selectOnClick: "selectOnClick", selectOnFocus: "selectOnFocus" }, outputs: { ngModelChange: "ngModelChange" } });
        return CtrInput;
    }());
    (function () { (typeof ngDevMode === "undefined" || ngDevMode) && core["ɵsetClassMetadata"](CtrInput, [{
            type: core.Directive,
            args: [{
                    selector: "[ctrInput]",
                }]
        }], function () { return [{ type: CtrCompleter, decorators: [{
                    type: core.Host
                }] }, { type: forms.NgModel }, { type: core.ElementRef }]; }, { clearSelected: [{
                type: core.Input,
                args: ["clearSelected"]
            }], clearUnselected: [{
                type: core.Input,
                args: ["clearUnselected"]
            }], overrideSuggested: [{
                type: core.Input,
                args: ["overrideSuggested"]
            }], fillHighlighted: [{
                type: core.Input,
                args: ["fillHighlighted"]
            }], openOnFocus: [{
                type: core.Input,
                args: ["openOnFocus"]
            }], openOnClick: [{
                type: core.Input,
                args: ["openOnClick"]
            }], selectOnClick: [{
                type: core.Input,
                args: ["selectOnClick"]
            }], selectOnFocus: [{
                type: core.Input,
                args: ["selectOnFocus"]
            }], ngModelChange: [{
                type: core.Output
            }], keyupHandler: [{
                type: core.HostListener,
                args: ["keyup", ["$event"]]
            }], pasteHandler: [{
                type: core.HostListener,
                args: ["paste", ["$event"]]
            }], keydownHandler: [{
                type: core.HostListener,
                args: ["keydown", ["$event"]]
            }], onBlur: [{
                type: core.HostListener,
                args: ["blur", ["$event"]]
            }], onfocus: [{
                type: core.HostListener,
                args: ["focus", []]
            }], onClick: [{
                type: core.HostListener,
                args: ["click", ["$event"]]
            }] }); })();

    var CtrListContext = /** @class */ (function () {
        function CtrListContext(results, searching, searchInitialized, isOpen) {
            this.results = results;
            this.searching = searching;
            this.searchInitialized = searchInitialized;
            this.isOpen = isOpen;
        }
        return CtrListContext;
    }());
    var CtrList = /** @class */ (function () {
        function CtrList(completer, templateRef, viewContainer, cd, zone) {
            this.completer = completer;
            this.templateRef = templateRef;
            this.viewContainer = viewContainer;
            this.cd = cd;
            this.zone = zone;
            this.ctrListMinSearchLength = MIN_SEARCH_LENGTH;
            this.ctrListPause = PAUSE;
            this.ctrListAutoMatch = false;
            this.ctrListAutoHighlight = false;
            this.ctrListDisplaySearching = true;
            this._dataService = null;
            // private results: CompleterItem[] = [];
            this.term = null;
            // private searching = false;
            this.searchTimer = null;
            this.clearTimer = null;
            this.ctx = new CtrListContext([], false, false, false);
            this._initialValue = null;
            this.viewRef = null;
        }
        CtrList.prototype.ngOnInit = function () {
            this.completer.registerList(this);
            this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef, new CtrListContext([], false, false, false));
        };
        Object.defineProperty(CtrList.prototype, "dataService", {
            set: function (newService) {
                this._dataService = newService;
                this.dataServiceSubscribe();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CtrList.prototype, "initialValue", {
            set: function (value) {
                var _this = this;
                if (this._dataService &&
                    typeof this._dataService.convertToItem === "function") {
                    this.zone.run(function () {
                        var initialItem = _this._dataService && _this._dataService.convertToItem(value);
                        if (initialItem) {
                            _this.completer.onSelected(initialItem, false);
                        }
                    });
                }
                else if (!this._dataService) {
                    this._initialValue = value;
                }
            },
            enumerable: false,
            configurable: true
        });
        CtrList.prototype.search = function (term) {
            var _this = this;
            if (!isNil(term) &&
                term.length >= this.ctrListMinSearchLength &&
                this.term !== term) {
                if (this.searchTimer) {
                    this.searchTimer.unsubscribe();
                    this.searchTimer = null;
                }
                if (!this.ctx.searching) {
                    if (this.ctrListDisplaySearching) {
                        this.ctx.results = [];
                    }
                    this.ctx.searching = true;
                    this.ctx.searchInitialized = true;
                    this.refreshTemplate();
                }
                if (this.clearTimer) {
                    this.clearTimer.unsubscribe();
                }
                this.searchTimer = timer(this.ctrListPause)
                    .pipe(operators.take(1))
                    .subscribe(function () {
                    _this.searchTimerComplete(term);
                });
            }
            else if (!isNil(term) && term.length < this.ctrListMinSearchLength) {
                this.clear();
                this.term = "";
            }
        };
        CtrList.prototype.clear = function () {
            var _this = this;
            if (this.searchTimer) {
                this.searchTimer.unsubscribe();
            }
            this.clearTimer = timer(CLEAR_TIMEOUT)
                .pipe(operators.take(1))
                .subscribe(function () {
                _this._clear();
            });
        };
        CtrList.prototype.open = function () {
            if (!this.ctx.searchInitialized) {
                this.search("");
            }
            this.refreshTemplate();
        };
        CtrList.prototype.isOpen = function (open) {
            this.ctx.isOpen = open;
        };
        CtrList.prototype._clear = function () {
            if (this.searchTimer) {
                this.searchTimer.unsubscribe();
                this.searchTimer = null;
            }
            if (this.dataService) {
                this.dataService.cancel();
            }
            this.viewContainer.clear();
            this.viewRef = null;
        };
        CtrList.prototype.searchTimerComplete = function (term) {
            // Begin the search
            if (isNil(term) || term.length < this.ctrListMinSearchLength) {
                this.ctx.searching = false;
                return;
            }
            this.term = term;
            if (this._dataService) {
                this._dataService.search(term);
            }
        };
        CtrList.prototype.refreshTemplate = function () {
            // create the template if it doesn't exist
            if (!this.viewRef) {
                this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef, this.ctx);
            }
            else if (!this.viewRef.destroyed) {
                // refresh the template
                this.viewRef.context.isOpen = this.ctx.isOpen;
                this.viewRef.context.results = this.ctx.results;
                this.viewRef.context.searching = this.ctx.searching;
                this.viewRef.context.searchInitialized = this.ctx.searchInitialized;
                this.viewRef.detectChanges();
            }
            this.cd.markForCheck();
        };
        CtrList.prototype.getBestMatchIndex = function () {
            var _this = this;
            if (!this.ctx.results || !this.term) {
                return null;
            }
            // First try to find the exact term
            var bestMatch = this.ctx.results.findIndex(function (item) { return item.title.toLowerCase() === _this.term.toLocaleLowerCase(); });
            // If not try to find the first item that starts with the term
            if (bestMatch < 0) {
                bestMatch = this.ctx.results.findIndex(function (item) {
                    return item.title.toLowerCase().startsWith(_this.term.toLocaleLowerCase());
                });
            }
            // If not try to find the first item that includes the term
            if (bestMatch < 0) {
                bestMatch = this.ctx.results.findIndex(function (item) {
                    return item.title.toLowerCase().includes(_this.term.toLocaleLowerCase());
                });
            }
            return bestMatch < 0 ? null : bestMatch;
        };
        CtrList.prototype.dataServiceSubscribe = function () {
            var _this = this;
            if (this._dataService) {
                this._dataService.subscribe(function (results) {
                    _this.ctx.searchInitialized = true;
                    _this.ctx.searching = false;
                    _this.ctx.results = results;
                    if (_this.ctrListAutoMatch &&
                        results &&
                        results.length === 1 &&
                        results[0].title &&
                        !isNil(_this.term) &&
                        results[0].title.toLocaleLowerCase() ===
                            _this.term.toLocaleLowerCase()) {
                        // Do automatch
                        _this.completer.onSelected(results[0]);
                        return;
                    }
                    _this.refreshTemplate();
                    if (_this.ctrListAutoHighlight) {
                        _this.completer.autoHighlightIndex = _this.getBestMatchIndex();
                    }
                }, function (error) {
                    // tslint:disable-next-line:no-console
                    console.error(error);
                    // tslint:disable-next-line:no-console
                    console.error("Unexpected error in dataService: errors should be handled by the dataService Observable");
                    return [];
                });
                if (this._dataService.dataSourceChange) {
                    this._dataService.dataSourceChange.subscribe(function () {
                        _this.term = null;
                        _this.ctx.searchInitialized = false;
                        _this.ctx.searching = false;
                        _this.ctx.results = [];
                        _this.refreshTemplate();
                        _this.completer.onDataSourceChange();
                    });
                }
            }
        };
        CtrList.ɵfac = function CtrList_Factory(t) { return new (t || CtrList)(core["ɵɵdirectiveInject"](CtrCompleter, 1), core["ɵɵdirectiveInject"](core.TemplateRef), core["ɵɵdirectiveInject"](core.ViewContainerRef), core["ɵɵdirectiveInject"](core.ChangeDetectorRef), core["ɵɵdirectiveInject"](core.NgZone)); };
        CtrList.ɵdir = /*@__PURE__*/ core["ɵɵdefineDirective"]({ type: CtrList, selectors: [["", "ctrList", ""]], inputs: { ctrListMinSearchLength: "ctrListMinSearchLength", ctrListPause: "ctrListPause", ctrListAutoMatch: "ctrListAutoMatch", ctrListAutoHighlight: "ctrListAutoHighlight", ctrListDisplaySearching: "ctrListDisplaySearching", dataService: ["ctrList", "dataService"], initialValue: ["ctrListInitialValue", "initialValue"] } });
        return CtrList;
    }());
    (function () { (typeof ngDevMode === "undefined" || ngDevMode) && core["ɵsetClassMetadata"](CtrList, [{
            type: core.Directive,
            args: [{
                    selector: "[ctrList]",
                }]
        }], function () { return [{ type: CtrCompleter, decorators: [{
                    type: core.Host
                }] }, { type: core.TemplateRef }, { type: core.ViewContainerRef }, { type: core.ChangeDetectorRef }, { type: core.NgZone }]; }, { ctrListMinSearchLength: [{
                type: core.Input
            }], ctrListPause: [{
                type: core.Input
            }], ctrListAutoMatch: [{
                type: core.Input
            }], ctrListAutoHighlight: [{
                type: core.Input
            }], ctrListDisplaySearching: [{
                type: core.Input
            }], dataService: [{
                type: core.Input,
                args: ["ctrList"]
            }], initialValue: [{
                type: core.Input,
                args: ["ctrListInitialValue"]
            }] }); })();

    var CtrRow = /** @class */ (function () {
        function CtrRow(el, renderer, dropdown) {
            this.el = el;
            this.renderer = renderer;
            this.dropdown = dropdown;
            this.selected = false;
            this._rowIndex = 0;
            this._item = null;
        }
        CtrRow.prototype.ngOnDestroy = function () {
            if (this._rowIndex) {
                this.dropdown.unregisterRow(this._rowIndex);
            }
        };
        Object.defineProperty(CtrRow.prototype, "ctrRow", {
            set: function (index) {
                this._rowIndex = index;
                this.dropdown.registerRow(new CtrRowItem(this, this._rowIndex));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CtrRow.prototype, "dataItem", {
            set: function (item) {
                this._item = item;
            },
            enumerable: false,
            configurable: true
        });
        CtrRow.prototype.onClick = function (event) {
            this.dropdown.onSelected(this._item);
        };
        CtrRow.prototype.onMouseEnter = function (event) {
            this.dropdown.highlightRow(this._rowIndex);
        };
        CtrRow.prototype.onMouseDown = function (event) {
            this.dropdown.rowMouseDown();
        };
        CtrRow.prototype.setHighlighted = function (selected) {
            this.selected = selected;
            if (this.selected) {
                this.renderer.addClass(this.el.nativeElement, "completer-selected-row");
            }
            else {
                this.renderer.removeClass(this.el.nativeElement, "completer-selected-row");
            }
        };
        CtrRow.prototype.getNativeElement = function () {
            return this.el.nativeElement;
        };
        CtrRow.prototype.getDataItem = function () {
            return this._item;
        };
        CtrRow.ɵfac = function CtrRow_Factory(t) { return new (t || CtrRow)(core["ɵɵdirectiveInject"](core.ElementRef), core["ɵɵdirectiveInject"](core.Renderer2), core["ɵɵdirectiveInject"](CtrDropdown, 1)); };
        CtrRow.ɵdir = /*@__PURE__*/ core["ɵɵdefineDirective"]({ type: CtrRow, selectors: [["", "ctrRow", ""]], hostBindings: function CtrRow_HostBindings(rf, ctx) { if (rf & 1) {
                core["ɵɵlistener"]("click", function CtrRow_click_HostBindingHandler($event) { return ctx.onClick($event); })("mouseenter", function CtrRow_mouseenter_HostBindingHandler($event) { return ctx.onMouseEnter($event); })("mousedown", function CtrRow_mousedown_HostBindingHandler($event) { return ctx.onMouseDown($event); });
            } }, inputs: { ctrRow: "ctrRow", dataItem: "dataItem" } });
        return CtrRow;
    }());
    (function () { (typeof ngDevMode === "undefined" || ngDevMode) && core["ɵsetClassMetadata"](CtrRow, [{
            type: core.Directive,
            args: [{
                    selector: "[ctrRow]",
                }]
        }], function () { return [{ type: core.ElementRef }, { type: core.Renderer2 }, { type: CtrDropdown, decorators: [{
                    type: core.Host
                }] }]; }, { ctrRow: [{
                type: core.Input
            }], dataItem: [{
                type: core.Input
            }], onClick: [{
                type: core.HostListener,
                args: ["click", ["$event"]]
            }], onMouseEnter: [{
                type: core.HostListener,
                args: ["mouseenter", ["$event"]]
            }], onMouseDown: [{
                type: core.HostListener,
                args: ["mousedown", ["$event"]]
            }] }); })();

    function CompleterListItemCmp_span_1_Template(rf, ctx) { if (rf & 1) {
        core["ɵɵelementStart"](0, "span", 2);
        core["ɵɵtext"](1);
        core["ɵɵelementEnd"]();
    } if (rf & 2) {
        var part_r1 = ctx.$implicit;
        var ctx_r0 = core["ɵɵnextContext"]();
        core["ɵɵproperty"]("ngClass", part_r1.isMatch ? ctx_r0.matchClass : null);
        core["ɵɵadvance"](1);
        core["ɵɵtextInterpolate"](part_r1.text);
    } }
    var _c0 = function (a0, a1) { return { "completer-title": a0, "completer-description": a1 }; };
    var CompleterListItemCmp = /** @class */ (function () {
        function CompleterListItemCmp() {
            this.text = "";
            this.searchStr = "";
            this.matchClass = "";
            this.type = "";
            this.parts = [];
        }
        CompleterListItemCmp.prototype.ngOnInit = function () {
            if (!this.searchStr) {
                this.parts.push({ isMatch: false, text: this.text });
                return;
            }
            var matchStr = this.text.toLowerCase();
            var matchPos = matchStr.indexOf(this.searchStr.toLowerCase());
            var startIndex = 0;
            while (matchPos >= 0) {
                var matchText = this.text.slice(matchPos, matchPos + this.searchStr.length);
                if (matchPos === 0) {
                    this.parts.push({ isMatch: true, text: matchText });
                    startIndex += this.searchStr.length;
                }
                else if (matchPos > 0) {
                    var matchPart = this.text.slice(startIndex, matchPos);
                    this.parts.push({ isMatch: false, text: matchPart });
                    this.parts.push({ isMatch: true, text: matchText });
                    startIndex += this.searchStr.length + matchPart.length;
                }
                matchPos = matchStr.indexOf(this.searchStr.toLowerCase(), startIndex);
            }
            if (startIndex < this.text.length) {
                this.parts.push({ isMatch: false, text: this.text.slice(startIndex, this.text.length) });
            }
        };
        CompleterListItemCmp.ɵfac = function CompleterListItemCmp_Factory(t) { return new (t || CompleterListItemCmp)(); };
        CompleterListItemCmp.ɵcmp = /*@__PURE__*/ core["ɵɵdefineComponent"]({ type: CompleterListItemCmp, selectors: [["completer-list-item"]], inputs: { text: "text", searchStr: "searchStr", matchClass: "matchClass", type: "type" }, decls: 2, vars: 5, consts: [[1, "completer-list-item-holder", 3, "ngClass"], ["class", "completer-list-item", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "completer-list-item", 3, "ngClass"]], template: function CompleterListItemCmp_Template(rf, ctx) { if (rf & 1) {
                core["ɵɵelementStart"](0, "span", 0);
                core["ɵɵtemplate"](1, CompleterListItemCmp_span_1_Template, 2, 2, "span", 1);
                core["ɵɵelementEnd"]();
            } if (rf & 2) {
                core["ɵɵproperty"]("ngClass", core["ɵɵpureFunction2"](2, _c0, ctx.type === "title", ctx.type === "description"));
                core["ɵɵadvance"](1);
                core["ɵɵproperty"]("ngForOf", ctx.parts);
            } }, dependencies: [common.NgClass, common.NgForOf], encapsulation: 2 });
        return CompleterListItemCmp;
    }());
    (function () { (typeof ngDevMode === "undefined" || ngDevMode) && core["ɵsetClassMetadata"](CompleterListItemCmp, [{
            type: core.Component,
            args: [{
                    selector: "completer-list-item",
                    template: "<span class=\"completer-list-item-holder\" [ngClass]= \"{'completer-title': type === 'title', 'completer-description': type === 'description'}\" >\n        <span class=\"completer-list-item\" *ngFor=\"let part of parts\" [ngClass]= \"part.isMatch ? matchClass : null\">{{part.text}}</span>\n    </span>"
                }]
        }], null, { text: [{
                type: core.Input
            }], searchStr: [{
                type: core.Input
            }], matchClass: [{
                type: core.Input
            }], type: [{
                type: core.Input
            }] }); })();

    var _c0$1 = ["ctrInput"];
    function CompleterCmp_div_3_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
        core["ɵɵelementStart"](0, "div", 10);
        core["ɵɵtext"](1);
        core["ɵɵelementEnd"]();
    } if (rf & 2) {
        var ctx_r7 = core["ɵɵnextContext"](3);
        core["ɵɵadvance"](1);
        core["ɵɵtextInterpolate"](ctx_r7._textSearching);
    } }
    function CompleterCmp_div_3_div_1_div_2_Template(rf, ctx) { if (rf & 1) {
        core["ɵɵelementStart"](0, "div", 11);
        core["ɵɵtext"](1);
        core["ɵɵelementEnd"]();
    } if (rf & 2) {
        var ctx_r8 = core["ɵɵnextContext"](3);
        core["ɵɵadvance"](1);
        core["ɵɵtextInterpolate"](ctx_r8._textNoResults);
    } }
    function CompleterCmp_div_3_div_1_div_3_div_2_img_1_Template(rf, ctx) { if (rf & 1) {
        core["ɵɵelement"](0, "img", 21);
    } if (rf & 2) {
        var item_r10 = core["ɵɵnextContext"](2).$implicit;
        core["ɵɵpropertyInterpolate"]("src", item_r10.image, core["ɵɵsanitizeUrl"]);
    } }
    function CompleterCmp_div_3_div_1_div_3_div_2_div_2_Template(rf, ctx) { if (rf & 1) {
        core["ɵɵelement"](0, "div", 22);
    } }
    function CompleterCmp_div_3_div_1_div_3_div_2_Template(rf, ctx) { if (rf & 1) {
        core["ɵɵelementStart"](0, "div", 18);
        core["ɵɵtemplate"](1, CompleterCmp_div_3_div_1_div_3_div_2_img_1_Template, 1, 1, "img", 19);
        core["ɵɵtemplate"](2, CompleterCmp_div_3_div_1_div_3_div_2_div_2_Template, 1, 0, "div", 20);
        core["ɵɵelementEnd"]();
    } if (rf & 2) {
        var item_r10 = core["ɵɵnextContext"]().$implicit;
        core["ɵɵadvance"](1);
        core["ɵɵproperty"]("ngIf", item_r10.image != "");
        core["ɵɵadvance"](1);
        core["ɵɵproperty"]("ngIf", item_r10.image === "");
    } }
    function CompleterCmp_div_3_div_1_div_3_completer_list_item_5_Template(rf, ctx) { if (rf & 1) {
        core["ɵɵelement"](0, "completer-list-item", 23);
    } if (rf & 2) {
        var item_r10 = core["ɵɵnextContext"]().$implicit;
        var ctx_r13 = core["ɵɵnextContext"](3);
        core["ɵɵproperty"]("text", item_r10.description)("matchClass", ctx_r13.matchClass)("searchStr", ctx_r13.searchStr)("type", "description");
    } }
    var _c1 = function (a0) { return { "completer-item-text-image": a0 }; };
    function CompleterCmp_div_3_div_1_div_3_Template(rf, ctx) { if (rf & 1) {
        core["ɵɵelementStart"](0, "div", 12)(1, "div", 13);
        core["ɵɵtemplate"](2, CompleterCmp_div_3_div_1_div_3_div_2_Template, 3, 2, "div", 14);
        core["ɵɵelementStart"](3, "div", 15);
        core["ɵɵelement"](4, "completer-list-item", 16);
        core["ɵɵtemplate"](5, CompleterCmp_div_3_div_1_div_3_completer_list_item_5_Template, 1, 4, "completer-list-item", 17);
        core["ɵɵelementEnd"]()()();
    } if (rf & 2) {
        var item_r10 = ctx.$implicit;
        var rowIndex_r11 = ctx.index;
        var ctx_r9 = core["ɵɵnextContext"](3);
        core["ɵɵadvance"](1);
        core["ɵɵproperty"]("ctrRow", rowIndex_r11)("dataItem", item_r10);
        core["ɵɵadvance"](1);
        core["ɵɵproperty"]("ngIf", item_r10.image || item_r10.image === "");
        core["ɵɵadvance"](1);
        core["ɵɵproperty"]("ngClass", core["ɵɵpureFunction1"](9, _c1, item_r10.image || item_r10.image === ""));
        core["ɵɵadvance"](1);
        core["ɵɵproperty"]("text", item_r10.title)("matchClass", ctx_r9.matchClass)("searchStr", ctx_r9.searchStr)("type", "title");
        core["ɵɵadvance"](1);
        core["ɵɵproperty"]("ngIf", item_r10.description && item_r10.description != "");
    } }
    function CompleterCmp_div_3_div_1_Template(rf, ctx) { if (rf & 1) {
        core["ɵɵelementStart"](0, "div", 6);
        core["ɵɵtemplate"](1, CompleterCmp_div_3_div_1_div_1_Template, 2, 1, "div", 7);
        core["ɵɵtemplate"](2, CompleterCmp_div_3_div_1_div_2_Template, 2, 1, "div", 8);
        core["ɵɵtemplate"](3, CompleterCmp_div_3_div_1_div_3_Template, 6, 11, "div", 9);
        core["ɵɵelementEnd"]();
    } if (rf & 2) {
        var ctx_r19 = core["ɵɵnextContext"]();
        var searchActive_r3 = ctx_r19.searching;
        var items_r2 = ctx_r19.results;
        var ctx_r6 = core["ɵɵnextContext"]();
        core["ɵɵadvance"](1);
        core["ɵɵproperty"]("ngIf", searchActive_r3 && ctx_r6.displaySearching);
        core["ɵɵadvance"](1);
        core["ɵɵproperty"]("ngIf", !searchActive_r3 && (!items_r2 || (items_r2 == null ? null : items_r2.length) === 0));
        core["ɵɵadvance"](1);
        core["ɵɵproperty"]("ngForOf", items_r2);
    } }
    function CompleterCmp_div_3_Template(rf, ctx) { if (rf & 1) {
        core["ɵɵelementStart"](0, "div", 4);
        core["ɵɵtemplate"](1, CompleterCmp_div_3_div_1_Template, 4, 3, "div", 5);
        core["ɵɵelementEnd"]();
    } if (rf & 2) {
        var items_r2 = ctx.results;
        var searchActive_r3 = ctx.searching;
        var isInitialized_r4 = ctx.searchInitialized;
        var isOpen_r5 = ctx.isOpen;
        var ctx_r1 = core["ɵɵnextContext"]();
        core["ɵɵadvance"](1);
        core["ɵɵproperty"]("ngIf", isInitialized_r4 && isOpen_r5 && ((items_r2 == null ? null : items_r2.length) > 0 || ctx_r1.displayNoResults && !searchActive_r3 || searchActive_r3 && ctx_r1.displaySearching));
    } }
    var noop$1 = function () {
        return;
    };
    var COMPLETER_CONTROL_VALUE_ACCESSOR = {
        multi: true,
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return CompleterCmp; }),
    };
    var CompleterCmp = /** @class */ (function () {
        function CompleterCmp(completerService, cdr) {
            this.completerService = completerService;
            this.cdr = cdr;
            this.inputName = "";
            this.inputId = "";
            this.pause = PAUSE;
            this.minSearchLength = MIN_SEARCH_LENGTH;
            this.maxChars = MAX_CHARS;
            this.overrideSuggested = false;
            this.clearSelected = false;
            this.clearUnselected = false;
            this.fillHighlighted = true;
            this.placeholder = "";
            this.autoMatch = false;
            this.disableInput = false;
            this.autofocus = false;
            this.openOnFocus = false;
            this.openOnClick = false;
            this.selectOnClick = false;
            this.selectOnFocus = false;
            this.autoHighlight = false;
            this.selected = new core.EventEmitter();
            this.highlighted = new core.EventEmitter();
            this.blurEvent = new core.EventEmitter();
            this.click = new core.EventEmitter();
            this.focusEvent = new core.EventEmitter();
            this.opened = new core.EventEmitter();
            this.keyup = new core.EventEmitter();
            this.keydown = new core.EventEmitter();
            this.control = new forms.FormControl("");
            this.displaySearching = true;
            this.displayNoResults = true;
            this._textNoResults = TEXT_NO_RESULTS;
            this._textSearching = TEXT_SEARCHING;
            this._onTouchedCallback = noop$1;
            this._onChangeCallback = noop$1;
            this._focus = false;
            this._open = false;
            this._searchStr = "";
        }
        Object.defineProperty(CompleterCmp.prototype, "value", {
            get: function () { return this.searchStr; },
            set: function (v) {
                if (v !== this.searchStr) {
                    this.searchStr = v;
                }
                // Propagate the change in any case
                this._onChangeCallback(v);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CompleterCmp.prototype, "searchStr", {
            get: function () {
                return this._searchStr;
            },
            set: function (value) {
                if (typeof value === "string" || isNil(value)) {
                    this._searchStr = value;
                }
                else {
                    this._searchStr = JSON.stringify(value);
                }
            },
            enumerable: false,
            configurable: true
        });
        CompleterCmp.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (this.autofocus) {
                this._focus = true;
            }
            if (!this.completer) {
                return;
            }
            this.completer.selected.subscribe(function (item) {
                _this.selected.emit(item);
            });
            this.completer.highlighted.subscribe(function (item) {
                _this.highlighted.emit(item);
            });
            this.completer.opened.subscribe(function (isOpen) {
                _this._open = isOpen;
                _this.opened.emit(isOpen);
            });
        };
        CompleterCmp.prototype.ngAfterViewChecked = function () {
            var _this = this;
            if (this._focus) {
                setTimeout(function () {
                    if (!!_this.ctrInput) {
                        _this.ctrInput.nativeElement.focus();
                        _this._focus = false;
                    }
                }, 0);
            }
        };
        CompleterCmp.prototype.onTouched = function () {
            this._onTouchedCallback();
        };
        CompleterCmp.prototype.writeValue = function (value) {
            this.searchStr = value;
        };
        CompleterCmp.prototype.registerOnChange = function (fn) {
            this._onChangeCallback = fn;
        };
        CompleterCmp.prototype.registerOnTouched = function (fn) {
            this._onTouchedCallback = fn;
        };
        CompleterCmp.prototype.setDisabledState = function (isDisabled) {
            this.disableInput = isDisabled;
        };
        Object.defineProperty(CompleterCmp.prototype, "datasource", {
            set: function (source) {
                if (source) {
                    if (source instanceof Array) {
                        this.dataService = this.completerService.local(source);
                    }
                    else if (typeof (source) === "string") {
                        this.dataService = this.completerService.remote(source);
                    }
                    else {
                        this.dataService = source;
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CompleterCmp.prototype, "textNoResults", {
            set: function (text) {
                if (this._textNoResults !== text) {
                    this._textNoResults = text;
                    this.displayNoResults = !!this._textNoResults && this._textNoResults !== "false";
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CompleterCmp.prototype, "textSearching", {
            set: function (text) {
                if (this._textSearching !== text) {
                    this._textSearching = text;
                    this.displaySearching = !!this._textSearching && this._textSearching !== "false";
                }
            },
            enumerable: false,
            configurable: true
        });
        CompleterCmp.prototype.onBlur = function () {
            this.blurEvent.emit();
            this.onTouched();
            this.cdr.detectChanges();
        };
        CompleterCmp.prototype.onFocus = function () {
            this.focusEvent.emit();
            this.onTouched();
        };
        CompleterCmp.prototype.onClick = function (event) {
            this.click.emit(event);
            this.onTouched();
        };
        CompleterCmp.prototype.onKeyup = function (event) {
            this.keyup.emit(event);
            event.stopPropagation();
        };
        CompleterCmp.prototype.onKeydown = function (event) {
            this.keydown.emit(event);
            event.stopPropagation();
        };
        CompleterCmp.prototype.onChange = function (value) {
            this.value = value;
        };
        CompleterCmp.prototype.open = function () {
            if (!this.completer) {
                return;
            }
            this.completer.open();
        };
        CompleterCmp.prototype.close = function () {
            if (!this.completer) {
                return;
            }
            this.completer.clear();
        };
        CompleterCmp.prototype.focus = function () {
            if (this.ctrInput) {
                this.ctrInput.nativeElement.focus();
            }
            else {
                this._focus = true;
            }
        };
        CompleterCmp.prototype.blur = function () {
            if (this.ctrInput) {
                this.ctrInput.nativeElement.blur();
            }
            else {
                this._focus = false;
            }
        };
        CompleterCmp.prototype.isOpen = function () {
            return this._open;
        };
        CompleterCmp.ɵfac = function CompleterCmp_Factory(t) { return new (t || CompleterCmp)(core["ɵɵdirectiveInject"](CompleterService), core["ɵɵdirectiveInject"](core.ChangeDetectorRef)); };
        CompleterCmp.ɵcmp = /*@__PURE__*/ core["ɵɵdefineComponent"]({ type: CompleterCmp, selectors: [["ng2-completer"]], viewQuery: function CompleterCmp_Query(rf, ctx) { if (rf & 1) {
                core["ɵɵviewQuery"](CtrCompleter, 5);
                core["ɵɵviewQuery"](_c0$1, 5);
            } if (rf & 2) {
                var _t = void 0;
                core["ɵɵqueryRefresh"](_t = core["ɵɵloadQuery"]()) && (ctx.completer = _t.first);
                core["ɵɵqueryRefresh"](_t = core["ɵɵloadQuery"]()) && (ctx.ctrInput = _t.first);
            } }, inputs: { dataService: "dataService", inputName: "inputName", inputId: "inputId", pause: "pause", minSearchLength: "minSearchLength", maxChars: "maxChars", overrideSuggested: "overrideSuggested", clearSelected: "clearSelected", clearUnselected: "clearUnselected", fillHighlighted: "fillHighlighted", placeholder: "placeholder", matchClass: "matchClass", fieldTabindex: "fieldTabindex", autoMatch: "autoMatch", disableInput: "disableInput", inputClass: "inputClass", autofocus: "autofocus", openOnFocus: "openOnFocus", openOnClick: "openOnClick", selectOnClick: "selectOnClick", selectOnFocus: "selectOnFocus", initialValue: "initialValue", autoHighlight: "autoHighlight", datasource: "datasource", textNoResults: "textNoResults", textSearching: "textSearching" }, outputs: { selected: "selected", highlighted: "highlighted", blurEvent: "blur", click: "click", focusEvent: "focus", opened: "opened", keyup: "keyup", keydown: "keydown" }, features: [core["ɵɵProvidersFeature"]([COMPLETER_CONTROL_VALUE_ACCESSOR])], decls: 4, vars: 23, consts: [["ctrCompleter", "", 1, "completer-holder"], ["type", "search", "ctrInput", "", "autocomplete", "off", "autocorrect", "off", "autocapitalize", "off", 1, "completer-input", 3, "ngClass", "ngModel", "placeholder", "tabindex", "disabled", "clearSelected", "clearUnselected", "overrideSuggested", "openOnFocus", "fillHighlighted", "openOnClick", "selectOnClick", "selectOnFocus", "ngModelChange", "blur", "focus", "keyup", "keydown", "click"], ["ctrInput", ""], ["class", "completer-dropdown-holder", 4, "ctrList", "ctrListMinSearchLength", "ctrListPause", "ctrListAutoMatch", "ctrListInitialValue", "ctrListAutoHighlight", "ctrListDisplaySearching"], [1, "completer-dropdown-holder"], ["class", "completer-dropdown", "ctrDropdown", "", 4, "ngIf"], ["ctrDropdown", "", 1, "completer-dropdown"], ["class", "completer-searching", 4, "ngIf"], ["class", "completer-no-results", 4, "ngIf"], ["class", "completer-row-wrapper", 4, "ngFor", "ngForOf"], [1, "completer-searching"], [1, "completer-no-results"], [1, "completer-row-wrapper"], [1, "completer-row", 3, "ctrRow", "dataItem"], ["class", "completer-image-holder", 4, "ngIf"], [1, "completer-item-text", 3, "ngClass"], [1, "completer-title", 3, "text", "matchClass", "searchStr", "type"], ["class", "completer-description", 3, "text", "matchClass", "searchStr", "type", 4, "ngIf"], [1, "completer-image-holder"], ["class", "completer-image", 3, "src", 4, "ngIf"], ["class", "completer-image-default", 4, "ngIf"], [1, "completer-image", 3, "src"], [1, "completer-image-default"], [1, "completer-description", 3, "text", "matchClass", "searchStr", "type"]], template: function CompleterCmp_Template(rf, ctx) { if (rf & 1) {
                core["ɵɵelementStart"](0, "div", 0)(1, "input", 1, 2);
                core["ɵɵlistener"]("ngModelChange", function CompleterCmp_Template_input_ngModelChange_1_listener($event) { return ctx.searchStr = $event; })("ngModelChange", function CompleterCmp_Template_input_ngModelChange_1_listener($event) { return ctx.onChange($event); })("blur", function CompleterCmp_Template_input_blur_1_listener() { return ctx.onBlur(); })("focus", function CompleterCmp_Template_input_focus_1_listener() { return ctx.onFocus(); })("keyup", function CompleterCmp_Template_input_keyup_1_listener($event) { return ctx.onKeyup($event); })("keydown", function CompleterCmp_Template_input_keydown_1_listener($event) { return ctx.onKeydown($event); })("click", function CompleterCmp_Template_input_click_1_listener($event) { return ctx.onClick($event); });
                core["ɵɵelementEnd"]();
                core["ɵɵtemplate"](3, CompleterCmp_div_3_Template, 2, 1, "div", 3);
                core["ɵɵelementEnd"]();
            } if (rf & 2) {
                core["ɵɵadvance"](1);
                core["ɵɵproperty"]("ngClass", ctx.inputClass)("ngModel", ctx.searchStr)("placeholder", ctx.placeholder)("tabindex", ctx.fieldTabindex)("disabled", ctx.disableInput)("clearSelected", ctx.clearSelected)("clearUnselected", ctx.clearUnselected)("overrideSuggested", ctx.overrideSuggested)("openOnFocus", ctx.openOnFocus)("fillHighlighted", ctx.fillHighlighted)("openOnClick", ctx.openOnClick)("selectOnClick", ctx.selectOnClick)("selectOnFocus", ctx.selectOnFocus);
                core["ɵɵattribute"]("id", ctx.inputId.length > 0 ? ctx.inputId : null)("name", ctx.inputName)("maxlength", ctx.maxChars);
                core["ɵɵadvance"](2);
                core["ɵɵproperty"]("ctrList", ctx.dataService)("ctrListMinSearchLength", ctx.minSearchLength)("ctrListPause", ctx.pause)("ctrListAutoMatch", ctx.autoMatch)("ctrListInitialValue", ctx.initialValue)("ctrListAutoHighlight", ctx.autoHighlight)("ctrListDisplaySearching", ctx.displaySearching);
            } }, dependencies: [common.NgClass, common.NgForOf, common.NgIf, forms.DefaultValueAccessor, forms.NgControlStatus, forms.NgModel, CompleterListItemCmp, CtrCompleter, CtrDropdown, CtrInput, CtrList, CtrRow], styles: [".completer-dropdown[_ngcontent-%COMP%] {\n        border-color: #ececec;\n        border-width: 1px;\n        border-style: solid;\n        border-radius: 2px;\n        width: 250px;\n        padding: 6px;\n        cursor: pointer;\n        z-index: 9999;\n        position: absolute;\n        margin-top: -6px;\n        background-color: #ffffff;\n    }\n\n    .completer-row[_ngcontent-%COMP%] {\n        padding: 5px;\n        color: #000000;\n        margin-bottom: 4px;\n        clear: both;\n        display: inline-block;\n        width: 103%;\n    }\n\n    .completer-selected-row[_ngcontent-%COMP%] {\n        background-color: lightblue;\n        color: #ffffff;\n    }\n\n    .completer-description[_ngcontent-%COMP%] {\n        font-size: 14px;\n    }\n\n    .completer-image-default[_ngcontent-%COMP%] {\n        width: 16px;\n        height: 16px;\n        background-image: url(\"demo/res/img/default.png\");\n    }\n\n    .completer-image-holder[_ngcontent-%COMP%] {\n        float: left;\n        width: 10%;\n    }\n    .completer-item-text-image[_ngcontent-%COMP%] {\n        float: right;\n        width: 90%;\n    }"] });
        return CompleterCmp;
    }());
    (function () { (typeof ngDevMode === "undefined" || ngDevMode) && core["ɵsetClassMetadata"](CompleterCmp, [{
            type: core.Component,
            args: [{ selector: "ng2-completer", template: "\n        <div class=\"completer-holder\" ctrCompleter>\n            <input #ctrInput [attr.id]=\"inputId.length > 0 ? inputId : null\" type=\"search\"\n                class=\"completer-input\" ctrInput [ngClass]=\"inputClass\"\n                [(ngModel)]=\"searchStr\" (ngModelChange)=\"onChange($event)\"\n                [attr.name]=\"inputName\" [placeholder]=\"placeholder\"\n                [attr.maxlength]=\"maxChars\" [tabindex]=\"fieldTabindex\" [disabled]=\"disableInput\"\n                [clearSelected]=\"clearSelected\" [clearUnselected]=\"clearUnselected\"\n                [overrideSuggested]=\"overrideSuggested\" [openOnFocus]=\"openOnFocus\" [fillHighlighted]=\"fillHighlighted\"\n                [openOnClick]=\"openOnClick\" [selectOnClick]=\"selectOnClick\" [selectOnFocus]=\"selectOnFocus\"\n                (blur)=\"onBlur()\" (focus)=\"onFocus()\" (keyup)=\"onKeyup($event)\"\n                (keydown)=\"onKeydown($event)\" (click)=\"onClick($event)\"\n                autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" />\n\n            <div class=\"completer-dropdown-holder\"\n                *ctrList=\"dataService;\n                    minSearchLength: minSearchLength;\n                    pause: pause;\n                    autoMatch: autoMatch;\n                    initialValue: initialValue;\n                    autoHighlight: autoHighlight;\n                    displaySearching: displaySearching;\n                    let items = results;\n                    let searchActive = searching;\n                    let isInitialized = searchInitialized;\n                    let isOpen = isOpen;\">\n                <div class=\"completer-dropdown\" ctrDropdown\n                    *ngIf=\"isInitialized && isOpen && (( items?.length > 0|| (displayNoResults && !searchActive)) || (searchActive && displaySearching))\">\n                    <div *ngIf=\"searchActive && displaySearching\" class=\"completer-searching\">{{ _textSearching }}</div>\n                    <div *ngIf=\"!searchActive && (!items || items?.length === 0)\"\n                    class=\"completer-no-results\">{{ _textNoResults }}</div>\n                    <div class=\"completer-row-wrapper\" *ngFor=\"let item of items; let rowIndex=index\">\n                        <div class=\"completer-row\" [ctrRow]=\"rowIndex\" [dataItem]=\"item\">\n                            <div *ngIf=\"item.image || item.image === ''\" class=\"completer-image-holder\">\n                                <img *ngIf=\"item.image != ''\" src=\"{{item.image}}\" class=\"completer-image\" />\n                                <div *ngIf=\"item.image === ''\" class=\"completer-image-default\"></div>\n                            </div>\n                            <div class=\"completer-item-text\"\n                            [ngClass]=\"{'completer-item-text-image': item.image || item.image === '' }\">\n                                <completer-list-item\n                                class=\"completer-title\" [text]=\"item.title\" [matchClass]=\"matchClass\"\n                                [searchStr]=\"searchStr\" [type]=\"'title'\"></completer-list-item>\n                                <completer-list-item *ngIf=\"item.description && item.description != ''\"\n                                class=\"completer-description\" [text]=\"item.description\"\n                                    [matchClass]=\"matchClass\" [searchStr]=\"searchStr\" [type]=\"'description'\">\n                                </completer-list-item>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ", providers: [COMPLETER_CONTROL_VALUE_ACCESSOR], styles: ["\n    .completer-dropdown {\n        border-color: #ececec;\n        border-width: 1px;\n        border-style: solid;\n        border-radius: 2px;\n        width: 250px;\n        padding: 6px;\n        cursor: pointer;\n        z-index: 9999;\n        position: absolute;\n        margin-top: -6px;\n        background-color: #ffffff;\n    }\n\n    .completer-row {\n        padding: 5px;\n        color: #000000;\n        margin-bottom: 4px;\n        clear: both;\n        display: inline-block;\n        width: 103%;\n    }\n\n    .completer-selected-row {\n        background-color: lightblue;\n        color: #ffffff;\n    }\n\n    .completer-description {\n        font-size: 14px;\n    }\n\n    .completer-image-default {\n        width: 16px;\n        height: 16px;\n        background-image: url(\"demo/res/img/default.png\");\n    }\n\n    .completer-image-holder {\n        float: left;\n        width: 10%;\n    }\n    .completer-item-text-image {\n        float: right;\n        width: 90%;\n    }\n    "] }]
        }], function () { return [{ type: CompleterService }, { type: core.ChangeDetectorRef }]; }, { dataService: [{
                type: core.Input
            }], inputName: [{
                type: core.Input
            }], inputId: [{
                type: core.Input
            }], pause: [{
                type: core.Input
            }], minSearchLength: [{
                type: core.Input
            }], maxChars: [{
                type: core.Input
            }], overrideSuggested: [{
                type: core.Input
            }], clearSelected: [{
                type: core.Input
            }], clearUnselected: [{
                type: core.Input
            }], fillHighlighted: [{
                type: core.Input
            }], placeholder: [{
                type: core.Input
            }], matchClass: [{
                type: core.Input
            }], fieldTabindex: [{
                type: core.Input
            }], autoMatch: [{
                type: core.Input
            }], disableInput: [{
                type: core.Input
            }], inputClass: [{
                type: core.Input
            }], autofocus: [{
                type: core.Input
            }], openOnFocus: [{
                type: core.Input
            }], openOnClick: [{
                type: core.Input
            }], selectOnClick: [{
                type: core.Input
            }], selectOnFocus: [{
                type: core.Input
            }], initialValue: [{
                type: core.Input
            }], autoHighlight: [{
                type: core.Input
            }], selected: [{
                type: core.Output
            }], highlighted: [{
                type: core.Output
            }], blurEvent: [{
                type: core.Output,
                args: ["blur"]
            }], click: [{
                type: core.Output
            }], focusEvent: [{
                type: core.Output,
                args: ["focus"]
            }], opened: [{
                type: core.Output
            }], keyup: [{
                type: core.Output
            }], keydown: [{
                type: core.Output
            }], completer: [{
                type: core.ViewChild,
                args: [CtrCompleter, { static: false }]
            }], ctrInput: [{
                type: core.ViewChild,
                args: ["ctrInput", { static: false }]
            }], datasource: [{
                type: core.Input
            }], textNoResults: [{
                type: core.Input
            }], textSearching: [{
                type: core.Input
            }] }); })();

    var providers = [
        CompleterService,
        LocalDataFactory,
        RemoteDataFactory
    ];
    var Ng2CompleterModule = /** @class */ (function () {
        function Ng2CompleterModule() {
        }
        Ng2CompleterModule.forRoot = function () {
            return {
                ngModule: Ng2CompleterModule,
                providers: providers
            };
        };
        Ng2CompleterModule.forChild = function () {
            return {
                ngModule: Ng2CompleterModule,
                providers: providers
            };
        };
        Ng2CompleterModule.ɵfac = function Ng2CompleterModule_Factory(t) { return new (t || Ng2CompleterModule)(); };
        Ng2CompleterModule.ɵmod = /*@__PURE__*/ core["ɵɵdefineNgModule"]({ type: Ng2CompleterModule });
        Ng2CompleterModule.ɵinj = /*@__PURE__*/ core["ɵɵdefineInjector"]({ providers: providers, imports: [common.CommonModule,
                forms.FormsModule] });
        return Ng2CompleterModule;
    }());
    (function () { (typeof ngDevMode === "undefined" || ngDevMode) && core["ɵsetClassMetadata"](Ng2CompleterModule, [{
            type: core.NgModule,
            args: [{
                    declarations: [
                        CompleterListItemCmp,
                        CtrCompleter,
                        CtrDropdown,
                        CtrInput,
                        CtrList,
                        CtrRow,
                        CompleterCmp
                    ],
                    exports: [
                        CompleterListItemCmp,
                        CtrCompleter,
                        CtrDropdown,
                        CtrInput,
                        CtrList,
                        CtrRow,
                        CompleterCmp
                    ],
                    imports: [
                        common.CommonModule,
                        forms.FormsModule
                    ],
                    providers: providers
                }]
        }], null, null); })();
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && core["ɵɵsetNgModuleScope"](Ng2CompleterModule, { declarations: [CompleterListItemCmp,
            CtrCompleter,
            CtrDropdown,
            CtrInput,
            CtrList,
            CtrRow,
            CompleterCmp], imports: [common.CommonModule,
            forms.FormsModule], exports: [CompleterListItemCmp,
            CtrCompleter,
            CtrDropdown,
            CtrInput,
            CtrList,
            CtrRow,
            CompleterCmp] }); })();

    exports.CompleterCmp = CompleterCmp;
    exports.CompleterListItemCmp = CompleterListItemCmp;
    exports.CompleterService = CompleterService;
    exports.CtrCompleter = CtrCompleter;
    exports.CtrDropdown = CtrDropdown;
    exports.CtrInput = CtrInput;
    exports.CtrList = CtrList;
    exports.CtrRow = CtrRow;
    exports.LocalData = LocalData;
    exports.LocalDataFactory = LocalDataFactory;
    exports.Ng2CompleterModule = Ng2CompleterModule;
    exports.RemoteData = RemoteData;
    exports.RemoteDataFactory = RemoteDataFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng2-completer.umd.js.map
