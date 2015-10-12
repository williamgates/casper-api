var casper = require('casper').create();
var system = require('system');
var url = system.args[4];
var fs = require('fs');
//var _ = require('underscore');
var _ = require('../proxies/underscore');

var test = require('tests/test-module.js');
test.test();

