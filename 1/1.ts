// Load in the data file
import { readFileSync } from "fs";

const data = readFileSync("1/data.txt", "utf-8").split("\n").filter((l) => l.length)

let sum = 0;

const isNumeric = (s) => {
    return !isNaN(parseInt(s, 10));
}

data.forEach((line) => {
    const chars = line
        .split("")
        .filter((char) => { return isNumeric(char) })
        .map((x) => parseInt(x))
    sum += (chars[0] * 10) + (chars[chars.length - 1])
});

console.log(sum)
