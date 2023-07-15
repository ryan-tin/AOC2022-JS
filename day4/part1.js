// In how many assignment pairs does one range fully contain the other?
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
        // NOTE: .map() does the same as below
        // one = Number(one);
        // two = Number(two);
        // three = Number(three);
        // four = Number(four);

        // if one range fully contains the other, 
        const cond1 = (one <= three) && (four <= two);
        const cond2 = (three <= one) && (two <= four);
        if (cond1 || cond2) {
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
