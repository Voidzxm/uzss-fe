<template>
  <div class="dashboard-panel is-one-fifth" :style="{flex: width}" id="left-slider">
    <div class="dashboard-logo">
      <a href="/" >
        <img src="../../assets/logo.png" alt="logo">
        <h1 v-if="! foldorNot">Mozx Design</h1>
      </a>
    </div>
    <div>
      <LeftSliderMenu></LeftSliderMenu>
    </div>
  </div>
</template>

<script>
import Bus from '../../assets/eventBus.js'
import TWEEN from '@tweenjs/tween.js'
import LeftSliderMenu from '../child-components/LeftSliderMenu'

export default {
  name: 'LeftSlider',
  components: {LeftSliderMenu},
  data () {
    return {
      foldorNot: false,
      width: '0 0 256px'
    }
  },
  methods: {
    // TweenJs 动画监听
    tween: function (swidth, ewidth) {
      let s = document.getElementById('left-slider')
      function animate () {
        requestAnimationFrame(animate)
        TWEEN.update()
        /* if (TWEEN.update()) {
          requestAnimationFrame(animate)
        } */
      }

      new TWEEN.Tween({ flex: swidth })
        .to({ flex: ewidth }, 500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function () {
          s.style.setProperty('flex', ewidth)
        })
        .start()

      animate()
    }
  },
  watch: {
    foldorNot: function () {
      console.log('foldorNot: ' + this.foldorNot)
      if (this.foldorNot) {
        // this.width = '0 0 6%'
        this.tween('0 0  256px', '0 0 64px')
      } else {
        // this.width = '0 0  256px'
        this.tween('0 0 64px', '0 0  256px')
      }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .dashboard-panel
  {
    display: flex;
    flex-direction: column;
    /*padding: 1.5rem 1.5rem;*/
    /*flex: 0 0 25rem;*/
    height: 100%;
    background-color: rgb(0, 21, 41);
    box-shadow: 2px 0 6px rgba(0,21,41,.35);
    z-index: 10;
    flex: 0 0 256px;
  }
 .dashboard-panel.is-one-fifth
  {
    min-width: 4rem;
  }
  .dashboard-logo
  {
    background-color: #002140;
    padding: 1rem 1rem;
  }
  h1 {
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    margin: 0 0 0 12px;
    font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
    font-weight: 600;
  }
  .dashboard-logo img
  {
    display: inline-block;
    vertical-align: middle;
    height: 32px;
  }
</style>
