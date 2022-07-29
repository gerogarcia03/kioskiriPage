
const productos = document.getElementById(`productos`);


let carrito = [];


const carritoCont = document.getElementById (`contenidoCarrito`);


// document.addEventListener(`DOMContentLoaded`, () => {
//     if(localStorage.getItem(`carrito`)){
//         carrito = JSON.parse(localStorage.getItem(`carrito`))
//         actualizarCart();
//     }
// })

const stock = 

fetch("/stock.json")
    .then( (response) => response.json() )
    .then( (stock) => {
        mostrarProd(stock)

//------------------------------------------------------------

function mostrarProd (stock) {
stock.forEach (stock => {
    
    const div = document.createElement(`div`);
    div.innerHTML = `
    <img src=${stock.img}>
    <h3> ${stock.name}</h3>
    <p> $${stock.price}</p>
    <button id="agregar ${stock.id}"><img class="carrito" src= "../images/carritocompras.png"</button>
    `
    productos.appendChild(div)
    
    const boton = document.getElementById(`agregar ${stock.id}`)

    boton.addEventListener(`click`, () => {

        addToCart(stock.id)
        swal.fire({
            title: `Tu producto ha sido añadido al carrito`,
            icon: `success`,
        })
    })

}) 
}


function addToCart (prodId) {

    const prodExist = carrito.some(prod => prod.id === prodId)

    if (prodExist) {
        carrito.map (prod => {
            if(prod.id === prodId){
                prod.cantidad++;
                prod.price++;
            }
        })
    }else {const prod = stock.find((prod) => prod.id === prodId)

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
        <button onclick= "eliminarProd(${prod.id})" class="deleteButton"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
        </svg>
        </button>
        ` 

        carritoCont.appendChild(div2)

        localStorage.setItem(`carrito`, JSON.stringify(carrito))


    }))

    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.price, 0)

}

function eliminarProd (prodId) {
    const prod = carrito.find((prod) => prod.id === prodId);
    const indice = carrito.indexOf(prod);
    carrito.splice(indice, 1);

    actualizarCart()
}
    })
