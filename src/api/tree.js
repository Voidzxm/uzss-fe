/**
 * convert multiple json object to mapping json object
 */
// const _testData = [{'id': 100, 'name': 'Dashboard', 'icon': 'tachometer-alt', 'secondClass': [{'id': 100100, 'name': 'Members1'}, {'id': 100101, 'name': 'Members2'}, {'id': 100102, 'name': 'Members3'}]}, {'id': 101, 'name': 'Dashboard2', 'icon': 'tachometer-alt', 'secondClass': [{'id': 101100, 'name': 'Members4'}, {'id': 101101, 'name': 'Members5'}]}, {'id': 102, 'name': 'Dashboard3', 'icon': 'tachometer-alt', 'secondClass': [{'id': 102100, 'name': 'Members7'}, {'id': 102101, 'name': 'Members8'}, {'id': 102102, 'name': 'Members9'}, {'id': 102103, 'name': 'Members20'}, {'id': 102104, 'name': 'Members21'}, {'id': 102105, 'name': 'Members22', 'thirdClass': [{'id': 102105205, 'name': 'Members32'}, {'id': 102105206, 'name': 'Members33'}, {'id': 102105207, 'name': 'Members34'}, {'id': 102105208, 'name': 'Members35'}, {'id': 102105209, 'name': 'Members36'}, {'id': 102105210, 'name': 'Members37'}]}]}, {'id': 103, 'name': 'Dashboard4', 'icon': 'tachometer-alt', 'secondClass': [{'id': 103100, 'name': 'Members10'}, {'id': 103101, 'name': 'Members11'}, {'id': 103102, 'name': 'Members12'}, {'id': 103103, 'name': 'Members29'}, {'id': 103104, 'name': 'Members30'}, {'id': 103105, 'name': 'Members31'}]}]
let mapping = []
export default {
  // 递归将正常的json转换为tree结构的json
  convertJson2Tree (jsonArrObj) {
    for (let i in jsonArrObj) {
      for (let key in jsonArrObj[i]) {
        if (typeof (jsonArrObj[i][key]) === 'object') {
          this.convertJson2Tree(jsonArrObj[i][key])
          for (let j in jsonArrObj[i][key]) {
            mapping.push({'id': jsonArrObj[i][key][j].id, 'parent': jsonArrObj[i].id})
          }
        }
      }
    }
    return mapping
  },
  clearTree () {
    mapping = []
  }
}
