import { readFileSync } from "fs";

const raw = readFileSync("3/data.txt", "utf-8")
const data = raw.split("\n").filter((l) => l.length)


const symbols = Array.from(new Set(Array.from(raw.split("\n").join("")).filter((x) => !("0123456789.".includes(x)))))


const numbers = "0123456789";
let symbolCoordinates: [number, number][] = []
interface Number {
    y: number; xStart: number; xEnd: number; value: string
}
let numberData: Number[] = []
let savingNumber = false;

for(let y = 0; y < data.length; y++) {
    for(let x = 0; x < data[y].length; x++) {
        if (symbols.includes(data[y][x])) {
            symbolCoordinates.push([y, x])
            savingNumber = false;
        } else if (numbers.includes(data[y][x])) {
            // It was a number! Choose what to do with it
            if (savingNumber) {
                numberData[numberData.length - 1].value += data[y][x];
                numberData[numberData.length - 1].xEnd += 1;
            } else {
                numberData.push({
                    y: y,
                    xStart: x,
                    xEnd: x,
                    value: data[y][x]
                })
            }
            savingNumber = true;
        } else {
            savingNumber = false;
        }
    }
}


const inCommon = (l1: any[], l2: any[]): boolean => {
    return (new Set(l1.concat(l2))).size < l1.concat(l2).length
}

const listBetween = (start: number, end: number): number[] => {
    let out: number[] = [];
    let current = start;
    do {
        out.push(current)
        current ++
    } while (current <= end)
    return out;
}

let total = 0;
// Processing time! First, loop over the coordinates of each symbol
for (const [y, x] of symbolCoordinates) {
    let found: Number[] = numberData.filter((number) =>
        (number.y === y && number.xEnd === x - 1) ||  // If the end of a number is x-1, it's on the left
        (number.y === y && number.xStart === x + 1)   // If the start of a number is x+1, it's on the right
    )
    // For the top and bottom, we need any number where [x-1 to x+1] overlaps with [xStart to xEnd] of a number
    const xRange = [x - 1, x, x + 1]
    // So, let's loop over each number in the list
    for (const number of numberData.filter((n) => n.y === y + 1 || n.y === y - 1)) {
        const numberXRange = listBetween(number.xStart, number.xEnd);
        if (inCommon(xRange, numberXRange)) {
            found.push(number)
        }
    }
    // So what's different for part 2?
    // Well we only care about the symbols where there are exactly 2 neighbours
    // So, check that!
    if (found.length === 2) {
        // Then find the 2 values and multiply them
        const toAdd = parseInt(found[0].value) * parseInt(found[1].value);
        total += toAdd;
    }
}

console.log(total)
