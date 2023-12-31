import { readFileSync } from "fs";

const data = readFileSync("2/data.txt", "utf-8").split("\n").filter((l) => l.length)


let sum = 0

for (const line of data) {
    // First, split by ":" to find Game x and the rounds
    const [name, results] = line.split(": ") as [string, string];
    const gameNumber = parseInt(name.split(" ")[1]);
    let valid = true;
    for (const result of results.split("; ")) {
        for (const event of result.split(", ")) {
            const [amount, colour] = event.split(" ");
            if (colour === "red" && parseInt(amount) > 12) valid = false;
            if (colour === "green" && parseInt(amount) > 13) valid = false;
            if (colour === "blue" && parseInt(amount) > 14) valid = false;
        }
    }
    if (valid) sum += gameNumber
}

console.log(sum)
