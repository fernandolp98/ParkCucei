window.fn = {};

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
  $('#nombreUsuario').html(usuario[0].nombre);
  console.log(usuario);
}

function cargarConfiguracionUsuario(){
  var usuario = Cookies.get('usuario');
  usuario = JSON.parse(usuario)
  $('#codigoUsuario').html(usuario[0].codigo);
  $('#nombreUsuario').html(usuario[0].nombre);
  $('#centroUsuario').html(usuario[0].centro);
  $('#carreraUsuario').html(usuario[0].carrera);




}
