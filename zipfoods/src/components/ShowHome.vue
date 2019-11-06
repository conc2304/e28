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

export default {
  name: 'ShowHome',
  props: {
    products: {
      type: Array,
    },
  },
  data: () => ({
    headline:
      'ZipFoods is your one-stop-shop for convenient online grocery shopping in the greater Boston area.',
  }),
  components: {
    ShowFeatured,
  },
};
</script>
