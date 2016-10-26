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

  $(document).on('click', '.pause', function(event) {
    console.log("before pausing", game.getGameState());
    $('.paused-time').html(getTimeString(game.time));
    $('.pause-blanket').show();
    game.pauseTime();
    console.log("after pausing", game.getGameState());
  })

  $(document).on('click', '.resume', function(event) {
    $('.pause-blanket').hide();
    game.resumeTime();
  })

  $(document).on('visibilitychange', function(event) {
    console.log("before visibility change", game.getGameState());
    if (document.hidden && game.getGameState() == "playing") {
      game.pauseTime();
    }
    if (document.hidden == false && game.getGameState() == "paused") {
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