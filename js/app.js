document.querySelector('#generar-nombre').addEventListener('submit', cargarNombres);

// Llamado AJAX e imprimir resultados
function cargarNombres(e){
    // Cuando se utiliza el submit de evento, 
    //por regla se usa el e.preventDefaul() para que no haga su acción
    e.preventDefault();

    // Leer las variables
    // Para seleccionar el pais de origen
    const origen = document.getElementById('origen');
    // Cuando se coge el valor de un select requiere de 2 variables
    // 1. una que agarre todo el select
    // 2 otra que filtre por otions[nombrevariable.selectedIndex].value
    // Para agarrar el valor específico del option del select
    const origenSeleccionado = origen.options[origen.selectedIndex].value;

    // Para seleccionar el género de la persona
    const genero = document.getElementById('genero');
    const generoSeleccionado = genero.options[genero.selectedIndex].value;

    if(generoSeleccionado === 'male'){
        document.body.style.backgroundColor ='#56CCF2';
    }else if(generoSeleccionado === 'female'){
        document.body.style.backgroundColor ='#FFCAD4';
    }

    const cantidad = document.getElementById('numero').value;

    // crear URL
    let url = '';
    // Se construye la url conforme a los datos del formulario, por los parametros que se quiera filtrar
    url+= 'https://uinames.com/api/?';

    // Si hay origen agregarlo a la URL
    if(origenSeleccionado !== ''){
        url+= `region=${origenSeleccionado}&`; // Se pasa con template literal ya que el origin debe ser igual al region seleecionado en el form
    }
    // Si hay un genero (female o male) agregarlo a la URL
    if(generoSeleccionado !== ''){
        url+= `gender=${generoSeleccionado}&`; // Se pasa con template literal ya que el origin debe ser igual al region seleecionado en el form
    }
      // Si hay una cantidad agregarlo a la URL
    if(cantidad !== ''){
        url+= `amount=${cantidad}&`; // Se pasa con template literal ya que el origin debe ser igual al region seleecionado en el form
    }
 console.log(url);
    // Conectar con AJAX
    const xhr = new XMLHttpRequest(); // crear objeto

    // Abrimos conexión
    xhr.open('GET', url, true);

    // Datos e impresión del template
    xhr.onload = function(){
        if(this.status === 200){
            const nombres = JSON.parse(this.responseText);
            // Generar un html para pintar
            // Subtitulo
            let htmlNombres = '<h2>Nombres Generados</h2>';

            // Se crea una lista
            htmlNombres += '<ul class="lista">';
            // Imprimir cada Nombre
            nombres.forEach(function(nombre){ // Se concatena la lista li con ul
                htmlNombres += `
                    <li>${nombre.name}</li>  
                `;
            });
            htmlNombres += '</ul>'; // se cierra la lista

            // Se muestra en DOM
            document.getElementById('resultado').innerHTML = htmlNombres;
        }
    }
    // Enviar el REQUEST
    xhr.send();

}
// ? (es para enviar más arguments o parametros a la url)