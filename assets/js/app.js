// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"

import "./Utils.js"
import $ from "jquery";
import calendar from "./tasks/calendar.js"

$(function () {                // to make $ have access to built dom
    if (window.up === undefined) {
        window.$ = $;
        window.up = true;
    }
    calendar();
});
// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"
