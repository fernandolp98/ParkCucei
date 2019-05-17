function actualizarCanvas(){
    var canvas=document.getElementById("estacionamientoCanvas");
    if(canvas != null)
    {
        var ctx=canvas.getContext("2d");
    
        var img=new Image();
        img.onload=start;
        img.src="Resources/estacionamiento-mapa.jpg";
        function start(){
                    
          canvas.width=350;
          canvas.height=300;
        
          var w=img.width * scale;
          var h=img.height * scale;
          var scale = Math.max(canvas.width / img.width, canvas.height / img.height);
          var x = (canvas.width / 2) - (img.width / 2) * scale;
          var y = (canvas.height / 2) - (img.height / 2) * scale;
          // resize img to fit in the canvas 
          // You can alternately request img to fit into any specified width/height
          var sizer=scalePreserveAspectRatio(w,h,canvas.width,canvas.height);
        
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        }
        actualizaLugaresCanvas();
    }
    
    function scalePreserveAspectRatio(imgW,imgH,maxW,maxH){
      return(Math.min((maxW/imgW),(maxH/imgH)));
    }
}
function ObtenerCoords(event){
    // var x = new Number();
    // var y = new Number();
    // var canvas = document.getElementById("estacionamientoCanvas");

    // if (event.x != undefined && event.y != undefined){
    //     x = event.x;
    //     y = event.y;
    // }else{// Firefox
    //     x = event.clientX + document.body.scrollLeft +
    //         document.documentElement.scrollLeft;
    //     y = event.clientY + document.body.scrollTop +
    //         document.documentElement.scrollTop;
    // }
    // x -= canvas.offsetLeft;
    // y -= canvas.offsetTop;
    // $.ajax({
    //     type: "POST",
    //     url: "https://fernandolparra.000webhostapp.com/parkcucei/agregarEstacionamiento.php",
    //     data: {x, y},
    //     success: function (response) {
    //         if(response == '1'){
    //             actualizarCanvas();
    //         }
    //         else{
    //             ons.notification.alert('Error!');

    //         }
    //     }
    // });
}
function editSelectsCajon(){
    $('#cajon-sel').attr('value', event.target.value);
}

function actualizaLugaresCanvas(){
    var canvas =  document.getElementById('estacionamientoCanvas');
    if(canvas != null)
    {
        $.ajax({
            type: "GET",
            url: "https://fernandolparra.000webhostapp.com/parkcucei/verCajones.php",
            success: function (response) {
                if(response != '0'){
                    var first = false;
                    var html = "";
                    response.forEach(element => {
                        if(element.estado == '0')
                        {
                            if(!first)
                            {
                                html += `<ons-select id="cajon-sel" value=${element.id_cajon} onchange="editSelectsCajon(event)">`;
                                first = true;
                            }
                            html += `
                            <option value="${element.id_cajon}">${element.id_cajon}</option>
                            `;
                        }
                        else{
                            var ctx = canvas.getContext('2d');
                            ctx.fillStyle = "#ff0000";
                            ctx.fillRect(element.x, element.y, 5, 5);
                        }
                    });
                    html += `
                    </ons-select>
                    `;
                    $("#cajonesDisponibles").html(html);

                }
                
            }
        });

    }

}