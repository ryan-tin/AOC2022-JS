const fs = require('node:fs');
const readline = require('node:readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('./input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    let max = 0;
    let current = 0;

    for await (let line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        line = Number(line);

        if (line === 0) {
            if (current > max) {
                max = current;
            }
            current = 0
        } else {
            current = current + line;
        }
    }
    return max;
}

let answer = processLineByLine();
answer.then(result => {
    console.log(result);
});
