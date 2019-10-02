let LettersToGuess = {
    props: {
      lettersToGuess: {
        type: Array,
        defualt: []
      }
    },
    template: `<div id="letters-to-guess-wrapper" class="container">
                 <div v-for="letter in lettersToGuess" class="letter-box">{{ letter }}</div>
              </div>`
  };