
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop$1() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function self(fn) {
        return function (event) {
            // @ts-ignore
            if (event.target === this)
                fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value == null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    /**
     * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
     * Event dispatchers are functions that can take two arguments: `name` and `detail`.
     *
     * Component events created with `createEventDispatcher` create a
     * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
     * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
     * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
     * property and can contain any type of data.
     *
     * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
     */
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop$1,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop$1;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop$1;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        if (has_stop_immediate_propagation)
            modifiers.push('stopImmediatePropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    function construct_svelte_component_dev(component, props) {
        const error_message = 'this={...} of <svelte:component> should specify a Svelte component.';
        try {
            const instance = new component(props);
            if (!instance.$$ || !instance.$set || !instance.$on || !instance.$destroy) {
                throw new Error(error_message);
            }
            return instance;
        }
        catch (err) {
            const { message } = err;
            if (typeof message === 'string' && message.indexOf('is not a constructor') !== -1) {
                throw new Error(error_message);
            }
            else {
                throw err;
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/Components/SpotifyWidget.svelte generated by Svelte v3.59.2 */

    const { console: console_1$1 } = globals;
    const file$b = "src/Components/SpotifyWidget.svelte";

    function create_fragment$b(ctx) {
    	let main;
    	let img;
    	let t0;
    	let div0;
    	let p0;
    	let t2;
    	let b;
    	let p1;
    	let t3;
    	let p2;
    	let t4;
    	let div1;
    	let p3;

    	const block = {
    		c: function create() {
    			main = element("main");
    			img = element("img");
    			t0 = space();
    			div0 = element("div");
    			p0 = element("p");
    			p0.textContent = "Listening to...";
    			t2 = space();
    			b = element("b");
    			p1 = element("p");
    			t3 = space();
    			p2 = element("p");
    			t4 = space();
    			div1 = element("div");
    			p3 = element("p");
    			attr_dev(img, "id", "player-album-art");
    			attr_dev(img, "width", "80");
    			attr_dev(img, "height", "80");
    			attr_dev(img, "class", "svelte-1mh8saf");
    			add_location(img, file$b, 86, 4, 2894);
    			attr_dev(p0, "class", "svelte-1mh8saf");
    			add_location(p0, file$b, 88, 8, 2979);
    			attr_dev(p1, "id", "player-song");
    			attr_dev(p1, "class", "svelte-1mh8saf");
    			add_location(p1, file$b, 89, 11, 3013);
    			attr_dev(b, "class", "svelte-1mh8saf");
    			add_location(b, file$b, 89, 8, 3010);
    			attr_dev(p2, "id", "player-artist");
    			attr_dev(p2, "class", "svelte-1mh8saf");
    			add_location(p2, file$b, 90, 8, 3050);
    			attr_dev(div0, "id", "player-right");
    			attr_dev(div0, "class", "svelte-1mh8saf");
    			add_location(div0, file$b, 87, 4, 2947);
    			attr_dev(p3, "id", "player-progress");
    			add_location(p3, file$b, 93, 8, 3128);
    			attr_dev(div1, "id", "player-far-right");
    			attr_dev(div1, "class", "svelte-1mh8saf");
    			add_location(div1, file$b, 92, 4, 3092);
    			attr_dev(main, "class", "svelte-1mh8saf");
    			add_location(main, file$b, 85, 0, 2883);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, img);
    			append_dev(main, t0);
    			append_dev(main, div0);
    			append_dev(div0, p0);
    			append_dev(div0, t2);
    			append_dev(div0, b);
    			append_dev(b, p1);
    			append_dev(div0, t3);
    			append_dev(div0, p2);
    			append_dev(main, t4);
    			append_dev(main, div1);
    			append_dev(div1, p3);
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function generateProgressBar(progressMs, durationMs, width = 10) {
    	const progressSeconds = Math.ceil(progressMs / 1000);
    	const totalSeconds = Math.ceil(durationMs / 1000);
    	const progressPercentage = progressSeconds / totalSeconds * 100;
    	const progressBarLength = Math.floor(progressPercentage * (width / 100));
    	const progressBar = "[" + ("#").repeat(progressBarLength) + ("_").repeat(width - progressBarLength) + "]";
    	return progressBar;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SpotifyWidget', slots, []);
    	var serviceHost = "https://spotify-status.evelinear.workers.dev";
    	var spotifyUser = "Eve";
    	let songData = null;
    	let progressInterval = null;

    	function updatePlayer() {
    		fetch(`${serviceHost}/get-now-playing`).then(response => response.json()).then(data => {
    			if (data.ERROR || !data.is_playing) {
    				resetPlayer();
    				return;
    			}

    			songData = data;
    			updateUI();
    			startProgressTimer();
    		}).catch(error => {
    			console.error('Error fetching data:', error);
    			resetPlayer();
    		});
    	}

    	function resetPlayer() {
    		songData = null;
    		clearInterval(progressInterval);
    		updateUI();
    	}

    	function updateUI() {
    		if (document.getElementById("player-album-art") == null) {
    			return;
    		}

    		const playerSong = document.getElementById("player-song");
    		const playerArtist = document.getElementById("player-artist");
    		const playerAlbumArt = document.getElementById("player-album-art");
    		const playerProgress = document.getElementById("player-progress");

    		if (!songData) {
    			playerAlbumArt.setAttribute("src", "/assets/404.webp");
    			playerSong.textContent = "Not playing anything";
    			playerArtist.textContent = "";
    			playerProgress.textContent = "";
    		} else {
    			playerSong.textContent = songData.item.name;
    			playerArtist.textContent = " - " + songData.item.artists[0].name;
    			playerAlbumArt.setAttribute("src", songData.item.album.images[1].url);
    			var space_width = Math.round(document.getElementById("player-far-right").offsetWidth);
    			const progressBar = generateProgressBar(songData.progress_ms, songData.item.duration_ms, space_width / 14);
    			playerProgress.textContent = progressBar;
    		}
    	}

    	function startProgressTimer() {
    		clearInterval(progressInterval);
    		progressInterval = setInterval(updatePlayer, 4000);
    	}

    	// Periodically check for player updates
    	setInterval(updatePlayer, 10000);

    	// Initial load
    	onMount(() => {
    		updatePlayer();
    		document.getElementById("player-progress").innerHTML = "";
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<SpotifyWidget> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		onMount,
    		serviceHost,
    		spotifyUser,
    		songData,
    		progressInterval,
    		updatePlayer,
    		resetPlayer,
    		updateUI,
    		generateProgressBar,
    		startProgressTimer
    	});

    	$$self.$inject_state = $$props => {
    		if ('serviceHost' in $$props) serviceHost = $$props.serviceHost;
    		if ('spotifyUser' in $$props) spotifyUser = $$props.spotifyUser;
    		if ('songData' in $$props) songData = $$props.songData;
    		if ('progressInterval' in $$props) progressInterval = $$props.progressInterval;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [];
    }

    class SpotifyWidget extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SpotifyWidget",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src/Sections/about.svelte generated by Svelte v3.59.2 */
    const file$a = "src/Sections/about.svelte";

    function create_fragment$a(ctx) {
    	let main;
    	let div8;
    	let div2;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let div1;
    	let h1;
    	let t2;
    	let h20;
    	let t4;
    	let h3;
    	let t6;
    	let h4;
    	let t8;
    	let div7;
    	let div3;
    	let t9;
    	let a0;
    	let span0;
    	let t10;
    	let div4;
    	let t11;
    	let a1;
    	let span1;
    	let t12;
    	let div5;
    	let t13;
    	let a2;
    	let span2;
    	let t14;
    	let div6;
    	let t15;
    	let a3;
    	let span3;
    	let t16;
    	let div9;
    	let h21;
    	let t18;
    	let p;
    	let t19;
    	let i;
    	let t21;
    	let br0;
    	let br1;
    	let t22;
    	let br2;
    	let br3;
    	let t23;
    	let t24;
    	let div10;
    	let switch_instance;
    	let current;
    	var switch_value = SpotifyWidget;

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    	}

    	const block = {
    		c: function create() {
    			main = element("main");
    			div8 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			div1 = element("div");
    			h1 = element("h1");
    			h1.textContent = "MRNDREAMS";
    			t2 = space();
    			h20 = element("h2");
    			h20.textContent = "evelyn";
    			t4 = space();
    			h3 = element("h3");
    			h3.textContent = "evie";
    			t6 = space();
    			h4 = element("h4");
    			h4.textContent = "mrn";
    			t8 = space();
    			div7 = element("div");
    			div3 = element("div");
    			t9 = text("discord");
    			a0 = element("a");
    			span0 = element("span");
    			t10 = space();
    			div4 = element("div");
    			t11 = text("instagram");
    			a1 = element("a");
    			span1 = element("span");
    			t12 = space();
    			div5 = element("div");
    			t13 = text("steam");
    			a2 = element("a");
    			span2 = element("span");
    			t14 = space();
    			div6 = element("div");
    			t15 = text("github");
    			a3 = element("a");
    			span3 = element("span");
    			t16 = space();
    			div9 = element("div");
    			h21 = element("h2");
    			h21.textContent = "about me";
    			t18 = space();
    			p = element("p");
    			t19 = text("im evelyn or mrn <3 im a rotmaxxing neet trans girl and nightmare island resident (uk) im always working on things, programming stuff, music, photos, random ass google docs.. a lot of it doesnt see the light of day except photos but, maybe one day ill finish something cool. one cool thing i have finished though is ");
    			i = element("i");
    			i.textContent = "this";
    			t21 = text(" website using svelte for my socials i hope you like it ^w^\n            ");
    			br0 = element("br");
    			br1 = element("br");
    			t22 = text("\n            the music i like is just loser music like green day and car seat headrest genuinely never give me the aux cable. ive also got a thing for tech like, crt's, ipods and old machines that can be repurposed into joining the IED of a homelab i have. and by \"a thing for tech\" i also mean i yearn to have components and abandon my flesh \n            ");
    			br2 = element("br");
    			br3 = element("br");
    			t23 = text("\n            i love you oomf look after yourself <3");
    			t24 = space();
    			div10 = element("div");
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			if (!src_url_equal(img.src, img_src_value = "./assets/pfp.webp")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "width", "200");
    			attr_dev(img, "alt", "Profile picture of an old TV with M.R.N on it");
    			attr_dev(img, "class", "svelte-728z0");
    			add_location(img, file$a, 8, 16, 201);
    			attr_dev(div0, "id", "about-pfp");
    			attr_dev(div0, "class", "svelte-728z0");
    			add_location(div0, file$a, 7, 12, 164);
    			attr_dev(h1, "class", "svelte-728z0");
    			add_location(h1, file$a, 11, 16, 365);
    			attr_dev(h20, "class", "svelte-728z0");
    			add_location(h20, file$a, 12, 16, 400);
    			attr_dev(h3, "class", "svelte-728z0");
    			add_location(h3, file$a, 13, 16, 432);
    			attr_dev(h4, "class", "svelte-728z0");
    			add_location(h4, file$a, 14, 16, 462);
    			attr_dev(div1, "id", "about-names");
    			attr_dev(div1, "class", "svelte-728z0");
    			add_location(div1, file$a, 10, 12, 326);
    			attr_dev(div2, "id", "about-top-top");
    			attr_dev(div2, "class", "svelte-728z0");
    			add_location(div2, file$a, 6, 8, 127);
    			attr_dev(span0, "class", "svelte-728z0");
    			add_location(span0, file$a, 18, 95, 639);
    			attr_dev(a0, "href", "https://discord.com/users/596005713499652126");
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "class", "svelte-728z0");
    			add_location(a0, file$a, 18, 24, 568);
    			attr_dev(div3, "class", "svelte-728z0");
    			add_location(div3, file$a, 18, 12, 556);
    			attr_dev(span1, "class", "svelte-728z0");
    			add_location(span1, file$a, 19, 89, 752);
    			attr_dev(a1, "href", "https://www.instagram.com/mrndreams/");
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "class", "svelte-728z0");
    			add_location(a1, file$a, 19, 26, 689);
    			attr_dev(div4, "class", "svelte-728z0");
    			add_location(div4, file$a, 19, 12, 675);
    			attr_dev(span2, "class", "svelte-728z0");
    			add_location(span2, file$a, 20, 102, 878);
    			attr_dev(a2, "href", "https://steamcommunity.com/profiles/76561198813369697");
    			attr_dev(a2, "target", "_blank");
    			attr_dev(a2, "class", "svelte-728z0");
    			add_location(a2, file$a, 20, 22, 798);
    			attr_dev(div5, "class", "svelte-728z0");
    			add_location(div5, file$a, 20, 12, 788);
    			attr_dev(span3, "class", "svelte-728z0");
    			add_location(span3, file$a, 21, 78, 980);
    			attr_dev(a3, "href", "https://github.com/mrndreams");
    			attr_dev(a3, "target", "_blank");
    			attr_dev(a3, "class", "svelte-728z0");
    			add_location(a3, file$a, 21, 23, 925);
    			attr_dev(div6, "class", "svelte-728z0");
    			add_location(div6, file$a, 21, 12, 914);
    			attr_dev(div7, "id", "about-top-links");
    			attr_dev(div7, "class", "svelte-728z0");
    			add_location(div7, file$a, 17, 8, 517);
    			attr_dev(div8, "id", "about-top");
    			attr_dev(div8, "class", "svelte-728z0");
    			add_location(div8, file$a, 5, 4, 98);
    			attr_dev(h21, "class", "svelte-728z0");
    			add_location(h21, file$a, 25, 8, 1066);
    			add_location(i, file$a, 27, 331, 1446);
    			add_location(br0, file$a, 28, 12, 1529);
    			add_location(br1, file$a, 28, 16, 1533);
    			add_location(br2, file$a, 30, 12, 1893);
    			add_location(br3, file$a, 30, 16, 1897);
    			attr_dev(p, "id", "about-me-text");
    			attr_dev(p, "class", "svelte-728z0");
    			add_location(p, file$a, 26, 8, 1092);
    			attr_dev(div9, "id", "about-bottom");
    			attr_dev(div9, "class", "svelte-728z0");
    			add_location(div9, file$a, 24, 4, 1034);
    			attr_dev(div10, "id", "about-footer");
    			attr_dev(div10, "class", "svelte-728z0");
    			add_location(div10, file$a, 34, 4, 1984);
    			attr_dev(main, "class", "svelte-728z0");
    			add_location(main, file$a, 4, 0, 87);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div8);
    			append_dev(div8, div2);
    			append_dev(div2, div0);
    			append_dev(div0, img);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, h1);
    			append_dev(div1, t2);
    			append_dev(div1, h20);
    			append_dev(div1, t4);
    			append_dev(div1, h3);
    			append_dev(div1, t6);
    			append_dev(div1, h4);
    			append_dev(div8, t8);
    			append_dev(div8, div7);
    			append_dev(div7, div3);
    			append_dev(div3, t9);
    			append_dev(div3, a0);
    			append_dev(a0, span0);
    			append_dev(div7, t10);
    			append_dev(div7, div4);
    			append_dev(div4, t11);
    			append_dev(div4, a1);
    			append_dev(a1, span1);
    			append_dev(div7, t12);
    			append_dev(div7, div5);
    			append_dev(div5, t13);
    			append_dev(div5, a2);
    			append_dev(a2, span2);
    			append_dev(div7, t14);
    			append_dev(div7, div6);
    			append_dev(div6, t15);
    			append_dev(div6, a3);
    			append_dev(a3, span3);
    			append_dev(main, t16);
    			append_dev(main, div9);
    			append_dev(div9, h21);
    			append_dev(div9, t18);
    			append_dev(div9, p);
    			append_dev(p, t19);
    			append_dev(p, i);
    			append_dev(p, t21);
    			append_dev(p, br0);
    			append_dev(p, br1);
    			append_dev(p, t22);
    			append_dev(p, br2);
    			append_dev(p, br3);
    			append_dev(p, t23);
    			append_dev(main, t24);
    			append_dev(main, div10);
    			if (switch_instance) mount_component(switch_instance, div10, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (switch_value !== (switch_value = SpotifyWidget)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, div10, null);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if (switch_instance) destroy_component(switch_instance);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('About', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<About> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ SpotifyWidget });
    	return [];
    }

    class About extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "About",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    var r={grad:.9,turn:360,rad:360/(2*Math.PI)},t=function(r){return "string"==typeof r?r.length>0:"number"==typeof r},n=function(r,t,n){return void 0===t&&(t=0),void 0===n&&(n=Math.pow(10,t)),Math.round(n*r)/n+0},e=function(r,t,n){return void 0===t&&(t=0),void 0===n&&(n=1),r>n?n:r>t?r:t},u=function(r){return (r=isFinite(r)?r%360:0)>0?r:r+360},a=function(r){return {r:e(r.r,0,255),g:e(r.g,0,255),b:e(r.b,0,255),a:e(r.a)}},o=function(r){return {r:n(r.r),g:n(r.g),b:n(r.b),a:n(r.a,3)}},i=/^#([0-9a-f]{3,8})$/i,s=function(r){var t=r.toString(16);return t.length<2?"0"+t:t},h=function(r){var t=r.r,n=r.g,e=r.b,u=r.a,a=Math.max(t,n,e),o=a-Math.min(t,n,e),i=o?a===t?(n-e)/o:a===n?2+(e-t)/o:4+(t-n)/o:0;return {h:60*(i<0?i+6:i),s:a?o/a*100:0,v:a/255*100,a:u}},b=function(r){var t=r.h,n=r.s,e=r.v,u=r.a;t=t/360*6,n/=100,e/=100;var a=Math.floor(t),o=e*(1-n),i=e*(1-(t-a)*n),s=e*(1-(1-t+a)*n),h=a%6;return {r:255*[e,i,o,o,s,e][h],g:255*[s,e,e,i,o,o][h],b:255*[o,o,s,e,e,i][h],a:u}},g=function(r){return {h:u(r.h),s:e(r.s,0,100),l:e(r.l,0,100),a:e(r.a)}},d=function(r){return {h:n(r.h),s:n(r.s),l:n(r.l),a:n(r.a,3)}},f=function(r){return b((n=(t=r).s,{h:t.h,s:(n*=((e=t.l)<50?e:100-e)/100)>0?2*n/(e+n)*100:0,v:e+n,a:t.a}));var t,n,e;},c=function(r){return {h:(t=h(r)).h,s:(u=(200-(n=t.s))*(e=t.v)/100)>0&&u<200?n*e/100/(u<=100?u:200-u)*100:0,l:u/2,a:t.a};var t,n,e,u;},l=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,p=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,v=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,m=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,y={string:[[function(r){var t=i.exec(r);return t?(r=t[1]).length<=4?{r:parseInt(r[0]+r[0],16),g:parseInt(r[1]+r[1],16),b:parseInt(r[2]+r[2],16),a:4===r.length?n(parseInt(r[3]+r[3],16)/255,2):1}:6===r.length||8===r.length?{r:parseInt(r.substr(0,2),16),g:parseInt(r.substr(2,2),16),b:parseInt(r.substr(4,2),16),a:8===r.length?n(parseInt(r.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(r){var t=v.exec(r)||m.exec(r);return t?t[2]!==t[4]||t[4]!==t[6]?null:a({r:Number(t[1])/(t[2]?100/255:1),g:Number(t[3])/(t[4]?100/255:1),b:Number(t[5])/(t[6]?100/255:1),a:void 0===t[7]?1:Number(t[7])/(t[8]?100:1)}):null},"rgb"],[function(t){var n=l.exec(t)||p.exec(t);if(!n)return null;var e,u,a=g({h:(e=n[1],u=n[2],void 0===u&&(u="deg"),Number(e)*(r[u]||1)),s:Number(n[3]),l:Number(n[4]),a:void 0===n[5]?1:Number(n[5])/(n[6]?100:1)});return f(a)},"hsl"]],object:[[function(r){var n=r.r,e=r.g,u=r.b,o=r.a,i=void 0===o?1:o;return t(n)&&t(e)&&t(u)?a({r:Number(n),g:Number(e),b:Number(u),a:Number(i)}):null},"rgb"],[function(r){var n=r.h,e=r.s,u=r.l,a=r.a,o=void 0===a?1:a;if(!t(n)||!t(e)||!t(u))return null;var i=g({h:Number(n),s:Number(e),l:Number(u),a:Number(o)});return f(i)},"hsl"],[function(r){var n=r.h,a=r.s,o=r.v,i=r.a,s=void 0===i?1:i;if(!t(n)||!t(a)||!t(o))return null;var h=function(r){return {h:u(r.h),s:e(r.s,0,100),v:e(r.v,0,100),a:e(r.a)}}({h:Number(n),s:Number(a),v:Number(o),a:Number(s)});return b(h)},"hsv"]]},N=function(r,t){for(var n=0;n<t.length;n++){var e=t[n][0](r);if(e)return [e,t[n][1]]}return [null,void 0]},x=function(r){return "string"==typeof r?N(r.trim(),y.string):"object"==typeof r&&null!==r?N(r,y.object):[null,void 0]},M=function(r,t){var n=c(r);return {h:n.h,s:e(n.s+100*t,0,100),l:n.l,a:n.a}},H=function(r){return (299*r.r+587*r.g+114*r.b)/1e3/255},$=function(r,t){var n=c(r);return {h:n.h,s:n.s,l:e(n.l+100*t,0,100),a:n.a}},j=function(){function r(r){this.parsed=x(r)[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1};}return r.prototype.isValid=function(){return null!==this.parsed},r.prototype.brightness=function(){return n(H(this.rgba),2)},r.prototype.isDark=function(){return H(this.rgba)<.5},r.prototype.isLight=function(){return H(this.rgba)>=.5},r.prototype.toHex=function(){return r=o(this.rgba),t=r.r,e=r.g,u=r.b,i=(a=r.a)<1?s(n(255*a)):"","#"+s(t)+s(e)+s(u)+i;var r,t,e,u,a,i;},r.prototype.toRgb=function(){return o(this.rgba)},r.prototype.toRgbString=function(){return r=o(this.rgba),t=r.r,n=r.g,e=r.b,(u=r.a)<1?"rgba("+t+", "+n+", "+e+", "+u+")":"rgb("+t+", "+n+", "+e+")";var r,t,n,e,u;},r.prototype.toHsl=function(){return d(c(this.rgba))},r.prototype.toHslString=function(){return r=d(c(this.rgba)),t=r.h,n=r.s,e=r.l,(u=r.a)<1?"hsla("+t+", "+n+"%, "+e+"%, "+u+")":"hsl("+t+", "+n+"%, "+e+"%)";var r,t,n,e,u;},r.prototype.toHsv=function(){return r=h(this.rgba),{h:n(r.h),s:n(r.s),v:n(r.v),a:n(r.a,3)};var r;},r.prototype.invert=function(){return w({r:255-(r=this.rgba).r,g:255-r.g,b:255-r.b,a:r.a});var r;},r.prototype.saturate=function(r){return void 0===r&&(r=.1),w(M(this.rgba,r))},r.prototype.desaturate=function(r){return void 0===r&&(r=.1),w(M(this.rgba,-r))},r.prototype.grayscale=function(){return w(M(this.rgba,-1))},r.prototype.lighten=function(r){return void 0===r&&(r=.1),w($(this.rgba,r))},r.prototype.darken=function(r){return void 0===r&&(r=.1),w($(this.rgba,-r))},r.prototype.rotate=function(r){return void 0===r&&(r=15),this.hue(this.hue()+r)},r.prototype.alpha=function(r){return "number"==typeof r?w({r:(t=this.rgba).r,g:t.g,b:t.b,a:r}):n(this.rgba.a,3);var t;},r.prototype.hue=function(r){var t=c(this.rgba);return "number"==typeof r?w({h:r,s:t.s,l:t.l,a:t.a}):n(t.h)},r.prototype.isEqual=function(r){return this.toHex()===w(r).toHex()},r}(),w=function(r){return r instanceof j?r:new j(r)};

    /* node_modules/svelte-awesome-slider/dist/Slider.svelte generated by Svelte v3.59.2 */
    const file$9 = "node_modules/svelte-awesome-slider/dist/Slider.svelte";

    // (146:0) {#if name}
    function create_if_block$3(ctx) {
    	let input;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "hidden");
    			attr_dev(input, "name", /*name*/ ctx[3]);
    			input.value = /*value*/ ctx[0];
    			add_location(input, file$9, 146, 1, 4363);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*name*/ 8) {
    				attr_dev(input, "name", /*name*/ ctx[3]);
    			}

    			if (dirty & /*value*/ 1) {
    				prop_dev(input, "value", /*value*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(146:0) {#if name}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let div2;
    	let div0;
    	let t0;
    	let div1;
    	let div2_aria_valuetext_value;
    	let t1;
    	let if_block_anchor;
    	let mounted;
    	let dispose;
    	let if_block = /*name*/ ctx[3] && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			t1 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			attr_dev(div0, "class", "track svelte-pjqaqp");
    			add_location(div0, file$9, 141, 1, 4298);
    			attr_dev(div1, "class", "thumb svelte-pjqaqp");
    			add_location(div1, file$9, 142, 1, 4321);
    			attr_dev(div2, "class", "slider svelte-pjqaqp");
    			attr_dev(div2, "role", "slider");
    			attr_dev(div2, "aria-orientation", /*direction*/ ctx[4]);
    			attr_dev(div2, "aria-valuemax", /*_max*/ ctx[11]);
    			attr_dev(div2, "aria-valuemin", /*_min*/ ctx[10]);
    			attr_dev(div2, "aria-valuenow", /*value*/ ctx[0]);
    			attr_dev(div2, "aria-valuetext", div2_aria_valuetext_value = /*ariaValueText*/ ctx[2](/*value*/ ctx[0]));
    			attr_dev(div2, "aria-label", /*ariaLabel*/ ctx[7]);
    			attr_dev(div2, "aria-labelledby", /*ariaLabelledBy*/ ctx[8]);
    			attr_dev(div2, "aria-controls", /*ariaControls*/ ctx[9]);
    			attr_dev(div2, "tabindex", "0");
    			toggle_class(div2, "reverse", /*reverse*/ ctx[5]);
    			set_style(div2, "--position", /*position*/ ctx[12]);
    			add_location(div2, file$9, 120, 0, 3654);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			/*div2_binding*/ ctx[22](div2);
    			insert_dev(target, t1, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "mousemove", /*drag*/ ctx[15], false, false, false, false),
    					listen_dev(window, "mouseup", /*endDrag*/ ctx[16], false, false, false, false),
    					listen_dev(div2, "keydown", /*keyHandler*/ ctx[13], false, false, false, false),
    					listen_dev(
    						div2,
    						"mousedown",
    						self(function () {
    							if (is_function(/*keyboardOnly*/ ctx[6] ? undefined : /*jump*/ ctx[14])) (/*keyboardOnly*/ ctx[6] ? undefined : /*jump*/ ctx[14]).apply(this, arguments);
    						}),
    						false,
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						div2,
    						"touchstart",
    						prevent_default(function () {
    							if (is_function(/*keyboardOnly*/ ctx[6] ? undefined : /*touch*/ ctx[17])) (/*keyboardOnly*/ ctx[6] ? undefined : /*touch*/ ctx[17]).apply(this, arguments);
    						}),
    						{ passive: false },
    						true,
    						false,
    						false
    					),
    					listen_dev(
    						div2,
    						"touchmove",
    						prevent_default(function () {
    							if (is_function(/*keyboardOnly*/ ctx[6] ? undefined : /*touch*/ ctx[17])) (/*keyboardOnly*/ ctx[6] ? undefined : /*touch*/ ctx[17]).apply(this, arguments);
    						}),
    						{ passive: false },
    						true,
    						false,
    						false
    					),
    					listen_dev(
    						div2,
    						"touchend",
    						prevent_default(function () {
    							if (is_function(/*keyboardOnly*/ ctx[6] ? undefined : /*touch*/ ctx[17])) (/*keyboardOnly*/ ctx[6] ? undefined : /*touch*/ ctx[17]).apply(this, arguments);
    						}),
    						{ passive: false },
    						true,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (dirty & /*direction*/ 16) {
    				attr_dev(div2, "aria-orientation", /*direction*/ ctx[4]);
    			}

    			if (dirty & /*_max*/ 2048) {
    				attr_dev(div2, "aria-valuemax", /*_max*/ ctx[11]);
    			}

    			if (dirty & /*_min*/ 1024) {
    				attr_dev(div2, "aria-valuemin", /*_min*/ ctx[10]);
    			}

    			if (dirty & /*value*/ 1) {
    				attr_dev(div2, "aria-valuenow", /*value*/ ctx[0]);
    			}

    			if (dirty & /*ariaValueText, value*/ 5 && div2_aria_valuetext_value !== (div2_aria_valuetext_value = /*ariaValueText*/ ctx[2](/*value*/ ctx[0]))) {
    				attr_dev(div2, "aria-valuetext", div2_aria_valuetext_value);
    			}

    			if (dirty & /*ariaLabel*/ 128) {
    				attr_dev(div2, "aria-label", /*ariaLabel*/ ctx[7]);
    			}

    			if (dirty & /*ariaLabelledBy*/ 256) {
    				attr_dev(div2, "aria-labelledby", /*ariaLabelledBy*/ ctx[8]);
    			}

    			if (dirty & /*ariaControls*/ 512) {
    				attr_dev(div2, "aria-controls", /*ariaControls*/ ctx[9]);
    			}

    			if (dirty & /*reverse*/ 32) {
    				toggle_class(div2, "reverse", /*reverse*/ ctx[5]);
    			}

    			if (dirty & /*position*/ 4096) {
    				set_style(div2, "--position", /*position*/ ctx[12]);
    			}

    			if (/*name*/ ctx[3]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			/*div2_binding*/ ctx[22](null);
    			if (detaching) detach_dev(t1);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let _min;
    	let _max;
    	let _step;
    	let position;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slider', slots, []);
    	let { min = 0 } = $$props;
    	let { max = 100 } = $$props;
    	let { step = 1 } = $$props;
    	let { value = 50 } = $$props;
    	let { ariaValueText = current => current.toString() } = $$props;
    	let { name = undefined } = $$props;
    	let { direction = 'horizontal' } = $$props;
    	let { reverse = false } = $$props;
    	let { keyboardOnly = false } = $$props;
    	let { slider = undefined } = $$props;
    	let { ariaLabel = undefined } = $$props;
    	let { ariaLabelledBy = undefined } = $$props;
    	let { ariaControls = undefined } = $$props;
    	let { isDragging = false } = $$props;
    	const dispatch = createEventDispatcher();

    	function bound(value) {
    		const ratio = 1 / _step;
    		const rounded = Math.round(value * ratio) / ratio;
    		return Math.max(_min, Math.min(_max, rounded));
    	}

    	function keyHandler(e) {
    		const inc = e.shiftKey ? _step * 10 : _step;

    		if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
    			$$invalidate(0, value += inc);
    			e.preventDefault();
    		} else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
    			$$invalidate(0, value -= inc);
    			e.preventDefault();
    		} else if (e.key === 'Home') {
    			$$invalidate(0, value = _min);
    			e.preventDefault();
    		} else if (e.key === 'End') {
    			$$invalidate(0, value = _max);
    			e.preventDefault();
    		} else if (e.key === 'PageUp') {
    			$$invalidate(0, value += _step * 10);
    			e.preventDefault();
    		} else if (e.key === 'PageDown') {
    			$$invalidate(0, value -= _step * 10);
    			e.preventDefault();
    		}

    		$$invalidate(0, value = bound(value));
    		dispatch('input', value);
    	}

    	const config = {
    		horizontal: {
    			clientSize: 'clientWidth',
    			offset: 'left',
    			client: 'clientX'
    		},
    		vertical: {
    			clientSize: 'clientHeight',
    			offset: 'top',
    			client: 'clientY'
    		}
    	};

    	function updateValue(e) {
    		const clientWidth = slider?.[config[direction].clientSize] || 120;
    		const sliderOffsetX = slider?.getBoundingClientRect()[config[direction].offset] || 0;
    		let offsetX = e[config[direction].client] - sliderOffsetX;
    		if (direction === 'vertical') offsetX = -1 * offsetX + clientWidth;

    		if (reverse) {
    			$$invalidate(0, value = _max - offsetX / clientWidth * (_max - _min));
    		} else {
    			$$invalidate(0, value = offsetX / clientWidth * (_max - _min) + _min);
    		}

    		$$invalidate(0, value = bound(value));
    		dispatch('input', value);
    	}

    	function jump(e) {
    		updateValue(e);
    		$$invalidate(18, isDragging = true);
    	}

    	function drag(e) {
    		if (isDragging) updateValue(e);
    	}

    	function endDrag() {
    		$$invalidate(18, isDragging = false);
    	}

    	function touch(e) {
    		updateValue({
    			clientX: e.changedTouches[0].clientX,
    			clientY: e.changedTouches[0].clientY
    		});
    	}

    	const writable_props = [
    		'min',
    		'max',
    		'step',
    		'value',
    		'ariaValueText',
    		'name',
    		'direction',
    		'reverse',
    		'keyboardOnly',
    		'slider',
    		'ariaLabel',
    		'ariaLabelledBy',
    		'ariaControls',
    		'isDragging'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slider> was created with unknown prop '${key}'`);
    	});

    	function div2_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			slider = $$value;
    			$$invalidate(1, slider);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('min' in $$props) $$invalidate(19, min = $$props.min);
    		if ('max' in $$props) $$invalidate(20, max = $$props.max);
    		if ('step' in $$props) $$invalidate(21, step = $$props.step);
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('ariaValueText' in $$props) $$invalidate(2, ariaValueText = $$props.ariaValueText);
    		if ('name' in $$props) $$invalidate(3, name = $$props.name);
    		if ('direction' in $$props) $$invalidate(4, direction = $$props.direction);
    		if ('reverse' in $$props) $$invalidate(5, reverse = $$props.reverse);
    		if ('keyboardOnly' in $$props) $$invalidate(6, keyboardOnly = $$props.keyboardOnly);
    		if ('slider' in $$props) $$invalidate(1, slider = $$props.slider);
    		if ('ariaLabel' in $$props) $$invalidate(7, ariaLabel = $$props.ariaLabel);
    		if ('ariaLabelledBy' in $$props) $$invalidate(8, ariaLabelledBy = $$props.ariaLabelledBy);
    		if ('ariaControls' in $$props) $$invalidate(9, ariaControls = $$props.ariaControls);
    		if ('isDragging' in $$props) $$invalidate(18, isDragging = $$props.isDragging);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		min,
    		max,
    		step,
    		value,
    		ariaValueText,
    		name,
    		direction,
    		reverse,
    		keyboardOnly,
    		slider,
    		ariaLabel,
    		ariaLabelledBy,
    		ariaControls,
    		isDragging,
    		dispatch,
    		bound,
    		keyHandler,
    		config,
    		updateValue,
    		jump,
    		drag,
    		endDrag,
    		touch,
    		_min,
    		_max,
    		position,
    		_step
    	});

    	$$self.$inject_state = $$props => {
    		if ('min' in $$props) $$invalidate(19, min = $$props.min);
    		if ('max' in $$props) $$invalidate(20, max = $$props.max);
    		if ('step' in $$props) $$invalidate(21, step = $$props.step);
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('ariaValueText' in $$props) $$invalidate(2, ariaValueText = $$props.ariaValueText);
    		if ('name' in $$props) $$invalidate(3, name = $$props.name);
    		if ('direction' in $$props) $$invalidate(4, direction = $$props.direction);
    		if ('reverse' in $$props) $$invalidate(5, reverse = $$props.reverse);
    		if ('keyboardOnly' in $$props) $$invalidate(6, keyboardOnly = $$props.keyboardOnly);
    		if ('slider' in $$props) $$invalidate(1, slider = $$props.slider);
    		if ('ariaLabel' in $$props) $$invalidate(7, ariaLabel = $$props.ariaLabel);
    		if ('ariaLabelledBy' in $$props) $$invalidate(8, ariaLabelledBy = $$props.ariaLabelledBy);
    		if ('ariaControls' in $$props) $$invalidate(9, ariaControls = $$props.ariaControls);
    		if ('isDragging' in $$props) $$invalidate(18, isDragging = $$props.isDragging);
    		if ('_min' in $$props) $$invalidate(10, _min = $$props._min);
    		if ('_max' in $$props) $$invalidate(11, _max = $$props._max);
    		if ('position' in $$props) $$invalidate(12, position = $$props.position);
    		if ('_step' in $$props) _step = $$props._step;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*min*/ 524288) {
    			$$invalidate(10, _min = typeof min === 'string' ? parseFloat(min) : min);
    		}

    		if ($$self.$$.dirty & /*max*/ 1048576) {
    			$$invalidate(11, _max = typeof max === 'string' ? parseFloat(max) : max);
    		}

    		if ($$self.$$.dirty & /*step*/ 2097152) {
    			_step = typeof step === 'string' ? parseFloat(step) : step;
    		}

    		if ($$self.$$.dirty & /*value, _min, _max*/ 3073) {
    			$$invalidate(12, position = ((value - _min) / (_max - _min) * 1).toFixed(4));
    		}
    	};

    	return [
    		value,
    		slider,
    		ariaValueText,
    		name,
    		direction,
    		reverse,
    		keyboardOnly,
    		ariaLabel,
    		ariaLabelledBy,
    		ariaControls,
    		_min,
    		_max,
    		position,
    		keyHandler,
    		jump,
    		drag,
    		endDrag,
    		touch,
    		isDragging,
    		min,
    		max,
    		step,
    		div2_binding
    	];
    }

    class Slider extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {
    			min: 19,
    			max: 20,
    			step: 21,
    			value: 0,
    			ariaValueText: 2,
    			name: 3,
    			direction: 4,
    			reverse: 5,
    			keyboardOnly: 6,
    			slider: 1,
    			ariaLabel: 7,
    			ariaLabelledBy: 8,
    			ariaControls: 9,
    			isDragging: 18
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slider",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get min() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set min(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get max() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set max(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get step() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set step(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ariaValueText() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ariaValueText(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get direction() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set direction(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get reverse() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set reverse(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get keyboardOnly() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set keyboardOnly(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get slider() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set slider(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ariaLabel() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ariaLabel(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ariaLabelledBy() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ariaLabelledBy(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ariaControls() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ariaControls(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isDragging() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isDragging(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-awesome-color-picker/dist/components/Picker.svelte generated by Svelte v3.59.2 */
    const file$8 = "node_modules/svelte-awesome-color-picker/dist/components/Picker.svelte";

    function create_fragment$8(ctx) {
    	let div2;
    	let switch_instance;
    	let t0;
    	let div0;
    	let slider0;
    	let updating_value;
    	let t1;
    	let div1;
    	let slider1;
    	let updating_value_1;
    	let current;
    	let mounted;
    	let dispose;
    	var switch_value = /*components*/ ctx[2].pickerIndicator;

    	function switch_props(ctx) {
    		return {
    			props: {
    				pos: /*pos*/ ctx[6],
    				isDark: /*isDark*/ ctx[3]
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    	}

    	function slider0_value_binding(value) {
    		/*slider0_value_binding*/ ctx[13](value);
    	}

    	let slider0_props = {
    		keyboardOnly: true,
    		ariaValueText: func,
    		ariaLabel: "saturation color"
    	};

    	if (/*s*/ ctx[0] !== void 0) {
    		slider0_props.value = /*s*/ ctx[0];
    	}

    	slider0 = new Slider({ props: slider0_props, $$inline: true });
    	binding_callbacks.push(() => bind(slider0, 'value', slider0_value_binding));

    	function slider1_value_binding(value) {
    		/*slider1_value_binding*/ ctx[14](value);
    	}

    	let slider1_props = {
    		keyboardOnly: true,
    		ariaValueText: func_1,
    		direction: "vertical",
    		ariaLabel: "brightness color"
    	};

    	if (/*v*/ ctx[1] !== void 0) {
    		slider1_props.value = /*v*/ ctx[1];
    	}

    	slider1 = new Slider({ props: slider1_props, $$inline: true });
    	binding_callbacks.push(() => bind(slider1, 'value', slider1_value_binding));

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			create_component(slider0.$$.fragment);
    			t1 = space();
    			div1 = element("div");
    			create_component(slider1.$$.fragment);
    			attr_dev(div0, "class", "s svelte-1x9tz9y");
    			set_style(div0, "--pos-y", /*pos*/ ctx[6].y);
    			add_location(div0, file$8, 72, 1, 2105);
    			attr_dev(div1, "class", "v svelte-1x9tz9y");
    			set_style(div1, "--pos-x", /*pos*/ ctx[6].x);
    			add_location(div1, file$8, 75, 1, 2261);
    			attr_dev(div2, "class", "picker svelte-1x9tz9y");
    			set_style(div2, "--picker-color-bg", /*pickerColorBg*/ ctx[5]);
    			add_location(div2, file$8, 62, 0, 1788);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			if (switch_instance) mount_component(switch_instance, div2, null);
    			append_dev(div2, t0);
    			append_dev(div2, div0);
    			mount_component(slider0, div0, null);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			mount_component(slider1, div1, null);
    			/*div2_binding*/ ctx[15](div2);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "mouseup", /*mouseUp*/ ctx[8], false, false, false, false),
    					listen_dev(window, "mousedown", /*mouseDown*/ ctx[10], false, false, false, false),
    					listen_dev(window, "mousemove", /*mouseMove*/ ctx[9], false, false, false, false),
    					listen_dev(div2, "mousedown", prevent_default(/*pickerMousedown*/ ctx[7]), false, true, false, false),
    					listen_dev(div2, "touchstart", /*touch*/ ctx[11], { passive: false }, false, false, false),
    					listen_dev(div2, "touchmove", prevent_default(/*touch*/ ctx[11]), { passive: false }, true, false, false),
    					listen_dev(div2, "touchend", /*touch*/ ctx[11], { passive: false }, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const switch_instance_changes = {};
    			if (dirty & /*pos*/ 64) switch_instance_changes.pos = /*pos*/ ctx[6];
    			if (dirty & /*isDark*/ 8) switch_instance_changes.isDark = /*isDark*/ ctx[3];

    			if (dirty & /*components*/ 4 && switch_value !== (switch_value = /*components*/ ctx[2].pickerIndicator)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, div2, t0);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}

    			const slider0_changes = {};

    			if (!updating_value && dirty & /*s*/ 1) {
    				updating_value = true;
    				slider0_changes.value = /*s*/ ctx[0];
    				add_flush_callback(() => updating_value = false);
    			}

    			slider0.$set(slider0_changes);

    			if (dirty & /*pos*/ 64) {
    				set_style(div0, "--pos-y", /*pos*/ ctx[6].y);
    			}

    			const slider1_changes = {};

    			if (!updating_value_1 && dirty & /*v*/ 2) {
    				updating_value_1 = true;
    				slider1_changes.value = /*v*/ ctx[1];
    				add_flush_callback(() => updating_value_1 = false);
    			}

    			slider1.$set(slider1_changes);

    			if (dirty & /*pos*/ 64) {
    				set_style(div1, "--pos-x", /*pos*/ ctx[6].x);
    			}

    			if (dirty & /*pickerColorBg*/ 32) {
    				set_style(div2, "--picker-color-bg", /*pickerColorBg*/ ctx[5]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			transition_in(slider0.$$.fragment, local);
    			transition_in(slider1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			transition_out(slider0.$$.fragment, local);
    			transition_out(slider1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (switch_instance) destroy_component(switch_instance);
    			destroy_component(slider0);
    			destroy_component(slider1);
    			/*div2_binding*/ ctx[15](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function clamp(value, min, max) {
    	return Math.min(Math.max(min, value), max);
    }

    const func = value => `${value}%`;
    const func_1 = value => `${value}%`;

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Picker', slots, []);
    	const dispatch = createEventDispatcher();
    	let { components } = $$props;
    	let { h } = $$props;
    	let { s } = $$props;
    	let { v } = $$props;
    	let { isDark } = $$props;
    	let picker;
    	let isMouseDown = false;
    	let focused = false;
    	let pickerColorBg;
    	let pos = { x: 100, y: 0 };

    	function onClick(e) {
    		const { width, left, height, top } = picker.getBoundingClientRect();

    		const mouse = {
    			x: clamp(e.clientX - left, 0, width),
    			y: clamp(e.clientY - top, 0, height)
    		};

    		$$invalidate(0, s = clamp(mouse.x / width, 0, 1) * 100);
    		$$invalidate(1, v = clamp((height - mouse.y) / height, 0, 1) * 100);
    	}

    	function pickerMousedown(e) {
    		if (e.button === 0) {
    			isMouseDown = true;
    			onClick(e);
    		}
    	}

    	function mouseUp() {
    		isMouseDown = false;
    	}

    	function mouseMove(e) {
    		if (isMouseDown) onClick(e);
    	}

    	function mouseDown(e) {
    		if (!e.target.isSameNode(picker)) focused = false;
    	}

    	function touch(e) {
    		e.preventDefault();
    		onClick(e.changedTouches[0]);
    	}

    	$$self.$$.on_mount.push(function () {
    		if (components === undefined && !('components' in $$props || $$self.$$.bound[$$self.$$.props['components']])) {
    			console.warn("<Picker> was created without expected prop 'components'");
    		}

    		if (h === undefined && !('h' in $$props || $$self.$$.bound[$$self.$$.props['h']])) {
    			console.warn("<Picker> was created without expected prop 'h'");
    		}

    		if (s === undefined && !('s' in $$props || $$self.$$.bound[$$self.$$.props['s']])) {
    			console.warn("<Picker> was created without expected prop 's'");
    		}

    		if (v === undefined && !('v' in $$props || $$self.$$.bound[$$self.$$.props['v']])) {
    			console.warn("<Picker> was created without expected prop 'v'");
    		}

    		if (isDark === undefined && !('isDark' in $$props || $$self.$$.bound[$$self.$$.props['isDark']])) {
    			console.warn("<Picker> was created without expected prop 'isDark'");
    		}
    	});

    	const writable_props = ['components', 'h', 's', 'v', 'isDark'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Picker> was created with unknown prop '${key}'`);
    	});

    	function slider0_value_binding(value) {
    		s = value;
    		$$invalidate(0, s);
    	}

    	function slider1_value_binding(value) {
    		v = value;
    		$$invalidate(1, v);
    	}

    	function div2_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			picker = $$value;
    			$$invalidate(4, picker);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('components' in $$props) $$invalidate(2, components = $$props.components);
    		if ('h' in $$props) $$invalidate(12, h = $$props.h);
    		if ('s' in $$props) $$invalidate(0, s = $$props.s);
    		if ('v' in $$props) $$invalidate(1, v = $$props.v);
    		if ('isDark' in $$props) $$invalidate(3, isDark = $$props.isDark);
    	};

    	$$self.$capture_state = () => ({
    		colord: w,
    		Slider,
    		createEventDispatcher,
    		dispatch,
    		components,
    		h,
    		s,
    		v,
    		isDark,
    		picker,
    		isMouseDown,
    		focused,
    		pickerColorBg,
    		pos,
    		clamp,
    		onClick,
    		pickerMousedown,
    		mouseUp,
    		mouseMove,
    		mouseDown,
    		touch
    	});

    	$$self.$inject_state = $$props => {
    		if ('components' in $$props) $$invalidate(2, components = $$props.components);
    		if ('h' in $$props) $$invalidate(12, h = $$props.h);
    		if ('s' in $$props) $$invalidate(0, s = $$props.s);
    		if ('v' in $$props) $$invalidate(1, v = $$props.v);
    		if ('isDark' in $$props) $$invalidate(3, isDark = $$props.isDark);
    		if ('picker' in $$props) $$invalidate(4, picker = $$props.picker);
    		if ('isMouseDown' in $$props) isMouseDown = $$props.isMouseDown;
    		if ('focused' in $$props) focused = $$props.focused;
    		if ('pickerColorBg' in $$props) $$invalidate(5, pickerColorBg = $$props.pickerColorBg);
    		if ('pos' in $$props) $$invalidate(6, pos = $$props.pos);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*h*/ 4096) {
    			if (typeof h === 'number') $$invalidate(5, pickerColorBg = w({ h, s: 100, v: 100, a: 1 }).toHex());
    		}

    		if ($$self.$$.dirty & /*s, v, picker*/ 19) {
    			if (typeof s === 'number' && typeof v === 'number' && picker) $$invalidate(6, pos = { x: s, y: 100 - v });
    		}

    		if ($$self.$$.dirty & /*s, v*/ 3) {
    			dispatch('input', { s, v });
    		}
    	};

    	return [
    		s,
    		v,
    		components,
    		isDark,
    		picker,
    		pickerColorBg,
    		pos,
    		pickerMousedown,
    		mouseUp,
    		mouseMove,
    		mouseDown,
    		touch,
    		h,
    		slider0_value_binding,
    		slider1_value_binding,
    		div2_binding
    	];
    }

    class Picker extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {
    			components: 2,
    			h: 12,
    			s: 0,
    			v: 1,
    			isDark: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Picker",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get components() {
    		throw new Error("<Picker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set components(value) {
    		throw new Error("<Picker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get h() {
    		throw new Error("<Picker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set h(value) {
    		throw new Error("<Picker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get s() {
    		throw new Error("<Picker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set s(value) {
    		throw new Error("<Picker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get v() {
    		throw new Error("<Picker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set v(value) {
    		throw new Error("<Picker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isDark() {
    		throw new Error("<Picker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isDark(value) {
    		throw new Error("<Picker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-awesome-color-picker/dist/components/variant/default/PickerIndicator.svelte generated by Svelte v3.59.2 */

    const file$7 = "node_modules/svelte-awesome-color-picker/dist/components/variant/default/PickerIndicator.svelte";

    function create_fragment$7(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "picker-indicator svelte-i5mg2p");
    			toggle_class(div, "is-dark", /*isDark*/ ctx[1]);
    			set_style(div, "--pos-x", /*pos*/ ctx[0].x);
    			set_style(div, "--pos-y", /*pos*/ ctx[0].y);
    			add_location(div, file$7, 6, 0, 146);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*isDark*/ 2) {
    				toggle_class(div, "is-dark", /*isDark*/ ctx[1]);
    			}

    			if (dirty & /*pos*/ 1) {
    				set_style(div, "--pos-x", /*pos*/ ctx[0].x);
    			}

    			if (dirty & /*pos*/ 1) {
    				set_style(div, "--pos-y", /*pos*/ ctx[0].y);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('PickerIndicator', slots, []);
    	let { pos } = $$props;
    	let { isDark } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (pos === undefined && !('pos' in $$props || $$self.$$.bound[$$self.$$.props['pos']])) {
    			console.warn("<PickerIndicator> was created without expected prop 'pos'");
    		}

    		if (isDark === undefined && !('isDark' in $$props || $$self.$$.bound[$$self.$$.props['isDark']])) {
    			console.warn("<PickerIndicator> was created without expected prop 'isDark'");
    		}
    	});

    	const writable_props = ['pos', 'isDark'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PickerIndicator> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('pos' in $$props) $$invalidate(0, pos = $$props.pos);
    		if ('isDark' in $$props) $$invalidate(1, isDark = $$props.isDark);
    	};

    	$$self.$capture_state = () => ({ pos, isDark });

    	$$self.$inject_state = $$props => {
    		if ('pos' in $$props) $$invalidate(0, pos = $$props.pos);
    		if ('isDark' in $$props) $$invalidate(1, isDark = $$props.isDark);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [pos, isDark];
    }

    class PickerIndicator extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { pos: 0, isDark: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PickerIndicator",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get pos() {
    		throw new Error("<PickerIndicator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pos(value) {
    		throw new Error("<PickerIndicator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isDark() {
    		throw new Error("<PickerIndicator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isDark(value) {
    		throw new Error("<PickerIndicator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-awesome-color-picker/dist/components/variant/default/TextInput.svelte generated by Svelte v3.59.2 */
    const file$6 = "node_modules/svelte-awesome-color-picker/dist/components/variant/default/TextInput.svelte";

    // (51:2) {:else}
    function create_else_block_1(ctx) {
    	let input0;
    	let input0_aria_label_value;
    	let t0;
    	let input1;
    	let input1_aria_label_value;
    	let t1;
    	let input2;
    	let input2_aria_label_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input0 = element("input");
    			t0 = space();
    			input1 = element("input");
    			t1 = space();
    			input2 = element("input");
    			attr_dev(input0, "aria-label", input0_aria_label_value = /*texts*/ ctx[4].label.h);
    			input0.value = /*h*/ ctx[9];
    			attr_dev(input0, "type", "number");
    			attr_dev(input0, "min", "0");
    			attr_dev(input0, "max", "360");
    			attr_dev(input0, "class", "svelte-qtukzs");
    			add_location(input0, file$6, 51, 3, 2045);
    			attr_dev(input1, "aria-label", input1_aria_label_value = /*texts*/ ctx[4].label.s);
    			input1.value = /*s*/ ctx[8];
    			attr_dev(input1, "type", "number");
    			attr_dev(input1, "min", "0");
    			attr_dev(input1, "max", "100");
    			attr_dev(input1, "class", "svelte-qtukzs");
    			add_location(input1, file$6, 52, 3, 2153);
    			attr_dev(input2, "aria-label", input2_aria_label_value = /*texts*/ ctx[4].label.v);
    			input2.value = /*v*/ ctx[7];
    			attr_dev(input2, "type", "number");
    			attr_dev(input2, "min", "0");
    			attr_dev(input2, "max", "100");
    			attr_dev(input2, "class", "svelte-qtukzs");
    			add_location(input2, file$6, 53, 3, 2261);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, input1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, input2, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*updateHsv*/ ctx[13]('h'), false, false, false, false),
    					listen_dev(input1, "input", /*updateHsv*/ ctx[13]('s'), false, false, false, false),
    					listen_dev(input2, "input", /*updateHsv*/ ctx[13]('v'), false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*texts*/ 16 && input0_aria_label_value !== (input0_aria_label_value = /*texts*/ ctx[4].label.h)) {
    				attr_dev(input0, "aria-label", input0_aria_label_value);
    			}

    			if (dirty & /*h*/ 512 && input0.value !== /*h*/ ctx[9]) {
    				prop_dev(input0, "value", /*h*/ ctx[9]);
    			}

    			if (dirty & /*texts*/ 16 && input1_aria_label_value !== (input1_aria_label_value = /*texts*/ ctx[4].label.s)) {
    				attr_dev(input1, "aria-label", input1_aria_label_value);
    			}

    			if (dirty & /*s*/ 256 && input1.value !== /*s*/ ctx[8]) {
    				prop_dev(input1, "value", /*s*/ ctx[8]);
    			}

    			if (dirty & /*texts*/ 16 && input2_aria_label_value !== (input2_aria_label_value = /*texts*/ ctx[4].label.v)) {
    				attr_dev(input2, "aria-label", input2_aria_label_value);
    			}

    			if (dirty & /*v*/ 128 && input2.value !== /*v*/ ctx[7]) {
    				prop_dev(input2, "value", /*v*/ ctx[7]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(input1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(input2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(51:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (47:27) 
    function create_if_block_3$1(ctx) {
    	let input0;
    	let input0_aria_label_value;
    	let input0_value_value;
    	let t0;
    	let input1;
    	let input1_aria_label_value;
    	let input1_value_value;
    	let t1;
    	let input2;
    	let input2_aria_label_value;
    	let input2_value_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input0 = element("input");
    			t0 = space();
    			input1 = element("input");
    			t1 = space();
    			input2 = element("input");
    			attr_dev(input0, "aria-label", input0_aria_label_value = /*texts*/ ctx[4].label.r);
    			input0.value = input0_value_value = /*rgb*/ ctx[0].r;
    			attr_dev(input0, "type", "number");
    			attr_dev(input0, "min", "0");
    			attr_dev(input0, "max", "255");
    			attr_dev(input0, "class", "svelte-qtukzs");
    			add_location(input0, file$6, 47, 3, 1699);
    			attr_dev(input1, "aria-label", input1_aria_label_value = /*texts*/ ctx[4].label.g);
    			input1.value = input1_value_value = /*rgb*/ ctx[0].g;
    			attr_dev(input1, "type", "number");
    			attr_dev(input1, "min", "0");
    			attr_dev(input1, "max", "255");
    			attr_dev(input1, "class", "svelte-qtukzs");
    			add_location(input1, file$6, 48, 3, 1811);
    			attr_dev(input2, "aria-label", input2_aria_label_value = /*texts*/ ctx[4].label.b);
    			input2.value = input2_value_value = /*rgb*/ ctx[0].b;
    			attr_dev(input2, "type", "number");
    			attr_dev(input2, "min", "0");
    			attr_dev(input2, "max", "255");
    			attr_dev(input2, "class", "svelte-qtukzs");
    			add_location(input2, file$6, 49, 3, 1923);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, input1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, input2, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*updateRgb*/ ctx[12]('r'), false, false, false, false),
    					listen_dev(input1, "input", /*updateRgb*/ ctx[12]('g'), false, false, false, false),
    					listen_dev(input2, "input", /*updateRgb*/ ctx[12]('b'), false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*texts*/ 16 && input0_aria_label_value !== (input0_aria_label_value = /*texts*/ ctx[4].label.r)) {
    				attr_dev(input0, "aria-label", input0_aria_label_value);
    			}

    			if (dirty & /*rgb*/ 1 && input0_value_value !== (input0_value_value = /*rgb*/ ctx[0].r) && input0.value !== input0_value_value) {
    				prop_dev(input0, "value", input0_value_value);
    			}

    			if (dirty & /*texts*/ 16 && input1_aria_label_value !== (input1_aria_label_value = /*texts*/ ctx[4].label.g)) {
    				attr_dev(input1, "aria-label", input1_aria_label_value);
    			}

    			if (dirty & /*rgb*/ 1 && input1_value_value !== (input1_value_value = /*rgb*/ ctx[0].g) && input1.value !== input1_value_value) {
    				prop_dev(input1, "value", input1_value_value);
    			}

    			if (dirty & /*texts*/ 16 && input2_aria_label_value !== (input2_aria_label_value = /*texts*/ ctx[4].label.b)) {
    				attr_dev(input2, "aria-label", input2_aria_label_value);
    			}

    			if (dirty & /*rgb*/ 1 && input2_value_value !== (input2_value_value = /*rgb*/ ctx[0].b) && input2.value !== input2_value_value) {
    				prop_dev(input2, "value", input2_value_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(input1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(input2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(47:27) ",
    		ctx
    	});

    	return block;
    }

    // (45:2) {#if mode === 'hex'}
    function create_if_block_2$1(ctx) {
    	let input;
    	let input_aria_label_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "aria-label", input_aria_label_value = /*texts*/ ctx[4].label.hex);
    			input.value = /*hex*/ ctx[1];
    			attr_dev(input, "class", "svelte-qtukzs");
    			set_style(input, "flex", 3);
    			add_location(input, file$6, 45, 3, 1581);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*updateHex*/ ctx[11], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*texts*/ 16 && input_aria_label_value !== (input_aria_label_value = /*texts*/ ctx[4].label.hex)) {
    				attr_dev(input, "aria-label", input_aria_label_value);
    			}

    			if (dirty & /*hex*/ 2 && input.value !== /*hex*/ ctx[1]) {
    				prop_dev(input, "value", /*hex*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(45:2) {#if mode === 'hex'}",
    		ctx
    	});

    	return block;
    }

    // (56:2) {#if isAlpha}
    function create_if_block_1$1(ctx) {
    	let input;
    	let input_aria_label_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "aria-label", input_aria_label_value = /*texts*/ ctx[4].label.a);
    			input.value = /*a*/ ctx[6];
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", "0");
    			attr_dev(input, "max", "1");
    			attr_dev(input, "step", "0.01");
    			attr_dev(input, "class", "svelte-qtukzs");
    			add_location(input, file$6, 56, 3, 2393);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);

    			if (!mounted) {
    				dispose = listen_dev(
    					input,
    					"input",
    					function () {
    						if (is_function(/*mode*/ ctx[5] === 'hsv'
    						? /*updateHsv*/ ctx[13]('a')
    						: /*updateRgb*/ ctx[12]('a'))) (/*mode*/ ctx[5] === 'hsv'
    						? /*updateHsv*/ ctx[13]('a')
    						: /*updateRgb*/ ctx[12]('a')).apply(this, arguments);
    					},
    					false,
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*texts*/ 16 && input_aria_label_value !== (input_aria_label_value = /*texts*/ ctx[4].label.a)) {
    				attr_dev(input, "aria-label", input_aria_label_value);
    			}

    			if (dirty & /*a*/ 64 && input.value !== /*a*/ ctx[6]) {
    				prop_dev(input, "value", /*a*/ ctx[6]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(56:2) {#if isAlpha}",
    		ctx
    	});

    	return block;
    }

    // (74:1) {:else}
    function create_else_block(ctx) {
    	let div;
    	let t_value = /*texts*/ ctx[4].color[/*mode*/ ctx[5]] + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			attr_dev(div, "class", "button-like svelte-qtukzs");
    			add_location(div, file$6, 74, 2, 2838);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*texts, mode*/ 48 && t_value !== (t_value = /*texts*/ ctx[4].color[/*mode*/ ctx[5]] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(74:1) {:else}",
    		ctx
    	});

    	return block;
    }

    // (69:1) {#if textInputModes.length > 1}
    function create_if_block$2(ctx) {
    	let button;
    	let span0;
    	let t0_value = /*texts*/ ctx[4].color[/*mode*/ ctx[5]] + "";
    	let t0;
    	let t1;
    	let span1;
    	let t2_value = /*texts*/ ctx[4].changeTo + "";
    	let t2;
    	let t3;
    	let t4;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			span0 = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			span1 = element("span");
    			t2 = text(t2_value);
    			t3 = space();
    			t4 = text(/*nextMode*/ ctx[10]);
    			attr_dev(span0, "class", "disappear svelte-qtukzs");
    			attr_dev(span0, "aria-hidden", "true");
    			add_location(span0, file$6, 70, 3, 2686);
    			attr_dev(span1, "class", "appear svelte-qtukzs");
    			add_location(span1, file$6, 71, 3, 2759);
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "svelte-qtukzs");
    			add_location(button, file$6, 69, 2, 2625);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, span0);
    			append_dev(span0, t0);
    			append_dev(button, t1);
    			append_dev(button, span1);
    			append_dev(span1, t2);
    			append_dev(span1, t3);
    			append_dev(span1, t4);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[15], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*texts, mode*/ 48 && t0_value !== (t0_value = /*texts*/ ctx[4].color[/*mode*/ ctx[5]] + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*texts*/ 16 && t2_value !== (t2_value = /*texts*/ ctx[4].changeTo + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*nextMode*/ 1024) set_data_dev(t4, /*nextMode*/ ctx[10]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(69:1) {#if textInputModes.length > 1}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let div1;
    	let div0;
    	let t0;
    	let t1;

    	function select_block_type(ctx, dirty) {
    		if (/*mode*/ ctx[5] === 'hex') return create_if_block_2$1;
    		if (/*mode*/ ctx[5] === 'rgb') return create_if_block_3$1;
    		return create_else_block_1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);
    	let if_block1 = /*isAlpha*/ ctx[2] && create_if_block_1$1(ctx);

    	function select_block_type_1(ctx, dirty) {
    		if (/*textInputModes*/ ctx[3].length > 1) return create_if_block$2;
    		return create_else_block;
    	}

    	let current_block_type_1 = select_block_type_1(ctx);
    	let if_block2 = current_block_type_1(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			if_block2.c();
    			attr_dev(div0, "class", "input-container svelte-qtukzs");
    			add_location(div0, file$6, 43, 1, 1525);
    			attr_dev(div1, "class", "text-input svelte-qtukzs");
    			add_location(div1, file$6, 42, 0, 1499);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			if_block0.m(div0, null);
    			append_dev(div0, t0);
    			if (if_block1) if_block1.m(div0, null);
    			append_dev(div1, t1);
    			if_block2.m(div1, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
    				if_block0.p(ctx, dirty);
    			} else {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(div0, t0);
    				}
    			}

    			if (/*isAlpha*/ ctx[2]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_1$1(ctx);
    					if_block1.c();
    					if_block1.m(div0, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (current_block_type_1 === (current_block_type_1 = select_block_type_1(ctx)) && if_block2) {
    				if_block2.p(ctx, dirty);
    			} else {
    				if_block2.d(1);
    				if_block2 = current_block_type_1(ctx);

    				if (if_block2) {
    					if_block2.c();
    					if_block2.m(div1, null);
    				}
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if_block0.d();
    			if (if_block1) if_block1.d();
    			if_block2.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const HEX_COLOR_REGEX = /^#?([A-F0-9]{6}|[A-F0-9]{8})$/i;

    function instance$6($$self, $$props, $$invalidate) {
    	let nextMode;
    	let h;
    	let s;
    	let v;
    	let a;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TextInput', slots, []);
    	const dispatch = createEventDispatcher();
    	let { isAlpha } = $$props;
    	let { rgb } = $$props;
    	let { hsv } = $$props;
    	let { hex } = $$props;
    	let { textInputModes } = $$props;
    	let { texts } = $$props;
    	let mode = textInputModes[0] || 'hex';

    	function updateHex(e) {
    		const target = e.target;

    		if (HEX_COLOR_REGEX.test(target.value)) {
    			$$invalidate(1, hex = target.value);
    			dispatch('input', { hex });
    		}
    	}

    	function updateRgb(property) {
    		return function (e) {
    			$$invalidate(0, rgb = {
    				...rgb,
    				[property]: parseFloat(e.target.value)
    			});

    			dispatch('input', { rgb });
    		};
    	}

    	function updateHsv(property) {
    		return function (e) {
    			$$invalidate(14, hsv = {
    				...hsv,
    				[property]: parseFloat(e.target.value)
    			});

    			dispatch('input', { hsv });
    		};
    	}

    	$$self.$$.on_mount.push(function () {
    		if (isAlpha === undefined && !('isAlpha' in $$props || $$self.$$.bound[$$self.$$.props['isAlpha']])) {
    			console.warn("<TextInput> was created without expected prop 'isAlpha'");
    		}

    		if (rgb === undefined && !('rgb' in $$props || $$self.$$.bound[$$self.$$.props['rgb']])) {
    			console.warn("<TextInput> was created without expected prop 'rgb'");
    		}

    		if (hsv === undefined && !('hsv' in $$props || $$self.$$.bound[$$self.$$.props['hsv']])) {
    			console.warn("<TextInput> was created without expected prop 'hsv'");
    		}

    		if (hex === undefined && !('hex' in $$props || $$self.$$.bound[$$self.$$.props['hex']])) {
    			console.warn("<TextInput> was created without expected prop 'hex'");
    		}

    		if (textInputModes === undefined && !('textInputModes' in $$props || $$self.$$.bound[$$self.$$.props['textInputModes']])) {
    			console.warn("<TextInput> was created without expected prop 'textInputModes'");
    		}

    		if (texts === undefined && !('texts' in $$props || $$self.$$.bound[$$self.$$.props['texts']])) {
    			console.warn("<TextInput> was created without expected prop 'texts'");
    		}
    	});

    	const writable_props = ['isAlpha', 'rgb', 'hsv', 'hex', 'textInputModes', 'texts'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TextInput> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => $$invalidate(5, mode = nextMode);

    	$$self.$$set = $$props => {
    		if ('isAlpha' in $$props) $$invalidate(2, isAlpha = $$props.isAlpha);
    		if ('rgb' in $$props) $$invalidate(0, rgb = $$props.rgb);
    		if ('hsv' in $$props) $$invalidate(14, hsv = $$props.hsv);
    		if ('hex' in $$props) $$invalidate(1, hex = $$props.hex);
    		if ('textInputModes' in $$props) $$invalidate(3, textInputModes = $$props.textInputModes);
    		if ('texts' in $$props) $$invalidate(4, texts = $$props.texts);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		isAlpha,
    		rgb,
    		hsv,
    		hex,
    		textInputModes,
    		texts,
    		HEX_COLOR_REGEX,
    		mode,
    		updateHex,
    		updateRgb,
    		updateHsv,
    		a,
    		v,
    		s,
    		h,
    		nextMode
    	});

    	$$self.$inject_state = $$props => {
    		if ('isAlpha' in $$props) $$invalidate(2, isAlpha = $$props.isAlpha);
    		if ('rgb' in $$props) $$invalidate(0, rgb = $$props.rgb);
    		if ('hsv' in $$props) $$invalidate(14, hsv = $$props.hsv);
    		if ('hex' in $$props) $$invalidate(1, hex = $$props.hex);
    		if ('textInputModes' in $$props) $$invalidate(3, textInputModes = $$props.textInputModes);
    		if ('texts' in $$props) $$invalidate(4, texts = $$props.texts);
    		if ('mode' in $$props) $$invalidate(5, mode = $$props.mode);
    		if ('a' in $$props) $$invalidate(6, a = $$props.a);
    		if ('v' in $$props) $$invalidate(7, v = $$props.v);
    		if ('s' in $$props) $$invalidate(8, s = $$props.s);
    		if ('h' in $$props) $$invalidate(9, h = $$props.h);
    		if ('nextMode' in $$props) $$invalidate(10, nextMode = $$props.nextMode);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*textInputModes, mode*/ 40) {
    			$$invalidate(10, nextMode = textInputModes[(textInputModes.indexOf(mode) + 1) % textInputModes.length]);
    		}

    		if ($$self.$$.dirty & /*hsv*/ 16384) {
    			$$invalidate(9, h = Math.round(hsv.h));
    		}

    		if ($$self.$$.dirty & /*hsv*/ 16384) {
    			$$invalidate(8, s = Math.round(hsv.s));
    		}

    		if ($$self.$$.dirty & /*hsv*/ 16384) {
    			$$invalidate(7, v = Math.round(hsv.v));
    		}

    		if ($$self.$$.dirty & /*hsv*/ 16384) {
    			$$invalidate(6, a = hsv.a === undefined ? 1 : Math.round(hsv.a * 100) / 100);
    		}
    	};

    	return [
    		rgb,
    		hex,
    		isAlpha,
    		textInputModes,
    		texts,
    		mode,
    		a,
    		v,
    		s,
    		h,
    		nextMode,
    		updateHex,
    		updateRgb,
    		updateHsv,
    		hsv,
    		click_handler
    	];
    }

    class TextInput extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {
    			isAlpha: 2,
    			rgb: 0,
    			hsv: 14,
    			hex: 1,
    			textInputModes: 3,
    			texts: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TextInput",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get isAlpha() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isAlpha(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get rgb() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rgb(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hsv() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hsv(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hex() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hex(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get textInputModes() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set textInputModes(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get texts() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set texts(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-awesome-color-picker/dist/components/variant/default/Input.svelte generated by Svelte v3.59.2 */

    const file$5 = "node_modules/svelte-awesome-color-picker/dist/components/variant/default/Input.svelte";

    function create_fragment$5(ctx) {
    	let label_1;
    	let div2;
    	let input;
    	let t0;
    	let div0;
    	let t1;
    	let div1;
    	let t2;
    	let t3;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			label_1 = element("label");
    			div2 = element("div");
    			input = element("input");
    			t0 = space();
    			div0 = element("div");
    			t1 = space();
    			div1 = element("div");
    			t2 = space();
    			t3 = text(/*label*/ ctx[2]);
    			attr_dev(input, "type", "color");
    			attr_dev(input, "name", /*name*/ ctx[3]);
    			input.value = /*hex*/ ctx[1];
    			attr_dev(input, "aria-haspopup", "dialog");
    			attr_dev(input, "class", "svelte-lemcb1");
    			add_location(input, file$5, 18, 2, 643);
    			attr_dev(div0, "class", "alpha svelte-lemcb1");
    			add_location(div0, file$5, 26, 2, 796);
    			attr_dev(div1, "class", "color svelte-lemcb1");
    			set_style(div1, "background", /*hex*/ ctx[1]);
    			add_location(div1, file$5, 27, 2, 820);
    			attr_dev(div2, "class", "container svelte-lemcb1");
    			add_location(div2, file$5, 17, 1, 617);
    			attr_dev(label_1, "class", "svelte-lemcb1");
    			add_location(label_1, file$5, 16, 0, 517);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label_1, anchor);
    			append_dev(label_1, div2);
    			append_dev(div2, input);
    			append_dev(div2, t0);
    			append_dev(div2, div0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(label_1, t2);
    			append_dev(label_1, t3);
    			/*label_1_binding*/ ctx[5](label_1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "click", prevent_default(noop), false, true, false, false),
    					listen_dev(input, "mousedown", prevent_default(noop), false, true, false, false),
    					listen_dev(label_1, "click", prevent_default(noop), false, true, false, false),
    					listen_dev(label_1, "mousedown", prevent_default(noop), false, true, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 8) {
    				attr_dev(input, "name", /*name*/ ctx[3]);
    			}

    			if (dirty & /*hex*/ 2) {
    				prop_dev(input, "value", /*hex*/ ctx[1]);
    			}

    			if (dirty & /*hex*/ 2) {
    				set_style(div1, "background", /*hex*/ ctx[1]);
    			}

    			if (dirty & /*label*/ 4) set_data_dev(t3, /*label*/ ctx[2]);
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label_1);
    			/*label_1_binding*/ ctx[5](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function noop() {
    	
    } /* prevent browser color picker from opening unless javascript is broken */

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Input', slots, []);
    	let { labelElement } = $$props;
    	let { hex } = $$props;
    	let { label } = $$props;
    	let { name = undefined } = $$props;
    	let { isOpen } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (labelElement === undefined && !('labelElement' in $$props || $$self.$$.bound[$$self.$$.props['labelElement']])) {
    			console.warn("<Input> was created without expected prop 'labelElement'");
    		}

    		if (hex === undefined && !('hex' in $$props || $$self.$$.bound[$$self.$$.props['hex']])) {
    			console.warn("<Input> was created without expected prop 'hex'");
    		}

    		if (label === undefined && !('label' in $$props || $$self.$$.bound[$$self.$$.props['label']])) {
    			console.warn("<Input> was created without expected prop 'label'");
    		}

    		if (isOpen === undefined && !('isOpen' in $$props || $$self.$$.bound[$$self.$$.props['isOpen']])) {
    			console.warn("<Input> was created without expected prop 'isOpen'");
    		}
    	});

    	const writable_props = ['labelElement', 'hex', 'label', 'name', 'isOpen'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Input> was created with unknown prop '${key}'`);
    	});

    	function label_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			labelElement = $$value;
    			$$invalidate(0, labelElement);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('labelElement' in $$props) $$invalidate(0, labelElement = $$props.labelElement);
    		if ('hex' in $$props) $$invalidate(1, hex = $$props.hex);
    		if ('label' in $$props) $$invalidate(2, label = $$props.label);
    		if ('name' in $$props) $$invalidate(3, name = $$props.name);
    		if ('isOpen' in $$props) $$invalidate(4, isOpen = $$props.isOpen);
    	};

    	$$self.$capture_state = () => ({
    		labelElement,
    		hex,
    		label,
    		name,
    		isOpen,
    		noop
    	});

    	$$self.$inject_state = $$props => {
    		if ('labelElement' in $$props) $$invalidate(0, labelElement = $$props.labelElement);
    		if ('hex' in $$props) $$invalidate(1, hex = $$props.hex);
    		if ('label' in $$props) $$invalidate(2, label = $$props.label);
    		if ('name' in $$props) $$invalidate(3, name = $$props.name);
    		if ('isOpen' in $$props) $$invalidate(4, isOpen = $$props.isOpen);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [labelElement, hex, label, name, isOpen, label_1_binding];
    }

    class Input extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {
    			labelElement: 0,
    			hex: 1,
    			label: 2,
    			name: 3,
    			isOpen: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Input",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get labelElement() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labelElement(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hex() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hex(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isOpen() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isOpen(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-awesome-color-picker/dist/components/variant/default/Wrapper.svelte generated by Svelte v3.59.2 */

    const file$4 = "node_modules/svelte-awesome-color-picker/dist/components/variant/default/Wrapper.svelte";

    function create_fragment$4(ctx) {
    	let div;
    	let div_role_value;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "wrapper svelte-h9ar9");
    			attr_dev(div, "role", div_role_value = /*isDialog*/ ctx[2] ? 'dialog' : undefined);
    			attr_dev(div, "aria-label", "color picker");
    			toggle_class(div, "is-open", /*isOpen*/ ctx[1]);
    			add_location(div, file$4, 8, 0, 267);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			/*div_binding*/ ctx[5](div);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*isDialog*/ 4 && div_role_value !== (div_role_value = /*isDialog*/ ctx[2] ? 'dialog' : undefined)) {
    				attr_dev(div, "role", div_role_value);
    			}

    			if (!current || dirty & /*isOpen*/ 2) {
    				toggle_class(div, "is-open", /*isOpen*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			/*div_binding*/ ctx[5](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Wrapper', slots, ['default']);
    	let { wrapper } = $$props;
    	let { isOpen } = $$props;
    	let { isDialog } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (wrapper === undefined && !('wrapper' in $$props || $$self.$$.bound[$$self.$$.props['wrapper']])) {
    			console.warn("<Wrapper> was created without expected prop 'wrapper'");
    		}

    		if (isOpen === undefined && !('isOpen' in $$props || $$self.$$.bound[$$self.$$.props['isOpen']])) {
    			console.warn("<Wrapper> was created without expected prop 'isOpen'");
    		}

    		if (isDialog === undefined && !('isDialog' in $$props || $$self.$$.bound[$$self.$$.props['isDialog']])) {
    			console.warn("<Wrapper> was created without expected prop 'isDialog'");
    		}
    	});

    	const writable_props = ['wrapper', 'isOpen', 'isDialog'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Wrapper> was created with unknown prop '${key}'`);
    	});

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			wrapper = $$value;
    			$$invalidate(0, wrapper);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('wrapper' in $$props) $$invalidate(0, wrapper = $$props.wrapper);
    		if ('isOpen' in $$props) $$invalidate(1, isOpen = $$props.isOpen);
    		if ('isDialog' in $$props) $$invalidate(2, isDialog = $$props.isDialog);
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ wrapper, isOpen, isDialog });

    	$$self.$inject_state = $$props => {
    		if ('wrapper' in $$props) $$invalidate(0, wrapper = $$props.wrapper);
    		if ('isOpen' in $$props) $$invalidate(1, isOpen = $$props.isOpen);
    		if ('isDialog' in $$props) $$invalidate(2, isDialog = $$props.isDialog);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [wrapper, isOpen, isDialog, $$scope, slots, div_binding];
    }

    class Wrapper extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { wrapper: 0, isOpen: 1, isDialog: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Wrapper",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get wrapper() {
    		throw new Error("<Wrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set wrapper(value) {
    		throw new Error("<Wrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isOpen() {
    		throw new Error("<Wrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isOpen(value) {
    		throw new Error("<Wrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isDialog() {
    		throw new Error("<Wrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isDialog(value) {
    		throw new Error("<Wrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const defaultTexts = {
        label: {
            h: 'hue channel',
            s: 'saturation channel',
            v: 'brightness channel',
            r: 'red channel',
            g: 'green channel',
            b: 'blue channel',
            a: 'alpha channel',
            hex: 'hex color',
            withoutColor: 'without color'
        },
        color: {
            rgb: 'rgb',
            hsv: 'hsv',
            hex: 'hex'
        },
        changeTo: 'change to '
    };

    // list taken from https://github.com/nico3333fr/van11y-accessible-modal-tooltip-aria/blob/1a83366c65358222483be849fbb768c31cefaf4d/src/van11y-accessible-modal-tooltip-aria.es6.js#L47
    const FOCUSABLE_ELEMENTS = "a[href], area[href], input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";
    // code adapted from https://gist.github.com/JulienPradet/20dbb7ca06cbd9e2ec499bb2206aab55#file-trapfocus-ts-L1-L44
    function trapFocusListener(trapFocusElement) {
        return function (event) {
            if (event.target === window) {
                return;
            }
            const eventTarget = event.target;
            if (!trapFocusElement.contains(eventTarget)) {
                return;
            }
            const focusable = trapFocusElement.querySelectorAll(FOCUSABLE_ELEMENTS);
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            function isNext(event) {
                return event.code === 'Tab' && !event.shiftKey;
            }
            function isPrevious(event) {
                return event.code === 'Tab' && event.shiftKey;
            }
            if (isNext(event) && event.target === last) {
                event.preventDefault();
                first.focus();
            }
            else if (isPrevious(event) && event.target === first) {
                event.preventDefault();
                last.focus();
            }
        };
    }
    const trapFocus = (node) => {
        const first = node.querySelector(FOCUSABLE_ELEMENTS);
        if (first)
            first.focus();
        const listener = trapFocusListener(node);
        document.addEventListener('keydown', listener);
        return {
            destroy() {
                document.removeEventListener('keydown', listener);
            }
        };
    };

    /* node_modules/svelte-awesome-color-picker/dist/components/variant/default/NullabilityCheckbox.svelte generated by Svelte v3.59.2 */

    const file$3 = "node_modules/svelte-awesome-color-picker/dist/components/variant/default/NullabilityCheckbox.svelte";

    function create_fragment$3(ctx) {
    	let label;
    	let div;
    	let input;
    	let t0;
    	let span;
    	let t1;
    	let t2_value = /*texts*/ ctx[1].label.withoutColor + "";
    	let t2;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			label = element("label");
    			div = element("div");
    			input = element("input");
    			t0 = space();
    			span = element("span");
    			t1 = space();
    			t2 = text(t2_value);
    			attr_dev(input, "type", "checkbox");
    			attr_dev(input, "class", "svelte-oskb5b");
    			add_location(input, file$3, 8, 2, 347);
    			attr_dev(span, "class", "svelte-oskb5b");
    			add_location(span, file$3, 9, 2, 402);
    			attr_dev(div, "class", "svelte-oskb5b");
    			add_location(div, file$3, 7, 1, 339);
    			attr_dev(label, "class", "nullability-checkbox svelte-oskb5b");
    			add_location(label, file$3, 6, 0, 301);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			append_dev(label, div);
    			append_dev(div, input);
    			input.checked = /*isUndefined*/ ctx[0];
    			append_dev(div, t0);
    			append_dev(div, span);
    			append_dev(label, t1);
    			append_dev(label, t2);

    			if (!mounted) {
    				dispose = listen_dev(input, "change", /*input_change_handler*/ ctx[2]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*isUndefined*/ 1) {
    				input.checked = /*isUndefined*/ ctx[0];
    			}

    			if (dirty & /*texts*/ 2 && t2_value !== (t2_value = /*texts*/ ctx[1].label.withoutColor + "")) set_data_dev(t2, t2_value);
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NullabilityCheckbox', slots, []);
    	let { isUndefined } = $$props;
    	let { texts } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (isUndefined === undefined && !('isUndefined' in $$props || $$self.$$.bound[$$self.$$.props['isUndefined']])) {
    			console.warn("<NullabilityCheckbox> was created without expected prop 'isUndefined'");
    		}

    		if (texts === undefined && !('texts' in $$props || $$self.$$.bound[$$self.$$.props['texts']])) {
    			console.warn("<NullabilityCheckbox> was created without expected prop 'texts'");
    		}
    	});

    	const writable_props = ['isUndefined', 'texts'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<NullabilityCheckbox> was created with unknown prop '${key}'`);
    	});

    	function input_change_handler() {
    		isUndefined = this.checked;
    		$$invalidate(0, isUndefined);
    	}

    	$$self.$$set = $$props => {
    		if ('isUndefined' in $$props) $$invalidate(0, isUndefined = $$props.isUndefined);
    		if ('texts' in $$props) $$invalidate(1, texts = $$props.texts);
    	};

    	$$self.$capture_state = () => ({ isUndefined, texts });

    	$$self.$inject_state = $$props => {
    		if ('isUndefined' in $$props) $$invalidate(0, isUndefined = $$props.isUndefined);
    		if ('texts' in $$props) $$invalidate(1, texts = $$props.texts);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [isUndefined, texts, input_change_handler];
    }

    class NullabilityCheckbox extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { isUndefined: 0, texts: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NullabilityCheckbox",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get isUndefined() {
    		throw new Error("<NullabilityCheckbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isUndefined(value) {
    		throw new Error("<NullabilityCheckbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get texts() {
    		throw new Error("<NullabilityCheckbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set texts(value) {
    		throw new Error("<NullabilityCheckbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-awesome-color-picker/dist/components/ColorPicker.svelte generated by Svelte v3.59.2 */

    const { Object: Object_1 } = globals;
    const file$2 = "node_modules/svelte-awesome-color-picker/dist/components/ColorPicker.svelte";

    // (227:16) 
    function create_if_block_5(ctx) {
    	let input;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "hidden");
    			input.value = /*hex*/ ctx[2];
    			attr_dev(input, "name", /*name*/ ctx[6]);
    			add_location(input, file$2, 227, 2, 7731);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*hex*/ 4) {
    				prop_dev(input, "value", /*hex*/ ctx[2]);
    			}

    			if (dirty[0] & /*name*/ 64) {
    				attr_dev(input, "name", /*name*/ ctx[6]);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(227:16) ",
    		ctx
    	});

    	return block;
    }

    // (225:1) {#if isDialog}
    function create_if_block_4(ctx) {
    	let switch_instance;
    	let updating_labelElement;
    	let switch_instance_anchor;
    	let current;

    	function switch_instance_labelElement_binding(value) {
    		/*switch_instance_labelElement_binding*/ ctx[33](value);
    	}

    	var switch_value = /*getComponents*/ ctx[23]().input;

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			isOpen: true,
    			hex: /*hex*/ ctx[2],
    			label: /*label*/ ctx[5],
    			name: /*name*/ ctx[6]
    		};

    		if (/*labelElement*/ ctx[21] !== void 0) {
    			switch_instance_props.labelElement = /*labelElement*/ ctx[21];
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    		binding_callbacks.push(() => bind(switch_instance, 'labelElement', switch_instance_labelElement_binding));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};
    			if (dirty[0] & /*hex*/ 4) switch_instance_changes.hex = /*hex*/ ctx[2];
    			if (dirty[0] & /*label*/ 32) switch_instance_changes.label = /*label*/ ctx[5];
    			if (dirty[0] & /*name*/ 64) switch_instance_changes.name = /*name*/ ctx[6];

    			if (!updating_labelElement && dirty[0] & /*labelElement*/ 2097152) {
    				updating_labelElement = true;
    				switch_instance_changes.labelElement = /*labelElement*/ ctx[21];
    				add_flush_callback(() => updating_labelElement = false);
    			}

    			if (switch_value !== (switch_value = /*getComponents*/ ctx[23]().input)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    					binding_callbacks.push(() => bind(switch_instance, 'labelElement', switch_instance_labelElement_binding));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(225:1) {#if isDialog}",
    		ctx
    	});

    	return block;
    }

    // (231:2) {#if nullable}
    function create_if_block_3(ctx) {
    	let switch_instance;
    	let updating_isUndefined;
    	let switch_instance_anchor;
    	let current;

    	function switch_instance_isUndefined_binding(value) {
    		/*switch_instance_isUndefined_binding*/ ctx[34](value);
    	}

    	var switch_value = /*getComponents*/ ctx[23]().nullabilityCheckbox;

    	function switch_props(ctx) {
    		let switch_instance_props = { texts: /*getTexts*/ ctx[24]() };

    		if (/*isUndefined*/ ctx[16] !== void 0) {
    			switch_instance_props.isUndefined = /*isUndefined*/ ctx[16];
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    		binding_callbacks.push(() => bind(switch_instance, 'isUndefined', switch_instance_isUndefined_binding));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};

    			if (!updating_isUndefined && dirty[0] & /*isUndefined*/ 65536) {
    				updating_isUndefined = true;
    				switch_instance_changes.isUndefined = /*isUndefined*/ ctx[16];
    				add_flush_callback(() => updating_isUndefined = false);
    			}

    			if (switch_value !== (switch_value = /*getComponents*/ ctx[23]().nullabilityCheckbox)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    					binding_callbacks.push(() => bind(switch_instance, 'isUndefined', switch_instance_isUndefined_binding));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(231:2) {#if nullable}",
    		ctx
    	});

    	return block;
    }

    // (254:2) {#if isAlpha}
    function create_if_block_2(ctx) {
    	let div;
    	let slider;
    	let current;

    	slider = new Slider({
    			props: {
    				min: 0,
    				max: 1,
    				step: 0.01,
    				value: /*hsv*/ ctx[1]?.a ?? /*_hsv*/ ctx[18].a,
    				direction: /*sliderDirection*/ ctx[12],
    				reverse: /*sliderDirection*/ ctx[12] === 'vertical',
    				ariaLabel: /*getTexts*/ ctx[24]().label.a
    			},
    			$$inline: true
    		});

    	slider.$on("input", /*updateLetter*/ ctx[27]('a'));

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(slider.$$.fragment);
    			attr_dev(div, "class", "a svelte-tsvobk");
    			set_style(div, "--alphaless-color", (/*hex*/ ctx[2] ? /*hex*/ ctx[2] : /*_hex*/ ctx[19]).substring(0, 7));
    			add_location(div, file$2, 254, 3, 8440);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(slider, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const slider_changes = {};
    			if (dirty[0] & /*hsv, _hsv*/ 262146) slider_changes.value = /*hsv*/ ctx[1]?.a ?? /*_hsv*/ ctx[18].a;
    			if (dirty[0] & /*sliderDirection*/ 4096) slider_changes.direction = /*sliderDirection*/ ctx[12];
    			if (dirty[0] & /*sliderDirection*/ 4096) slider_changes.reverse = /*sliderDirection*/ ctx[12] === 'vertical';
    			slider.$set(slider_changes);

    			if (dirty[0] & /*hex, _hex*/ 524292) {
    				set_style(div, "--alphaless-color", (/*hex*/ ctx[2] ? /*hex*/ ctx[2] : /*_hex*/ ctx[19]).substring(0, 7));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(slider.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(slider.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(slider);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(254:2) {#if isAlpha}",
    		ctx
    	});

    	return block;
    }

    // (268:2) {#if isTextInput}
    function create_if_block_1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*getComponents*/ ctx[23]().textInput;

    	function switch_props(ctx) {
    		return {
    			props: {
    				hex: /*hex*/ ctx[2] ?? /*_hex*/ ctx[19],
    				rgb: /*rgb*/ ctx[0] ?? /*_rgb*/ ctx[17],
    				hsv: /*hsv*/ ctx[1] ?? /*_hsv*/ ctx[18],
    				isAlpha: /*isAlpha*/ ctx[8],
    				textInputModes: /*textInputModes*/ ctx[11],
    				texts: /*getTexts*/ ctx[24]()
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    		switch_instance.$on("input", /*input_handler*/ ctx[35]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};
    			if (dirty[0] & /*hex, _hex*/ 524292) switch_instance_changes.hex = /*hex*/ ctx[2] ?? /*_hex*/ ctx[19];
    			if (dirty[0] & /*rgb, _rgb*/ 131073) switch_instance_changes.rgb = /*rgb*/ ctx[0] ?? /*_rgb*/ ctx[17];
    			if (dirty[0] & /*hsv, _hsv*/ 262146) switch_instance_changes.hsv = /*hsv*/ ctx[1] ?? /*_hsv*/ ctx[18];
    			if (dirty[0] & /*isAlpha*/ 256) switch_instance_changes.isAlpha = /*isAlpha*/ ctx[8];
    			if (dirty[0] & /*textInputModes*/ 2048) switch_instance_changes.textInputModes = /*textInputModes*/ ctx[11];

    			if (switch_value !== (switch_value = /*getComponents*/ ctx[23]().textInput)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    					switch_instance.$on("input", /*input_handler*/ ctx[35]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(268:2) {#if isTextInput}",
    		ctx
    	});

    	return block;
    }

    // (288:2) {#if getComponents().a11yNotice}
    function create_if_block$1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*getComponents*/ ctx[23]().a11yNotice;

    	function switch_props(ctx) {
    		return {
    			props: {
    				components: /*getComponents*/ ctx[23](),
    				a11yColors: /*a11yColors*/ ctx[13],
    				hex: /*hex*/ ctx[2] || '#00000000',
    				a11yTexts: /*a11yTexts*/ ctx[15],
    				a11yLevel: /*a11yLevel*/ ctx[14]
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};
    			if (dirty[0] & /*a11yColors*/ 8192) switch_instance_changes.a11yColors = /*a11yColors*/ ctx[13];
    			if (dirty[0] & /*hex*/ 4) switch_instance_changes.hex = /*hex*/ ctx[2] || '#00000000';
    			if (dirty[0] & /*a11yTexts*/ 32768) switch_instance_changes.a11yTexts = /*a11yTexts*/ ctx[15];
    			if (dirty[0] & /*a11yLevel*/ 16384) switch_instance_changes.a11yLevel = /*a11yLevel*/ ctx[14];

    			if (switch_value !== (switch_value = /*getComponents*/ ctx[23]().a11yNotice)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(288:2) {#if getComponents().a11yNotice}",
    		ctx
    	});

    	return block;
    }

    // (230:1) <svelte:component this={getComponents().wrapper} bind:wrapper {isOpen} {isDialog}>
    function create_default_slot(ctx) {
    	let t0;
    	let picker;
    	let t1;
    	let div;
    	let slider;
    	let t2;
    	let t3;
    	let t4;
    	let show_if = /*getComponents*/ ctx[23]().a11yNotice;
    	let if_block3_anchor;
    	let current;
    	let if_block0 = /*nullable*/ ctx[7] && create_if_block_3(ctx);

    	picker = new Picker({
    			props: {
    				components: /*getComponents*/ ctx[23](),
    				h: /*hsv*/ ctx[1]?.h ?? /*_hsv*/ ctx[18].h,
    				s: /*hsv*/ ctx[1]?.s ?? /*_hsv*/ ctx[18].s,
    				v: /*hsv*/ ctx[1]?.v ?? /*_hsv*/ ctx[18].v,
    				isDark: /*isDark*/ ctx[3]
    			},
    			$$inline: true
    		});

    	picker.$on("input", /*updateLetters*/ ctx[28](['s', 'v']));

    	slider = new Slider({
    			props: {
    				min: 0,
    				max: 360,
    				step: 1,
    				value: /*hsv*/ ctx[1]?.h ?? /*_hsv*/ ctx[18].h,
    				direction: /*sliderDirection*/ ctx[12],
    				reverse: /*sliderDirection*/ ctx[12] === 'vertical',
    				ariaLabel: /*getTexts*/ ctx[24]().label.h
    			},
    			$$inline: true
    		});

    	slider.$on("input", /*updateLetter*/ ctx[27]('h'));
    	let if_block1 = /*isAlpha*/ ctx[8] && create_if_block_2(ctx);
    	let if_block2 = /*isTextInput*/ ctx[10] && create_if_block_1(ctx);
    	let if_block3 = show_if && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t0 = space();
    			create_component(picker.$$.fragment);
    			t1 = space();
    			div = element("div");
    			create_component(slider.$$.fragment);
    			t2 = space();
    			if (if_block1) if_block1.c();
    			t3 = space();
    			if (if_block2) if_block2.c();
    			t4 = space();
    			if (if_block3) if_block3.c();
    			if_block3_anchor = empty();
    			attr_dev(div, "class", "h svelte-tsvobk");
    			add_location(div, file$2, 241, 2, 8166);
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(picker, target, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div, anchor);
    			mount_component(slider, div, null);
    			insert_dev(target, t2, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, t3, anchor);
    			if (if_block2) if_block2.m(target, anchor);
    			insert_dev(target, t4, anchor);
    			if (if_block3) if_block3.m(target, anchor);
    			insert_dev(target, if_block3_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*nullable*/ ctx[7]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty[0] & /*nullable*/ 128) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_3(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t0.parentNode, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			const picker_changes = {};
    			if (dirty[0] & /*hsv, _hsv*/ 262146) picker_changes.h = /*hsv*/ ctx[1]?.h ?? /*_hsv*/ ctx[18].h;
    			if (dirty[0] & /*hsv, _hsv*/ 262146) picker_changes.s = /*hsv*/ ctx[1]?.s ?? /*_hsv*/ ctx[18].s;
    			if (dirty[0] & /*hsv, _hsv*/ 262146) picker_changes.v = /*hsv*/ ctx[1]?.v ?? /*_hsv*/ ctx[18].v;
    			if (dirty[0] & /*isDark*/ 8) picker_changes.isDark = /*isDark*/ ctx[3];
    			picker.$set(picker_changes);
    			const slider_changes = {};
    			if (dirty[0] & /*hsv, _hsv*/ 262146) slider_changes.value = /*hsv*/ ctx[1]?.h ?? /*_hsv*/ ctx[18].h;
    			if (dirty[0] & /*sliderDirection*/ 4096) slider_changes.direction = /*sliderDirection*/ ctx[12];
    			if (dirty[0] & /*sliderDirection*/ 4096) slider_changes.reverse = /*sliderDirection*/ ctx[12] === 'vertical';
    			slider.$set(slider_changes);

    			if (/*isAlpha*/ ctx[8]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*isAlpha*/ 256) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_2(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(t3.parentNode, t3);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (/*isTextInput*/ ctx[10]) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);

    					if (dirty[0] & /*isTextInput*/ 1024) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block_1(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(t4.parentNode, t4);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}

    			if (show_if) if_block3.p(ctx, dirty);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(picker.$$.fragment, local);
    			transition_in(slider.$$.fragment, local);
    			transition_in(if_block1);
    			transition_in(if_block2);
    			transition_in(if_block3);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(picker.$$.fragment, local);
    			transition_out(slider.$$.fragment, local);
    			transition_out(if_block1);
    			transition_out(if_block2);
    			transition_out(if_block3);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(picker, detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div);
    			destroy_component(slider);
    			if (detaching) detach_dev(t2);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(t3);
    			if (if_block2) if_block2.d(detaching);
    			if (detaching) detach_dev(t4);
    			if (if_block3) if_block3.d(detaching);
    			if (detaching) detach_dev(if_block3_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(230:1) <svelte:component this={getComponents().wrapper} bind:wrapper {isOpen} {isDialog}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let span;
    	let current_block_type_index;
    	let if_block;
    	let t;
    	let switch_instance;
    	let updating_wrapper;
    	let span_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	const if_block_creators = [create_if_block_4, create_if_block_5];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*isDialog*/ ctx[9]) return 0;
    		if (/*name*/ ctx[6]) return 1;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	function switch_instance_wrapper_binding(value) {
    		/*switch_instance_wrapper_binding*/ ctx[36](value);
    	}

    	var switch_value = /*getComponents*/ ctx[23]().wrapper;

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			isOpen: /*isOpen*/ ctx[4],
    			isDialog: /*isDialog*/ ctx[9],
    			$$slots: { default: [create_default_slot] },
    			$$scope: { ctx }
    		};

    		if (/*wrapper*/ ctx[22] !== void 0) {
    			switch_instance_props.wrapper = /*wrapper*/ ctx[22];
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    		binding_callbacks.push(() => bind(switch_instance, 'wrapper', switch_instance_wrapper_binding));
    	}

    	const block = {
    		c: function create() {
    			span = element("span");
    			if (if_block) if_block.c();
    			t = space();
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			attr_dev(span, "class", span_class_value = "color-picker " + /*sliderDirection*/ ctx[12] + " svelte-tsvobk");
    			add_location(span, file$2, 223, 0, 7528);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(span, null);
    			}

    			append_dev(span, t);
    			if (switch_instance) mount_component(switch_instance, span, null);
    			/*span_binding*/ ctx[37](span);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "mousedown", /*mousedown*/ ctx[25], false, false, false, false),
    					listen_dev(window, "keyup", /*keyup*/ ctx[26], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					} else {
    						if_block.p(ctx, dirty);
    					}

    					transition_in(if_block, 1);
    					if_block.m(span, t);
    				} else {
    					if_block = null;
    				}
    			}

    			const switch_instance_changes = {};
    			if (dirty[0] & /*isOpen*/ 16) switch_instance_changes.isOpen = /*isOpen*/ ctx[4];
    			if (dirty[0] & /*isDialog*/ 512) switch_instance_changes.isDialog = /*isDialog*/ ctx[9];

    			if (dirty[0] & /*a11yColors, hex, a11yTexts, a11yLevel, _hex, rgb, _rgb, hsv, _hsv, isAlpha, textInputModes, isTextInput, sliderDirection, isDark, isUndefined, nullable*/ 1047951 | dirty[1] & /*$$scope*/ 4096) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_wrapper && dirty[0] & /*wrapper*/ 4194304) {
    				updating_wrapper = true;
    				switch_instance_changes.wrapper = /*wrapper*/ ctx[22];
    				add_flush_callback(() => updating_wrapper = false);
    			}

    			if (switch_value !== (switch_value = /*getComponents*/ ctx[23]().wrapper)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    					binding_callbacks.push(() => bind(switch_instance, 'wrapper', switch_instance_wrapper_binding));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, span, null);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}

    			if (!current || dirty[0] & /*sliderDirection*/ 4096 && span_class_value !== (span_class_value = "color-picker " + /*sliderDirection*/ ctx[12] + " svelte-tsvobk")) {
    				attr_dev(span, "class", span_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d();
    			}

    			if (switch_instance) destroy_component(switch_instance);
    			/*span_binding*/ ctx[37](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ColorPicker', slots, []);
    	const dispatch = createEventDispatcher();
    	let { components = {} } = $$props;
    	let { label = 'Choose a color' } = $$props;
    	let { name = undefined } = $$props;
    	let { nullable = false } = $$props;
    	let { rgb = nullable ? undefined : { r: 255, g: 0, b: 0, a: 1 } } = $$props;
    	let { hsv = nullable ? undefined : { h: 0, s: 100, v: 100, a: 1 } } = $$props;
    	let { hex = nullable ? undefined : '#ff0000' } = $$props;
    	let { color = undefined } = $$props;
    	let { isDark = false } = $$props;
    	let { isAlpha = true } = $$props;
    	let { isDialog = true } = $$props;
    	let { isOpen = !isDialog } = $$props;
    	let { isTextInput = true } = $$props;
    	let { textInputModes = ['hex', 'rgb', 'hsv'] } = $$props;
    	let { sliderDirection = 'vertical' } = $$props;
    	let { disableCloseClickOutside = false } = $$props;
    	let { a11yColors = [{ bgHex: '#ffffff' }] } = $$props;
    	let { a11yLevel = 'AA' } = $$props;
    	let { texts = undefined } = $$props;
    	let { a11yTexts = undefined } = $$props;

    	/**
     * Internal old values to trigger color conversion
     */
    	let _rgb = { r: 255, g: 0, b: 0, a: 1 };

    	let _hsv = { h: 0, s: 100, v: 100, a: 1 };
    	let _hex = '#ff0000';
    	let isUndefined = false;
    	let _isUndefined = isUndefined;
    	let spanElement;
    	let labelElement;
    	let wrapper;
    	let trap = undefined;

    	const default_components = {
    		pickerIndicator: PickerIndicator,
    		textInput: TextInput,
    		input: Input,
    		nullabilityCheckbox: NullabilityCheckbox,
    		wrapper: Wrapper
    	};

    	function getComponents() {
    		return { ...default_components, ...components };
    	}

    	function getTexts() {
    		return {
    			label: { ...defaultTexts.label, ...texts?.label },
    			color: { ...defaultTexts.color, ...texts?.color },
    			changeTo: texts?.changeTo ?? defaultTexts.changeTo
    		};
    	}

    	function mousedown({ target }) {
    		if (isDialog) {
    			if (labelElement.contains(target) || labelElement.isSameNode(target)) {
    				$$invalidate(4, isOpen = !isOpen);
    			} else if (isOpen && !wrapper.contains(target) && !disableCloseClickOutside) {
    				$$invalidate(4, isOpen = false);
    			}
    		}
    	}

    	function keyup({ key, target }) {
    		if (!isDialog) {
    			return;
    		} else if (key === 'Enter' && labelElement.contains(target)) {
    			$$invalidate(4, isOpen = !isOpen);

    			setTimeout(() => {
    				trap = trapFocus(wrapper);
    			});
    		} else if (key === 'Escape' && isOpen) {
    			$$invalidate(4, isOpen = false);

    			if (spanElement.contains(target)) {
    				labelElement?.focus();
    				trap?.destroy();
    			}
    		}
    	}

    	/**
     * using a function seems to trigger the exported value change only once when all of them has been updated
     * and not just after the hsv change
     */
    	function updateColor() {
    		if (isUndefined && !_isUndefined) {
    			_isUndefined = true;
    			$$invalidate(1, hsv = $$invalidate(0, rgb = $$invalidate(2, hex = undefined)));
    			dispatch('input', { color, hsv, rgb, hex });
    			return;
    		} else if (_isUndefined && !isUndefined) {
    			_isUndefined = false;
    			$$invalidate(1, hsv = _hsv);
    			$$invalidate(0, rgb = _rgb);
    			$$invalidate(2, hex = _hex);
    			dispatch('input', { color, hsv, rgb, hex });
    			return;
    		}

    		if (!hsv && !rgb && !hex) {
    			$$invalidate(16, isUndefined = true);
    			_isUndefined = true;
    			dispatch('input', { color: undefined, hsv, rgb, hex });
    			return;
    		}

    		if (hsv && rgb && hsv.h === _hsv.h && hsv.s === _hsv.s && hsv.v === _hsv.v && hsv.a === _hsv.a && rgb.r === _rgb.r && rgb.g === _rgb.g && rgb.b === _rgb.b && rgb.a === _rgb.a && hex === _hex) {
    			return;
    		}

    		$$invalidate(16, isUndefined = false);

    		// reinitialize empty alpha values
    		if (hsv && hsv.a === undefined) $$invalidate(1, hsv.a = 1, hsv);

    		if (_hsv.a === undefined) $$invalidate(18, _hsv.a = 1, _hsv);
    		if (rgb && rgb.a === undefined) $$invalidate(0, rgb.a = 1, rgb);
    		if (_rgb.a === undefined) $$invalidate(17, _rgb.a = 1, _rgb);
    		if (hex?.substring(7) === 'ff') $$invalidate(2, hex = hex.substring(0, 7));
    		if (hex?.substring(7) === 'ff') $$invalidate(2, hex = hex.substring(0, 7));

    		// check which color format changed and updates the others accordingly
    		if (hsv && (hsv.h !== _hsv.h || hsv.s !== _hsv.s || hsv.v !== _hsv.v || hsv.a !== _hsv.a)) {
    			$$invalidate(29, color = w(hsv));
    			$$invalidate(0, rgb = color.toRgb());
    			$$invalidate(2, hex = color.toHex());
    		} else if (rgb && (rgb.r !== _rgb.r || rgb.g !== _rgb.g || rgb.b !== _rgb.b || rgb.a !== _rgb.a)) {
    			$$invalidate(29, color = w(rgb));
    			$$invalidate(2, hex = color.toHex());
    			$$invalidate(1, hsv = color.toHsv());
    		} else if (hex && hex !== _hex) {
    			$$invalidate(29, color = w(hex));
    			$$invalidate(0, rgb = color.toRgb());
    			$$invalidate(1, hsv = color.toHsv());
    		}

    		if (color) {
    			$$invalidate(3, isDark = color.isDark());
    		}

    		if (!hex) return;

    		// update old colors
    		$$invalidate(18, _hsv = Object.assign({}, hsv));

    		$$invalidate(17, _rgb = Object.assign({}, rgb));
    		$$invalidate(19, _hex = hex);
    		_isUndefined = isUndefined;
    		dispatch('input', { color, hsv, rgb, hex });
    	}

    	function updateLetter(letter) {
    		return e => {
    			if (!hsv) $$invalidate(1, hsv = { ..._hsv });
    			$$invalidate(1, hsv[letter] = e.detail, hsv);
    		};
    	}

    	function updateLetters(letters) {
    		return e => {
    			if (!hsv) $$invalidate(1, hsv = { ..._hsv });

    			letters.forEach(letter => {
    				if (hsv) $$invalidate(1, hsv[letter] = e.detail[letter], hsv);
    			});
    		};
    	}

    	const writable_props = [
    		'components',
    		'label',
    		'name',
    		'nullable',
    		'rgb',
    		'hsv',
    		'hex',
    		'color',
    		'isDark',
    		'isAlpha',
    		'isDialog',
    		'isOpen',
    		'isTextInput',
    		'textInputModes',
    		'sliderDirection',
    		'disableCloseClickOutside',
    		'a11yColors',
    		'a11yLevel',
    		'texts',
    		'a11yTexts'
    	];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ColorPicker> was created with unknown prop '${key}'`);
    	});

    	function switch_instance_labelElement_binding(value) {
    		labelElement = value;
    		$$invalidate(21, labelElement);
    	}

    	function switch_instance_isUndefined_binding(value) {
    		isUndefined = value;
    		$$invalidate(16, isUndefined);
    	}

    	const input_handler = ({ detail }) => {
    		if (detail.hsv) {
    			$$invalidate(1, hsv = detail.hsv);
    		} else if (detail.rgb) {
    			$$invalidate(0, rgb = detail.rgb);
    		} else if (detail.hex) {
    			$$invalidate(2, hex = detail.hex);
    		}
    	};

    	function switch_instance_wrapper_binding(value) {
    		wrapper = value;
    		$$invalidate(22, wrapper);
    	}

    	function span_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			spanElement = $$value;
    			$$invalidate(20, spanElement);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('components' in $$props) $$invalidate(30, components = $$props.components);
    		if ('label' in $$props) $$invalidate(5, label = $$props.label);
    		if ('name' in $$props) $$invalidate(6, name = $$props.name);
    		if ('nullable' in $$props) $$invalidate(7, nullable = $$props.nullable);
    		if ('rgb' in $$props) $$invalidate(0, rgb = $$props.rgb);
    		if ('hsv' in $$props) $$invalidate(1, hsv = $$props.hsv);
    		if ('hex' in $$props) $$invalidate(2, hex = $$props.hex);
    		if ('color' in $$props) $$invalidate(29, color = $$props.color);
    		if ('isDark' in $$props) $$invalidate(3, isDark = $$props.isDark);
    		if ('isAlpha' in $$props) $$invalidate(8, isAlpha = $$props.isAlpha);
    		if ('isDialog' in $$props) $$invalidate(9, isDialog = $$props.isDialog);
    		if ('isOpen' in $$props) $$invalidate(4, isOpen = $$props.isOpen);
    		if ('isTextInput' in $$props) $$invalidate(10, isTextInput = $$props.isTextInput);
    		if ('textInputModes' in $$props) $$invalidate(11, textInputModes = $$props.textInputModes);
    		if ('sliderDirection' in $$props) $$invalidate(12, sliderDirection = $$props.sliderDirection);
    		if ('disableCloseClickOutside' in $$props) $$invalidate(31, disableCloseClickOutside = $$props.disableCloseClickOutside);
    		if ('a11yColors' in $$props) $$invalidate(13, a11yColors = $$props.a11yColors);
    		if ('a11yLevel' in $$props) $$invalidate(14, a11yLevel = $$props.a11yLevel);
    		if ('texts' in $$props) $$invalidate(32, texts = $$props.texts);
    		if ('a11yTexts' in $$props) $$invalidate(15, a11yTexts = $$props.a11yTexts);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		colord: w,
    		Picker,
    		Slider,
    		PickerIndicator,
    		TextInput,
    		Input,
    		Wrapper,
    		defaultTexts,
    		trapFocus,
    		NullabilityCheckbox,
    		dispatch,
    		components,
    		label,
    		name,
    		nullable,
    		rgb,
    		hsv,
    		hex,
    		color,
    		isDark,
    		isAlpha,
    		isDialog,
    		isOpen,
    		isTextInput,
    		textInputModes,
    		sliderDirection,
    		disableCloseClickOutside,
    		a11yColors,
    		a11yLevel,
    		texts,
    		a11yTexts,
    		_rgb,
    		_hsv,
    		_hex,
    		isUndefined,
    		_isUndefined,
    		spanElement,
    		labelElement,
    		wrapper,
    		trap,
    		default_components,
    		getComponents,
    		getTexts,
    		mousedown,
    		keyup,
    		updateColor,
    		updateLetter,
    		updateLetters
    	});

    	$$self.$inject_state = $$props => {
    		if ('components' in $$props) $$invalidate(30, components = $$props.components);
    		if ('label' in $$props) $$invalidate(5, label = $$props.label);
    		if ('name' in $$props) $$invalidate(6, name = $$props.name);
    		if ('nullable' in $$props) $$invalidate(7, nullable = $$props.nullable);
    		if ('rgb' in $$props) $$invalidate(0, rgb = $$props.rgb);
    		if ('hsv' in $$props) $$invalidate(1, hsv = $$props.hsv);
    		if ('hex' in $$props) $$invalidate(2, hex = $$props.hex);
    		if ('color' in $$props) $$invalidate(29, color = $$props.color);
    		if ('isDark' in $$props) $$invalidate(3, isDark = $$props.isDark);
    		if ('isAlpha' in $$props) $$invalidate(8, isAlpha = $$props.isAlpha);
    		if ('isDialog' in $$props) $$invalidate(9, isDialog = $$props.isDialog);
    		if ('isOpen' in $$props) $$invalidate(4, isOpen = $$props.isOpen);
    		if ('isTextInput' in $$props) $$invalidate(10, isTextInput = $$props.isTextInput);
    		if ('textInputModes' in $$props) $$invalidate(11, textInputModes = $$props.textInputModes);
    		if ('sliderDirection' in $$props) $$invalidate(12, sliderDirection = $$props.sliderDirection);
    		if ('disableCloseClickOutside' in $$props) $$invalidate(31, disableCloseClickOutside = $$props.disableCloseClickOutside);
    		if ('a11yColors' in $$props) $$invalidate(13, a11yColors = $$props.a11yColors);
    		if ('a11yLevel' in $$props) $$invalidate(14, a11yLevel = $$props.a11yLevel);
    		if ('texts' in $$props) $$invalidate(32, texts = $$props.texts);
    		if ('a11yTexts' in $$props) $$invalidate(15, a11yTexts = $$props.a11yTexts);
    		if ('_rgb' in $$props) $$invalidate(17, _rgb = $$props._rgb);
    		if ('_hsv' in $$props) $$invalidate(18, _hsv = $$props._hsv);
    		if ('_hex' in $$props) $$invalidate(19, _hex = $$props._hex);
    		if ('isUndefined' in $$props) $$invalidate(16, isUndefined = $$props.isUndefined);
    		if ('_isUndefined' in $$props) _isUndefined = $$props._isUndefined;
    		if ('spanElement' in $$props) $$invalidate(20, spanElement = $$props.spanElement);
    		if ('labelElement' in $$props) $$invalidate(21, labelElement = $$props.labelElement);
    		if ('wrapper' in $$props) $$invalidate(22, wrapper = $$props.wrapper);
    		if ('trap' in $$props) trap = $$props.trap;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*hsv, rgb, hex*/ 7) {
    			if (hsv || rgb || hex) {
    				updateColor();
    			}
    		}

    		if ($$self.$$.dirty[0] & /*isUndefined*/ 65536) {
    			(updateColor());
    		}
    	};

    	return [
    		rgb,
    		hsv,
    		hex,
    		isDark,
    		isOpen,
    		label,
    		name,
    		nullable,
    		isAlpha,
    		isDialog,
    		isTextInput,
    		textInputModes,
    		sliderDirection,
    		a11yColors,
    		a11yLevel,
    		a11yTexts,
    		isUndefined,
    		_rgb,
    		_hsv,
    		_hex,
    		spanElement,
    		labelElement,
    		wrapper,
    		getComponents,
    		getTexts,
    		mousedown,
    		keyup,
    		updateLetter,
    		updateLetters,
    		color,
    		components,
    		disableCloseClickOutside,
    		texts,
    		switch_instance_labelElement_binding,
    		switch_instance_isUndefined_binding,
    		input_handler,
    		switch_instance_wrapper_binding,
    		span_binding
    	];
    }

    class ColorPicker extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$2,
    			create_fragment$2,
    			safe_not_equal,
    			{
    				components: 30,
    				label: 5,
    				name: 6,
    				nullable: 7,
    				rgb: 0,
    				hsv: 1,
    				hex: 2,
    				color: 29,
    				isDark: 3,
    				isAlpha: 8,
    				isDialog: 9,
    				isOpen: 4,
    				isTextInput: 10,
    				textInputModes: 11,
    				sliderDirection: 12,
    				disableCloseClickOutside: 31,
    				a11yColors: 13,
    				a11yLevel: 14,
    				texts: 32,
    				a11yTexts: 15
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ColorPicker",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get components() {
    		throw new Error("<ColorPicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set components(value) {
    		throw new Error("<ColorPicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error("<ColorPicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<ColorPicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<ColorPicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<ColorPicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get nullable() {
    		throw new Error("<ColorPicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nullable(value) {
    		throw new Error("<ColorPicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get rgb() {
    		throw new Error("<ColorPicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rgb(value) {
    		throw new Error("<ColorPicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hsv() {
    		throw new Error("<ColorPicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hsv(value) {
    		throw new Error("<ColorPicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hex() {
    		throw new Error("<ColorPicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hex(value) {
    		throw new Error("<ColorPicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<ColorPicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<ColorPicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isDark() {
    		throw new Error("<ColorPicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isDark(value) {
    		throw new Error("<ColorPicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isAlpha() {
    		throw new Error("<ColorPicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isAlpha(value) {
    		throw new Error("<ColorPicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isDialog() {
    		throw new Error("<ColorPicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isDialog(value) {
    		throw new Error("<ColorPicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isOpen() {
    		throw new Error("<ColorPicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isOpen(value) {
    		throw new Error("<ColorPicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isTextInput() {
    		throw new Error("<ColorPicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isTextInput(value) {
    		throw new Error("<ColorPicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get textInputModes() {
    		throw new Error("<ColorPicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set textInputModes(value) {
    		throw new Error("<ColorPicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get sliderDirection() {
    		throw new Error("<ColorPicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set sliderDirection(value) {
    		throw new Error("<ColorPicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disableCloseClickOutside() {
    		throw new Error("<ColorPicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disableCloseClickOutside(value) {
    		throw new Error("<ColorPicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get a11yColors() {
    		throw new Error("<ColorPicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set a11yColors(value) {
    		throw new Error("<ColorPicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get a11yLevel() {
    		throw new Error("<ColorPicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set a11yLevel(value) {
    		throw new Error("<ColorPicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get texts() {
    		throw new Error("<ColorPicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set texts(value) {
    		throw new Error("<ColorPicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get a11yTexts() {
    		throw new Error("<ColorPicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set a11yTexts(value) {
    		throw new Error("<ColorPicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Sections/extras.svelte generated by Svelte v3.59.2 */

    const { console: console_1 } = globals;
    const file$1 = "src/Sections/extras.svelte";

    function create_fragment$1(ctx) {
    	let main;
    	let div1;
    	let h2;
    	let t1;
    	let div0;
    	let colorpicker;
    	let div;
    	let updating_hex;
    	let updating_rgb;
    	let updating_hsv;
    	let updating_color;
    	let t2;
    	let button;
    	let current;
    	let mounted;
    	let dispose;

    	function colorpicker_hex_binding(value) {
    		/*colorpicker_hex_binding*/ ctx[5](value);
    	}

    	function colorpicker_rgb_binding(value) {
    		/*colorpicker_rgb_binding*/ ctx[6](value);
    	}

    	function colorpicker_hsv_binding(value) {
    		/*colorpicker_hsv_binding*/ ctx[7](value);
    	}

    	function colorpicker_color_binding(value) {
    		/*colorpicker_color_binding*/ ctx[8](value);
    	}

    	let colorpicker_props = { isAlpha: false };

    	if (/*hex*/ ctx[0] !== void 0) {
    		colorpicker_props.hex = /*hex*/ ctx[0];
    	}

    	if (/*rgb*/ ctx[1] !== void 0) {
    		colorpicker_props.rgb = /*rgb*/ ctx[1];
    	}

    	if (/*hsv*/ ctx[2] !== void 0) {
    		colorpicker_props.hsv = /*hsv*/ ctx[2];
    	}

    	if (/*color*/ ctx[3] !== void 0) {
    		colorpicker_props.color = /*color*/ ctx[3];
    	}

    	colorpicker = new ColorPicker({ props: colorpicker_props, $$inline: true });
    	binding_callbacks.push(() => bind(colorpicker, 'hex', colorpicker_hex_binding));
    	binding_callbacks.push(() => bind(colorpicker, 'rgb', colorpicker_rgb_binding));
    	binding_callbacks.push(() => bind(colorpicker, 'hsv', colorpicker_hsv_binding));
    	binding_callbacks.push(() => bind(colorpicker, 'color', colorpicker_color_binding));

    	const block = {
    		c: function create() {
    			main = element("main");
    			div1 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Change the colour of the strip lights around my desk";
    			t1 = space();
    			div0 = element("div");
    			div = element("div");
    			create_component(colorpicker.$$.fragment);
    			t2 = space();
    			button = element("button");
    			button.textContent = "Change Lights!";
    			attr_dev(h2, "class", "svelte-12bima5");
    			add_location(h2, file$1, 59, 8, 1789);
    			set_style(div, "display", "contents");
    			set_style(div, "--cp-text-color", "black");
    			attr_dev(div0, "id", "color-picker");
    			attr_dev(div0, "class", "svelte-12bima5");
    			add_location(div0, file$1, 60, 8, 1859);
    			attr_dev(button, "id", "desk-light-confirm");
    			attr_dev(button, "class", "svelte-12bima5");
    			add_location(button, file$1, 70, 8, 2096);
    			attr_dev(div1, "id", "desk-light");
    			attr_dev(div1, "class", "svelte-12bima5");
    			add_location(div1, file$1, 58, 4, 1759);
    			attr_dev(main, "class", "svelte-12bima5");
    			add_location(main, file$1, 57, 0, 1748);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div1);
    			append_dev(div1, h2);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			append_dev(div0, div);
    			mount_component(colorpicker, div, null);
    			append_dev(div1, t2);
    			append_dev(div1, button);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*changeDeskLight*/ ctx[4], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const colorpicker_changes = {};

    			if (!updating_hex && dirty & /*hex*/ 1) {
    				updating_hex = true;
    				colorpicker_changes.hex = /*hex*/ ctx[0];
    				add_flush_callback(() => updating_hex = false);
    			}

    			if (!updating_rgb && dirty & /*rgb*/ 2) {
    				updating_rgb = true;
    				colorpicker_changes.rgb = /*rgb*/ ctx[1];
    				add_flush_callback(() => updating_rgb = false);
    			}

    			if (!updating_hsv && dirty & /*hsv*/ 4) {
    				updating_hsv = true;
    				colorpicker_changes.hsv = /*hsv*/ ctx[2];
    				add_flush_callback(() => updating_hsv = false);
    			}

    			if (!updating_color && dirty & /*color*/ 8) {
    				updating_color = true;
    				colorpicker_changes.color = /*color*/ ctx[3];
    				add_flush_callback(() => updating_color = false);
    			}

    			colorpicker.$set(colorpicker_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(colorpicker.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(colorpicker.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(colorpicker);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Extras', slots, []);
    	let hex = "#1cacbf";
    	let rgb = { "r": 28, "g": 172, "b": 191, "a": 1 };
    	let hsv = { "h": 187, "s": 85, "v": 75, "a": 1 };
    	let color = "// instance of Colord";

    	async function changeDeskLight() {
    		const url = 'https://syltjdok7yqqibzwojow6tt5ny0ykkxb.lambda-url.us-east-1.on.aws/';
    		const body = JSON.stringify({ h: hsv["h"], s: hsv["s"], v: hsv["v"] });

    		try {
    			const response = await fetch(url, {
    				method: 'POST',
    				headers: { 'Content-Type': 'application/json' },
    				body
    			});

    			if (!response.ok) {
    				const errorText = await response.text();
    				console.log(`Error: ${response.status} ${errorText}`);
    				document.getElementById("desk-light-confirm").innerHTML = "Error";
    				return;
    			}

    			const result = await response.json();
    			document.getElementById("desk-light-confirm").innerHTML = "Success!";
    		} catch(error) {
    			// console.error('Error changing lights:', error);
    			console.log("Ignore error above ^^ request does actually go through somehow idk i dont know how cors works");
    		}

    		document.getElementById("desk-light-confirm").innerHTML = "Success!";
    		document.getElementById("desk-light-confirm").disabled = true;

    		setTimeout(
    			() => {
    				document.getElementById("desk-light-confirm").innerHTML = "Change Lights!";
    				document.getElementById("desk-light-confirm").disabled = false;
    			},
    			2000
    		);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Extras> was created with unknown prop '${key}'`);
    	});

    	function colorpicker_hex_binding(value) {
    		hex = value;
    		$$invalidate(0, hex);
    	}

    	function colorpicker_rgb_binding(value) {
    		rgb = value;
    		$$invalidate(1, rgb);
    	}

    	function colorpicker_hsv_binding(value) {
    		hsv = value;
    		$$invalidate(2, hsv);
    	}

    	function colorpicker_color_binding(value) {
    		color = value;
    		$$invalidate(3, color);
    	}

    	$$self.$capture_state = () => ({
    		ColorPicker,
    		hex,
    		rgb,
    		hsv,
    		color,
    		changeDeskLight
    	});

    	$$self.$inject_state = $$props => {
    		if ('hex' in $$props) $$invalidate(0, hex = $$props.hex);
    		if ('rgb' in $$props) $$invalidate(1, rgb = $$props.rgb);
    		if ('hsv' in $$props) $$invalidate(2, hsv = $$props.hsv);
    		if ('color' in $$props) $$invalidate(3, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		hex,
    		rgb,
    		hsv,
    		color,
    		changeDeskLight,
    		colorpicker_hex_binding,
    		colorpicker_rgb_binding,
    		colorpicker_hsv_binding,
    		colorpicker_color_binding
    	];
    }

    class Extras extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Extras",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.59.2 */
    const file = "src/App.svelte";

    // (42:3) {#if selected_component}
    function create_if_block(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*selected_component*/ ctx[0];

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*selected_component*/ 1 && switch_value !== (switch_value = /*selected_component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(42:3) {#if selected_component}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let div1;
    	let div0;
    	let t0;
    	let div2;
    	let t2;
    	let div3;
    	let img;
    	let img_src_value;
    	let current;
    	let if_block = /*selected_component*/ ctx[0] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			div1 = element("div");
    			div0 = element("div");
    			if (if_block) if_block.c();
    			t0 = space();
    			div2 = element("div");
    			div2.textContent = "Website Version 3.0.2";
    			t2 = space();
    			div3 = element("div");
    			img = element("img");
    			attr_dev(div0, "id", "main-content");
    			attr_dev(div0, "class", "svelte-1dt6q6k");
    			add_location(div0, file, 40, 2, 992);
    			attr_dev(div1, "id", "main-box");
    			attr_dev(div1, "class", "svelte-1dt6q6k");
    			add_location(div1, file, 28, 1, 700);
    			attr_dev(div2, "id", "website-version");
    			attr_dev(div2, "class", "svelte-1dt6q6k");
    			add_location(div2, file, 46, 1, 1122);
    			if (!src_url_equal(img.src, img_src_value = "./assets/404.webp")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "height", "800");
    			attr_dev(img, "class", "svelte-1dt6q6k");
    			add_location(img, file, 47, 27, 1203);
    			attr_dev(div3, "id", "viewed-image");
    			attr_dev(div3, "class", "svelte-1dt6q6k");
    			add_location(div3, file, 47, 4, 1180);
    			attr_dev(main, "class", "svelte-1dt6q6k");
    			add_location(main, file, 27, 0, 692);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div1);
    			append_dev(div1, div0);
    			if (if_block) if_block.m(div0, null);
    			append_dev(main, t0);
    			append_dev(main, div2);
    			append_dev(main, t2);
    			append_dev(main, div3);
    			append_dev(div3, img);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*selected_component*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*selected_component*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div0, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	var section_map = { "about": About, "extras": Extras };
    	let selected_component = About;

    	onMount(() => {
    		// Create listeners for each list element
    		var sections = document.getElementById("main-nav-list").children;

    		for (let i = 0; i < document.getElementById("main-nav-list").childElementCount; i++) {
    			sections[i].addEventListener("click", () => {
    				nav_option_clicked(sections[i].innerText.split(" ")[0]);
    			});
    		}
    	});

    	function nav_option_clicked(identifier) {
    		$$invalidate(0, selected_component = section_map[identifier]);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		onMount,
    		About,
    		Extras,
    		section_map,
    		selected_component,
    		nav_option_clicked
    	});

    	$$self.$inject_state = $$props => {
    		if ('section_map' in $$props) section_map = $$props.section_map;
    		if ('selected_component' in $$props) $$invalidate(0, selected_component = $$props.selected_component);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [selected_component];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
