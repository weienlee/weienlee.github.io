COLOR_MAP = {
  "0": "green",
  "1": "purple",
  "2": "red"
};

SHAPE_MAP = {
  "0": "diamond",
  "1": "round",
  "2": "squiggle"
};

SHADING_MAP = {
  "0": "empty",
  "1": "filled",
  "2": "stripe"
};

var Card = function(number, color, shape, shading) {
  this.number = number;
  this.color = color;
  this.shape = shape;
  this.shading = shading;
  this.bits = (number << 6) + (color << 4) + (shape << 2) + (shading);
};

Card.prototype.getNumber = function() {
  return this.number;
};

Card.prototype.getColor = function() {
  return this.color;
};

Card.prototype.getShape = function() {
  return this.shape;
};

Card.prototype.getShading = function() {
  return this.shading;
};

Card.prototype.getBits = function() {
  return this.bits;
};

Card.prototype.getClass = function() {
  return COLOR_MAP[this.color] + "-" + SHAPE_MAP[this.shape] + "-" + SHADING_MAP[this.shading];
};

Card.prototype.getImageFile = function() {
  return "images/" + COLOR_MAP[this.color] + "_" + SHAPE_MAP[this.shape] + "_" + SHADING_MAP[this.shading] + ".png";
}

Card.prototype.toString = function() {
  return this.bits.toString(2);
};

