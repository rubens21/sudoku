const BOARD_LENGTH = 9;//myst be multiple of box_size
const BOX_SIZE = 3;

class Board {
  constructor() {
    this.map = Board._generateBase();
  }

  getBox(x, y) {
    let box = [];
    let col = x * BOX_SIZE;
    box[0] = this.map.slice(y * BOX_SIZE)[0].slice(col, col + BOX_SIZE);
    box[1] = this.map.slice(y * BOX_SIZE)[1].slice(col, col + BOX_SIZE);
    box[2] = this.map.slice(y * BOX_SIZE)[2].slice(col, col + BOX_SIZE);
    return box;
  }

  getLine(x) {
    return this.map.map(x => x)[x];
  }

  getColumn(y) {
    return arrayColumn(this.map, y)
  }

  static _generateBase() {
    // firs number of the cell
    let baseNumber = Math.floor(Math.random() * 10);
    let boardMap = [];

    for (let line = 0; line < BOARD_LENGTH; line += BOX_SIZE) {
      let initial = baseNumber;
      for (let i = line; i < line + BOX_SIZE; i++) {
        boardMap[i] = [];
        for (let j = 0; j < BOARD_LENGTH; j++) {
          boardMap[i][j] = ((initial + j) % BOARD_LENGTH) + 1
        }
        initial += BOX_SIZE;
      }
      baseNumber++;
    }
    return boardMap
  }

  validateMap() {
    let errors = Board._errors(this.map);
    if (errors.length === 0) {
      for (let line = 0; line < BOX_SIZE; line++) {
        for (let col = 0; col < BOX_SIZE; col++) {
          const boxError = this.validateBox(line, col);
          if (boxError !== null) {
            errors.push(boxError);
          }
        }
      }
    }
    return errors
  }

  validateBox(x, y) {
    const boxValues = this.getBox(x, y);
    const repeatedValues = isValidSequence(boxValues);
    if (repeatedValues !== null) {
      return new Error(`Box ${x}x${y} is invalid, repeated values: ${repeatedValues}`)
    }
    return null
  }

  static _errors(map) {
    const arrayColumn = (arr, n) => arr.map(x => x[n]);
    let errors = [];
    map.every((line, index) => {
      const repeatedValues = isValidSequence(line);
      if (repeatedValues !== null) {
        errors.push(new Error(`Duplicated value at line ${index}: ${repeatedValues}`))
      }
    });
    map.every(function (line, index) {
      let colValues = arrayColumn(map, index);
      const repeatedValues = isValidSequence(colValues);
      if (repeatedValues !== null) {
        errors.push(new Error(`Duplicated value at column ${index}: ${repeatedValues}`))
      }
    });
    return errors
  }
}

const arrayColumn = (arr, n) => arr.map(x => x[n]);

function isValidSequence(numbers) {
  const hasRepeated = /(\b\d\b)(?=.*\b\1\b)/g;
  const seqJson = JSON.stringify(numbers);
  return seqJson.match(hasRepeated)
}

module.exports = Board;