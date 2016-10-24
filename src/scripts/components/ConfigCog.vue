<template>
  <div class="config-cog">
    <i class="ui setting icon"></i>
    <div class="ui flowing popup">
      <auto-form :fields="fields"></auto-form>
    </div>
    </div>
  </div>
</template>

<script>
  import AutoForm from './AutoForm.vue'
  import "semantic-ui-less/definitions/modules/transition.js"
  import "semantic-ui-less/definitions/modules/popup.js"

  export default {
    name : 'ConfigCog',
    props : {
      fields: {
        type: Array,
        default: [{
          type : 'toggle',
          label : 'Prop "fields" is not setted.',
          state : true
        }]
      }
    },
    mounted() {
      $(this.$el).find('.ui.setting.icon').popup({
        inline : true,
        on : 'click'
      })
    },
    components : {
      "auto-form" : AutoForm
    }
  }
</script>

<style lang="less">
  .config-cog {
    .ui.icon {
      font-size: 1.2rem;
    }
  }
</style>
