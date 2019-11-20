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

    // Conectar con fetch API
    // Es mejor con fetch api que ocn AJAX

    fetch(url)
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            let html = `<h2>Babys Names</h2>`;
            html += `<ul class="lista">`;
            data.forEach(function(nombre){
                html += `
                    <li>${nombre.name}</li>
                `;
            })
            html += `</ul>`;
            document.querySelector('#resultado').innerHTML = html;
        })
        .catch(function(error){
            console.log(error);
        })
}
// ? (es para enviar más arguments o parametros a la url)