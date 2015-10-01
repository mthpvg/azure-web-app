/*jslint node:true*/
"use strict";
//-----------------------------------------------------------------------------
//									                  REQUIRES
//-----------------------------------------------------------------------------
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -REQUIRES
var express = require('express'),
os = require('os'),
uuid = require('uuid'),
router = express.Router(),
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -CONFIG
GLOBAL = require('../../config/GLOBAL');
var hostUUID = uuid.v4();
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
  var networkInterfaces = os.networkInterfaces();
  var cpus = os.cpus();
  var environmentVars = process.env
  
  for (var i = 0; i < loadavg.length; i++) {
    loadCPU.push(parseFloat((1.0 * loadavg[i] / nbCPU * 100).toFixed(2)));
  }
  
  var data = {
    "hostUUID": hostUUID,
    "hostname": hostname,
    "type": type,
    "platform": platform,
    "arch": arch,
    "nbCPU": nbCPU,
    //"loadCPU": loadCPU,
    "loadRAM": parseFloat(loadRAM.toFixed(2)),
    "networkInterfaces": networkInterfaces,
    "cpus": cpus,
    "environmentVars": environmentVars
  };
  
  var d = new Date();
  data.UTCdate = d.toISOString();
  
  function cpuAverage() {
    
    //Initialise sum of idle and time of cores and fetch CPU info
    var totalIdle = 0, totalTick = 0;
    var cpus = os.cpus();
    
    //Loop through CPU cores
    for(var i = 0, len = cpus.length; i < len; i++) {
      
      //Select CPU core
      var cpu = cpus[i];
      
      //Total up the time in the cores tick
      var type;
      for(type in cpu.times) {
        totalTick += cpu.times[type];
      }     
      
      //Total up the idle time of the core
      totalIdle += cpu.times.idle;
    }
    
    //Return the average Idle and Tick times
    return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
  }
  
  
  //Grab first CPU Measure
  var startMeasure = cpuAverage();
  
  //Set delay for second Measure
  setTimeout(function() { 
    
    //Grab second Measure
    var endMeasure = cpuAverage(); 
    
    //Calculate the difference in idle and total time between the measures
    var idleDifference = endMeasure.idle - startMeasure.idle;
    var totalDifference = endMeasure.total - startMeasure.total;
    
    //Calculate the average percentage CPU usage
    var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);
    data.loadCPU = percentageCPU;
    //Output result to console
    console.log(percentageCPU + "% CPU Usage.");
    
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
    
  }, 100);
  
  

});
//-----------------------------------------------------------------------------
//									                  EXPORTS
//-----------------------------------------------------------------------------
module.exports = router;
//-----------------------------------------------------------------------------
//									                  END
//-----------------------------------------------------------------------------