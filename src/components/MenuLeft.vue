<template>
  <div>
    <router-link to="overview">Overview</router-link>
    <router-link to="bots">Bots</router-link>
    <router-link to="instances">Instances</router-link>
    <router-link to="markets">Markets</router-link>
  </div>
</template>

<script>
export default {
  name : 'MenuLeft',
  data() {
    return {
    };
  },
  computed: {},
  ready() {},
  attached() {},
  methods: {},
  components: {}
};
</script>

<style scoped>
  a {
    text-decoration: none;
    color: black;
  }
  a.router-link-active {
    color: teal;
  }
</style>
