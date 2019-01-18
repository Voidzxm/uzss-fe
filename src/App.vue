<template>
  <div id="app" class="dashboard">
    <!--<img src="./assets/logo.png">-->
    <LeftSlider></LeftSlider>
    <div class="x-layout">
      <TopHeader></TopHeader>
      <ScrollBar></ScrollBar>
      <keep-alive>
        <component v-bind:is="currentTabComponent"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import common from './api/common'
import { mapState } from 'vuex'
import LeftSlider from './components/layout/LeftSlider'
import TopHeader from './components/layout/TopHeader'
import ScrollBar from './components/child-components/ScrollBar'
import Playground from './components/main-component/Playground'
import NineNineEightyOne from './components/main-component/NineNineEightyOne'

export default {
  name: 'App',
  components: {ScrollBar, LeftSlider, TopHeader, Playground, NineNineEightyOne},
  data () {
    return {
      currentTabComponent: ''
    }
  },
  computed: mapState({
    activatedTag: state => state.userVariables.activatedTag
  }),
  watch: {
    activatedTag: function () {
      this.currentTabComponent = this.activatedTag.name
    }
  },
  mounted: function () {
    let _reversedData = common.reverseData(this.$store.state.userVariables.menuData)
    this.$store.commit('userVariables/setReversedData', _reversedData)
  }
}
</script>

<style>
  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    font-family: Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    /*color: #2c3e;*/
    background-color: rgb(240, 242, 245);
    /*去除html双击后选中有蓝色背景*/
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
    height: 100%;
    transition: all .3s linear;
  }
  .dashboard
  {
    display: flex;
    flex-direction: row;
    height: 100vh;
    min-height: 100vh;
    /*box-shadow: 2px 0 x rgba(0,21,41,.3;
    position: relative;
    z-index: 10;*/
  }
  .x-layout
  {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    flex: auto;
    overflow-x: hidden;
    box-sizing: border-box;
  }
</style>
