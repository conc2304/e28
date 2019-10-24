<template>
    <h3 class="strike-wrapper">Strikes Left {{ strikesLeft  }}</h3>
</template>

<script>
export default {
    props: {
      strikesLeft: {
        type: Number,
        default: 6,
      }
    },
}
</script>

<style scoped>
  .strike-wrapper {
    text-align: center;
  }
</style>