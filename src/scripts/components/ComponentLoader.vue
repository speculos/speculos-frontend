<template>
  <div class="component">
    <component v-bind:is="$route.params.name"></component>
  </div>
</template>

<script>
  import components from './index.js'

  export default {
    name : 'ComponentLoader',
    components : components
  }
</script>

<style>
.component {
  padding: 40px;
}
</style>
