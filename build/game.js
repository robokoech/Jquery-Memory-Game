
var gamePattern = [];
var userClickedPattern = [];

var level = 0;

var buttonColors = ["red", "blue", "green", "yellow"]
// jquery enabled below
$(document).on("keypress", nextSequence);


// functionality to run each sequence for the game 
function nextSequence() {
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  animatePress(randomChosenColor);
  playSound(randomChosenColor);

  $("#level-title").text("Level " + level);
  $("#level-title-2").text("");

}


$(".btn").on("click", function(event) {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer((userClickedPattern.length) - 1);

});

function playSound(name) {
  var soundColor = new Audio("sounds/" + name + ".mp3");
  soundColor.play();

}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);


}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {


    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(nextSequence, 1000);

    }

  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 500);

    $("#level-title").text("Game Over, Press Any Key to Restart");


    startOver();

  }

}

function startOver() {
  level = 0;
  gamePattern = [];

}
