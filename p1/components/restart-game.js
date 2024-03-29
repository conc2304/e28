let GameRestarter = {
    props : {
      displayModal: {
        type: Boolean,
        default: false
      },
      gameOverMsg: String,
    },
    template : `<div v-show="displayModal" id="restart-wrapper" >
                  <h2 id="game-end-msg">{{ gameOverMsg }} </h2>
                  <h3>Start over with a new word</h3>
                  <button @click="emitNewWord('short')">Short Word</button>
                  <button @click="emitNewWord('medium')">Medium Word</button>
                  <button @click="emitNewWord('long')">Long Word</button>
                </div>`,
    methods: {
      emitNewWord: function(wordLength) {
        this.$emit('update_word', wordLength);
      }
    }
  };