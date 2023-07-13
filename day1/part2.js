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

    let top_3 = Array(3);
    top_3.fill(0);
    let current = 0;

    for await (let line of rl) {
        line = Number(line);
        // Each line in input.txt will be successively available here as `line`.

        if (line === 0) {

            let i;
            let temp;

            // put largest element in the first spot that fits
            for (i = 0; i < top_3.length; i++) {

                if (current > top_3[i]) {

                    // push other values back
                    while (i < top_3.length) {
                        temp = top_3[i]; // keep track of old value
                        top_3[i] = current; // put new element in
                        current = temp;
                        i++;
                    }
                }
            }
            current = 0

        } else {
            current = current + line;
        }
    }

    // get the total weight of the top 3
    let total = 0;
    for (i = 0; i < top_3.length; i++) {
        total += top_3[i];
    }
    return total;
}

let answer = processLineByLine();
answer.then(result => {
    console.log(result);
});
