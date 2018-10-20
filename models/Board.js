const BOARD_LENGTH = 9;//myst be multiple of box_size
const BOX_SIZE = 3;
/**
 * Number of times that the base board will be shuffled.
 * This number does not need to be so high because there are only 36 possibilities for swapping the numbers, so
 * when all numbers are replaced by each others we would have less mixed values than if we do it few times.
 * @type {number}
 */
const SHUFFLE_TIMES = 15;

class Board {
  constructor() {
    this.map = Board._generateBase();
    for (let i = 0; i < SHUFFLE_TIMES; i++) {
      this._shuffle();
    }
  }

  getBox(col, line) {
    let box = [];
    let x = col * BOX_SIZE;
    box[0] = this.map.slice(line * BOX_SIZE)[0].slice(x, x + BOX_SIZE);
    box[1] = this.map.slice(line * BOX_SIZE)[1].slice(x, x + BOX_SIZE);
    box[2] = this.map.slice(line * BOX_SIZE)[2].slice(x, x + BOX_SIZE);
    return box;
  }

  getLine(x) {
    return this.map.map(x => x)[x];
  }

  getColumn(y) {
    return arrayColumn(this.map, y)
  }

  toJson() {
    let map = [];
    this.map.map(line => map = map.concat(line));
    return JSON.stringify(map)
  }

  _shuffle() {
    this._swapLineCols();
    this._swapNumber();
  }
  _swapNumber() {
    const numberA = Math.floor(Math.random() * BOARD_LENGTH) + 1;
    let numberB;
    do {
      numberB = Math.floor(Math.random() * BOARD_LENGTH) + 1
    } while (numberB === numberA) ;
    // console.debug(`Swapping ${numberA}s by ${numberB}s`);
    for (let i = 0; i < BOARD_LENGTH; i++) {
      for (let j = 0; j < BOARD_LENGTH; j++) {
        if (this.map[i][j] === numberA) {
          this.map[i][j] = numberB;
        } else if (this.map[i][j] === numberB) {
          this.map[i][j] = numberA;
        }
      }
    }
  }
  _swapLineCols() {
    const coordA = Math.floor(Math.random() * 3);
    let coordB;
    do  {
      coordB = Math.floor(Math.random() * 3);
    }while (coordB === coordA);

    // box number
    const blockOrStack = Math.floor(Math.random() * 3);
    const finalCoordA = coordA + (blockOrStack * BOX_SIZE);
    const finalCoordB = coordB + (blockOrStack * BOX_SIZE);
    // console.debug(`Flipping cols ${finalCoordA} and ${finalCoordB}`);
    //flip cols
    this.map.forEach((line, index) => {
      let aux = this.map[index][finalCoordA];
      this.map[index][finalCoordA] = this.map[index][finalCoordB];
      this.map[index][finalCoordB] = aux;
    });
    //flip lines
    // console.debug(`Flipping lines ${finalCoordA} and ${finalCoordB}`);
    let aux = this.map[finalCoordA];
    this.map[finalCoordA] = this.map[finalCoordB];
    this.map[finalCoordB] = aux;
  }


  static _generateBase() {
    // firs number of the cell
    let baseNumber = Math.floor(Math.random() * (BOARD_LENGTH + 1));
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