Number.isInteger = Number.isInteger || function (value) {
    return typeof value === "number" &&
        isFinite(value) &&
        Math.floor(value) === value;
};
/* globals JQClass */
/*! Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function () {
    'use strict';
    var initializing = false;

    // The base JQClass implementation (does nothing)
    window.JQClass = function () { };

    // Collection of derived classes
    JQClass.classes = {};

    // Create a new JQClass that inherits from this class
    JQClass.extend = function extender(prop) {
        var base = this.prototype;

        // Instantiate a base class (but only create the instance, don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) { // jshint loopfunc:true
            // Check if we're overwriting an existing function
            if (typeof prop[name] === 'function' && typeof base[name] === 'function') {
                prototype[name] = (function (name, fn) {
                    return function () {
                        var __super = this._super;
                        // Add a new ._super() method that is the same method but on the super-class
                        this._super = function (args) {
                            return base[name].apply(this, args || []);
                        };
                        var ret = fn.apply(this, arguments);
                        // The method only needs to be bound temporarily, so we remove it when we're done executing
                        this._super = __super;
                        return ret;
                    };
                })(name, prop[name]);
                // Check if we're overwriting existing default options.
            } else if (typeof prop[name] === 'object' && typeof base[name] === 'object' && name === 'defaultOptions') {
                var obj1 = base[name];
                var obj2 = prop[name];
                var obj3 = {};
                var key;
                for (key in obj1) { // jshint forin:false
                    obj3[key] = obj1[key];
                }
                for (key in obj2) { // jshint forin:false
                    obj3[key] = obj2[key];
                }
                prototype[name] = obj3;
            } else {
                prototype[name] = prop[name];
            }
        }

        // The dummy class constructor
        function JQClass() {
            // All construction is actually done in the init method
            if (!initializing && this._init) {
                this._init.apply(this, arguments);
            }
        }

        // Populate our constructed prototype object
        JQClass.prototype = prototype;

        // Enforce the constructor to be what we expect
        JQClass.prototype.constructor = JQClass;

        // And make this class extendable
        JQClass.extend = extender;

        return JQClass;
    };
})();
/*! Abstract base class for collection plugins v1.0.3.
	Written by Keith Wood (wood.keith{at}optusnet.com.au) December 2013.
	Licensed under the MIT license (http://keith-wood.name/licence.html). */
(function ($) { // Ensure $, encapsulate
    'use strict';

	/** <p>Abstract base class for collection plugins v1.0.3.</p>
		<p>Written by Keith Wood (wood.keith{at}optusnet.com.au) December 2013.</p>
		<p>Licensed under the MIT license (http://keith-wood.name/licence.html).</p>
		<p>Use {@link $.JQPlugin.createPlugin} to create new plugins using this framework.</p>
		<p>This base class provides common functionality such as:</p>
		<ul>
			<li>Creates jQuery bridge - allowing you to invoke your plugin on a collection of elements.</li>
			<li>Handles initialisation including reading settings from metadata -
				an instance object is attached to the affected element(s) containing all the necessary data.</li>
			<li>Handles option retrieval and update - options can be set through default values,
				through inline metadata, or through instantiation settings.<br>
				Metadata is specified as an attribute on the element:
				<code>data-&lt;pluginName>="&lt;option name>: '&lt;value>', ..."</code>.
				Dates should be specified as strings in this format: <code>'new Date(y, m-1, d)'</code>.</li>
			<li>Handles method calling - inner functions starting with '_'are inaccessible,
				whereas others can be called via <code>$(selector).pluginName('functionName')</code>.</li>
			<li>Handles plugin destruction - removing all trace of the plugin.</li>
		</ul>
		@module JQPlugin
		@abstract */
    JQClass.classes.JQPlugin = JQClass.extend({

		/** Name to identify this plugin.
			@example name: 'tabs' */
        name: 'plugin',

		/** Default options for instances of this plugin (default: {}).
			@example defaultOptions: {
  selectedClass: 'selected',
  triggers: 'click'
} */
        defaultOptions: {},

		/** Options dependent on the locale.
			Indexed by language and (optional) country code, with '' denoting the default language (English/US).
			Normally additional languages would be provided as separate files to all them to be included as needed.
			@example regionalOptions: {
  '': {
    greeting: 'Hi'
  }
} */
        regionalOptions: {},

		/** Whether or not a deep merge should be performed when accumulating options.
			The default is <code>true</code> but can be overridden in a sub-class. */
        deepMerge: true,

		/** Retrieve a marker class for affected elements.
			In the format: <code>is-&lt;pluginName&gt;</code>.
			@protected
			@return {string} The marker class. */
        _getMarker: function () {
            return 'is-' + this.name;
        },

		/** Initialise the plugin.
			Create the jQuery bridge - plugin name <code>xyz</code>
			produces singleton <code>$.xyz</code> and collection function <code>$.fn.xyz</code>.
			@protected */
        _init: function () {
            // Apply default localisations
            $.extend(this.defaultOptions, (this.regionalOptions && this.regionalOptions['']) || {});
            // Camel-case the name
            var jqName = camelCase(this.name);
            // Expose jQuery singleton manager
            $[jqName] = this;
            // Expose jQuery collection plugin
            $.fn[jqName] = function (options) {
                var otherArgs = Array.prototype.slice.call(arguments, 1);
                var inst = this;
                var returnValue = this;
                this.each(function () {
                    if (typeof options === 'string') {
                        if (options[0] === '_' || !$[jqName][options]) {
                            throw 'Unknown method: ' + options;
                        }
                        var methodValue = $[jqName][options].apply($[jqName], [this].concat(otherArgs));
                        if (methodValue !== inst && methodValue !== undefined) {
                            returnValue = methodValue;
                            return false;
                        }
                    } else {
                        $[jqName]._attach(this, options);
                    }
                });
                return returnValue;
            };
        },

		/** Set default options for all subsequent instances.
			@param {object} options The new default options.
			@example $.pluginName.setDefaults({name: value, ...}) */
        setDefaults: function (options) {
            $.extend(this.defaultOptions, options || {});
        },

		/** Initialise an element. Called internally only.
			Adds an instance object as data named for the plugin.
			Override {@linkcode module:JQPlugin~_postAttach|_postAttach} for plugin-specific processing.
			@private
			@param {Element} elem The element to enhance.
			@param {object} options Overriding settings. */
        _attach: function (elem, options) {
            elem = $(elem);
            if (elem.hasClass(this._getMarker())) {
                return;
            }
            elem.addClass(this._getMarker());
            options = $.extend(this.deepMerge, {}, this.defaultOptions, this._getMetadata(elem), options || {});
            var inst = $.extend({ name: this.name, elem: elem, options: options }, this._instSettings(elem, options));
            elem.data(this.name, inst); // Save instance against element
            this._postAttach(elem, inst);
            this.option(elem, options);
        },

		/** Retrieve additional instance settings.
			Override this in a sub-class to provide extra settings.
			These are added directly to the instance object.
			Default attributes of an instance object are shown as properties below:
			@protected
			@param {jQuery} elem The current jQuery element.
			@param {object} options The instance options.
			@return {object} Any extra instance values.
			@property {Element} elem The element to which this instance applies.
			@property {string} name The name of this plugin.
			@property {object} options The accumulated options for this instance.
			@example _instSettings: function(elem, options) {
  return {nav: elem.find(options.navSelector)};
} */
        _instSettings: function (elem, options) { // jshint unused:false
            return {};
        },

		/** Plugin specific post initialisation.
			Override this in a sub-class to perform extra activities.
			This is where you would implement your plugin's main functionality.
			@protected
			@param {jQuery} elem The current jQuery element.
			@param {object} inst The instance settings.
			@example _postAttach: function(elem, inst) {
  elem.on('click.' + this.name, function() {
    ...
  });
} */
        _postAttach: function (elem, inst) { // jshint unused:false
        },

		/** Retrieve metadata configuration from the element.
			Metadata is specified as an attribute:
			<code>data-&lt;pluginName>="&lt;option name>: '&lt;value>', ..."</code>.
			Dates should be specified as strings in this format: <code>'new Date(y, m-1, d)'</code>.
			@private
			@param {jQuery} elem The source element.
			@return {object} The inline configuration or {}. */
        _getMetadata: function (elem) {
            try {
                var data = elem.data(this.name.toLowerCase()) || '';
                data = data.replace(/(\\?)'/g, function (e, t) {
                    return t ? '\'' : '"';
                }).replace(/([a-zA-Z0-9]+):/g, function (match, group, i) {
                    var count = data.substring(0, i).match(/"/g); // Handle embedded ':'
                    return (!count || count.length % 2 === 0 ? '"' + group + '":' : group + ':');
                }).replace(/\\:/g, ':');
                data = $.parseJSON('{' + data + '}');
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        var value = data[key];
                        if (typeof value === 'string' && value.match(/^new Date\(([-0-9,\s]*)\)$/)) { // Convert dates
                            data[key] = eval(value); // jshint ignore:line
                        }
                    }
                }
                return data;
            }
            catch (e) {
                return {};
            }
        },

		/** Retrieve the instance data for element.
			@protected
			@param {Element} elem The source element.
			@return {object} The instance data or <code>{}</code> if none. */
        _getInst: function (elem) {
            return $(elem).data(this.name) || {};
        },

		/** Retrieve or reconfigure the settings for a plugin.
			If new settings are provided they are applied to the instance options.
			If an option name only is provided the value of that option is returned.
			If no name or value is provided, all options are returned.
			Override {@linkcode module:JQPlugin~_optionsChanged|_optionsChanged}
			for plugin-specific processing when option values change.
			@param {Element} elem The source element.
			@param {object|string} [name] The collection of new option values or the name of a single option.
			@param {any} [value] The value for a single named option.
			@return {any|object} If retrieving a single value or all options.
			@example $(selector).plugin('option', 'name', value) // Set one option
$(selector).plugin('option', {name: value, ...}) // Set multiple options
var value = $(selector).plugin('option', 'name') // Get one option
var options = $(selector).plugin('option') // Get all options */
        option: function (elem, name, value) {
            elem = $(elem);
            var inst = elem.data(this.name);
            var options = name || {};
            if (!name || (typeof name === 'string' && typeof value === 'undefined')) {
                options = (inst || {}).options;
                return (options && name ? options[name] : options);
            }
            if (!elem.hasClass(this._getMarker())) {
                return;
            }
            if (typeof name === 'string') {
                options = {};
                options[name] = value;
            }
            this._optionsChanged(elem, inst, options);
            $.extend(inst.options, options);
        },

		/** Plugin specific options processing.
			Old value available in <code>inst.options[name]</code>, new value in <code>options[name]</code>.
			Override this in a sub-class to perform extra activities.
			@protected
			@param {jQuery} elem The current jQuery element.
			@param {object} inst The instance settings.
			@param {object} options The new options.
			@example _optionsChanged: function(elem, inst, options) {
  if (options.name != inst.options.name) {
    elem.removeClass(inst.options.name).addClass(options.name);
  }
} */
        _optionsChanged: function (elem, inst, options) { // jshint unused:false
        },

		/** Remove all trace of the plugin.
			Override {@linkcode module:JQPlugin~_preDestroy|_preDestroy} for plugin-specific processing.
			@param {Element} elem The source element.
			@example $(selector).plugin('destroy') */
        destroy: function (elem) {
            elem = $(elem);
            if (!elem.hasClass(this._getMarker())) {
                return;
            }
            // HTML template'i sildiği için kaldırıldı. Erhan
            //this._preDestroy(elem, this._getInst(elem));
            elem.removeData(this.name).removeClass(this._getMarker());
        },

		/** Plugin specific pre destruction.
			It is invoked as part of the {@linkcode module:JQPlugin~destroy|destroy} processing.
			Override this in a sub-class to perform extra activities and undo everything that was
			done in the {@linkcode module:JQPlugin~_postAttach|_postAttach} or
			{@linkcode module:JQPlugin~_optionsChanged|_optionsChanged} functions.
			@protected
			@param {jQuery} elem The current jQuery element.
			@param {object} inst The instance settings.
			@example _preDestroy: function(elem, inst) {
  elem.off('.' + this.name);
} */
        _preDestroy: function (elem, inst) { // jshint unused:false
        }
    });

	/** Convert names from hyphenated to camel-case.
		@private
		@param {string} value The original hyphenated name.
		@return {string} The camel-case version. */
    function camelCase(name) {
        return name.replace(/-([a-z])/g, function (match, group) {
            return group.toUpperCase();
        });
    }

	/** Expose the plugin base.
		@namespace $.JQPlugin */
    $.JQPlugin = {

		/** Create a new collection plugin.
			@memberof $.JQPlugin
			@param {string} [superClass='JQPlugin'] The name of the parent class to inherit from.
			@param {object} overrides The property/function overrides for the new class.
				See {@link module:JQPlugin|JQPlugin} for the base functionality.
			@example $.JQPlugin.createPlugin({ // Define the plugin
  name: 'tabs',
  defaultOptions: {selectedClass: 'selected'},
  _initSettings: function(elem, options) { return {...}; },
  _postAttach: function(elem, inst) { ... }
});
$('selector').tabs(); // And instantiate it */
        createPlugin: function (superClass, overrides) {
            if (typeof superClass === 'object') {
                overrides = superClass;
                superClass = 'JQPlugin';
            }
            superClass = camelCase(superClass);
            var className = camelCase(overrides.name);
            JQClass.classes[className] = JQClass.classes[superClass].extend(overrides);
            new JQClass.classes[className](); // jshint ignore:line
        }
    };

})(jQuery);

/*! http://keith-wood.name/countdown.html
	Countdown for jQuery v2.1.0.
	Written by Keith Wood (wood.keith{at}optusnet.com.au) January 2008.
	Available under the MIT (http://keith-wood.name/licence.html) license. 
	Please attribute the author if you use it. */

(function ($) { // Hide scope, no $ conflict
    'use strict';

    var pluginName = 'countdown';

    var Y = 0; // Years
    var O = 1; // Months
    var W = 2; // Weeks
    var D = 3; // Days
    var H = 4; // Hours
    var M = 5; // Minutes
    var S = 6; // Seconds

	/** Create the countdown plugin.
		<p>Sets an element to show the time remaining until a given instant.</p>
		<p>Expects HTML like:</p>
		<pre>&lt;div>&lt;/div></pre>
		<p>Provide inline configuration like:</p>
		<pre>&lt;div data-countdown="name: 'value', ...">&lt;/div></pre>
		@module Countdown
		@augments JQPlugin
		@example $(selector).countdown({until: +300}) */
    $.JQPlugin.createPlugin({

		/** The name of the plugin.
			@default 'countdown' */
        name: pluginName,

		/** Countdown expiry callback.
			Used with the {@linkcode module:Countdown~defaultOptions|onExpiry} option and
			triggered when the countdown expires.
			@global
			@callback CountdownExpiryCallback
			@this <code>Element</code>
			@example onExpiry: function() {
  alert('Done');
} */

		/** Countdown server synchronisation callback.
			Used with the {@linkcode module:Countdown~defaultOptions|serverSync} option and
			triggered when the countdown is initialised.
			@global
			@callback CountdownServerSyncCallback
			@return {Date} The current date/time on the server as expressed in the local timezone.
			@this <code>$.countdown</code>
			@example serverSync: function() {
  var time = null;
  $.ajax({url: 'http://myserver.com/serverTime.php',
    async: false, dataType: 'text',
    success: function(text) {
      time = new Date(text);
    }, error: function(http, message, exc) {
      time = new Date();
  });
  return time;
} */

		/** Countdown tick callback.
			Used with the {@linkcode module:Countdown~defaultOptions|onTick} option and
			triggered on every {@linkcode module:Countdown~defaultOptions|tickInterval} ticks of the countdown.
			@global
			@callback CountdownTickCallback
			@this <code>Element</code>
			@param {number[]} periods The breakdown by period (years, months, weeks, days,
					hours, minutes, seconds) of the time remaining/passed.
			@example onTick: function(periods) {
  $('#altTime').text(periods[4] + ':' + twoDigits(periods[5]) +
    ':' + twoDigits(periods[6]));
} */

		/** Countdown which labels callback.
			Used with the {@linkcode module:Countdown~regionalOptions|whichLabels} option and
			triggered when the countdown is being display to determine which set of labels
			(<code>labels</code>, <code>labels1</code>, ...) are to be used for the current period value.
			@global
			@callback CountdownWhichLabelsCallback
			@param {number} num The current period value.
			@return {number} The suffix for the label set to use, or zero for the default labels.
			@example whichLabels: function(num) {
  return (num === 1 ? 1 : (num >= 2 && num <= 4 ? 2 : 0));
} */

		/** Default settings for the plugin.
			@property {Date|number|string} [until] The date/time to count down to, or number of seconds
						offset from now, or string of amounts and units for offset(s) from now:
						'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds.
						One of <code>until</code> or <code>since</code> must be specified.
						If both are given <code>since</code> takes precedence.
			@example until: new Date(2013, 12-1, 25, 13, 30)
until: +300
until: '+1O -2D'
			@property {Date|number|string} [since] The date/time to count up from, or number of seconds
						offset from now, or string of amounts and units for offset(s) from now:
						'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds.
						One of <code>until</code> or <code>since</code> must be specified.
						If both are given <code>since</code> takes precedence.
			@example since: new Date(2013, 1-1, 1)
since: -300
since: '-1O +2D'
			@property {number} [timezone=null] The timezone (hours or minutes from GMT) for the target times,
						or <code>null</code> for client local timezone.
			@example timezone: +10
timezone: -60
			@property {CountdownServerSyncCallback} [serverSync=null] A function to retrieve the current server time
						for synchronisation.
			@property {string} [format='dHMS'] The format for display - upper case to always show,
						lower case to show only if non-zero,
						'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds.
			@property {string} [layout=''] <p>Build your own layout for the countdown.</p>
						<p>Indicate substitution points with '{desc}' for the description, '{sep}' for the time separator,
						'{pv}' where p is 'y' for years, 'o' for months, 'w' for weeks, 'd' for days,
						'h' for hours, 'm' for minutes, or 's' for seconds and v is 'n' for the period value,
						'nn' for the period value with a minimum of two digits,
						'nnn' for the period value with a minimum of three digits, or
						'l' for the period label (long or short form depending on the compact setting), or
						'{pd}' where p is as above and d is '1' for the units digit, '10' for the tens digit,
						'100' for the hundreds digit, or '1000' for the thousands digit.</p>
						<p>If you need to exclude entire sections when the period value is zero and
						you have specified the period as optional, surround these sections with
						'{p<}' and '{p>}', where p is the same as above.</p>
						<p>Your layout can just be simple text, or can contain HTML markup as well.</p>
			@example layout: '{d<}{dn} {dl}{d>} {hnn}:{mnn}:{snn}'
			@property {boolean} [compact=false] <code>true</code> to display in a compact format,
						<code>false</code> for an expanded one.
			@property {boolean} [padZeroes=false] <code>true</code> to add leading zeroes.
			@property {number} [significant=0] The maximum number of periods with non-zero values to show, zero for all.
			@property {string} [description=''] The description displayed for the countdown.
			@property {string} [expiryUrl=''] A URL to load upon expiry, replacing the current page.
			@property {string} [expiryText=''] Text to display upon expiry, replacing the countdown. This may be HTML.
			@property {boolean} [alwaysExpire=false] <code>true</code> to trigger <code>onExpiry</code>
						even if the target time has passed.
			@property {CountdownExpiryCallback} [onExpiry=null] Callback when the countdown expires -
						receives no parameters and <code>this</code> is the containing element.
			@example onExpiry: function() {
  ...
}
			@property {CountdownTickCallback} [onTick=null] Callback when the countdown is updated -
						receives <code>number[7]</code> being the breakdown by period
						(years, months, weeks, days, hours, minutes, seconds - based on
						<code>format</code>) and <code>this</code> is the containing element.
			@example onTick: function(periods) {
  var secs = $.countdown.periodsToSeconds(periods);
  if (secs < 300) { // Last five minutes
    ...
  }
}
			@property {number} [tickInterval=1] The interval (seconds) between <code>onTick</code> callbacks. */
        defaultOptions: {
            until: null,
            since: null,
            timezone: null,
            serverSync: null,
            format: 'dHMS',
            layout: '',
            compact: false,
            padZeroes: false,
            significant: 0,
            description: '',
            expiryUrl: '',
            expiryText: '',
            alwaysExpire: false,
            onExpiry: null,
            onTick: null,
            tickInterval: 1
        },

		/** Localisations for the plugin.
			Entries are objects indexed by the language code ('' being the default US/English).
			Each object has the following attributes.
			@property {string[]} [labels=['Years','Months','Weeks','Days','Hours','Minutes','Seconds']]
						The display texts for the counter periods.
			@property {string[]} [labels1=['Year','Month','Week','Day','Hour','Minute','Second']]
						The display texts for the counter periods if they have a value of 1.
						Add other <code>labels<em>n</em></code> attributes as necessary to
						cater for other numeric idiosyncrasies of the localisation.
			@property {string[]}[compactLabels=['y','m','w','d']] The compact texts for the counter periods.
			@property {CountdownWhichLabelsCallback} [whichLabels=null] A function to determine which
						<code>labels<em>n</em></code> to use.
			@example whichLabels: function(num) {
  return (num > 1 ? 0 : 1);
}
			@property {string[]} [digits=['0','1',...,'9']] The digits to display (0-9).
			@property {string} [timeSeparator=':'] Separator for time periods in the compact layout.
			@property {boolean} [isRTL=false] <code>true</code> for right-to-left languages,
						<code>false</code> for left-to-right. */
        regionalOptions: { // Available regional settings, indexed by language/country code
            '': { // Default regional settings - English/US
                labels: ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds'],
                labels1: ['Year', 'Month', 'Week', 'Day', 'Hour', 'Minute', 'Second'],
                compactLabels: ['y', 'm', 'w', 'd'],
                whichLabels: null,
                digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                timeSeparator: ':',
                isRTL: false
            }
        },

        /* Class name for the right-to-left marker. */
        _rtlClass: pluginName + '-rtl',
        /* Class name for the countdown section marker. */
        _sectionClass: pluginName + '-section',
        /* Class name for the period amount marker. */
        _amountClass: pluginName + '-amount',
        /* Class name for the period name marker. */
        _periodClass: pluginName + '-period',
        /* Class name for the countdown row marker. */
        _rowClass: pluginName + '-row',
        /* Class name for the holding countdown marker. */
        _holdingClass: pluginName + '-holding',
        /* Class name for the showing countdown marker. */
        _showClass: pluginName + '-show',
        /* Class name for the description marker. */
        _descrClass: pluginName + '-descr',

        /* List of currently active countdown elements. */
        _timerElems: [],

		/** Additional setup for the countdown.
			Apply default localisations.
			Create the timer.
			@private */
        _init: function () {
            var self = this;
            this._super();
            this._serverSyncs = [];
            var now = (typeof Date.now === 'function' ? Date.now : function () { return new Date().getTime(); });
            var perfAvail = (window.performance && typeof window.performance.now === 'function');
            // Shared timer for all countdowns
            function timerCallBack(timestamp) {
                var drawStart = (timestamp < 1e12 ? // New HTML5 high resolution timer
                    (perfAvail ? (window.performance.now() + window.performance.timing.navigationStart) : now()) :
                    // Integer milliseconds since unix epoch
                    timestamp || now());
                if (drawStart - animationStartTime >= 1000) {
                    self._updateElems();
                    animationStartTime = drawStart;
                }
                requestAnimationFrame(timerCallBack);
            }
            var requestAnimationFrame = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame || window.msRequestAnimationFrame || null;
            // This is when we expect a fall-back to setInterval as it's much more fluid
            var animationStartTime = 0;
            if (!requestAnimationFrame || $.noRequestAnimationFrame) {
                $.noRequestAnimationFrame = null;
                // Fall back to good old setInterval
                $.countdown._timer = setInterval(function () { self._updateElems(); }, 1000);
            }
            else {
                animationStartTime = window.animationStartTime ||
                    window.webkitAnimationStartTime || window.mozAnimationStartTime ||
                    window.oAnimationStartTime || window.msAnimationStartTime || now();
                requestAnimationFrame(timerCallBack);
            }
        },

		/** Convert a date/time to UTC.
			@param {number} tz The hour or minute offset from GMT, e.g. +9, -360.
			@param {Date|number} year the date/time in that timezone or the year in that timezone.
			@param {number} [month] The month (0 - 11) (omit if <code>year</code> is a <code>Date</code>).
			@param {number} [day] The day (omit if <code>year</code> is a <code>Date</code>).
			@param {number} [hours] The hour (omit if <code>year</code> is a <code>Date</code>).
			@param {number} [mins] The minute (omit if <code>year</code> is a <code>Date</code>).
			@param {number} [secs] The second (omit if <code>year</code> is a <code>Date</code>).
			@param {number} [ms] The millisecond (omit if <code>year</code> is a <code>Date</code>).
			@return {Date} The equivalent UTC date/time.
			@example $.countdown.UTCDate(+10, 2013, 12-1, 25, 12, 0)
$.countdown.UTCDate(-7, new Date(2013, 12-1, 25, 12, 0)) */
        UTCDate: function (tz, year, month, day, hours, mins, secs, ms) {
            if (typeof year === 'object' && year instanceof Date) {
                ms = year.getMilliseconds();
                secs = year.getSeconds();
                mins = year.getMinutes();
                hours = year.getHours();
                day = year.getDate();
                month = year.getMonth();
                year = year.getFullYear();
            }
            var d = new Date();
            d.setUTCFullYear(year);
            d.setUTCDate(1);
            d.setUTCMonth(month || 0);
            d.setUTCDate(day || 1);
            d.setUTCHours(hours || 0);
            d.setUTCMinutes((mins || 0) - (Math.abs(tz) < 30 ? tz * 60 : tz));
            d.setUTCSeconds(secs || 0);
            d.setUTCMilliseconds(ms || 0);
            return d;
        },

		/** Convert a set of periods into seconds.
			Averaged for months and years.
			@param {number[]} periods The periods per year/month/week/day/hour/minute/second.
			@return {number} The corresponding number of seconds.
			@example var secs = $.countdown.periodsToSeconds(periods) */
        periodsToSeconds: function (periods) {
            return periods[0] * 31557600 + periods[1] * 2629800 + periods[2] * 604800 +
                periods[3] * 86400 + periods[4] * 3600 + periods[5] * 60 + periods[6];
        },

		/** Resynchronise the countdowns with the server.
			@example $.countdown.resync() */
        resync: function () {
            var self = this;
            $('.' + this._getMarker()).each(function () { // Each countdown
                var inst = $.data(this, self.name);
                if (inst.options.serverSync) { // If synced
                    var serverSync = null;
                    for (var i = 0; i < self._serverSyncs.length; i++) {
                        if (self._serverSyncs[i][0] === inst.options.serverSync) { // Find sync details
                            serverSync = self._serverSyncs[i];
                            break;
                        }
                    }
                    if (self._eqNull(serverSync[2])) { // Recalculate if missing
                        var serverResult = ($.isFunction(inst.options.serverSync) ?
                            inst.options.serverSync.apply(this, []) : null);
                        serverSync[2] =
                            (serverResult ? new Date().getTime() - serverResult.getTime() : 0) - serverSync[1];
                    }
                    if (inst._since) { // Apply difference
                        inst._since.setMilliseconds(inst._since.getMilliseconds() + serverSync[2]);
                    }
                    inst._until.setMilliseconds(inst._until.getMilliseconds() + serverSync[2]);
                }
            });
            for (var i = 0; i < self._serverSyncs.length; i++) { // Update sync details
                if (!self._eqNull(self._serverSyncs[i][2])) {
                    self._serverSyncs[i][1] += self._serverSyncs[i][2];
                    delete self._serverSyncs[i][2];
                }
            }
        },

        _instSettings: function (elem, options) { // jshint unused:false
            return { _periods: [0, 0, 0, 0, 0, 0, 0] };
        },

		/** Add an element to the list of active ones.
			@private
			@param {Element} elem The countdown element. */
        _addElem: function (elem) {
            if (!this._hasElem(elem)) {
                this._timerElems.push(elem);
            }
        },

		/** See if an element is in the list of active ones.
			@private
			@param {Element} elem The countdown element.
			@return {boolean} <code>true</code> if present, <code>false</code> if not. */
        _hasElem: function (elem) {
            return ($.inArray(elem, this._timerElems) > -1);
        },

		/** Remove an element from the list of active ones.
			@private
			@param {Element} elem The countdown element. */
        _removeElem: function (elem) {
            this._timerElems = $.map(this._timerElems,
                function (value) { return (value === elem ? null : value); }); // delete entry
        },

		/** Update each active timer element.
			@private */
        _updateElems: function () {
            for (var i = this._timerElems.length - 1; i >= 0; i--) {
                this._updateCountdown(this._timerElems[i]);
            }
        },

        _optionsChanged: function (elem, inst, options) {
            if (options.layout) {
                options.layout = options.layout.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            }
            this._resetExtraLabels(inst.options, options);
            var timezoneChanged = (inst.options.timezone !== options.timezone);
            $.extend(inst.options, options);
            this._adjustSettings(elem, inst,
                !this._eqNull(options.until) || !this._eqNull(options.since) || timezoneChanged);
            var now = new Date();
            if ((inst._since && inst._since < now) || (inst._until && inst._until > now)) {
                this._addElem(elem[0]);
            }
            this._updateCountdown(elem, inst);
        },

		/** Redisplay the countdown with an updated display.
			@private
			@param {Element|jQuery} elem The containing element.
			@param {object} inst The current settings for this instance. */
        _updateCountdown: function (elem, inst) {
            elem = elem.jquery ? elem : $(elem);
            inst = inst || this._getInst(elem);
            if (!inst) {
                return;
            }
            var _fullHtml = this._generateHTML(inst);
            if (_fullHtml) {
                elem.html(_fullHtml).toggleClass(this._rtlClass, inst.options.isRTL);
            }
            else {

            }

            if (inst._hold !== 'pause' && $.isFunction(inst.options.onTick)) {
                var periods = inst._hold !== 'lap' ? inst._periods :
                    this._calculatePeriods(inst, inst._show, inst.options.significant, new Date());
                if (inst.options.tickInterval === 1 ||
                    this.periodsToSeconds(periods) % inst.options.tickInterval === 0) {
                    inst.options.onTick.apply(elem[0], [periods]);
                }
            }
            var expired = inst._hold !== 'pause' &&
                (inst._since ? inst._now.getTime() < inst._since.getTime() :
                    inst._now.getTime() >= inst._until.getTime());
            if (expired && !inst._expiring) {
                inst._expiring = true;
                if (this._hasElem(elem[0]) || inst.options.alwaysExpire) {
                    this._removeElem(elem[0]);
                    if ($.isFunction(inst.options.onExpiry)) {
                        inst.options.onExpiry.apply(elem[0], []);
                    }
                    if (inst.options.expiryText) {
                        var layout = inst.options.layout;
                        inst.options.layout = inst.options.expiryText;
                        this._updateCountdown(elem[0], inst);
                        inst.options.layout = layout;
                    }
                    if (inst.options.expiryUrl) {
                        window.location = inst.options.expiryUrl;
                    }
                }
                inst._expiring = false;
            }
            else if (inst._hold === 'pause') {
                this._removeElem(elem[0]);
            }
        },

		/** Reset any extra labelsn and compactLabelsn entries if changing labels.
			@private
			@param {object} base The options to be updated.
			@param {object} options The new option values. */
        _resetExtraLabels: function (base, options) {
            var n = null;
            for (n in options) {
                if (n.match(/[Ll]abels[02-9]|compactLabels1/)) {
                    base[n] = options[n];
                }
            }
            for (n in base) { // Remove custom numbered labels
                if (n.match(/[Ll]abels[02-9]|compactLabels1/) && typeof options[n] === 'undefined') {
                    base[n] = null;
                }
            }
        },

		/** Determine whether or not a value is equivalent to <code>null</code>.
			@private
			@param {object} value The value to test.
			@return {boolean} <code>true</code> if equivalent to <code>null</code>, <code>false</code> if not. */
        _eqNull: function (value) {
            return typeof value === 'undefined' || value === null;
        },


		/** Calculate internal settings for an instance.
			@private
			@param {jQuery} elem The containing element.
			@param {object} inst The current settings for this instance.
			@param {boolean} recalc <code>true</code> if until or since are set. */
        _adjustSettings: function (elem, inst, recalc) {
            var serverEntry = null;
            for (var i = 0; i < this._serverSyncs.length; i++) {
                if (this._serverSyncs[i][0] === inst.options.serverSync) {
                    serverEntry = this._serverSyncs[i][1];
                    break;
                }
            }
            var now = null;
            var serverOffset = null;
            if (!this._eqNull(serverEntry)) {
                now = new Date();
                serverOffset = (inst.options.serverSync ? serverEntry : 0);
            }
            else {
                var serverResult = ($.isFunction(inst.options.serverSync) ?
                    inst.options.serverSync.apply(elem[0], []) : null);
                now = new Date();
                serverOffset = (serverResult ? now.getTime() - serverResult.getTime() : 0);
                this._serverSyncs.push([inst.options.serverSync, serverOffset]);
            }
            var timezone = inst.options.timezone;
            timezone = (this._eqNull(timezone) ? -now.getTimezoneOffset() : timezone);
            if (recalc || (!recalc && this._eqNull(inst._until) && this._eqNull(inst._since))) {
                inst._since = inst.options.since;
                if (!this._eqNull(inst._since)) {
                    inst._since = this.UTCDate(timezone, this._determineTime(inst._since, null));
                    if (inst._since && serverOffset) {
                        inst._since.setMilliseconds(inst._since.getMilliseconds() + serverOffset);
                    }
                }
                inst._until = this.UTCDate(timezone, this._determineTime(inst.options.until, now));
                if (serverOffset) {
                    inst._until.setMilliseconds(inst._until.getMilliseconds() + serverOffset);
                }
            }
            inst._show = this._determineShow(inst);
        },

		/** Remove the countdown widget from an element.
			@private
			@param {jQuery} elem The containing element.
			@param {object} inst The current instance object. */
        _preDestroy: function (elem, inst) { // jshint unused:false
            this._removeElem(elem[0]);
            elem.empty();
        },

		/** Pause a countdown widget at the current time.
			Stop it running but remember and display the current time.
			@param {Element} elem The containing element.
			@example $(selector).countdown('pause') */
        pause: function (elem) {
            this._hold(elem, 'pause');
        },

		/** Pause a countdown widget at the current time.
			Stop the display but keep the countdown running.
			@param {Element} elem The containing element.
			@example $(selector).countdown('lap') */
        lap: function (elem) {
            this._hold(elem, 'lap');
        },

		/** Resume a paused countdown widget.
			@param {Element} elem The containing element.
			@example $(selector).countdown('resume') */
        resume: function (elem) {
            this._hold(elem, null);
        },

		/** Toggle a paused countdown widget.
			@param {Element} elem The containing element.
			@example $(selector).countdown('toggle') */
        toggle: function (elem) {
            var inst = $.data(elem, this.name) || {};
            this[!inst._hold ? 'pause' : 'resume'](elem);
        },

		/** Toggle a lapped countdown widget.
			@param {Element} elem The containing element.
			@example $(selector).countdown('toggleLap') */
        toggleLap: function (elem) {
            var inst = $.data(elem, this.name) || {};
            this[!inst._hold ? 'lap' : 'resume'](elem);
        },

		/** Pause or resume a countdown widget.
			@private
			@param {Element} elem The containing element.
			@param {string} hold The new hold setting. */
        _hold: function (elem, hold) {
            var inst = $.data(elem, this.name);
            if (inst) {
                if (inst._hold === 'pause' && !hold) {
                    inst._periods = inst._savePeriods;
                    var sign = (inst._since ? '-' : '+');
                    inst[inst._since ? '_since' : '_until'] =
                        this._determineTime(sign + inst._periods[0] + 'y' +
                            sign + inst._periods[1] + 'o' + sign + inst._periods[2] + 'w' +
                            sign + inst._periods[3] + 'd' + sign + inst._periods[4] + 'h' +
                            sign + inst._periods[5] + 'm' + sign + inst._periods[6] + 's');
                    this._addElem(elem);
                }
                inst._hold = hold;
                inst._savePeriods = (hold === 'pause' ? inst._periods : null);
                $.data(elem, this.name, inst);
                this._updateCountdown(elem, inst);
            }
        },

		/** Return the current time periods, broken down by years, months, weeks, days, hours, minutes, and seconds.
			@param {Element} elem The containing element.
			@return {number[]} The current periods for the countdown.
			@example var periods = $(selector).countdown('getTimes') */
        getTimes: function (elem) {
            var inst = $.data(elem, this.name);
            return (!inst ? null : (inst._hold === 'pause' ? inst._savePeriods : (!inst._hold ? inst._periods :
                this._calculatePeriods(inst, inst._show, inst.options.significant, new Date()))));
        },

		/** A time may be specified as an exact value or a relative one.
			@private
			@param {string|number|Date} setting The date/time value as a relative or absolute value.
			@param {Date} defaultTime The date/time to use if no other is supplied.
			@return {Date} The corresponding date/time. */
        _determineTime: function (setting, defaultTime) {
            var self = this;
            var offsetNumeric = function (offset) { // e.g. +300, -2
                var time = new Date();
                time.setTime(time.getTime() + offset * 1000);
                return time;
            };
            var offsetString = function (offset) { // e.g. '+2d', '-4w', '+3h +30m'
                offset = offset.toLowerCase();
                var time = new Date();
                var year = time.getFullYear();
                var month = time.getMonth();
                var day = time.getDate();
                var hour = time.getHours();
                var minute = time.getMinutes();
                var second = time.getSeconds();
                var pattern = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g;
                var matches = pattern.exec(offset);
                while (matches) {
                    switch (matches[2] || 's') {
                        case 's':
                            second += parseInt(matches[1], 10);
                            break;
                        case 'm':
                            minute += parseInt(matches[1], 10);
                            break;
                        case 'h':
                            hour += parseInt(matches[1], 10);
                            break;
                        case 'd':
                            day += parseInt(matches[1], 10);
                            break;
                        case 'w':
                            day += parseInt(matches[1], 10) * 7;
                            break;
                        case 'o':
                            month += parseInt(matches[1], 10);
                            day = Math.min(day, self._getDaysInMonth(year, month));
                            break;
                        case 'y':
                            year += parseInt(matches[1], 10);
                            day = Math.min(day, self._getDaysInMonth(year, month));
                            break;
                    }
                    matches = pattern.exec(offset);
                }
                return new Date(year, month, day, hour, minute, second, 0);
            };
            var time = (this._eqNull(setting) ? defaultTime :
                (typeof setting === 'string' ? offsetString(setting) :
                    (typeof setting === 'number' ? offsetNumeric(setting) : setting)));
            if (time) {
                time.setMilliseconds(0);
            }
            return time;
        },

		/** Determine the number of days in a month.
			@private
			@param {number} year The year.
			@param {number} month The month.
			@return {number} The days in that month. */
        _getDaysInMonth: function (year, month) {
            return 32 - new Date(year, month, 32).getDate();
        },

		/** Default implementation to determine which set of labels should be used for an amount.
			Use the <code>labels</code> attribute with the same numeric suffix (if it exists).
			@private
			@param {number} num The amount to be displayed.
			@return {number} The set of labels to be used for this amount. */
        _normalLabels: function (num) {
            return num;
        },

		/** Generate the HTML to display the countdown widget.
			@private
			@param {object} inst The current settings for this instance.
			@return {string} The new HTML for the countdown display. */
        _generateHTML: function (inst) {
            var self = this;
            // Determine what to show
            inst._periods = (inst._hold ? inst._periods :
                this._calculatePeriods(inst, inst._show, inst.options.significant, new Date()));
            // Show all 'asNeeded' after first non-zero value
            var shownNonZero = false;
            var showCount = 0;
            var sigCount = inst.options.significant;
            var show = $.extend({}, inst._show);
            var period = null;
            for (period = Y; period <= S; period++) {
                shownNonZero = shownNonZero || (inst._show[period] === '?' && inst._periods[period] > 0);
                show[period] = (inst._show[period] === '?' && !shownNonZero ? null : inst._show[period]);
                showCount += (show[period] ? 1 : 0);
                sigCount -= (inst._periods[period] > 0 ? 1 : 0);
            }
            var showSignificant = [false, false, false, false, false, false, false];
            for (period = S; period >= Y; period--) { // Determine significant periods
                if (inst._show[period]) {
                    if (inst._periods[period]) {
                        showSignificant[period] = true;
                    }
                    else {
                        showSignificant[period] = sigCount > 0;
                        sigCount--;
                    }
                }
            }
            var labels = (inst.options.compact ? inst.options.compactLabels : inst.options.labels);
            var whichLabels = inst.options.whichLabels || this._normalLabels;
            var showCompact = function (period) {
                var labelsNum = inst.options['compactLabels' + whichLabels(inst._periods[period])];
                return (show[period] ? self._translateDigits(inst, inst._periods[period]) +
                    (labelsNum ? labelsNum[period] : labels[period]) + ' ' : '');
            };
            var minDigits = (inst.options.padZeroes ? 2 : 1);
            var showFull = function (period) {
                var labelsNum = inst.options['labels' + whichLabels(inst._periods[period])];
                return ((!inst.options.significant && show[period]) ||
                    (inst.options.significant && showSignificant[period]) ?
                    '<span class="' + self._sectionClass + '">' +
                    '<span class="' + self._amountClass + '">' +
                    self._minDigits(inst, inst._periods[period], minDigits) + '</span>' +
                    '<span class="' + self._periodClass + '">' +
                    (labelsNum ? labelsNum[period] : labels[period]) + '</span></span>' : '');
            };
            return (inst.options.layout ? this._buildLayout(inst, show, inst.options.layout,
                inst.options.compact, inst.options.significant, showSignificant) : "");

            /*
                ((inst.options.compact ? // Compact version
                    '<span class="' + this._rowClass + ' ' + this._amountClass +
                    (inst._hold ? ' ' + this._holdingClass : '') + '">' +
                    showCompact(Y) + showCompact(O) + showCompact(W) + showCompact(D) +
                    (show[H] ? this._minDigits(inst, inst._periods[H], 2) : '') +
                    (show[M] ? (show[H] ? inst.options.timeSeparator : '') +
                        this._minDigits(inst, inst._periods[M], 2) : '') +
                    (show[S] ? (show[H] || show[M] ? inst.options.timeSeparator : '') +
                        this._minDigits(inst, inst._periods[S], 2) : '') :
                    // Full version
                    '<span class="' + this._rowClass + ' ' + this._showClass + (inst.options.significant || showCount) +
                    (inst._hold ? ' ' + this._holdingClass : '') + '">' +
                    showFull(Y) + showFull(O) + showFull(W) + showFull(D) +
                    showFull(H) + showFull(M) + showFull(S)) + '</span>' +
                    (inst.options.description ? '<span class="' + this._rowClass + ' ' + this._descrClass + '">' +
                        inst.options.description + '</span>' : '')));*/
        },

		/** Construct a custom layout.
			@private
			@param {object} inst The current settings for this instance.
			@param {boolean[]} show Flags indicating which periods are requested.
			@param {string} layout The customised layout.
			@param {boolean} compact <code>true</code> if using compact labels.
			@param {number} significant The number of periods with values to show, zero for all.
			@param {boolean[]} showSignificant Other periods to show for significance.
			@return {string} The custom HTML. */
        _buildLayout: function (inst, show, layout, compact, significant, showSignificant) {
            var labels = inst.options[compact ? 'compactLabels' : 'labels'];
            var whichLabels = inst.options.whichLabels || this._normalLabels;
            var labelFor = function (index) {
                return (inst.options[(compact ? 'compactLabels' : 'labels') +
                    whichLabels(inst._periods[index])] || labels)[index];
            };
            var digit = function (value, position) {
                return inst.options.digits[Math.floor(value / position) % 10];
            };
            var subs = {
                desc: inst.options.description, sep: inst.options.timeSeparator,
                yl: labelFor(Y), yn: this._minDigits(inst, inst._periods[Y], 1),
                ynn: this._minDigits(inst, inst._periods[Y], 2),
                ynnn: this._minDigits(inst, inst._periods[Y], 3), y1: digit(inst._periods[Y], 1),
                y10: digit(inst._periods[Y], 10), y100: digit(inst._periods[Y], 100),
                y1000: digit(inst._periods[Y], 1000),
                ol: labelFor(O), on: this._minDigits(inst, inst._periods[O], 1),
                onn: this._minDigits(inst, inst._periods[O], 2),
                onnn: this._minDigits(inst, inst._periods[O], 3), o1: digit(inst._periods[O], 1),
                o10: digit(inst._periods[O], 10), o100: digit(inst._periods[O], 100),
                o1000: digit(inst._periods[O], 1000),
                wl: labelFor(W), wn: this._minDigits(inst, inst._periods[W], 1),
                wnn: this._minDigits(inst, inst._periods[W], 2),
                wnnn: this._minDigits(inst, inst._periods[W], 3), w1: digit(inst._periods[W], 1),
                w10: digit(inst._periods[W], 10), w100: digit(inst._periods[W], 100),
                w1000: digit(inst._periods[W], 1000),
                dl: labelFor(D), dn: this._minDigits(inst, inst._periods[D], 1),
                dnn: this._minDigits(inst, inst._periods[D], 2),
                dnnn: this._minDigits(inst, inst._periods[D], 3), d1: digit(inst._periods[D], 1),
                d10: digit(inst._periods[D], 10), d100: digit(inst._periods[D], 100),
                d1000: digit(inst._periods[D], 1000),
                hl: labelFor(H), hn: this._minDigits(inst, inst._periods[H], 1),
                hnn: this._minDigits(inst, inst._periods[H], 2),
                hnnn: this._minDigits(inst, inst._periods[H], 3), h1: digit(inst._periods[H], 1),
                h10: digit(inst._periods[H], 10), h100: digit(inst._periods[H], 100),
                h1000: digit(inst._periods[H], 1000),
                ml: labelFor(M), mn: this._minDigits(inst, inst._periods[M], 1),
                mnn: this._minDigits(inst, inst._periods[M], 2),
                mnnn: this._minDigits(inst, inst._periods[M], 3), m1: digit(inst._periods[M], 1),
                m10: digit(inst._periods[M], 10), m100: digit(inst._periods[M], 100),
                m1000: digit(inst._periods[M], 1000),
                sl: labelFor(S), sn: this._minDigits(inst, inst._periods[S], 1),
                snn: this._minDigits(inst, inst._periods[S], 2),
                snnn: this._minDigits(inst, inst._periods[S], 3), s1: digit(inst._periods[S], 1),
                s10: digit(inst._periods[S], 10), s100: digit(inst._periods[S], 100),
                s1000: digit(inst._periods[S], 1000)
            };
            var html = layout;
            // Replace period containers: {p<}...{p>}
            for (var i = Y; i <= S; i++) {
                var period = 'yowdhms'.charAt(i);
                var re = new RegExp('\\{' + period + '<\\}([\\s\\S]*)\\{' + period + '>\\}', 'g');
                html = html.replace(re, ((!significant && show[i]) ||
                    (significant && showSignificant[i]) ? '$1' : ''));
            }
            // Replace period values: {pn}
            $.each(subs, function (n, v) {
                var re = new RegExp('\\{' + n + '\\}', 'g');
                html = html.replace(re, v);
            });
            return html;
        },

		/** Ensure a numeric value has at least n digits for display.
			@private
			@param {object} inst The current settings for this instance.
			@param {number} value The value to display.
			@param {number} len The minimum length.
			@return {string} The display text. */
        _minDigits: function (inst, value, len) {
            value = '' + value;
            if (value.length >= len) {
                return this._translateDigits(inst, value);
            }
            value = '0000000000' + value;
            return this._translateDigits(inst, value.substr(value.length - len));
        },

		/** Translate digits into other representations.
			@private
			@param {object} inst The current settings for this instance.
			@param {string} value The text to translate.
			@return {string} The translated text. */
        _translateDigits: function (inst, value) {
            return ('' + value).replace(/[0-9]/g, function (digit) {
                return inst.options.digits[digit];
            });
        },

		/** Translate the format into flags for each period.
			@private
			@param {object} inst The current settings for this instance.
			@return {string[]} Flags indicating which periods are requested (?) or
					required (!) by year, month, week, day, hour, minute, second. */
        _determineShow: function (inst) {
            var format = inst.options.format;
            var show = [];
            show[Y] = (format.match('y') ? '?' : (format.match('Y') ? '!' : null));
            show[O] = (format.match('o') ? '?' : (format.match('O') ? '!' : null));
            show[W] = (format.match('w') ? '?' : (format.match('W') ? '!' : null));
            show[D] = (format.match('d') ? '?' : (format.match('D') ? '!' : null));
            show[H] = (format.match('h') ? '?' : (format.match('H') ? '!' : null));
            show[M] = (format.match('m') ? '?' : (format.match('M') ? '!' : null));
            show[S] = (format.match('s') ? '?' : (format.match('S') ? '!' : null));
            return show;
        },

		/** Calculate the requested periods between now and the target time.
			@private
			@param {object} inst The current settings for this instance.
			@param {string[]} show Flags indicating which periods are requested/required.
			@param {number} significant The number of periods with values to show, zero for all.
			@param {Date} now The current date and time.
			@return {number[]} The current time periods (always positive)
					by year, month, week, day, hour, minute, second. */
        _calculatePeriods: function (inst, show, significant, now) {
            // Find endpoints
            inst._now = now;
            inst._now.setMilliseconds(0);
            var until = new Date(inst._now.getTime());
            if (inst._since) {
                if (now.getTime() < inst._since.getTime()) {
                    inst._now = now = until;
                }
                else {
                    now = inst._since;
                }
            }
            else {
                until.setTime(inst._until.getTime());
                if (now.getTime() > inst._until.getTime()) {
                    inst._now = now = until;
                }
            }
            // Calculate differences by period
            var periods = [0, 0, 0, 0, 0, 0, 0];
            if (show[Y] || show[O]) {
                // Treat end of months as the same
                var lastNow = this._getDaysInMonth(now.getFullYear(), now.getMonth());
                var lastUntil = this._getDaysInMonth(until.getFullYear(), until.getMonth());
                var sameDay = (until.getDate() === now.getDate() ||
                    (until.getDate() >= Math.min(lastNow, lastUntil) &&
                        now.getDate() >= Math.min(lastNow, lastUntil)));
                var getSecs = function (date) {
                    return (date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds();
                };
                var months = Math.max(0,
                    (until.getFullYear() - now.getFullYear()) * 12 + until.getMonth() - now.getMonth() +
                    ((until.getDate() < now.getDate() && !sameDay) ||
                        (sameDay && getSecs(until) < getSecs(now)) ? -1 : 0));
                periods[Y] = (show[Y] ? Math.floor(months / 12) : 0);
                periods[O] = (show[O] ? months - periods[Y] * 12 : 0);
                // Adjust for months difference and end of month if necessary
                now = new Date(now.getTime());
                var wasLastDay = (now.getDate() === lastNow);
                var lastDay = this._getDaysInMonth(now.getFullYear() + periods[Y],
                    now.getMonth() + periods[O]);
                if (now.getDate() > lastDay) {
                    now.setDate(lastDay);
                }
                now.setFullYear(now.getFullYear() + periods[Y]);
                now.setMonth(now.getMonth() + periods[O]);
                if (wasLastDay) {
                    now.setDate(lastDay);
                }
            }
            var diff = Math.floor((until.getTime() - now.getTime()) / 1000);
            var period = null;
            var extractPeriod = function (period, numSecs) {
                periods[period] = (show[period] ? Math.floor(diff / numSecs) : 0);
                diff -= periods[period] * numSecs;
            };
            extractPeriod(W, 604800);
            extractPeriod(D, 86400);
            extractPeriod(H, 3600);
            extractPeriod(M, 60);
            extractPeriod(S, 1);
            if (diff > 0 && !inst._since) { // Round up if left overs
                var multiplier = [1, 12, 4.3482, 7, 24, 60, 60];
                var lastShown = S;
                var max = 1;
                for (period = S; period >= Y; period--) {
                    if (show[period]) {
                        if (periods[lastShown] >= max) {
                            periods[lastShown] = 0;
                            diff = 1;
                        }
                        if (diff > 0) {
                            periods[period]++;
                            diff = 0;
                            lastShown = period;
                            max = 1;
                        }
                    }
                    max *= multiplier[period];
                }
            }
            if (significant) { // Zero out insignificant periods
                for (period = Y; period <= S; period++) {
                    if (significant && periods[period]) {
                        significant--;
                    }
                    else if (!significant) {
                        periods[period] = 0;
                    }
                }
            }
            return periods;
        }
    });

})(jQuery);




(function ($) {
    "use strict";
    $.fn.tmdPrayerCounter = function (params) {
        var globals = {
            apiLoaded: false,
            systemTimeLoaded: false,

            // Element
            element: this,

            // Sadece prayerTimes parametresi üzerinden gönderilen namaz vakitlerini içerir
            prayTimesData: {},

            // Server saati. Daha sonra api üzerinden doldurulacak
            systemTime: new Date(),

            systemTimeVirtual: new Date(),

            // Seçilen şehir adı
            cityName: '',

            isDebug: false
        };

        var defaults = {
            // Sayım yapılacak vakitler ve başlıkları
            prayerTimes: {
                IMSAK: 'İmsak vaktine kalan süre',
                GUNES: 'Güneş vaktine kalan süre',
                OGLE: 'Öğle vaktine kalan süre',
                IKINDI: 'İkindi vaktine kalan süre',
                AKSAM: 'Akşam vaktine kalan süre',
                YATSI: 'Yatsı vaktine kalan süre'
            },

            // Basılacak sayacın HTML template'i.
            // Kullanılabilir parametreler: {TITLE}, {HH}:{mm}:{ss}, {CITYNAME}, {CITYNAMEFORURL}
            template: null,

            // Şehir nameForUrl
            // Eğer bu parametre gönderilmezse kullanıcının şehiri otomatik tespit edilir
            cityNameForUrl: null,

            // Zaman tablosu isteniyorsa true gönderilmelidir
            getTimeTable: false,

            // Zaman tablosu (İmsak, Güneş, Öğle, İkindi vb. listesi)
            // Kullanılabilir parametreler: {NAME}, {TIME}
            templateTimeTableItem: '<li><strong>{NAME}</strong> <span>{TIME}</span></li>',

            // Zaman tablosu template'i render edildiğinde buraya callback yapılır
            onGetTimeTable: function (data) {
                return;
            },

            // Counter datasını manuel olarak json formatında almak istenirse true gönderilmeli
            getDataByJson: false,

            // Counter datası bu fonksiyona gönderilecektir
            onGetDataByJson: function (data) {
                return;
            }
        };
        var options = $.extend(defaults, params);

        // Gönderilen tarihi ayraç ile ayırarak formatlar 
        var getDateFormat = function (date, delimiter) {
            if (!delimiter) { delimiter = "."; } // ayraç

            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();

            var returnText = '';
            returnText += (day < 10 ? '0' + day : day);
            returnText += delimiter + (month < 10 ? '0' + month : month);
            returnText += delimiter + (year < 10 ? '0' + year : year);
            return returnText;
        };

        var setGMTDateTimeForTurkey = function (dateParam) {
            var date = new Date(dateParam)
            var timeZoneFromDB = +3.00; // GMT +3 
            var tzDifference = timeZoneFromDB * 60 + date.getTimezoneOffset();

            return new Date(date.getTime() + tzDifference * 60 * 1000);
        };

        // Gönderilen zamanları formatlayarak gösterir
        var getTimeFormat = function (hours, mins, secs) {
            var returnText = '';
            if (Number.isInteger(hours)) {
                returnText += (hours < 10 ? '0' + hours : hours);
            }
            if (Number.isInteger(mins)) {
                returnText += ':' + (mins < 10 ? '0' + mins : mins);
            }
            if (Number.isInteger(secs)) {
                returnText += ':' + (secs < 10 ? '0' + secs : secs);
            }
            return returnText;
        };

        // Türkiye şehir listesi json
        var getCityList = function () {
            return JSON.parse('[{"City":"ADANA","CityNameForUrl":"adana","Plate":"1"},{"City":"ADIYAMAN","CityNameForUrl":"adiyaman","Plate":"2"},{"City":"AFYONKARAHİSAR","CityNameForUrl":"afyonkarahisar","Plate":"3"},{"City":"AĞRI","CityNameForUrl":"agri","Plate":"4"},{"City":"AMASYA","CityNameForUrl":"amasya","Plate":"5"},{"City":"ANKARA","CityNameForUrl":"ankara","Plate":"6"},{"City":"ANTALYA","CityNameForUrl":"antalya","Plate":"7"},{"City":"ARTVİN","CityNameForUrl":"artvin","Plate":"8"},{"City":"AYDIN","CityNameForUrl":"aydin","Plate":"9"},{"City":"BALIKESİR","CityNameForUrl":"balikesir","Plate":"10"},{"City":"BİLECİK","CityNameForUrl":"bilecik","Plate":"11"},{"City":"BİNGÖL","CityNameForUrl":"bingol","Plate":"12"},{"City":"BİTLİS","CityNameForUrl":"bitlis","Plate":"13"},{"City":"BOLU","CityNameForUrl":"bolu","Plate":"14"},{"City":"BURDUR","CityNameForUrl":"burdur","Plate":"15"},{"City":"BURSA","CityNameForUrl":"bursa","Plate":"16"},{"City":"ÇANAKKALE","CityNameForUrl":"canakkale","Plate":"17"},{"City":"ÇANKIRI","CityNameForUrl":"cankiri","Plate":"18"},{"City":"ÇORUM","CityNameForUrl":"corum","Plate":"19"},{"City":"DENİZLİ","CityNameForUrl":"denizli","Plate":"20"},{"City":"DİYARBAKIR","CityNameForUrl":"diyarbakir","Plate":"21"},{"City":"EDİRNE","CityNameForUrl":"edirne","Plate":"22"},{"City":"ELAZIĞ","CityNameForUrl":"elazig","Plate":"23"},{"City":"ERZİNCAN","CityNameForUrl":"erzincan","Plate":"24"},{"City":"ERZURUM","CityNameForUrl":"erzurum","Plate":"25"},{"City":"ESKİŞEHİR","CityNameForUrl":"eskisehir","Plate":"26"},{"City":"GAZİANTEP","CityNameForUrl":"gaziantep","Plate":"27"},{"City":"GİRESUN","CityNameForUrl":"giresun","Plate":"28"},{"City":"GÜMÜŞHANE","CityNameForUrl":"gumushane","Plate":"29"},{"City":"HAKKARİ","CityNameForUrl":"hakkari","Plate":"30"},{"City":"HATAY","CityNameForUrl":"hatay","Plate":"31"},{"City":"ISPARTA","CityNameForUrl":"isparta","Plate":"32"},{"City":"İÇEL","CityNameForUrl":"icel","Plate":"33"},{"City":"İSTANBUL","CityNameForUrl":"istanbul","Plate":"34"},{"City":"İZMİR","CityNameForUrl":"izmir","Plate":"35"},{"City":"KARS","CityNameForUrl":"kars","Plate":"36"},{"City":"KASTAMONU","CityNameForUrl":"kastamonu","Plate":"37"},{"City":"KAYSERİ","CityNameForUrl":"kayseri","Plate":"38"},{"City":"KIRKLARELİ","CityNameForUrl":"kirklareli","Plate":"39"},{"City":"KIRŞEHİR","CityNameForUrl":"kirsehir","Plate":"40"},{"City":"KOCAELİ","CityNameForUrl":"kocaeli","Plate":"41"},{"City":"KONYA","CityNameForUrl":"konya","Plate":"42"},{"City":"KÜTAHYA","CityNameForUrl":"kutahya","Plate":"43"},{"City":"MALATYA","CityNameForUrl":"malatya","Plate":"44"},{"City":"MANİSA","CityNameForUrl":"manisa","Plate":"45"},{"City":"KAHRAMANMARAŞ","CityNameForUrl":"kahramanmaras","Plate":"46"},{"City":"MARDİN","CityNameForUrl":"mardin","Plate":"47"},{"City":"MUĞLA","CityNameForUrl":"mugla","Plate":"48"},{"City":"MUŞ","CityNameForUrl":"mus","Plate":"49"},{"City":"NEVŞEHİR","CityNameForUrl":"nevsehir","Plate":"50"},{"City":"NİĞDE","CityNameForUrl":"nigde","Plate":"51"},{"City":"ORDU","CityNameForUrl":"ordu","Plate":"52"},{"City":"RİZE","CityNameForUrl":"rize","Plate":"53"},{"City":"SAKARYA","CityNameForUrl":"sakarya","Plate":"54"},{"City":"SAMSUN","CityNameForUrl":"samsun","Plate":"55"},{"City":"SİİRT","CityNameForUrl":"siirt","Plate":"56"},{"City":"SİNOP","CityNameForUrl":"sinop","Plate":"57"},{"City":"SİVAS","CityNameForUrl":"sivas","Plate":"58"},{"City":"TEKİRDAĞ","CityNameForUrl":"tekirdag","Plate":"59"},{"City":"TOKAT","CityNameForUrl":"tokat","Plate":"60"},{"City":"TRABZON","CityNameForUrl":"trabzon","Plate":"61"},{"City":"TUNCELİ","CityNameForUrl":"tunceli","Plate":"62"},{"City":"ŞANLIURFA","CityNameForUrl":"sanliurfa","Plate":"63"},{"City":"UŞAK","CityNameForUrl":"usak","Plate":"64"},{"City":"VAN","CityNameForUrl":"van","Plate":"65"},{"City":"YOZGAT","CityNameForUrl":"yozgat","Plate":"66"},{"City":"ZONGULDAK","CityNameForUrl":"zonguldak","Plate":"67"},{"City":"AKSARAY","CityNameForUrl":"aksaray","Plate":"68"},{"City":"BAYBURT","CityNameForUrl":"bayburt","Plate":"69"},{"City":"KARAMAN","CityNameForUrl":"karaman","Plate":"70"},{"City":"KIRIKKALE","CityNameForUrl":"kirikkale","Plate":"71"},{"City":"BATMAN","CityNameForUrl":"batman","Plate":"72"},{"City":"ŞIRNAK","CityNameForUrl":"sirnak","Plate":"73"},{"City":"BARTIN","CityNameForUrl":"bartin","Plate":"74"},{"City":"ARDAHAN","CityNameForUrl":"ardahan","Plate":"75"},{"City":"IĞDIR","CityNameForUrl":"igdir","Plate":"76"},{"City":"YALOVA","CityNameForUrl":"yalova","Plate":"77"},{"City":"KARABÜK","CityNameForUrl":"karabuk","Plate":"78"},{"City":"KİLİS","CityNameForUrl":"kilis","Plate":"79"},{"City":"OSMANİYE","CityNameForUrl":"osmaniye","Plate":"80"},{"City":"DÜZCE","CityNameForUrl":"duzce","Plate":"81"}]');
        };

        var getCityByNameForUrl = function (nameForUrl) {
            return getCityList().filter(function (item, ix) {
                return item.CityNameForUrl == nameForUrl;
            })[0];
        };

        var getCityByPlateNo = function (plate) {
            return getCityList().filter(function (item, ix) {
                return item.Plate == plate;
            })[0];
        };

        // Hangi vakitin sayılacağını tespit eder
        var getCurrentCountingTimeName = function () {
            if (!globals.prayTimesData) return false;

            var _now = globals.systemTime;
            var vakit = globals.prayTimesData;

            // Mevcut vakitler arasından, şuanki zamana göre
            if (options.prayerTimes["IMSAK"] && _now < vakit.IMSAK) { return "IMSAK"; }
            if (options.prayerTimes["GUNES"] && _now < vakit.GUNES) { return "GUNES"; }
            if (options.prayerTimes["OGLE"] && _now < vakit.OGLE) { return "OGLE"; }
            if (options.prayerTimes["IKINDI"] && _now < vakit.IKINDI) { return "IKINDI"; }
            if (options.prayerTimes["AKSAM"] && _now < vakit.AKSAM) { return "AKSAM"; }
            if (options.prayerTimes["YATSI"] && _now < vakit.YATSI) { return "YATSI"; }
            if (options.prayerTimes["IMSAK"] && _now < vakit.nextIMSAK) { return "nextIMSAK"; }
        };

        // Hangi vakitin sayılacağını tespit eder. Gönderilen prayerTimes parametresine bakmaz.
        var getCurrentCountingTimeNameAll = function () {
            if (!globals.prayTimesData) return false;

            var _now = globals.systemTime;
            var vakit = globals.prayTimesData;

            // Mevcut vakitler arasından, şuanki zamana göre
            if (_now < vakit.IMSAK) { return "IMSAK"; }
            if (_now < vakit.GUNES) { return "GUNES"; }
            if (_now < vakit.OGLE) { return "OGLE"; }
            if (_now < vakit.IKINDI) { return "IKINDI"; }
            if (_now < vakit.AKSAM) { return "AKSAM"; }
            if (_now < vakit.YATSI) { return "YATSI"; }
            if (_now < vakit.nextIMSAK) { return "nextIMSAK"; }
        };

        // Bu fonksiyon namaz vakitleri tablosu için gönderilen item template üzerinden vakitleri yerleştirir
        var generateTimeTableHtml = function () {
            var renderTimeItem = function (key, name, countedTimesArray) {
                var template = options.templateTimeTableItem;

                var date = globals.prayTimesData[key];
                var hours = date.getHours();
                var mins = date.getMinutes();
                var timeText = getTimeFormat(hours, mins);

                var $tempItem = $(template.replace('{NAME}', name).replace('{TIME}', timeText));

                // Aktif sayılan ve geçmiş vakitler için class eklemesi yapar
                if (countedTimesArray.length > 1) {
                    var lastItem = countedTimesArray[countedTimesArray.length - 1];
                    var currentItem = countedTimesArray[countedTimesArray.length - 2];

                    if (lastItem != key && currentItem) {
                        if (currentItem == key) {
                            $tempItem.addClass("current");
                        } else if (countedTimesArray.indexOf(key) > -1) {
                            $tempItem.addClass("pasif");
                        }
                    }
                }

                return $tempItem[0].outerHTML;
            };

            var tempResult = '';
            var countedTimesArray = getCountedTimeNameList();
            if (!globals.prayTimesData) return tempResult;
            tempResult += renderTimeItem("IMSAK", "İmsak", countedTimesArray);
            tempResult += renderTimeItem("GUNES", "Güneş", countedTimesArray);
            tempResult += renderTimeItem("OGLE", "Öğle", countedTimesArray);
            tempResult += renderTimeItem("IKINDI", "İkindi", countedTimesArray);
            tempResult += renderTimeItem("AKSAM", "Akşam", countedTimesArray);
            tempResult += renderTimeItem("YATSI", "Yatsı", countedTimesArray);
            return tempResult;
        };

        // Sayılmış olan vakitlerin listesini döndürür. 
        // En sonuncu dizi elemanı aktif sayan elemandır
        var getCountedTimeNameList = function () {
            var vakitList = {
                IMSAK: 0,
                GUNES: 1,
                OGLE: 2,
                IKINDI: 3,
                AKSAM: 4,
                YATSI: 5,
                nextIMSAK: 6
            };

            var currentVakitName = getCurrentCountingTimeNameAll();
            var currentVakitIndex = vakitList[currentVakitName];

            var list = Object.keys(vakitList);
            var returnList = [];

            // İmsak'ı sayıyorsa listeye sadece IMSAK eklenecek
            if (currentVakitIndex == 0) {
                returnList.push("IMSAK");
            }
            // Yatsı'yı sayıyorsa, Tüm liste ve sonuna IMSAK eklenecek
            else if (currentVakitIndex == 5) {
                list.pop(); // Son eleman çıkarılır
                returnList = list;
                //returnList.push("IMSAK");
            }
            // Diğer vakitleri sayıyorsa
            else {
                for (var i = 0; i <= (currentVakitIndex); i++) {
                    var item = list[i];
                    if (item) {
                        returnList.push(item);
                    }
                }
            }
            return returnList;
        };


        // Sonraki vaktin key değerini döndürür
        var getNextTimeName = function (currentVakitName) {
            var nextTimeResult = "";
            var objectKeys = Object.keys(options.prayerTimes);
            objectKeys.map(function (key, index) {
                if (currentVakitName == objectKeys[index]) {
                    if (index == objectKeys.length - 1) {
                        // Sonuncu ise, en baştaki vakit alınır
                        nextTimeResult = objectKeys[0];
                    } else {
                        // Sonraki vakit 
                        nextTimeResult = objectKeys[index + 1];
                    }
                }
            });
            return nextTimeResult;
        };

        var loadScript = function (src, callback) {
            var script = document.createElement('script'),
                loaded;
            script.setAttribute('src', src);
            if (callback) {
                script.onreadystatechange = script.onload = function () {
                    if (!loaded) {
                        callback();
                    }
                    loaded = true;
                };
            }
            document.getElementsByTagName('head')[0].appendChild(script);
        };

        var createLog = function (message) {
            function safehtml(input) {
                input = input.replace(/&/g, '&amp;');
                input = input.replace(/</g, '&lt;');
                input = input.replace(/>/g, '&gt;');
                return input;
            }
            $("#log").prepend(safehtml(message) + "<br><br>");
        };

        // Namaz vakit datasını api üzerinden alır
        var getDataFromApi = function () {
            var url = "";
            var nameForUrl = options.cityNameForUrl;

            if (globals.isDebug) {
                url = "test/istanbulNamazVakitleriDatasi.json";
            }
            else {                
                url = "https://webapi.tmgrup.com.tr/PrayTimes/GetPrayTimesPostgre?cityName=" + options.cityNameForUrl + "&dayAfter=1";
            }

            var startTime = new Date().getTime();
            $.getJSON(url, function (data) {
                if (data.Success) {
                    globals.apiLoaded = true;

                    var _prayTimes = data.List[0];
                    if (globals.isDebug) {
                        // Testi çin
                        globals.prayTimesData = {
                            IMSAK: new Date(_prayTimes.Imsak),
                            GUNES: new Date(_prayTimes.Gunes),
                            OGLE: new Date(_prayTimes.Ogle),
                            IKINDI: new Date(_prayTimes.Ikindi),
                            AKSAM: new Date(_prayTimes.Aksam),
                            YATSI: new Date(_prayTimes.Yatsi)
                        };

                        // Sonraki günün datası varsa, bir sonraki imsak için alınacak
                        if (data.List.length > 1) {
                            globals.prayTimesData.nextIMSAK = new Date(data.List[1].Imsak);
                        } else {
                            // Yoksa Imsak saatine + 24 saat eklenecek
                            globals.prayTimesData.nextIMSAK = new Date(globals.prayTimesData.IMSAK.valueOf() + 24 * 3600000);
                        }
                    }
                    else {
                        globals.prayTimesData = {
                            IMSAK: setGMTDateTimeForTurkey(new Date(_prayTimes.Imsak)),
                            GUNES: setGMTDateTimeForTurkey(new Date(_prayTimes.Gunes)),
                            OGLE: setGMTDateTimeForTurkey(new Date(_prayTimes.Ogle)),
                            IKINDI: setGMTDateTimeForTurkey(new Date(_prayTimes.Ikindi)),
                            AKSAM: setGMTDateTimeForTurkey(new Date(_prayTimes.Aksam)),
                            YATSI: setGMTDateTimeForTurkey(new Date(_prayTimes.Yatsi))
                        };

                        // Sonraki günün datası varsa, bir sonraki imsak için alınacak
                        if (data.List.length > 1) {
                            globals.prayTimesData.nextIMSAK = setGMTDateTimeForTurkey(new Date(data.List[1].Imsak));
                        }
                        else {
                            // Yoksa Imsak saatine + 24 saat eklenecek
                            globals.prayTimesData.nextIMSAK = new Date(globals.prayTimesData.IMSAK.valueOf() + 24 * 3600000);
                        }
                    }

                    // Ajax isteği sırasında geçen süre hesaplanarak, systemTime'a ekleniyor.
                    var durationTime = (new Date().getTime() - startTime);
                    globals.systemTime.setMilliseconds(globals.systemTime.getMilliseconds() + durationTime);

                    // Saniye farkından dolayı 1 saniye çıkarıldı
                    globals.systemTimeVirtual = globals.systemTime;
                    globals.systemTimeVirtual.setSeconds(globals.systemTimeVirtual.getSeconds() - 1);

                    // Sayaç oluşturmak için çağrılır
                    createCountDownInstance();
                }
            });
        };

        // Başlangıç
        var startProcess = function () {
            getServerTimeAndCity();
        };

        // Sunucu saati ve şehir tespiti için kullanılır. Response alındıktan sonra countDown'ı çalıştırma girişiminde bulunur
        var getServerTimeAndCity = function () {

            // Şehir bilgisi objelere doldurulur
            var setDefaultCity = function (nameForUrl, name) {
                if (nameForUrl && name) {
                    options.cityNameForUrl = nameForUrl;
                    globals.cityName = name;
                }
                else {
                    options.cityNameForUrl = 'istanbul';
                    globals.cityName = 'İSTANBUL';
                }
            };
            $.getJSON('https://ipcheck.tmgrup.com.tr/ipcheck/getcity', function (data) {
                if (data && data.CurrentDate) {
                    globals.systemTime = setGMTDateTimeForTurkey(data.CurrentDate);

                    // Eğer cityNameForUrl parametresi gönderilmemişse, IP üzerinden gelen şehir bilgisi default olarak atanır
                    // IP üzerinden gelen veride problem varsa default olarak İstanbul seçilir
                    if (options.cityNameForUrl == null) {
                        if (data.CountryCode != 'TR') {
                            setDefaultCity();
                        }
                        else {
                            var cityObj = getCityByPlateNo(parseInt(data.SubDivisionCode || 34));
                            if (cityObj) {
                                setDefaultCity(cityObj.CityNameForUrl, cityObj.City);
                            } else {
                                setDefaultCity();
                            }
                        }
                    }
                    // Eğer parametre üzerinden cityNameForUrl gelmişse şehiri alıyoruz
                    else {
                        var cityObj = getCityByNameForUrl(options.cityNameForUrl);
                        if (cityObj) {
                            setDefaultCity(cityObj.CityNameForUrl, cityObj.City);
                        } else {
                            setDefaultCity();
                        }
                    }
                }
                // Response alındı fakat gelen result içerisinde CurrentDate objesi yoksa
                else {
                    globals.systemTime = new Date();
                    setDefaultCity();
                }
            }).fail(function () {
                globals.systemTime = new Date();
                setDefaultCity();
            }).done(function () {
                globals.systemTimeLoaded = true;

                // 2. aşama olarak namaz vakitleri datası çekilecek
                getDataFromApi();
            });
        };

        // Sayacı tekrar başlatır
        var restartCountDown = function () {
            createCountDownInstance();
        };

        // Sayacı, api'den sunucu saati verisini çekerek tekrar çalıştırır
        var resetCountdownWithRefreshData = function () {
            // Method arka arkaya çalıştığında çoklu istekleri engellemek için
            if (!globals.apiLoaded || !globals.systemTimeLoaded) return;

            globals.apiLoaded = false;
            globals.systemTimeLoaded = false;

            // Sayacı yeniden başlatmak için tarihi çekmek yeterli, tarih alındığında sayaç otomatik başlatılıyor
            getServerTimeAndCity();
            getDataFromApi();
        };

        // onGetDataByJson metoduna gönderilmek üzere, JSON çıktı üretir
        var generateJsonData = function (currentTimeName, countDownTitle, data) {
            var upcomingDate = globals.prayTimesData[currentTimeName];
            var json = {
                UpcomingTimeName: currentTimeName,
                UpcomingTimeValue: upcomingDate,
                UpcomingDateString: getDateFormat(upcomingDate),
                UpcomingTimeString: getTimeFormat(upcomingDate.getHours(), upcomingDate.getMinutes()),
                CurrentDateValue: globals.systemTimeVirtual,
                CurrentDateString: getDateFormat(globals.systemTimeVirtual),
                CurrentTimeString: getTimeFormat(globals.systemTimeVirtual.getHours(), globals.systemTimeVirtual.getMinutes(), globals.systemTimeVirtual.getSeconds()),
                Title: countDownTitle,
                Days: data.days,
                Hours: data.hours,
                Mins: data.min,
                Secs: data.sec,
                CityName: globals.cityName,
                CityNameForUrl: options.cityNameForUrl
            }

            return json;
        };

        var leadingZero = function (num, padlen, padchar) {
            var pad_char = typeof padchar !== 'undefined' ? padchar : '0';
            var pad = new Array(1 + padlen).join(pad_char);
            return (pad + num).slice(-pad.length);
        }


        // Sayacın hatadan dolayı veya cihazın sleep olması sebebiyle durması durumunda, yeni data ile tekrar çalıştırmak için kullanılır
        var checkCountDownIsStopped = function () {
            var countDownIsStopped = false;
            // Script özelliği, sayacın aktif sayım değerlerini verir. 
            var countDownInfo = globals.element.countdown('getTimes');
            if (countDownInfo) {
                // countDownInfo içerisinde countdown bilgisi arıyoruz. Geçerli bir sayı var mı
                var arrItems = countDownInfo.filter(function (elem) {
                    return elem > 0
                });
                if (!(arrItems && arrItems.length > 0)) {
                    countDownIsStopped = true;
                }
            }
            else {
                countDownIsStopped = true;
            }
            return countDownIsStopped;
        };
        var refreshIntervalId = 0, stopCounter = 0, stopRequestIsMade = false;
        var countDownStopChecker = function () {
            clearInterval(refreshIntervalId);

            // resetCountdownWithRefreshData daha önce çalıştırıldıysa, ve sorun devam ediyorsa, düzeltilemez bir hata olduğunu anlarız. 
            // Böyle bir durumda yapılacak birşey olmadığı için tekrar resetCountdownWithRefreshData() yapmasına gerek yok.
            if (stopRequestIsMade) return;

            refreshIntervalId = setInterval(function () {
                if (checkCountDownIsStopped()) {
                    stopCounter++;

                    if (stopCounter > 3) {
                        stopRequestIsMade = true;
                        clearInterval(refreshIntervalId);
                        resetCountdownWithRefreshData();
                    }
                }
            }, 1000);
        };


        // Sayaç oluşturma ve çalıştırma işlemleri
        var createCountDownInstance = function () {
            // Sayacın çalışabilmesi için gerekli olan verilerden biri dahi yoksa çalışmasın
            if (!globals.apiLoaded || !globals.systemTimeLoaded) return;

            // Sayaç durdu ise baştan başlatılacak
            countDownStopChecker();

            var currentTimeName = getCurrentCountingTimeName();

            var countDownTitle = options.prayerTimes[currentTimeName == "nextIMSAK" ? "IMSAK" : currentTimeName];
            var countDownDate = globals.prayTimesData[currentTimeName];

            // Bir şekilde hata oluşur, apiden data gelmez veya tarih gelmezse sayaç çalışmayacaktır
            if (!countDownTitle || !countDownDate) {
                return;
            }

            // İlk çalışırken basılacak olam TimeTable
            if (options.getTimeTable) {
                // Herhangi bir zaman bilgisi gelmezse, template'e class eklemeden son halini döner
                var timeTableHtml = generateTimeTableHtml();
                options.onGetTimeTable.call(this, timeTableHtml);
            }

            // Client saati kaynaklı zaman farkı ekleniyor
            var timeDiff = new Date().getTime() - globals.systemTime.getTime();
            countDownDate = new Date(countDownDate.getTime() + timeDiff);


            var template = '';
            if (options.template != null) {
                template = options.template
                    // Başlık
                    .replace(/{TITLE}/g, countDownTitle)

                    // Şehir
                    .replace(/{CITYNAME}/g, globals.cityName)

                    // Şehir URL
                    .replace(/{CITYNAMEFORURL}/g, options.cityNameForUrl)

                    // Gün
                    .replace(/{dd}/g, "{dnn}")
                    .replace(/{d}/g, "{dn}")

                    // Saat
                    .replace(/{HH}/g, "{hnn}")
                    .replace(/{H}/g, "{hn}")

                    // Dakika
                    .replace(/{mm}/g, "{mnn}")
                    .replace(/{m}/g, "{mn}")

                    // Saniye
                    .replace(/{ss}/g, "{snn}")
                    .replace(/{s}/g, "{sn}");
            }

            globals.element.countdown('destroy');
            globals.element.countdown({
                // The display texts for the counters if only one 
                compactLabels: ['y', 'm', 'w', 'd'], // The compact texts for the counters 
                whichLabels: null, // Function to determine which labels to use 
                digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], // The digits to display 
                timeSeparator: ':', // Separator for time periods 
                isRTL: false, // True for right-to-left languages, false for left-to-right 

                until: countDownDate, // new Date(year, mth - 1, day, hr, min, sec) - date/time to count down to 
                // or numeric for seconds offset, or string for unit offset(s): 
                // 'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds 
                since: null, // new Date(year, mth - 1, day, hr, min, sec) - date/time to count up from 
                // or numeric for seconds offset, or string for unit offset(s): 
                // 'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds 
                timezone: null, // The timezone (hours or minutes from GMT) for the target times, 
                // or null for client local 
                serverSync: null, // A function to retrieve the current server time for synchronisation 
                format: 'HMS', // Format for display - upper case for always, lower case only if non-zero, 
                // 'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds 
                layout: template, // Build your own layout for the countdown 
                compact: false, // True to display in a compact format, false for an expanded one 
                padZeroes: true, // True to add leading zeroes 
                significant: 0, // The number of periods with values to show, zero for all 
                description: '', // The description displayed for the countdown 
                expiryUrl: null, // A URL to load upon expiry, replacing the current page 
                alwaysExpire: false, // True to trigger onExpiry even if never counted down 
                onExpiry: function () {
                    setTimeout(function () {
                        resetCountdownWithRefreshData();
                    }, 1000);
                }, // Callback when the countdown expires - 
                // receives no parameters and 'this' is the containing division 
                onTick: function (periods) {

                    globals.systemTimeVirtual.setSeconds(globals.systemTimeVirtual.getSeconds() + 1);

                    var seconds = periods[6];
                    if (options.getTimeTable) {
                        // Performans amaçlı olarak belli saniyelerde TimeTable basılacak
                        if (seconds > 55 || seconds < 5) {
                            var timeTableHtml = generateTimeTableHtml();
                            if (timeTableHtml) {
                                options.onGetTimeTable.call(this, timeTableHtml);
                            }
                        }
                    }

                    if (options.getDataByJson) {
                        var dataWithZeros = {};
                        dataWithZeros.days = leadingZero(periods[3], 2);
                        dataWithZeros.hours = leadingZero(periods[4], 2);
                        dataWithZeros.min = leadingZero(periods[5], 2);
                        dataWithZeros.sec = leadingZero(periods[6], 2);

                        options.onGetDataByJson.call(this, generateJsonData(currentTimeName, countDownTitle, dataWithZeros));
                    }

                }, // Callback when the countdown is updated - 
                // receives int[7] being the breakdown by period (based on format) 
                // and 'this' is the containing division 
                tickInterval: 1 // Interval (seconds) between onTick callbacks 
            });
        };

        startProcess();

        return true;
    }
})(jQuery);