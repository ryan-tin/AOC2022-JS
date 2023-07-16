const forest = require('./forest');

const testForest = [
    [ 3, 0, 3, 7, 3 ],
    [ 2, 5, 5, 1, 2 ],
    [ 6, 5, 3, 3, 2 ],
    [ 3, 3, 5, 4, 9 ],
    [ 3, 5, 3, 9, 0 ]
];

test('check visible trees', () => 
    expect(forest.part1(testForest)).toBe(21)
)

test('part2', () => 
    expect(forest.part2(testForest)).toBe(8)
)
