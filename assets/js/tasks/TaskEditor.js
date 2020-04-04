import { FormPopup } from "../form/FormPopup";
import { DatePicker } from "../form/components/DatePicker";
import { TimePicker } from "../form/components/TimePicker";
import { ColorPicker } from "../form/components/ColorPicker";
import { TextField } from "../form/components/TextField";

export class TaskEditor extends FormPopup {

    constructor(div, customClass) {
        super(div, customClass);
        this._title = null;
        this._priority = null;
        this._color = null;
        this._start = null;
        this._end = null;
        this._startTime = null;
        this._endTime = null;

        this._init();
    }

    _init() {
        this._startTime = new TimePicker(this, "startTime");
        this._endTime = new TimePicker(this, "endTime");
        this._start = new DatePicker(this, "startDate");
        this._end = new DatePicker(this, "endDate");
        this._color = new ColorPicker(this, "colorPicker", { label: "color" });
        this._priority = new TextField(this, "priorityPicker", { label: "priority" });
        this._title = new TextField(this, "titleSelector", { label: "title" });
    }
}