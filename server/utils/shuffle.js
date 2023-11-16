exports.shuffleArray = (array) => {
    // Create a copy of the original array to avoid modifying the original array
    const shuffledArray = array.slice();
    // Fisher-Yates (Knuth) shuffle algorithm
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements at indices i and j
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
}