import {DatePicker} from "./DatePicker"
require("../datetime_picker/jquery-clockpicker.min.js");
import '../../addons/clockpicker';

export class TimePicker extends DatePicker {
    _build() {
        let self = this;
        let datePicker = $("." + this._containerClass);
        datePicker.clockpicker({
            default: self.value,
            placement: "bottom",
            autoclose: true,
            afterDone: self.onChange
        });
    }

    _destroy() {
        console.log("REMOVE");
        $("." + this._containerClass).clockpicker("remove");
    }

    innerGetValue() {
        return $("." + this._containerClass).val();
    };

    innerSetValue(value) {
        $("." + this._containerClass).val(value);
    };

    innerMapOnChange() {
        // Done in build()
    };


}