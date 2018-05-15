module.exports = {
  eventsList: {},
  /**
   * @param {String} event
   * @param {Object} subscriber
   * @param {Function} handler
   */
  on: function (event, subscriber, handler) {
    if (this.eventsList.hasOwnProperty(event)) { // событие есть, добавляем подписчика
      this.eventsList[event].push({
        subscriber: subscriber,
        handler: handler
      });
    }
    else { // события нет, создаем и добавляем подписчика
      this.eventsList[event] = [];
      this.eventsList[event].push({
        subscriber: subscriber,
        handler: handler
      });
      
    }
    return this;
  },

  /**
   * @param {String} event
   * @param {Object} subscriber
   */
  off: function (event, subscriber) {
    if (this.eventsList.hasOwnProperty(event)) { // существует событие, проверяем подписчиков
      this.eventsList = this.eventsList[event].filter(function(item) {
        if (item.subscriber === subscriber) return false;
        else return true;
      });
    }
    return this;

  },

  /**
   * @param {String} event
   */
  emit: function (event) {
    if (this.eventsList.hasOwnProperty(event)) this.eventsList[event].map(function(item) {
      item.handler.call(item.subscriber);
    });
    return this;

  }
};
