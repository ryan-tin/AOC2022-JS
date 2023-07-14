const fs = require('node:fs');
const readline = require('node:readline');

const fileStream = fs.createReadStream('input.txt');
const rl = readline.createInterface({
    input: fileStream,
    crlf: Infinity,
});

let i = 0;
let first, second, third;
let tp = 0;

rl.on('line', (line) => {
    // get three lines at a time
    // find common element in the three lines
    // add element's priority to total prio
    switch (i % 3) {
        case 0: // first line
            first = logItems(line);
            break;
        case 1:  // second line
            second = logItems(line);
            break;
        case 2: // third line
            third = logItems(line);
            tp += findCommonElementPriority(first, second, third);
            console.log(tp);
            break;
    }
    i++;
});

/** 
 * return a map, where key is the item, and value is the number of times 
 * it appears in the bag
 */
function logItems(items) {
    let map = new Map();
    for (let i in items) {
        if (!map.has(items[i])) {
            map.set(items[i], 1);
        } else {
            map.set(items[i], map.get(items[i]) + 1);
        }
    }
    return map;
}

// find common element in the three maps and return its priority
function findCommonElementPriority(first, second, third) {
    let priority;
    const keyIter = first.keys();
    for (let k of keyIter) {
        if (second.has(k) && third.has(k)) {
            // add its priority and keep track of total priority
            if (k === k.toLowerCase()) {
                // lowercase
                priority = k.charCodeAt() - 96;
            } else {
                // uppercase
                priority = k.charCodeAt() - 38;
            }
            break;
        }
    }
    return priority;
}
