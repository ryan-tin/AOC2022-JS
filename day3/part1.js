const fs = require('node:fs');
const readline = require('node:readline');

async function solve() {
    const fileStream = fs.createReadStream('./input.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    let promise = new Promise(function (resolve, reject) {
        let tp = 0; // total priority
        rl.on('line', (line) => {
            // Each line in input.txt will be successively available here as `line`.
                // console.log(`Line from file: ${line}`);

            // find items in each compartment
            let [first, second] = findCompartmentItems(line);

            // find the repeated item
            // add each item to the map
            const first_items = logItems(first);
            const second_items = logItems(second);

            // then loop through the two maps, and look for duplicates
            const keyIter = first_items.keys();
            for (let k of keyIter) {
                if (!second_items.has(k)) {
                    // not the duplicated item
                    continue;
                }
                // add its priority and keep track of total priority
                if (k === k.toLowerCase()) {
                    // lowercase
                    tp += (k.charCodeAt() - 96);
                } else {
                    // uppercase
                    tp += (k.charCodeAt() - 38);
                }
                console.log(tp);
                break; // duped item found, continue to next
            }
        });
        resolve(tp);
    });
    let result = await promise; // FIX: why is this not waiting for promise?
    console.log(result);
}

solve();

/**
 * splits the two compartments of the bag into two
 * @param {string} items in the whole bag
 * @returns {string} two strings, the items in each compartment
 */
function findCompartmentItems(items) {
    let first = items.substring(0, items.length / 2);
    let second = items.substring(items.length / 2);
    return [first, second];
}

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
