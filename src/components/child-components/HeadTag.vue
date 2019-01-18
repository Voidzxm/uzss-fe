<template>
  <span class="tag-item tag" :class="tagClass" @click="click" :id="'tag' + tagId">
    <font-awesome-icon  icon="feather" v-if="isActive"/>&nbsp;
    {{title}}&nbsp;
    <a class="delete is-small" @click="remove"></a>
  </span>
</template>

<script>
// import Bus from '../../assets/eventBus.js'
export default {
  name: 'HeadTag',
  props: ['title', 'isActive', 'tagId'],
  data () {
    return {
      tagClass: '',
      el: '',
      index: 0,
      isRemoving: false,
      isRightOverflow: false,
      isLeftOverflow: false,
      folderNot: false,
      scrollLeft: 0,
      scrollRight: 0,
      isDestroyed: false,
      x: ''
    }
  },
  mounted: function () {
    let that = this
    this.x = document.getElementById('tag-scroll')
    this.init()
    window.onresize = function temp () {
      that.init()
      that.setIsOverflow()
    }
  },
  destroyed: function () {
    console.debug('啊, 我被销毁了.')
    this.isDestroyed = true
  },
  watch: {
    isActive: function () {
      this.init()
      if (this.isActive) {
        console.debug('*********************开始判断前后tag状态*******************')
        /* let x = document.getElementById('tag-scroll')
        if (this.isRightOverflow) {
          console.log('当前点击的tag后面有tag被挤出去啦！！')
          if (this.folderNot) {
            // this.scrollLeft += x.scrollWidth - document.body.clientWidth + 64
            // this.scrollLeft += this.el.clientWidth
            this.$store.commit('userVariables/changeScrollLeft', this.el.clientWidth)
          } else {
            // this.scrollLeft += this.el.clientWidth
            this.$store.commit('userVariables/changeScrollLeft', this.el.clientWidth)
          }
          // x.scrollLeft = this.scrollLeft
          x.scrollLeft = this.$store.state.userVariables.scrollLeft
          console.log('x.scrollWidth: ' + x.scrollWidth)
          console.log('this.scrollLeft: ' + this.scrollLeft)
        } else if (this.isLeftOverflow) {
          this.$store.commit('userVariables/changeScrollLeft', -1 * this.el.clientWidth)
          x.scrollLeft = this.$store.state.userVariables.scrollLeft
          console.log('当前点击的tag前面有tag被挤出去啦！！')
        } */
      }
    }
  },
  methods: {
    init () {
      if (this.isActive) {
        this.tagClass = 'is-link'
      } else {
        this.tagClass = 'is-white'
      }
    },
    click () {
      if (!this.isRemoving) {
        this.$store.commit('userVariables/setActivatedTag', {'id': this.tagId, 'name': this.title})
        this.setIsOverflow()
      }
      this.isRemoving = false
    },
    setIsOverflow () {
      console.log('开始调用 tagID: ' + this.tagId + '的setIsOverflow方法')
      if (this.isDestroyed) {
        // do nothing
      } else {
        this.el = document.getElementById('tag' + this.tagId)
        // let x = document.getElementById('tag-scroll')
        console.debug('init tag id: ' + this.tagId)
        let obj = this.$store.state.userVariables.headTags.filter((v) => {
          return v.id === this.tagId
        })
        this.index = this.$store.state.userVariables.headTags.indexOf(obj[0])
        let headTags = this.$store.state.userVariables.headTags
        let eol = this.el.offsetLeft
        let eow = this.el.offsetWidth
        let xsl = this.x.scrollLeft
        let xol = this.x.offsetLeft
        let bow = document.body.offsetWidth
        let feol = 0
        // let feow = 0
        let neol = 0
        let neow = 0
        console.log('eol: ' + eol + ' eow: ' + eow + ' xsl: ' + xsl + ' xol: ' + xol + ' bow: ' + bow)
        console.log('index: ' + this.index + ' headTags.length: ' + headTags.length)
        if (this.index === 0) {
          let dist = eol - (xsl + xol)
          console.log('当前点击元素是第一个元素，dist: ' + dist)
          if (dist < 0) {
            console.log('当前点击元素是第一个元素，且当前元素未显示完整。')
            this.$store.commit('userVariables/changeScrollLeft', dist)
          }
        } else if (this.index === (headTags.length - 1)) {
          let dist = eol + eow - bow - this.$store.state.userVariables.scrollLeft
          console.log('current scrollLeft: ' + this.$store.state.userVariables.scrollLeft)
          console.log('当前点击元素是最后一个元素，dist: ' + dist)
          if (dist > 0) {
            console.log('当前点击元素是最后一个元素，且当前元素未显示完整。')
            this.$store.commit('userVariables/changeScrollLeft', dist)
          }
        } else if (this.index > 0 && this.index < (headTags.length - 1)) { //  && this.index < (headTags.length - 1)
          let fel = document.getElementById('tag' + headTags[this.index - 1].id)
          let nel = document.getElementById('tag' + headTags[this.index + 1].id)
          console.log('fel: ' + fel + ' nel: ' + nel)
          feol = fel.offsetLeft
          // feow = fel.offsetWidth
          neol = nel.offsetLeft
          neow = nel.offsetWidth
          console.log(' feol: ' + feol + ' neol: ' + neol + ' neow: ' + neow)
          let fdist = feol - (xsl + xol)
          let ndist = neol + neow - bow - this.$store.state.userVariables.scrollLeft
          console.log('当前点击元素是中间元素，fdist: ' + fdist + ' ndist: ' + ndist)
          if (fdist < 0) {
            console.log('当前点击元素的紧前元素未显示完整。')
            this.$store.commit('userVariables/changeScrollLeft', fdist - 10)
          }
          if (ndist > 0) {
            console.log('当前点击元素的紧后元素未显示完整。')
            this.$store.commit('userVariables/changeScrollLeft', ndist + 10)
          }
        }
      }
    },
    remove () {
      this.$store.commit('userVariables/removeHeadTags', {'id': this.tagId, 'name': this.title})
      this.isRemoving = true
    }
  }
}
</script>

<style scoped>
  .tag-item {
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
  }
</style>
