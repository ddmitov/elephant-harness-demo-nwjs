'use strict';

// elephant-harness demo for NW.js

const dirname = require('./dirname.js').dirname;

var modulesDirectory = dirname.replace('elephant-harness-demo-nwjs', '');

const elephantHarness = require(modulesDirectory + 'elephant-harness');

var os = require('os');
var platform = os.platform();

var path;
if (platform !== 'win32') {
  path = require('path').posix;
} else {
  path = require('path').win32;
}

function startTestScript() {
  var testScriptFullPath =
      path.join(dirname, 'php', 'phpinfo.php');

  var testScriptOutput = '';

  var testScriptObject = new Object();
  testScriptObject.interpreter = 'php-cgi';
  testScriptObject.scriptFullPath = testScriptFullPath;

  var interpreterSwitches = [];
  interpreterSwitches.push('-q');
  testScriptObject.interpreterSwitches = interpreterSwitches;

  testScriptObject.stdoutFunction = function(stdout) {
    testScriptOutput = testScriptOutput + stdout;
  };

  testScriptObject.exitFunction = function(stdout) {
    document.write(testScriptOutput);
  };

  elephantHarness.startScript(testScriptObject);
}
