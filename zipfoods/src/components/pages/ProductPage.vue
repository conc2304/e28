<template lang="pug">
  #product-page
    h1 Product {{ id }}
</template>

<script>

export default {
  name: 'ProductPage',
  props: ['id'],
  data() {
    return {};
  },
};
</script>
