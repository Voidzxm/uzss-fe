<template>
  <nav v-if="isShowBreadCrumb" class="breadcrumb" aria-label="breadcrumbs">
    <ul class="breadcrumb-ul">
      <li><span>Home</span></li>
      <li v-if="expandSecond !== undefined"><span>{{expandSecond}}</span></li>
      <li v-if="expandThird !== undefined && expandThird !== ''"><span>{{expandThird}}</span></li>
      <li v-if="activeNode !== undefined" class="is-active"><span>{{activeNode.name}}</span></li>
      <li class="is-active"><span href="#" aria-current="page">Breadcrumb</span></li>
    </ul>
  </nav>
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
      isShowBreadCrumb: ''
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
      let menuData = this.$store.state.userVariables.menuData
      let expandSecond = this.$store.state.userVariables.expandState.expandSecond
      let expandThird = this.$store.state.userVariables.expandState.expandThird
      if (expandSecond !== '') {
        let j = common.filterId(menuData, expandSecond)
        if (j.length > 0) {
          this.expandSecond = j[0].name
          if (expandThird !== '') {
            let s = common.filterId(j[0].secondClass, expandThird)
            if (s.length > 0) {
              this.expandThird = s[0].name
            }
          } else {
            this.expandThird = ''
          }
        }
      } else {
        this.expandSecond = ''
      }
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
</style>
