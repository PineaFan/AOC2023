import { readFileSync } from "fs";

const rawRounds = readFileSync("7/data.txt", "utf-8")


const types = {
    fiveOfAKind: 7,
    fourOfAKind: 6,
    fullHouse: 5,
    threeOfAKind: 4,
    twoPairs: 3,
    onePair: 2,
    highCard: 1
}
const cardStrengths = {
    "2": 1,
    "3": 2, "4":  3, "5":  4,
    "6": 5, "7":  6, "8":  7,
    "9": 8, "T":  9, "J":  0,  // J is no longer 10
    "Q": 11, "K": 12, "A": 13
}

const mostCommon = (items: any[]) => {
    const mostCommon = items.sort((a, b) => items.filter(v => v === a).length - items.filter(v => v === b).length)[items.length - 1]
    return items.filter((x) => x === mostCommon).length
}

const handType = (cards: string[]) => {
    const jokers = cards.filter((x) => x === "J").length
    cards = cards.filter((x) => x !== "J")

    const cardSet = new Set(cards)
    const mostCommonCount = mostCommon(cards) + jokers
    // Theres a super special case when the hand is JJJJJ
    if (jokers === 5) return types.fiveOfAKind
    // If all elements are equal
    if (cardSet.size === 1) return types.fiveOfAKind
    // And if none of them are equal
    if (cardSet.size === 5) return types.highCard
    // If there were 2 types of cards,
    if (cardSet.size === 2) {
        // It could either be a 4 of a kind
        if (mostCommonCount === 4) return types.fourOfAKind
        // Or a full house
        return types.fullHouse
    }
    // If there were 4 unique cards, it must have been one pair
    if (cardSet.size === 4) return types.onePair
    // If the most of a single card was 2, it must be either 1 or 2 pairs - And we've already returned for 1 pair
    if (mostCommonCount === 2) return types.twoPairs
    // If none of the checks returned true, it must be three of a kind
    return types.threeOfAKind
}

const numberToString = (n: number) => {
    if (n < 10) return `0${n}`
    return `${n}`
}

const generateStrengthInt = (cards: string[], handType: number) => {
    return parseInt(handType.toString() + cards.map((card) => numberToString(cardStrengths[card])).join(""))
}

let rounds: {hand: string, bet: number, type: number, strength: number}[] = rawRounds
    .split("\n")
    .filter((line) => line.length)
    .map((card) => {
        const [cards, bet] = card.split(" ")
        const cardHandType = handType(cards.split(""))
        return {
            hand: cards,
            bet: parseInt(bet),
            type: cardHandType,
            strength: generateStrengthInt(cards.split(""), cardHandType)
        }
    })

// Next, we need to sort the rounds by their strength
// https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
rounds = rounds.sort((a, b) =>
    (a.strength > b.strength) ? 1 : (
        (b.strength > a.strength) ? -1 : 0
    ))  // Lowest value first - This makes sense for the next step

// And lastly, we need to determine the winning totals
// This is the bid * the rank
let total = 0
for (let i = 0; i < rounds.length; i++) {
    // Multiply the bet by the 1-indexed index in the list
    const handScore = rounds[i].bet * (i + 1)
    total += handScore
}
console.log(total)
