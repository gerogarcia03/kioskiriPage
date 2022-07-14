const stock = [
    {id: 1 , name: `Coca-Cola 500` , price: 70 , cantidad: 1 , img: `../images/coca500.png` ,},
    {id: 2 , name: `Pepsi 1lt` , price: 120 , cantidad: 1 , img: `../images/pepsi1lt.png`},
    {id: 3 , name: `6 Pack Coca-Cola` , price: 450 , cantidad: 1 , img: `../images/6packcoca1lt.png`},
    {id: 4 , name: `6 Pack Pepsi 1lt` , price : 420 , cantidad: 1 , img: `../images/pepsi6pack.png`},
    {id: 5 , name: `Surtido Bagley` , price: 50 , cantidad: 1 , img: `../images/surtidobagley.png`},
    {id: 6 , name: `Sonrisas` , price: 70 , cantidad : 1 , img: `../images/sonrisas.png`},
    {id: 7 , name: `Melba` , price: 40 , cantidad : 1 , img: `../images/melba.png`},
    {id: 8 , name: `Beldent Infinit WowMint 14` , price: 80 , cantidad: 1 , img: `../images/beldent14.png`},
    {id: 9 , name: `Beldent Infinit BlueBerry 14` , price: 80 , cantidad : 1 , img: `../images/belden14blueberry.png`},
    {id: 10 , name: `Spearmint` , price: 170 , cantidad: 1 , img: `../images/spearmint.png`},
    {id: 11 , name: `Tubo Lays Original 140g` , price: 80 , cantidad: 1 , img: `../images/lays140.png`},
    {id: 12 , name: `Lays Jamon Serrano 85g` , price: 90 , cantidad: 1 , img: `../images/laysjamon.png`},
    {id: 13 , name: `Palitos Salados 120g` , price: 50 , cantidad: 1 , img: `../images/krachitos120.png`}
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

stock.forEach ((stock) => {
    
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
    const prod = carrito.find((prod) => prod.id === prodId);
    const indice = carrito.indexOf(prod);
    carrito.splice(indice, 1);

    actualizarCart()
}

