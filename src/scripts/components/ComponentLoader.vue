<template>
  <div><component v-bind:is="name"></component></div>
</template>

<script>
  import components from './index.js'

  export default {
    name : 'ComponentLoader',
    props : ['name'],
    components : components
  }
</script>
