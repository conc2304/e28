<template lang="pug">
  #featured
    h2 Featured Products
    ul.cleanList
      li(
        v-for='product in featuredProducts'
        :key='product.id'
        ) {{ product.name }}
</template>

<script>
export default {
  props: {
    category: {
      type: String,
    },
    products: {
      type: Array,
    },
  },
  computed: {
    featuredProducts() {
      function isMatch(product) {
        return product.categories.includes(this);
      }
      return this.products.filter(isMatch, this.category);
    },
  },
  data: () => ({
  }),
};
</script>
