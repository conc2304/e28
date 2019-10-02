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
  function getRandomWord(wordLength) {
    if (!availableWordLengths.includes(wordLength)) {
      wordLength = "medium";
    }

    let randomInt = getRandomInt(0, hangmanWords[wordLength].length - 1);
    let wordToGuess = hangmanWords[wordLength][randomInt];
    console.log(wordLength);
    console.log(wordToGuess);
    this.$emit('update_word', wordToGuess);
  };


  /**
  * Submit handler for making a guess.  Updates the strike count, updates the letters guessed, and those guessed correctly.
  * @param {*} guess 
  */
  let handleGuess = (guess) => {

    // event.preventDefault();

    if (vm.lettersGuessed.includes(guess)) {
      return;
    }

    if (vm.guess.length > 1) {
      if (guess.toLowerCase() === vm.wordToGuess.toLowerCase()) {
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
    } else if (guess.length === 1) {

      let indicesOfGuess = getGuessIndexes(guess, vm.wordToGuess);
      if (indicesOfGuess.length === 0) {
        handleStrike();
      } else {
        populateCorrectlyGuessedLetter(guess, indicesOfGuess);
      }
      guessedLetterPop(guess);
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


  let HangManGallows = {
    props: {
      strikesLeft: {
        type: Number,
        required: true,
        default: 3,
      }
    },
    template: `<div class="stick-figure-wrapper block">
                  <img id="gallows" src="https://www.wpclipart.com/world_history/punishment/gallows_lineart.png"
                      alt="The Gallows">

                  <div class="hangman-body">
                      <img id="head" class="body-part" src="https://pngimg.com/uploads/trollface/trollface_PNG38.png"
                          v-bind:class="{ strike: strikesLeft <= 5}">
                      <div id="chest" class="body-part" v-bind:class="{ strike: strikesLeft <= 4 }"></div>
                      <div id="left-arm" class="body-part" v-bind:class="{ strike: strikesLeft <= 3 }"></div>
                      <div id="right-arm" class="body-part" v-bind:class="{ strike: strikesLeft <= 3 }"></div>
                      <div id="left-leg" class="body-part" v-bind:class="{ strike: strikesLeft <= 2 }"></div>
                      <div id="right-leg" class="body-part" v-bind:class="{ strike: strikesLeft <= 1 }"></div>
                      <div id="left-foot" class="body-part" v-bind:class="{ strike: strikesLeft <= 0 }"></div>
                      <div id="right-foot" class="body-part" v-bind:class="{ strike: strikesLeft <= 0 }"></div>
                  </div>
              </div>`,
    data() {
      return {
      }
    }
  };


  let GuessLettersWrapper = {
    props : {
      lettersGuessed: {
        type: Array,
        required: false,
      }
    }, 
    template: `<div id="guessed-letters-wrapper">
                  <h3>Guessed Letters</h3>
                  <div v-for="guess in lettersGuessed" >{{ guess }}</div>
              </div>`
  };

  let StrikesLeftCounter = {
    props: {
      strikesLeft: {
        type: Number,
        required: true,
      }
    },
    template: ` <h3 class="strike-wrapper">Strikes Left {{ strikesLeft  }}</h3>`
  };

  let GuessForm = {
    props: {
      strikesLeft: Number,
    },
    data: function() {
      return {
        guess: ''
      }
    },
    template: `<form @submit.prevent="handleGuess(guess)" id="take-a-guess">
                  <input  autocomplete="off" v-model="guess" value="guess" id="hangman-guess" name="hangman-guess" placeholder="Guess" :disabled="strikesLeft === 0" type="text" />
                  <label for="hangman-guess">Guess either a letter or the full word.</label>
                  <small>Guessing more than 1 letter counts as guessing the full word. <br>You can only guess the full
                      word once.</small>
              </form>`,

    methods: {
      'handleGuess': handleGuess
    }
  }

  let RestartWrapper = {
    props : {
      displayModal: {
        type: Boolean,
        default: false
      },
      gameOverMsg: String,
    },
    template : `<div  id="restart-wrapper" >
                  <h2 id="game-end-msg">{{ gameOverMsg }} </h2>
                  <h3>Start over with a new word</h3>
                  <button @click="emitNewWord('short')">Short Word</button>
                  <button @click="emitNewWord('medium')">Medium Word</button>
                  <button @click="emitNewWord('long')">Long Word</button>
                </div>`,
    methods: {
      emitNewWord: function(wordLength) {
        if (!availableWordLengths.includes(wordLength)) {
          wordLength = "medium";
        }
    
        let randomInt = getRandomInt(0, hangmanWords[wordLength].length - 1);
        let wordToGuess = hangmanWords[wordLength][randomInt];
        console.log(wordLength);
        console.log(wordToGuess);
        this.$emit('update_word', wordToGuess);
      }
    }

  };

  let LettersToGuess = {
    props: {
      wordToGuessArr: Array
    },
    template: `<div id="letters-to-guess-wrapper" class="container">
                 <div v-for="letter in wordToGuessArr" class="letter-box">{{ letter }}</div>
              </div>`
  };


  let data = {
    wordToGuess: '',
    wordToGuessArr: [],
    guessedWord: null,
    restartModalVisible:  true,
    lettersGuessed: [],
    strikesLeft: 6,
    gameOverMsg: '',
    // guess: null,
    gameOverMsg : '',
    restartModalVisible : false,
  }

  let vm = new Vue({
    el: "#app",
    data: data,
    methods: {
      restartGame,
    },
    components: {
      'hang-man-gallows': HangManGallows,
      'strikes-left-counter' : StrikesLeftCounter,
      'guessed-letters-wrapper': GuessLettersWrapper,
      'letters-to-guess': LettersToGuess,
      'guess-form': GuessForm,
      'restart-wrapper': RestartWrapper,
    } 
  });

  function restartGame (word){
    console.log(word);
    vm.wordToGuessArr = [];
    vm.lettersGuessed = [];
    vm.restartModalVisible = false;

    for (let i = 0; i < vm.wordToGuess.length; i++) {
      vm.wordToGuessArr.push('');
    }
    vm.strikesLeft = resetStrikeVal;
  }

  groupRandomWordsByLength(randomWordList);
  // getRandomWord("medium");
  
})();
