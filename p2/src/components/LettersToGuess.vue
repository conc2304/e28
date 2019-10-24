<template>
	<div id="letters-to-guess-wrapper" class="container">
		<div v-for="(letter, index) in lettersToGuess" :key="index" class="letter-box">{{ letter }}</div>
	</div>
</template>

<script>
export default {
	props: {
		lettersToGuess: {
			type: Array,
			defualt: []
		}
	}
};
</script>

<style scoped>
#letters-to-guess-wrapper {
	text-align: center;
	height: 60px;
}

.letter-box {
	border-bottom: 3px solid black;
	width: 30px;
	height: 30px;
	margin: 15px;
	display: inline-block;
	vertical-align: bottom;
	text-align: center;
	text-transform: uppercase;
}
</style>
