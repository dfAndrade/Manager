import {Field} from "./Field";
require('webpack-jquery-ui/datepicker');
require('webpack-jquery-ui/fold-effect');
require('jquery-ui/ui/i18n/datepicker-pt.js');
import '../../addons/jquery-ui';

$.datepicker.setDefaults( $.datepicker.regional[ "pt" ] );

export class DatePicker extends Field {
    constructor(parent, conrainerClass, opts) {
        super(parent, conrainerClass, opts);
    }

    build() {
        super.build();
        let self = this;
        let datePicker = $("." + this._containerClass);
        datePicker.datepicker({
            dateFormat: "dd/mm/yy",
            onSelect: self.onChange,
            showAnim: "fadeIn",
            defaultDate: self.value
        });
    }

    destroy() {
        $("." + this._containerClass).datepicker("destroy");
    }

    innerGetValue() {
        return $("." + this._containerClass).val();
    };

    innerSetValue(value) {
        $("." + this._containerClass).datepicker("setDate", value);
    };

    innerMapOnChange() {
        // Done in build()
    };
}