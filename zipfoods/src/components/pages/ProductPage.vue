<template lang="pug">
  #product-page( v-if="product")
    h1 {{ product.name }}
    img(
      v-if='product.id'
      class='product-thumg'
      :alt="`Product image of ${product.name}`"
      :src='"./../../assets/images/products/" + product.id + ".jpg"'
    )

    p.description {{ product.description }}
    .price ${{ product.price }}
    router-link( :to='"/products"') &larr; Return to all products

</template>

<script>
const axios = require('axios');

export default {
  name: 'ProductPage',
  props: ['id'],
  data() {
    return {
      product: null,
    };
  },
  mounted() {
    this.product = axios
      .get(
        `https://my-json-server.typicode.com/conc2304/e28-zipfoods-api/products/${this.id}`,
      )
      .then((response) => {
        console.log(response);
        this.product = response.data;
      });
  },
};
</script>
