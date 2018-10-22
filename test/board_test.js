/**
 * These tests are only compatible with 9x9 Sudoku boards
 */
const assert = require('assert');
const Board = require('../models/Board');

const mapExample = [
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
];

describe('Board:', function () {
  describe('Validate:', function () {
    it('should return a specific line', function () {
      let mapTest = new Board();
      mapTest.map = mapExample;
      assert.deepEqual(mapTest.getLine(0), [1, 1, 1, 2, 2, 2, 3, 3, 3]);
      assert.deepEqual(mapTest.getLine(1), [1, 1, 1, 2, 2, 2, 3, 3, 3]);
      assert.deepEqual(mapTest.getLine(2), [1, 1, 1, 2, 2, 2, 3, 3, 3]);
      assert.deepEqual(mapTest.getLine(3), [4, 4, 4, 5, 5, 5, 6, 6, 6]);
      assert.deepEqual(mapTest.getLine(4), [4, 4, 4, 5, 5, 5, 6, 6, 6]);
      assert.deepEqual(mapTest.getLine(5), [4, 4, 4, 5, 5, 5, 6, 6, 6]);
      assert.deepEqual(mapTest.getLine(6), [7, 7, 7, 8, 8, 8, 9, 9, 9]);
      assert.deepEqual(mapTest.getLine(7), [7, 7, 7, 8, 8, 8, 9, 9, 9]);
      assert.deepEqual(mapTest.getLine(8), [7, 7, 7, 8, 8, 8, 9, 9, 9]);
    });
    it('should return a specific col', function () {
      let mapTest = new Board();
      mapTest.map = mapExample;
      assert.deepEqual(mapTest.getColumn(0), [1, 1, 1, 4, 4, 4, 7, 7, 7]);
      assert.deepEqual(mapTest.getColumn(1), [1, 1, 1, 4, 4, 4, 7, 7, 7]);
      assert.deepEqual(mapTest.getColumn(2), [1, 1, 1, 4, 4, 4, 7, 7, 7]);
      assert.deepEqual(mapTest.getColumn(3), [2, 2, 2, 5, 5, 5, 8, 8, 8]);
      assert.deepEqual(mapTest.getColumn(4), [2, 2, 2, 5, 5, 5, 8, 8, 8]);
      assert.deepEqual(mapTest.getColumn(5), [2, 2, 2, 5, 5, 5, 8, 8, 8]);
      assert.deepEqual(mapTest.getColumn(6), [3, 3, 3, 6, 6, 6, 9, 9, 9]);
      assert.deepEqual(mapTest.getColumn(7), [3, 3, 3, 6, 6, 6, 9, 9, 9]);
      assert.deepEqual(mapTest.getColumn(8), [3, 3, 3, 6, 6, 6, 9, 9, 9]);
    });

    it('should validate a valid base board', function () {
      const validMap = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [9, 1, 2, 3, 4, 5, 6, 7, 8]
      ];
      let mapTest = new Board();
      mapTest.map = validMap;
      const errors = mapTest.validateMap();
      assert.ok(errors.length === 0);
    });
    it('should generate valid base boards', function () {
      for (let i = 0; i < 100; i++) {
        const mapTest = new Board();
        const errors = mapTest.validateMap();
        assert.ok(errors.length === 0);
      }
    });
    it('should generate valid base boards and keep the requested number in the requested coordinate', function () {
      for (let i = 0; i < 100; i++) {
        const params = {
          number: Math.floor(Math.random() * 10),
          line: Math.floor(Math.random() * 9),
          col: Math.floor(Math.random() * 9)
        };

        const mapTest = new Board(params);
        const errors = mapTest.validateMap();
        assert.ok(errors.length === 0);
        assert.equal(mapTest.map[params.line][params.col], params.number)
      }
    });
  });
  describe('getBox:', function () {
    it('should get a box by coordinates', function () {
      let mapTest = new Board();
      mapTest.map = mapExample;
      assert.deepEqual(mapTest.getBox(0, 0), [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ]);
      assert.deepEqual(mapTest.getBox(1, 0), [
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2],
      ]);
      assert.deepEqual(mapTest.getBox(2, 0), [
        [3, 3, 3],
        [3, 3, 3],
        [3, 3, 3],
      ]);
      assert.deepEqual(mapTest.getBox(0, 1), [
        [4, 4, 4],
        [4, 4, 4],
        [4, 4, 4],
      ]);
      assert.deepEqual(mapTest.getBox(1, 1), [
        [5, 5, 5],
        [5, 5, 5],
        [5, 5, 5],
      ]);
      assert.deepEqual(mapTest.getBox(2, 1), [
        [6, 6, 6],
        [6, 6, 6],
        [6, 6, 6],
      ]);
      assert.deepEqual(mapTest.getBox(0, 2), [
        [7, 7, 7],
        [7, 7, 7],
        [7, 7, 7],
      ]);
      assert.deepEqual(mapTest.getBox(1, 2), [
        [8, 8, 8],
        [8, 8, 8],
        [8, 8, 8],
      ]);
      assert.deepEqual(mapTest.getBox(2, 2), [
        [9, 9, 9],
        [9, 9, 9],
        [9, 9, 9],
      ]);
    });
    it('should identify a invalid box', function () {
      //note that there is no values repeated in the board rows and lines, but the boxes are note valid
      const invalidMap = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [9, 1, 2, 3, 4, 5, 6, 7, 8],//this should be the ninth line
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [6, 7, 8, 9, 1, 2, 3, 4, 5]
      ];

      let mapTest = new Board();
      mapTest.map = invalidMap;
      const errors = mapTest.validateMap();
      assert.ok(errors.length > 0);
    });
    it('should identify a invalid board (duplicated value in a line)', function () {
      //note that there is no values repeated in the board rows and lines, but the boxes are note valid
      const invalidMap = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [9, 1, 2, 3, 4, 5, 6, 7, 1],//the number 1 is repeated, the last on should be 8
      ];

      let mapTest = new Board();
      mapTest.map = invalidMap;
      const errors = mapTest.validateMap();
      assert.ok(errors.length > 0);
      assert.ok(/Duplicated value at line/.test(errors[0]));
    });
    it('should identify a invalid board (duplicated value in a column)', function () {
      //note that there is no values repeated in the board rows and lines, but the boxes are note valid
      const invalidMap = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [9, 8, 2, 3, 4, 5, 6, 7, 1],// the number 8 and 1 ate switched in this line
      ];

      let mapTest = new Board();
      mapTest.map = invalidMap;
      const errors = mapTest.validateMap();
      assert.ok(errors.length > 0);
      assert.ok(/Duplicated value at column/.test(errors[0]));
    });
  });

  describe('shuffle', function () {
    it('should keep the board valid', function () {

      const mapTest = new Board();
      for (let i = 0; i < 10; i++) {
        const initialMap = JSON.stringify(mapTest.map);
        mapTest._shuffle();
        const errors = mapTest.validateMap();
        assert.ok(errors.length === 0);
        assert.ok(JSON.stringify(mapTest.map) !== initialMap, "The map should be different after be shuffled");
      }
    });
  })

});