function login() {
    var codigo = $('#usuarioLogin').val();
    var nip = $('#passwordLogin').val();

    $.ajax({
        type: "post",
        url: "https://fernandolparra.000webhostapp.com/parkcucei/login.php",
        data: { codigo },
        success: function (response) {
            if (response != '0') {
                Cookies.set('usuario', `${JSON.stringify(response)}`);
                $.ajax({
                    type: "POST",
                    url: "https://dcc.000webhostapp.com/pruebaLogin.php",
                    data: {codigo, nip},
                    success: function (response) {
                        if(response != '0')
                        {
                            $.when(fn.load('inicioUsuario.html')).then(function () {

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
                                <ons-list-item onclick="fn.load('acercaDe.html')" tappable>
                               Acerca de
                                </ons-list-item>
                                <ons-list-item onclick="fn.load('contacto.html')" tappable>
                                Contacto
                                </ons-list-item>
                                `
                                $('#menu-splitter').html(menu);
                            });
                        }
                        else
                        {
                            ons.notification.alert("Contraseña Incorrecta");
                        }
                        
                    }
                });
            }
            else {
                ons.notification.alert("El usuario no está registrado.");
            }
        },
        error: function(){
            OnError(error)
            alert();

        }
    });
}

function logout() {
    $.when(fn.load('inicio.html')).then(cargarMenu());

}

