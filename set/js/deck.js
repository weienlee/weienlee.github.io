var Deck = function() {
  this.cards = [];
  for (var number=0; number<3; number++) {
      for (var color=0; color<3; color++) {
          for (var shape=0; shape<3; shape++) {
              for (var shading=0; shading<3; shading++) {
                  this.cards.push(new Card(number, color, shape, shading));
              }
          }
      }
  }
  shuffle(this.cards);
  //this.cards.splice(15);
};

Deck.prototype.genCSS = function() {
  result = "";
  for (var i=0; i<this.cards.length; i++) {
    if (this.cards[i].getNumber() === 0){
      var css = '.' + this.cards[i].getClass() + ' {\n';
      css += '  background-image: url("' + this.cards[i].getImageFile() + '");\n}';
      result += (css + "\n\n");
    }
  }
  console.log(result);
}

Deck.prototype.getCards = function() {
  return this.cards;
};

Deck.prototype.dealCards = function(numCards) {
  return this.cards.splice(0, numCards);
};


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
};