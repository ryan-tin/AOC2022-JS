// what are the crates at the tops of the piles if the crane can pick up
// more than one box at a time?

const { log } = require('node:console');
const fs = require('node:fs/promises');

// regular expressions
// to match instructions
const instruction = /move (\d+) from (\d) to (\d)/;

// match each stack according to position
const stacks = new Array(9);
// fill with empty array
for (let i = 0; i < stacks.length; i++) {
    stacks[i] = new Array(0);
}

const positions = [1, 5, 9, 13, 17, 21, 25, 29, 33];

let debug = 0;

async function solve() {
    const file = await fs.open('./input.txt');

    for await (const line of file.readLines()) {
        if (!/\d/.test(line)) {
            let i = 0;
            // populate stacks
            while (i < line.length) {
                if (!(line.charCodeAt(i) >= 65 && line.charCodeAt(i) <= 90)) {
                    // its not a capital letter, skip it
                    i++;
                    continue;
                }

                // if it is a letter, find which stack it belogs to
                const stackNum = positions.indexOf(i);

                // keep track of the stacks in our structure
                stacks[stackNum].unshift(line.at(i));
                i++;
            }
        } else if (instruction.test(line)) {
            // an instruction line
            const match = line.match(instruction);
            const numTiles = Number(match[1]);
            const from = Number(match[2] - 1);
            const to = Number(match[3] - 1);
            
            // move tiles
            const crates = stacks[from].splice(stacks[from].length - numTiles, numTiles);

            for (let i = 0; i < crates.length; i++) {
                stacks[to].push(crates[i]);
            }
        }
    }
    // get tops of stacks
    let answer = "";
    for (let i = 0; i < stacks.length; i++) {
        answer += stacks[i].pop();
    }
    return answer;
};

solve().then(
    (result) => console.log(result) 
);

