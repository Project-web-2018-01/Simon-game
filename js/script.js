const RED = "RED";
const BLUE = "BLUE";
const YELLOW = "YELLOW";
const GREEN = "GREEN";

var simon = {
  sendColor: function(color){
    if(simon.sequence.length === 0) {
      //start game
      simon.nextSequence();
    }else {
      
        if(color == simon.sequence[simon.step]) {
          //go to next step
          if(simon.step === simon.sequence.length - 1){
            console.log('sequence complete!');
            simon.step = 0;
            simon.nextSequence();
          }else {
            simon.step++
          }

        }else {
          //game over
          alert("game over");
          simon.sequence = [];
          simon.step = 0;
        }
      }
    console.log("New color: " + color);
  },
  sequence: [],
  colors: [RED, BLUE, YELLOW, GREEN],
  step: 0,
  nextSequence: function() {
    var nextColor = simon.colors[Math.floor(Math.random() * simon.colors.length)];
    simon.sequence.push(nextColor);
    console.log('the sequence ', simon.sequence);
  }
};


$(document).ready(function(){
  $("#red").click(function(){ simon.sendColor(RED)});
  $("#blue").click(function(){ simon.sendColor(BLUE)});
  $("#yellow").click(function(){ simon.sendColor(YELLOW)});
  $("#green").click(function(){ simon.sendColor(GREEN)});

  $(".btn").mousedown(function(){
    $(this).addClass("opacity");
  });
  $(".btn").mouseup(function(){
    $(this).removeClass("opacity");
  })
})