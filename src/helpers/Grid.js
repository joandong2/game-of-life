export const createGrid = (rows, cols) => {
    const rowsArr = [];
    for (let i = 0; i < rows; i++) {
        rowsArr.push(Array.from(Array(cols), () => 0));
    }

    return rowsArr;
};

export const randomGrid = (rows, cols) => {
    const rowsArr = [];
    for (let i = 0; i < rows; i++) {
        rowsArr.push(
            Array.from(Array(cols), () => (Math.random() > 0.5 ? 1 : 0))
        );
    }
    //console.log(rowsArr);
    return rowsArr;
};

export const glider = (rows, cols) => {
    const rowsArr = [];
    for (let i = 0; i < rows; i++) {
        rowsArr.push(Array.from(Array(cols), () => 0));
    }

    // glider points
    rowsArr[1][3] = 1;
    rowsArr[2][1] = 1;
    rowsArr[2][3] = 1;
    rowsArr[3][2] = 1;
    rowsArr[3][3] = 1;

    return rowsArr;
};

export const spaceship = (rows, cols) => {
    const rowsArr = [];
    for (let i = 0; i < rows; i++) {
        rowsArr.push(Array.from(Array(cols), () => 0));
    }

    // glider points
    rowsArr[3][2] = 1;
    rowsArr[3][5] = 1;
    rowsArr[4][6] = 1;
    rowsArr[5][2] = 1;
    rowsArr[5][6] = 1;
    rowsArr[6][3] = 1;
    rowsArr[6][4] = 1;
    rowsArr[6][5] = 1;
    rowsArr[6][6] = 1;

    return rowsArr;
};

export const pulsar = (rows, cols) => {
    const rowsArr = [];
    for (let i = 0; i < rows; i++) {
        rowsArr.push(Array.from(Array(cols), () => 0));
    }

    // glider points
    // let set1 = [5, 6, 7, 11, 12, 13];
    // let set1a = [3, 8, 10, 15];
    let set1 = [8, 9, 10, 14, 15, 16];
    let set1a = [6, 11, 13, 18];

    for (let i = 0; i < set1.length; i++) {
        for (let j = 0; j < set1a.length; j++) {
            //console.log(set1[i] + " " + set1a[j]);
            rowsArr[set1[i]][set1a[j]] = 1;
        }
    }

    // let set2 = [3, 8, 10, 15];
    // let set2a = [5, 6, 7, 11, 12, 13];
    let set2 = [6, 11, 13, 18];
    let set2a = [8, 9, 10, 14, 15, 16];

    for (let i = 0; i < set2.length; i++) {
        for (let j = 0; j < set2a.length; j++) {
            rowsArr[set2[i]][set2a[j]] = 1;
        }
    }

    console.log(rowsArr);

    return rowsArr;
};
