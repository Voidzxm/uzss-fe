<template>
<div>
  <ul class="menu-list ul-parent"
      v-for="item in menudata"
      :key="item.id"
      :id="'first' + item.id"
      style="white-space: nowrap;position: relative;" >
    <li class="li-parent" :class="{'li-parent-active': activeParent === item.name }">
      <transition
        name="slide-fade-left">
      <div v-if="folderNot" class="menu-container">
        <span class="icon-span-parent">
          <span class="icon-span" style="font-size: 14px;">
            <font-awesome-icon :icon="item.icon"/>
          </span>
        </span>
      </div>
      <div v-else-if="isReady" class="menu-container" @click="clickFirst(item)" >
        <span class="icon-span-parent" style="float:left;">
          <span class="icon-span">
            <font-awesome-icon icon="tachometer-alt"/>
          </span>
          <span class="menu-name-span">{{item.name}}</span>
        </span>
        <span class="angle-span">
          <transition name="out-in" enter-active-class="animated fadeIn" leave-acive-class="animated fadeOut" :duration="{ enter: 200, leave: 200 }">
            <font-awesome-icon  icon="angle-down" v-if="expandSecond !== item.name"/>
            <font-awesome-icon  icon="angle-up" v-else/>
          </transition>
        </span>
      </div>
      </transition>
      <transition
        name="slide-fade-a">
        <div v-if="isReady">
          <transition
            name="slide-fade">
            <ul
              :id="'second' + item.id"
              :key="'second' + item.id"
              class="menu-list second-menu-list"
              v-if="item.secondClass.length >= 0 && expandSecond === item.name">
              <li class="li-child"
                  :class="{'is-active': activeNode === second.name }"
                  @click="clickSecond(item, second)"
                  v-for="second in item.secondClass"
                  :key="item.id + second.id">
                  <a v-if="second.thirdClass === undefined || second.thirdClass.length === 0" :class="{'is-active a': activeNode === second.name }">{{second.name}}</a>
                  <span v-else-if="second.thirdClass.length > 0" style="width: 100%;white-space: nowrap;">
                    <a style="float:left;width:60%;">{{second.name}}</a>
                    <span class="angle-span">
                        <transition name="out-in" enter-active-class="animated fadeIn" leave-acive-class="animated fadeOut" :duration="{ enter: 200, leave: 200 }">
                          <font-awesome-icon  icon="angle-down" v-if="expandThird !== second.name"/>
                          <font-awesome-icon  icon="angle-up" v-else/>
                        </transition>
                    </span>
                  </span>
                  <transition
                  name="slide-fade">
                    <ul
                      :id="'third' + second.id"
                      :key="'third' + second.id"
                      class="menu-list third-menu-list"
                      v-if="second.thirdClass !== undefined && second.thirdClass.length > 0 && expandThird === second.name">
                      <li class="li-child"
                          :class="{'is-active': activeNode === third.name }"
                          @click="clickThird(second.name, third)"
                          v-for="third in second.thirdClass"
                          :key="item.id + second.id + third.id">
                        <a style="padding-left: 80px;">{{third.name}}</a>
                      </li>
                    </ul>
                  </transition>
              </li>
            </ul>
          </transition>
        </div>
      </transition>
    </li>
  </ul>
</div>
</template>

<script>
import Bus from '../../assets/eventBus.js'
import TWEEN from '@tweenjs/tween.js'

export default {
  name: 'LeftSliderMenu',
  props: [ 'menudata' ],
  data () {
    return {
      folderNot: false,
      isActive: '',
      activeNode: null,
      activeParent: null,
      expandSecond: '',
      expandThird: '',
      expanded: null,
      isReady: true,
      aheight: 130,
      clickingThird: false
    }
  },
  mounted: function () {
    let that = this
    Bus.$on('msg', (e) => {
      that.folderNot = !that.folderNot
    })
    Bus.$on('expanded', (e) => {
      console.log('get expanded' + that.isReady)
      if (!that.folderNot) {
        that.isReady = true
        console.log('I am ready , show me')
      } else {
        that.isReady = false
      }
      that.expanded = true
    })
  },
  watch: {
    folderNot: function () {
      console.log('folderNot: ' + this.folderNot)
      if (this.folderNot) {
        this.isReady = false
      }
      // this.expanded = false
    },
    isReady: function () {
      console.log('isReady: ' + this.isReady)
    },
    aheight: function () {
      console.log(this.aheight)
    }
  },
  methods: {
    clickFirst: function (item) {
      this.expandSecond = this.expandSecond === item.name ? '' : item.name
      let ss = document.getElementById('second' + item.id)
      if (ss != null && ss.offsetHeight > 0) {
        item.offsetHeight = ss.offsetHeight
      }
    },
    clickSecond: function (item, second) {
      if (!this.clickingThird) {
        if (second.thirdClass !== undefined && second.thirdClass.length > 0) {
          this.expandThird = this.expandThird === second.name ? '' : second.name
        } else {
          this.activeNode = second.name
          this.activeParent = item.name
          this.expandThird = ''
          this.$store.commit('userVariables/addHeadTags', second.name)
          this.$store.commit('userVariables/setActivatedTag', second.name)
          console.log('activated tag: ' + this.$store.state.userVariables.activatedTag)
        }
      }
      this.clickingThird = false
    },
    clickThird: function (second, third) {
      this.activeNode = third.name
      this.activeParent = second.name
      this.clickingThird = true
      this.$store.commit('userVariables/addHeadTags', third.name)
      this.$store.commit('userVariables/setActivatedTag', third.name)
    },
    // TweenJs 动画监听
    tween2: function (item, from, to, duration) {
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      // let coors = swidth
      let ss = document.getElementById('second' + item.id)
      console.log(ss)
      new TWEEN.Tween(from)
        .to(to, duration)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function () {
          ss.style.setProperty('height', from.x + 'px')
          console.log(ss.style.getPropertyValue('height'))
          this.aheight = from.x
        }).start()

      animate()
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
  .third-menu-list {
    background-color: #000707;
    margin-top: -5px;
  }
  .li-child a{
    text-align: left;
    width: 100%;
    padding-left: 50px;
    font-size: 14px;
    color: cyan;
  }
  .li-child a:hover {
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
    /*height: 125px;*/
    transition: all .2s linear .0s;
  }
  .slide-fade-leave-active {
   /* transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0) .15s; ease-in-out*/
    /*height: 125px;*/
    transition: all .2s  linear .0s;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(-20px);
    height: 0;
/*    transition:height .1s;
    -moz-transition:height .1s; !* Firefox 4 *!
    -webkit-transition:height .1s; !* Safari and Chrome *!
    -o-transition:height .1s; !* Opera *!*/
    opacity: 0;
    transition: opacity 0s ,height .1s;
  }
  .slide-fade-left-enter-active {
    transition: all .2s linear .0s;
  }
  .slide-fade-left-leave-active {
    /* transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0) .15s; ease-in-out*/
    transition: all .1s  ease-out .0s;
  }
  .slide-fade-left-enter, .slide-fade-left-leave-to {
    transform: translateX(-20px);
    opacity: 0;
    transition: all .1s;
  }
  .slide-fade-a-enter-active {
    transition: all .2s linear .0s;
  }
  .slide-fade-a-leave-active {
    /* transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0) .15s; ease-in-out*/
    transition: all .1s  ease-out .0s;
  }
  .slide-fade-a-enter, .slide-fade-a-leave-to {
    transform: translateY(-20px);
    opacity: 0;
    transition: all .1s;
  }
</style>
