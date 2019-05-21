import {Utils} from "../Utils.js";

class Calendar {
    constructor() {
        this.date = new Date();
        let week = Utils.getWeekFromDay(this.date);
        Utils.getTasksFromPeriod(week[0].format(), week[1].format(), function(tasks) {console.log(tasks);});
    }
}

function placeTaskDiv(task) {
    var coords = getBoxFromTask(task);
    console.log("test: " + coords);

    var new_event = $("<div class='eventWrapper'></div>").css({
        left: coords[0],
        top: coords[1],
        width: coords[2],
        height: coords[3],
    });

    if (task.color) {
        new_event.css("background", task.color);
    }

    $(".calendarWrapper").append(new_event);

    // Function to resize taskBox with window resize
    var resizeUpdate = function() {
        var coords = getBoxFromTask(task);

        new_event.css({
            left: coords[0],
            top: coords[1],
            width: coords[2],
            height: coords[3]
        });
        if (task.color) {
            new_event.css("background", task.color);
        }
    };

    $(window).resize(resizeUpdate);

    // td.css({
    //     background: task.color
    // });
}

// Return the offset to place taskBox
function getOffSet(parent) {

    var calendar = $(".calendar");

    var relX = parent.offset().left - 8;
    var relY = parent.offset().top - calendar.offset().top;

    var width = parent[0].offsetWidth;
    var height = parent[0].offsetHeight * 4;

    return {top: relY, left: relX, width: width, height: height};
}

function getCoordsFromDateQuarter() {
    var x = date.getDay();
    var hours = date.getHours();
    var minutes = (Math.floor((date.getMinutes() + 7.5)/15) * 15) % 60;
    console.log("Hour: " + hours);
    console.log("Minutes: " + minutes);
    var span = Math.round(((hours-1) * 4) + minutes);
    return [x, span];
}

function getBoxFromTask(task) {

    var td = $(".calendar td:not(.hour)");

    var divHeight = td[0].offsetHeight;
    var divWidth = td[0].offsetWidth;

    var dateStart = new Date(Date.parse(task.start_date));
    var dateEnd = new Date(Date.parse(task.end_date));

    var x = dateStart.getDay() * divWidth;
    var hours = dateStart.getHours();
    var minutes = dateStart.getMinutes() + (--hours * 60);
    var y = (minutes / 15 * divHeight) + $(".calendar thead")[0].offsetHeight;
    var span = (dateEnd - dateStart)  / 1000 / 60 / 15;

    // x, y, width, height
    // noinspection JSSuspiciousNameCombination
    return [Math.round(x), Math.round(y), Math.round(divWidth * .9), Math.round(span * divHeight)];
}

var getTdFromCoords = function (x, y) {

    var parseCoords = function(inX, inY) {
        var x, y;

        if ((inY)%4 === 0) {
            x = inX + 1;
        } else {
            x = inX;
        }
        y = ++inY;

        return [x, y];
    };

    var cords = parseCoords(x, y);
    var row = $($(".calendar tr")[cords[1]]); // 4 row
    console.log("row: " + row.length);
    return $(row.find("td")[cords[0]]);     // 3 col
};

export default function init() {
    linkCalendarClick();
    loadWeekTasks();
    lockTableHeaderShadow();
};

function loadWeekTasks() {

    var placeTasks = function(tasks) {

        for (var i = 0; i < tasks.length; i++) {
            var task = tasks[i];
            placeTaskDiv(task);
            console.log(getBoxFromTask(task));
        }

    };

    var date = new Date();
    let week = Utils.getWeekFromDay(date);
    Utils.getTasksFromPeriod(week[0].format(), week[1].format(), placeTasks);
}

function linkCalendarClick() {
    var clickOnTd = function() {

        // For now only set new tasks on even 15min blocks
        if ($(".eventWrapper.temp").length) {
            $(".eventWrapper.temp").remove();
            return;
        }

        var td = $(this);

        var offset = getOffSet(td);


        var new_event = $("<div class='eventWrapper temp'></div>").css({
            width: offset.width * .9,
            height: offset.height,
            top: offset.top,
            left: offset.left
        });

        $(".calendarWrapper").append(new_event);

        // Function to resize taskBox with window resize
        var resizeUpdate = function() {
            var offset = getOffSet(td);

            new_event.css({
                width: offset.width * .9,
                height: offset.height,
                top: offset.top,
                left: offset.left
            });
        };



        $(window).resize(resizeUpdate);

    };



    $(".calendar").data("calendar", new Calendar());

    $(".calendar td:not(.hour)").on("click", null, clickOnTd);
}

function lockTableHeaderShadow() {
    var update = function (bar) {
        return function() {
            var y = bar[0].getBoundingClientRect().top;


            console.log("Y: " + y + " offset: " + bar[0].offsetHeight);
            if (y <= 0) {
                bar.addClass("shadow");
            } else {
                bar.removeClass("shadow");
            }
        }
    };

    // var shadow = $("<div class=\"headerShadow\"></div>");
    //
    var bar = $(".calendar.headerOnly");
    $(window).on('resize scroll', update(bar));
    $(window).trigger("resize");
}