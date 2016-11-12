$(function() {

  let mapping = {
    'q': 0,
    'a': 1,
    'z': 2,
    'w': 3,
    's': 4,
    'x': 5,
    'e': 6,
    'd': 7,
    'c': 8,
    'r': 9,
    'f': 10,
    'v': 11,
    't': 12,
    'g': 13,
    'b': 14,
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