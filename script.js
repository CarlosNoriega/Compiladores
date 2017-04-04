$("a.btn").click(function(){
  var nCards = parseInt($("#code").val());
  var nRows = numberOfRows(nCards);
  addRowOfCards(nRows, nCards);
  if(nRows == 1){
    var newWidth = (100/nCards) - 1;
    $("div.col.s2").animate({
      height: "150px",
      width: newWidth.toString().concat("%")
    });
  } else if (nRows == 2){
    $("div.col.s2").animate({
      height: "120px",
      width: "14%"
    });
  }
});

function addRowOfCards(nRows, nCards){
  if(nCards%6 == 0){
    for (var i = 0; i < nRows; i++) {
      if(i != 0){
        document.getElementById("grid-table").innerHTML+= "<div id='r"+i+"' class='row'></div>";
      }
      addCards("r".concat(i),i*6, i*6 + 6);
    }
  }else{
    for (var i = 0; i < nRows; i++) {
      if(i != 0){
        document.getElementById("grid-table").innerHTML+= "<div id='r"+i+"' class='row'></div>";
      }
      if(i+1 == nRows){
        var cardsLeft = nCards%6;
        addCards("r".concat(i),i*6, i*6 + cardsLeft);
      }else{
        addCards("r".concat(i),i*6, i*6 + 6);
      }
    }
  }
}

function addCards(row, from, to){
  if(row == "r0"){
    from = 1;
  }
  for (i = from; i < to; i++) {
    document.getElementById(row).innerHTML+= "<div class='col s2'><img src='img/cards/back.png'></div>";
  }
}

function numberOfRows(nCards){
  return Math.ceil(nCards/6);
}
