<template lang="pug">
  #app
    img#logo(src="./assets/images/zipfoods-logo.png")
    nav
      ul
        li( v-for='link in links' :key='link')
          router-link( :to="paths[link]" exact) {{ link }}
    router-view
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    links: ['home', 'products', 'categories'],
    paths: {
      home: '/',
      products: '/products',
      categories: '/categories',
    },
  }),
  components: {},
};
</script>

<style lang="scss">
@import './assets/css/zipfoods.scss';
</style>
