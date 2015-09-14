var idAttributeName = 'id';

function Player(mark) {
  this.mark = mark;
  this.won = false;
}

function Space(xCoordinate, yCoordinate) {
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.markedBy = false;
}

Space.prototype.coordinates = function() {
  return [this.xCoordinate, this.yCoordinate];
};

Space.prototype.mark_by = function(Player) {
  this.markedBy = Player;
  return this.markedBy;
};

function Board() {
  this.width = 3;
  this.height = 3;

  this.spaces = [];
  var x, y;
  for (x=1; x <= this.width; x++) {
    this.spaces[x] = [];
    for (y=1; y <= this.height; y++) {
      this.spaces[x][y] = new Space(x, y);
    }
  }
}

Board.prototype.find = function(x,y) {
  return this.spaces[x][y];
};

Board.prototype.mark_by = function(Player) {
  this.markedBy = Player;
  return this.markedBy;
};

Board.prototype.winCondition = function(player) {
  if  (((this.spaces[1][1].markedBy === player) && (this.spaces[2][1].markedBy === player) && (this.spaces[3][1].markedBy === player)) ||
    ((this.spaces[1][2].markedBy === player) && (this.spaces[2][2].markedBy === player) && (this.spaces[3][2].markedBy === player)) ||
    ((this.spaces[1][3].markedBy === player) && (this.spaces[2][3].markedBy === player) && (this.spaces[3][3].markedBy === player)) ||
    ((this.spaces[1][1].markedBy === player) && (this.spaces[1][2].markedBy === player) && (this.spaces[1][3].markedBy === player)) ||
    ((this.spaces[2][1].markedBy === player) && (this.spaces[2][2].markedBy === player) && (this.spaces[2][3].markedBy === player)) ||
    ((this.spaces[3][1].markedBy === player) && (this.spaces[3][2].markedBy === player) && (this.spaces[3][3].markedBy === player)) ||
    ((this.spaces[1][1].markedBy === player) && (this.spaces[2][2].markedBy === player) && (this.spaces[3][3].markedBy === player)) ||
    ((this.spaces[3][1].markedBy === player) && (this.spaces[2][2].markedBy === player) && (this.spaces[1][3].markedBy === player))) {
      return player.won = true;
  }
};

function Game() {
  turnCount = 1;
  board = new Board();
  player1 = new Player("X"), player2 = new Player("O");
}

function drawCircle(fieldId) {
  var audio = new Audio('audio/shipphaser1.wav');
  var canvas =  document.getElementById(fieldId);
  var context = canvas.getContext('2d');
  var NC1701 = document.getElementById("NC1701");
  context.drawImage(NC1701,-30,-15);
  canvas.style.borderColor = "blue";
  audio.play();
}

function drawCross(fieldId) {
  var audio = new Audio('audio/KLNGTRP1.wav');
  var canvas =  document.getElementById(fieldId);
  var context = canvas.getContext('2d');
  var D7 = document.getElementById("D7");
  context.drawImage(D7,-18,-15);
  canvas.style.borderColor = "red";
  audio.play();
}

$(document).ready(function(e) {
  $('button#reset').hide();

var turn = 1;

  $('button#newGame').click(function(e) {
    var newGame = new Game();
    var audio = new Audio('audio/Qapla.wav');
    alert("Klingon player attacks first.");
    audio.play();
    $('button#newGame').hide();
    $('button#reset').show();
  });

  $('canvas.field').click(function(e) {

    if(turn % 2 !== 0) {
      var field = $(this);
      $(this).off('click');

      var fieldId = field.attr(idAttributeName);
      var holding = fieldId.split(",");

      var num1 = holding.shift();
      var num = parseInt(num1);
      var xnum = [] ;
      xnum.push(num);

      var num2 = holding.shift();
      var num = parseInt(num2);
      var ynum = [];
      ynum.push(num);

      board.find(xnum, ynum).mark_by(player1);
      drawCross(fieldId);

      if (board.winCondition(player1)) {
        var audio = new Audio('audio/explosion.mp3');
        var NC1701 = document.getElementById("NC1701");
        setTimeout(function() {
          NC1701.style.opacity = "0.4";
          $(".messages").text("Klingon player wins!!");
          audio.play();
        }, 2000);
        $('.field').off('click');
      }

  } else {
      var field = $(this);
      $(this).off('click');

      var fieldId = field.attr(idAttributeName);
      var holding = fieldId.split(",");

      var num1 = holding.shift();
      var num = parseInt(num1);
      var xnum = [] ;
      xnum.push(num);

      var num2 = holding.shift();
      var num = parseInt(num2);
      var ynum = [];
      ynum.push(num);

      board.find(xnum, ynum).mark_by(player2);
      drawCircle(fieldId);

      if (board.winCondition(player2)) {
        var audio = new Audio('audio/explosion.mp3');
        var D7 = document.getElementById("D7");
        setTimeout(function() {
          D7.style.opacity = "0.4";
          $(".messages").text("Federation player wins!!");
          audio.play();
        }, 2000);
        $('.field').off('click');
      }
    }
    turn++;
  });

  $('button#reset').click(function(event){
   event.preventDefault();
   document.location.reload(true);
  });
});
