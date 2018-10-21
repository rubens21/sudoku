var express = require('express');
var router = express.Router();
const Board = require('../models/Board');

/* GET Sudoku board. */
router.get("/", function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');

  let params = {};
  Object.keys(req.query).forEach((key) => {
    params[key] = parseInt(req.query[key]);
  });

  const valid = [params.number, params.col, params.line];

  //all or none: should send none parameters OR send all valid integers
  if (valid.every(x => x === undefined) || (valid.every(x => Number.isInteger(x)) && validateParams(params))) {
    const mapTest = new Board(params);

    // do you want to slow it? swap these lines
    // setTimeout(function () {res.send(mapTest.toJson());}, 3000)
    res.send(mapTest.toJson());
  } else {
    res.statusCode = 400;
    res.send(`{"error": "invalid parameters. 'number', 'col', and 'line' should be number between 1 and 9"}`);
  }

});


// To simple to use a validator library?
function validateParams(params) {
  return params.col >= 0 && params.col < 9
    && params.line >= 0 && params.line < 9
    && params.number > 0 && params.number <= 9
}

module.exports = router;
