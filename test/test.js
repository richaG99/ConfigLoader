var expect    = require("chai").expect;
var assert = require("assert");
var configLoader=require('../app/configLoader.js') ;

describe('CONFIG_LOADER_TESTS_UBUNTU_PRODUCTION', function() {
    var config = new configLoader('config/configFile.txt',['ubuntu','production']);

    before(function(done) {
        config.loadConfig(done);
    });

    describe('group setting retrieval', function() {
        it('common config setting ', function(){
            var settingValue=config.get("common.paid_users_size_limit");
            expect(settingValue).to.equal("2147483648");
        });
    });

    describe('group setting with enabled override retrieval', function() {
        it('ftp path setting retrieval', function(){
            var settingValue=config.get("ftp.path");
            expect(settingValue).to.equal("/etc/var/uploads");
        });

        it('http path setting retrieval', function(){
            var settingValue=config.get("http.path");
            expect(settingValue).to.equal("/srv/var/tmp/");
        });
    });

    describe('group setting with not enabled override retrival', function(){
        it(' common path setting retrival', function(){
            var settingValue = config.get("common.path");
            expect(settingValue).to.equal("/srv/var/tmp/");
        });
    });

    describe('group object retrival', function() {
        it('http object retrival', function(){
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
