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
    }, 300, function(){
      if (!realCard[3]) {
        showCard(card, fromCard);
      }
      
    });
  }

  function showCard(card, fromCard){
    fromCard.fadeTo(500,.5, function() {
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
    }, 300);
  }

  document.getElementById("animate").onclick = function() {leer()};

  function isWord(res){
      ////console.log(res);
      for(var i=0; i<res.length; i++){
          if(!((res[i]>='A' && res[i]<='Z')||(res[i]>='a' && res[i]<='z'))){
              return false;
          }
      }
      return true;
  }

  function isNumber(res){
      for(var i=0; i<res.length; i++){
              if(!(res[i]>='0' && res[i]<='9')){
              return false;
          }
      }
      return true;
  }

  function leer(){
      errores=[];
      var correcto=true;
      var tex=document.getElementById("code").value;
      ////console.log(tex.length);
      var tex=tex.replace(/[(]/g, " ( " );
      var tex=tex.replace(/[)]/g, " ) " );
      var tex=tex.replace(/[{]/g, " { " );
      var tex=tex.replace(/[}]/g, " } " );
      //console.log(tex);
      var arr = [];
      var tex=tex.replace( / /g, "," );
      var te=tex.replace( /\n/g, "," );
      var tex=te.replace( /\t/g, "," );
      var ress = tex.split(",");
      var res=[];
      var cont=0;

      for (var i = 0; i < ress.length; i++) {
          if (ress[i]!="") {
              res[cont]=ress[i];
              cont++;
          }
      }
      res[cont]='end';
      ////console.log(res);
      var c=0;
      for(var i=0; i<res.length; i++){
          if ((res[i][0]>='A' && res[i][0]<='Z')||(res[i][0]>='a' && res[i][0]<='z')) {
              if (!isWord(res[i])) {
                  arr[c]=res[i];
                  c++;
              }
          }else if (res[i][0]>='0' && res[i][0]<='9') {
              if (!isNumber(res[i])) {
                  arr[c]=res[i];
                  c++;
              }

          }else if (res[i][0]=='{') {
              if(res[i].length>1){
                  var p=res[i];
                  delete p[0];
                  if (!isWord(p)) {
                      arr[c]=res[i];
                      c++;
                  }
              }

          }else if (res[i][0]=='}'){
              if (res[i].length>1) {
                  arr[c]=res[i];
                  c++;
              }

          }else if (res[i][0]=='(') {
              if(res[i].length>1){
                  var p=res[i];
                  p=p.substring(1,res[i].length);

                  if (!isWord(p) && !isNumber(p)) {
                      if (!(p[0]=='(') && !(p[0]==')')) {
                          if (p[p.length-1]==')') {
                              p=p.substring(0,res[i].length-2);
                              //console.log('palabra '+p);
                              if (!isWord(p) && !isNumber(p)) {
                                  arr[c]=res[i];
                                  c++;
                              }
                          }
                          else{
                              arr[c]=res[i];
                              c++;
                          }

                      }
                  }
              }

          }else if (res[i][0]==')') {
              if (res[i].length>1) {
                  if (res[i][0]=='{') {
                      arr[c]=res[i];
                      c++;
                  }
              }

          }else if (res[i][0]=='|') {
              if (res[i].length>1) {
                  arr[c]=res[i];
                  c++;
              }

          }else{
              //arr[c]=res[i];
              //c++;
          }
      }
      var t="";
      if(arr.length==0){
          t='Sin errores al compilar :)';
          //console.log("correcto");
          //console.log(res)
          analizadorSintactico(res);
          generatecards();
          //whilefunction();
          console.log(codIntermedio);
          if(errores.length==0){
            whiledelay();
          }else{
            t="";
            for(var is=0; is<errores.length; is++){
              t=t+''+errores[is]+'\n'
              console.log(errores[is])
            }

          }
          

          //generatecards();
          ////console.log(codIntermedio);

      }
      for (var i = 0; i <arr.length; i++) {
          t=t+'<div>'+arr[i]+'</div>'
      }
      document.getElementById("feedback").innerHTML=t;
  }


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

  function analizadorSintactico(arra){
      i=0;
      j=0;
      ii=2;
      array=arra;
      func=[];
      codIntermedio=[];
      codIntermedio[0]=jmp;
      ////console.log(array);
      program();
  }

  function program(){
    if ( array[i]=="class" ) {
        i++;

      if ( array[i]=="program" ) {
        i++;
        if ( array[i]=="{" ) {
          i++;
          if ( array[i]=="void" ) {
              functions();
          }
          main_function();
          codIntermedio[ii]=1000;

          if ( !(array[i]=="}") ) {
            alert('No errors were found!');

          }
        }
        else {
          alert('Error { whas expected');
          errores.push("Error { whas expected");
        }
        i++;
      }
      else {
        alert('Error in program');
        errores.push("Error in program");
      }
    }
    else {
       alert('Error in class');
       errores.push("Error in class");
    }
  }


  //<functions> ::= <function> <functions alpha> | LAMBDA
  function functions() {
      while(array[i]=="void"){
          function2();
      }

  }

  //<functions alpha>  ::= <function> <functions alpha> | LAMBDA
  function functions_alpha() {
    if (array[i]=="void") {
          function2();
      }
      //
  }

  //<main function> ::= "program" "(" ")" "{" <body> "}"
  function main_function(){
      //Exigir
      if(array[i] == "program"){
          codIntermedio[1]=ii;
          i++;
          //Exigir (
          if(array[i] == "("){
              i++;
              //Exigir )
              if(array[i] == ")"){
                  i++;
                  //Exigir {
                      if(array[i] == "{"){
                          i++;
                          //Body
                          body();
                          //Exigir "}"
                          if(array[i] == "}"){
                              i++;
                          } else {
                              alert("Error - '}' was expected");
                              errores.push("Error } whas expected");
                          }
                      } else {
                          alert("Error - '{' was expected");
                          errores.push("Error { whas expected");

                  }
              } else {
                  alert("Error - ')' was expected");
                  errores.push("Error ) whas expected");
              }
          } else {
              alert("Error - '(' was expected");
              errores.push("Error () whas expected");
          }
      } else{
          alert("Error - 'program' was expected");
          errores.push("Error 'program' whas expected");
      }
  }

  //<function> := "void" <name function> "("   ")" "{" <body> "}"
  function function2() {
    if ( array[i] == "void" ) {
      i++;
      name_function();
      if ( array[i] == "(" ) {
          i++;
        if ( array[i] == ")" ) {
            i++;
          if ( array[i] == "{" ) {
              i++;
              body();
              codIntermedio[ii]=fret; ii++;
              if ( !(array[i] == "}") ) {
                  alert('Error- "}" was expected');
                  errores.push("Error } whas expected");
              }
              i++;
          } else {
                alert('Error - "{" was expected');
                errores.push("Error { whas expected");
              }
        } else {
          alert("Error - ')' was expected");
          errores.push("Error ) whas expected");
        }
      } else {
        alert("Error - '(' was expected");
        errores.push("Error ( whas expected");
      }
    } else {
      alert("Error - 'void' was expected");
      errores.push("Error 'void' whas expected");
    }
  }

  function name_function(){
      if(func.indexOf(array[i]) == -1){
          func[j]=array[i];
          tsimbolos.set(array[i], ii);
          j++;
          i++;
          ////console.log(func);
      }else{
          alert("Error - Function already exist.");
          errores.push("Error Function already exist");
      }
  }

  //<body> ::= <expression> <body alpha>
  function body(){
      while(array[i]!="}" && array[i]!='end'){
          expression();
      }
  }

  // <body alpha> ::= <expression> <body alpha> | LAMBDA
  function body_alpha(){
      expression();
      body_alpha();
  }

  // <expression> ::= <call function> |
  //  <if expression> |
  //  <while expression> |
  //  <iterate expression>
  //
  function expression(){
      //verificar if
      if(array[i]=="if"){
          if_expression();
      }
      else if(array[i]=="while"){
          while_expression();
      }
      else if(array[i]=="iterate"){
          iterate_expression();
      }
      else{
          call_function();
      }

  }

  //<call function> ::= <name of function>
  function call_function(){
      name_of_function();
  }

  //<name of function> ::= <official function> | <customer function>
  function name_of_function(){
      if (array[i]=="flip" || array[i]=="getCard" || array[i]=="putCard") {
          official_function();
      }
      else{
          customer_function();
      }
      //
  }

  //    <official function> ::=
  //    "flip" |
  //    "getCard" "(" <number of deck> ")" |
  //    "putCard" "(" <number of deck> ")"
  function official_function(){
      //verificar flip
      if(array[i]=="flip"){
          codIntermedio[ii]=fflip;
          ii++;
          i++;
      }
      //verificar getCard
      if(array[i]=="getCard"){
          i++;
          codIntermedio[ii]=fgetcard;
          ii++;
          //exigir "("
          if(array[i]=="("){
              i++;

              //exigir "number of deck"
              if( number_of_deck() ){
                  //i++;
                  //exigir ")"
                  if(array[i]==")"){
                      i++;
                  }else{
                      alert("')' was expected.");i++;
                      errores.push("Error ) whas expected");
                  }
              }else{
                  alert("a number was expected");i++;
                  errores.push("Error a numbre was expected");
              }
          } else{
              alert("'(' was expected.");i++;
              errores.push("Error ( whas expected");

          }
      }
      //verificar putCard
      if(array[i]=="putCard"){
          i++;
          codIntermedio[ii]=fputcard;
          ii++;
          //exigir "("
          if(array[i]=="("){
              i++;
              //exigir "number of deck"
              if( number_of_deck() ){
                  //i++;
                  //exigir ")"
                  if(array[i]==")"){
                      i++;
                  }else{
                      //console.log(i); //console.log(array[i]);
                      alert("')' was expected. ");
                      errores.push("Error ) whas expected");
                  }
              }
          } else{
              alert("'(' was expected.");
              errores.push("Error ( whas expected");
          }
      }
  }

  //<customer function> ::= is a string with only letters that was defined in a <function> previously.
  function customer_function(){
      if(func.indexOf(array[i]) != -1){
          codIntermedio[ii]=call;
          ii++;
          codIntermedio[ii]=tsimbolos.get(array[i]);ii++;
          i++;
      }else{
          alert("The functions is not declared");
          errores.push("Error the function is not declared  "+array[i]);
          i++;
      }
  }

  //<number of deck> ::=  is a number between 0 to 52 ( inclusive )
  function number_of_deck(){

      if(array[i]<53 && array[i]>=0){
          codIntermedio[ii]=parseInt(array[i]);
          ii++;
          i++;
          ////console.log(array[i]);
          return true;
      }
      else{
          alert("Error - Deck number has to be a value between 0 and 52.");
          errores.push("Error Deck number has to be a value between 0 and 52.");
          i++;
          return false;
      }

  }
  var stack2 = [];
  //<if expression> ::= "if" ( <conditional> ) "{" <body> "}"  <elseif>
  function if_expression(){
      if(array[i]=="if"){
          //console.log("if")
          codIntermedio[ii]=fif;
          ii++;
          i++;
          if(array[i]=="("){
              i++;
              conditional();

              if(array[i]==")"){
                  i++;
                  if(array[i]=="{"){
                      i++;
                      codIntermedio[ii] = jmp;
                      ii++;

                      stack.push(ii);
                      ii++;
                      body();

                      if(array[i]=="}"){
                          i++;
                          if (array[i]=="elseif") {
                              codIntermedio[stack.pop()] = ii+2;
                              codIntermedio[ii]=jmp; ii++;
                              stack2.push(ii); ii++;
                              elseif_expression();
                          }
                          else if (array[i]=="else") {
                              codIntermedio[stack.pop()] = ii+2;
                              elseif();
                          }
                          else{
                              codIntermedio[stack.pop()] = ii;
                          }

                      }
                      else{
                          i++;
                          alert("Error - '}' was expected");
                          errores.push("Error } whas expected");
                      }
                  }
                  else{
                      i++;
                      alert("Error - '{' was expected");
                      errores.push("Error { whas expected");
                  }
              }else{
                  i++;
                  alert("Error - ')' was expected");
                  errores.push("Error ) whas expected");
              }
          }else{
              i++;
              alert("Error - '(' was expected");
              errores.push("Error ( whas expected");
          }
      }
      else{
          i++;
          alert("Error - 'if' was expected");
          errores.push("Error if has expected");
      }
  }



  function elseif_expression(){
      if(array[i]=="elseif"){
          //console.log("elseif")

          codIntermedio[ii]=fif;
          ii++;
          i++;
          if(array[i]=="("){
              i++;
              conditional();

              if(array[i]==")"){
                  i++;
                  if(array[i]=="{"){
                      i++;
                      codIntermedio[ii] = jmp;
                      ii++;

                      stack.push(ii);
                      ii++;
                      body();

                      if(array[i]=="}"){
                          i++;

                          if (array[i]=="elseif") {
                              codIntermedio[stack.pop()] = ii+2;
                              codIntermedio[ii]=jmp; ii++;
                              stack2.push(ii); ii++;
                              elseif_expression();
                          }
                          else if (array[i]=="else") {
                              codIntermedio[stack.pop()] = ii+2;
                              elseif();
                          }
                          else{
                              //codIntermedio[stack.pop()] = ii;
                              codIntermedio[stack.pop()] = ii;
                              while(stack2.length!=0){
                                  codIntermedio[stack2.pop()] = ii;
                              }
                          }

                      }
                      else{
                          i++;
                          alert("Error - '}' was expected");
                          errores.push("Error } whas expected");
                      }
                  }
                  else{
                      i++;
                      alert("Error - '{' was expected");
                      errores.push("Error { whas expected");
                  }
              }else{
                  i++;
                  alert("Error - ')' was expected");
                  errores.push("Error ) whas expected");
              }
          }else{
              i++;
              alert("Error - '(' was expected");
              errores.push("Error ( whas expected");
          }
      }
      else{
          i++;
          alert("Error - 'elseif' was expected");
          errores.push("Error elseif expected");
      }
  }

  //<elseif> ::= "else" "{" <body> "}" | LAMBDA
  function elseif(){
      //exigir 'else'
      if(array[i]=="else"){
          i++;
          codIntermedio[ii] = jmp; ii++;
          stack.push(ii); ii++;
          //exigir '{'
          if(array[i]=="{"){
              i++;
              body();
              //exigir '}'
              if(array[i]=="}"){
                  i++;
                  codIntermedio[stack.pop()] = ii;
                  while(stack2.length!=0){
                      codIntermedio[stack2.pop()] = ii;
                  }
              }else{
                  alert("Error - '}' was expected");i++;
                  errores.push("Error } whas expected");
              }
          }else{
              alert("'{' was expected.");i++;
              errores.push("Error { whas expected");
          }
      }else{
          alert("'else' was expected");i++;
          errores.push("Error else whas expected");
      }
  }

  //<while expression> ::= "while" "(" <conditional> ")" "{" <body> "}"
  function while_expression(){
      if(array[i]=="while"){
          stack.push(ii);

          codIntermedio[ii]=fwhile; ii++; ////console.log(codIntermedio[ii]);
          i++;
          if(array[i]=="("){
              i++;
              conditional();
              if(array[i]==")"){
                  i++;
                  if(array[i]=="{"){
                      i++;
                      codIntermedio[ii] = jmp;
                      ii++;
                      stack.push(ii);
                      ii++;
                      body();
                      codIntermedio[stack.pop()] = ii+2;
                      codIntermedio[ii] = jmp;
                      ii++;
                      codIntermedio[ii] = stack.pop(); ii++;
                      if(array[i]=="}"){
                          i++;

                      }else{
                          alert("Error - '}' was expected");i++;
                          errores.push("Error } whas expected");
                      }
                  }else{
                      alert("Error - '{' was expected");i++;
                      errores.push("Error { whas expected");
                  }
              }
              else{
                  alert("Error - ')' was expected");i++;
                  errores.push("Error ) whas expected");
              }
          }
          else{
              alert("Error - '(' was expected");i++;
              errores.push("Error ( whas expected");

          }
      }else{
          alert("Error - 'while' was expected");i++;
          errores.push("Error while whas expected");
      }
  }

  //<iterate expression> ::= "iterate" "(" <number> ")" "{" <body> "}"
  function iterate_expression(){
    if(array[i]=="iterate"){
        stack.push(ii);
        codIntermedio[ii]=fiterate; ii++;
        i++;
        //exigir '('
        if(array[i]=="("){
            i++;
            //codIntermedio[ii]=array[i]; ii++;
            number();
            //exigir ')'
            if(array[i]==")"){
                i++;
                //exigir '{'
                if(array[i]=="{"){
                    i++;
                    codIntermedio[ii] = jmp;
                    ii++;
                    stack.push(ii);
                    ii++;
                    body();
                    codIntermedio[stack.pop()] = ii+2;
                    codIntermedio[ii] = jmp;
                    ii++;
                    codIntermedio[ii] = stack.pop(); ii++;

                    //exigir '}'
                    if(array[i]=="}"){
                       i++;
                    }else{
                        alert("'}' was expected. ");i++;
                        errores.push("Error } whas expected");
                    }
                }else{
                    alert("'{' was expected."); i++;
                    errores.push("Error { whas expected");
                }
            }else{
                alert("')' was expected.");i++;
                errores.push("Error ) whas expected");
            }
        }else{
            alert("'(' was expected.");i++;
            errores.push("Error ( whas expected");
        }
    }else{
        alert("'iterate' was expected.");i++;
        errores.push("Error iterate whas expected");
    }
  }

  //<conditional> ::= <card simple condition> | <card composed condition> | <deck simple condition>
  function conditional(){
      if (card_simple_condition()) {

      }else if(array[i]=="VALUE"){
          card_composed_condition();
      }else{
          deck_simple_condition();
      }

  }

  //<card simple condition> ::= "isRed" | "isBlack" | "isHeart" | "isClubs" | "isDiamond" | "isSpades"| "isNotRed" | "isNotBlack" | "isNotHeart" | "isNotClubs" | "isNotDiamond" | "isNotSpades"
  function card_simple_condition(){
      //Verificar
      if (array[i]=="isRed") {
          i++;
          codIntermedio[ii]=201; ii++;
          return true;
      }
      if (array[i]=="isBlack") {
          i++;
          codIntermedio[ii]=202; ii++;
          return true;
      }
      if (array[i]=="isHeart") {
          i++;
          codIntermedio[ii]=203; ii++;
          return true;
      }
      if (array[i]=="isClubs") {
          i++;
          codIntermedio[ii]=204; ii++;
          return true;
      }
      if (array[i]=="isDiamond") {
          i++;
          codIntermedio[ii]=205; ii++;
          return true;
      }
      if (array[i]=="isSpades") {
          i++;
          codIntermedio[ii]=206; ii++;
          return true;
      }
      if (array[i]=="isNotRed") {
          i++;
          codIntermedio[ii]=207; ii++;
          return true;
      }
      if (array[i]=="isNotBlack") {
          i++;
          codIntermedio[ii]=208; ii++;
          return true;
      }
      if (array[i]=="isNotHeart") {
          i++;
          codIntermedio[ii]=209; ii++;
          return true;
      }
      if (array[i]=="isNotClubs") {
          i++;
          codIntermedio[ii]=210; ii++;
          return true;
      }
      if (array[i]=="isNotDiamond") {
          i++;
          codIntermedio[ii]=211; ii++;
          return true;
      }
      if (array[i]=="isNotSpades") {
          i++;
          codIntermedio[ii]=212; ii++;
          return true;
      }

      //alert('Error -'+ array[i] + 'is not a valid condition');
      //errores.push('Error -'+ array[i] + ' is not a valid condition');
      return false;
  }

  //<card composed condition> ::= "VALUE" <operator> <number>
  function card_composed_condition(){
      if(array[i]=="VALUE"){
          i++;
          codIntermedio[ii]=400; ii++;
          if (operator()) {

              if (number()) {

              }else{
                  alert('number was expected');i++;
                  errores.push("Error a number whas expected");
              }
          }else{
              alert('operator was expected');i++;
              errores.push("Error a operator whas expected");
          }
      }else{
          alert("Error - 'VALUE' was expected");i++;
          errores.push("Error VALUE whas expected");
      }
  }

  //<number> ::= is a natural number between 1 - 13
  function number(){
      //console.log("number "+array[i]);
      if(array[i] > 0 && array[i] < 14){
          codIntermedio[ii]=parseInt(array[i]); ii++;
          i++;
          return true;
      } else {
          alert("Error - Number has to be a value between 1 and 13.");i++;
          errores.push("Error the number has to be a value between 1 and 13");
          return false;
      }
  }

  //<operator> ::= "<" | ">" | "<=" | ">=" | "==" | "!="
  function operator(){
      if (array[i]=="<") {
          i++;
          codIntermedio[ii]=401; ii++;
          return true;
      }
      if (array[i]==">") {
          i++;
          codIntermedio[ii]=402; ii++;
          return true;
      }
      if (array[i]=="<=") {
          i++;
          codIntermedio[ii]=403; ii++;
          return true;
      }
      if (array[i]==">=") {
          i++;
          codIntermedio[ii]=404; ii++;
          return true;
      }
      if (array[i]=="==") {
          i++;
          codIntermedio[ii]=405; ii++;
          return true;
      }
      if (array[i]=="!=") {
          i++;
          codIntermedio[ii]=406; ii++;
          return true;
      }

      alert('Error22');i++;
      errores.push("Error whit operator");
      return false;
      //Verificar
  }


  //<deck simple condition> ::= isEmpty "(" <number of deck> ")" | isNotEmpty "(" <number of deck> ")"
  function deck_simple_condition(){
      //Exigir
      if(array[i] == "isEmpty" || array[i] == "isNotEmpty"){
          if (array[i]=="isEmpty") {
              codIntermedio[ii]=350; ii++;
          }
          if (array[i]=="isNotEmpty") {
              codIntermedio[ii]=351; ii++;
          }
          i++;
          //Exigir
          if(array[i] == "("){
              i++;
              number_of_deck();
              if(array[i] == ")"){
                  i++;
              } else {
                  alert("Error - ) is missing.");i++;
                  errores.push("Error ) whas expected");
              }
          } else {
              alert("Error - ( is missing.");i++;
              errores.push("Error ( whas expected");
          }
      } else {
          alert('Error - ' + array[i] + " is not a valid condition.");i++;
          errores.push('Error - ' + array[i-1] + " is not a valid condition.");
      }
  }

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
   }, 200)
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
                  if (card=="false") {
                      
                  }else{
                    rec=codIntermedio.length-1;
                      alert("Ya tienes carta amiguito");
                      break;
                  }
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
                  if (card!="false") {
                      
                  }else{
                      rec=codIntermedio.length-1;
                      alert("No tienes carta amiguito");
                      break;
                  }
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
