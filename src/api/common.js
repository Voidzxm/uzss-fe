/**
 * Some api could be reused.
 */
import tree from './tree'

const _testData = [{'id': 100, 'name': 'Dashboard', 'icon': 'tachometer-alt', 'secondClass': [{'id': 100100, 'name': 'Members1'}, {'id': 100101, 'name': 'Members2'}, {'id': 100102, 'name': 'Members3'}]}, {'id': 101, 'name': 'Dashboard2', 'icon': 'tachometer-alt', 'secondClass': [{'id': 101100, 'name': 'Members4'}, {'id': 101101, 'name': 'Members5'}]}, {'id': 102, 'name': 'Dashboard3', 'icon': 'tachometer-alt', 'secondClass': [{'id': 102100, 'name': 'Members7'}, {'id': 102101, 'name': 'Members8'}, {'id': 102102, 'name': 'Members9'}, {'id': 102103, 'name': 'Members20'}, {'id': 102104, 'name': 'Members21'}, {'id': 102105, 'name': 'Members22', 'thirdClass': [{'id': 102105205, 'name': 'Members32'}, {'id': 102105206, 'name': 'Members33'}, {'id': 102105207, 'name': 'Members34'}, {'id': 102105208, 'name': 'Members35'}, {'id': 102105209, 'name': 'Members36'}, {'id': 102105210, 'name': 'Members37'}]}]}, {'id': 103, 'name': 'Dashboard4', 'icon': 'tachometer-alt', 'secondClass': [{'id': 103100, 'name': 'Members10'}, {'id': 103101, 'name': 'Members11'}, {'id': 103102, 'name': 'Members12'}, {'id': 103103, 'name': 'Members29'}, {'id': 103104, 'name': 'Members30'}, {'id': 103105, 'name': 'Members31'}]}]

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
  getParentId (arr, obj) {
    let x = this
    let result = []
    /* let json = arr.filter(function (v) {
      for (let key in v) {
        if (typeof (v[key]) === 'object') {
          x.getParentId(v[key], obj)
        }
      }
      return v.id === obj.id
    })
    if (json.length > 0) {
      console.debug('containsObj2: ' + JSON.stringify(arr) + '中包含' + JSON.stringify(obj) + '  json: ' + JSON.stringify(json))
      return true
    } */
    for (let key in arr) {
      if (typeof (arr[key]) === 'object') {
        x.getParentId(arr[key], obj)
      } else {
        if (arr.id === obj.id) {
          console.log('发现腻了： ' + JSON.stringify(arr))
        }
      }
    }
    return result
  },
  reverseData (jsonObj) {
    // let reversedData = []
    console.log('tree.ConvertJson2Tree(): ' + JSON.stringify(tree.ConvertJson2Tree(_testData)))
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
  }
}
