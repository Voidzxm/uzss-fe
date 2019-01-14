<template>
  <span class="tag-item tag" :class="tagClass" @click="click" :id="'tag' + title">
    <font-awesome-icon  icon="feather" v-if="isActive"/>&nbsp;
    {{title}}&nbsp;
    <a class="delete is-small" @click="remove"></a>
  </span>
</template>

<script>
export default {
  name: 'HeadTag',
  props: ['title', 'isActive'],
  data () {
    return {
      tagClass: '',
      el: '',
      index: 0
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
      this.el = document.getElementById('tag' + this.title)
      this.index = this.$store.state.userVariables.headTags.indexOf(this.title)
    },
    click () {
      this.$store.commit('userVariables/setActivatedTag', this.title)
      this.index = this.$store.state.userVariables.headTags.indexOf(this.title)
      // 判断当前点击的tag后面是否有tag被挤出页面
      console.log('this.el.offsetLeft + this.el.clientWidth * 2: ' + (this.el.offsetLeft + this.el.clientWidth * 2))
      console.log('document.body.clientWidth: ' + document.body.clientWidth)
      console.log('index: ' + this.index + ' this.$store.state.userVariables.headTags.length: ' + this.$store.state.userVariables.headTags.length)
      if ((this.el.offsetLeft + this.el.clientWidth * 2) > document.body.clientWidth && (this.index < this.$store.state.userVariables.headTags.length - 1)) {
        console.log('当前点击的tag后面有tag被挤出去啦！！')
      }
    },
    remove () {
      this.$store.commit('userVariables/removeHeadTags', this.title)
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
