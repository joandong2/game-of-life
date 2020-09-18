import React from "react";

let grid;
let numRows = 10;
let numCols = 10;

const App = () => {
    // set grid
    const makeGrid = (cols, rows) => {
        let arr = new Array(cols);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(rows);
        }
        return arr;
    };

    // initialize grid items to 0
    grid = makeGrid(numCols, numRows);
    for (let i = 0; i < numCols; i++) {
        for (let j = 0; j < numRows; j++) {
            grid[i][j] = 0;
        }
    }

    // plot the grid
    // onclick grid items
    // start/stop button
    // game of life algo
    console.log(grid);
    return <h1>Hello world</h1>;
};

export default App;
