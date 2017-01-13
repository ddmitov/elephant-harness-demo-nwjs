'use strict';

// elephant-harness demo for NW.js

const dirname = require('./dirname.js').dirname;

var modulesDirectory = dirname.replace('elephant-harness-demo-nwjs', '');

// Load the elephant-harness package:
const elephantHarness = require(modulesDirectory + 'elephant-harness');

// Determine the operating system and initialize 'path' object:
var os = require('os');
var platform = os.platform();

var path;
if (platform !== 'win32') {
  path = require('path').posix;
} else {
  path = require('path').win32;
}

// PHP test script:
function startTestScript() {
  var testScriptFullPath =
      path.join(dirname, 'php', 'phpinfo.php');

  var testScriptOutput = '';

  var testScriptObject = new Object();
  testScriptObject.interpreter = 'php-cgi';
  testScriptObject.scriptFullPath = testScriptFullPath;
  testScriptObject.interpreterSwitches = '-q';

  testScriptObject.stdoutFunction = function(stdout) {
    testScriptOutput = testScriptOutput + stdout;
  };

  testScriptObject.exitFunction = function(stdout) {
    document.write(testScriptOutput);
  };

  elephantHarness.startScript(testScriptObject);
}
