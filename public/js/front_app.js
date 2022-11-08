const stockProductos = [
  {
    id: 1,
    nombreAuto: "CX30 GRAN TOURING LX 2.5",
    cantidad: 1,
    textoLargo:
      "El nuevo sistema VVT-i Dual ofrece un control totalmente variable ángulo de inclinación lateral del vehículo....",
    precio: 1200,
    imagen: "img/1663901422097_CX30 ROJA.jpg",
  },
  {
    id: 2,
    nombreAuto: "CX9",
    cantidad: 1,
    textoLargo:
      "El nuevo sistema VVT-i Dual ofrece un control totalmente variable ángulo de inclinación lateral del vehículo....",
    precio: 1500,
    imagen: "img/MAZDA_NEGRO.png",
  },
  {
    id: 3,
    nombreAuto: "CX5 - GRAN TOURING 5",
    cantidad: 1,
    textoLargo:
      "El nuevo sistema VVT-i Dual ofrece un control totalmente variable ángulo de inclinación lateral del vehículo....",
    precio: 1570,
    imagen: "img/CX30 BLANCA - copia.jpg",
  },
];

let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const procesarCompra = document.querySelector("#procesarCompra");

// cuando el documetno este cargado , va al storage y si los hay muestra los documentos
document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  // mostrarCarrito();
  const autosseleccionados = [59, 69, 71, 72];
  autosseleccionados.forEach((id) => {
    fetch("http://localhost:3001/api/autos/" + id) //endpoint del API
      .then((response) => response.json())
      .then((auto) => {
        console.log(auto);
        const { id, nombreAuto, precio, textoLargo, cantidad, imagen } =
          auto.data;
        contenedor.innerHTML += `
                                <div class="hijos">
                                <article>
                                <h4 class="tituloReferencia" text-align: center;>
                                ${nombreAuto}
                                </h4>
                                <img src="/img/${imagen}" alt="">
                                <div class="main-article">
                                    <p class="price">Precio:
                                    ${precio}
                                    </p>
                                    <p class="price">Descuento:
                                    0%
                                    </p>
                                    <p class="Modelo">Modelo:
                                    2022
                                    </p>
                                    <br>
                                    <p class="Modelo"> Cilindraje:
                                    2500
                                    </div>
                                <div class="btn-home">
                                <button onclick="agregarProducto(${id})" class="btn btn-primary">Agregar al carrito</button>
                                </div>
                            </article>
                            </div>
    `;
      });
  });
});

/* stockProductos.forEach((prod) => {
    const { id, nombreAuto, precio, textoLargo, cantidad, imagen } = prod
    contenedor.innerHTML += `
                                <div class="hijos">
                                <article>
                                <h4 class="tituloReferencia" text-align: center;>
                                ${nombreAuto}
                                </h4>
                                <img src="${imagen}" alt="">
                                <div class="main-article">
                                    
                                    <p class="price">Precio:
                                    ${precio}
                                    </p>
                                    <p class="price">Descuento:
                                        0%
                                    </p>
                                    <p class="Modelo">Modelo:
                                        2022
                                    </p>
                                    <br>
                                    <p class="Modelo"> Cilindraje:
                                        2500
                                    </div>
                                    
                                <div class="btn-home">
                                <button onclick="agregarProducto(${id})" class="btn btn-primary">Agregar al carrito</button>
                                </div>
                            </article>
                            </div>
                            
    `
}) */

procesarCompra.addEventListener("click", () => {
  if (carrito.length == 0) {
    Swal.fire({
      title: "¡Tu carrito está vacio!",
      text: "Compra algo para continuar con la compra",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  } else {
    location.href = "compra";
  }
});

vaciarCarrito.addEventListener("click", () => {
  carrito.length = [];
  mostrarCarrito();
});

function agregarProducto(id, user_id, reference, quantity, price) {
  const payload = {
    auto_id: id,
    user_id: user_id,
    reference: reference,
    quantity: quantity,
    price: price,
  };

  fetch("http://localhost:3001/api/cart/create", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then(function (res) {
    console.log("RES: ", res.json());
    window.location.href = "/indexCarrito";
  });
  // mostrarCarrito()
}

function eliminarProductoCarrito(id) {
  fetch("http://localhost:3001/api/cart/delete/"+id, {
    method: "DELETE",
  }).then(function (res) {
    window.location.href = "/indexCarrito";
  });
  // mostrarCarrito()
}

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body"); // seleciona el nodo , el cualesta en la estrucutra de boostrap
  modalBody.innerHTML = "";
  carrito.forEach((prod) => {
    const { id, nombreAuto, precio, textoLargo, cantidad, imagen } = prod;
    modalBody.innerHTML += `
        <div class="modal-contenedor">
        <div>
        <img class="img-fluid img carrito" src="${imagen}"/>
        </div>
        <div>
        <p>Producto: ${nombreAuto}</p>
        <p>Precio: ${precio}</p>
        <p>Cantidad :${cantidad}</p>
        <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
        </div>
        `;
  });

  if (carrito.length == 0) {
    modalBody.innerHTML = `
   <p class="text-center text-primary parrafo">El carrito esta vacio ¡recuerda agregar el auto que deseas conducir!</p>

   `;
  } else {
    console.log("algo");
  }

  carritoContenedor.textContent = carrito.length;

  precioTotal.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );

  guardarStorage();
};

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId); // nos traemos todos los productos menos los que sean distintos al juegoID
  mostrarCarrito();
}

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function seguirComprando() {
  window.location.href = "/catalogo";
}
