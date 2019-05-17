function agregarVehiculo () {
    
    $('#registroVehiculo').show();

 }
 function enviarRegistroVehiculo () {

    let placas = $('#nombreVehiculo').val();
    let nombre = $('#placasVehiculo').val();
    var usuario = JSON.parse(Cookies.get('usuario'));
    let codigo = usuario[0].codigo;

    if(placas != '' || nombre != '' || codigo != ''){
        $.ajax({
            type: "post",
            url: "php/registrarVehiculo.php",
            data: {codigo, nombre, placas},
            success: function (response) {
                console.log(response);
                if(response === '1'){
                    actualizarVehiculos(codigo);
                }
            }
        });
    }
 }
 function actualizarVehiculos(codigo) {  
    $('#nombreVehiculo').val('');
    $('#placasVehiculo').val('');
    $('#registroVehiculo').hide();

    $.ajax({
        type: "POST",
        url: "https://fernandolparra.000webhostapp.com/parkcucei/buscarVehiculos.php",
        data: {codigo},
        success: function (response) {
            if(response != '0'){
                let vehiculos = JSON.parse(response);
                let html = '';
                vehiculos.forEach(element => {
                    html+=`
                    <ons-list-item tappable>
                        <div class="left">
                        <ons-switch></ons-switch>
                        </div>
                        <div class="center">
                        ${element.nombre}
                        </div>
                        <div class="right">
                            <ons-icon icon="fa-trash-alt" class="list-item__icon" onclick="eliminarVehiculo('${element.placas}')"></ons-icon>
                        </div>
                    </ons-list-item>
                    `
                });
                $('#listaVehiculos').html(html);
            }
        }
    });

 }

 function eliminarVehiculo(placas){
     alert(placas);
 }