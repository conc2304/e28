<template lang="pug">
  div
    p {{ headline }}
    ShowFeatured(
      :category='"snacks"'
      :products='products'
    )
</template>

<script>
import ShowFeatured from './ShowFeatured.vue';
import products from '../products';

export default {
  name: 'ShowHome',
  props: {},
  data: () => ({
    products,
    headline:
      'ZipFoods is your one-stop-shop for convenient online grocery shopping in the greater Boston area.',
  }),
  components: {
    ShowFeatured,
  },
};
</script>
