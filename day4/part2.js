// find the number of pairs that overlap at all
// use regular expressions to get ranges

const fs = require('node:fs');
const readline = require('node:readline');

async function solve() {
    const rl = readline.createInterface({
        input: fs.createReadStream('./input.txt'),
        crlfDelay: Infinity,
    });

    let count = 0;

    const re = /(?<one>\d+)-(?<two>\d+),(?<three>\d+)-(?<four>\d+)/;

    for await (let line of rl) {
        let { one, two, three, four } = re.exec(line).groups;

        // convert from string to Number
        [one, two, three, four] = [one, two, three, four].map(
            (elem) => Number(elem));

        // conditions that lead to no overlap (negated)
        const noOverlap = (four < one) || (two < three);
        if (!noOverlap) {
            count++;
        }

    }
    rl.close();
    return count;
};

let answer = solve();
answer.then(result => {
    console.log(result);
});

