var isstarted = false;
var level = 0;
var userClickedPatter = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

//for game inbuiolt
function nextSequence() {
  userClickedPatter=[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}
//for playing sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// playSound(red);

//for button click by user
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPatter.push(userChosenColour);
  
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPatter.length-1);
});

//for anu=imations

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//keypress detect

$(document).keypress(function () {
  if (!isstarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    isstarted = true;
  }
});



//check answer
function checkAnswer(currentLevel)
{
  if (gamePattern[currentLevel] === userClickedPatter[currentLevel]) {
    
    console.log("success");

    if(userClickedPatter.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }

  }
  else{
    var loose = new Audio("sounds/wrong.mp3");
    $(document).addClass("game-over");
    setTimeout(function(){
      $(document).removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart.")
    startOver();
  }
}


//game over
//game over
//restart
function startOver(){
  level =0;
  gamePattern = [];
  isstarted = false;
}
