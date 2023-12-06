import { readFileSync } from "fs";

const [rawTimes, rawDistances] = readFileSync("6/data.txt", "utf-8").split("\n").filter((line) => line.length)
const times = rawTimes.split(":")[1].split(" ").filter((x) => x.length).map((x) => parseInt(x))
const distances = rawDistances.split(":")[1].split(" ").filter((x) => x.length).map((x) => parseInt(x))
const pairs: [number, number][] = distances.map((distance, index) => [distance, times[index]])

let total = 1;

for (const [record, length] of pairs) {
    // For a time, you can hold for an amount of time (x) anywhere from 0 to the length of the race (length)
    // Each of these hold times gives a distance travelled (y) of speed (time held, x) * time remaining (length - x)
    // So... an equation for the distance travelled is simply (time)(length - time), or timeLength - time^2

    // Next, we need to figure out at which point the value is faster than the record
    // So for a distance x, the equation for distance will be:
    // (-time^2) + (time * length) - record > 0
    //     a             b             c
    // So the race will be won between (-b±(b^2 - 4ac)^1/2)/2a (Quadratic Formula)
    const [a, b, c] = [-1, length, -record]
    const sqrtDiscriminant = ((b**2) - (4*a*c))**(1/2)
    const [min, max] = [(-b+sqrtDiscriminant)/(2*a), (-b-sqrtDiscriminant)/(2*a)]
    // The number of whole numbers between min and max is the value we need
    const between = Math.ceil(max) - Math.floor(min) - 1
    total *= between
}

console.log(total)
