const stockProductos = [{id: 1, name: `Coca-Cola 500`, price: 70, cantidad: 1, img: `images/coca500.png`},
                        {id: 2, name: `Pepsi 1lt`, price: 120, cantidad: 1, img: `images/pepsi1lt.png`},
                        {id: 3, name: `Lays 140gr`, price: 80, cantidad: 1, img: `images/lays140.png`},
];

const productos = document.getElementById(`productos`);


let carrito = [];


const carritoCont = document.getElementById (`contenidoCarrito`);


document.addEventListener(`DOMContentLoaded`, () => {
    if(localStorage.getItem(`carrito`)){
        carrito = JSON.parse(localStorage.getItem(`carrito`))
        actualizarCart();
    }
})

//------------------------------

stockProductos.forEach ((producto) => {
    const div = document.createElement(`div`);
    div.classList.add(`productos`);
    div.innerHTML = `
    <img src=${producto.img}>
    <h3> ${producto.name}</h3>
    <p> ${producto.price}</p>
    <button id="agregar ${producto.id}"><img class="carrito" src= "images/carritocompras.png"</button>
    `
    productos.appendChild(div)
    
    const boton = document.getElementById(`agregar ${producto.id}`)

    boton.addEventListener(`click`, () => {
        addToCart(producto.id)
    })


}) 

function addToCart (prodId) {

    const prodExist = carrito.some(prod => prod.id === prodId)

    if (prodExist) {
        carrito.map (prod => {
            if(prod.id === prodId){
                prod.cantidad++;
            }
        })
    }else {const prod = stockProductos.find((prod) => prod.id === prodId)

    carrito.push(prod)
    actualizarCart();

    }
    actualizarCart();
}

const precioTotal = document.getElementById(`precio`)

function actualizarCart () {

    carritoCont.innerHTML = "";

    carrito.forEach ((prod => {
        const div2 = document.createElement(`div`)
        div2.classList.add(`prodEnCart`);
        div2.innerHTML = `
        <p>${prod.name}</p>
        <p> Precio: ${prod.price}</p>
        <p> Cantidad: ${prod.cantidad}</p>
        <button onclick="eliminarCarrito(${prod.id})" class="deleteButton"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
        </svg>
        </button>
        ` 

        carritoCont.appendChild(div2)
        
        localStorage.setItem(`carrito`, JSON.stringify(carrito))

    }))
    

    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.price, 0)

}

function eliminarCarrito (prodId) {
    const prod = carrito.find((prod) => prod.id ===prodId);
    const indice = carrito.indexOf(prod);
    carrito.splice(indice, 1);

    actualizarCart()
}
