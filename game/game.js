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

document.getElementById("take-a-guess").addEventListener(
  "submit",
  function(e) {
    e.preventDefault();
    let formData = new FormData(formEl);
    let guess = formData.get("hangman-guess");

    handleGuess(guess);
  },
  false
);

/**
 *
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
 *
 * @param {string} wordLength
 */
let getRandomWord = wordLength => {
  if (!availableWordLengths.includes(wordLength)) {
    wordLength = "medium";
  }

  let randomInt = getRandomInt(0, hangmanWords[wordLength].length - 1);
  wordToGuess = hangmanWords[wordLength][randomInt];

  strikeCountEl.innerText = resetStrikeVal;

  while (guessBoxWrapperEl.firstChild) {
    guessBoxWrapperEl.firstChild.remove();
  }

  guessBoxWrapperEl.appendChild(buildGuessingBoxes(wordToGuess));
};

/**
 *
 * @param {string} wordToGuess
 */
let buildGuessingBoxes = wordToGuess => {
  let letterBoxes = document.createElement("div");
  letterBoxes.id = "letter-box-wrapper";

  let i = 0;
  while (i < wordToGuess.length) {
    letterBox = document.createElement("div");
    letterBox.classList.add("letter-box");
    letterBoxes.appendChild(letterBox);
    i++;
  }

  return letterBoxes;
};

/**
 *
 * @param {string} guess
 */
let handleGuess = guess => {

  guessInputEl.value ='';

  if (lettersGuessed.includes(guess)) {
    return;
  }

  if (guess.length > 1) {
    if (guess.toLowerCase() === wordToGuess.toLowerCase()) {
      console.log("Winner Winner Chicken Dinner!");
    } else {
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
  } else {
    console.log("wrong");
  }
};

/**
 *
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
 *
 * @param {string} letter
 * @param {array} indices
 */
let populateGuessedLetter = (letter, indices) => {
  let parent = document.getElementById("letter-box-wrapper");
  for (let i = 0; i < indices.length; i++) {
    parent.childNodes
      .item(indices[i])
      .appendChild(document.createTextNode(letter));
  }
};

/**
 * 
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
      handleGameOver();
      break;
  }
}

let handleGameOver = () => {
  console.log('You Lost');
}

groupRandomWordsByLength(randomWordList);
getRandomWord("medium");
