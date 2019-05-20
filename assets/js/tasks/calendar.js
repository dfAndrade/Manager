import {Utils} from "../Utils.js";
export var GET = { run: function() {
        return new Calendar();
    }};

class Calendar {
    constructor() {
        this.date = new Date();
        let week = Utils.getWeekFromDay(this.date);
        Utils.getTasksFromPeriod(week[0].format(), week[1].format(), function(tasks) {console.log(tasks);});
    }
}

export default function init() {
    var cb = function(event, cal_event) {

        // For now only set new tasks on even 15min blocks
        var td = $(this);
        var calendar = $(".calendar");

        var relX = td.offset().left - 8;
        var relY = td.offset().top - calendar.offset().top;

        var width = td[0].offsetWidth;
        var height = td[0].offsetHeight * 4;

        console.log("X: " + event.pageX + " Y: " + event.pageY);




        var new_event = $("<div class='eventWrapper'></div>").css({
            width: width,
            height: height,
            top: relY,
            left: relX
        });

        $(".calendarWrapper").append(new_event);
    };

    $(".calendar").data("calendar", new Calendar());

    $("td:not(.hour)").on("click", null, cb);
    $(".calendar").on("calendar_add_event", cb);
};

