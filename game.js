


var userPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 1;

var gameStarted = false;

//keylistener invoke radomizer function

$("h1").click(gameStarter)
//randomizer: assign a color to gamepattern and flashes the selected color
function randomizer() {
    var randomNumber = Math.floor(Math.random() * 4) + 1;
    var randomColor = buttonColors[randomNumber - 1];
    console.log(randomColor)
    colorFlash(randomColor)//use colorflash 
    gamePattern.push(randomColor)//push random color to game pattern array
    console.log(gamePattern)
    playSound(randomColor)

    setTimeout(function(){
        $("h1").text("Round "+level)
    }, 200)
    
}


//create randomColorFlash animation function implemented in keylistener and randomizer
function colorFlash(color) {
    $("#" + color).fadeOut(200).fadeIn(200);
}

//add click listener to buttons, flash selected button and assign color to user pattern and invokes verifier
$(".btn").click(colorSelect);



function colorSelect(chosenColor){
        if(gamePattern.length!==0){
            var chosenColor = this.id
            pressedFlash(chosenColor)
            userPattern.push(chosenColor)
            console.log(userPattern)
            playSound(chosenColor)
            verifier();
        }
        
    
}

//create chosen color animation function implemented in click listener
function pressedFlash(chosen) {
    $("#" + chosen).addClass("pressed")
    setTimeout(function () {
        $("#" + chosen).removeClass("pressed")
    }, 100)
}

function playSound(sound){
    let audio = new Audio ("sounds/"+sound+".mp3");
    audio.play()
}

function verifier() {

        if (userPattern[userPattern.length - 1] !== gamePattern[userPattern.length - 1]) {

            var audio = new Audio ("sounds/wrong.mp3");
            audio.play();
            $("body").addClass("game-over")

            setTimeout(function(){
                $("body").removeClass("game-over") 
            },200)
            $("h1").text("nice Try. let us start over. \n Press here to restart" )
            $("h2").text("Correct sequence: "+gamePattern.toString())
            userPattern=[];
            gamePattern=[];
            level=1;
        } else if(userPattern.length==gamePattern.length){
            userPattern=[];
            level++
        
            setTimeout(function(){
                randomizer();
            },700)
        }else{
        }

}


//start game optionss
$(document).keydown(gameStarter)

function gameStarter(){
    if (gamePattern.length==0){
        randomizer()
        $("h2").text("");

    }
}