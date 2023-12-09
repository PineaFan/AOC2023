import { readFileSync } from "fs";

const raw = readFileSync("8/data.txt", "utf-8").split("\n").filter((x) => x.length)

const moves = raw[0].split("").map((x) => parseInt(x.replace("L", "0").replace("R", "1")))

let map: Record<string, string[]> = {}
for (const line of raw.splice(1)) {
    map[line.split(" ")[0]] = line.split("(")[1].split(")")[0].split(", ")
}

let step = 0;
let current = "AAA"

while (current !== "ZZZ") {
    current = map[current][moves[step % moves.length]]
    step ++;
}
console.log(step)
