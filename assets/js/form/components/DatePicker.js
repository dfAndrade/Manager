import {Field} from "./Field";
require('webpack-jquery-ui/datepicker');
require('webpack-jquery-ui/fold-effect');
require('jquery-ui/ui/i18n/datepicker-pt.js');
import '../../addons/jquery-ui';

$.datepicker.setDefaults( $.datepicker.regional[ "pt" ] );

export class DatePicker extends Field {
    constructor(opts) {
        super(opts);
        this._dinit();
    }

    _dinit() {
        let self = this;
        let oldShowCB = this._parent.show;
        this._parent.show = function(cb) {
            oldShowCB.call(self._parent, function () {
                self._build();
                if (cb) cb();
            });
        };

        let oldHideCB = this._parent.hide;
        this._parent.hide = function(cb) {
            self._destroy();
            oldHideCB.call(self._parent, cb);
        };


    }

    _build() {
        let self = this;
        let datePicker = $("." + this._containerClass);
        datePicker.datepicker({
            dateFormat: "dd/mm/yy",
            onSelect: self.onChange,
            showAnim: "fadeIn",
            defaultDate: self.value
        });
    }

    _destroy() {
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