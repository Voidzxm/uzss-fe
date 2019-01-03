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
          <div style="background-color: green;width: 150px;height: 150px;"  @click="triggerTween" id="left-slider222">
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
import TWEEN from '@tweenjs/tween.js'

export default {
  name: 'App',
  components: {LeftSlider, TopHeader, dropdownList},
  data () {
    return {
      width: 150
    }
  },
  methods: {
    // TweenJs 动画监听
    tween: function (swidth, ewidth) {
      let s = document.getElementById('left-slider222')
      console.log(s)
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      var coords = { x: 0, y: 0 }
      new TWEEN.Tween(coords)
        .to({ x: -100, y: 0 }, 500)
        // .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function () {
          console.log('swidth: ' + coords.x)
          // s.style.setProperty('transform', 'translateX(' + swidth + 'px)')
          s.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)')
        })
        .start()

      animate()
    },
    tween2: function () {
      // Setup the animation loop.
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      let box = document.getElementById('left-slider222')
      var coords = { x: 0, y: 0 } // Start at (0, 0)
      new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
        .to({ x: 300, y: 200 }, 1000) // Move to (300, 200) in 1 second.
        .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        .onUpdate(function () { // Called after tween.js updates 'coords'.
          // Move 'box' to the position described by 'coords' with a CSS translation.
          box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)')
        })
        .start() // Start the tween immediately.
      animate()
    },
    triggerTween: function () {
      let s = this.width
      this.width = this.width === 150 ? 50 : 150
      this.tween(s, this.width)
    }
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
