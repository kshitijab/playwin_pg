(function($, undefined) {
    var WIDGET_NAME = "dxSimulator",
        SIMULATOR_APPLICATION_HASH = "dxapp-hash",
		DEVICE_KEY = "dx-force-device",
        ANDROID_PANEL_HEIGHT = 41,
        DEFAULT_MONITOR_DPI = 102.69;

    var Simulator = function(frame, options) {
        this._options = this.DEFAULT_OPTIONS;
        if(this._options.wrapFrame || options.wrapFrame) {
            this._wrapFrame(frame);
        }
        this.initMarkup(frame);
        this.options(options);
    };

    Simulator.prototype = {

        DEFAULT_OPTIONS: { 
            device: "iPad",
            orientation: "p",
            considerDPI: false,
            wrapFrame: false,
            // none, realDevice, simple
            chrome: "realDevice",
            scale: 1
        },
        
        devices: {
            "iPhone": {
                cssPixelRatio: 2,
                ppi: 326,
                width: 640,
                height: 960
            },
            "iPhone5": {
                cssPixelRatio: 2,
                ppi: 326,
                width: 640,
                height: 1136
            },
            "iPad": {
                cssPixelRatio: 2,
                ppi: 264,
                width: 1536,
                height: 2048
            },
            "iPadMini": {
                cssPixelRatio: 1,
                ppi: 163,
                width: 768,
                height: 1024
            },
            "androidPhone": {
                cssPixelRatio: 2,
                ppi: 316,
                width: 720,
                height: 1280
            },
            "androidTablet": {
                cssPixelRatio: 1.5,
                ppi: 149,
                width: 800,
                height: 1280
            },
            "nexus7": {
                cssPixelRatio: 1.325,
                ppi: 216,
                width: 800,
                height: 1280
            },
            "nokia920": {
                cssPixelRatio: 1.666,
                ppi: 332,
                width: 768,
                height: 1280
            },
            "win8Phone": {
                cssPixelRatio: 1,
                ppi: 152,
                width: 330,
                height: 568
            },
            "msSurface": {
                cssPixelRatio: 1,
                ppi: 148,
                width: 768,
                height: 1366
            },
            "desktop": {
                cssPixelRatio: 1,
                ppi: 149,
                width: 600,
                height: 766
            },
            "desktop_1280x720": {
                cssPixelRatio: 1,
                ppi: DEFAULT_MONITOR_DPI,
                width: 720,
                height: 1280
            },
            "desktop_1440x900": {
                cssPixelRatio: 1,
                ppi: DEFAULT_MONITOR_DPI,
                width: 900,
                height: 1440
            },
            "desktop_1920x1080": {
                cssPixelRatio: 1,
                ppi: DEFAULT_MONITOR_DPI,
                width: 1080,
                height: 1920
            }
        },

        _calculateDeviceScale: function() {
            for(deviceName in this.devices) {
                this.devices[deviceName].scaleFactor = 1;

                if(this._options.considerDPI) {
                    this.devices[deviceName].dpi = this.devices[deviceName].ppi / this.devices[deviceName].cssPixelRatio;
                    this.devices[deviceName].scaleFactor = DEFAULT_MONITOR_DPI / this.devices[deviceName].dpi;
                    this.devices[deviceName].widthCSS = this.devices[deviceName].width / this.devices[deviceName].cssPixelRatio;
                    this.devices[deviceName].heightCSS = this.devices[deviceName].height / this.devices[deviceName].cssPixelRatio;
                }
            }
        },

        _wrapFrame: function(frame) {
            if(!$(".dx-simulator-wrapper").length) {
                frame.wrap("<div class='dx-simulator-wrapper'/>");
            }
        },

        setScale: function(options) {
            this._calculateDeviceScale();
            var orientation = options.orientation,
                device = options.device,
                $frame = $(this.frame);

            if(options.considerDPI) {

                var width = orientation === "p" ? this.devices[device].widthCSS : this.devices[device].heightCSS,
                    height = orientation === "p" ? this.devices[device].heightCSS : this.devices[device].widthCSS;

                if(device === "androidTablet") {
                    if(orientation === "p") {
                        height = height - ANDROID_PANEL_HEIGHT;
                        width = width + ANDROID_PANEL_HEIGHT;
                    }
                }

                $frame.width(width);
                $frame.height(height);
            }

            var scale = this.getAbsoluteScale();

            if("-webkit-transform" in $(".dx-simulator")[0].style ||
                "-moz-transform" in $(".dx-simulator")[0].style ||
                "-ms-transform" in $(".dx-simulator")[0].style ||
                "-o-transform" in $(".dx-simulator")[0].style ||
                "transform" in $(".dx-simulator")[0].style) {

                $(".dx-simulator-wrapper").width($(".dx-simulator").outerWidth(true) * scale)
                                          .height($(".dx-simulator").outerHeight(true) * scale);

                $(".dx-simulator").css({
                    "-webkit-transform": "scale(" + scale + ")",
                    "-moz-transform": "scale(" + scale + ")",
                    "-ms-transform": "scale(" + scale + ")",
                    "-o-transform": "scale(" + scale + ")",
                    "transform": "scale(" + scale + ")",
                    "-webkit-transform-origin": "0 0",
                    "transform-origin": "0 0",
                    "-ms-transform-origin": "0 0",
                    "-moz-transform-origin": "0 0",
                    "-o-transform-origin": "0 0"
                });
            }
            else {
                $(".dx-simulator").css("zoom", 1);
                $(".dx-simulator-wrapper").width($(".dx-simulator").outerWidth(true) * scale)
                                          .height($(".dx-simulator").outerHeight(true) * scale);
                $(".dx-simulator").css("zoom", scale);
            }
        },

        initMarkup: function($frame) {
            this.frame = $frame;
            this.frame.get(0).onload = function() {
                $($frame.get(0).contentWindow).on("hashchange", function() {
                    if (window.sessionStorage) {
                        sessionStorage.setItem(SIMULATOR_APPLICATION_HASH, this.location.hash.slice(1));
                    }
                });
                attachErrorHandler($frame.get(0).contentWindow);
            };

            this.wrapperDiv = $("<div></div>");
            this.backDiv = $("<a></a>")
                .addClass("dx-simulator-back")
                .click($.proxy(this._handleBack, this));

            var $backDivWrapper = $("<div></div>")
                .addClass("dx-simulator-back-wrapper")
                .append(this.backDiv);

            this.frame.wrap(this.wrapperDiv);
            this.wrapperDiv = this.frame.parent();

            this.wrapperDiv.append($backDivWrapper);
        },

        options: function(a, b) {
            var changes;

            if(typeof a === "string") {
                if(b === undefined)
                    return this._options[a];
                changes = { };
                changes[a] = b;
            } else {
                changes = a;
            }
            this._changeOptions(changes);
        },

        getAbsoluteScale: function(options) {
            var options = options || this._options;
            return this.devices[options.device].scaleFactor * options.scale;
        },

        _changeOptions: function(changes) {
            var prevOptions = this._options,
                newOptions = this._options = $.extend({}, prevOptions, changes);

            var urlChanged = prevOptions.url !== newOptions.url,
                deviceChanged = prevOptions.device !== newOptions.device;

            var framedWindow = this.frame[0].contentWindow;

            if (urlChanged && newOptions.url)
                setTimeout(function() {
                    framedWindow.location = newOptions.url;
                });

            if (deviceChanged && !urlChanged && newOptions.url)
                framedWindow.location.reload();

            if (deviceChanged) {
                if (window.sessionStorage) {
                    sessionStorage.setItem(DEVICE_KEY, newOptions.device);
                }
            }
            this.wrapperDiv.attr("class", this._wrapperClasses());
            
            this.setScale(newOptions);
        },

        destroy: function() {
            this.backDiv.remove();
            this.frame.unwrap();
        },
        _wrapperClasses: function () {
            
            var device = this.options("device").toLowerCase();
            
            var simpleChrome = this.options("chrome") == "simple" ? "simple-chrome" : "";
            var emptyChrome = this.options("chrome") == "none" ? "empty-chrome" : "";

            return [
                "dx-simulator",
                ["dx-simulator", device, this.options("orientation")].join("-"),
                simpleChrome,
                emptyChrome
            ].join(" ");
        },        

        _handleBack: function() {
            var framedWindow = this.frame[0].contentWindow;
			framedWindow.$(framedWindow).trigger("dxback");            
        }

    };

    $.fn.dxSimulator = function(options) {
        var returnValue = this;

        this.each(function() {
            if(this.tagName !== "IFRAME")
                throw Error();
            
            var $frame = $(this),
                instance = $frame.data(WIDGET_NAME);
            
            if(!instance) {
                instance = new Simulator($frame, options);
                $frame.data(WIDGET_NAME, instance);
            } else {
                instance.options(options);
            }

            if(options.returnInstance)
                returnValue = instance;
        });

        return returnValue;
    };

})(jQuery);

function attachErrorHandler(window) {
    $(window.document.body).append("<div id='error-message-container'\
                style='z-index: 100; position: fixed; top:100px; left: 0; width: 100%; \
                text-align: center; word-break: break-all; \
                overflow: auto;  display: none; \
                user-select: none; cursor: default;'>\
                    <div id='error-message-content' \
                    style='background-color: red; \
                    text-align: center;  word-break: break-all; \
                    border-radius: 5px 5px 5px 5px; \
                    margin-right: 10px; margin-left: 10px; \
                    padding-top: 10px; \
                    padding-bottom: 10px; \
                    padding-right: 10px; \
                    padding-left: 10px; \
                    cursor: default;'>Error message text.</div>\
                </div>");
    var window_onerror = window.onerror || function () { return false; };
    window.onerror = function (message, url, line) {
        var errorContainer = $("#error-message-container", $(window.document.body));
        if (errorContainer) {
            errorContainer[0].children[0].innerHTML = "Error: '" + message + "', line " + line + ", file '" + url + "'.";
            errorContainer.show();
            return true;
        }
        return window_onerror(message, url, line);
    };
}