<template>
  <div class="drop-down" v-bind:hidden="isHidden">
    <div class="padding"></div>
    <div class="box drop-down-box" style="background-color: white;">
      <a v-for="item in items" href="#" class="dropdown-item" :key="item" >
        {{item}}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dropdownList',
  props: ['items', 'is-hidden'],
  mounted: function () {
  }
}
</script>

<style scoped>
  .drop-down {
    display: block;
    position: fixed;
    zoom: 1;
    margin: 0;
    z-index: 10;
    padding: 0;
  }
  .drop-down-box {
    line-height: 1.5;
    width: 150px;
    margin: 0;
    padding: 0.5rem 0;
    border-radius: 2px;
  }
  .padding {
    background-color: white;
    height: 5px;
    opacity: 0;
  }
</style>
