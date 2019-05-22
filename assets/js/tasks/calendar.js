import {Utils} from "../Utils.js";

class Calendar {
    constructor() {
        this.date = new Date();
        let week = Utils.getWeekFromDay(this.date);
        Utils.getTasksFromPeriod(week[0].format(), week[1].format(), function(tasks) {console.log(tasks);});
    }
}

export default function init() {
    linkCalendarClick();
    loadWeekTasks();
    lockTableHeaderShadow();
};

function placeEventDiv(offsetBoxCallBack, color, customClass) {

    // [x, y, width, height], color
    var offsetBox = offsetBoxCallBack();

    var new_event = $("<div class='eventWrapper " + (customClass!== undefined ? customClass: "") + "'></div>").css({
        left: offsetBox[0],
        top: offsetBox[1],
        width: offsetBox[2],
        height: offsetBox[3],
    });

    if (color) {
        new_event.css("background", color);
    }

    $(".shadowHidden").append(new_event);

    // Function to resize taskBox with window resize
    var resizeUpdate = function() {
        var coords = offsetBoxCallBack();

        new_event.css({
            left: coords[0],
            top: coords[1],
            width: coords[2],
            height: coords[3]
        });
    };

    $(window).resize(resizeUpdate);
}

// Return the offset to place taskBox
function getOffSet(parent) {
    var calendar = $(".calendar:not(.headerOnly)");

    var width = $(".calendar td:not(.hour)")[0].offsetWidth; // reference same div to fix
    var height = parent[0].offsetHeight * 4;                 // align issues

    var pIdx = parent.parent().index();
    var day = (pIdx)%4===0 ? parent.index()-1 : parent.index();

    var relX = ++day * width;
    var relY = parent.offset().top - calendar.offset().top;

    return {top: relY, left: relX, width: width, height: height};
}

// Returns [x, y, width, height]
function getBoxFromTask(task) {

    var td = $(".calendar td:not(.hour)");

    var divHeight = td[0].offsetHeight;
    var divWidth = td[0].offsetWidth;
    console.log("TASK width: " + divWidth);

    var dateStart = new Date(Date.parse(task.start_date));
    var dateEnd = new Date(Date.parse(task.end_date));

    var x = dateStart.getDay() * divWidth;
    var hours = dateStart.getHours();
    var minutes = dateStart.getMinutes() + (--hours * 60);
    var y = (minutes / 15 * divHeight) + $(".calendar thead")[0].offsetHeight;
    var span = (dateEnd - dateStart)  / 1000 / 60 / 15;

    //
    // noinspection JSSuspiciousNameCombination
    return [Math.round(x), Math.round(y), Math.round(divWidth * .9), Math.round(span * divHeight)];
}

function loadWeekTasks() {

    var placeTasks = function(tasks) {

        for (var i = 0; i < tasks.length; i++) {
            var task = tasks[i];

            placeEventDiv(function () {
               return getBoxFromTask(task);
            }, task.color);
        }

    };

    var date = new Date();
    let week = Utils.getWeekFromDay(date);
    Utils.getTasksFromPeriod(week[0].format(), week[1].format(), placeTasks);
}

function linkCalendarClick() {
    var clickOnTd = function() {

        // For now only set new tasks on even 15min blocks
        var wrapper = $(".eventWrapper.temp");
        if (wrapper.length) {
            wrapper.remove();
            return;
        }

        var td = $(this);

        placeEventDiv(function () {
            var res = getOffSet(td);
            return [res.left, res.top, Math.round(res.width * .9), res.height];
        },null, "temp");

    };

    $(".calendar").data("calendar", new Calendar());

    $(".calendar td:not(.hour)").on("click", null, clickOnTd);
}

function lockTableHeaderShadow() {
    var update = function (bar) {
        return function() {
            var y = bar[0].getBoundingClientRect().top;

            if (y <= 0) {
                bar.addClass("shadow");
            } else {
                bar.removeClass("shadow");
            }
        }
    };

    var bar = $(".calendar.headerOnly");
    $(window).on('resize scroll', update(bar));
    $(window).trigger("resize");
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
    return $(row.find("td")[cords[0]]);     // 3 col
};

// function placeTaskDiv(task) {
//     var coords = getBoxFromTask(task);
//
//
//     // [x, y, width, height], color
//     var new_event = $("<div class='eventWrapper'></div>").css({
//         left: coords[0],
//         top: coords[1],
//         width: coords[2],
//         height: coords[3],
//     });
//
//     if (task.color) {
//         new_event.css("background", task.color);
//     }
//
//     $(".calendarWrapper").append(new_event);
//
//     // Function to resize taskBox with window resize
//     var resizeUpdate = function() {
//         var coords = getBoxFromTask(task);
//
//         new_event.css({
//             left: coords[0],
//             top: coords[1],
//             width: coords[2],
//             height: coords[3]
//         });
//         if (task.color) {
//             new_event.css("background", task.color);
//         }
//     };
//
//     $(window).resize(resizeUpdate);
// }