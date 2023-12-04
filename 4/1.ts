import { readFileSync } from "fs";

const raw = readFileSync("4/data.txt", "utf-8")
const data = raw.split("\n").filter((l) => l.length)


const stringFormatted: string[][] = data.map((card) => card.split(": ")[1].split(" | "))
// This is now [["1 2 3 4 5", "6 7 8 9 10"], [...], ...]
// Next step is to convert into [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]]
const grouped = stringFormatted.map((pair) => pair.map((item) => item.split(" ").map((x) => parseInt(x)).filter((x) => x > 0)))

let total = 0;
for (const card of grouped) {
    let cardTotal = 0;
    for (const number of card[0]) {
        if (card[1].includes(number)) cardTotal += cardTotal === 0 ? 1 : cardTotal
    }
    total += cardTotal
}

console.log(total)
