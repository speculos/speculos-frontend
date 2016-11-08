<script>
  import components from './index.js'

  export default {
    name : 'ComponentLoader',
    render : function(createElement) {
      let props = this.$route.params.props ? JSON.parse(this.$route.params.props) : {}
      return createElement(
        'div',
        {'class': {component: true}},
        [createElement(
          components[this.$route.params.name],
          {props}
        )]
      )
    }
  }
</script>

<style>
.component {
  padding: 40px;
}
</style>
