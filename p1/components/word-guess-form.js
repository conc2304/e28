/**
 * Submit handler for making a guess.  Updates the strike count, updates the letters guessed, and those guessed correctly.
 * @param {*} guess
 */
function handleGuess(
  guess,
  wordToGuess,
  lettersGuessed,
  lettersToGuess,
  strikesLeft
) {
  if (lettersGuessed.includes(guess)) {
    return;
  }
  let gameOver = {
    status: "pending"
  };

  if (guess.length > 1) {
    if (guess.toLowerCase() === wordToGuess.toLowerCase()) {
      gameOver = handleGameOver("success");

      for (let i = 0; i < lettersToGuess; i++) {
        lettersToGuess[i] = wordToGuess.charAt(i);
      }

      console.log("Winner Winner Chicken Dinner!");
    } else {
      gameOver = handleGameOver("fail");
      console.log("Loser Loser Booger Chooser!");
      strikesLeft = 0;
    }
  } else if (guess.length === 1) {
    let indicesOfGuess = getGuessIndexes(guess, wordToGuess);
    if (indicesOfGuess.length === 0) {
      strikesLeft--;
      if (strikesLeft === 0) {
        gameOver = handleGameOver("fail");
      }
    } else {
      lettersToGuess = populateCorrectlyGuessedLetter(
        guess,
        indicesOfGuess,
        lettersToGuess
      );
    }

    lettersGuessed = guessedLetterPop(guess, lettersGuessed);
    if (validateWordCompletion(wordToGuess, lettersToGuess)) {
      gameOver = handleGameOver("success");
    }
  } else {
    console.log("wrong");
  }

  this.guess = "";
  this.$emit("update_strikes", strikesLeft);
  this.$emit("game_over", gameOver);
}

/**
 * Check to see if all the letters of the word have been guessed.
 * @param {string} wordToGuess
 */
let validateWordCompletion = (wordToGuess, lettersToGuess) => {
  let guessedStr = "";
  for (let letter of lettersToGuess) {
    guessedStr += letter;
  }

  return guessedStr.toUpperCase() === wordToGuess.toUpperCase();
};

/**
 * Display the restart game message based on successfull completion of the game;
 * @param {string} status
 */
let handleGameOver = status => {
  let msg;

  if (status === "success") {
    msg =
      "Congratulations You Won! Go on keep playing you know this is a blast!";
  } else {
    msg = "Welp, that sucked, better luck next time pal ¯\\_(ツ)_/¯";
  }

  return { status: status, gameOverMsg: msg };
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
let populateCorrectlyGuessedLetter = (letter, indices, lettersToGuess) => {
  for (let index of indices) {
    lettersToGuess.splice(index, 1, letter);
  }

  return lettersToGuess;
};

/**
 * Display parts of the 'hang man' based on number of stikes left. Call the game-over handler on 0 strikes.
 */
let handleStrike = strikesLeft => {
  --strikesLeft;
  return strikesLeft;
};

/**
 *  Display the letters that were guessed regardless of correct.
 * @param {string} guessedLetter
 */
let guessedLetterPop = (guessedLetter, lettersGuessed) => {
  lettersGuessed.push(guessedLetter);
};
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

let GuessForm = {
  props: {
    strikesLeft: Number,
    wordToGuess: {
      type: String,
      default: ""
    },
    lettersGuessed: {
      type: Array,
      default: []
    },
    lettersToGuess: {
      type: Array,
      default: []
    }
  },
  data: function() {
    return {
      guess: ""
    };
  },
  template: `<form @submit.prevent="handleGuess(guess, wordToGuess, lettersGuessed, lettersToGuess, strikesLeft)" id="take-a-guess">
                  <input  autocomplete="off" v-model="guess" value="guess" id="hangman-guess" name="hangman-guess" placeholder="Guess" :disabled="strikesLeft === 0" type="text" />
                  <label for="hangman-guess">Guess either a letter or the full word.</label>
                  <small>Guessing more than 1 letter counts as guessing the full word. <br>You can only guess the full
                      word once.</small>
              </form>`,

  methods: {
    handleGuess: handleGuess
  }
};
