(function () {


  const availableWordLengths = ["short", "medium", "long"];
  let hangmanWords = {
    short: [],
    medium: [],
    long: [],
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
    vm.wordToGuess = hangmanWords[wordLength][randomInt];
    vm.wordToGuessArr = [];
    vm.lettersGuessed = [];
    vm.restartModalVisible = false;

    for (let i = 0; i < vm.wordToGuess.length; i++) {
      vm.wordToGuessArr.push('');
    }
    vm.strikesLeft = resetStrikeVal;
  };


  /**
  * Submit handler for making a guess.  Updates the strike count, updates the letters guessed, and those guessed correctly.
  * @param {string} guess
  */
  let handleGuess = event => {

    event.preventDefault();

    if (vm.lettersGuessed.includes(vm.guess)) {
      return;
    }

    if (vm.guess.length > 1) {
      if (vm.guess.toLowerCase() === vm.wordToGuess.toLowerCase()) {
        handleGameOver('success');

        for (let i = 0; i < vm.wordToGuessArr; i++) {
          vm.wordToGuessArr[i] = vm.wordToGuess.charAt(i);
        }

        console.log("Winner Winner Chicken Dinner!");
      } else {
        handleGameOver('fail');
        console.log("Loser Loser Booger Chooser!");
        vm.strikesLeft = 0;
      }
    } else if (vm.guess.length === 1) {

      let indicesOfGuess = getGuessIndexes(vm.guess, vm.wordToGuess);
      if (indicesOfGuess.length === 0) {
        handleStrike();
      } else {
        populateCorrectlyGuessedLetter(vm.guess, indicesOfGuess);
      }
      guessedLetterPop(vm.guess);
      if (validateWordCompletion(vm.wordToGuess)) {
        handleGameOver('success');
      }
    } else {
      console.log("wrong");
    }
    
    vm.guess = '';
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
  let populateCorrectlyGuessedLetter = (letter, indices) => {
    for (let index of indices) {
      vm.wordToGuessArr[index] = letter;
    }
  };

  /**
  *  Display the letters that were guessed regardless of correct.
  * @param {string} guessedLetter 
  */
  let guessedLetterPop = (guessedLetter) => {
    vm.lettersGuessed.push(guessedLetter);
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
    --vm.strikesLeft;
    if (vm.strikesLeft === 0) {
      handleGameOver('fail');
    }
  };

  /**
  * Check to see if all the letters of the word have been guessed.
  * @param {string} wordToGuess 
  */
  let validateWordCompletion = wordToGuess => {



    let guessedStr = '';
    for (let letter of vm.wordToGuessArr) {
      guessedStr += letter;
    }

    return guessedStr.toUpperCase() === wordToGuess.toUpperCase();
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
      msg = "Welp, that sucked, better luck next time pal ¯\\_(ツ)_/¯";
    }

    vm.gameOverMsg = msg;
    vm.restartModalVisible = true;
  }



  let data = {
    wordToGuess: '',
    wordToGuessArr: [],
    playerName: null,
    guessedWord: null,
    restartModalVisible:  true,
    lettersGuessed: [],
    strikesLeft: 6,
    gameOverMsg: '',
    guess: null,
    gameOverMsg : '',
    restartModalVisible : false,
  }

  let vm = new Vue({
    el: "#app",
    data: data,
    methods: {
      getRandomWord,
      handleGuess,
    }, 
  });

  groupRandomWordsByLength(randomWordList);
  getRandomWord("medium");
  
})();
