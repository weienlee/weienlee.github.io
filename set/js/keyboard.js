$(function() {

  let mapping = {
    'q': 0,
    'w': 1,
    'e': 2,
    'r': 3,
    'a': 4,
    's': 5,
    'd': 6,
    'f': 7,
    'z': 8,
    'x': 9,
    'c': 10,
    'v': 11,
    'b': 12,
    'n': 13,
    'm': 14,
  }

  $.fn.filterByData = function(prop, val) {
    return this.filter(
      function() { return $(this).data(prop)==val; }
    );
  }

  function toggle(position) {
    $('.card').filterByData('position', position).click();
  }

  // Keyboard Control
  $(document).on('keypress', function (e) {
    var char = String.fromCharCode(e.which);
    if (char in mapping) {
      toggle(mapping[char]);
    } else if (char === 'p') {
      $('.pause').click();
    } else if (e.which === 13) {
      $('.restart').click();
    } else if (e.which == 32) {
      $('.noset').click();
    }
  });

});