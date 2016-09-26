<template>
  <component v-bind:is="$route.params.name"></component>
</template>

<script>
  import components from './index.js'

  export default {
    name : 'ComponentLoader',
    components : components
  }
</script>
