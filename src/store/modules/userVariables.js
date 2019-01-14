import common from '../../api/common'

// initial state
const state = {
  headTags: [],
  activatedTag: ''
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  addHeadTags (state, headTag) {
    if (headTag === undefined || headTag === '') {
      return
    }
    if (state.headTags === undefined) {
      state.headTags.push(headTag)
    } else if (!common.containsValue(state.headTags, headTag)) {
      state.headTags.push(headTag)
    }
  },
  removeHeadTags (state, headTag) {
    if (headTag === undefined || headTag === '') {
      return
    }
    if (state.headTags === undefined) {
      // do nothing
    } else {
      if (state.activatedTag === headTag) {
        if (state.headTags.length > 0) {
          this.commit('userVariables/setActivatedTag', state.headTags[state.headTags.length - 1])
        } else {
          this.commit('userVariables/setActivatedTag', '')
        }
      }
      common.removesValue(state.headTags, headTag)
    }
  },
  setActivatedTag (state, tagName) {
    if (tagName === undefined || tagName === '') {
      return
    }
    if (common.containsValue(state.headTags, tagName)) {
      state.activatedTag = tagName
    }
  },
  console () {
    console.log('hhhhhhhhhhhhhhhhhhhhhhhhha')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
