var buttonColor = ["green","red","blue","yellow"];

var gamePattern = [];
var userPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started)
    {
        started = true;
        $(".levelTitle").text("Level " + level);
        nextSequence();
    }
});

$("button").click(function(){
    var color = $(this).attr("id");
    userPattern.push(color);

    playSound(color);
    animation(color);

    checkResult(userPattern.length-1);
});

function checkResult(currentLevel){
    if(userPattern[currentLevel] === gamePattern[currentLevel]){
        if(userPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $(".levelTitle").text("Game Over, Press Any Key to Restart");

        $("body").addClass("gameOver");
        setTimeout(function(){
            $("body").removeClass("gameOver");
        },200);

        startOver();
    }
}

function nextSequence(){
    userPattern = [];
    level++;
    $(".levelTitle").text("Level " + level);
    var i = Math.floor(Math.random()*4);
    gamePattern.push(buttonColor[i]);

    playSound(buttonColor[i]);
    $("#" + buttonColor[i]).fadeIn(100).fadeOut(100).fadeIn(100);
}



function animation(color){
    $("#" + color).addClass("pressed");

    setTimeout(function(){
        $("#" + color).removeClass("pressed");
    },100);
}

function playSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}