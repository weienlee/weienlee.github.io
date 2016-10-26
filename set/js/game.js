MASK0 = 85; //0b01010101
MASK1 = 170; //0b10101010

var Game = function(container) {
  this.deck = null;
  this.deckSize = 0;
  this.currentCards = [];
  this.selectedCards = [];
  this.div = container;
  this.time = 0;
  this.game_state = "playing";
};

Game.prototype.init = function() {
  // reset deck
  this.deck = new Deck();
  this.startTime();

  // clear arrays
  this.currentCards.length = 0;
  this.selectedCards.length = 0;

  // deal initial cards
  Array.prototype.push.apply(this.currentCards, this.deck.dealCards(12));
  this.deckSize = this.deck.getCards().length;

  this.draw();
}

Game.prototype.draw = function() {
  $('.card').remove();
  for (var i=0; i<this.currentCards.length; i++) {
    let card = this.currentCards[i];
    let cardDiv = $('<div class="card"></div>');
    for (var j=0; j<=card.getNumber(); j++) {
      let symbol = $('<div class="symbol"></div>');
      symbol.addClass(card.getClass());
      cardDiv.append(symbol);
    }
    cardDiv.data('position', i);
    this.div.append(cardDiv);
  }
}

Game.prototype.toggleCard = function(position) {
  // toggle card at position
  let index = this.selectedCards.indexOf(position);
  if (index < 0) {
    this.selectedCards.push(position);
  } else {
    this.selectedCards.splice(index, 1);
  }

  // if 3 cards are selected, check to see if valid set
  if (this.selectedCards.length === 3) {
    if (this.checkSet()) {
      this.dealCards();
    } else {
      // TODO: handle incorrect set
      this.selectedCards.length = 0;
      $('.selected').removeClass('selected');
    }
  }
}

Game.prototype.checkSet = function() {
  let card1 = this.currentCards[this.selectedCards[0]];
  let card2 = this.currentCards[this.selectedCards[1]];
  let card3 = this.currentCards[this.selectedCards[2]];

  let number = ((card1.getNumber() + card2.getNumber() + card3.getNumber()) % 3) === 0;
  let color = ((card1.getColor() + card2.getColor() + card3.getColor()) % 3) === 0;
  let shape = ((card1.getShape() + card2.getShape() + card3.getShape()) % 3) === 0;
  let shading = ((card1.getShading() + card2.getShading() + card3.getShading()) % 3) === 0;

  return number && color && shape && shading;
}

Game.prototype.dealCards = function() {
  this.deckSize -= 3;
  if (this.deckSize < 0) {
    this.deckSize = 0;
  }

  $('.card-count').html("Cards left: " + this.deckSize);
  let cards = this.deck.dealCards(3);

  if (this.selectedCards.length === 3) {
    // replace set with new cards

    // sort so that we splice in reverse order
    this.selectedCards.sort(function(a, b) {
      return b - a;
    });
    
    for (var i=0; i<3; i++) {
      if (i<cards.length && this.currentCards.length <= 12) {
        this.currentCards[this.selectedCards[i]] = cards[i];
      } else {
        this.currentCards.splice(this.selectedCards[i],1);
      }
    }
    this.selectedCards.length = 0;
  } else {
    // dealing new cards because no set
    console.log('dealing b/c no sets');
    Array.prototype.push.apply(this.currentCards, cards);
  }

  console.log("deck has " + this.deck.cards.length + " cards left")
  console.log("noSet", this.noSet());
  if (this.deckSize <= 3 && this.noSet()) {
    this.gameOver();
  }

  // redraw board with new cards
  this.draw();
}

Game.prototype.gameOver = function() {
  clearInterval(this.interval);
  $('.blanket').show();
  $('.gameover').show();
  let seconds = this.time;
  score = getTimeString(seconds);
  $('.score').html("FINAL TIME: " + score);
}



Game.prototype.thirdCardBits = function(card1, card2) {
  let x = card1.getBits();
  let y = card2.getBits();
  let xor_bits = x ^ y;
  let swap = ((xor_bits & MASK1) >> 1) | ((xor_bits & MASK0) << 1);
  return (x&y) | (~(x|y) & swap);
}

Game.prototype.noSet = function() {
  let have = Array(256).fill(0);
  for (var i=0; i<this.currentCards.length; i++) {
    have[this.currentCards[i].getBits()] = i;
  }
  for (var i=0; i<this.currentCards.length; i++) {
    for (var j=i+1; j<this.currentCards.length; j++) {
      var k = have[this.thirdCardBits(this.currentCards[i], this.currentCards[j])];
      if (k > j) {
        return false;
      }
    }
  }

  return true;
}

Game.prototype.checkNoSet = function() {
  if (this.noSet()) {
    this.dealCards();
  } else {
    // TODO: visually show no set
    this.time += 10;
    $('.time').html(getTimeString(this.time));
  }
}

Game.prototype.getGameState = function() {
  return this.game_state;
}

Game.prototype.pauseTime = function() {
  clearInterval(this.interval);
  this.game_state = "paused";
}

Game.prototype.resumeTime = function() {
  this.game_state = "playing";
  clearInterval(this.interval);
  var that = this;
  this.interval = setInterval(function(){
    $('.time').html(getTimeString(that.updateTime()));
  }, 1000);
}

Game.prototype.updateTime = function() {
  this.time += 1;
  return this.time;
}

Game.prototype.startTime = function() {
  this.time = 0;
  clearInterval(this.interval);
  var that = this;
  this.interval = setInterval(function(){
    $('.time').html(getTimeString(that.updateTime()));
  }, 1000);
}

function getTimeString(sec_num) {
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return minutes+':'+seconds;
}