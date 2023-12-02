import { readFileSync } from "fs";

const data = readFileSync("2/data.txt", "utf-8").split("\n").filter((l) => l.length)


let sum = 0

for (const line of data) {
    // First, split by ":" to find Game x and the rounds
    const [name, results] = line.split(": ") as [string, string];
    const gameNumber = parseInt(name.split(" ")[1]);
    let [red, green, blue] = [0, 0, 0]
    for (const result of results.split("; ")) {
        for (const event of result.split(", ")) {
            const [amount, colour] = event.split(" ");
            if (colour === "red" && parseInt(amount) > red) red = parseInt(amount);
            if (colour === "green" && parseInt(amount) > green) green = parseInt(amount);
            if (colour === "blue" && parseInt(amount) > blue) blue = parseInt(amount);
        }
    }
    const power = red * green * blue;
    sum += power
}

console.log(sum)
