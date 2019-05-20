export var Utils = {
    getTasksFromPeriod: getTasksFromPeriod,
    getWeekFromDay: getWeekFromDay
};

// Input: strings x2
// Output: Json Array
function getTasksFromPeriod(start, end, callback) {
    $.ajax({
        url: "http://localhost:4000/api",
        type: "get",
        data: {start_date: start, end_date: end},
        success: callback,
        error: function(data) {console.log(data);}
    })
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

Date.prototype.format = function() {
    return this.toJSON().slice(0, -8);
};

function getWeekFromDay(date) {
    var toMove = date.getDay() === 0 ? 7 : date.getDay() -1;
    var start = date.addDays(-toMove);
    var end = start.addDays(7);

    return [start, end];
}