<template>
  <div id="app">
    <img id="logo" src="./assets/images/zipfoods-logo.png" />
    <p>{{ headline }}</p>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    headline: 'ZipFoods is your one-stop-shop for convenient online grocery shopping in the greater Boston area.',
  }),
};
</script>
<style lang="scss">
@import './assets/css/zipfoods.scss';
</style>
