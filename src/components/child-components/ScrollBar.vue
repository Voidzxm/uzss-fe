<template>
    <div class="tag-container">
      <HeadTag :title="item.name" :tagId='item.id' v-for="item in tags" :key="item.id" :isActive="activatedTag.id === item.id"></HeadTag>
    </div>
</template>

<script>
import HeadTag from './HeadTag'
import { mapState } from 'vuex'

export default {
  name: 'ScrollBar',
  components: { HeadTag },
  computed: mapState({
    tags: state => state.userVariables.headTags,
    activatedTag: state => state.userVariables.activatedTag
  }),
  watch: {
    activatedTag: function () {
      console.debug('ScrollBar 检测到activatedTag变化', JSON.stringify(this.activatedTag))
    }
  },
  data () {
    return {
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
