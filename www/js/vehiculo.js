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
            url: "https://fernandolparra.000webhostapp.com/parkcucei/registrarVehiculo.php",
            data: {codigo, nombre, placas},
            success: function (response) {
                if(response == '1'){
                    actualizarVehiculos(codigo);
                }
            }
        });
    }
    else
    {
        ons.notification.alert('Datos incompletos');
    }
 }
 function actualizarVehiculos(codigo) { 
    $('#nombreVehiculo').val('');
    $('#placasVehiculo').val('');
    $('#registroVehiculo').hide();
    $('#listaVehiculos').html('');

    $.ajax({
        type: "POST",
        url: "https://fernandolparra.000webhostapp.com/parkcucei/buscarVehiculos.php",
        data: {codigo},
        success: function (response) {
            if(response != '0'){
                let html = '';
                response.forEach(element => {
                    html+=`
                    <ons-list-item tappable>
                        <div class="left">` 
                        if(element.estado == "1")
                            html+= `<ons-icon icon="fa-check-circle" style="color: green" class="list-item__icon"></ons-icon>`;
                        else
                            html+= `<ons-icon icon="fa-times-circle" style="color: red" class="list-item__icon"></ons-icon>`;

                        html+= `
                        </div>
                        <div class="center">
                        ${element.nombre}
                        </div>
                        <div class="right">
                            <ons-icon icon="fa-trash-alt" class="list-item__icon" onclick="eliminarVehiculo('${element.id}')"></ons-icon>
                        </div>
                    </ons-list-item>
                    `
                });
                $('#listaVehiculos').html(html);
            }
        }
    });
 }

 function actualizarLugares() {
     $.ajax({
         type: "GET",
         url: "https://fernandolparra.000webhostapp.com/parkcucei/contarLugares.php",
         success: function (response) {
             if(response != "-1"){
                $('#cajonesOc').html(response);
                $('#cajonesDis').html(137 - response);
             }

         }
     });
 }
 function buscaEstacionado() { 
    var usuario = JSON.parse(Cookies.get('usuario'));
    let codigo = usuario[0].codigo;
    var jqXHR = $.ajax({
        type: "POST",
        url: "https://fernandolparra.000webhostapp.com/parkcucei/buscaEstacionado.php",
        data: {codigo},
        async: false,
        success: function (response) {
        }
    });
    return jqXHR.responseText
}
function actualizaBtnsEstacionaDesocupar(){
    var vehiculo = buscaEstacionado();
    var usuario = JSON.parse(Cookies.get('usuario'));
    let codigo = usuario[0].codigo;
    if(vehiculo == '0'){
        $.ajax({
            type: "POST",
            url: "https://fernandolparra.000webhostapp.com/parkcucei/buscarVehiculos.php",
            data: {codigo},
            success: function (response) {
                var html = `<ons-select id="vehiculo-sel" value=${response[0].id} onchange="editSelects(event)">`;
                response.forEach(element => {
                    html += `
                        <option value="${element.id}">${element.nombre} - ${element.placas}</option>
                        `;
                });
                html += `
                </ons-select>
                <ons-button id="btnEstacionar" onclick="estacionarVehiculo()" style="background-color: #36A654">Estacionar</ons-button>
                `;
                $("#ctrlEstacionamiento").html(html);

            }
        });
    }
    else{
        var html = `<ons-button onclick="desocuparLugar()" style="background-color: red">Desocupar Lugar</ons-button>`
        $("#ctrlEstacionamiento").html(html);

    }
}

function estacionarVehiculo() {
    var id = $('#vehiculo-sel').attr('value');
    var cajon = $('#cajon-sel').attr('value');
    $.ajax({
        type: "POST",
        url: "https://fernandolparra.000webhostapp.com/parkcucei/estacionarVehiculo.php",
        data: {id, cajon, estado : 1},
        success: function (response) {
            if(response == '1'){
                actualizaBtnsEstacionaDesocupar();
                actualizarLugares();
                actualizaLugaresCanvas();
            }
            else{
                ons.notification.alert('No se pudo estacionar!')
            }
            
        }
    });
}
function desocuparLugar() {
    var vehiculo = JSON.parse(buscaEstacionado());

    var id = vehiculo.id;
    var cajon = vehiculo.id_cajon;
    $.ajax({
        type: "POST",
        url: "https://fernandolparra.000webhostapp.com/parkcucei/estacionarVehiculo.php",
        data: {id, cajon,  estado : 0},
        success: function (response) {
            if(response == '1'){
                actualizaBtnsEstacionaDesocupar();
                actualizarLugares();
                actualizarCanvas();
                actualizaLugaresCanvas();
            }
            else{
                ons.notification.alert('No se pudo estacionar!')
            }
            
        }
    });
}
function editSelects(event) {
    $('#vehiculo-sel').attr('value', event.target.value);
    
  }


 function eliminarVehiculo(id){
    $.ajax({
        type: "POST",
        url: "https://fernandolparra.000webhostapp.com/parkcucei/eliminarVehiculo.php",
        data: {id},
        success: function (response) {
            if(response == '1'){
                var usuario = JSON.parse(Cookies.get('usuario'));
                let codigo = usuario[0].codigo;
                actualizarVehiculos(codigo);
            }
            else{
                ons.notification.alert('Ocurrió un problema al eliminar!');
            }
        }
    });
 }