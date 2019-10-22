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
    return hangmanWords[wordLength][randomInt];
  };


  function initializeView() {
    wordLength = 'medium';
    groupRandomWordsByLength(randomWordList);
  
    let randomInt = getRandomInt(0, hangmanWords[wordLength].length - 1);
    vm.wordToGuess = hangmanWords[wordLength][randomInt];
  
    for (let i = 0; i < vm.wordToGuess.length; i++) {
      vm.lettersToGuess.push('');
    }
    vm.strikesLeft = resetStrikeVal;
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

  let vm = new Vue({
    el: "#app",
    data: data,
    methods: {
      restartGame,
      updateStrikeCount,
      handleGameOver,
    },
    components: {
      'hang-man-gallows': HangManGallows,
      'strikes-left-counter' : StrikesLeftCounter,
      'guessed-letters-wrapper': GuessedLetters,
      'letters-to-guess': LettersToGuess,
      'word-guess-form': GuessForm,
      'restart-wrapper': GameRestarter,
    },
    mounted() {
      console.log('mounted');
    },
    created() {

    }
  });

  initializeView();

})();


