window.fn = function () { 
  alert();
 };
//setInterval(function () { actualizarCanvas();},1000);
window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');

  $.when(content.load(page).then(menu.close.bind(menu))).then(function(){
    if(page === 'inicioUsuario.html')
    {
      cargarInicioUsuario();
      $.when(actualizaBtnsEstacionaDesocupar()).then(actualizaBtnsEstacionaDesocupar());

      actualizarLugares();
      actualizarCanvas();
    }
    if(page === 'configuracionUsuario.html')
    {
      cargarConfiguracionUsuario();
    }
    if(page === 'vehiculos.html')
    {
      var usuario = Cookies.get('usuario');
      usuario = JSON.parse(usuario)
      actualizarVehiculos(usuario[0].codigo);
      actualizaLugaresCanvas();
        }
  })
}
function cargarMenu(){
  var menu = `
  <ons-list-item onclick="fn.load('inicio.html')" tappable>
  Inicio
</ons-list-item>
<ons-list-item onclick="fn.load('inicioUsuario.html')" tappable>
  Acerca De
</ons-list-item>
<ons-list-item onclick="fn.load('registro.html')" tappable>
  About
</ons-list-item>
  `
  $('#menu-splitter').html(menu);
}
function cargarInicioUsuario(){
  var usuario = Cookies.get('usuario');
  usuario = JSON.parse(usuario)
  $('#nombreUsuario').html(`${usuario[0].nombre}`);
}

function cargarConfiguracionUsuario(){
  var usuario = Cookies.get('usuario');
  usuario = JSON.parse(usuario)
  $('#codigoUsuario').html(usuario[0].codigo);
  $('#nombreUsuario').html(usuario[0].nombre);
  $('#centroUsuario').html(usuario[0].centro);
  $('#carreraUsuario').html(usuario[0].carrera);
  $.ajax({
    type: "POST",
    url: "https://dcc.000webhostapp.com/infoEstudiante.php",
    data: {codigo: usuario[0].codigo},
    success: function (response) {

      usuario = JSON.parse(response.split(") \"[")[1].slice(0, -5));
      document.getElementById('imagenUsuario').setAttribute("src", `data:image/png;base64,${usuario.foto}`);
      
    }
  });



}
