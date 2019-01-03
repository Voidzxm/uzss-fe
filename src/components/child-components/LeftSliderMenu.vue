<template>
<div>
  <ul class="menu-list ul-parent" v-for="item in menudata" :key="item.id">
    <li class="li-parent" :class="{'li-parent-active': activeParent === item.name }">
      <div v-if="folderNot" class="menu-container">
        <span class="icon-span-parent">
          <span class="icon-span" style="font-size: 14px;">
            <font-awesome-icon :icon="item.icon"/>
          </span>
        </span>
      </div>
      <div v-else class="menu-container" @click="clickFirst(item)">
        <span class="icon-span-parent" style="float:left;">
          <span class="icon-span">
            <font-awesome-icon icon="tachometer-alt"/>
          </span>
          <span class="menu-name-span">{{item.name}}</span>
        </span>
          <span class="angle-span">
          <font-awesome-icon  icon="angle-down" v-if="expandLi !== item.name"/>
          <font-awesome-icon  icon="angle-up" v-else/>
        </span>
        </div>
      <div v-if="! folderNot">
      <transition
        name="slide-fade">
      <ul class="menu-list second-menu-list" v-if="item.secondClass.length >= 0 && expandLi === item.name && ! folderNot">
        <li v-if="! folderNot" class="li-child" :class="{'is-active': activeNode === second.name }" @click="clickSecond(item, second)" v-for="second in item.secondClass" :key="item.id + second.id">
          <a :class="{'is-active a': activeNode === second.name }">{{second.name}}</a>
        </li>
      </ul>
      </transition>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
import Bus from '../../assets/eventBus.js'

export default {
  name: 'LeftSliderMenu',
  props: [ 'menudata' ],
  data () {
    return {
      folderNot: false,
      isActive: '',
      activeNode: null,
      activeParent: null,
      expandLi: ''
    }
  },
  mounted: function () {
    let that = this
    Bus.$on('msg', (e) => {
      that.folderNot = !that.folderNot
    })
  },
  methods: {
    clickFirst: function (item) {
      this.expandLi = this.expandLi === item.name ? '' : item.name
    },
    clickSecond: function (item, second) {
      this.activeNode = second.name
      this.activeParent = item.name
    }
  }
}
</script>

<style scoped>
  .menu-container {
    width: 100%;
    line-height: 40px;
    height: 40px;
  }
  .li-parent {
    background-color: transparent;
    color: cyan;
  }
  .li-parent:hover {
    cursor: pointer;
    color: white;
  }
  .li-parent-active {
    color: white;
  }
  .ul-parent {
    width: 100%;
    padding: 0;
  }
  .icon-span {
    padding: 10px;
    font-size: 10px;
  }
  .icon-span-parent {
    padding: 10px;
  }
  .angle-span {
    font-size: 8px;
    float: right;
    padding: 10px;
  }
  .menu-name-span {
    font-size: 14px;
  }
  .menu-list {
    border-left: 0px solid #dbdbdb;
    line-height: 30px;
    float: left;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  .second-menu-list {
    background-color: #000c17;
    margin-top: -5px;
  }
  .li-child a{
    text-align: left;
    width: 100%;
    padding-left: 50px;
    font-size: 14px;
    color: cyan;
  }
  .li-child a:hover{
    background-color: transparent;
    color: white;
  }
  .is-active {
    color: white;
    background-color: #3273dc;
  }
  .is-active a{
    color: white;
  }
  .slide-fade-enter-active {
    transition: all .2s linear .0s;
  }
  .slide-fade-leave-active {
   /* transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0) .15s;*/
    transition: all .1s ease-in-out .0s;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }
</style>
