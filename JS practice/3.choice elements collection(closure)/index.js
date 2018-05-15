/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
  var arg = arguments;
  var cloneCollection = JSON.parse(JSON.stringify(collection));
  if (arg.length == 1) return cloneCollection;
  else {
    var actions = [].slice.call(arg, 1);
    var indexesFilter = [];
    var indexesSelect = [];

    actions.forEach(function(item, index) {     
      if (item.toString().includes('filterData')) indexesFilter.push(index);
      else indexesSelect.push(index);
    });

    var newData = cloneCollection;
    
    for (var i = 0; i < indexesFilter.length; i++) {
      var _index = indexesFilter[i];
      var _data = actions[_index](newData);
      newData = _data;
    }
    for (var i = 0; i < indexesSelect.length; i++) {
      var _index = indexesSelect[i];
      var _data = actions[_index](newData);
      newData = _data;
    }

    return newData;
  }
}

/**
 * @params {String[]}
 */
function select() {
  for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
    arg[_key] = arguments[_key];
  }

  return function selectData(data) {
    var tmpCollection = [];
    data.map(function(item, index) { 
      var tmpItem = {};

      for (var i = 0; i < arg.length; i++) {  
        var prop = arg[i];      
        if (prop in item) tmpItem[prop] = item[prop];
      }     

      tmpCollection[index] = tmpItem;
    });
    return tmpCollection;
  };
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
  for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
    arg[_key] = arguments[_key];
  }
  var property = arg[0];
  var values = arg[1];

  return function filterData(data) {

    var tmpCollection = data.filter(function(item, index) {
      if (property in item) {
        for (var i = 0; i < values.length; i++) {
          if (item[property] === values[i]) return true;
        }
        return false;
      }
      else return false;
    });

    return tmpCollection;
  };

}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
