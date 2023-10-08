
'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
let initUnit ; 
let initNum ;
module.exports = function (app) {
  
  let convertHandler =  ConvertHandler();
  
  app.route('/api/convert')
     .get(function(req , res ) { 
      let input = req.query.input ; 
      initNum = convertHandler.getNum(input) ; 
      initUnit = convertHandler.getUnit(input) ; 
      if (!initUnit && !initNum ){ 
        res.send("Invalid number and unit")
      }
      else if (!initNum) {
        res.send("Invalid number")
      }
      else if (!initUnit) { 
        res.send("Invalid Unit")
      }

      let returnNum = convertHandler.convert(initNum,initUnit) ;
      let returnUnit = convertHandler.getReturnUnit(initUnit) ;
      let toString = convertHandler.getString(initNum ,initUnit , returnNum , returnUnit);
      res.json({initNum , initUnit , returnNum , returnUnit , string : toString}) ;
    });
};

module.exports.initNum = initNum;
module.exports.initUnit = initUnit;