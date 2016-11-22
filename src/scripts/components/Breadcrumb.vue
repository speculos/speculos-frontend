<template>
  <div class="ui breadcrumb">
    <router-link :to="part.url" v-for="(part, i) in parts">
      <span>{{part.endpath}}</span>
      <i class="right angle icon divider" v-if="i+1<parts.length"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  name : 'Breadcrumb',
  computed : {
    parts() {
      let parts = this.$route.path.split('/').slice(1)
      return parts.map((endpath, index, parts) => {
        let url = ''
        for (let i = 0; i <= index; i++) {
          url += '/' + parts[i]
        }
        return {endpath, url}
      })
    }
  }
}
</script>

<style lang="less">
.ui.breadcrumb i.icon:before {
  font-weight: bold;
}

.theme-dark .ui.breadcrumb i.icon:before {
  color: white;
}
</style>
