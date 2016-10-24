$(function() {
  var container = $('.game');
  var game = new Game(container);
  game.init();

  // handlers
  $(document).on('click', '.card', function(event) {
    $(this).toggleClass('selected');
    game.toggleCard($(this).data('position'));
  });

  $(document).on('click', '.noset', function(event) {
    game.checkNoSet();
  })
});