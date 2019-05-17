function login() {
    let codigo = $('#usuarioLogin').val();
    let nip = $('#passwordLogin').val();

    $.ajax({
        type: "post",
        url: "https://fernandolparra.000webhostapp.com/parkcucei/login.php",
        data: { codigo, nip },
        success: function (response) {
            if (response !== '0') {
                if(response === 'MySQL server has gone away')
                {
                    ons.notification.alert('Imposible conectar con la Base de Datos: MySQL server has gone away');
                    return;
                }
                if(response === 'Connection refused')
                {
                    ons.notification.alert('Imposible conectar con la Base de Datos: Connection refused');
                    return;
                }
                console.log(response);
                $.when(fn.load('inicioUsuario.html')).then(function () {
                    Cookies.set('usuario', response);

                    var menu = `
                    <ons-list-header class="menu_header">PARK CUCEI</ons-list-header>
                    
                    <ons-list-item onclick="fn.load('inicioUsuario.html')" tappable>
                       Inicio
                    </ons-list-item>
                    <ons-list-header class="menu_header">Configuración</ons-list-header>

                    <ons-list-item onclick="fn.load('configuracionUsuario.html')" tappable>
                        Mis Datos
                    </ons-list-item>
                    <ons-list-item onclick="fn.load('vehiculos.html')" tappable>
                        Mis Vehículos
                    </ons-list-item>
                    <ons-list-header class="menu_header">Sobre la app</ons-list-header>
                    <ons-list-item onclick="fn.load('acercaDe')" tappable>
                   Acerca de
                    </ons-list-item>
                    <ons-list-item onclick="fn.load('contacto.html')" tappable>
                    Contacto
                    </ons-list-item>
                    `
                    $('#menu-splitter').html(menu);
                });
            }
            else {
                alert('No inicia Sesion');
            }
        }
    });
}

function logout() {
    $.when(fn.load('inicio.html')).then(cargarMenu());

}

