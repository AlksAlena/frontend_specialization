// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
  var comandName = command.split(' ').shift();

  switch(comandName) {
    case 'ADD': 
      var contactName = command.split(' ').slice(1,2).shift();
      var phones = command.split(' ').slice(2);

      if(phones.length > 0) {
        phones = phones.shift();
        var separatePhones = phones.split(',');
      } else var separatePhones = [];

      if(phoneBook.hasOwnProperty(contactName)) {
        phoneBook[contactName] = phoneBook[contactName].concat(separatePhones);
      } else {
          phoneBook[contactName] = [].concat(separatePhones);
        }
      return phoneBook;
    case 'REMOVE_PHONE':
      var phone = command.split(' ').slice(1).shift();
      var contacts = Object.keys(phoneBook); // все контакты
      for(var i = 0; i < contacts.length; i++) {
        var phoneList = phoneBook[contacts[i]];
        if(phoneList.includes(phone)) {
          var indexPhone = phoneList.indexOf(phone);
          phoneBook[contacts[i]] = phoneList.filter(function(phone, index) {
            if(index !== indexPhone) return true;
            else return false;
          });
          return true;
        }
      }
      return false;
    case 'SHOW':
      var contacts = Object.keys(phoneBook);
      var showPhoneBook = contacts.reduce(showPhones, []);
      showPhoneBook.sort();
      return showPhoneBook;
    }
};

function showPhones(acc, contact) {
  if(phoneBook[contact].length > 0) {
    var phones = phoneBook[contact].join(', ');
    var result = contact + ': '+ phones;
    acc.push(result);
    return acc;
  } else return acc;
}
