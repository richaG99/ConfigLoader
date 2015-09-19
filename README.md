### ConfigLoader

### Introduction
This utility is written on node.js .The above program loads a config file present at location /config/configFile.txt
To test the utility, unit tests are written in Mocha framework.
In app/client.js , config file location and override settings are passed. LoadConfig() method reads the config file and loads the config object. All get operartions are now done on that config object. In case of malformed config.txt file, process will exit.
Logs are saved inside ConfigLoader/logs/ folder.
In test.js config file location and override settings are passed to run unit tests.


###Execution Steps

1. Install Node in the system.

           $ node -v 
           v0.10.32
    
2. Clone the repository in the system

          git clone https://github.com/richaG99/ConfigLoader.git
      
3. Install required node module for ConfigLoadder

         cd ConfigLoader
         npm install
     
4. Run the mocha test cases  
     
         npm test      




      
  

