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
  var type = os.type();
  var platform = os.platform();
  var arch = os.arch();
  
  for (var i = 0; i < loadavg.length; i++) {
    loadCPU.push(parseFloat((1.0 * loadavg[i] / nbCPU * 100).toFixed(2)));
  }
  
  var data = {
    "hostname": hostname,
    "type": type,
    "platform": platform,
    "arch": arch,
    "nbCPU": nbCPU,
    "loadCPU": loadCPU,
    "loadavg": loadavg,
    "loadRAM": parseFloat(loadRAM.toFixed(2)),
  };
  
  var d = new Date();
  data.UTCdate = d.toISOString();
  console.log(platform);
  if (platform === "linux") {
    
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
  } else {
    var wincpu = require('windows-cpu');
    wincpu.totalLoad(function(error, results) {
      if(error) {
        return console.log(error);
      } else {
        data.wincpu = results;
      }
      
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
    
  }
  
});
//-----------------------------------------------------------------------------
//									                  EXPORTS
//-----------------------------------------------------------------------------
module.exports = router;
//-----------------------------------------------------------------------------
//									                  END
//-----------------------------------------------------------------------------