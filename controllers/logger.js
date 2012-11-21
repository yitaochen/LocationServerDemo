// logger.js
// by vampirefan
// for logfiles
// --------------------------------------------
var winston = require('winston');
var logger = new(winston.Logger)({
    transports: [
    new(winston.transports.Console)(), new(winston.transports.File)({
        filename: './logfiles/consoles.log'
    })]
});

winston.handleExceptions(new winston.transports.File({ filename: './logfiles/exceptions.log' }));

module.exports = logger;