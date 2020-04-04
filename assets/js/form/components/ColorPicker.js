import { Field } from "./Field";

export class ColorPicker extends Field {
    constructor(parent, containerClass, args) {
        super(parent, containerClass, args);
    }

    innerGetValue() {
        return $("." + this._containerClass).val();
    };

    innerSetValue(value) {
        $("." + this._containerClass).val(value);
    };

    innerMapOnChange() {
        $("." + this._containerClass).change(this.onChange);
    };

}