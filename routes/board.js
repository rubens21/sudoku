var express = require('express');
var router = express.Router();
const Board = require('../models/Board');

/* GET Sudoku board. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  const mapTest = new Board();

  res.send(mapTest.toJson());

});

module.exports = router;
