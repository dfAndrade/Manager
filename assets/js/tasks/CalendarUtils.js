import {Utils} from "../Utils";


function getTdFromCoords(calendar, x, y) {
    x = Math.floor(x);
    y = Math.floor(y);
    if (y % 4 === 0) x += 1;
    y += 2;

    let row = $(calendar.find("tr")[y]); // 4 row
    return $(row.find("td")[x]);         // 3 col
}

function getCoordsFromDate(date) {
    // X
    let x = date.getDay();

    // Y
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let y = Math.abs((hours * 4) + (minutes / 15));

    return {x: x, y: y};
}

function getCoordsFromTd(td) {

    let y = td.parent().index();
    let x = (y % 4 === 0 ? td.index() -1 : td.index());

    return {x: x, y: y};
}

function taskWidth(date) {

}


export var CalendarUtils = {
    getTdFromCoords: getTdFromCoords,
    getCoordsFromDate: getCoordsFromDate,
    getCoordsFromTd: getCoordsFromTd

};