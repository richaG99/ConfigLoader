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
     app.get('ftp');

};

app.loadConfig(businessLogic);




