import {FormPopup} from "../form/FormPopup";
import {DatePicker} from "../form/components/DatePicker";
import {TimePicker} from "../form/components/TimePicker";

export class TaskEditor extends FormPopup {

    constructor(div, customClass) {
        super(div, customClass);
        this._title = null;
        this._priority = null;
        this._color = null;
        this._start = null;
        this._end = null;
        this._time = null;

        this._init();
    }

    _init() {
        this._initStart();
        this._initEnd();
        this._initClock();
    }

    _initClock() {
        let opts = {};

        opts["parent"] = this;
        opts["label"] = "time";
        opts["containerClass"] = "startTime";

        this._time = new TimePicker(opts);
    }

    _initStart() {
        let opts = {};

        opts["parent"] = this;
        opts["label"] = "start";
        opts["containerClass"] = "startDate";

        this._start = new DatePicker(opts);
    }

    _initEnd() {
        let opts = {};
        opts["parent"] = this;
        opts["label"] = "end";
        opts["containerClass"] = "endDate";

        this._end = new DatePicker(opts);
    }
}