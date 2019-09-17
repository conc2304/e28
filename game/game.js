


let randomWordList = [
    "girls",
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
    "onerous",
];

let guessBoxWrapper = document.getElementById("letter-guess-wrapper");
let form = document.getElementById("take-a-guess");


let hangmanWords = {
    'short': [],
    'medium': [],
    'long': [],
};

const availableWordLengths = ['short', 'medium', 'long'];


/**
 * 
 * @param {*} randomWordList 
 */
let groupRandomWordsByLength = (randomWordList) => {
    hangmanWords = {
        'short': [],
        'medium': [],
        'long': [],
    };

    for (let word of randomWordList) {

        if (word.length > 9) {
            hangmanWords['long'].push(word);
        }
        else if (word.length > 5) {
            hangmanWords['medium'].push(word);
        }
        else {
            hangmanWords['short'].push(word);
        }
    }
}


/**
 * 
 * @param {*} wordLength 
 */
let getRandomWord = (wordLength) => {

    if (!availableWordLengths.includes(wordLength)) {
        wordLength = "medium";
    }

    let randomInt = getRandomInt(0, hangmanWords[wordLength].length - 1);
    let wordToGuess = hangmanWords[wordLength][randomInt];

    while(guessBoxWrapper.firstChild) {
        guessBoxWrapper.firstChild.remove();
    }

    guessBoxWrapper.appendChild(buildGuessingBoxes(wordToGuess));

    return wordToGuess;
}



/**
 * 
 * @param {*} wordToGuess 
 */
let buildGuessingBoxes = (wordToGuess) => {

    let letterBoxes = document.createElement('div');
    letterBoxes.classList.add('letter-box-wrapper');
    
    if (wordToGuess == undefined) {
        let stop = true;
    }
    let i = 0;
    while (i < wordToGuess.length) {
        letterBox = document.createElement('div');
        letterBox.classList.add('letter-box');
        letterBox.appendChild(document.createTextNode(wordToGuess.charAt(i)));
        letterBoxes.appendChild(letterBox);
        i++;
    }

    return letterBoxes;
};





/**
 * Given a min and max get a whole number (integer) between them.
 * @param min
 * @param max
 * @returns {number}
 */
let getRandomInt = (min, max) => {
    "use strict";
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
};


groupRandomWordsByLength(randomWordList);





let takeAGuess = (form) => {
    console.log(form);
}


let stuff = false;