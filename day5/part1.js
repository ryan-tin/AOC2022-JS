// import { open } from 'node:fs/promises';
const { log } = require('node:console');
const fs = require('node:fs/promises');
// Q: what crate is at the top of each pile?
// return a string of the letters for the crates at the top of the pile

// The stack data structure is a natural choice because they can grow
// and shrink
// the front of the stack is the bottom of the pile, and the end of the
// stack is the top of tile pile


// STEPS:
// TODO: How to get into stacks into data-structures?
// need to parse each column
// use regex to match instructions
// stack number 1 is in position 1 in the string
// stack number 2 is in position 5 in the string
// stack number 3 is in position 9 in the string
// stack number 4 is in position 13 in the string
// stack number 5 is in position 17 in the string
// stack number 6 is in position 21 in the string
// stack number 7 is in position 25 in the string
// stack number 8 is in position 29 in the string
// stack number 9 is in position 33 in the strin

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
            for (let i = 0; i < numTiles; i++) {
                let crate = stacks[from].pop();
                stacks[to].push(crate);
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

