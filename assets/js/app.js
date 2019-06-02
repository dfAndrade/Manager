// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"

import "./Utils.js"
// import $ from "jquery";

const $ = require("jquery");
// import calendar from "./tasks/calendar.js"

if (window.up === undefined) {
    window.$ = $;
    window.jQuery = $;
    window.up = true;
}
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
