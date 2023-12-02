// Load in the data file
import { readFileSync } from "fs";

const data = readFileSync("1/data.txt", "utf-8").split("\n").filter((l) => l.length)

let sum = 0;

const findDigit = (n) => {
    const numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const conversions = {
        "one": "1", "two": "2", "three": "3",
        "four": "4", "five": "5", "six": "6",
        "seven": "7", "eight": "8", "nine": "9"
    }
    for (const number of numbers) {
        if (n.includes(number)) {
            if (Object.keys(conversions).includes(number)) return parseInt(conversions[number])
            return parseInt(number)
        }
    };
    return null;
}

for (const line of data) {
    // First number
    let window = 1;
    let first: number | undefined = undefined;
    while (first === undefined) {
        const digit = findDigit(line.substring(0, window))
        if (digit) {
            first = digit;
            break;
        }
        window += 1
    }
    if (!first) continue
    // Last digit
    window = 1;
    let last: number | undefined = undefined;
    while (last === undefined) {
        const digit = findDigit(line.substring(line.length - window, line.length))
        if (digit) {
            last = digit;
            break;
        }
        window += 1
    }
    if (!last) continue
    sum += (10*first) + last
};

console.log(sum)
