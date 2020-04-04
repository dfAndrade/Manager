import {Utils} from "../../Utils";

/**
 * Generic settings element.
 *
 * Configuration parameters:
 *  - parent:         SettingsController object that contains this element.
 *  - label:          Name/Identifier for this element.
 *  - containerClass: DOM class of the container for the element.
 *  - onChange:       function to be executed after a state change.
 *  - defaultValue:   defaultValue for the element.
 *  - storagePath:    mapping path to store elements value.
 *
 * Note:
 *  - "containerClass" helps to generalize logic for elements of the same type.
 *  - "defaultValue" can be used when the window is loaded with url parameters.
 *
 * @param args configuration parameters
 * @constructor
 */

export class Field {
    constructor(parent, containerClass, args) {
        // Mandatory
        this._parent = parent;
        this._containerClass = containerClass;
        
        // Optional
        args = Utils.isDefined(args) ? args : {};
        this._label = args["label"];
        this._onChangeCB = args["onChange"];
        this._defaultValue = args["defaultValue"];
        
        this._value = null;
        this.onChange = null;

        this._init();
    }

    /**
     * Initializes self managing logic 
     * TODO: update doc 
     * @private
     */
    _init() {
        this._parent.addField(this); // Tells parent who this is
    }

    _checkValidContainer() {
        if ($("." + this._containerClass).length === 0) console.error("Container class not found: " + this._containerClass);
    }

    /**
     * Sets the on change event to update innerValue
     * and proc user defined callback.
     *
     * Note: The cb is executed as the element, i.e, this.getValue()
     * will return the value stored in the settings element
     */
    _setOnChange() {
        let self = this;
        this.onChange = function() {
            self.value = self.innerGetValue(); // Update inner value
            if (self._onChangeCB) self._onChangeCB.call(self); // call user defined callback
        };
        this.innerMapOnChange(); // Map the event that will trigger onChange
    }

    /**
     * Sets a default value, triggers update.
     * @param defaultValue
     */
    _setDefault(defaultValue) {
        if (this.innerValidateValue(defaultValue)) {
            // Update with default value
            this.value = defaultValue;
            this.onChange();
        } else {
            // Initialize current value
            this.value = this.innerGetValue();
        }
    }

    /**
     * Set which event will trigger "this.onChange()"
     */
    innerMapOnChange() {
        console.log("innerMapOnChange not implemented");
        console.trace();
    }
    /**
     * Sets the value from the dom element ( see examples ).
     */
    innerSetValue(value) {
        console.log("innerSetValue not implemented");
    }

    /**
     * Returns the value from the dom element ( see examples ).
     */
    innerGetValue() {
        console.log("innerGetValue not implemented");
    }

    /**
     * Verifies value for update
     * @returns {boolean}
     */
    innerValidateValue(value) {
        return Utils.isDefined(value);
    }

    /**
     * Attaches events and updates dom
     * TODO: update doc
     */
    build() {
        this._setOnChange(); // Sets update logic
        this._setDefault(this._defaultValue); // Sets a default value
    }

    destroy() {}


    /**
     * Sets the value of the setting, both internally and of the dom.
     * @param value
     */
    set value(value) {
        this._value = value;
        this.innerSetValue(value);
    }

    /**
     * Returns the current value of the setting.
     * @returns {null|*}
     */
    get value() {
        return this._value;
    }

    /**
     * Returns the user defined label, if none was set returns the
     * containerClass instead.
     * @returns {*}
     */
    get label() {
        return Utils.isDefined(this._label) ? this._label : this._containerClass;
    }

}













//
// /**
//  * Wrapper for RadioButton style settings
//  * @param args same as SettingsElement
//  * @constructor
//  */
// function SettingsRadio (args) {
//     SettingsElement.call(this, args);
// }
// SettingsRadio.prototype = Object.create(SettingsElement.prototype);
//
//
// SettingsRadio.prototype.innerSetValue = function (value) {
//     if (!utils.IsDefined(value)) return;
//     $(this._pContainerClass + " input[value=" + value + "]").prop("checked", true);
// };
//
// SettingsRadio.prototype.innerGetValue = function () {
//     return $(this._pContainerClass + " input:checked").val();
// };
//
// SettingsRadio.prototype.innerMapOnChange = function () {
//     $(this._pContainerClass + " input").change(this.onChange);
// };
//
//
//
//
// // TODO Finish implementing this class
// function SettingsSelect(args) {
//     SettingsElement.call(this, args);
// }
// SettingsSelect.prototype = Object.create(SettingsElement.prototype);
//
// SettingsSelect.prototype.innerSetValue = function (value) {
//     if (!utils.IsDefined(value)) return;
//     $(this._pContainerClass + " option:contains(" + value + ")").prop("selected", true);
// };
//
//
//
//
// function SettingsZoneSelector(args) {
//     this._pDropdownElement = args["ddElement"];
//     SettingsElement.call(this, args);
// }
// SettingsZoneSelector.prototype = Object.create(SettingsElement.prototype);
//
// SettingsZoneSelector.prototype.innerGetValue = function () {
//     return this._pDropdownElement.getSelected();
// };
//
// SettingsZoneSelector.prototype.innerSetValue = function (value) {
//     this._pDropdownElement.setSelected(value);
// };
//
// SettingsZoneSelector.prototype.innerMapOnChange = function () {
//     this._pDropdownElement.setCallback(this.onChange);
// };
//
// SettingsZoneSelector.prototype.innerValidateValue = function (value) {
//     return utils.IsDefined(value);
// };
//
//
//
// function SettingsPeriodSelector(args) {
//     this._pPeriodSelector = args["periodSelector"];
//     SettingsElement.call(this, args);
// }
// SettingsPeriodSelector.prototype = Object.create(SettingsElement.prototype);
//
// SettingsPeriodSelector.prototype.innerGetValue = function () {
//     return {
//         start: this._pPeriodSelector.getStartDate().toLocalDateString(),
//         end: this._pPeriodSelector.getEndDate().toLocalDateString()
//     };
// };
//
// SettingsPeriodSelector.prototype.innerSetValue = function (value) {
//     this._pPeriodSelector.updatePeriodSelector(value["start"], value["end"]);
// };
//
// SettingsPeriodSelector.prototype.innerMapOnChange = function () {
//     this._pPeriodSelector._pCallback = this.onChange;
// };
//
//
// SettingsPeriodSelector.prototype.innerValidateValue = function (value) {
//     return utils.IsDefined(value);
// };
//
//
//
//
//
//
//
//
// function SettingsSearch (args) {
//     SettingsElement.call(this, args);
// }
// SettingsSearch.prototype = Object.create(SettingsElement.prototype);
//
//
// SettingsSearch.prototype.innerMapOnChange = function () {
//     $(this._pContainerClass).change(this.onChange);
// };
//
// SettingsSearch.prototype.innerGetValue = function () {
//     return $(this._pContainerClass).val();
// };
//
// SettingsSearch.prototype.innerSetValue = function (value) {
//     $(this._pContainerClass).val(value);
// };
