import {Utils} from "../Utils.js";
import css from "../../css/tasks/calendar.css"
import $ from 'jquery';


class Calendar {
    constructor() {
        this.today = new Date();
        let weekFromDay = Utils.getWeekFromDay(this.today);
        console.log("constructor");
        console.log(weekFromDay);
        this.weekStart = weekFromDay[0];
    }

    linkCalendarClick() {
        let self = this;

        function clickOnTd() {
            // For now only set new tasks on even 15min blocks

            let wrapper = $(".eventWrapper.temp");
            if (wrapper.length) {
                wrapper.remove();
                return;
            }

            let td = $(this);
            let test = Calendar.getCoordsFromTd(td);

            let newEvent = self.placeEventDiv(function () {
                let res = self.getOffSet(td);
                return [res.left, res.top, Math.round(res.width * .9), res.height];
            }, null, "temp", "+ New event");

            let startDate = self.weekStart.addDays(test[0] + 1).addMinutes(test[1] * 15);

            newEvent.attr("start_date", startDate.format()); // TODO figure how to get the dates here
            newEvent.attr("end_date", startDate.addMinutes(90).format()); // TODO figure how to get the dates here
            // TODO or if it would be easier to do it in "placeEventDiv"
        }

        $(".calendar td:not(.hour)").on("click", null, clickOnTd);


    }

    placeEventDiv(offsetBoxCallBack, color, customClass, content) {

        // [x, y, width, height], color
        let offsetBox = offsetBoxCallBack();
        // var meta = getDivMeta();

        let new_event = $("<div class='eventWrapper " + (customClass !== undefined ? customClass : "") + "'></div>").css({
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
        let resizeUpdate = function () {
            let coords = offsetBoxCallBack();

            new_event.css({
                left: coords[0],
                top: coords[1],
                width: coords[2],
                height: coords[3]
            });
        };

        $(window).resize(resizeUpdate);

        return new_event;
    }

    loadWeekTasks() {
        let self = this;
        function placeTasks(tasks) {

            function temp(task) {
                self.placeEventDiv(function () {
                    return self.getBoxFromTask(task);
                }, task.color, null, task.title);
            }

            for (let i = 0; i < tasks.length; i++) {
                temp(tasks[i]);
            }

        }

        let date = new Date();
        let week = Utils.getWeekFromDay(date);
        Utils.getTasksFromPeriod(week[0].format(), week[1].format(), placeTasks);
    }

    // Return the offset to place taskBox
    getOffSet(parent) {
        let self = this;
        let td = $(".calendar td:not(.hour)");

        let width = td[1].offsetWidth;        // reference same div to fix
        let tdHeight = td[1].offsetHeight;    // align issues
        let height = (tdHeight * 4) - (tdHeight / 4);

        let coords = Calendar.getPosFromTd(parent);

        let relX = coords[0];
        let relY = coords[1];

        self.weekStart.addDays();


        return {top: relY, left: relX, width: width, height: height};
    }

    // Returns [x, y, width, height] // TODO return date_start and end
    getBoxFromTask(task) {
        let self = this;
        let td = $(".calendar td:not(.hour)");

        let divHeight = td[0].offsetHeight;
        let divWidth = td[0].offsetWidth;

        let dateStart = new Date(Date.parse(task.start_date));
        let dateEnd = new Date(Date.parse(task.end_date));

        let hours = dateStart.getHours();
        let span = (dateEnd - dateStart) / 1000 / 60 / 15;

        let test = Calendar.getTdFromCoords(Utils.shiftDays(dateStart), hours * 4);

        let top = test.position().top + (dateStart.getMinutes() * divHeight / 15);

        // noinspection JSSuspiciousNameCombination
        return [
            test.position().left,
            top,
            Math.floor(divWidth * .9),
            Math.floor(span * divHeight) - (divHeight / 4),
            dateStart,
            dateEnd
        ];
    }


    static getPosFromTd(td) {
        return [td.position().left, td.position().top];

    }

    static getTdFromCoords(x, y) {
        if (y % 4 === 0) x += 1;
        y += 2;

        let row = $($(".calendar tr")[y]); // 4 row
        return $(row.find("td")[x]);     // 3 col
    }

    static getCoordsFromTd(td) {

        let y = td.parent().index();
        let x = (y % 4 === 0 ? td.index() -1 : td.index());

        return [x, y];
    }
}

function init() {
    $(function () {
        if ($(".calendar").length === 0) return;
        let cal = new Calendar();
        console.log(cal);
        cal.linkCalendarClick();
        // linkCalendarClick();
        cal.loadWeekTasks();
        lockTableHeaderShadow();
    });
}

init();

function lockTableHeaderShadow() {
    function update(bar) {
        return function () {
            let y = bar[0].getBoundingClientRect().top;

            if (y <= 0) {
                bar.addClass("shadow");
            } else {
                bar.removeClass("shadow");
            }
        }
    }

    let bar = $(".calendar.headerOnly");
    let table = $(".calendar:not(.headerOnly)");
    table.css("marginTop", -table.find("thead")[0].offsetHeight);
    $(window).on('resize scroll', update(bar));
    $(window).trigger("resize");
}