<template>
  <div class="ui form auto-form">
    <div class="field" v-for="(field, id) in fields">
      <!-- Toggle field -->
      <div class="ui toggle checkbox" v-if="field.type === 'toggle'">
        <input type="checkbox"
          class="hidden"
          :checked="field.state"
          :tabindex="id"
          :field-id="id"
          v-on:change="onFieldChange"
        >
        <label>{{field.label}}</label>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex"
  import "semantic-ui-less/definitions/modules/checkbox.js"

  export default {
    name : 'AutoForm',
    props : {
      fields: {
        type: Array,
        default: function () {
          return [{
            type : 'toggle',
            label : 'Default toggle',
            state : false
          }]
        }
      }
    },
    mounted() {
      $(this.$el).find('.ui.checkbox').checkbox()
    },
    methods : {
      onFieldChange(event) {
        let fieldId = $(event.target).attr('field-id')
        let fieldOpts = this.fields[fieldId]
        if (!fieldOpts.mutation) return
        if (fieldOpts.payload) {
          let payload = fieldOpts.payload.call(this, event.target.checked)
          this.$store.commit(fieldOpts.mutation, payload)
        }
        else {
          this.$store.commit(fieldOpts.mutation)
        }
      }
    },
    computed : mapGetters(['themeInvertedClass']),
  }
</script>

<style lang="less">
  @import "../../styles/forms.less";
</style>
