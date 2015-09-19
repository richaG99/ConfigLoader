var util=require('./configLoader');
var x=new util('./config/configFile.txt',['ubuntu','production']);

var businessLogic=function(err)
{
    if(err)
    {
        console.log("error happened........");
        process.exit();

    }
    x.get('ftp');

};

x.loadConfig(businessLogic);




