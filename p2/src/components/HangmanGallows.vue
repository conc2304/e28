<template>
	<div class="stick-figure-wrapper block">
		<img
			id="gallows"
			src="https://www.wpclipart.com/world_history/punishment/gallows_lineart.png"
			alt="The Gallows"
		/>

		<div class="hangman-body">
			<img
				id="head"
				class="body-part"
				src="https://pngimg.com/uploads/trollface/trollface_PNG38.png"
				v-bind:class="{ strike: strikesLeft <= 5}"
			/>
			<div id="chest" class="body-part" v-bind:class="{ strike: strikesLeft <= 4 }"></div>
			<div id="left-arm" class="body-part" v-bind:class="{ strike: strikesLeft <= 3 }"></div>
			<div id="right-arm" class="body-part" v-bind:class="{ strike: strikesLeft <= 3 }"></div>
			<div id="left-leg" class="body-part" v-bind:class="{ strike: strikesLeft <= 2 }"></div>
			<div id="right-leg" class="body-part" v-bind:class="{ strike: strikesLeft <= 1 }"></div>
			<div id="left-foot" class="body-part" v-bind:class="{ strike: strikesLeft <= 0 }"></div>
			<div id="right-foot" class="body-part" v-bind:class="{ strike: strikesLeft <= 0 }"></div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		strikesLeft: {
			type: Number,
			required: true,
			default: 3
		}
	}
};
</script>

<style scoped>
.stick-figure-wrapper {
	/* height: 700px; */
	display: block;
	position: relative;
}

.hangman-body {
	width: 300px;
	height: 300px;
	position: relative;
	margin: 0 auto;
	top: 85px;
	left: -25px;
}

#gallows {
	height: 300px;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: 0 auto;
}

.body-part {
	visibility: hidden;
}

.body-part.strike {
	visibility: visible;
}

#head {
	width: 50px;
	height: 60px;
	border: 5px solid black;
	border-radius: 50%;
	display: block;
	position: absolute;
	top: 21px;
	left: 133px;
	z-index: 1;
}

#chest {
	width: 6px;
	height: 50px;
	border: 3px solid black;
	display: block;
	position: absolute;
	top: 80px;
	left: 156px;
}

#left-leg {
	width: 6px;
	height: 50px;
	border: 3px solid black;
	display: block;
	position: absolute;
	top: 125px;
	left: 155px;
	transform: rotate(12deg);
	transform-origin: top;
}

#right-leg {
	width: 6px;
	height: 50px;
	border: 3px solid black;
	display: block;
	position: absolute;
	top: 125px;
	left: 155px;
	transform: rotate(-12deg);
	transform-origin: top;
}

#left-arm {
	width: 60px;
	height: 6px;
	border: 3px solid black;
	display: block;
	position: absolute;
	top: 86px;
	left: 97px;
}

#right-arm {
	width: 60px;
	height: 6px;
	border: 3px solid black;
	display: block;
	position: absolute;
	top: 86px;
	left: 161px;
}

#left-foot {
	width: 20px;
	height: 6px;
	border: 3px solid black;
	display: block;
	position: absolute;
	top: 170px;
	left: 130px;
	transform: rotate(8deg);
}

#right-foot {
	width: 20px;
	height: 6px;
	border: 3px solid black;
	display: block;
	position: absolute;
	top: 170px;
	left: 165px;
	transform: rotate(-8deg);
}
</style>
