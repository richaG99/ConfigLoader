/**
 * Created by richa on 06/09/15.
 */
var winston=require('winston');
winston.emitErrs=true;
var logger;

logger=new winston.Logger({
    transports:[new winston.transports.DailyRotateFile({
        name:'conf-error-file',
        level:'error',
        filename:'./logs/conf-error-logs.log',
        datePattern:'.yyyy-MM-dd',
        handleExceptions:true,
        json:true,
        maxFiles:5,
        colorize:false
    })
        ,
        new winston.transports.DailyRotateFile({
            name:'conf-info-file',
            level:'info',
            filename:'./logs/conf-info-logs.log',
            datePattern:'.yyyy-MM-dd',
            handleExceptions:true,
            json:true,
            maxFiles:5,
            colorize:false
        }),

        new winston.transports.DailyRotateFile({
            name:'conf-debug-file',
            level:'debug',
            filename:'./logs/conf-debug-logs.log',
            datePattern:'.yyyy-MM-dd',
            handleExceptions:true,
            json:true,
            maxFiles:5,
            colorize:false
        }),
       new winston.transports.Console({
           level:'debug',
           handleExceptions:true,
           json:false,
           colorize:true
       })

    ],
    exitOnError:false

});

module.exports=logger;