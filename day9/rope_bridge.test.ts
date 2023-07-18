import * as source from './rope_bridge' ;

// TODO: test negative values for isTouching()

test('isTouching())', () => {
    let tail : source.Point = {row: 0, column: 0};
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let head : source.Point = {row: i, column: j};
            expect(source.isTouching(head, tail)).toBe(true);
        }
    }
})

test('isTouching: not Touching', () => {
    let tail : source.Point = {row: 1, column: 1};
    let farHead : source.Point = {row: 3, column: 2};
    expect(source.isTouching(farHead, tail)).toBe(false);
})

// tests for newTailLocation
test('newTailLocation() straight-line move', () => {
    let tail : source.Point = {row: 1, column: 1};

    // up
    let upHead : source.Point = {row: -1, column: 1};
    expect(source.newTailLocation(upHead, tail)).toEqual({row:0, column:1});

    // down
    let downHead : source.Point = {row: 3, column: 1};
    expect(source.newTailLocation(downHead, tail)).toEqual({row:2, column:1});

    // left
    let leftHead : source.Point = {row: 1, column: -1};
    expect(source.newTailLocation(leftHead, tail)).toEqual({row:1, column:0});

    // right
    let rightHead : source.Point = {row: 1, column: 3};
    expect(source.newTailLocation(rightHead, tail)).toEqual({row:1, column:2});
})

test('newTailLocation() diagonal move', () => {
    let tail : source.Point = {row: 0, column: 0};

    // up-right
    let upRight : source.Point = {row: -2, column: 1};
    expect(source.newTailLocation(upRight, tail)).toEqual({row: -1, column: 1});

    // upLeft
    let upLeft : source.Point = {row: -2, column: -1};
    expect(source.newTailLocation(upLeft, tail)).toEqual({row: -1, column: -1});

    // downRight
    let downRight : source.Point = {row: 2, column: 1};
    expect(source.newTailLocation(downRight, tail)).toEqual({row: 1, column: 1});

    // downLeft
    let downLeft : source.Point = {row: 2, column: -1};
    expect(source.newTailLocation(downLeft, tail)).toEqual({row: 1, column: -1});

    // rightUp
    let rightUp : source.Point = {row: -1, column: 2};
    expect(source.newTailLocation(rightUp, tail)).toEqual({row: -1, column: 1});

    // leftUp
    let leftUp : source.Point = {row: -1, column: -2};
    expect(source.newTailLocation(leftUp, tail)).toEqual({row: -1, column: -1});

    // rightDown
    let rightDown : source.Point = {row: 1, column: 2};
    expect(source.newTailLocation(rightDown, tail)).toEqual({row: 1, column: 1});

    // leftDown
    let leftDown : source.Point = {row: 1, column: -2};
    expect(source.newTailLocation(leftDown, tail)).toEqual({row: 1, column: -1});
})

test('newTailLocation() overlapping case', () => {
    let tail : source.Point = {row: 5, column: 6};
    let head : source.Point = {row: 5, column: 6};
    expect(source.newTailLocation(head, tail)).toEqual({row: 5, column: 6});
})

// a head 2 blocks away pulls tail diagonally
// . . H      . . H
// . . .  ->  . T .
// T . .      . . .
test('newTailLocation() far diagonal', () => {
    let tail : source.Point = {row: 0, column: 0};
    let upLeft : source.Point = {row: -2, column: -2};
    let upRight : source.Point = {row: -2, column: 2};
    let downLeft : source.Point = {row: 2, column: -2};
    let downRight : source.Point = {row: 2, column: 2};

    expect(source.newTailLocation(upLeft, tail)).toEqual({row: -1, column: -1});
    expect(source.newTailLocation(upRight, tail)).toEqual({row: -1, column: 1});
    expect(source.newTailLocation(downLeft, tail)).toEqual({row: 1, column: -1});
    expect(source.newTailLocation(downRight, tail)).toEqual({row: 1, column: 1});
})
