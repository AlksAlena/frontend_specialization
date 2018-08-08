window.onload = function() {

  function Game(desk, timer, popup) {
    this.desk = desk;
    this.cardsList = [];
    this.timer = timer;
    this.popup = popup;
    this.isWin = false;
    this.init =  function(emodji) {
      var setEmodji = emodji.concat(emodji); // 12 icons
      var cards = this.desk.querySelectorAll('.card_container');
      for (var i = 0; i < cards.length; i++) {
        var icon = this.setContent(setEmodji);
        this.cardsList[i] = new Card(cards[i], i, icon);
      }
    };
    this.setContent = function(setEmodji) {
      var randomNumber = Math.floor(Math.random() * 10000) % setEmodji.length;
      var icon = setEmodji.splice(randomNumber, 1)[0];
      return icon;
    };
    this.togglePopup = function(result) {
      var message = '', text = '';
      this.popup.classList.toggle('active');
      if (result) {
        text = 'Win';
        for (var i = 0; i < 3; i++) {
          message += '<span class="message-win">' + text[i] + '</span>';
        }
      } else {
        text = 'Lose';
        for (var i = 0; i < 4; i++) {
          message += '<span class="message-lose">' + text[i] + '</span>';
        }
      }
      this.popup.firstElementChild.firstElementChild.innerHTML = message;
    };
    this.rePlay = function(emodji) {
      this.togglePopup();
      this.isWin = false;
      this.timer.innerHTML = '01:00';
      this.cardsList.forEach(function(item) {
        var card = item.elem.lastElementChild;
        if (item.isOpen) item.rotate();
        if (card.classList.contains('unequal')) card.classList.remove('unequal');
        if (card.classList.contains('equal')) card.classList.remove('equal');
      });
      this.cardsList = [];
      this.init(emodji);
    }
  }

  function Card(elem, id, icon) {
    this.elem = elem;
    this.elem.id = id;
    this.icon = icon;
    this.isOpen = false;
    this.isSingle = false;
    this.isNotEqual = false;
    this.toRotate = true;    
    this.elem.lastElementChild.dataset.icon = icon;
  }
  Card.prototype.rotate = function() {
    this.elem.classList.toggle('active');
    if (this.elem.classList.contains('active')) {
      this.isOpen = true;
      this.toRotate = false;
    } else this.isOpen = false;
  };
  Card.prototype.isEqual = function(nextCard) {
    if (this.icon === nextCard.icon) {
      this.elem.lastElementChild.classList.add('equal');
      nextCard.elem.lastElementChild.classList.add('equal');
    } else {
      this.elem.lastElementChild.classList.add('unequal');
      nextCard.elem.lastElementChild.classList.add('unequal');
      this.isNotEqual = true;
      nextCard.isNotEqual = true;
    }
  };

  var emodji = ['🐱', '🐯', '🐻', '🦄', '🦁', '🐼'];
  var desk = document.querySelector('.board');
  var timer = document.querySelector('.timer');
  var popup = document.querySelector('.popup');
  var game = new Game(desk, timer, popup);
  game.init(emodji);
  var idTimer = null;
  var timer = 59;

  game.desk.addEventListener('click', function(event) {
    if (event.target.tagName === 'SPAN') {
      if (!idTimer) {
        idTimer = setTimeout(function nextTime() {
          var timeString = '';
          timeString = timer < 10 ? '00:0' + timer : '00:' + timer;
          game.timer.innerHTML = timeString;
          timer --;
          // if the time ran out and not game over
          if (timer >= 0 && !game.isWin) timerId = setTimeout(nextTime, 1000);
          else game.isWin ? game.togglePopup(true) : game.togglePopup(false);
        }, 1000);
      }
    } 
  });
  game.desk.addEventListener('click', function(event) { 
    if (timer > 0) {
      if (event.target.tagName === 'SPAN') {
        var card = game.cardsList[event.target.parentNode.id];
        if (card.toRotate) {
          card.rotate();
          // check that cards which not compare
          var openedNotCompareCards = game.cardsList.filter(function(item) {
            if (item.isOpen && item.isSingle) return true;
            else return false;
          });
          // if exist cards wich open but not compare - to compare
          if (openedNotCompareCards.length) {
            openedNotCompareCards[0].isEqual(card);
            game.isWin = game.cardsList.every(function(item) {
              return (item.elem.lastElementChild.classList.contains('equal'));
            });
            openedNotCompareCards[0].isSingle = false;
          } else {
            card.isSingle = true;
            // check that cards which not equal
            var openedNotEqualCards = game.cardsList.filter(function(item) {
              if (item.isNotEqual) return true;
              else return false;
            });
            // if exist cards wich not equal - close
            if (openedNotEqualCards.length) {
              openedNotEqualCards.forEach(function(item) {
                item.toRotate = true;
                item.rotate();
                item.isNotEqual = false;
                item.elem.lastElementChild.classList.remove('unequal');
              });
            }
          } 
        }
      }   
    }
  });

  var popupBtn = document.querySelector('.popup-btn');
  popupBtn.addEventListener('click', function() {
    game.rePlay(emodji);
    idTimer = null;
    timer = 59;
  });
  
};
