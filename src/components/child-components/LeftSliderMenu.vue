<template>
<div>
  <ul class="menu-list ul-parent"
      v-for="item in menudata"
      :key="item.id"
      :id="'first' + item.id"
      style="white-space: nowrap;position: relative;" >
    <li class="li-parent" :class="{'li-parent-active': activeParent === item.id }">
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
            <font-awesome-icon  icon="angle-down" v-if="expandSecond !== item.id"/>
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
              v-if="item.secondClass.length >= 0 && expandSecond === item.id">
              <li class="li-child"
                  :class="{'is-active': activeNode.id === second.id }"
                  @click="clickSecond(item, second)"
                  v-for="second in item.secondClass"
                  :key="item.id + second.id">
                  <a v-if="second.thirdClass === undefined || second.thirdClass.length === 0" :class="{'is-active a': activeNode.id === second.id }">{{second.name}}</a>
                  <span v-else-if="second.thirdClass.length > 0" style="width: 100%;white-space: nowrap;">
                    <a style="float:left;width:60%;">{{second.name}}</a>
                    <span class="angle-span">
                        <transition name="out-in" enter-active-class="animated fadeIn" leave-acive-class="animated fadeOut" :duration="{ enter: 200, leave: 200 }">
                          <font-awesome-icon  icon="angle-down" v-if="expandThird !== second.id"/>
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
                      v-if="second.thirdClass !== undefined && second.thirdClass.length > 0 && expandThird === second.id">
                      <li class="li-child"
                          :class="{'is-active': activeNode.id === third.id }"
                          @click="clickThird(second, third)"
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
import { mapState } from 'vuex'

export default {
  name: 'LeftSliderMenu',
  props: [ 'menudata' ],
  data () {
    return {
      folderNot: false,
      isActive: '',
      expanded: null,
      isReady: true,
      clickingThird: false
    }
  },
  computed: mapState({
    activeNode: state => state.userVariables.activatedTag,
    activeParent: state => state.userVariables.expandState.activeParent,
    expandSecond: state => state.userVariables.expandState.expandSecond,
    expandThird: state => state.userVariables.expandState.expandThird
  }),
  mounted: function () {
    let that = this
    Bus.$on('msg', () => {
      that.folderNot = !that.folderNot
    })
    Bus.$on('expanded', () => {
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
    activeParent: function () {
      console.debug('watch activeParent: ' + this.activeParent)
    },
    expandSecond: function () {
      console.debug('watch expandSecond: ' + this.expandSecond)
    },
    expandThird: function () {
      console.debug('watch expandThird: ' + this.expandThird)
    }
  },
  methods: {
    clickFirst: function (item) {
      this.$store.commit('userVariables/setExpandState', {'expandSecond': this.expandSecond === item.id ? '' : item.id})
      console.log('expandSecond: ' + this.expandSecond)
    },
    clickSecond: function (item, second) {
      if (!this.clickingThird) {
        if (second.thirdClass !== undefined && second.thirdClass.length > 0) {
          this.$store.commit('userVariables/setExpandState', {'expandThird': this.expandThird === second.id ? '' : second.id})
        } else {
          this.$store.commit('userVariables/setExpandState', {'activeParent': item.id, 'expandThird': ''})
          this.$store.commit('userVariables/addHeadTags', {'id': second.id, 'name': second.name})
          this.$store.commit('userVariables/setActivatedTag', {'id': second.id, 'name': second.name})
          console.debug('activated tag: ' + JSON.stringify(this.$store.state.userVariables.activatedTag))
        }
      }
      this.clickingThird = false
    },
    clickThird: function (second, third) {
      this.clickingThird = true
      this.$store.commit('userVariables/setExpandState', {'activeParent': second.id})
      this.$store.commit('userVariables/addHeadTags', {'id': third.id, 'name': third.name})
      this.$store.commit('userVariables/setActivatedTag', {'id': third.id, 'name': third.name})
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
    border-left: 0 solid #dbdbdb;
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
