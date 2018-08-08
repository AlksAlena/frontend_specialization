window.onload = function() {

  function Game(desk, emodji) {
    this.emodji = emodji;
    this.desk = desk;
    this.cardsList = [];
    this.init =  function() {
      var cards = this.desk.querySelectorAll('.card_container');
      for (var i = 0; i < cards.length; i++) {
        var icon = this.setContent();
        this.cardsList[i] = new Card(cards[i], i, icon);
      }
      console.log(this.cardsList)
    };
    this.setContent = function() {
      var number = this.randomIconNumber();
      var icon = this.emodji[number].count < 2 ? 
        ( this.emodji[number].count += 1, this.emodji[number].content ) : this.setContent();
      return icon;
    };
    this.randomIconNumber = function() {
      var max = 12;
      var number = Math.floor(Math.random() * max) % 6;
      return number;
    };
    this.equal = function(cardsIndexes) {
      var _cardsIndexes = cardsIndexes.slice();
      var prevIndex = _cardsIndexes.pop();
      var nextIndex = _cardsIndexes.pop();
      var prevCard = this.cardsList[prevIndex];
      var nextCard = this.cardsList[nextIndex];

      if (prevCard.content === nextCard.content) {
        prevCard.value.lastElementChild.classList.add('equal');
        nextCard.value.lastElementChild.classList.add('equal');
        prevCard.setRotateState('equal');
        nextCard.setRotateState('equal');
        return true;
      }
      else {
        prevCard.value.lastElementChild.classList.add('unequal');
        nextCard.value.lastElementChild.classList.add('unequal');
        prevCard.setRotateState('unequal');
        nextCard.setRotateState('unequal');
        return false;
      }
    };
  }

  function Card(elem, id, icon) {
    this.value = elem;
    this.value.id = id;
    this.content = icon;
    this.showState = false;
    this.rotateState = true;
    var backSide = this.value.lastElementChild;
    backSide.setAttribute('data-icon', icon);
  }
  Card.prototype.rotate = function() {
    this.value.classList.toggle('active');
    this.setShowState();
  };
  Card.prototype.setShowState = function() {
    if (this.value.classList.contains('active')) this.showState = true;
    else this.showState = false;
  };
  Card.prototype.setRotateState = function(classElem) {
    if (this.value.lastElementChild.classList.contains(classElem)) {
      this.rotateState = false;
    }
    else this.rotateState = true;
  };

  var emodji = [
  	{
  		content: '🐱',
  		count: 0
  	},
  	{
  		content: '🐯',
  		count: 0
  	},
  	{
  		content: '🐻',
  		count: 0
  	},
  	{
  		content: '🦄',
  		count: 0
  	},
  	{
  		content: '🦁',
  		count: 0
  	},
  	{
  		content: '🐼',
  		count: 0
  	}
  ];

  var desk = document.getElementById('gamedesk');
	var game = new Game(desk, emodji);
  game.init();
  var cardsIndexes = [];
  var currentActiveCount = 0;
  game.desk.addEventListener("click", function(event) {
    // 3 клика подряд
    if (event.target.id !== 'gamedesk' && (currentActiveCount < 3)) {
      var index = parseInt(event.target.parentElement.id, 10);
      // если карта не заблокирована
      if (game.cardsList[index].rotateState) { //  0 || 1 || 2
        game.cardsList[index].rotate();

        if (game.cardsList[index].showState) {
          cardsIndexes.push(index);
          if (cardsIndexes.length == 2) {
            game.equal(cardsIndexes);
          }
          currentActiveCount ++;
          if (currentActiveCount === 3) {
            var prevIndex = cardsIndexes.shift();
            var nextIndex = cardsIndexes.shift();
            var prevCard = game.cardsList[prevIndex];
            var nextCard = game.cardsList[nextIndex];
            currentActiveCount = 1;
            if (prevCard.value.lastElementChild.classList.contains('unequal')) {
              setTimeout(function() {
                prevCard.rotate();
                nextCard.rotate();
                prevCard.value.lastElementChild.classList.remove('unequal');
                nextCard.value.lastElementChild.classList.remove('unequal');
                prevCard.setRotateState();
                nextCard.setRotateState();
              }, 1000);
            }
          }
        } else { // карта закрылась - удаляем ее индекс из массива
          cardsIndexes.pop(index);
          currentActiveCount --;
        }
      } else console.log('the card is disabled!');
    }
  });

};
