<template>
  <!-- name="no-mode-translate-fade" --> <!--name="in-out-translate-fade" mode="in-out"-->
  <transition name="in-out-translate-fade" mode="in-out">
    <nav v-if="isShowBreadCrumb" class="breadcrumb" aria-label="breadcrumbs">
      <ul class="breadcrumb-ul">
        <!--<li><span>Home</span></li>
        <li v-if="expandSecond !== undefined"><span>{{expandSecond}}</span></li>
        <li v-if="expandThird !== undefined && expandThird !== ''"><span>{{expandThird}}</span></li>
        <li v-if="activeNode !== undefined" class="is-active">
            <span>{{activeNode.name}}</span>
        </li>-->
        <transition-group name="in-out-translate-fade" mode="in-out">
          <li v-for="item in crumbs" :key="item" class="in-out-translate-fade-item"><span>{{item}}</span></li>
        </transition-group>
        <li class="is-active"><span href="#" aria-current="page">Breadcrumb</span></li>
      </ul>
    </nav>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import common from '../../api/common'

export default {
  name: 'BreadCrumb',
  data () {
    return {
      expandSecond: '',
      expandThird: '',
      isShowBreadCrumb: '',
      transition: true,
      crumbs: ['Home']
    }
  },
  computed: mapState({
    activeNode: state => state.userVariables.activatedTag
  }),
  watch: {
    activeNode: function () {
      console.debug('activeNode发生变化')
      if (this.activeNode !== undefined && this.activeNode !== '' && JSON.stringify(this.activeNode) !== '{}') {
        this.isShowBreadCrumb = true
      } else {
        this.isShowBreadCrumb = false
      }
      this.crumbs = ['Home']
      let menuData = this.$store.state.userVariables.menuData
      let expandSecond = this.$store.state.userVariables.expandState.expandSecond
      let expandThird = this.$store.state.userVariables.expandState.expandThird
      if (expandSecond !== '') {
        let j = common.filterId(menuData, expandSecond)
        if (j.length > 0) {
          this.expandSecond = j[0].name
          this.crumbs.push(j[0].name)
          if (expandThird !== '') {
            let s = common.filterId(j[0].secondClass, expandThird)
            if (s.length > 0) {
              this.expandThird = s[0].name
              this.crumbs.push(s[0].name)
            }
          } else {
            this.expandThird = ''
          }
        }
      } else {
        this.expandSecond = ''
      }
      this.crumbs.push(this.activeNode.name)
      this.transition = !this.transition
      console.log('BreadCrumb: crumbs: ' + this.crumbs)
      console.log('BreadCrumb: transition: ' + this.transition)
      console.debug('menuData' + JSON.stringify(menuData))
      console.debug('expandSecond & expandThird: ' + this.expandSecond + '    ' + this.expandSecond)
    }
  }
}
</script>

<style scoped>
  .breadcrumb-ul {
    font-size: 14px;
  }
  .breadcrumb span {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #3273dc;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding: 0 0.75em;
    cursor: default;
  }
  .in-out-translate-fade-enter-active, .in-out-translate-fade-leave-active {
    transition: all .5s;
  }
  .in-out-translate-fade-enter, .in-out-translate-fade-leave-active {
    opacity: 0;
  }
  .in-out-translate-fade-enter {
    transform: translateX(21px);
  }
  .in-out-translate-fade-leave-active {
    position: absolute;
    transform: translateX(-21px);
  }
  .in-out-translate-fade-item {
    transition: all .5s;
  }
</style>
