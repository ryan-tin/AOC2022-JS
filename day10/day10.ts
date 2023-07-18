import * as fsPromise from 'fs/promises';

// NOTE: Part 1 info
// there is a single register X which starts the value 1
// there are two instructions:
// addx V takes two cycles to complete
// AFTER two cycles, the X register is increased by value V
// noop takes one cycle to complete and does nothing

const inputFile = './input.txt';
const miniTestFile = './test_files/mini.txt';
const largerTestFile = './test_files/larger.txt';

export async function part1(inputFile: string) {
    const file = await fsPromise.open(inputFile, 'r');

    let X = 1;
    let clock: number = 1;
    let interval = 20;
    let sum = 0;

    for await (const line of file.readLines()) {
        let tokens: string[] = line.split(' ');

        if (tokens[0] == 'noop') {
            if (clock == interval) {
                interval += 40;
                sum += clock * X;
            }
            clock++;
        } else {
            // addx V takes two cycles to complete
            for (let i = 0; i < 2; i++) {

                if (clock == interval) {
                    interval += 40;
                    sum += clock * X;
                }

                clock++;
            }
            X += Number(tokens[1]);
        }
    }
    return sum;
}
part1(inputFile).then(res => console.log(res));
// part1(miniTestFile).then(res => console.log(res));
// part1(largerTestFile).then(res => console.log(res));
