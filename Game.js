var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

// start button
$(".start").click(function () {
    if (started == false) {
    started = true;
    nextSequence();
    $(".start").hide();

  }
});

// When clicked script

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userChosenColor);
  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

// function to check answers

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    var wrongAudio = new Audio("sounds/wrong.mp3")
    wrongAudio.play();
    $(document.body).addClass("game-over");
    setTimeout(() => {
    $(document.body).removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Restart Button.")
    $(".start").show()
    .text("RESTART GAME");
    startOver();
}
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randonNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randonNumber];
  gamePattern.push(randomChosenColor);

  console.log(randomChosenColor);

  playSound(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

// sounds effect function down here

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

// Animation function down here

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver()
{
    level = 0;
    gamePattern = [];
    started = false;
}
