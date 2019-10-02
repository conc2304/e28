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

    if (!this.$emit('update_word', wordToGuess)) {
      vm.wordToGuess = wordToGuess;
    }
    
  };


  function initializeView() {

    wordLength = 'medium';
    groupRandomWordsByLength(randomWordList);
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
  }

  function restartGame (word){
    console.log(word);
    this.wordToGuessArr = [];
    this.lettersGuessed = [];
    this.restartModalVisible = false;

    for (let i = 0; i < vm.wordToGuess.length; i++) {
      this.wordToGuessArr.push('');
    }
    console.log(this.wordToGuessArr);
    this.strikesLeft = resetStrikeVal;
  }




  let data = {
    wordToGuess: '',
    wordToGuessArr: [],
    lettersGuessed: [],
    strikesLeft: 6,
    gameOverMsg: '',
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
      'guessed-letters-wrapper': GuessedLetters,
      'letters-to-guess': LettersToGuess,
      'guess-form': GuessForm,
      'restart-wrapper': GameRestarter,
    },
    mounted() {
      console.log('mounted');
    }
  });

  initializeView();

})();


