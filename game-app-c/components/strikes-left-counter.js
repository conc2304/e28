let StrikesLeftCounter = {
    props: {
      strikesLeft: {
        type: Number,
        required: true,
      }
    },
    template: ` <h3 class="strike-wrapper">Strikes Left {{ strikesLeft  }}</h3>`
  };