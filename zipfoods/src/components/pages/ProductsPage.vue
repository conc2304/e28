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
import products from '@/products';

export default {
  components: {
    ShowProduct,
  },
  props: {},
  data: () => ({
    products,
  }),
};
</script>
