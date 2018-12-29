<template>
  <div class="top-header">
    <span class="fold-parent-container" @click="bus">
      <font-awesome-icon icon="list" class="fold-trigger"/>
    </span>
    <div class="right-parent-container">
      <div class="profile-parent-container">
        <span>
          <font-awesome-icon icon="search" class="right-tool"/>
        </span>
      </div>
      <div class="profile-parent-container">
        <span>
          <font-awesome-icon icon="question-circle" class="right-tool"/>
        </span>
      </div>
      <div class="profile-parent-container">
        <span>
        <font-awesome-icon icon="bell" class="right-tool"/>
      </span>
      </div>
      <div class="profile-parent-container" @mouseenter="titleDropDown = true" @mouseleave="titleDropDown = false" id="profile-container">
          <span>
            <img src="../../assets/logo.png" alt="logo">
            <span class="profile-name">Void zxm</span>
          </span>
          <transition name="fade" enter-active-class="animated fadeIn" leave-acive-class="animated fadeOut" :duration="{ enter: 200, leave: 200 }">
            <dropdownList :items="['Overview', 'Modifiers', 'Grid', 'Form']" v-if="titleDropDown" :style="{left: titleDropDownLeft + 'px'}"></dropdownList>
          </transition>
      </div>
      <div class="profile-parent-container" @mouseenter="lanDropDown = true" @mouseleave="lanDropDown = false" id="lan-container">
          <span>
            <font-awesome-icon icon="globe" class="right-tool"/>
          </span>
        <transition name="fade" enter-active-class="animated fadeIn" leave-acive-class="animated fadeOut" :duration="{ enter: 200, leave: 200 }">
          <dropdownList :items="['Overview', 'Modifiers', 'Grid', 'Form']" v-if="lanDropDown" :style="{left: lanDropDownLeft + 'px'}"></dropdownList>
        </transition>
      </div>
      <!--<span class="tool-parent-container" @mouseenter="lanDropDown = true" @mouseleave="lanDropDown = false">
        <font-awesome-icon icon="globe" class="right-tool"/>
        <transition name="fade" enter-active-class="animated fadeIn" leave-acive-class="animated fadeOut" :duration="{ enter: 200, leave: 200 }">
            <dropdownList :items="['Overview', 'Modifiers', 'Grid', 'Form']" v-if="lanDropDown"></dropdownList>
        </transition>
      </span>-->
    </div>
  </div>
</template>

<script>
import dropdownList from '../child-components/dropdownList'
import Bus from '../../assets/eventBus.js'

export default {
  name: 'TopNavigator',
  components: {dropdownList},
  data () {
    return {
      titleDropDown: false,
      lanDropDown: false,
      titleDropDownLeft: '',
      lanDropDownLeft: ''
    }
  },
  mounted: function () {
    let p = document.getElementById('profile-container')
    let l = document.getElementById('lan-container')
    this.titleDropDownLeft = this.getElementLeft(p) + p.offsetWidth - 150
    this.lanDropDownLeft = this.getElementLeft(l) + l.offsetWidth - 150
    const that = this
    window.onresize = function temp () {
      that.titleDropDownLeft = that.getElementLeft(p) + p.offsetWidth - 150
      that.lanDropDownLeft = that.getElementLeft(l) + l.offsetWidth - 150
    }
  },
  methods: {
    bus () {
      Bus.$emit('msg', '')
    },
    getElementLeft: function (element) {
      let actualLeft = element.offsetLeft
      let current = element.offsetParent

      while (current !== null) {
        actualLeft += current.offsetLeft
        current = current.offsetParent
      }

      return actualLeft
    },
    getElementTop: function (element) {
      let actualTop = element.offsetTop
      let current = element.offsetParent
      while (current !== null) {
        actualTop += current.offsetTop
        current = current.offsetParent
      }
      return actualTop
    }
  }
}
</script>

<style scoped>
  .top-header
  {
    height: 64px;
    line-height: 64px;
    padding: 0;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    position: relative;
    width: 100%;
    box-sizing: border-box;
    /*flex: 0 0 auto;*/
    font-size: 14px;
  }
  .fold-parent-container
  {
    float: left;
    transition: all .3s;
  }
  .fold-parent-container:hover
  {
    background-color: aliceblue;
    cursor: pointer;
  }
  .right-parent-container
  {
    float: right;
    overflow: hidden;
    height: 100%;
  }
  .top-header .fold-trigger
  {
    vertical-align: middle;
    font-size: 24px;
    margin: 20px;
  }
  .tool-parent-container
  {
    padding: 0 10px;
    height: 100%;
    transition: all .3s;
  }
  .profile-parent-container .right-tool
  {
    vertical-align: middle;
    font-size: 16px;
  }
  .profile-parent-container:hover .right-tool
  {
    color: #1496ed;
    cursor: pointer;
  }
  .profile-parent-container
  {
    padding: 0 12px;
    display: inline-block;
    height: 100%;
    transition: all .3s;
    margin: 0;
  }
  .profile-parent-container:hover
  {
    background-color: aliceblue;
    cursor: pointer;
  }
  .profile-parent-container img
  {
    display: inline-block;
    vertical-align: middle;
    height: 14px;
  }
  .profile-name
  {
    font-size: 15px;
  }
</style>
