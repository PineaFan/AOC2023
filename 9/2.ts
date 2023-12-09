import { readFileSync } from "fs";

const rawLines: string[] = readFileSync("9/data.txt", "utf-8").split("\n").filter((x) => x.length)
const lines: number[][] = rawLines.map((line) => line.split(" ").map((x) => parseInt(x)))


const differenceArray = (items: number[]): number[] => {
    let out: number[] = []
    for (let i = 1; i < items.length; i++) {
        out.push(items[i] - items[i - 1])
    }
    return out;
}


let total = 0;
for (const line of lines) {
    let count = 0;
    let difference: number[] = line;
    let allDifferences: number[][] = [difference];
    // Find the difference, use the array to backtrack
    while (!difference.every((entry) => entry === 0)) {
        difference = differenceArray(difference);
        allDifferences.push(difference)
        count ++;
    }
    allDifferences = allDifferences.slice(0, allDifferences.length - 1)
    // And now we need to figure out the next value
    let final = 0;
    for (let i = allDifferences.length - 1; 0 <= i; i--) {
        final = allDifferences[i][0] - final
    }
    total += final
}
console.log(total)
