const fs = require('node:fs');
const readline = require('node:readline');

// part 1
// find the number of trees visible from the outside
// all trees on the outer edge are visible
// trees inside are visible if they are not blocked
function part1(forest) {
    let numVisible = 0;

    // add trees visible from the outside
    numVisible += (forest.length + forest[0].length) * 2 - 4;

    // trees visible from the inside;
    for (let i = 1; i < forest[0].length - 1; i++) {
        for (let j = 1; j < forest.length - 1; j++) {
            
            let current = forest[i][j];
            let visible = true;
            // check up
            let row = i - 1;
            while (row >= 0) {
                if (current <= forest[row][j]) {
                    // hidden from this side
                    visible = false;
                    break;
                }
                row--;
            }
            if (visible) {
                numVisible++;
                continue;
            }

            // down
            visible = true;
            row = i + 1;
            while (row < forest.length) {
                if (current <= forest[row][j]) {
                    visible = false;
                    break;
                }
                row++;
            }
            if (visible) {
                numVisible++;
                continue;
            }

            // left
            visible = true;
            let col = j - 1;
            while (col >= 0) {
                if (current <= forest[i][col]) {
                    visible = false;
                    break;
                }
                col--;
            }
            if (visible) {
                numVisible++;
                continue;
            }

            // right
            visible = true;
            col = j + 1;
            while (col < forest[0].length) {
                if (current <= forest[i][col]) {
                    visible = false;
                    break;
                }
                col++;
            }
            if (visible) {
                numVisible++;
                continue;
            }
        }
    }
    return numVisible;
}

async function createForestMatrix(path) {
    const fileStream = fs.createReadStream(path, { encoding: 'utf8' });

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    
    let forest = [];

    for await (let line of rl) {
        let row = [];
        for (let t of line) {
            row.push(t);
        }
        forest.push(row);
    }
    return forest;
};

let promise = createForestMatrix('./input.txt');
promise.then(forest => {
    console.log(part1(forest));
});

module.exports = { createForestMatrix, part1 };
