/*jslint node:true*/
"use strict";
//-----------------------------------------------------------------------------
//									                  REQUIRES
//-----------------------------------------------------------------------------
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -REQUIRES
var express = require('express'),
os = require('os'),
router = express.Router(),
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -CONFIG
GLOBAL = require('../../config/GLOBAL');
//-----------------------------------------------------------------------------
//									                  DECLARATIONS
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//									                  PROGRAM
//-----------------------------------------------------------------------------
router.get('/', function (req, res) {
  
  var nbCPU = os.cpus().length;
  var loadRAM = 1.0 * os.freemem() / os.totalmem() * 100;
  var loadCPU = [];
  var loadavg = os.loadavg();
  var hostname = os.hostname();
  
  for (var i = 0; i < loadavg.length; i++) {
    loadCPU.push(parseFloat((1.0 * loadavg[i] / nbCPU * 100).toFixed(2)));
  }
  
  var data = {
    "hostname": hostname,
    "nbCPU": nbCPU,
    "loadCPU": loadCPU,
    "loadRAM": parseFloat(loadRAM.toFixed(2)),
  };
  
  var d = new Date();
  data.UTCdate = d.toISOString();
  
  res.render('index', {
    scripts: [
      GLOBAL.SCRIPTS.JQUERY,
      GLOBAL.SCRIPTS.BOOTSTRAP
    ],
    links: [
      {rel: 'stylesheet', href: GLOBAL.LINKS.BOOTSTRAP},
      {rel: 'stylesheet', href: '/css/index.css'}
    ],
    data: data
  });
});
//-----------------------------------------------------------------------------
//									                  EXPORTS
//-----------------------------------------------------------------------------
module.exports = router;
//-----------------------------------------------------------------------------
//									                  END
//-----------------------------------------------------------------------------