<template>
  <span class="tag-item tag" :class="tagClass" @click="click" :id="'tag' + tagId">
    <font-awesome-icon  icon="feather" v-if="isActive"/>&nbsp;
    {{title}}&nbsp;
    <a class="delete is-small" @click="remove"></a>
  </span>
</template>

<script>
export default {
  name: 'HeadTag',
  props: ['title', 'isActive', 'tagId'],
  data () {
    return {
      tagClass: '',
      el: '',
      index: 0,
      isRemoving: false
    }
  },
  mounted: function () {
    this.init()
  },
  watch: {
    isActive: function () {
      this.init()
    }
  },
  methods: {
    init () {
      if (this.isActive) {
        this.tagClass = 'is-link'
      } else {
        this.tagClass = 'is-white'
      }
      this.el = document.getElementById('tag' + this.tagId)
      console.debug('init tag id: ' + this.tagId)
      let obj = this.$store.state.userVariables.headTags.filter((v) => {
        return v.id === this.tagId
      })
      console.log('headTags： ' + JSON.stringify(this.$store.state.userVariables.headTags))
      console.log('obj： ' + JSON.stringify(obj[0]))
      this.index = this.$store.state.userVariables.headTags.indexOf(obj[0])
    },
    click () {
      if (!this.isRemoving) {
        this.$store.commit('userVariables/setActivatedTag', {'id': this.tagId, 'name': this.title})
        // TODO
        let obj = this.$store.state.userVariables.headTags.filter((v) => {
          return v.id === this.tagId
        })
        this.index = this.$store.state.userVariables.headTags.indexOf(obj[0])
        // 判断当前点击的tag后面是否有tag被挤出页面
        console.log('this.el.offsetLeft + this.el.clientWidth * 2: ' + (this.el.offsetLeft + this.el.clientWidth * 2))
        console.log('clientWidth: ' + document.body.clientWidth)
        console.log('index: ' + this.index + ' headTags.length: ' + this.$store.state.userVariables.headTags.length)
        if ((this.el.offsetLeft + this.el.clientWidth * 2) > document.body.clientWidth && (this.index < this.$store.state.userVariables.headTags.length - 1)) {
          console.log('当前点击的tag后面有tag被挤出去啦！！')
        }
      }
      this.isRemoving = false
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
