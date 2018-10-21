# Sudoku - Backend

Welcome to Sudoku generator (yup, no creative names so far).

## Description

This application has only one route meant to return a solved Sudoku board.

## Installing and running

### Pre-requisites

*  [NodeJs](https://nodejs.org/en/download/) >= v8.*
*  [npm](https://www.npmjs.com/get-npm) >= 6.*

### Building and running
Download the project (or clone it), and run the build command in the project directory:

```bash
$ npm run build
```
### Running

If you want to run the application skipping the test and build steps, use the command:

```bash
$ npm start
```

## Usage

```bash
$ curl http://localhost:8080/sudoku/board
```