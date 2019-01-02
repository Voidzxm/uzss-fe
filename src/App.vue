<template>
  <div id="app" class="dashboard">
    <!--<img src="./assets/logo.png">-->
    <LeftSlider></LeftSlider>
    <div class="zxm-layout">
      <TopHeader></TopHeader>
      <div class="container test">
        <div style="padding: 0 12px;display: inline-block;height: 100%;transition: all .3s;">
          <div style="background-color: red;width: 150px;height: 20px;opacity: 0;">
          </div>
          <div style="background-color: green;width: 150px;height: 150px;">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftSlider from './components/layout/LeftSlider'
import TopHeader from './components/layout/TopHeader'
import dropdownList from './components/child-components/dropdownList'
export default {
  name: 'App',
  components: {LeftSlider, TopHeader, dropdownList}
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
  .zxm-layout
  {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    flex: auto;
    overflow-x: hidden;
    box-sizing: border-box;
  }
  .test {
    display: flex;
    flex-direction: column;
  }
</style>
