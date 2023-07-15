const fs = require('fs');

// Read the file asynchronously
fs.readFile('./input.txt', 'utf8', function(err, data) {
    if (err) {
        console.error(err);
        return;
    }

    const lines = data.split('\n');
    const firstLine = lines[0];
    // console.log(firstLine);
    // Do something with the first line of the file

    let front = 0;
    let back = front + 14;
    while (back < firstLine.length) {
        const range = firstLine.substring(front, back);
        if (allUnique(range)) {
            console.log(back);
            break;
        }
        front++;
        back++;
    }
});

// checks whether the passed text has all unique chars
// returns a boolean
function allUnique(text) {
    const map = new Map();
    for (const ch of text) {
        if (map.has(ch)) {
            return false;
        } else {
            map.set(ch, 1);
        }
    }
    return true;
}

