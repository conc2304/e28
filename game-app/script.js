(function() {
  let wordToGuess = "Banana";
  const availableWordLengths = ["short", "medium", "long"];
  let hangmanWords = {
    short: [],
    medium: [],
    long: []
  };

  const randomWordList = [
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

  let handleGuess = guess => {
    guessInputEl.value = "";

    if (lettersGuessed.includes(guess)) {
      return;
    }

    if (guess.length > 1) {
      if (guess.toLowerCase() === wordToGuess.toLowerCase()) {
        handleGameOver("success");

        let children = guessBoxWrapperEl.children;
        let array = [...children];

        for (let i = 0; i < array.length; i++) {
          array[i].textContent = wordToGuess.charAt(i);
        }

        console.log("Winner Winner Chicken Dinner!");
      } else {
        handleGameOver("fail");
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
        handleGameOver("success");
      }
    } else {
      console.log("wrong");
    }
  };

  let app = new Vue({
    el: "#app",
    data: {
      wordToGuess: wordToGuess,
      playerName: null,
      guessedWord: null,
      guesses: ["a", "b", "c"],
      strikesLeft: 6
    },
    methods: {
      getRandomWord,
      handleGuess
    }
  });
})();
