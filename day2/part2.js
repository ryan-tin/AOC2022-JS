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

// outcome points
const map = new Map();
map.set('X', 0); // lose
map.set('Y', 3); // draw
map.set('Z', 6); // win

const win = new Map();
win.set('A', 2); // opp plays rock, i play paper, worth 2
win.set('B', 3); // opp plays paper, i play scissors, worth 3
win.set('C', 1); // opp plays scissors, i play rock, worth 1

const lose = new Map();
lose.set('A', 3); // opp rock, me scissors, worth 3
lose.set('B', 1); // opp paper, me rock, worth 1
lose.set('C', 2); // opp scissors, me paper, worth 2

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
        // console.log(line);

        // get opponent move and outcome
        let opp = line.at(0);
        let outcome = line.at(2);

        // add outcome score
        total_score += map.get(outcome);
        // console.log(map.get(outcome));

        // add score for my move
        if (map.get(outcome) == 6) {
            // win
            total_score += win.get(opp)
        } else if (map.get(outcome) == 3) {
            // draw
            total_score += opp.charCodeAt() - 64;
        } else {
            // lose
            total_score += lose.get(opp)
        }
    }
    return total_score;
}

let answer = processLineByLine();
answer.then(result => {
    console.log(result);
});
