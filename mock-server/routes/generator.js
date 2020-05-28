var express = require("express");
var request = require("request");
var router = express.Router();
var helper = require('../utils/helper')

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});

router.post("/", function (req, res) {
  try {
    let digits = req.body.mobileNumber;
    let start = req.body.start;
    let end = req.body.end;

    console.log('end => ', end);

    if(!digits || start === null || start === undefined || end === null || end === undefined) {
      res.send({
        error: 'Invalid request'
      });
    } else {
      let isInvalid = helper.validateDigits(digits);

      if(isInvalid) {
        res.send({
          error: 'Invalid data',
          message: isInvalid
        });
      } else {
        let result = helper.letterCombinations(digits);
  
        res.send({
          count: result.length,
          results: result.slice(start, end),
        });
      }
    }
    
  } catch (error) {
    res.send(error);
  }
});


module.exports = router;
