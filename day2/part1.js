// A Rock
// B Paper
// C Scissors
//
// X Rock
// Y Paper
// Z Scissors

// Scores for your choice
// 1 Rock
// 2 Paper
// 3 Scissors

// Score for the outcome of the round
// 0 lost
// 3 draw
// 6 won

// score for a round = choice + outcome

// example
// A Y - Rock Paper - 2 + 6
// B X - Paper Rock - 1 + 0
// C Z - Scissors Scissors - 3 + 3
// 8 + 1 + 6 = 15

const fs = require('node:fs');
const readline = require('node:readline');

const map = new Map();
// winning scenarios
map.set('A', 'Y'); // opp plays rock, i play paper
map.set('B', 'Z'); // opp plays paper, i play scissors
map.set('C', 'X'); // opp plays scissors, i play rock
// outcome points
map.set('X', 1);
map.set('Y', 2);
map.set('Z', 3);

async function processLineByLine() {
    const fileStream = fs.createReadStream('./input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    let total_score = 0;
    for await (let line of rl) {
        // Each line in input.txt will be successively available here as `line`.

        // get opponent move and mine
        let opp = line.at(0);
        let mine = line.at(2);

        // add score for my move
        total_score += map.get(mine);

        // add outcome score
        // no points to add if i lose
        if (map.get(opp) == mine) {
            // win
            total_score += 6;
        } else if (mine.charCodeAt() - opp.charCodeAt() - 23 == 0) {
            // draw
            total_score += 3;
        }
    }
    return total_score;
}

let answer = processLineByLine();
answer.then(result => {
    console.log(result);
});
