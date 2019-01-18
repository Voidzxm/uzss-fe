/**
 * Some api could be reused.
 */
import tree from './tree'

let parents = []

export default {
  containsValue (arr, item) {
    if (arr.indexOf(item) > -1) {
      return true
    } else {
      return false
    }
  },
  removesValue (arr, item) {
    let index = arr.indexOf(item)
    if (index > -1) {
      arr.splice(index, 1)
    }
  },
  containsObj (arr, obj) {
    let json = arr.filter(function (v) {
      return v.id === obj.id
    })
    if (json.length > 0) {
      console.debug(arr + '中包含' + obj)
      return true
    } else {
      console.debug(arr + '中不包含' + obj)
      return false
    }
  },
  filterId (arr, id) {
    let json = arr.filter(function (v) {
      return v.id === id
    })
    return json
  },
  findParents (tree, id) {
    for (let i in tree) {
      if (tree[i].id === id) {
        parents.push(tree[i].parent)
        this.findParents(tree, tree[i].parent)
      }
    }
    return parents
  },
  clearParents () {
    parents = []
  },
  reverseData (jsonObj) {
    tree.clearTree()
    console.log('input jsonObj: ' + jsonObj)
    console.debug('parsing json object to json tree ...')
    let _tree = tree.convertJson2Tree(jsonObj)
    console.debug('get tree: ' + JSON.stringify(_tree))
    return _tree
  },
  getValueByKey (data, field) {
    for (let key in data) {
      if (data === field) {
        return data[key]
      }
      if (typeof (data[key]) === 'object' && data[key].length === undefined) {
        return this.getValueByKey(data[key], field)
      }
    }
  },
  removesObj (arr, obj) {
    let json = arr.filter(function (v) {
      return v.id === obj.id
    })
    console.debug('removesObj json: ' + JSON.stringify(json))
    let index = arr.indexOf(json[0])
    console.debug('removesObj index: ' + index)
    if (index > -1) {
      arr.splice(index, 1)
    }
  },
  BinaryTree (data, leftChild, rightChild) {
    this.data = data || null
    // 左右孩子结点
    this.leftChild = leftChild || null
    this.rightChild = rightChild || null
  },
  test () {
    let testArr = [{'id': 1, 'name': 'test1'}, {'id': 2, 'name': 'test2'}]
    let testObj = {'id': 1, 'name': 'test1'}
    let newArr = testArr.filter(function (p) {
      return p.id === testObj.id
    })
    console.log('newArr: ' + newArr)
  },
  getElementLeft: function (element) {
    let actualLeft = element.offsetLeft
    let current = element.offsetParent

    while (current !== null) {
      actualLeft += current.offsetLeft
      current = current.offsetParent
    }

    return actualLeft
  },
  getElementTop: function (element) {
    let actualTop = element.offsetTop
    let current = element.offsetParent
    while (current !== null) {
      actualTop += current.offsetTop
      current = current.offsetParent
    }
    return actualTop
  }
}
