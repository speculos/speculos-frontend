<template>
  <div class="page">
    <h2>{{title}}</h2>
    <slot>Default page content</slot>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style>
  .page {
    margin: 20px 10px;
  }
</style>
