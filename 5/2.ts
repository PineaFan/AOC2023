import { readFileSync } from "fs";

const raw = readFileSync("5/data.txt", "utf-8").split("\n").filter((line) => line.length)

// The first line of the file is special - It's the one that lists the seeds
const [rawSeeds, data] = [raw[0].split(": ")[1].split(" "), raw.slice(1)]

// The next step is to interpret the data as different maps
// A map consists of {from: string, to: string, rangeStart: number, rangeEnd: number, offset: number}

const rawHeadings: string[][] = data
    .filter((line) => line.endsWith(":"))
    .map((line) => line.split(" map")[0].split("-"))
const headingsToFrom: [string, string][] = rawHeadings.map((item) => [item[0], item[2]])

// So now we know how to convert from x to y - Next we need to generate the map objects
let headingID = -1;
let maps: {from: string, to: string, next: {rangeStart: number, rangeEnd: number, offset: number}[] }[] = []

for (const line of data) {
    if (line.endsWith(":")) {
        headingID ++;
        maps.push({from: headingsToFrom[headingID][0], to: headingsToFrom[headingID][1], next: []});
        continue
    };
    // So, we now know the line will be a rangeStart, rangeEnd, offset array
    const [destinationRange, sourceRange, length] = line.split(" ")
    // Add it to the end of the list
    maps[maps.length - 1].next.push({
        rangeStart: parseInt(sourceRange),
        rangeEnd: parseInt(sourceRange) + parseInt(length) - 1,  // For 2 elements, it ends at the first element + 1
        offset: parseInt(destinationRange) - parseInt(sourceRange)
    });
}

// So now it's all in the right format!
const fromIndices = maps.map((item) => item.from)

let minimum = Infinity;

for (let i = 0; i < rawSeeds.length; i += 2) {
    let n = parseInt(rawSeeds[i])
    const stop = parseInt(rawSeeds[i + 1]) + n;
    while (n < stop) {
        let from = "seed";
        let value = n;
        while (from !== "location") {
            // Find the information from the maps
            let thisMap = maps[fromIndices.indexOf(from)]
            for (const range of thisMap.next) {
                if (range.rangeStart <= value && range.rangeEnd >= value) {
                    // It's within the range! Add the offset and break out of the loop
                    value += range.offset;
                    break;
                }
            }
            // And update the "from" variable to the destination of the maps
            from = thisMap.to;
        }
        if (value < minimum) minimum = value
        n ++;
    }
}

console.log(minimum)
