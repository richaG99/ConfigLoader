var util=require('./configLoader');
var app=new util('./config/configFile.txt',['ubuntu','production']);
var logger=require('../logger');

var businessLogic=function(err)
{
    if(err)
    {
        logger.error("config load failure."+"\n" , JSON.stringify(err));
    }
    else
        logger.info(" ftp value " + JSON.stringify(app.get('http')));

};

app.loadConfig(businessLogic);




