<template>
<div>
  <ul class="ul-parent">
    <li>
      <div v-if="foldorNot" class="menu-container">
        <span class="icon-span-parent">
          <span class="icon-span" style="font-size: 14px;">
            <font-awesome-icon icon="tachometer-alt"/>
          </span>
        </span>
      </div>
      <div v-if="! foldorNot" class="menu-container">
        <span class="icon-span-parent" style="float:left;">
          <span class="icon-span">
            <font-awesome-icon icon="tachometer-alt"/>
          </span>
          <span class="menu-name-span">Dashboard</span>
        </span>
        <span class="angle-span">
          <font-awesome-icon  icon="angle-down"/>
        </span>
      </div>
      <ul>
        <li><a>Members</a></li>
        <li><a>Plugins</a></li>
        <li><a>Add a member</a></li>
      </ul>
    </li>
  </ul>
</div>
</template>

<script>
import Bus from '../../assets/eventBus.js'

export default {
  name: 'LeftSliderMenu',
  data () {
    return {
      foldorNot: false
    }
  },
  mounted: function () {
    let that = this
    Bus.$on('msg', (e) => {
      that.foldorNot = !that.foldorNot
    })
  }
}
</script>

<style scoped>
  .menu-container {
    width: 100%;
    line-height: 40px;
    height: 40px;
  }
  li {
    background-color: transparent;
    color: #fff;
  }
  ul {
    width: 100%;
    padding: 5px;
  }
  .icon-span {
    padding: 10px;
    font-size: 10px;
  }
  .icon-span-parent {
    padding: 10px;
  }
  .angle-span {
    font-size: 6px;
    float: right;
    padding: 10px;
  }
  .menu-name-span {
    font-size: 14px;
  }
</style>
