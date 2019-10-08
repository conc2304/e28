let GuessedLetters = {
    props : {
      lettersGuessed: {
        type: Array,
        defualt: []
      }
    }, 
    template: `<div id="guessed-letters-wrapper">
                  <h3>Guessed Letters</h3>
                  <div v-for="guess in lettersGuessed" >{{ guess }}</div>
              </div>`
  };