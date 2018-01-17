$(document).ready(function() {
  document.getElementById("animate").onclick = function() {adjustCards()};

  function adjustCards(){
    var numberOfCards = document.getElementById("code").value;
    var nCols = Math.ceil(numberOfCards/6);
    var nCardsLastRow = numberOfCards % 6;
    if(nCardsLastRow == 0){
      addCards(nCols);
    }else{
      addCardsLeftover(nCols, nCardsLastRow);
    }

    if(numberOfCards < 6){
      var newHeight = (6 - numberOfCards) * 70 + (Math.floor(numberOfCards/5)*50);
      var newWidth = (90/numberOfCards);
      $("img").animate({height:  newHeight + 'px'});
      $("div.s2").animate({width: newWidth + '%'});
    }

  }

  function addCards(cols){
    var boardDiv = document.getElementById("board");
    for (i = 0; i < cols; i++) {
      boardDiv.innerHTML += "<div id='row"+(i+1)+"' class='row'></div>"
      var currentDiv = document.getElementById("row".concat(i+1));
      for (var j = 0; j < 6; j++) {
        currentDiv.innerHTML += "<div class='col s2'><img src='img/cards/back.png' height='100px'></div>";
      }
    }
  }

  function addCardsLeftover(cols, left){
    var boardDiv = document.getElementById("board");
    for (i = 0; i < cols; i++) {
      boardDiv.innerHTML += "<div id='row"+(i+1)+"' class='row'></div>"
      var currentDiv = document.getElementById("row".concat(i+1));
      if((i+1)!=cols){
        for (var j = 0; j < 6; j++) {
          currentDiv.innerHTML += "<div class='col s2'><img src='img/cards/back.png' height='100px'></div>";
        }
      } else {
        for (var j = 0; j < left; j++) {
          currentDiv.innerHTML += "<div class='col s2'><img src='img/cards/back.png' height='100px'></div>";
        }
      }
    }
  }

});
