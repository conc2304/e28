<template>
    <div id="guessed-letters-wrapper">
        <h3>Guessed Letters</h3>
        <div v-for="(guess, index) in lettersGuessed" :key="lettersGuessed.id">{{ guess }}</div>
    </div>
</template>

<script>
export default {
    name: 'GuessedLetters',
    data () {
        return {}
    },
    props : {
      lettersGuessed: {
        type: Array,
        defualt: []
      }
    }, 
}
</script>