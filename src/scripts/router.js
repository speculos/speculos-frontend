import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/Home.vue'
import ComponentLoader from './components/ComponentLoader.vue'

import PageOverview from './components/PageOverview.vue'
import PageBots from './components/PageBots.vue'
import PageInstances from './components/PageInstances.vue'
import PageExchanges from './components/PageExchanges.vue'
import PageMarkets from './components/PageMarkets.vue'
import PageMarket from './components/PageMarket.vue'

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    redirect : '/home'
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: '', component: PageOverview },
      { path: 'overview', component: PageOverview },
      { path: 'bots', component: PageBots },
      { path: 'instances', component: PageInstances },
      { path: 'exchanges', component: PageExchanges },
      { path: 'markets', redirect: 'exchanges' },
      { path: 'markets/:exchange', component: PageMarkets },
      { path: 'markets/:exchange/:market', component: PageMarket },
    ]
  },
  {
    path: '/component/:name/:props',
    component: ComponentLoader,
  }
]

export default new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
})
