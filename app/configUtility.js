var fs = require('fs');
var lineReader = require('line-reader');
var logger=require('../logger');
var constants = require('../constants/confConstants');
var enclosures = constants.enclosures;
var errors = constants.errors;

exports.parseConfigFile = function (params,callback) {
    logger.info("parse config file started ");
    var path=params.path;
    var enabledOverRides=params.enabledOverRides;
    var configObject=params.configObject;
    var currentGroup;
    var lineNumber=0;

    var enabledOverRideMap = {};
    for (var index in enabledOverRides) {
        enabledOverRideMap[enabledOverRides[index]] = 1 ; // converting enable overrides array to map so that lookup is O(1)
    }

    lineReader.eachLine(path, function (line, last) {

        var currentline = line.trim();

        if ( currentline.length > 0 && currentline.indexOf(';') == -1 ) { // leave the comment line or empty line
            var lineMembers = currentline.split(enclosures.overrideValueSplitter);
            if (lineMembers.length == 1) { //group case
                var groupString = lineMembers[0];
                if (groupString != null && groupString.length > 0 && groupString.charAt(0) == enclosures.groupOpening && groupString.charAt(groupString.length - 1) == enclosures.groupClosing)
                    currentGroup = groupString.substr(1, groupString.length - 2);
                else { // error will be printed if groups are not proper for example [common, common] , common ,[]

                    logger.error( errors.GROUPS_ARE_NOT_PROPERLY_FORMED +",+ LINE_NUMBER : " + lineNumber + " , INCORRECT LINE : " + line );
                    process.exit();
                }
            } else if (lineMembers.length == 2) //property case
            {
                if(currentGroup==undefined)//error will be printed if first line is setting key value pair instead of a group
                {
                    logger.error(errors.AT_LEAST_ONE_GROUP_SHOULD_BE_DEFINED +",+ LINE_NUMBER : " + lineNumber + " , INCORRECT LINE : " + line );
                    process.exit();
                }
                if (!configObject.hasOwnProperty(currentGroup)) {
                    configObject[currentGroup] = {};
                }

                var settingLabel = lineMembers[0].trim();
                var settingValue = lineMembers[1].trim();

                if (settingLabel != null && settingLabel.length > 0) {
                    var overRideSettings = settingLabel.split(enclosures.overridesOpening);
                    if (overRideSettings.length > 2) { // error case like path<produc<tion>> or path<production><abc> they are not valid
                        logger.error(errors.MORE_THAN_ONE_OVERRIDE_OPENINGS_NOT_ALLOWED+",+ LINE_NUMBER : " + lineNumber + " , INCORRECT LINE : " + line );
                       process.exit();
                    } else if (overRideSettings.length == 2 && (overRideSettings[1]!=null && overRideSettings[1].length > 0 ) &&
                        ! enabledOverRideMap.hasOwnProperty(overRideSettings[1].substr(0, overRideSettings[1].length -1)) ) {
                        logger.info("override is not enabled in config  file  " + overRideSettings[1].substr(0, overRideSettings[1].length - 1));

                    } else {
                        var setting = overRideSettings[0];
                        var settingValue = lineMembers[1].trim();
                        configObject[currentGroup][setting] = ( settingValue.split(",").length > 1 && settingValue.indexOf('"') == -1  ? settingValue.split(",") :  settingValue.replace (/"/g,'') );
                    }
                }
            } else { // error case
                logger.error(errors.COFIG_FILE_NOT_PROPERTLY_FORMED + " ,+ LINE_NUMBER : " + lineNumber + " , INCORRECT LINE : " + line );
            }
            lineNumber++;
        }
        if (last) {
            logger.info("config loaded : "+ JSON.stringify(configObject));
            callback();
        }
    });
};












//var fs = require('fs');
//var lineReader = require('line-reader');
//var logger = require('../logger');
//
//var constants = require('../constants/confConstants');
//var enclosures = constants.enclosures;
//
////todo handle cases where groups are not there and directly settings are given
//exports.parseConfigFile = function (params, callback) {
//    var path = params.path;
//    var enabledOverRides = params.enabledOverRides;
//    var configObject = params.configObject;
//    var currentGroup;
//    var lineNumber=0;
//
//    var enabledOverRideMap = {};
//    for (var index in enabledOverRides) {
//        enabledOverRideMap[enabledOverRides[index]] = 1; // converting enable overrides array to map so that lookup is O(1)
//    }
//
//    lineReader.eachLine(path, function (line, last) {
//        var currentline = line.trim();
//        if (currentline[0] != ';' || currentline.length >0) { // leave the comment line or empty line
//            var lineMembers = currentline.split(enclosures.overrideValueSplitter);
//            if (lineMembers.length == 1) { //group case
//                var groupString = lineMembers[0].trim();
//                if (groupString != null && groupString.length > 2 && groupString.charAt(0) == enclosures.groupOpening && groupString.charAt(groupString.length - 1) == enclosures.groupClosing) {
//                    currentGroup = groupString.substr(1, groupString.length - 2);
//                }
//                else {
//                    // error will be printed if groups are not proper for example [common, common] , common ,[]
//                    logger.error("GROUPS_ARE_NOT_PROPERLY_FORMED ,+ LINE_NUMBER : " + lineNumber + " , INCORRECT LINE : " + line );
//                    process.exit();
//                }
//            } else if (lineMembers.length == 2) //property case
//            {
//                if(currentGroup==undefined)
//                {
//                    //error will be printed if first line is setting key value pair instead of a group
//                    logger.error("AT_LEAST_ONE_GROUP_SHOULD_BE_DEFINED ,+ LINE_NUMBER : " + lineNumber + " , INCORRECT LINE : " + line );
//                    process.exit();
//                }
//                if (!configObject.hasOwnProperty(currentGroup)) {
//                    configObject[currentGroup] = {};
//                }
//                var settingLabel = lineMembers[0].trim();
//                var settingValue = lineMembers[1].trim();
//                if (settingLabel != null && settingLabel.length > 0) {
//                    var overRideSettings = settingLabel.split(enclosures.overridesOpening);
//                    if (overRideSettings.length > 2) { // error case like path<produc<tion>> or path<production><abc> they are not valid
//                        logger.error("MORE_THAN_ONE_OVERRIDE_OPENINGS_NOT_ALLOWED,+ LINE_NUMBER : " + lineNumber + " , INCORRECT LINE : " + line );
//                        process.exit();
//                    }
//                    else if(overRideSettings.length == 1)
//                    {
//                        //todo for setting without override , path=/tmp/
//                    }
//                    else if(overRideSettings.length == 2)
//                    {
//                        var setting=overRideSettings[0].trim();
//                        if(setting.length==0)
//                        {
//                            logger.error("EMPTY_SETTING_NOT_ALLOWED,+ LINE_NUMBER : " + lineNumber + " , INCORRECT LINE : " + line );
//                            process.exit();
//                        }
//                        var overrideWithClosingBracket=overRideSettings[1].trim();
//                        var overrideWithClosingBracketLength=overrideWithClosingBracket.length;
//                        if(overrideWithClosingBracketLength==0)//it is a setting without override
//                        {
//                            configObject[currentGroup][setting] = settingValue;
//                        }
//                        else if(overrideWithClosingBracket>=2 && overrideWithClosingBracket[overrideWithClosingBracketLength-1]==enclosures.overridesClosing)
//                        {
//                            var override= overrideWithClosingBracket.substr(0, overrideWithClosingBracketLength.length - 1);
//                            if(enabledOverRideMap.hasOwnProperty(override))
//                            {
//                                configObject[currentGroup][setting] = settingValue;
//                            }
//                        }
//                        else
//                        {//either value of overrides is empty or closing bracket missing
//                            logger.error("OVERRIDE_NOT_PROPERTLY_FORMED,+ LINE_NUMBER : " + lineNumber + " , INCORRECT LINE : " + line );
//                        }
//                    }
//                    //else if (overRideSettings.length == 2 && (overRideSettings[1] != null && overRideSettings[1].length > 0 ) && !enabledOverRideMap.hasOwnProperty(overRideSettings[1].substr(0, overRideSettings[1].length - 1))) {
//                    //    console.log("override is not enabled in config  file  " + overRideSettings[1].substr(0, overRideSettings[1].length - 1));
//                    //}
//                    //
//                    //else {
//                    //    var setting = overRideSettings[0];
//                    //    var settingValue = lineMembers[1].trim();
//                    //    configObject[currentGroup][setting] = (settingValue.split(",").length > 1 ? settingValue.split(",") : settingValue);
//                    //}
//                }
//                else
//                {
//                    logger.error("SETTING_CAN_NOT_BE_EMTPY ,+ LINE_NUMBER : " + lineNumber + " , INCORRECT LINE : " + line );
//                }
//            } else { // error case
//                logger.error("COFIG_FILE_NOT_PROPERTLY_FORMED  ,+ LINE_NUMBER : " + lineNumber + " , INCORRECT LINE : " + line );
//            }
//            lineNumber++;
//        }
//        if (last) {
//            // or check if it's the last one
//            //console.log(JSON.stringify(configObject));
//            callback();
//            //params.configObject = configObject ;
//        }
//    });
//};
//
