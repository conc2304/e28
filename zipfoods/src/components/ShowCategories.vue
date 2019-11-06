<template lang="pug">
  div
    h2 Categories
    ul.cleanList
      li( v-for="(category, id) in categories" :key='id') {{ category }}
</template>

<script>
export default {
  name: 'ShowCategories',
  props: {
    products: {
      type: Array,
    },
  },
  computed: {
    categories() {
      const categories = this.products.map(product => product.categories);
      const mergedCategories = [].concat(...categories);

      return [...new Set(mergedCategories)].sort();
    },
  },
};
</script>
