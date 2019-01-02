<template>
<div>
  <ul class="menu-list ul-parent" v-for="item in menudata" :key="item.id">
    <li class="li-parent" @click="clickFirst(item)">
      <div v-if="folderNot" class="menu-container">
        <span class="icon-span-parent">
          <span class="icon-span" style="font-size: 14px;">
            <font-awesome-icon :icon="item.icon"/>
          </span>
        </span>
      </div>
      <div v-if="! folderNot" class="menu-container">
        <span class="icon-span-parent" style="float:left;">
          <span class="icon-span">
            <font-awesome-icon icon="tachometer-alt"/>
          </span>
          <span class="menu-name-span">{{item.name}}</span>
        </span>
        <span class="angle-span">
          <font-awesome-icon  icon="angle-down"/>
        </span>
      </div>
      <ul class="menu-list" v-if="item.secondClass.length >= 0 && expandLi === item.name">
        <li v-if="! folderNot" class="li-child" :class="{'is-active': activedNode === second.name }" @click="clickSecond(second)" v-for="second in item.secondClass" :key="item.id + second.name">
          <a :class="{'is-active': activedNode === second.name }">{{second.name}}</a>
        </li>
      </ul>
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
      activedNode: null,
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
      if (item.hideSecond === undefined) {
        item.hideSecond = false
      } else {
        item.hideSecond = !item.hideSecond
      }
      if (!item.hideSecond) {
        this.expandLi = item.name
      }
      console.log('item.hideSecond: ' + item.hideSecond)
    },
    clickSecond: function (second) {
      this.activedNode = second.name
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
    color: paleturquoise;
  }
  .li-parent:hover {
    cursor: pointer;
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
  .li-child a{
    text-align: left;
    width: 100%;
    padding-left: 50px;
    font-size: 14px;
    color: paleturquoise;
  }
  .li-child a:hover{
    background-color: transparent;
    color: white;
  }
  .is-active {
    color: white;
    background-color: #3273dc;
  }
</style>
