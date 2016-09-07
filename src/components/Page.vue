<template>
  <div>
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

</style>
