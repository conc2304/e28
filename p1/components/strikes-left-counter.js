let StrikesLeftCounter = {
    props: {
      strikesLeft: {
        type: Number,
        default: 6,
      }
    },
    methods: {
    },
    template: ` <h3 class="strike-wrapper">Strikes Left {{ strikesLeft  }}</h3>`
  };

