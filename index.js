// ===================
// SECCIÓN: Barra menu
// ===================
const barra_navegacion = document.querySelectorAll("#header_navegacion li");
const Seccion_Buscar = document.getElementById("seccion_buscar");
const Seccion_Subir = document.getElementById("seccion_subir");
const Seccion_Favoritos = document.getElementById("seccion_favoritos");

barra_navegacion.forEach(elemento => {
    elemento.addEventListener("click", function () {
        if (elemento.textContent.toLowerCase() === "buscar imagen") {
            Seccion_Buscar.style.display = "block";
            Seccion_Subir.style.display = "none";
            Seccion_Favoritos.style.display = "none";

        } else if (elemento.textContent.toLowerCase() === "ver imagen") {
            Seccion_Subir.style.display = "block";
            Seccion_Buscar.style.display = "none";
            Seccion_Favoritos.style.display = "none";

        } else if (elemento.textContent.toLowerCase() === "favoritos") {
            Seccion_Favoritos.style.display = "block"
            Seccion_Buscar.style.display = "none";
            Seccion_Subir.style.display = "none";
            mostrarImagenesFavoritas();
        }
    });
});

// ===============================================
// SECCIÓN: Buscar IMG, Input, Botones atras y siguiente
// ===============================================
const Form_Buscar_Imagenes = document.getElementById("form_buscar_imagenes")
const Input_Buscar_Imagen = document.getElementById("input_buscar_imagen")
const Seccion_Imagenes = document.getElementById("seccion_imagenes")
const Div_Boton = document.getElementById("div_botones_atras_siguiente")

Form_Buscar_Imagenes.addEventListener("submit", function (evento) {
    evento.preventDefault()

    const result_imagen = Input_Buscar_Imagen.value
    console.log(result_imagen)

    imagenesDatos(result_imagen)

    Div_Boton.style.display = "block"
})

let pag_actual = 1
let cant_img_pag = 10

const Boton_Atras = document.getElementById("boton_atras")
Boton_Atras.addEventListener("click", function () {
    if (pag_actual > 1) {
        pag_actual--
        imagenesDatos(Input_Buscar_Imagen.value)
    }
})

const Boton_Siguiente = document.getElementById("boton_siguiente")
Boton_Siguiente.addEventListener("click", function () {
    pag_actual++
    imagenesDatos(Input_Buscar_Imagen.value)
})

// =========================================
// SECCIÓN: Mostrar datos por consola y html
// =========================================
const api_key_imagenes = "e9Tw0NXUg3IsH_GWH9c8DgNFbRb4JQqR8HPRwGJXY3k";

async function imagenesDatos(input) {
    const api = `https://api.unsplash.com/search/photos?query=${input}&client_id=${api_key_imagenes}&page=${pag_actual}&per_page=${cant_img_pag}`;

    try {
        const response = await fetch(api);
        const data = await response.json();

        Seccion_Imagenes.innerHTML = "";

        if (Array.isArray(data.results)) {
            data.results.forEach(elemento => {
                const div_imagen = document.createElement("div")
                div_imagen.classList.add("div_imagen")
                div_imagen.addEventListener("click", function () {
                    mostrarNodal(div_imagen)
                })

                const imagen = document.createElement("img");
                imagen.src = elemento.urls.regular;

                div_imagen.appendChild(imagen)
                Seccion_Imagenes.appendChild(div_imagen);
            });

        } else {
            console.error("La respuesta de la API no contiene un array de imágenes.");
        }

        console.log(data);

    } catch (error) {
        console.error(error);
    }
}

// =================================================
// SECCIÓN: Div Nodal, Iconos y Galeria de favoritos
// =================================================
function mostrarNodal(elemento) {
    const div_modal = document.getElementById("div_modal");
    div_modal.style.display = "block";

    const imagen_modal = document.getElementById("imagen_modal");
    imagen_modal.src = elemento.querySelector("img").src;
}

function cerrarModal() {
    const div_modal = document.getElementById("div_modal");
    div_modal.style.display = "none";
}

let imagenes_favoritas = [];
const icono_corazon = document.getElementById("icon_heart");

icono_corazon.addEventListener("click", function () {
    const imagen_modal = document.getElementById("imagen_modal");
    const imagen_src = imagen_modal.src;

    //Vefifica si el array incluye un elemento especifico
    const esFavorita = imagenes_favoritas.includes(imagen_src);

    if (!esFavorita) {
        imagenes_favoritas.push(imagen_src);
        icono_corazon.style.color = "red";
        
    } else {
        imagenes_favoritas = imagenes_favoritas.filter(img => img !== imagen_src);
        icono_corazon.style.color = "white";
    }

    console.log(imagenes_favoritas);
});

const icon_download = document.getElementById("icon_download")

icon_download.addEventListener("click", async function () {
    const imagen_modal = document.getElementById("imagen_modal")
    const imagen_modal_scr = imagen_modal.src

    try {
        const response = await fetch(imagen_modal_scr)
        const blob = await response.blob()
        
        const enlace_descarga = document.createElement("a");
        enlace_descarga.href = URL.createObjectURL(blob);
        enlace_descarga.download = "image_download";

        document.body.appendChild(enlace_descarga);
        enlace_descarga.click();

        // Se elimina después de la descarga
        document.body.removeChild(enlace_descarga);

    } catch (error) {
        console.error(error)
    }

})

function mostrarImagenesFavoritas() {
    const contenedor_favoritos = document.getElementById("contenedor_favoritos");

    contenedor_favoritos.innerHTML = "";

    imagenes_favoritas.forEach(imagen_src => {
        const div_imagen_favorita = document.createElement("div");
        div_imagen_favorita.classList.add("div_imagen_favorita");
        div_imagen_favorita.addEventListener("click", function () {
            mostrarNodalFav(div_imagen_favorita)
        })

        const imagen_favorita = document.createElement("img");
        imagen_favorita.src = imagen_src;

        div_imagen_favorita.appendChild(imagen_favorita);
        contenedor_favoritos.appendChild(div_imagen_favorita);
    });
}

// ===============================
// SECCIÓN: Div Nodal Fav y Iconos
// ===============================
function mostrarNodalFav(elemento_fav) {
    const div_modal_fv = document.getElementById("div_modal_fv");
    div_modal_fv.style.display = "block";

    const imagen_modal_fv = document.getElementById("imagen_modal_fv");
    imagen_modal_fv.src = elemento_fav.querySelector("img").src;
}

function cerrarModalFav() {
    const div_modal_fv = document.getElementById("div_modal_fv");
    div_modal_fv.style.display = "none";
}

const icono_basura = document.getElementById("icon_trash")
icono_basura.addEventListener("click",function () {
    const imagen_modal_fv = document.getElementById("imagen_modal_fv");
    const imagen_modal_fv_src = imagen_modal_fv.src;

    //Buscara la posicion de la imagen en el array
    const indice = imagenes_favoritas.indexOf(imagen_modal_fv_src);

    if (indice !== -1) {
        imagenes_favoritas.splice(indice, 1); // Elimina la imagen del array
        mostrarImagenesFavoritas();
    }

    cerrarModalFav();

})

const icono_imagen_fv = document.getElementById("icon_download_fv")
icono_imagen_fv.addEventListener("click", async function () {
    const imagen_modal_fv = document.getElementById("imagen_modal_fv")
    const imagen_modal_fv_src = imagen_modal_fv.src

    try {
        const response = await fetch(imagen_modal_fv_src);
        const blob = await response.blob();

        const enlace_descarga = document.createElement("a");
        enlace_descarga.href = URL.createObjectURL(blob);
        enlace_descarga.download = "image_download";

        document.body.appendChild(enlace_descarga);
        enlace_descarga.click();

        // Se elimina después de la descarga
        document.body.removeChild(enlace_descarga);
        
    } catch (error) {
        console.error(error);
    }

})

// ==================
// SECCIÓN: Subir IMG
// ==================
const Input_Subir_Imagen = document.getElementById("input_subir_imagen");
const Imagen_ver = document.getElementById("imagen_ver");

Input_Subir_Imagen.onchange = (e) => {
    if (Input_Subir_Imagen.files[0]) {
        Imagen_ver.src = URL.createObjectURL(Input_Subir_Imagen.files[0]);
    }
};