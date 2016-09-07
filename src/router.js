import Vue from 'vue';
import VueRouter from 'vue-router';

import PageOverview from './components/PageOverview.vue';
import PageBots from './components/PageBots.vue';
import PageInstances from './components/PageInstances.vue';
import PageMarkets from './components/PageMarkets.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: PageOverview },
    { path: '/overview', component: PageOverview },
    { path: '/bots', component: PageBots },
    { path: '/instances', component: PageInstances },
    { path: '/markets', component: PageMarkets }
  ]
})
