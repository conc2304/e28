<template>
  <div id="app">
    <div id='app' v-cloak>
    <div class="container">
        <h1 id="page-title" class="block">This is Hang Man</h1>

        <HangmanGallows :strikes-left="strikesLeft" />
        <LettersToGuess :letters-to-guess="lettersToGuess" />
        <GuessedLetters :letters-guessed="lettersGuessed"/>

        <StrikesLeftCounter :strikes-left="strikesLeft" />
        <WordGuessForm
          :strikes-left="strikesLeft"
          :word-to-guess="wordToGuess"
          :letters-guessed="lettersGuessed"
          :letters-to-guess="lettersToGuess"
          v-on:update_strikes="updateStrikeCount" 
          v-on:game_over="handleGameOver"
        />

        <RestartGame 
          :display-modal="restartModalVisible" 
          :game-over-msg="gameOverMsg"
          v-on:update_word="restartGame"
        />

    </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import GuessedLetters from './components/GuessedLetters'
import HangmanGallows from './components/HangmanGallows'
import LettersToGuess from './components/LettersToGuess'
import RestartGame from './components/RestartGame'
import StrikesLeftCounter from './components/StrikesLeftCounter'
import WordGuessForm from './components/WordGuessForm'


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
  return hangmanWords[wordLength][randomInt];
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

function initializeView() {
  let wordLength = 'medium';
  groupRandomWordsByLength(randomWordList);

  let randomInt = getRandomInt(0, hangmanWords[wordLength].length - 1);
  this.wordToGuess = hangmanWords[wordLength][randomInt];
  console.log(this.wordToGuess);

  for (let i = 0; i < this.wordToGuess.length; i++) {
    this.lettersToGuess.push('');
  }
  this.strikesLeft = resetStrikeVal;
}

function restartGame (wordLength){
  let word = getRandomWord(wordLength);
  this.lettersToGuess = [];
  this.lettersGuessed = [];
  this.restartModalVisible = false;
  this.strikesLeft = resetStrikeVal;
  this.wordToGuess = word;
  for (let i = 0; i < word.length; i++) {
    this.lettersToGuess.push('');
  }
}

function updateStrikeCount(numStrikesLeft){
  this.strikesLeft = numStrikesLeft
}

function handleGameOver(gameOverObj) {
  console.log(gameOverObj);
  if (gameOverObj.status === "pending") {
    return;
  }
  this.restartModalVisible = true;
  this.gameOverMsg = gameOverObj.gameOverMsg;
  console.log(this.gameOverMsg);

}


let data = {
  wordToGuess: '',
  lettersToGuess: [],
  lettersGuessed: [],
  strikesLeft: 6,
  gameOverMsg: '',
  restartModalVisible : false,
}

export default {
  name: 'App',
  data() { return data; },
  methods: {
    restartGame,
    updateStrikeCount,
    handleGameOver,
    initializeView
  },
  components: {
    // HelloWorld
    HangmanGallows,
    GuessedLetters,
    LettersToGuess,
    RestartGame,
    StrikesLeftCounter,
    WordGuessForm,
  },
  mounted() {
    console.log('mounted');
  },
  created() {
    this.initializeView();
  },
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

  [v-cloak] {
    display: none;
  }

  * {
    box-sizing: border-box;
  }
  
  .container {
      width: 960px;
      margin: 0 auto;
  }
  
  .block {
    margin: 30px auto;
  }
</style>
