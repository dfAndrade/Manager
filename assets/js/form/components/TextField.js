import { Field } from "./Field";

export class TextField extends Field {
    

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