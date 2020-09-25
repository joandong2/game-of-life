import React, { useState, useCallback, useRef } from "react";
import {
    createGrid,
    randomGrid,
    glider,
    spaceship,
    pulsar,
} from "./helpers/Grid";
import produce from "immer";

import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import SpeedIcon from "@material-ui/icons/Speed";

import "./App.css";

const numRows = 25;
const numCols = 25;

const App = () => {
    const [generation, setGeneration] = useState(0);
    const [grid, setGrid] = useState(() => {
        return createGrid(numRows, numCols);
    });

    // since using callback, function dont changes, so we will refer to a state value instead of using the exact state,to makes sure were using the changing state,
    const [running, setRunning] = useState(false);
    const runningRef = useRef(running);
    runningRef.current = running;

    const [speed, setSpeed] = useState(1);
    const speedRef = useRef(speed);
    speedRef.current = speed;

    const speedChange = async (e, value) => {
        await setSpeed(() => value);
    };

    //console.log(speed);

    const start = useCallback(() => {
        // base case
        if (!runningRef.current) {
            return;
        }

        setGeneration((generation) => generation + 1);
        setGrid((grid) => {
            return produce(grid, (gridCopy) => {
                // loop every element of the grid
                for (let i = 0; i < numRows; i++) {
                    for (let j = 0; j < numCols; j++) {
                        let count = 0; // count the neigbors

                        if (i > 0) if (grid[i - 1][j]) count++; //North
                        if (i > 0 && j > 0) if (grid[i - 1][j - 1]) count++; //Northwest
                        if (i > 0 && j < numCols - 1)
                            if (grid[i - 1][j + 1]) count++; //Northeast
                        if (j < numCols - 1) if (grid[i][j + 1]) count++; //East
                        if (j > 0) if (grid[i][j - 1]) count++; //West
                        if (i < numRows - 1) if (grid[i + 1][j]) count++; //South
                        if (i < numRows - 1 && j > 0)
                            if (grid[i + 1][j - 1]) count++; //Southwest
                        if (i < numRows - 1 && j < numCols - 1)
                            if (grid[i + 1][j + 1]) count++; //Southeast

                        if (grid[i][j] && (count < 2 || count > 3))
                            // die
                            gridCopy[i][j] = 0;
                        if (!grid[i][j] && count === 3) gridCopy[i][j] = 1; // born
                    }
                }
            });
        });

        setTimeout(start, speedRef.current);
    }, []);

    return (
        <>
            <Container maxWidth="md">
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                >
                    <Grid item xs={7}>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="flex-start"
                        >
                            <Grid item xs={6} className="control-buttons">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<PlayCircleFilledWhiteIcon />}
                                    size="small"
                                    onClick={() => {
                                        setRunning(!running);
                                        if (!running) {
                                            runningRef.current = true;
                                            start();
                                        }
                                    }}
                                >
                                    {running ? "stop" : "start"}
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<ClearAllIcon />}
                                    size="small"
                                    onClick={() => {
                                        setGrid(createGrid(numRows, numCols));
                                        setGeneration(() => 0);
                                    }}
                                >
                                    clear
                                </Button>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="flex-start"
                            >
                                <Grid item xs={9}>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="flex-start"
                                        alignItems="flex-start"
                                    >
                                        <Grid item xs={1}>
                                            <SpeedIcon />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Slider
                                                defaultValue={1}
                                                aria-labelledby="discrete-slider-always"
                                                step={10}
                                                min={1}
                                                max={2000}
                                                onChange={speedChange}
                                                color="secondary"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}>
                                    generation: {generation}
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: `repeat(${numCols}, 20px)`,
                                    }}
                                >
                                    {grid.map((rows, i) =>
                                        rows.map((cols, k) => (
                                            <div
                                                key={`${i}-${k}`}
                                                className={`box box-${i}-${k}`}
                                                onClick={() => {
                                                    const newGrid = produce(
                                                        grid,
                                                        (gridCopy) => {
                                                            gridCopy[i][
                                                                k
                                                            ] = grid[i][k]
                                                                ? 0
                                                                : 1;
                                                        }
                                                    );
                                                    setGrid(newGrid);
                                                }}
                                                style={{
                                                    backgroundColor: grid[i][k]
                                                        ? "white"
                                                        : undefined,
                                                }}
                                            />
                                        ))
                                    )}
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={5}>
                        <h2>Conway's Game of Life</h2>
                        <p>Rules:</p>
                        <p>
                            {" "}
                            1. Any live cell with fewer than two live neighbours
                            dies, as if by underpopulation. &nbsp;
                            <br />
                            2. Any live cell with two or three live neighbours
                            lives on to the next generation. &nbsp;
                            <br />
                            3. Any live cell with more than three live
                            neighbours dies, as if by overpopulation. &nbsp;
                            <br />
                            4. Any dead cell with exactly three live neighbours
                            becomes a live cell, as if by reproduction. &nbsp;
                        </p>

                        <p>Presets:</p>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={() => {
                                setGrid(randomGrid(numRows, numCols));
                            }}
                        >
                            random
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={() => {
                                setGrid(glider(numRows, numCols));
                            }}
                        >
                            glider
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={() => {
                                setGrid(pulsar(numRows, numCols));
                            }}
                        >
                            pulsar
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={() => {
                                setGrid(spaceship(numRows, numCols));
                            }}
                        >
                            spaceship
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default App;
