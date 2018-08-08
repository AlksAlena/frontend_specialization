window.onload = function() {

  var cards = document.querySelectorAll('.card');

  function init() {
    for(var i = 0; i < cards.length; i++ ) {
      cards[i].addEventListener('click', function(e) {
        var elem = e.target;
        elem.classList.toggle('active');
        elem.parentNode.classList.toggle('active');
      });
      var top = document.createElement('div');
      cards[i].appendChild(top).classList.add('top');
    }
  }

  init();
};
