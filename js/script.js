// const RED = "RED";
// const BLUE = "BLUE";
// const YELLOW = "YELLOW";
// const GREEN = "GREEN";

userSeq = [];
simonSeq = [];
var id, color, level = 0

var boardSound = [
  "http://www.pacdv.com/sounds/interface_sound_effects/sound83.wav", //red
  "http://www.pacdv.com/sounds/interface_sound_effects/sound87.wav", //blue
  "http://www.pacdv.com/sounds/interface_sound_effects/sound85.wav", //yellow 
  "http://www.pacdv.com/sounds/interface_sound_effects/sound94.wav" //green   
];

//START THE GAME
  $(function(){
    $(".start-btn").click(function(){
      console.log("starting the game");
      simonSequence();
    })
    $(".stop-btn").click(function(){
       console.log("stop the game");
       resetGame();
    })
    $(".btn").click(function(){
      id = $(this).attr("id");
      color = $(this).attr("class").split(" ")[1];
      userSequence();
      
      //checking end of sequence
      if(userSeq.length == simonSeq.length) {
        level++;
        userSeq = [];
        simonSequence();
      }
    })
  })
//Checking user serq against simon's
function checkUserSeq() {
  for(var i =0; i <userSeq.length; i++) {
    if(userSeq[i] != simonSeq[i]) {
      return false;
    }
  }
  return true;
}

//Display error
function displayError() {
  console.log('display error');
  alert("Game over")
}

//SIMON SEQUENCE
function simonSequence() {
  console.log("level to " + level);
  $(".display").text(level+1);
  getRandom();
  var i = 0;
  var myInterval = setInterval(function() {
    id = simonSeq[i];
    color = $("#"+id).attr("class").split(" ")[1];
    console.log('Simon Id is ' + id + ' and color ' + color)
    addClassSound(id, color);
    i++;
    if(i == simonSeq.length) {
      clearInterval(myInterval);
    }
  }, 1000);
}

//GENERATE SEQUENCE
function getRandom() {
  var random = Math.floor(Math.random() * 4);
  simonSeq.push(random)
}

//USER SEQUENCE
function userSequence() {
  userSeq.push(id);
  console.log('user id is ' + id + ' and the color is ' + color);
  addClassSound(id, color);
  //
  if(userSeq.length == 20) {
    alert("You are the winner!");
    resetGame();
  }
    
  
}

//ADDING OPPACITY
function addClassSound(id, color) {
  $("#"+id).addClass("opacity");
  playSound();
  setTimeout(function() {
    $("#"+id).removeClass("opacity");
  }, 1000);
}

//PLAY BOARD SOUND
function playSound() {
  var sound = new Audio(boardSound[id]);
  sound.play();
}


//RESET GAME
function resetGame() {
  userSeq = [];
  simonSeq = [];
  level = 0;
  $(".display").text("00");
}