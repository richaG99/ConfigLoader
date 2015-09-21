### ConfigLoader

### Introduction
This utility is written using node.js .The above program loads a config file present at location /config/configFile.txt
To test the utility, unit tests are written in Mocha framework.
In app/client.js , config file location and override settings are passed. LoadConfig() method reads the config file and loads the config object. All get operartions are now done on that config object. In case of malformed config.txt file, process will exit.
Logs are saved inside ConfigLoader/logs/ folder.
In test.js config file location and override settings are passed to run unit tests.

#####[Prerequisit]

Install Node in the system. To ensure if Node is working fine in the system:

           $ node -v 
           v0.10.32


###Execution Steps [If consumed via zip file]

1. If user is consuming ConfigLoader.zip file, execution steps are following :

           unzip ConfigLoader.zip 
           cd ConfigLoader
           npm install

2. To run the unit test written in mocha , we do

           npm test
     
3. client.js is a small demo of how an application should load config , before it starts its actual business logic . One can simulate it by following 

           node ./app/client.js
           

###Execution Steps [If consumed from git repository]


1. Clone the repository in the system

          git clone https://github.com/richaG99/ConfigLoader.git
      
2. Install required node module for ConfigLoadder

         cd ConfigLoader
         npm install
     
3. Run the mocha test cases  

         npm test


4. client.js is a small demo of how an application should load config , before it starts its actual business logic . One can simulate it by following
     
          cd ConfigLoader
          node ./app/client.js           
           

####Note
In a production setup, log files should not be the part of the github repository and config file path shouldn't be hard coded.
But here, I have done that in test cases (test.js) and in demo application ( client.js) for demo convenience. 



      
  

