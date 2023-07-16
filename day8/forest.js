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

// Debug
// part2(
// [
//     [ 3, 0, 3, 7, 3 ],
//     [ 2, 5, 5, 1, 2 ],
//     [ 6, 5, 3, 3, 2 ],
//     [ 3, 3, 5, 4, 9 ],
//     [ 3, 5, 3, 9, 0 ]
// ])

// part 2, find the highest scenic score possible
// multiply together the number of trees you can see
function part2(forest) {
    let maxScore = 0;
    // NOTE: no need to check borders, their scenic score will always be 0
    for (let i = 1; i < forest[0].length - 1; i++) {
        for (let j = 1; j < forest.length - 1; j++) {
            let scenicScore = 1;
            // check up
            let current = forest[i][j];

            // check up
            let visible = 0;
            let row = i - 1;
            while (row >= 0) {
                if (current <= forest[row][j]) {
                    visible++;
                    break;
                }
                row--;
                visible++;
            }
            scenicScore *= visible;

            // down
            visible = 0;
            row = i + 1;
            while (row < forest.length) {
                if (current <= forest[row][j]) {
                    visible++;
                    break;
                }
                row++;
                visible++;
            }
            scenicScore *= visible;

            // left
            visible = 0;
            let col = j - 1;
            while (col >= 0) {
                if (current <= forest[i][col]) {
                    visible++;
                    break;
                }
                col--;
                visible++;
            }
            scenicScore *= visible;

            // right
            visible = 0;
            col = j + 1;
            while (col < forest[0].length) {
                if (current <= forest[i][col]) {
                    visible++;
                    break;
                }
                col++;
                visible++;
            }
            scenicScore *= visible;
            maxScore = Math.max(scenicScore, maxScore);
        }
    }
    return maxScore;
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
    console.log(part2(forest));
});

module.exports = { createForestMatrix, part1, part2 };
