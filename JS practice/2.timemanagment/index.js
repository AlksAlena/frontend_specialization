/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {
  // /[0-9]+/g.test(date);
  var changeDate = {};

  Object.defineProperties(changeDate, {
    'tmpDate': {
      value: new Date(date),
      enumerable: true,
      writable: true,
      configurable: true
    },
    'value': {
      value: '',
      enumerable: true,
      writable: true,
      configurable: true
    },
    'add': {
      value: function(count, typeCount) {
        if (count < 0) throw new TypeError('Значение не может быть отрицательным');

        switch(typeCount) {
          case 'years':
            count += this.tmpDate.getFullYear();
            this.tmpDate.setFullYear(count);
            this.generateNewValue();
            return this;

          case 'months':
            count += this.tmpDate.getMonth();
            this.tmpDate.setMonth(count);
            this.generateNewValue();
            return this;

          case 'days':
            count += this.tmpDate.getDate();
            this.tmpDate.setDate(count);
            this.generateNewValue();
            return this;

          case 'hours':
            count += this.tmpDate.getHours();
            this.tmpDate.setHours(count);
            this.generateNewValue();
            return this;

          case 'minutes':
            count += this.tmpDate.getMinutes();
            this.tmpDate.setMinutes(count);
            this.generateNewValue();
            return this;

          default: throw new TypeError('Недопустимая единица измерения');
        }
      },
      enumerable: true,
      writable: true,
      configurable: true
    },
    'subtract': {
      value: function(count, typeCount) {
        if (count < 0) throw new TypeError('Значение не может быть отрицательным');

        switch(typeCount) {
          case 'years':
            var tmp = this.tmpDate.getFullYear();
            tmp -= count;
            this.tmpDate.setFullYear(tmp);
            this.generateNewValue();
            return this;

          case 'months':
            var tmp = this.tmpDate.getMonth();
            tmp -= count;
            this.tmpDate.setMonth(tmp);
            this.generateNewValue();
            return this;

          case 'days':
            var tmp = this.tmpDate.getDate();
            tmp -= count;
            this.tmpDate.setDate(tmp);
            this.generateNewValue();
            return this;

          case 'hours':
            var tmp = this.tmpDate.getHours();
            tmp -= count;
            this.tmpDate.setHours(tmp);
            this.generateNewValue();
            return this;

          case 'minutes':
            var tmp = this.tmpDate.getMinutes();
            tmp -= count;
            this.tmpDate.setMinutes(tmp);
            this.generateNewValue();
            return this;

          default: throw new TypeError('Недопустимая единица измерения');
        }
      },
      enumerable: true,
      writable: true,
      configurable: true
    },
    'changingDate': {
      value: function() {
        
      },
      enumerable: true,
      writable: true,
      configurable: true
    },
    'generateNewValue': {
      value: function() {
        var month = this.tmpDate.getMonth() + 1;
        var str = this.tmpDate.getFullYear() + '-' + binaryNumber(month) + '-' + 
            binaryNumber(this.tmpDate.getDate()) + ' ' +
            binaryNumber(this.tmpDate.getHours()) + ':' + binaryNumber(this.tmpDate.getMinutes());
        
        this.value = str;
      },
      enumerable: true,
      writable: true,
      configurable: true
    }
  });

  return changeDate;
};

function binaryNumber(number) {
  number < 10 ? number = '0' + number : number;
  return number;
}