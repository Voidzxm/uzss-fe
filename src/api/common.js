/**
 * Some api could be reused.
 */

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
  HashMap () {
  // 定义长度
    let length = 0
    // 创建一个对象
    let obj = {}

    /**
   * 判断Map是否为空
   */
    this.isEmpty = function () {
      return length === 0
    }

    /**
   * 判断对象中是否包含给定Key
   */
    this.containsKey = function (key) {
      return (key in obj)
    }

    /**
   * 判断对象中是否包含给定的Value
   */
    this.containsValue = function (value) {
      for (let key in obj) {
        if (obj[key] === value) {
          return true
        }
      }
      return false
    }

    /**
   *向map中添加数据
   */
    this.put = function (key, value) {
      if (!this.containsKey(key)) {
        length++
      }
      obj[key] = value
    }

    /**
   * 根据给定的Key获得Value
   */
    this.get = function (key) {
      return this.containsKey(key) ? obj[key] : null
    }

    /**
   * 根据给定的Key删除一个值
   */
    this.remove = function (key) {
      if (this.containsKey(key) && (delete obj[key])) {
        length--
      }
    }

    /**
   * 获得Map中的所有Value
   */
    this.values = function () {
      let _values = {}
      for (var key in obj) {
        _values.push(obj[key])
      }
      return _values
    }

    /**
   * 获得Map中的所有Key
   */
    this.keySet = function () {
      let _keys = {}
      for (var key in obj) {
        _keys.push(key)
      }
      return _keys
    }

    /**
   * 获得Map的长度
   */
    this.size = function () {
      return length
    }

    /**
   * 清空Map
   */
    this.clear = function () {
      length = 0
      obj = {}
    }
  }
}
