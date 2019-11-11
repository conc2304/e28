<template lang="pug">
  router-link( :to='{ name:"product", params: { id: product.id }}')
    .product
      .product-name {{ product.name }}
      img.product-thumb(
        :src='"@/assets/images/products/" + product.id + ".jpg"'
        :alt='"Product image of  " + product.name'
      )

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
