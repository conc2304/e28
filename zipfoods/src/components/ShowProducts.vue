<template lang="pug">
  #products
    h2 Products
    ShowProduct(
      v-for='product in products'
      :key='product.id'
      :product='product')
</template>

<script>
import ShowProduct from '@/components/ShowProduct.vue';

export default {
  components: {
    ShowProduct,
  },
  props: {
    products: {
      type: Array,
    },
  },
  data: () => ({}),
};
</script>
