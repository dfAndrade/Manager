// import {Utils} from "../Utils.js"
import {Utils} from "../Utils.js";
import css from "../../css/ui/components/popup.css"


/**
 * @class Popup
 * This class implements the functionality of a basic popup,
 * it can receive any type of content from a endpoint or be created directly with dom.
 *
 * @param div DOM element that will serve as a parent for the popup.
 * @param popupClass DOM class to identify the popup.
 *
 */
export class Popup {

    constructor(div, popupClass) {
        this._rootDiv = div;
        this._popupClass = popupClass;

        this._popupWrapper = null;
        this._popupDiv = null;

        this._title = "Title";
        this._content = null;

        this._popupStyle = "small";
        this._hasTopBlueBar = true;
        this._uRL = null;

        this._params = {};

        this._isClickOffEnabled = true;
    }

    get popupDiv() {
        return this._popupDiv;
    };

    get popupWrapper() {
        return this._popupWrapper;
    };

    /**
     * @Public
     *
     * Sets small popup style.
     */
    setSmallStyle() {
        this._popupStyle = "small";
    };

    /**
     * @Public
     *
     * Sets large popup style.
     */
    setLargeStyle() {
        this._popupStyle = "large";
    };

    /**
     * @Public
     *
     * Sets popup title.
     */
    set title(title) {
        this._title = title;
    };

    /**
     * @Public
     *
     * Informs the popup whether or not it should build the top bar
     *
     * Note: By default the popup will build the bar.
     *       Also, if the large style is being used and the top bar is deactivated it's recommended to
     *       implement a way to hide the popup since the cross element will not be built
     * @param hasTopBlueBar
     */
    setHasTopBlueBar(hasTopBlueBar) {
        this._hasTopBlueBar = hasTopBlueBar;
    };

    setClickOffToClose(isClickOffEnabled) {
        this._isClickOffEnabled = isClickOffEnabled;
    };

    /**
     * @Public
     *
     * Create popup that will fetch it's content from a given endpoint
     * @param url url of the endpoint that will serve content for the popup
     * @param params request params to be interpreted by the endpoint
     */
    setupWithURL(url, params) {
        this._uRL = url;
        this._params = params ? params : {};
        this._content = null;
    };

    /**
     * @Public
     *
     * Create popup with content
     * @param dom popup content
     */
    setupWithContent(dom) {
        this._content = dom;
    };

    /**
     * @Public
     *
     * Show's popup if it already exists, if not then it loads then shows it.
     * @param doAfterShowCbk function to be executed after show.
     */
    show(doAfterShowCbk) {
        console.log("old show");
        let scope = this;
        // if loading is assync
        if (!this._content) {
            this._load(function () {
                scope._popupWrapper.show();
                if (doAfterShowCbk)
                    doAfterShowCbk();
            });
            // if loading is sync
        } else if (this._content) {
            scope._buildPopupWithContent(this._content);

            scope._popupWrapper.show();
            if (doAfterShowCbk)
                doAfterShowCbk();
        }
    };

    /**
     * @Public
     *
     * Hide's popup.
     */
    hide() {
        console.log("old hide");
        this._popupWrapper.remove();
        this._popupWrapper = null;
        this._popupDiv = null;
    };


    /**
     * @Private
     *
     * Loads popup content from endpoint and builds the popup
     * @param doAfterLoadCbk function to be executed after load.
     */
    _load(doAfterLoadCbk) {
        let scope = this;

        $.ajax(this._uRL, {
            data: scope._params,
            dataType: "html",
            success: function (html) {
                scope._content = $(html);
                scope._buildPopupWithContent(scope._content);

                if (doAfterLoadCbk)
                    doAfterLoadCbk();
            }, error: function (a, b, c) {
                console.log("ERROR: Could not load popup");
            }
        });
    };

    /**
     * @Private
     *
     * Builds Popup Skeleton, popup div with the respective PopupStyle class is created.
     * Builds Popup TopBlueBar if one should exist, the bar style is decided according to the popup style.
     * Append's dom to the PopupDiv.
     * @param dom DOM to be appended.
     */
    _buildPopupWithContent(dom) {
        this._applyOverlay();
        this._buildPopupSkeleton();
        this._buildTopBlueBar();
        this._appendContent(dom);
        this._addEvents();
    };

    /**
     * @Private
     *
     * Creates popupWrapper and overlay
     */
    _applyOverlay() {
        let popupWrapper;
        if (Utils.isDefined(this._popupClass)) {
            popupWrapper = $("<div class='popupWrapper " + this._popupClass + "'><div class='overlay'></div></div>");
            this._rootDiv.append(popupWrapper);
        } else {
            popupWrapper = $("<div class='popupWrapper'><div class='overlay'></div></div>");
            this._rootDiv.append(popupWrapper);
        }
        this._popupWrapper = popupWrapper;
    };

    /**
     * @Private
     *
     * Builds Popup Skeleton, popup div with the respective PopupStyle class is created.
     */
    _buildPopupSkeleton() {
        var scope = this;
        this._popupDiv = $("<div class='popup" + " " + scope._popupStyle + "'></div>");
    };

    /**
     * @Private
     *
     * Builds Popup TopBlueBar if one should exist, the bar style is decided according to the popup style.
     */
    _buildTopBlueBar() {
        if (this._hasTopBlueBar) {
            if (this._popupStyle === "small") {
                this._popupDiv.append("<div class='topBlueBar'>" + this._title + "</div>");
            } else if (this._popupStyle === "large") {
                var titleDom = "<div class=\"title\">" + this._title + "</div><div class=\"close\"></div>";
                this._popupDiv.append("<div class='topBlueBar'>" + titleDom + "</div>");
            }
        }
    };

    /**
     * @Private
     *
     * Append's dom to the PopupDiv.
     * @param dom DOM to be appended.
     */
    _appendContent(dom) {
        this._popupDiv.append(dom);
        let oldDiv = this._popupWrapper.find(".popup");
        if (oldDiv.length === 0) this._popupWrapper.append(this._popupDiv);
        else oldDiv.replaceWith(this._popupDiv);
    };

    /**
     * @Private
     *
     * Set's up basic popup hide events.
     *
     * Events:
     * - Large popup cross click to close;
     * - Click outside popup to close;
     * - Escape key press to close;
     */
    _addEvents() {
        let scope = this;

        let closeBttn = this._rootDiv.find(".close");
        closeBttn.on("click", function () {
            scope.hide();
        });

        if (this._isClickOffEnabled) {
            let backgroundClose = this._rootDiv.find(".overlay");
            backgroundClose.on("click", function () {
                scope.hide();
            });
        }

        $(window).keyup(function (e) {
            var code = e.keyCode || e.which;
            if (code === 27)
                scope.hide(); // ESC
        });
    };

}