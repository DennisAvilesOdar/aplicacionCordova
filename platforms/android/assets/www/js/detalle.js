$(document).ready(function(){
    $('.parallax').parallax();
    $('.carousel.carousel-slider').carousel({full_width: true});
    listar()
  });

  function listar(){
    var misVariablesGet = getVarsUrl();
    $.post("https://macnode1.herokuapp.com/api/v1/detalle", {
      codigo: misVariablesGet.codigo
    }).done(function(resultado){
      var datosJSON = resultado;
      for(var item in datosJSON){
          var f1 = "https://macnode1.herokuapp.com/images/"+ datosJSON[item].codigo +"/1.jpg";
          var f2 = "https://macnode1.herokuapp.com/images/"+ datosJSON[item].codigo +"/2.jpg";
          var f3 = "https://macnode1.herokuapp.com/images/"+ datosJSON[item].codigo +"/3.jpg";
          var f4 = "https://macnode1.herokuapp.com/images/"+ datosJSON[item].codigo +"/4.jpg";

          document.getElementById("f1").innerHTML ="<img src='"+f1+"'>"
          document.getElementById("f2").innerHTML ="<img src='"+f2+"'>"
          document.getElementById("f3").innerHTML ="<img src='"+f3+"'>"
          document.getElementById("f4").innerHTML ="<img height='250px' width='250px' src='"+f4+"'>"
          $("#nombre").text(datosJSON[item].nombre);
          $("#detalle").text(datosJSON[item].descripcion);
      }
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
