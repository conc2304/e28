<template>
  <div id="app">
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import GuessedLetters from './components/GuessedLetters'
import HangmanGallows from './components/HangmanGallows'
import LettersToGuess from './components/LettersToGuess'
import RestartGame from './components/RestartGame'
import StrikesLeftCounter from './components/StrikesLeftCounter'
import WordGuessForm from './components/WordGuessForm'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    HangManGallows,
    StrikesLeftCounter,
    GuessedLetters,
    LettersToGuess,
    GuessForm,
    GameRestarter,
  }
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
</style>
