<template lang="pug">
  .product
    .product-name {{ product.name }}
    img.product-thumb( :src='"./../assets/images/products/" + product.id + ".jpg"')
    p.product-description {{ product.description }}
    .product-price ${{ product.price }}
</template>

<script>
export default {
  name: 'ShowProduct',
  props: {
    product: {
      type: Object,
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
  data: () => ({}),
  methods: {},
  components: {},
  mounted() {},
  created() {},
};
</script>
