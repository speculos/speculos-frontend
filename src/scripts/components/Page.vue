<template>
  <div class="page">
    <h2>{{title}}</h2>
    <slot>Default page content</slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: ['title'],
  computed: {},
  ready() {},
  attached() {},
  methods: {},
  components: {}
};
</script>

<style>
  .page {
    margin: 20px 10px;
  }
</style>
