<template>
    <div id="guessed-letters-wrapper">
        <h3>Guessed Letters</h3>
        <div v-for="(guess, index) in lettersGuessed" :key="index">{{ guess }}</div>
    </div>    
</template>

<script>
export default {
    name: 'GuessedLetters',
    props : {
      lettersGuessed: {
        type: Array,
        defualt: []
      }
    }, 
}
</script>

<style scoped>

  #guessed-letters-wrapper div{
    display: inline-block;
    margin: 15px;
    text-transform: capitalize;
  }
</style>