import common from '../../api/common'

// initial state
const state = {
  menuData: [{
    'id': 100,
    'name': 'Dashboard',
    'icon': 'tachometer-alt',
    'secondClass': [{
      'id': 100100,
      'name': 'Members1'
    }, {
      'id': 100101,
      'name': 'Members2'
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
  reversedData: this.menuData,
  headTags: [],
  activatedTag: '',
  expandState: {'activeParent': '', 'expandSecond': '', 'expandThird': ''}
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
    console.log('headTags: ', state.headTags)
  },
  removeHeadTags (state, headTag) {
    if (headTag === undefined || headTag.length === 0) {
      return
    }
    if (state.headTags === undefined) {
      // do nothing
    } else {
      if (state.activatedTag.id === headTag.id) {
        console.log('ga噶')
        if (state.headTags.length > 0) {
          this.commit('userVariables/setActivatedTag', state.headTags[state.headTags.length - 1])
          console.log('this.commit(\'userVariables/setActivatedTag\', state.headTags[state.headTags.length - 1]): ' + JSON.stringify(state.headTags[state.headTags.length - 1]))
          console.log('setActivatedTag: ' + JSON.stringify(state.activatedTag))
        } else {
          console.log('啥也不噶')
          this.commit('userVariables/setActivatedTag', {})
        }
      }
      common.removesObj(state.headTags, headTag)
    }
  },
  setActivatedTag (state, tag) {
    if (tag === undefined || tag === '') {
      return
    }
    state.activatedTag = tag
    if (common.containsObj(state.headTags, tag)) {
      state.activatedTag = tag
    }
    // id = 102105209
    console.log('contains obj : ' + common.reverseData())
    console.debug('setActivatedTag : activatedTag: ', JSON.stringify(state.activatedTag))
  },
  setExpandState (state, expandState) {
    if (expandState === undefined || expandState === '') {
      return
    }
    if (expandState.hasOwnProperty('activeParent')) {
      state.expandState.activeParent = expandState.activeParent
    } else if (expandState.hasOwnProperty('expandSecond')) {
      state.expandState.expandSecond = expandState.expandSecond
    } else if (expandState.hasOwnProperty('expandThird')) {
      state.expandState.expandThird = expandState.expandThird
    } else {
      console.debug('传入的expandState不符合规范：{\'activeParent\': \'\', \'expandSecond\': \'\', \'expandThird\': \'\'}')
    }
    console.log('setExpandState: ' + JSON.stringify(state.expandState))
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
