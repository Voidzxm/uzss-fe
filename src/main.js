// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import '../node_modules/bulma/css/bulma.css'
import 'animate.css'
import { library } from '@fortawesome/fontawesome-svg-core'
// import { faCoffee, faListAlt, faList, faSearch, faQuestionCircle, faBell, faGlobe, faAngleDown, faAngleUp, faTachometerAlt, faFeather } from '@fortawesome/free-solid-svg-icons'
import {fas} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// library.add({ faCoffee, faListAlt, faList, faSearch, faQuestionCircle, faBell, faGlobe, faAngleDown, faAngleUp, faTachometerAlt, faFeather })
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
