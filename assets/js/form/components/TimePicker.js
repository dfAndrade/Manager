import {Field} from "./Field"
require("../datetime_picker/jquery-clockpicker.min.js");
import '../../addons/clockpicker';

export class TimePicker extends Field {
    build() {
        super.build();
        let self = this;
        let datePicker = $("." + this._containerClass);
        datePicker.clockpicker({
            default: self.value,
            placement: "bottom",
            autoclose: true,
            afterDone: self.onChange
        });
    }

    destroy() {
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