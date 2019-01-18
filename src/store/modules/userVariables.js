import common from '../../api/common'

// initial state
const state = {
  menuData: [{
    'id': 100,
    'name': 'Dashboard',
    'icon': 'tachometer-alt',
    'secondClass': [{
      'id': 100100,
      'name': 'Playground'
    }, {
      'id': 100101,
      'name': 'NineNineEightyOne'
    }, {
      'id': 100102,
      'name': 'Members3'
    }]
  }, {
    'id': 101,
    'name': 'Dashboard2',
    'icon': 'tachometer-alt',
    'secondClass': [{
      'id': 101100,
      'name': 'Members4'
    }, {
      'id': 101101,
      'name': 'Members5'
    }]
  }, {
    'id': 102,
    'name': 'Dashboard3',
    'icon': 'tachometer-alt',
    'secondClass': [{
      'id': 102100,
      'name': 'Members7'
    }, {
      'id': 102101,
      'name': 'Members8'
    }, {
      'id': 102102,
      'name': 'Members9'
    },
    {
      'id': 102103,
      'name': 'Members20'
    },
    {
      'id': 102104,
      'name': 'Members21'
    },
    {
      'id': 102105,
      'name': 'Members22',
      'thirdClass': [{
        'id': 102105205,
        'name': 'Members32'
      },
      {
        'id': 102105206,
        'name': 'Members33'
      },
      {
        'id': 102105207,
        'name': 'Members34'
      },
      {
        'id': 102105208,
        'name': 'Members35'
      },
      {
        'id': 102105209,
        'name': 'Members36'
      },
      {
        'id': 102105210,
        'name': 'Members37'
      }
      ]
    }
    ]
  }, {
    'id': 103,
    'name': 'Dashboard4',
    'icon': 'tachometer-alt',
    'secondClass': [{
      'id': 103100,
      'name': 'Members10'
    }, {
      'id': 103101,
      'name': 'Members11'
    }, {
      'id': 103102,
      'name': 'Members12'
    },
    {
      'id': 103103,
      'name': 'Members29'
    },
    {
      'id': 103104,
      'name': 'Members30'
    },
    {
      'id': 103105,
      'name': 'Members31'
    }
    ]
  }],
  reversedData: [],
  headTags: [],
  activatedTag: '',
  expandState: {'activeParent': '', 'expandSecond': '', 'expandThird': ''},
  scrollLeft: 0
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
    } else if (!common.containsObj(state.headTags, headTag)) {
      state.headTags.push(headTag)
    }
    console.debug('headTags: ', state.headTags)
  },
  removeHeadTags (state, headTag) {
    if (headTag === undefined || headTag.length === 0) {
      return
    }
    if (state.headTags === undefined) {
      // do nothing
    } else {
      common.removesObj(state.headTags, headTag)
      if (state.activatedTag.id === headTag.id) {
        if (state.headTags.length > 0) {
          this.commit('userVariables/setActivatedTag', state.headTags[state.headTags.length - 1])
          console.debug('setActivatedTag in removeHeadTags: ' + JSON.stringify(state.activatedTag))
        } else {
          // 当removeTag后，HeadTags为空后时，设置ActivatedTag和ExpandState
          this.commit('userVariables/setActivatedTag', {})
          this.commit('userVariables/setExpandState', {'activeParent': '', 'expandSecond': '', 'expandThird': ''})
        }
      }
    }
  },
  setActivatedTag (state, tag) {
    if (tag === undefined || tag === '') {
      return
    }
    state.activatedTag = tag
    if (common.containsObj(state.headTags, tag)) {
      state.activatedTag = tag
      // setActivatedTag之后，根据menuData转换成的reversedData和tag的Id来判断其父选项
      common.clearParents()
      let tagId = tag.id
      let _parents = common.findParents(this.state.userVariables.reversedData, tagId)
      console.debug('findParents: ' + _parents + '   length: ' + (_parents.length === 2))
      if (_parents.length === 1) {
        this.commit('userVariables/setExpandState', {'activeParent': _parents[0], 'expandSecond': _parents[0], 'expandThird': ''})
        // state.expandState.activeParent = _parents[0]
        // state.expandState.expandSecond = _parents[0]
      } else if (_parents.length === 2) {
        this.commit('userVariables/setExpandState', {'activeParent': _parents[0], 'expandSecond': _parents[1], 'expandThird': _parents[0]})
        // state.expandState.activeParent = _parents[0]
        // state.expandState.expandSecond = _parents[1]
        // state.expandState.expandThird = _parents[0]
      } else if (_parents.length > 2) {
        console.error('Error: 暂不支持四级及四级以上菜单')
      }
      console.log('setExpandState at setActivatedTag: ' + JSON.stringify(state.expandState))
    }
    console.debug('setActivatedTag : activatedTag: ', JSON.stringify(state.activatedTag))
  },
  setActivatedMenu (state, tag) {
    if (tag === undefined || tag === '') {
      return
    }
    state.activatedTag = tag
    if (common.containsObj(state.headTags, tag)) {
      state.activatedTag = tag
    }
    console.debug('setActivatedMenu : activatedMenu: ', JSON.stringify(state.activatedTag))
  },
  setReversedData (state, data) {
    if (data === undefined || typeof data !== 'object' || data.length < 1) {
      return
    }
    state.reversedData = data
  },
  setExpandState (state, expandState) {
    if (expandState === undefined || expandState === '') {
      return
    }
    if (expandState.hasOwnProperty('activeParent')) {
      state.expandState.activeParent = expandState.activeParent
    }
    if (expandState.hasOwnProperty('expandSecond')) {
      state.expandState.expandSecond = expandState.expandSecond
    }
    if (expandState.hasOwnProperty('expandThird')) {
      state.expandState.expandThird = expandState.expandThird
    }
    /* else {
      console.debug('传入的expandState不符合规范：{\'activeParent\': \'\', \'expandSecond\': \'\', \'expandThird\': \'\'}')
    } */
    console.log('get expandState： ' + JSON.stringify(expandState))
    console.log('setExpandState: ' + JSON.stringify(state.expandState))
  },
  // 向左移动x为正， 向右移动x为负
  changeScrollLeft  (state, x) {
    if (x === '') {
      return
    }
    state.scrollLeft += x
  },
  console (x) {
    console.log(x)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
