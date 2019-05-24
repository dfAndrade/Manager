import {Utils} from "../Utils.js";
import css from "../../css/tasks/calendar.css"
import $ from 'jquery';


class Calendar {
    constructor() {
        this.date = new Date();
        let week = Utils.getWeekFromDay(this.date);
        Utils.getTasksFromPeriod(week[0].format(), week[1].format(), function(tasks) {console.log(tasks);});
    }
}

function init() {
    $(function () {
        if ($(".calendar").length === 0) return;
        linkCalendarClick();
        loadWeekTasks();
        lockTableHeaderShadow();
    });
}

init();

function placeEventDiv(offsetBoxCallBack, color, customClass, content) {

    // [x, y, width, height], color
    var offsetBox = offsetBoxCallBack();

    console.log(offsetBox);

    var new_event = $("<div class='eventWrapper " + (customClass!== undefined ? customClass: "") + "'></div>").css({
        left: offsetBox[0],
        top: offsetBox[1],
        width: offsetBox[2],
        height: offsetBox[3],
    });

    if (color) {
        new_event.css("background", color);
    }

    if (content) {
        new_event.attr("display_text", content);
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

    var td = $(".calendar td:not(.hour)");

    var width = td[0].offsetWidth;        // reference same div to fix
    var tdHeight = td[0].offsetHeight;    // align issues

    console.log("w: " + width + " h: " + tdHeight);


    var coords = getCoordsFromTd(parent);
    var height = (tdHeight * 4) + 1;

    var borderOffset = Math.floor(coords[1] / 4);

    var relX = coords[0] * width;
    var relY = (coords[1] * tdHeight) + calendar.find("thead")[0].offsetHeight + borderOffset;

    return {top: relY, left: relX, width: width, height: height};
}

// Returns [x, y, width, height]
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


    // noinspection JSSuspiciousNameCombination
    return [Math.floor(x), Math.floor(y), Math.floor(divWidth * .9), Math.floor(span * divHeight)];
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
        },null, "temp", "+ New event");
    };

    $(".calendar").data("calendar", new Calendar());

    $(".calendar").on("click_b", function () {
        console.log("thsi");
    });

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
    var table = $(".calendar:not(.headerOnly)");
    table.css("marginTop", -table.find("thead")[0].offsetHeight);
    $(window).on('resize scroll', update(bar));
    $(window).trigger("resize");
}

function getCoordsFromTd(td) {
    var pIdx = td.parent().index();
    var day = (pIdx)%4===0 ? td.index()-1 : td.index();
    return [++day, pIdx];
};

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