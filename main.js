//Button cifrar, button descifrar, button copia, textarea ingreso, textarea salida
let btnCifrar = document.querySelector("#btn-cifrar");
let btnDescifrar = document.querySelector("#btn-descifrar");
let btnCopia = document.querySelector("#btn-copia");
let ingreso = document.querySelector("#ingreso");
let salida  = document.querySelector("#salida");

//Elemento completo del joven y carteles
let cajaJoven = document.querySelector(".caja-joven");

//Regex para validar 
//Podriamos admitir algunos caracteres especiales
//const regex = /^[[a-z0-9 .,;*+\-!¡¿?"#@°<>%/$]+$
const regex = /^[a-z0-9 !¡¿?]+$/;
const letrasEncriptar =[
    {"letra":"a","reemplazo":"ai"},
    {"letra":"e","reemplazo":"enter"},
    {"letra":"i","reemplazo":"imes"},
    {"letra":"o","reemplazo":"ober"},
    {"letra":"u","reemplazo":"ufat"},
]

//Funcion que valida el texto de entrada vacio o con mayusculps o acentos. 
function validarTexto(texto){
    let valido = false;
    if(texto !=""){
        //Valida Mayusculas y acentos
        if(regex.test(texto)){
            valido = true;
        }
    }
    return valido;
}

//Oculta el elemento
function ocultar(elemento){
    elemento.classList.add('invisible');
}

//Muestra el elemento
function mostrar(elemento){
    elemento.classList.remove('invisible');
}

//funcion de encriptacion 
function encriptar(texto){
    let textoEncriptado="";

    // Revisamos cada letra del texto original
    for (let index = 0; index < texto.length; index++) {
        let i = 0;
        let hayReemplazo = false;
        while(!hayReemplazo && (i < letrasEncriptar.length)){
            // Si exite la letra en el texto, pegamos la encriptacion de la letra en el texto encriptado.
            if(letrasEncriptar[i].letra == texto[index]){
                hayReemplazo = true;
                textoEncriptado+= letrasEncriptar[i].reemplazo;
            }
            i++;
        }
        // Si no se reemplazo alguna letra solo se mantiene la letra origianl.
        if(!hayReemplazo){
            textoEncriptado+=texto[index];
        }
    }
    return textoEncriptado;
}   

//funcion de desencriptacion
function desencriptar(textoEncriptado){
    let textoOrginal="";
    let index = 0;
    while (index < textoEncriptado.length) {

        let i = 0;
        let hayReemplazo = false;
        while(!hayReemplazo && (i < letrasEncriptar.length)){
            if(letrasEncriptar[i].letra == textoEncriptado[index]){
                // Cortamos del string el fragmento encriptado que pertenece a una letra.
                let parteEncontrada = textoEncriptado.substring(index,index+letrasEncriptar[i].reemplazo.length);
                // Si la parte encontrada es una encriptacion de la letra
                if ( parteEncontrada == letrasEncriptar[i].reemplazo ){
                    // Pegamos la letra en el texto original.
                    textoOrginal+= letrasEncriptar[i].letra;
                    //Reubicamos el indice para que siga revisando el texto.
                    index+=letrasEncriptar[i].reemplazo.length;
                    hayReemplazo = true;
                }
            }
            i++;
        }
        if(!hayReemplazo){
            textoOrginal+=textoEncriptado[index];
            index++;
        }
    }
    return textoOrginal;
}

//Funcion mostrar salida cuando se encripta/desencripta 
function mostrarSalidaValida(textoSalida){
    ingreso.value="";
    salida.value = textoSalida;
    mostrar(salida);
    mostrar(btnCopia);
    ocultar(cajaJoven);
}
/**Funcion mostrar salida cuando el texto no sea valido */
function mostrarSalidaInvalida(){
    ocultar(salida);
    salida.value = "";
    mostrar(cajaJoven);
    ocultar(btnCopia);
}
//Funcion mostrar salida  cuando se desencripta un exto
function desencriptarTexto(){
    let textoEntrada = ingreso.value;
    if(validarTexto(textoEntrada)){
        mostrarSalidaValida(desencriptar(textoEntrada));
    }else{
        mostrarSalidaInvalida();
        alert("Texto no valido");
    }
}
//Funcion mostrar salida  cuando se desencripta un exto
function encriptarTexto(){
    let textoEntrada = ingreso.value;
    if(validarTexto(textoEntrada)){
        mostrarSalidaValida(encriptar(textoEntrada));
    }else{
        mostrarSalidaInvalida();
        alert("Texto no valido");
    }
}
//Funcion copiar en portapapeles
function copiarSalida(){
	navigator.clipboard.writeText(salida.value);
	//Avisar pop up que se copio
    alert("Se copio en portapapeles." );
}


//Seteando el evento del boton encriptar 
btnCifrar.addEventListener("click", encriptarTexto);

//Seteando el evento del boton desencriptar 
btnDescifrar.addEventListener("click", desencriptarTexto);

//Seteando el evento del boton copiar 
btnCopia.addEventListener("click", copiarSalida);