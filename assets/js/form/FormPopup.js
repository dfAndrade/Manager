import {Popup} from "./Popup.js"
// import {Utils} from "../Utils.js"
import {Utils} from "../Utils.js"


// require("imports-loader?window.jQuery=jquery!../jquery-ui/jquery-ui.js");
// import "../jquery-ui/jquery-ui.js"

export class FormPopup extends Popup {

    constructor(div, popupClass) {
        super(div, popupClass);
        this._actionButtons = [];
        this._fields = {};
    }

    addField(field) {
        this._fields[field.label] = field;
        console.log(this._fields);
    }

    getField(label) {
        return this._fields[label];
    }

    triggerOnChange() {
        for (let key in this._fields) {
            if (!this._fields.hasOwnProperty(key)) continue;
            this._fields[key].onChange();
        }
    }

    get values() {
        let res = {};
        for (let key in this._fields) {
            if (!this._fields.hasOwnProperty(key)) continue;

            let elem = this._fields[key];
            res[elem.label] = elem.value;
        }
        return res;
    }

    addActionButton(title, buttonColorClass, customClass, callback) {

        let button = $("<input type='button' class='button' value='" + title + "'>");

        if (Utils.isDefined(buttonColorClass))
            button.addClass(buttonColorClass);

        if (Utils.isDefined(customClass))
            button.addClass(customClass);

        this._actionButtons.push([button, callback]);
    }



    /**
     * @Private
     *
     * Builds Popup Skeleton, adduiPopup div with the respective PopupStyle class is created.
     * Builds Popup TopBlueBar if one should exist, the bar style is decided according to the popup style.
     * Append's dom to the PopupDiv.
     * Builds Actions div and buttons
     * @param dom DOM to be appended.
     */
    _buildPopupWithContent(dom) {
        super._buildPopupWithContent.call(this, dom);
        this._buildActionsDiv(dom);
    }

    _buildActionsDiv(dom){
        let scope = this;
        let actionsDiv = $("<div class='actions'></div>");

        for (let btnIdx = 0; btnIdx < this._actionButtons.length; btnIdx++) {

            let bttnDiv      = this._actionButtons[btnIdx][0];
            let bttnCallback = this._actionButtons[btnIdx][1];
            scope._setBttnCallback(bttnDiv, bttnCallback);
            actionsDiv.append(bttnDiv);
        }

        dom.parent().append(actionsDiv);
    };

    _setBttnCallback(bttnDiv, bttnCallback) {
        let scope = this;
        bttnDiv.click(function () {
            bttnCallback.call(scope, scope._popupDiv.find("form"));
        });
    };



}