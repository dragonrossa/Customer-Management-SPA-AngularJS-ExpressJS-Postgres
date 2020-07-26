var winston = require('winston');
require('winston-daily-rotate-file');

const logFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(
        info => `${info.timestamp} ${info.level} ${info.message}`
    )
);

winston.loggers.add('customLogger',{
    format:logFormat,
    transports:[
        new winston.transports.DailyRotateFile({
            filename:'./logs/custom-%DATE%.log',
            datePattern:'YYYY-MM-DD',
            level:'info',
        }),
        new winston.transports.Console({
            level:'info',
        }),
    ],
});

logger = winston.loggers.get('customLogger');
//this.logger.log('info', 'this is the example!');
logger.info('Hello World!');


module.exports = logger
