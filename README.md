# Sudoku - Backend

Welcome to Sudoku generator (yup, no creative names so far).

## Description

This application has only one route meant to return a solved Sudoku board.

## Installing and running

### Pre-requisites

*  [NodeJs](https://nodejs.org/en/download/) >= v8.*
*  [npm](https://www.npmjs.com/get-npm) >= 6.*
*  [docker](https://docs.docker.com/install/) >= 18.*

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
### Deploy

Run the script `deploy.sh`. This script will install the dependencies locally, run the tests, build a Docker
image, and provide you the command to start the container.

## Usage

```bash
$ curl http://localhost:8080/sudoku/board
```