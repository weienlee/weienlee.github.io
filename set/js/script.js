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

  $(document).on('visibilitychange', function(event) {
    if (document.hidden) {
      game.pauseTime();
    }
    else {
      game.resumeTime();
    }
  })

  $(document).on('click', '.restart', function(event) {
    $('.time').html("00:00");
    $('.blanket').hide();
    $('.gameover').hide();
    $('.card-count').html("Cards left: 69");
    game.init();

  })
});