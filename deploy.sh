#!/bin/bash

npm install && \
    npm audit fix && \
    npm test && \
    docker build -t sudoku-ws:level-4 .
GREEN='\033[0;32m'
NC='\033[0m' # No Color
echo -e "All set, run ${GREEN}docker run -it -p 8080:8080 sudoku-ws:level-4${NC} to start the container"