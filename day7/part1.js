// find the sum of the sizes of all directories with total size of at most 100k
const fs = require('fs');
const readline = require('node:readline');

// find the sum of sizes of all dirs with size <= 10K
function part1(directories) {
    let sum = 0;
    for (let key of directories.keys()) {
        let size = directories.get(key);
        if (size <= 100000) {
            sum += size;
        }
    }
    console.log(`part1: ${ sum }`);
};

// find the size of the smallest directory that would put total 
// unused space above 30 million
function part2(directories) {
    let totalSpace = 70000000;
    let totalUsed = directories.get('/home');

    let totalUnused = totalSpace - totalUsed;
    let toRelease = 30000000 - totalUnused;

    let current = Infinity;
    for (let v of directories.values()) {
        if (v < toRelease) {
            // ignore dirs that are too small
            continue;
        }
        current = Math.min(current, v)
    }
    console.log(`part2: ${current}`);
}

async function prepareFileDirectories(path) {
    // Open the file as a readable stream
    const fileStream = fs.createReadStream(path, { encoding: 'utf8' });

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    // Event listener for each chunk of data read from the stream

    let directories = new Map();
    directories.set('/home', 0);
    let currPath = "/home";

    for await (let line of rl) {
        let tokens = line.split(' ');
        // Process each line

        if (tokens[0] == '$') {
            if (tokens[1] == 'ls') {
                continue;
            } else {
                switch (tokens[2]) {
                    case '..': // move back a dir
                        // find and replace path with path up to last occurence of '/'
                        currPath = currPath.slice(0, currPath.lastIndexOf('/'));
                        break;
                    case '/':
                        currPath = '/home';
                        break;
                    default:
                        // cd to that dir
                        currPath = currPath + '/' + tokens[2];
                        directories.set(currPath, 0);
                }
            }
        } else {
            if (tokens[0] != 'dir') {
                let tempPath = currPath;
                // update all parent directories
                while (tempPath != "") {
                    directories.set(tempPath, (directories.get(tempPath) + Number(tokens[0])));
                    tempPath = tempPath.slice(0, tempPath.lastIndexOf('/'));
                }
            }
        }
    }
    // console.log(directories);
    return directories;
}

let promise = prepareFileDirectories('./input.txt');
promise.then(result => {
    part1(result);
    part2(result);
})

