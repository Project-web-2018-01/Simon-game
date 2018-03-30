
var userSeq = [];
var simonSeq = [];
var id, color, level = 0

var boardSound = [
  "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3", //red
  "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3", //blue
  "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3", //yellow 
  "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3" //green   
];

//START THE GAME
  $(function(){ 
    $(".start-btn").click(function(){
      level = 1;
      userSeq = [];
      simonSeq = [];
      $("div").removeClass("disable");
      console.log("starting the game");
      simonSequence(); 
    })
    $(".stop-btn").click(function(){
       console.log("stop the game");
       resetGame()
    })
    $(".btn").click(function(){
      id = $(this).attr("id");//
      color = $(this).attr("class").split(" ")[1];//
      userSequence();
      //check user sequence
      if(!checkUserSeq()) {
        resetGame();
      }

      //checking end of sequence
      if(userSeq.length == simonSeq.length) {
        level++;
        userSeq = [];
        simonSequence();
        console.log('tutaj')
      }
    })
  })

//Checking user serq against simon's
function checkUserSeq() {
  for(var i =0; i < userSeq.length; i++) {
    if(userSeq[i] != simonSeq[i]) {
      return false;
    }
  }
  return true;
}

//SIMON SEQUENCE
function simonSequence() {
  $(".title").text("Simon's sequence");
  console.log("level to " + level);
  $(".display").text(level);
  getRandom();
  var i = 0;
  var myInterval = setInterval(function() {
    id = simonSeq[i];
    color = $("#"+id).attr("class").split(" ")[1]
    console.log('Simon Id is ' + id + ' and color ' + color)
    addClassSound(id, color);
    i++;
    if(i == simonSeq.length) {
      clearInterval(myInterval);
    }
  }, 1500);
}

//GENERATE SEQUENCE
function getRandom() {
  var random = Math.floor(Math.random() * 4);
  simonSeq.push(random)
  console.log("Random number is " + random);
}

//USER SEQUENCE
function userSequence() {
  $(".title").text("Your sequence");
  console.log('user id is ' + id + ' and the color is ' + color);
  addClassSound(id, color);
  userSeq.push(id);
  //
  if(!checkUserSeq()){
    error = true;

  }else if(userSeq.length == simonSeq.length && userSeq.length < 20) {
    level++;
    userSeq = [];
    error = false;
    simonSequence();
    console.log("to tutaj") /////  
  }
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
  alert('GAME OVER')
  userSeq = [];
  simonSeq = 0;
  $(".display").text("00");
  $(".btn").addClass("disable");
  console.log('resetuje')
}

