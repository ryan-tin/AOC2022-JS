// How many positions does the tail of the rope visit at least once?

// INFO: Part1: the Problem
// the location of the head and tail is represented by two values each,
// a row and column, which is relative to the start position
// if the tail moves too far away from the head, it needs to follow the head

import * as fsPromise from 'fs/promises';

async function part1() {
    const inputFile = './input.txt';
    const file = await fsPromise.open(inputFile, 'r');

    const tailPath = new Map();

    // starting points
    let head: Point = { row: 0, column: 0 };
    let tail: Point = { row: 0, column: 0 };
    tailPath.set("0,0", 0); // starting point is also in the unique path

    const re = /(?<direction>[UDLR]{1}) (?<steps>\d+)/
    for await (const line of file.readLines()) {
        const matches = line.match(re);
        const steps = Number(matches.groups.steps);
        const direction = matches.groups.direction;
        for (let i = 0; i < steps; i++) {
            head = move(head, direction);
            if (isTouching(head, tail)) {
                continue;
            }
            tail = newTailLocation(head, tail);
            let location = tail.row + "," + tail.column;
            tailPath.set(location, 0);
        }
    }
    console.log(tailPath.size);
}
part1();

async function part2() {
    const inputFile = './input.txt';
    const file = await fsPromise.open(inputFile, 'r');

    const tailPath = new Map();
    tailPath.set("0,0", 0); // starting point is also in the unique path

    let points = Array(10);
    // fill array with starting points
    for (let i = 0; i < 10; i++) {
        points[i] = {row: 0, column: 0};
    }

    const re = /(?<direction>[UDLR]{1}) (?<steps>\d+)/
    for await (const line of file.readLines()) {
        const matches = line.match(re);
        const steps = Number(matches.groups.steps);
        const direction = matches.groups.direction;
        for (let i = 0; i < steps; i++) {
            // move head
            points[0] = move(points[0], direction);
            // move other points one at a time 
            for (let j = 0; j < points.length - 1; j++) {
                if (isTouching(points[j], points[j+1])) {
                    continue;
                }
                points[j+1] = newTailLocation(points[j], points[j+1]);
            }
            // track tail location
            let tailLocation = points[9].row + "," + points[9].column;
            tailPath.set(tailLocation, 0);
        }
    }
    console.log(tailPath.size);
}
part2();

export interface Point {
    row: number;
    column: number;
};

function move(point: Point, direction: string): Point {
    switch (direction) {
        case 'U':
            return { row: point.row - 1, column: point.column };
        case 'D':
            return { row: point.row + 1, column: point.column };
        case 'L':
            return { row: point.row, column: point.column - 1 };
        case 'R':
            return { row: point.row, column: point.column + 1 };
    }
}


/** 
* returns true if the head and tail are touching, else false
*/
export function isTouching(a: Point, b: Point): Boolean {
    return Math.abs(a.row - b.row) > 1 ? false
        : Math.abs(a.column - b.column) > 1 ? false
            : true;
}

/** 
* given a head and tail that are not touching, 
* returns the location of where to move the tail
*/
export function newTailLocation(head: Point, tail: Point): Point {
    // overlapping case: tail does not move
    if (head.row == tail.row && head.column == tail.column) {
        return tail;
    };
    // straight line tail move
    // one of the numbers is the same, and the other is two bigger / lower
    const straightLineMove: Boolean = (head.row == tail.row && head.column != tail.column)
        || (head.column == tail.column && head.row != tail.row);
    if (straightLineMove) {
        // move the tail in that direction (straight-line)
        if (head.row < tail.row) {                      // up
            return { row: tail.row - 1, column: tail.column };
        } else if (head.row > tail.row) {               // down
            return { row: tail.row + 1, column: tail.column };
        } else if (head.column < tail.column) {         // left
            return { row: tail.row, column: tail.column - 1 };
        } else {                                        // right
            return { row: tail.row, column: tail.column + 1 };
        }
    } else {
        // diagonal move
        if (Math.abs(head.row - tail.row) == 2 && Math.abs(head.column - tail.column) == 2) {
            if (head.row > tail.row && head.column > tail.column) {         // down right diag
                return { row: tail.row + 1, column: tail.column + 1 };
            } else if (head.row > tail.row && head.column < tail.column) {  // down left diag
                return { row: tail.row + 1, column: tail.column - 1 };
            } else if (head.row < tail.row && head.column > tail.column) {  // up right diag
                return { row: tail.row - 1, column: tail.column + 1 };
            } else {                                                        // up left diag
                return { row: tail.row - 1, column: tail.column - 1 };
            }
        }
        else if (Math.abs(head.row - tail.row) == 2) {
            if (head.row > tail.row) {
                return { row: tail.row + 1, column: head.column };
            } else {
                return { row: tail.row - 1, column: head.column };
            }
        } else {
            if (head.column > tail.column) {
                return { row: head.row, column: tail.column + 1 };
            } else {
                return { row: head.row, column: tail.column - 1 };
            }
        }
    }
}
