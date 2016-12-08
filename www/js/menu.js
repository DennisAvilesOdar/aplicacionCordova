$(document).ready(function(){
  listarArticulo();
  $(".button-collapse").sideNav();
  $('.modal').modal();
});

$("#botonpanel").click(function(){
  var misVariablesGet = getVarsUrl();
  var foto = "https://macnode1.herokuapp.com/images/";
  var fondo = "https://macnode1.herokuapp.com/fondos/71386344.jpg";
  //$("#nombrepanel").text(misVariablesGet.dato);
  //alert(misVariablesGet.dato);
  $.post("https://macnode1.herokuapp.com/api/v1/panel", {
    dato: misVariablesGet.dato
  }).done(function(resultado){
    var datosJSON = resultado;
    for(var item in datosJSON){
        document.getElementById("fondo-usuario").innerHTML ="<img height='170px' width='auto' src='"+ fondo +"'>"
        document.getElementById("foto-usuario").innerHTML ="<img class='circle' src='"+foto+ datosJSON[item].dni +".jpg' onerror='imgError(this)'>";
        $("#nombrepanel").text(datosJSON[item].personal);
        $("#correopanel").text(datosJSON[item].email);
    }
  });
});

$("#btnarticulo").click(function(){
  $("#list_view").empty();
  listarArticulo();
});

$("#btncliente").click(function(){
  $("#list_view").empty();
  listarCliente();
});

function listarArticulo(){
  var $ul = $("#list_view");
  $.getJSON("https://macnode1.herokuapp.com/api/v1/articulo",function(result){
  var data = result;
  for(var item in data){
  var datos = data[item];
  var archivo="https://macnode1.herokuapp.com/images/"+datos.codigo_articulo +".jpg";
  var content = '<div class="card">' +
                  '<div class="card-image waves-effect waves-block waves-light">' +
                    '<img class="activator" src="'+archivo+'" onerror="imgError(this)">' +
                  '</div>' +
                  '<div class="card-content">' +
                    '<span class="card-title activator grey-text text-darken-4">'+ datos.nombre +'</span>' +
                    '<p>'+ datos.precio_venta +'</p>' +
                    '<p><a href="detalle.html?codigo='+ datos.codigo_articulo +'">Detalles</a></p>' +
                  '</div>' +
                '</div>';
  $ul.append(content);
  }
  //$ul.listview( "refresh" );
  });
}

function imgError(image) {
    image.onerror = "";
    image.src = "https://macnode1.herokuapp.com/images/none.jpg";
    return true;
}

function listarCliente(){
  var $ul = $("#list_view");
  $.getJSON("https://macnode1.herokuapp.com/api/v1/cliente",function(result){
  var data = result;
  for(var item in data){
  var datos = data[item];
  var archivo = "https://macnode1.herokuapp.com/images/"+ datos.docide +".jpg";
  var content = '<div class="card">' +
                  '<div class="card-image waves-effect waves-block waves-light">' +
                    '<img class="activator" src="'+archivo+'" onerror="imgError(this)">' +
                  '</div>' +
                  '<div class="card-content">' +
                    '<span class="card-title activator grey-text text-darken-4">'+ datos.nombre +'</span>' +
                    '<p>'+ datos.direccion +'</p>' +
                    '<p>'+ datos.docide +'</p>' +
                    '<p><a href="mapa.html">Ubicacion</a></p>' +
                  '</div>' +
                '</div>';
  $ul.append(content);
  }
  //$ul.listview( "refresh" );
  });
}

function getVarsUrl(){
    var url= location.search.replace("?", "");
    var arrUrl = url.split("&");
    var urlObj={};
    for(var i=0; i<arrUrl.length; i++){
        var x= arrUrl[i].split("=");
        urlObj[x[0]]=x[1]
    }
    return urlObj;
}
