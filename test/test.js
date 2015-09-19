var expect    = require("chai").expect;
var assert = require("assert");
var configLoader=require('../app/configLoader.js') ;

describe('CONFIG_LOADER_TESTS_UBUNTU_PRODUCTION', function() {
    var config = new configLoader('/Users/richa/Learning/ConfigLoadder/config/configFile.txt',['ubuntu','production']);

    before(function(done) {
        config.loadConfig(done);
    });

    describe('ftp path value retrieval', function() {
        it('path setting retrivalt', function(){
            var settingValue=config.get("ftp.path");
            expect(settingValue).to.equal("/etc/var/uploads");
        });
    });

    describe('ftp enabled value retrieval', function(){
        it(' enabled setting retrival', function(){
            var settingValue = config.get("ftp.enabled");
            expect(settingValue).to.equal("no");
        });
    });

    describe('http object retrieval', function() {
        it('http object retrieval', function(){
            var http = config.get("http");

            var httpExpected={};
            httpExpected.name = "http uploading";
            httpExpected.path = "/srv/var/tmp/";
            httpExpected.params = ["array","of","values"] ;

            assert.deepEqual(http, httpExpected);
        });
    });

    describe('non existing setting retrival', function() {
        it(' lastname setting retrival', function(){
            var settingValue = config.get("ftp.lastname");
            expect(settingValue).to.equal("Null");
        });
    });

});
