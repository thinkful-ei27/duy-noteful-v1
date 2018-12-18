'use strict';
var moment = require('moment');

const logger = function (req, res, next){
console.log(`${moment().format("dddd, MMMM Do YYYY, h:mm:ss a")} ${req.method} ${req.path}`);
next();
}

module.exports = logger;