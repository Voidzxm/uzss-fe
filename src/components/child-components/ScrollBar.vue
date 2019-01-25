<template>
  <div class="tag-container" id="tag-scroll">
    <div style="margin: 0 10px;">
      <HeadTag :title="item.name" :tagId='item.id' :enName="item.enName" v-for="item in tags" :key="item.id" :isActive="activatedTag.id === item.id"  ref="tagChild"></HeadTag>
    </div>
  </div>
</template>

<script>
import HeadTag from './HeadTag'
import { mapState } from 'vuex'
import Bus from '../../assets/eventBus.js'
import TWEEN from '@tweenjs/tween.js'

export default {
  name: 'ScrollBar',
  components: { HeadTag },
  data () {
    return {
      me: '',
      folderNot: false
    }
  },
  computed: mapState({
    tags: state => state.userVariables.headTags,
    activatedTag: state => state.userVariables.activatedTag,
    scrollLeft: state => state.userVariables.scrollLeft
  }),
  mounted: function () {
    this.me = document.getElementById('tag-scroll')
    let that = this
    Bus.$on('msg', () => {
      that.folderNot = !that.folderNot
    })
  },
  watch: {
    activatedTag: function () {
      console.debug('ScrollBar 检测到activatedTag变化', JSON.stringify(this.activatedTag))
      let obj = this.$store.state.userVariables.headTags.filter((v) => {
        return v.id === this.activatedTag.id
      })
      let index = this.$store.state.userVariables.headTags.indexOf(obj[0])
      console.debug('index: ' + index)
      if (this.$refs.tagChild !== undefined && this.$refs.tagChild[index] !== undefined) {
        this.$refs.tagChild[index].setIsOverflow()
      }
    },
    scrollLeft: function () {
      console.debug('检测到scrollLeft改变： ' + this.scrollLeft)
      // this.me.scrollLeft = this.scrollLeft
      let from = { x: this.$store.state.userVariables.prevScrollLeft, y: 0 }
      let to = { x: this.$store.state.userVariables.scrollLeft, y: 0 }
      this.tween(from, to, 150)
    },
    folderNot: function () {
      this.me.scrollLeft = this.scrollLeft
    }
  },
  methods: {
    // TweenJs 动画监听
    tween: function (from, to, duration) {
      let that = this
      console.debug('tween')
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      new TWEEN.Tween(from)
        .to(to, duration)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function () {
          that.me.scrollLeft = from.x
        }).start()
      animate()
    }
  }
}
</script>

<style scoped lang="scss">
  .tag-container {
    height: 34px;
    width: 100%;
    background-color: white;
    border-bottom: 1px solid #d8dce5;
    webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0 , 0, .04);
    text-align: left;
    white-space: nowrap;
    overflow-x: hidden;
  }
</style>
