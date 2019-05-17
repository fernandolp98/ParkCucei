function registroSiiau() {
    let codigo = $('#codigoSiiauRegistro').val();
    let nip = $('#nipSiiauRegistro').val();
    $('#progressbarRegistro').show();
    $.ajax({
        type: "POST",
        url: "https://dcc.000webhostapp.com/pruebaLogin.php",
        data: { codigo, nip },
        success: function (response) {
            if (response !== '0') {
                var params = response.split(',');
                $.ajax({
                    type: "post",
                    url: "https://fernandolparra.000webhostapp.com/parkcucei/registrarUsuario.php",
                    data: {
                        codigo: params[1],
                        nip: nip,
                        nombre: params[2],
                        centro: params[3],
                        carrera: params[4]
                    },
                    success: function (response) {
                        $('#progressbarRegistro').hide();

                        if (response === '1') {
                            ons.notification.toast('Registro agregado!', {
                                timeout: 1000
                            });
                            fn.load('inicio.html');
                        }

                    }
                });
            }
        }
    });
}

function registro() {
    let codigo = $('#codigoRegistro').val();
    let nip = $('#nipRegistro').val();
    let nombre = $('#nombreRegistro').val();
    let carrera = $('#carreraRegistro').val();
    let centro = $('#centroRegistro').val();
    $.ajax({
        type: "post",
        url: "https://fernandolparra.000webhostapp.com/parkcucei/registrarUsuario.php",
        data: { codigo, nip, nombre, carrera, centro },
        success: function (response) {
            if (response === '1') {
                ons.notification.toast('Registro agregado!', {
                    timeout: 1000
                });
                fn.load('inicio.html');
            }
        }
    });
}