import $ from 'jquery';

export var Utils = {
    getTasksFromPeriod: getTasksFromPeriod,
    getWeekFromDay: getWeekFromDay,
    shiftDays: shiftDays
};

// Input: strings x2
// Output: Json Array
function getTasksFromPeriod(start, end, callback) {
    $.ajax({
        url: window.location.origin + "/api",
        type: "get",
        data: {start_date: start, end_date: end},
        success: callback,
        error: function(data) {
            console.log("Error: " + data);
        }
    })
}

Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    date.setHours(0,0,0,0);
    return date;
};

Date.prototype.addMinutes = function(minutes) {
    return new Date(this.getTime() + minutes*60000);
};

Date.prototype.format = function() {
    return this.toJSON().slice(0, -8);
};

function getWeekFromDay(date) {
    let toMove = date.getDay() === 0 ? 7 : date.getDay() -1;
    let start = date.addDays(-toMove);
    let end = start.addDays(7);

    return [start, end];
}

function shiftDays(date) {
    return date.getDay() === 0 ? 6 : date.getDay() - 1;
}