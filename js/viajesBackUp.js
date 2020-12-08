var map;
function initMap() {
//function initMap(){
	map = new google.maps.Map(document.getElementById('mapaGoogle'), {
		center: {lat: -12.789924, lng: -68.52355},
		zoom: 4,
		mapTypeControl: false
	});
  	if (navigator.geolocation) 
  	{
    	navigator.geolocation.getCurrentPosition(function (position) 
    	{
     	//console.log(position.coords.latitude);
     	//console.log(position.coords.longitude);
        initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.setCenter(initialLocation);
 		});
 	}

	infowindow = new google.maps.InfoWindow({});
};


function empezarViaje(){
	if (comprobarNombre() && comprobarEscala()) 
	{
		empezarRealmenteElViaje();
	}
	else{
		alert("Falta completar Nombre y/o Escala");
	}
}

function comprobarNombre(){
	var nombre = $("#nombreViaje").val();
	if (nombre == "") {
		return false;
	}
	else{
		return true;
	}
}

function comprobarEscala(){

	var escala = document.querySelector("#escalaInput").value;

	if (escala) 
	{
		return true;
	}
	else
	{
		return false;
	}
}



function empezarRealmenteElViaje()
{
	document.getElementById("fechaDesde").disabled = false;
	document.getElementById("fechaHasta").disabled = false;

	document.getElementById("citas").disabled = false;
	document.getElementById("fotos").disabled = false;
	document.getElementById("comer").disabled = false;
	document.getElementById("bailar").disabled = false;
	document.getElementById("deportes").disabled = false;
	document.getElementById("musica").disabled = false;
	document.getElementById("cultura").disabled = false;
	document.getElementById("amigos").disabled = false;

	var agregarPuntito = document.getElementById("agregarPuntito");
	agregarPuntito.classList.remove("oculto");

	var empezarViajeBoton = document.getElementById("empezarViajeBoton");
	empezarViajeBoton.classList.add("oculto");

	var cajaDeConfirmarViajeBoton = document.getElementById("cajaDeConfirmarViajeBoton");
	cajaDeConfirmarViajeBoton.classList.remove("oculto");

	var cuadras = document.getElementById("puedoAlejarme");
	cuadras.disabled = false;

}

//Eliminar despues
empezarRealmenteElViaje();

var listaDePuntos = [];

function cambiarBotoncito(){
	var agregarPuntito = document.getElementById("agregarPuntito");
	var confirmarPuntito = document.getElementById("confirmarPuntito");
	confirmarPuntito.classList.toggle("oculto");
	agregarPuntito.classList.toggle("oculto");
}

function agregarPuntito(){

	//Pone la fecha "Hasta" del punto anterior en la de "Desde" de este
	if (listaDePuntos.length>0) 
	{
		document.getElementById("fechaDesde").value = listaDePuntos[(listaDePuntos.length-1)].fechaHasta;		
	}

	cambiarBotoncito();

	document.getElementById("mapaGoogle");
	var myLatlng = new google.maps.LatLng(-32.789924,-62.52355);
	var marker = new google.maps.Marker({
		draggable: true,
	    position: myLatlng,
	    fechaDesde: "",
	    fechaHasta: "",
	    intereses:[],
	    puedoAlejarme: 0,
	    estado:"rojo"
	});


	//Les agrego un evento. Cuando el puntito está guardado ya tiene estas variables seteadas.
	// Entonces al hacerles click las trae a la página.
	marker.addListener('click', function() 
	{

		document.getElementById("fechaDesde").value = this.fechaDesde;
		document.getElementById("fechaHasta").value = this.fechaHasta;

		document.getElementById("puedoAlejarme").value = this.puedoAlejarme;

		interesesDeLaPagina = document.getElementsByClassName("checkInteres"); 
		interesesDelPunto = this.intereses;

		for (var i = 0; i <= interesesDeLaPagina.length-1; i++) {
			if(interesesDelPunto[i] == true)
			{
				interesesDeLaPagina[i].checked = true;
			}else
			{
				interesesDeLaPagina[i].checked = false;
			}
		}



		var confirmarPuntito = document.getElementById("confirmarPuntito");
		var editarPuntito = document.getElementById("editarPuntito");
		var agregarPuntito = document.getElementById("agregarPuntito");	
	    	

		if(listaDePuntos[listaDePuntos.length-1] == this )
		{

			if (this.draggable == true) 
			{
				infowindow.setContent(
					'<div id="content" class="divInfoWindow">Punto sin guardar</div>'
				);
				document.getElementById("confirmarPuntito").classList.remove('oculto');
				desbloquearCampos();

			}
			else
			{

				infowindow.setContent(
				'<div id="content" class="divInfoWindow">' +
				'<div id="siteNotice">' +
				'<input id="editarPuntito" type="button" class="btn btn-warning" value="Editar" onclick="editarPuntito('+listaDePuntos.indexOf(this)+')"> '+
				'</div>'+
				'</div>'
				);

				if (listaDePuntos[listaDePuntos.length-1].draggable == true) 
				{
					document.getElementById("confirmarPuntito").classList.add('oculto');
					document.getElementById("agregarPuntito").classList.add('oculto');
				}

				bloquearCampos();

			}
		}
		else
		{

			infowindow.setContent(
			'<div id="content" class="divInfoWindow">' +
			'<div id="siteNotice">' +
			'<input id="editarPuntito" type="button" class="btn btn-warning" value="Editar" onclick="editarPuntito('+listaDePuntos.indexOf(this)+')"> '+
			'</div>'+
			'</div>'
			);

			if (listaDePuntos[listaDePuntos.length-1].draggable == true) 
			{
				document.getElementById("confirmarPuntito").classList.add('oculto');
				document.getElementById("agregarPuntito").classList.add('oculto');
			}

			bloquearCampos();

		}

		infowindow.open(map, this);		

  	});

	// To add the marker to the map, call setMap();
	marker.setMap(map);
	listaDePuntos.push(marker);

	//Para que cierre los dialogos que pueda haber abiertos cuando toque en "Agregar nuevo punto"
	infowindow.close();
}


function bloquearCampos()
{
	document.getElementById("fechaDesde").disabled = true;
	document.getElementById("fechaHasta").disabled = true;

	document.getElementById("citas").disabled = true;
	document.getElementById("fotos").disabled = true;
	document.getElementById("comer").disabled = true;
	document.getElementById("bailar").disabled = true;
	document.getElementById("deportes").disabled = true;
	document.getElementById("musica").disabled = true;
	document.getElementById("cultura").disabled = true;
	document.getElementById("amigos").disabled = true;

	document.getElementById("puedoAlejarme").disabled = true;
}

function desbloquearCampos()
{
	document.getElementById("fechaDesde").disabled = false;
	document.getElementById("fechaHasta").disabled = false;

	document.getElementById("citas").disabled = false;
	document.getElementById("fotos").disabled = false;
	document.getElementById("comer").disabled = false;
	document.getElementById("bailar").disabled = false;
	document.getElementById("deportes").disabled = false;
	document.getElementById("musica").disabled = false;
	document.getElementById("cultura").disabled = false;
	document.getElementById("amigos").disabled = false;

	document.getElementById("puedoAlejarme").disabled = false;	
}


	
document.getElementById("fechaDesde").value = "2020-12-08";
document.getElementById("fechaHasta").value = "2020-12-09";
	


function confirmarPuntito(){
	if(comprobarFechaExiste())
	{
		if (comprobarFechaLimites()) 
		{
			if (comprobarFechasAnteriores()) 
			{
				if (comprobarGustos())
				{
					if(comprobarCuadras())
					{
						guardarPuntito();
					}
				}
			}
		}
	}
	
}


function comprobarFechaExiste()
{
	var fechaDesde = document.getElementById("fechaDesde").value;
	var fechaHasta = document.getElementById("fechaHasta").value;

	if (fechaDesde == "" || fechaHasta == "") 
	{
		alert("Falta completar fechas");
		return false;
	}else
	{
		return true;
	}
}

function comprobarFechaLimites(){
	var fechaDesde = document.getElementById("fechaDesde").value;
	var fechaDesde2 = new Date(fechaDesde);

	var fechaHasta = document.getElementById("fechaHasta").value;
	var fechaHasta2 = new Date(fechaHasta);


	var fechaHoy = new Date();
	
	var fechaDentroDeDosAnios = new Date(new Date().setFullYear(new Date().getFullYear() + 2));
	
	if(fechaDesde2 < fechaHoy){
		alert("La fecha de inicio no puede ser anterior a la de hoy");
		return false;
	}
	else{
		if(fechaHasta2 > fechaDentroDeDosAnios)
		{
			alert("La fecha final no puede ser irse tan lejos! Máximo 2 años. Mil disculpas capo.")
			return false;
		}
		else{
			if (fechaDesde2 > fechaHasta2) 
			{
				alert("La fecha de incio no puede ser posterior a la de fin.")
				return false;
			}
			else
			{
				return true;
			}
		}
	}
}

function comprobarGustos()
{
	contador = 0;
	var listaIntereses = document.getElementsByClassName("checkInteres");
	for (var i = 0; i <= listaIntereses.length-1; i++) {
		if (listaIntereses[i].checked) {
			contador = contador + 1;
		}
	} if (contador == 0) 
	{
		alert("Debe seleccionar al menos un gusto");
		return false;
	}else
	{
		return true;
	}

}

function comprobarCuadras(){
	var puedoAlejarme = document.getElementById("puedoAlejarme").value;
	if (puedoAlejarme == "") 
	{
		alert("Falta aclarar cuantas cuadras!");
		return false;
	}
	else{
		return true;
	}
}

function comprobarFechasAnteriores()
{
	// No necesito algunas variables guardadas acá.
	var fechaDesde = document.getElementById("fechaDesde").value;
	var fechaHasta = document.getElementById("fechaHasta").value;
	var intereses = document.getElementsByClassName("checkInteres");
	var puedoAlejarme = document.getElementById("puedoAlejarme").value;


	estePunto =	listaDePuntos[listaDePuntos.length-1];

	estePunto.fechaDesde = fechaDesde;
	estePunto.fechaHasta = fechaHasta;

	estePunto.puedoAlejarme = puedoAlejarme;

	if (listaDePuntos.length == 1) 
	{
		return true;
	}		
	else	
	{
		if (estePunto.fechaDesde < listaDePuntos[listaDePuntos.length-2].fechaHasta) 
		{
			alert("La fecha de inicio de este punto es anterior a la de finalización del punto anterior. Podés estar en dos lados a la vez vos? No. Entonces cambiala.")
			return false;
		}
		else
		{
			return true;
		}
	}
}

function guardarPuntito()
{
	var fechaDesde = document.getElementById("fechaDesde").value;
	var fechaHasta = document.getElementById("fechaHasta").value;
	var intereses = document.getElementsByClassName("checkInteres");
	var puedoAlejarme = document.getElementById("puedoAlejarme").value;

	estePunto =	listaDePuntos[listaDePuntos.length-1];

	estePunto.fechaDesde = fechaDesde;
	estePunto.fechaHasta = fechaHasta;

	estePunto.puedoAlejarme = puedoAlejarme;

	var listaDeInteresesLocal = [];


	//Guardo la lista de intereses en una variable.
	for (var i = 0; i <= intereses.length-1; i++) {
		if (intereses[i].checked)
		{
			listaDeInteresesLocal.push(true);
		}
		else
		{
			listaDeInteresesLocal.push(false);
		}
	}


	estePunto.intereses = listaDeInteresesLocal;

	estePunto.setDraggable(false);
	estePunto.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')


	cambiarBotoncito();


	ponerLineasMapa();


	limpiarCampos();
	infowindow.close();


}



function limpiarCampos()
{
	document.getElementById("fechaDesde").value = "";
	document.getElementById("fechaHasta").value = "";
	document.getElementById("puedoAlejarme").value= "";
}

function maximoTres()
{
	var numero = document.getElementById("puedoAlejarme").value;
	if (numero.length > 3) 
	{

		var str = numero;
		str = str.toString();
		var strFirstThree = str.substring(0,3);
		strFirstThree = parseInt(strFirstThree);
		console.log(strFirstThree);

		document.getElementById("puedoAlejarme").value = strFirstThree;
	}
}




// Funcion al confirmar que se quiere entrar en la instancia de edición el punto.
function editarPuntito(punto)
{

	// Eliminar el ultimo punto si es editable.
	/*
	if(listaDePuntos[listaDePuntos.length-1].draggable == true)
	{
		listaDePuntos.pop();
	}
	*/

	var estePunto = listaDePuntos[punto];

	estePunto.addListener('click', function() 
	{
		infowindow.setContent(
		'<div id="content" class="divInfoWindow">' +
		'<div id="siteNotice">' +
		'<input id="editarPuntito" type="button" class="btn btn-success" value="Guardar" onclick="confirmarEdicionPuntito('+punto+')"> '+
		'<input id="eliminarPuntito" type="button" class="btn btn-danger" value="Eliminar" onclick="eliminarPuntito()"> '+
		'<input id="cancelarPuntito" type="button" class="btn btn-warning" value="Volver" onclick="cancelarEdicionPuntito('+punto+')"> '+
		'</div>'+
		'</div>'
		);
		desbloquearCampos();
	});

	listaDePuntos[punto].setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');

	/*Deshabilito todos los demas puntos tambien*/
	for (var i = listaDePuntos.length - 1; i >= 0; i--) {
		if (i != punto) 
		{
			listaDePuntos[i].addListener('click', function() 
			{
				infowindow.setContent(
				'<div id="content" class="divInfoWindow">...</div>'
				);

				document.getElementById("agregarPuntito").classList.add('oculto');
				document.getElementById("confirmarPuntito").classList.add('oculto');
				bloquearCampos();
			});
			
		}
	}

	document.getElementById("agregarPuntito").classList.add('oculto');

	infowindow.setContent(
	'<div id="content" class="divInfoWindow">' +
	'<div id="siteNotice">' +
	'<input id="editarPuntito" type="button" class="btn btn-success" value="Guardar" onclick="confirmarEdicionPuntito('+punto+')"> '+
	'<input id="eliminarPuntito" type="button" class="btn btn-danger" value="Eliminar" onclick="eliminarPuntito()"> '+
	'<input id="cancelarPuntito" type="button" class="btn btn-warning" value="Volver" onclick="cancelarEdicionPuntito('+punto+')"> '+
	'</div>'+
	'</div>'
	);

	listaDePuntos[punto].setDraggable(true);

	desbloquearCampos();

}

function confirmarEdicionPuntito(punto)
{
	var fechaActualDesde = document.getElementById("fechaDesde").value;

	if (comprobarFechaExiste()) 
	{
		if (comprobarFechaLimites()) 
		{
			if (comprobarGustos()) 
			{
				if (comprobarCuadras()) 
				{
					if (punto == 0) 
					{
						editarPunto(punto);
					}
					else
					{
						var fechaAnteriorHasta = listaDePuntos[punto-1].fechaHasta;
						if (fechaActualDesde < fechaAnteriorHasta) 
						{
							alert("La fecha Desde del punto NO puede ser anterior a la fecha Hasta del punto anterior.");
						}
						else
						{
							editarPunto(punto);
						}
					}
				}
			}
		}
	}	
}


function editarPunto(punto)
{
	estePunto =	listaDePuntos[punto];
	

	//Guarda los datos nuevos

	var fechaDesde = document.getElementById("fechaDesde").value;
	var fechaHasta = document.getElementById("fechaHasta").value;
	var intereses = document.getElementsByClassName("checkInteres");
	var puedoAlejarme = document.getElementById("puedoAlejarme").value;

	estePunto.fechaDesde = fechaDesde;
	estePunto.fechaHasta = fechaHasta;

	estePunto.puedoAlejarme = puedoAlejarme;

	var listaDeInteresesLocal = [];

	for (var i = 0; i < intereses.length; i++) {
		if (intereses[i].checked)
		{
			listaDeInteresesLocal.push(true);
		}
		else
		{
			listaDeInteresesLocal.push(false);
		}
	}

	estePunto.intereses = listaDeInteresesLocal;

	// Cambio el color y lo fijo
	estePunto.setDraggable(false);
	estePunto.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')

	ponerLineasMapa();

	// Cierro la ventana dialogo
	infowindow.close();

	var agregarPuntito = document.getElementById("agregarPuntito");	
	agregarPuntito.classList.remove("oculto");

	volverAPonerDialogos();

}


// Funcion poner lineas en el mapa, tiene que ser global para andar.
function ponerLineasMapa()
{
	var listaDeLineas = [];

	for (var i = 0; i < listaDePuntos.length ; i++) {
		var posX = listaDePuntos[i].getPosition().lat();
		var posY = listaDePuntos[i].getPosition().lng();
		var myLatLng = new google.maps.LatLng(posX, posY);
		listaDeLineas.push(myLatLng);
	}

	if (flightPath) {
		flightPath.setPath(listaDeLineas);
	} else {

	flightPath = new google.maps.Polyline(
	{
    path: listaDeLineas,
    strokeColor: "#0000FF",
    strokeOpacity: 1.0,
    strokeWeight: 2
	});

	flightPath.setMap(map);
	}
	//Con esto se setea la linea en el mapa
}


function cancelarEdicionPuntito(punto)
{

}


// Vuelve a poner los diálogos a los puntos y los campos correspondientes.
function volverAPonerDialogos()
{
	for(i=0; i<listaDePuntos.length;i++)
	{
		puntoMapa = listaDePuntos[i];
		puntoMapa.addListener('click', function() 
		{

			// Pone campos
			document.getElementById("fechaDesde").value = this.fechaDesde;
			document.getElementById("fechaHasta").value = this.fechaHasta;

			document.getElementById("puedoAlejarme").value = this.puedoAlejarme;

			interesesDeLaPagina = document.getElementsByClassName("checkInteres"); 
			interesesDelPunto = this.intereses;

			for (var i = 0; i <= interesesDeLaPagina.length-1; i++) {
				if(interesesDelPunto[i] == true)
				{
					interesesDeLaPagina[i].checked = true;
				}else
				{
					interesesDeLaPagina[i].checked = false;
				}
			}



			var confirmarPuntito = document.getElementById("confirmarPuntito");
			var editarPuntito = document.getElementById("editarPuntito");
			var agregarPuntito = document.getElementById("agregarPuntito");	
		    	
			// Se fija si estas tocando el punto ROJO 
			if(listaDePuntos[listaDePuntos.length-1] == this )
			{

				if (this.draggable == true) 
				{
					infowindow.setContent(
						'<div id="content" class="divInfoWindow">Punto sin guardar</div>'
					);
					document.getElementById("confirmarPuntito").classList.remove('oculto');
					desbloquearCampos();

				}
				else
				{

					infowindow.setContent(
					'<div id="content" class="divInfoWindow">' +
					'<div id="siteNotice">' +
					'<input id="editarPuntito" type="button" class="btn btn-warning" value="Editar" onclick="editarPuntito('+listaDePuntos.indexOf(this)+')"> '+
					'</div>'+
					'</div>'
					);

					if (listaDePuntos[listaDePuntos.length-1].draggable == true) 
					{
						document.getElementById("confirmarPuntito").classList.add('oculto');
						document.getElementById("agregarPuntito").classList.add('oculto');
					}

					bloquearCampos();

				}
			}
			else
			{

				infowindow.setContent(
				'<div id="content" class="divInfoWindow">' +
				'<div id="siteNotice">' +
				'<input id="editarPuntito" type="button" class="btn btn-warning" value="Editar" onclick="editarPuntito('+listaDePuntos.indexOf(this)+')"> '+
				'</div>'+
				'</div>'
				);

				if (listaDePuntos[listaDePuntos.length-1].draggable == true) 
				{
					document.getElementById("confirmarPuntito").classList.add('oculto');
					document.getElementById("agregarPuntito").classList.add('oculto');
				}

				bloquearCampos();

			}

			infowindow.open(map, this);		

	  	});
	}
}

/*

aceptar
	- Poner la nueva linea
	- Guardar nuevos datos
volver
	- Volver a poner el coso donde estaba

- Cambiar icono
- Sacar Draggable

- Volver a poner los iconos con sus event listener

*/














