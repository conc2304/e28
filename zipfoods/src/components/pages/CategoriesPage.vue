<template lang="pug">
  div
    h2 Categories
    ul.cleanList
      li( v-for="(category, id) in categories" :key='id') {{ category }}
</template>

<script>
const axios = require('axios');

export default {
  name: 'ShowCategories',
  props: {},
  data: () => ({
    products: [],
    categories: [],
  }),
  methods: {
    loadCategories() {
      const categories = this.products.map(product => product.categories);
      const mergedCategories = [].concat(...categories);

      return [...new Set(mergedCategories)].sort();
    },
  },
  mounted() {
    this.products = axios
      .get(
        'https://my-json-server.typicode.com/conc2304/e28-zipfoods-api/products',
      )
      .then((response) => {
        this.products = response.data;
        this.loadCategories();
      });
  },
};
</script>
