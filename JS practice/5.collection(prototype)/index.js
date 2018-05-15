module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 */
function Collection() {}

Collection.prototype = Object.create(Array.prototype);

// Методы коллекции

Collection.prototype.values = function () {
  var result = [];
  for (var i = 0; i < this.length; i++) {
    result.push(this[i]);
  }
  return result;
};
Collection.prototype.at = function (elem) {
  if (elem === 0) return null;
  else return this[elem-1];
};

Collection.prototype.append = function (elem) {
  if (elem instanceof Array) {
    for (var i = 0; i < elem.length; i++) {
      this.push(elem[i]);
    }
  } else this.push(elem);
  
};

Collection.prototype.removeAt = function (elem) {
  if (elem <=0 || elem >= (this.length + 1)) return false;
  else {
    this.splice([elem-1], 1);
    return true;
  }
};

Collection.prototype.count = function () {
  return this.length;
};
/**
 * Создание коллекции из массива значений
 */
Collection.from = function () {
  var args = [].slice.call(arguments[0]);
  var arr = Object.create(Collection.prototype);
  arr.append(args);
  return arr;
};
