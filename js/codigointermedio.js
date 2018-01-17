$(document).ready(function() {

  // document.getElementById("theCard").onclick = function() {getCard()};

  function getCard(realCard, from, to, zIndex){
    var card = realCard;
    var x = to.offset();
    var fromCard = from;
    fromCard.css("z-index",zIndex);
    fromCard.animate({
      left: x.left,
      top: x.top,
      height: "200px"
    }, 500, function(){
      console.log(realCard);
      if(!realCard[3]){
        showCard(card, fromCard);
      }
      
    });
  }

  function showCard(card, fromCard){
    fromCard.fadeTo(1500,.5, function() {
        fromCard.attr("src","img/cards/"+card[2]+card[0]+".png");
    }).fadeTo(500,1);
  }

  function placeCard(from, to){
    var x = to.offset();
    var fromCard = from;
    fromCard.animate({
      left: x.left,
      top: x.top,
      height: "100px"
    }, 500);
  }

  document.getElementById("animate").onclick = function() {leer()};


  //______________________-----------------------------------------------------------------------------------






  //<program> ::= "class" "program" "{" <functions> <main function> "}"

  //Contador de posición para array.
  var i=0;
  //Contador de posición para func.
  var j=0;
  //Arreglo que contiene los tokens.
  var array=[];
  //Arreglo que contiene las funciones definidas por el usuario.
  var func=[];
  //Arreglo que contiene el codigo intermedio
  var codIntermedio=[];
  var ii=0;
  //Arreglo que contiene la tabla de símbolos
  var tsimbolos = new Map();

  var fif=100;
  //IF -- 100
  //ELSE -- 105
  var fwhile=110;
  //WHILE -- 110
  var fiterate=120;
  //ITERATE -- 120
  var freturn=130;
  //RETURN -- 130
  var inicioprog=140;
  //INICIOPROG -- 140
  var fin=150;
  //FIN -- 150
  var jmp=160;
  //JMP --160
  var call=170;
  //CALL -- 170
  var fconditional=210;
  //CONDITIONAL -- 210
  var fbody=220;
  //BODY -- 220
  var fgetcard=310;
  //GETCARD -- 310
  var fputcard=320;
  //PUTCARD -- 320
  var fflip=330;
  //FLIP -- 330
  var fret=500;


  var stack = [];
  var stack2 = [];
  var errores=[];

function leer(){
    var tex=document.getElementById("code").value;
    //console.log(tex.length);
    var tex=tex.replace( / /g, "" );
    var tex=tex.replace( /"/g, "" );
    console.log(tex);
    codIntermedio = tex.split(",");
    console.log(codIntermedio);
    for (var i = 0; i < codIntermedio.length; i++) {
        console.log(parseInt(parseInt(codIntermedio[i])));
        codIntermedio[i]=parseInt(codIntermedio[i]);
    }
    generatecards();
    whiledelay();
}
  
var stack2 = [];

var ret=[];
var rec=codIntermedio[1];
var card="false";
var times = 0;
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function whiledelay(){
      var mainDeck = document.getElementsByClassName("mainDeck");
      var staticDeck = $("#deckOne");
      staticDeck.css("opacity", "0");
      for (var i = 0; i < decks[0].length; i++) {
        mainDeck[0].innerHTML += "<img id='card"+i+"' class='col1 card' src='img/cards/back.png'>";
      }

      //console.log(codIntermedio);
      rec=codIntermedio[1];
      card="false";
      ret=[];
      times = 0;
      myLoop();
      // console.log(decks);
}

function myLoop () {           //  create a loop function
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
      //alert('hello');          //  your code here
                         //  increment the counter
      if (codIntermedio[rec]!=1000) {

        sw();         //  if the counter < 10, call the loop function
        myLoop();
                    //  ..  again which will trigger another
      }                        //  ..  setTimeout()
   }, 500)
}


function sw(){
  switch(codIntermedio[rec]){
              case fif:
                  //console.log("if");
                  rec++;
                  break;
              case fwhile:
                  //console.log("while " + rec);
                  rec++;
                  break;
              case fiterate:
                  //console.log("iterate " + rec);
                  //console.log(codIntermedio[rec+1]);
                  if(codIntermedio[rec+1]>0){
                      codIntermedio[rec+1]--;
                      //console.log(codIntermedio[rec+1]);
                      rec=rec+3;
                  }else{
                      //console.log("salta " + codIntermedio[rec+3]);
                      rec=codIntermedio[rec+3];
                  }
                  //rec++;
                  break;
              case freturn:
                  //console.log("return " + rec);
                  //AQUI NO
                  rec++;
                  break;
              case jmp:
                  //console.log("jump " + rec);
                  rec++;
                  rec=codIntermedio[rec];
                  break;
              case call:
                  //console.log("call " + rec);
                  rec++;
                  ret.push(rec+1);
                  rec=codIntermedio[rec];
                  //rec++;
                  break;
              case fgetcard:
                  //console.log("getCard " + rec);
                  rec++;
                  var de=parseInt(codIntermedio[rec]);
                  //console.log(de);

                  card=decks[de].pop();
                  // getCard from mainDeck
                  var cardNumber = 51 - decks[de].length;
                  var cardToSearch = "card"+cardNumber;
                  var from = $("#card".concat(cardNumber));
                  var to = $("#theCard");
                  var zIndex = cardNumber;
                  getCard(card, from, to, zIndex);

                  rec++;
                  break;
              case fputcard:
                  //console.log("putCard " + rec);
                  rec++;
                  var de=parseInt(codIntermedio[rec]);
                  //console.log("deck put "+de);
                  var c=[];
                  c=card;

                  var cardNumber = 51 - decks[0].length;
                  var cardToSearch = "card"+cardNumber;
                  var from = $("#card".concat(cardNumber));

                  var row = Math.ceil(de/6);
                  var col = 0;
                  if(row == 1){
                    col = (de%6)+1;
                  } else {
                    col = de%6;
                  }

                  var to = $(".row"+row+" .col"+col);
                  console.log("Row:"+row+" Col: "+col);

                  placeCard(from, to);

                  // putCard into according position
                  (decks[de]).push(c);

                  card="false";

                  rec++;
                  break;
              case fflip:
                  //console.log("flip " + rec);
                  if (card!="false") {
                      card[3]=!card[3];
                  }else{
                      alert("No tienes cartas");
                  }

                  rec++;
                  break;
              case 500:
                  ////console.log("return " + rec);
                  rec=ret.pop();
                  //rec++;
                  break;
              case 201:
                  //console.log("isRed " + rec);
                  //console.log(card);
                  if(card[1]=="red"){
                      //console.log("es roja");
                      rec=rec+2;
                  }else{
                      //console.log("no es roja");
                      //console.log(rec);
                      //console.log("salta " + codIntermedio[rec+2]);
                      rec=codIntermedio[rec+2];
                  }
                  //rec++;
                  break;
              case 202:
                  //console.log("isBlack " + rec);
                  //console.log(card);
                  if(card[1]=="black"){
                      //console.log("es negra");
                      rec=rec+2;
                  }else{
                      //console.log("no es negra");
                      //console.log(rec);
                      //console.log("salta " + codIntermedio[rec+2]);
                      rec=codIntermedio[rec+2];
                  }
                  //rec++;
                  break;
              case 203:
                  //console.log("isHearts " + rec);
                  //console.log(card);
                  if(card[2]=="hearts"){
                      //console.log("es heart");
                      rec=rec+2;
                  }else{
                      //console.log("no es heart");
                      //console.log(rec);
                      //console.log("salta " + codIntermedio[rec+2]);
                      rec=codIntermedio[rec+2];
                  }
                  //rec++;
                  break;
              case 204:
                  //console.log("isClubs " + rec);
                  //console.log(card);
                  if(card[2]=="clubs"){
                      //console.log("es clubs");
                      rec=rec+2;
                  }else{
                      //console.log("no es clubs");
                      //console.log(rec);
                      //console.log("salta " + codIntermedio[rec+2]);
                      rec=codIntermedio[rec+2];
                  }
                  //rec++;
                  break;
              case 205:
                  //console.log("isDiamond " + rec);
                  //console.log(card);
                  if(card[2]=="diamonds"){
                      //console.log("es diamond");
                      rec=rec+2;
                  }else{
                      //console.log("no es diamond");
                      //console.log(rec);
                      //console.log("salta " + codIntermedio[rec+2]);
                      rec=codIntermedio[rec+2];
                  }
                  //rec++;
                  break;
              case 206:
                  //console.log("isSpades " + rec);
                  //console.log(card);
                  if(card[2]=="spades"){
                      //console.log("es spades");
                      rec=rec+2;
                  }else{
                      //console.log("no es spades");
                      //console.log(rec);
                      //console.log("salta " + codIntermedio[rec+2]);
                      rec=codIntermedio[rec+2];
                  }
                  //rec++;
                  break;
              case 207:
                  //console.log("isNotRed " + rec);
                  //console.log(card);
                  if(card[1]!="red"){
                      //console.log("es Noroja");
                      rec=rec+2;
                  }else{
                      //console.log("no es NOroja");
                      //console.log(rec);
                      //console.log("salta " + codIntermedio[rec+2]);
                      rec=codIntermedio[rec+2];
                  }
                  //rec++;
                  break;
              case 208:
                  //console.log("isNotBlack " + rec);
                  //console.log(card);
                  if(card[1]!="black"){
                      //console.log("es Nobalck");
                      rec=rec+2;
                  }else{
                      //console.log("no es Nobalck");
                      //console.log(rec);
                      //console.log("salta " + codIntermedio[rec+2]);
                      rec=codIntermedio[rec+2];
                  }
                  //
                  //rec++;
                  break;
              case 209:
                  //console.log("isNotHeart " + rec);
                  //console.log(card);
                  if(card[2]!="hearts"){
                      //console.log("es NotHeart");
                      rec=rec+2;
                  }else{
                      //console.log("no es NotHeart");
                      //console.log(rec);
                      //console.log("salta " + codIntermedio[rec+2]);
                      rec=codIntermedio[rec+2];
                  }
                  //rec++;
                  break;
              case 210:
                  //console.log("isNotClubs " + rec);
                  //console.log(card);
                  if(card[2]!="clubs"){
                      //console.log("es isNotClubs");
                      rec=rec+2;
                  }else{
                      //console.log("no es isNotClubs");
                      //console.log(rec);
                      //console.log("salta " + codIntermedio[rec+2]);
                      rec=codIntermedio[rec+2];
                  }
                  //rec++;
                  break;
              case 211:
                  //console.log("isNotDiamond " + rec);
                  //console.log(card);
                  if(card[2]!="diamonds"){
                      //console.log("es isNotDiamond");
                      rec=rec+2;
                  }else{
                      //console.log("no es isNotDiamond");
                      //console.log(rec);
                      //console.log("salta " + codIntermedio[rec+2]);
                      rec=codIntermedio[rec+2];
                  }
                  //rec++;
                  break;
              case 212:
                  //console.log("isNotSpades " + rec);
                  //console.log(card);
                  if(card[2]!="spades"){
                      //console.log("es isNotSpades");
                      rec=rec+2;
                  }else{
                      //console.log("no es isNotSpades");
                      //console.log(rec);
                      //console.log("salta " + codIntermedio[rec+2]);
                      rec=codIntermedio[rec+2];
                  }
                  //rec++;
                  break;
              case 350:
                  //console.log("isEmpty " + rec);
                  rec++;
                  var de=parseInt(codIntermedio[rec]);
                  //console.log(card);
                  ////console.log("tamaño "+decks[de].length);
                  if((decks[de].length)==0){
                      //console.log("esta vacia");
                      rec=rec+2;
                  }else{
                      //console.log("no esta vacia");
                      //console.log(rec);
                      //console.log("salta " + codIntermedio[rec+2]);
                      rec=codIntermedio[rec+2];
                  }
                  //rec++;
                  break;
              case 351:
                  //console.log("isNotEmpty " + rec);
                  rec++;
                  var de=parseInt(codIntermedio[rec]);
                  //console.log(card);
                  ////console.log("tamaño "+decks[de].length);
                  if((decks[de].length)>0){
                      //console.log("no esta vacia ");
                      rec=rec+2;
                  }else{
                      //console.log("esta vacia");
                      //console.log(rec);
                      //console.log("salta " + codIntermedio[rec+2]);
                      rec=codIntermedio[rec+2];
                  }
                  //rec++;
                  break;
              case 400:
                  //console.log("card_composed_condition " + rec);
                  rec++;
                  break;
              case 401:
                  //console.log("< " + rec);
                  rec++;
                  var de=parseInt(codIntermedio[rec]);
                  //console.log(card);
                  ////console.log("tamaño "+decks[de].length);
                  if(card[0]<de){
                      //console.log(card[0]+" es menor que "+de);
                      rec=rec+2;
                  }else{
                      //console.log(card[0]+" es mayor que "+de);
                      //console.log("salta " + codIntermedio[rec+2]);
                      rec=codIntermedio[rec+2];
                  }
                  //rec++;
                  break;
              case 402:
                  //console.log("> " + rec);
                  rec++;
                  var de=parseInt(codIntermedio[rec]);
                  //console.log(card);
                  ////console.log("tamaño "+decks[de].length);
                  if(card[0]>de){
                      //console.log(card[0]+" es mayor que "+de);
                      rec=rec+2;
                  }else{
                      //console.log(card[0]+" es menor que "+de);
                      //console.log("salta " + codIntermedio[rec+2]);
                      rec=codIntermedio[rec+2];
                  }
                  //rec++;
                  break;
              case 403:
                  //console.log("<= " + rec);
                  rec++;
                  var de=parseInt(codIntermedio[rec]);
                  //console.log(card);
                  ////console.log("tamaño "+decks[de].length);
                  if(card[0]<=de){
                      rec=rec+2;
                  }else{
                      //console.log("salta " + codIntermedio[rec+2]);
                      rec=codIntermedio[rec+2];
                  }
                  //rec++;
                  break;
              case 404:
                  //console.log(">= " + rec);
                  rec++;
                  var de=parseInt(codIntermedio[rec]);
                  //console.log(card);
                  ////console.log("tamaño "+decks[de].length);
                  if(card[0]>=de){
                      rec=rec+2;
                  }else{
                      //console.log("salta " + codIntermedio[rec+2]);
                      rec=codIntermedio[rec+2];
                  }
                  //rec++;
                  break;
              case 405:
                  //console.log("== " + rec);
                  rec++;
                  var de=parseInt(codIntermedio[rec]);
                  //console.log(card);
                  ////console.log("tamaño "+decks[de].length);
                  if(card[0]==de){
                      rec=rec+2;
                  }else{
                      //console.log("salta " + codIntermedio[rec+2]);
                      rec=codIntermedio[rec+2];
                  }
                  //rec++;
                  break;
              case 406:
                  //console.log("!= " + rec);
                  rec++;
                  var de=parseInt(codIntermedio[rec]);
                  //console.log(card);
                  ////console.log("tamaño "+decks[de].length);
                  if(card[0]!=de){
                      rec=rec+2;
                  }else{
                      //console.log("salta " + codIntermedio[rec+2]);
                      rec=codIntermedio[rec+2];
                  }
                  //rec++;
                  break;
              default:
                  rec++;
          }
}
//-------------------------------------------------------------------------------------



  var decks=[];

  function generatecards(){

      for (var s = 51; s >= 0; s--) {
          var deck=[];
          decks[s]=deck;
      }

      var deck=[];
      var color="red";// balck, red
      var figura="hearts"; //heart, clubs, diamound, spades
      var numb=1;
      var s = 51;
      for (var s = 0; s < 52; s++) {
          var card=[];
          card[0]=numb;
          card[1]=color;
          card[2]=figura;
          card[3]=true;
          deck.push(card);
          if(numb==13){
              numb=0;
          }
          if(s==12){
              figura="diamonds";
          }
          if(s==25){
              color="black";
              figura="clubs";
          }
          if(s==38){
              figura="spades";
          }

          numb++;
      }
      deck=shuffle(deck);
      decks[0]=deck;
      console.log(codIntermedio);

  }

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

});
