let HangManGallows = {
    props: {
      strikesLeft: {
        type: Number,
        required: true,
        default: 3,
      }
    },
    template: `<div class="stick-figure-wrapper block">
                  <img id="gallows" src="https://www.wpclipart.com/world_history/punishment/gallows_lineart.png"
                      alt="The Gallows">

                  <div class="hangman-body">
                      <img id="head" class="body-part" src="https://pngimg.com/uploads/trollface/trollface_PNG38.png"
                          v-bind:class="{ strike: strikesLeft <= 5}">
                      <div id="chest" class="body-part" v-bind:class="{ strike: strikesLeft <= 4 }"></div>
                      <div id="left-arm" class="body-part" v-bind:class="{ strike: strikesLeft <= 3 }"></div>
                      <div id="right-arm" class="body-part" v-bind:class="{ strike: strikesLeft <= 3 }"></div>
                      <div id="left-leg" class="body-part" v-bind:class="{ strike: strikesLeft <= 2 }"></div>
                      <div id="right-leg" class="body-part" v-bind:class="{ strike: strikesLeft <= 1 }"></div>
                      <div id="left-foot" class="body-part" v-bind:class="{ strike: strikesLeft <= 0 }"></div>
                      <div id="right-foot" class="body-part" v-bind:class="{ strike: strikesLeft <= 0 }"></div>
                  </div>
              </div>`,
    data() {
      return {
      }
    }
  };