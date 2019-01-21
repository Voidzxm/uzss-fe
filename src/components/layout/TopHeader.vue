<template>
  <div class="top-header">
    <div class="left-parent-container">
      <span class="fold-parent-container" @click="bus">
        <font-awesome-icon icon="list" class="fold-trigger" :class="rotate"/>
      </span>
      <BreadCrumb></BreadCrumb>
    </div>
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
          <DropdownList :items="['Overview', 'Modifiers', 'Grid', 'Form']" v-if="titleDropDown" :style="{left: titleDropDownLeft + 'px'}"></DropdownList>
      </div>
      <div class="profile-parent-container" @mouseenter="lanDropDown = true" @mouseleave="lanDropDown = false" id="lan-container">
          <span>
            <font-awesome-icon icon="globe" class="right-tool"/>
          </span>
          <DropdownList :items="['Overview', 'Modifiers', 'Grid', 'Form']" v-if="lanDropDown" :style="{left: lanDropDownLeft + 'px'}"></DropdownList>
      </div>
    </div>
  </div>
</template>

<script>
import common from '../../api/common'
import Bus from '../../assets/eventBus.js'
import DropdownList from '../child-components/DropdownList'
import BreadCrumb from '../child-components/BreadCrumb'

export default {
  name: 'TopHeader',
  components: {BreadCrumb, DropdownList},
  data () {
    return {
      titleDropDown: false,
      lanDropDown: false,
      titleDropDownLeft: '',
      lanDropDownLeft: '',
      rotate: ''
    }
  },
  mounted: function () {
    let p = document.getElementById('profile-container')
    let l = document.getElementById('lan-container')
    this.titleDropDownLeft = common.getElementLeft(p) + p.offsetWidth - 150
    this.lanDropDownLeft = common.getElementLeft(l) + l.offsetWidth - 150
    const that = this
    window.onresize = function temp () {
      that.titleDropDownLeft = common.getElementLeft(p) + p.offsetWidth - 150
      that.lanDropDownLeft = common.getElementLeft(l) + l.offsetWidth - 150
    }
  },
  methods: {
    bus () {
      Bus.$emit('msg', '')
      this.rotate = this.rotate === '' ? 'fa-rotate-90' : ''
    }
  }
}
</script>

<style scoped>
  .top-header
  {
    height: 50px;
    line-height: 50px;
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
    margin-right: 10px;
  }
  .fold-parent-container:hover
  {
    background-color: aliceblue;
    cursor: pointer;
  }
  .left-parent-container
  {
    float: left;
    overflow: hidden;
    height: 100%;
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
    margin: 15px;
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
