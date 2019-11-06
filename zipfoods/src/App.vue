<template lang="pug">
  #app
    img#logo(src="./assets/images/zipfoods-logo.png")
    p {{ headline }}
    ShowFeatured( :category='"snacks"')
    ShowProducts
</template>

<script>
import ShowProducts from './components/ShowProducts.vue';
import ShowFeatured from './components/ShowFeatured.vue';
import products from './products';

console.log(products);

export default {
  name: 'App',
  data: () => ({
    headline:
      'ZipFoods is your one-stop-shop for convenient online grocery shopping in the greater Boston area.',
    products,
  }),
  components: {
    ShowProducts,
    ShowFeatured,
  },
};
</script>
<style lang="scss">
@import './assets/css/zipfoods.scss';
</style>
