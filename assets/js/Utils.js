import $ from 'jquery';

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

Date.prototype.format = function(format) {
    let options = {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit',
    };

    let formatter = new Intl.DateTimeFormat('pt-PT', options);
    let [{ value: day },,{ value: month },,{ value: year },,{ value: hours },,{ value: minutes }] = formatter.formatToParts(this);

    if ( "datetime" === format ) return day + "-" + month + "-" + year + "T" + hours + ":" + minutes;
    if ( "date" === format ) return day + "/" + month + "/" + year;
    if ( "time" === format ) return hours + ":" + minutes;
    if ( "iso8601" === format ) return year + "-" + month + "-" + day + "T" + hours + ":" + minutes; // 2015-01-23T23:50:07
    return day + "-" + month + "-" + year + "T" + hours + ":" + minutes;
};

function getWeekFromDay(date) {
    let toMove = date.getDay() === 0 ? 7 : date.getDay() -1;
    let start = date.addDays(-toMove);
    let end = start.addDays(7);
    console.log("date?", date.toJSON());
    console.log("toMove", toMove);
    console.log("start", start);



    return [start, end];
}

function shiftDays(date) {
    return date.getDay() === 0 ? 6 : date.getDay() - 1;
}

function isDefined(arg) {
    return !(arg === null || arg === undefined);
}

export var Utils =  {
    getTasksFromPeriod: getTasksFromPeriod,
    getWeekFromDay: getWeekFromDay,
    shiftDays: shiftDays,
    isDefined: isDefined
};