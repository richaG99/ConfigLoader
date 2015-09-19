/**
 * Created by richa on 06/09/15.
 */
var logger=require('../logger');
var configUtil = require('./configUtility');

var configClass=function(configPath,overrides)
{
    logger.debug("configPath : "+configPath);
    logger.debug("overrides  :" +overrides);

    var isConfigLoaded = false ;

    var configPath=configPath;
    var overrides=overrides;
    var configObj={};

    this.loadConfig=function(callback )
    {
        logger.info("config load started");
        var params={};
        params.path=configPath;
        params.enabledOverRides=overrides;
        params.configObject=configObj;

        logger.info("params : "+ JSON.stringify(params));
        configUtil.parseConfigFile(params,callback);
    };

    this.get=function(setting)
    {
        var query=setting.split('.');
        logger.debug(query);
        if(configObj.hasOwnProperty(query[0])){
          return (query.length == 2 ? ( configObj[query[0]].hasOwnProperty(query[1]) ? configObj[query[0]][query[1]] : "Null" ) : configObj[query[0]] );
        }else
         return "Null";
    }

};

module.exports=configClass;