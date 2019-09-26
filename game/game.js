let wordToGuess = "";
const availableWordLengths = ["short", "medium", "long"];
let hangmanWords = {
    short: [],
    medium: [],
    long: []
};

let lettersGuessed = [];

let randomWordList = [
    "organization",
    "snakes",
    "romantic",
    "toothbrush",
    "spiritual",
    "nip",
    "seat",
    "water",
    "medical",
    "victorious",
    "form",
    "foamy",
    "leak",
    "humorous",
    "parsimonious",
    "lonely",
    "jealous",
    "propose",
    "stormy",
    "notice",
    "scientific",
    "gash",
    "recondite",
    "gaping",
    "debonair",
    "yarn",
    "faded",
    "jazzy",
    "dysfunctional",
    "educated",
    "grotesque",
    "greasy",
    "hellish",
    "deer",
    "brake",
    "request",
    "astonish",
    "steal",
    "furniture",
    "expansion",
    "sweater",
    "truculent",
    "reminiscent",
    "literate",
    "fumbling",
    "onerous"
];

const resetStrikeVal = 6;
let strikesLeft = resetStrikeVal;

let guessBoxWrapperEl = document.getElementById("letters-to-guess-wrapper");
let formEl = document.getElementById("take-a-guess");
let strikeCountEl = document.getElementById("strikes-left");
let guessedLettersEl = document.getElementById("guessed-letters-wrapper");
let guessInputEl = document.getElementById("hangman-guess");
let restartModal = document.getElementById("restart-wrapper");

document.getElementById("get-short-word").addEventListener('click', function () {
    getRandomWord("short");
}, false);

document.getElementById("get-medium-word").addEventListener('click', function () {
    getRandomWord("medium");
}, false);

document.getElementById("get-long-word").addEventListener('click', function () {
    getRandomWord("long");
}, false);

document.getElementById("take-a-guess").addEventListener(
    "submit",
    function (e) {
        e.preventDefault();
        let formData = new FormData(formEl);
        let guess = formData.get("hangman-guess");

        handleGuess(guess);
    },
    false
);

/**
 * Group the list of random words into groups by length
 * @param {array} randomWordList
 */
let groupRandomWordsByLength = randomWordList => {
    hangmanWords = {
        short: [],
        medium: [],
        long: []
    };

    for (let word of randomWordList) {
        if (word.length > 9) {
            hangmanWords["long"].push(word);
        } else if (word.length > 5) {
            hangmanWords["medium"].push(word);
        } else {
            hangmanWords["short"].push(word);
        }
    }
};

/**
 * Get a random word from the group of random words with the corresponding length
 * @param {string} wordLength
 */
let getRandomWord = wordLength => {
    if (!availableWordLengths.includes(wordLength)) {
        wordLength = "medium";
    }

    let randomInt = getRandomInt(0, hangmanWords[wordLength].length - 1);
    restartModal.style.visibility = "hidden";
    wordToGuess = hangmanWords[wordLength][randomInt];
    strikeCountEl.innerText = resetStrikeVal;

    while (guessBoxWrapperEl.firstChild) {
        guessBoxWrapperEl.firstChild.remove();
    }

    while (guessedLettersEl.firstChild) {
        guessedLettersEl.firstChild.remove();
    }

    buildGuessingBoxes(wordToGuess);
};

/**
 * Create the DOM elements to represent the letters to be guessed for the given word.
 * @param {string} wordToGuess
 */
let buildGuessingBoxes = wordToGuess => {
    let i = 0;
    while (i < wordToGuess.length) {
        letterBox = document.createElement("div");
        letterBox.classList.add("letter-box");
        guessBoxWrapperEl.appendChild(letterBox);
        i++;
    }
};

/**
 * Submit handler for making a guess.  Updates the strike count, updates the letters guessed, and those guessed correctly.
 * @param {string} guess
 */
let handleGuess = guess => {

    guessInputEl.value = '';

    if (lettersGuessed.includes(guess)) {
        return;
    }

    if (guess.length > 1) {
        if (guess.toLowerCase() === wordToGuess.toLowerCase()) {
            handleGameOver('success');

            let children = guessBoxWrapperEl.children;
            let array = [...children];
        
            for (let i = 0; i < array.length; i++) {
                array[i].textContent = wordToGuess.charAt(i);
            }

            console.log("Winner Winner Chicken Dinner!");
        } else {
            handleGameOver('fail');
            console.log("Loser Loser Booger Chooser!");
            strikeCountEl.innerText = 0;
        }
    } else if (guess.length === 1) {

        let indicesOfGuess = getGuessIndexes(guess, wordToGuess);
        if (indicesOfGuess.length === 0) {
            handleStrike();
        } else {
            populateGuessedLetter(guess, indicesOfGuess);
        }
        guessedLetterPop(guess);
        if (validateWordCompletion(wordToGuess)) {
            handleGameOver('success');
        }
    } else {
        console.log("wrong");
    }
};

/**
 * Get all of the indexes for the letter guessed in the word.
 * @param {string} guess
 * @param {string} wordToGuess
 */
let getGuessIndexes = (guess, wordToGuess) => {
    let indices = [];
    for (let i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess[i] === guess) {
            indices.push(i);
        }
    }

    return indices;
};

/**
 * Display the letters, in there correct spot, that have been guessed correctly.
 * @param {string} letter
 * @param {array} indices
 */
let populateGuessedLetter = (letter, indices) => {
    let parent = guessBoxWrapperEl;
    for (let i = 0; i < indices.length; i++) {
        parent.childNodes
            .item(indices[i])
            .appendChild(document.createTextNode(letter));
    }
};

/**
 *  Display the letters that were guessed regardless of correct.
 * @param {string} guessedLetter 
 */
let guessedLetterPop = (guessedLetter) => {
    lettersGuessed.push(guessedLetter);
    let letterWrapper = document.createElement("div");
    letterWrapper.appendChild(document.createTextNode(guessedLetter));
    guessedLettersEl.appendChild(letterWrapper);
}
/**
 * Given a min and max get a whole number (integer) between them.
 * @param min
 * @param max
 * @returns {number}
 */
let getRandomInt = (min, max) => {
    return (
        Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) +
        Math.ceil(min)
    );
};

/**
 * Display parts of the 'hang man' based on number of stikes left. Call the game-over handler on 0 strikes.
 */
let handleStrike = () => {
    strikeCountEl.innerText = --strikesLeft;

    switch (strikesLeft) {
        case 5:
            document.getElementById("head").classList.add("strike");
            break;
        case 4:
            document.getElementById("chest").classList.add("strike");
            break;
        case 3:
            document.getElementById("left-arm").classList.add("strike");
            document.getElementById("right-arm").classList.add("strike");
            break;
        case 2:
            document.getElementById("left-leg").classList.add("strike");
            break;
        case 1:
            document.getElementById("right-leg").classList.add("strike");
            break;
        case 0:
            document.getElementById("left-foot").classList.add("strike");
            document.getElementById("right-foot").classList.add("strike");
            handleGameOver('fail');
            break;
    }
}

/**
 * Check to see if all the letters of the word have been guessed.
 * @param {string} wordToGuess 
 */
let validateWordCompletion = wordToGuess => {

    let children = guessBoxWrapperEl.children;
    let array = [...children];

    let guessedStr = '';
    for (let key of array) {
        let test = key.textContent;

        guessedStr += key.textContent;
    }

<<<<<<< HEAD
    return guessedStr.toUpperCase === wordToGuess.toUpperCase
=======
    return guessedStr.toUpperCase() === wordToGuess.toUpperCase();
>>>>>>> 90c303582d4d5712ee52a5731a77eed8bd7909fb
}

/**
 * Display the restart game message based on successfull completion of the game;
 * @param {string} status 
 */
let handleGameOver = (status) => {

    let msg;

    if (status === 'success') {
        msg = "Congratulations You Won! Go on keep playing you know this is a blast!"
    } else {
        msg = "Welp, that sucked, better luck next time pal ¯\_(ツ)_/¯";
    }

    document.getElementById("game-end-msg").textContent = msg;
    restartModal.style.visibility = 'visible';
}


// Initialize the view
(() => {
    groupRandomWordsByLength(randomWordList);
    getRandomWord("medium");
})();
