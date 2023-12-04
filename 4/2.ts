import { readFileSync } from "fs";

const raw = readFileSync("4/data.txt", "utf-8")
const data = raw.split("\n").filter((l) => l.length)


const stringFormatted: string[][] = data.map((card) => card.split(": ")[1].split(" | "))
// This is now [["1 2 3 4 5", "6 7 8 9 10"], [...], ...]
// Next step is to convert into [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]]
const grouped = stringFormatted.map((pair) => pair.map((item) => item.split(" ").map((x) => parseInt(x)).filter((x) => x > 0)))

let total = 0;

let toScratchQueue = grouped.map((x) => x);

while (toScratchQueue.length) {
    total += 1
    const currentCard = toScratchQueue.pop()!
    let cardIndex = grouped.indexOf(currentCard);
    for (const number of currentCard[0]) {
        if (currentCard[1].includes(number)) {
            cardIndex += 1
            toScratchQueue.push(grouped[cardIndex])
        }
    }
}

console.log(total)
