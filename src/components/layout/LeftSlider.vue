<template>
<div class="dashboard-panel is-one-fifth" :style="{flex: width}" id="left-slider" >
  <div class="dashboard-logo">
    <a href="/" style="white-space: nowrap;">
      <img src="../../assets/logo.png" alt="logo">
      <h1 id="h1"  class="dashboard-title">Mozx Design</h1>
    </a>
  </div>
  <div>
    <LeftSliderMenu :menudata="menudata"></LeftSliderMenu>
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
      folderNot: false,
      width: '0 0 256px',
      expanded: false,
      h1width: 156,
      menudata: [{
        'id': 100,
        'name': 'Dashboard',
        'icon': 'tachometer-alt',
        'secondClass': [{
          'id': 100,
          'name': 'Members1'
        }, {
          'id': 101,
          'name': 'Members2'
        }, {
          'id': 102,
          'name': 'Members3'
        }]
      }, {
        'id': 101,
        'name': 'Dashboard2',
        'icon': 'tachometer-alt',
        'secondClass': [{
          'id': 100,
          'name': 'Members4'
        }, {
          'id': 101,
          'name': 'Members5'
        }]
      }, {
        'id': 102,
        'name': 'Dashboard3',
        'icon': 'tachometer-alt',
        'secondClass': [{
          'id': 100,
          'name': 'Members7'
        }, {
          'id': 101,
          'name': 'Members8'
        }, {
          'id': 102,
          'name': 'Members9'
        },
        {
          'id': 103,
          'name': 'Members20'
        },
        {
          'id': 104,
          'name': 'Members21'
        },
        {
          'id': 105,
          'name': 'Members22'
        }]
      }, {
        'id': 103,
        'name': 'Dashboard4',
        'icon': 'tachometer-alt',
        'secondClass': [{
          'id': 100,
          'name': 'Members10'
        }, {
          'id': 101,
          'name': 'Members11'
        }, {
          'id': 102,
          'name': 'Members12'
        }]
      }]
    }
  },
  methods: {
    // TweenJs 动画监听
    tween: function (object, property, from, to, duration, other) {
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      // let coors = swidth
      if (from.x < to.x && object === document.getElementById('left-slider')) {
        var b = true
      }
      new TWEEN.Tween(from)
        .to(to, duration)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function () {
          object.style.setProperty(property, other + from.x + 'px')
        }).onComplete(function (object) {
          if (b) {
            console.log('expanded')
            Bus.$emit('expanded', '')
          }
        }).start()

      animate()
    }
  },
  watch: {
    folderNot: function () {
      let s = document.getElementById('left-slider')
      let h = document.getElementById('h1')
      let from
      let to
      let hfrom
      let hto
      if (this.folderNot) {
        from = { x: 256, y: 0 }
        to = {x: 64, y: 0}
        hfrom = { x: 150, y: 0 }
        hto = { x: 0, y: 0 }
        this.allReady = false
      } else {
        from = { x: 64, y: 0 }
        to = {x: 256, y: 0}
        hfrom = { x: 0, y: 0 }
        hto = { x: 150, y: 0 }
      }
      this.tween(s, 'flex', from, to, 150, '0 0 ')
      this.tween(h, 'width', hfrom, hto, 150, '')
    }
  },
  mounted: function () {
    let that = this
    Bus.$on('msg', (e) => {
      that.folderNot = !that.folderNot
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
    -webkit-transition: max-height .3s;
    transition: max-height .3s;
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
  .dashboard-title {
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    margin: 0 0 0 0px;
    font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
    font-weight: 600;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 150px;
  }
  .dashboard-logo img
  {
    display: inline-block;
    vertical-align: middle;
    height: 32px;
  }
</style>
