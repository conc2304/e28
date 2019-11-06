<template lang="pug">
  #app
    img#logo(src="./assets/images/zipfoods-logo.png")
    ShowCategories( :products='products')
    ShowHome( :products='products')
    ShowProducts( :products='products')
</template>

<script>
import products from './products';
import ShowProducts from './components/ShowProducts.vue';
import ShowCategories from './components/ShowCategories.vue';
import ShowHome from './components/ShowHome.vue';

export default {
  name: 'App',
  data: () => ({
    headline:
      'ZipFoods is your one-stop-shop for convenient online grocery shopping in the greater Boston area.',
    products,
  }),
  components: {
    ShowProducts,
    ShowCategories,
    ShowHome,
  },
};
</script>

<style lang="scss">
@import './assets/css/zipfoods.scss';
</style>
