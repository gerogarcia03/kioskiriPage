const productos = document.getElementById(`productos`);

let carrito = [];

const carritoCont = document.getElementById(`contenidoCarrito`);

document.addEventListener(`DOMContentLoaded`, () => {
  if (localStorage.getItem(`carrito`)) {
    carrito = JSON.parse(localStorage.getItem(`carrito`));
    actualizarCart();
  }
});

const stockProductos = fetch("/stock2.json")
  .then((response) => response.json())
  .then((stock) => {
    mostrarProd(stock);

    //------------------------------
    function mostrarProd(stock) {
      stock.forEach((producto) => {
        const div = document.createElement(`div`);
        div.classList.add(`productos`);
        div.innerHTML = `
    <img src=${producto.img}>
    <h3> ${producto.name}</h3>
    <p> $${producto.price}</p>
    <button id="agregar ${producto.id}"><img class="carrito" src= "images/carritocompras.jpg"</button>
    `;
        productos.appendChild(div);

        const boton = document.getElementById(`agregar ${producto.id}`);

        boton.addEventListener(`click`, () => {
          addToCart(producto.id);

          
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1500,
            background: `antiquewhite`,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            title: `Tu producto ha sido añadido al carrito`,
            icon: `success`,
          });
        });
      });
    }

    function addToCart(prodId) {
      const prodExist = carrito.some((prod) => prod.id === prodId);

      if (prodExist) {
        carrito.map((prod) => {
          if (prod.id === prodId) {
            prod.cantidad++;
          }
        });
      } else {
        const prod = stock.find((prod) => prod.id === prodId);

        carrito.push(prod);
        actualizarCart();
      }
      actualizarCart();
    }
  });

const precioTotal = document.getElementById(`precio`);

function actualizarCart() {
  carritoCont.innerHTML = "";

  carrito.forEach((prod) => {
    const div2 = document.createElement(`div`);
    div2.classList.add(`prodEnCart`);
    div2.innerHTML = `
        <p> <strong> ${prod.name} </strong> </p>
        <p> <strong> Precio: </strong> ${prod.price}</p>
        <p> <strong> Cantidad: </strong> ${prod.cantidad}</p>

        <button onclick="restarCantidad (${prod.id})" class="cant"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
        </svg>
        </button>
        <button onclick="sumarCantidad (${prod.id})"  class="cant"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
        </button>
        <button onclick="eliminarCarrito(${prod.id})" class="deleteButton"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
        </svg>
            </button>
            `;

    carritoCont.appendChild(div2);
  });

  localStorage.setItem(`carrito`, JSON.stringify(carrito));

  precioTotal.innerText = carrito.reduce((acc, prod)=> acc + prod.price * prod.cantidad, 0)
}

function eliminarCarrito(prodId) {

  swal.fire({
    title: '¿Desea eliminar el producto?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar'
  }) .then(( result)  => {
    if( result.isConfirmed ){
      
      const prod = carrito.find((prod) => prod.id === prodId)
      const indice = carrito.indexOf(prod)
      carrito.splice(indice, 1)

    }
    actualizarCart();
  })

  actualizarCart();
}

function sumarCantidad(prodId) {

  const sum = carrito.some((prod) => prod.id === prodId);

  if (sum){
    carrito.map((prod) => {
      if (prod.id === prodId){
        do (
        prod.cantidad++
        );while ( prod.cantidad <= -1 )
      }
    })
    actualizarCart();
  }
}

function restarCantidad(prodId) {
  const res = carrito.some((prod) => prod.id === prodId);

  if (res){

    carrito.map((prod) => {

      if (prod.id === prodId){
       do(
        prod.cantidad--
      );while( prod.cantidad <= -1)

      if(prod.cantidad === 0){

        prod.cantidad++;
        swal.fire({
          title: '¿Desea eliminar el producto?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Eliminar'
        }).then((result) => {
          if(result.isConfirmed){
            
            const prod = carrito.find((prod) => prod.id === prodId)
            const i = carrito.indexOf(prod)
            carrito.splice(i, 1)

          }
          actualizarCart();
        })
      }
      }
    })
    actualizarCart();
  }
}
