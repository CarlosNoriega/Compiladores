
function isWord(res){
	console.log(res);
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
	var correcto=true;
	var tex=document.getElementById("texto").value;
	console.log(tex.length);
	var arr = [];
	var res = tex.replace( /\n/g, " " ).split( " " );
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
							console.log('palabra '+p);
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

		}
	}
	var t="";
	if(arr.length==0){
		t='No hay errores.';
	}
	for (var i = 0; i <arr.length; i++) {
		t=t+'<div>'+ 'Error '+ i+1 + ': '+ arr[i]+'</div>'
	}
	document.getElementById("correccion").innerHTML=t;
}
