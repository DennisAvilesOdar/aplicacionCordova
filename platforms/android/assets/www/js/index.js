$(document).ready(function(){
  
});

function inicioSesion(){
  $.post("https://macnode1.herokuapp.com/api/v1/inicio",{
    email: $("#email").val(),
    password: $("#password").val()
  }).done(function(resultado){
    var datosJSON = resultado;

    for (var i = 0; i < datosJSON.length; i++) {
      if(datosJSON[i].estado === 200){
        document.location= "menu.html?dato="+ datosJSON[i].dato;
      }else{
        alert(datosJSON[i].dato);
      }
    }
  }).fail(function(error){
    var datosJSON = $.parseJSON(error.responseText);
    alert(datosJSON.mensaje);
  });
}
