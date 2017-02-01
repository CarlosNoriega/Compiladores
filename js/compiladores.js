

function leer(){
	var correcto=true;	
	var tex=document.getElementById("texto").value;
	console.log(tex.length);
	var arr = [];
	var c=0;
	//console.log(tex.length === 1 && tex.match(/[a-z]/i));
	for (var i = 0; i <tex.length; i++) {
		if (tex[i]>='A' && tex[i]<='Z') {
			console.log(tex[i]+" si es letra");
		}else if (tex[i]>='a' && tex[i]<='z') {
			console.log(tex[i]+" si es letra");
		}else if (tex[i]>='0' && tex[i]<='9') {
			console.log(tex[i]+" si es letra");
		}else if (tex[i]=='{') {
			console.log(tex[i]+" si es aceptado");
		}else if (tex[i]=='}') {
			console.log(tex[i]+" si es aceptado");
		}else if (tex[i]=='(') {
			console.log(tex[i]+" si es aceptado");
		}else if (tex[i]==')') {
			console.log(tex[i]+" si es aceptado");
		}else if (tex[i]=='|') {
			console.log(tex[i]+" si es aceptado");
		}else if (tex[i]==' ') {
			console.log(tex[i]+" si es aceptado");
		}else{
			console.log(tex[i]+" NO");
			arr[c]=tex[i];
			c++;
		}
	}
	var t="";
	if(arr.length==0){
		t='No hay caracteres erroneos';
	}
	for (var i = 0; i <arr.length; i++) {
		t=t+'<div>'+arr[i]+'</div>'
	}
	document.getElementById("correccion").innerHTML=t;
}