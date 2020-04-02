import {Utils} from "../Utils";
import {CalendarUtils} from "./CalendarUtils";

/**
 * Element that will populate calendar with task info
 */
export class Task {

    constructor(opts) {
        this._parent = null;
        this._wrapper = null;
        this._customClass = null;

        this._title = null;
        this._priority = null;
        this._color = null;
        this._id = null;

        this._startDate = null;
        this._endDate = null;

        this._init(opts);
    }

    _init(opts) {
        this._parent = opts["parent"];
        this._startDate = opts["start"];
        this._endDate = opts["end"];
        this._title = opts["title"];
        this._priority = opts["priority"];
        this._color = opts["color"];
        this._id = opts["id"];

        this._createDom();

        // TODO append attributes to div?

        this._parent.append(this._wrapper);
    }

    _createDom() {
        let eventDom = $("<div class='eventWrapper " + (Utils.isDefined(this._customClass) ? this._customClass : "") + "'></div>");

        if (Utils.isDefined(this._color)) {
            eventDom.css("background", this._color);
        }

        if (Utils.isDefined(this._title)) {
            eventDom.append($("<div class='content'>" + this._title + "</div>"));
        }

        this._wrapper = eventDom;

    }

    get startDate() {
        return this._startDate;
    }

    get endDate() {
        return this._endDate;
    }

    place() {

        // same day start/end
        if (this._startDate.getDay() - this._endDate.getDay() === 0) {
            this._resolveParamsForSameDay();
        } else {
            // diff days
            // check for week change
        }
    }

    remove() {
        this._wrapper.remove();
    }

    /**
     * Sets the onclick callback for tasks.
     * @param callback
     */
    set onCLick(callback) {
        let self = this;
        if(Utils.isDefined(callback)) {
            this._wrapper.on("click", function() {
                callback.call(self);
            });
        }
    }

    _resolvePosition(position, td) {
        let spacing = 10;
        let offset = td.getOffset();

        let x,y = 0;

        if ("up" === position) {

        } else if ("down" === position) {

        } else if ("left" === position) {

        } else if ("right" === position) {

        }
    }

    _resolveParamsForSameDay() {
        // Position
        let coords = CalendarUtils.getCoordsFromDate(this._startDate);
        let td = CalendarUtils.getTdFromCoords(this._parent, coords.x, coords.y);

        let offset = td.offset();
        offset["top"] += this._startDate.getMinutes() % 15;

        this._wrapper.offset(offset);

        // Size
        let span = Utils.diffDates(this._endDate, this._startDate, "minutes") / 15;
        let height = (span * td.height());

        this._wrapper.width(td.width() * .9);
        this._wrapper.height(height);
    }
}