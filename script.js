// Seleccionamos los elementos HTML que vamos a utilizar
const market = document.getElementById("market");
const verCarrito = document.getElementById("verCarrito");
const carritoCompra = document.getElementById("carritoCompra")
const cantidadCarrito = document.getElementById("cantidadCarrito");

// Creamos un array de objetos con la información de los productos
const productos = [
    {
        id: 1,
        nombre:"leche",
        unidad:"1L",
        precio:"250",
        img:"./img/11155.jpg",
        cantidad: 1
    },
    {
        id: 2,
        nombre:"huevo",
        unidad:"maple",
        precio:"1300",
        img:"./img/20201069.webp",
        cantidad: 1
    },
    {
        id: 3,
        nombre:"aceite",
        unidad:"1L",
        precio:"1800",
        img:"./img/9423.jpg",
        cantidad: 1
    },
    {
        id: 4,
        nombre:"fideo",
        unidad:"1L",
        precio:"500",
        img:"./img/431_1.jpg",
        cantidad: 1
    },
    {
        id: 5,
        nombre:"harina",
        unidad:"1kg",
        precio:"250",
        img:"./img/1112-MAROLIO-HARINA-000-1-KG.png",
        cantidad: 1
    },
    {
        id: 6,
        nombre:"carne",
        unidad:"1kg",
        precio:"1600",
        img:"./img/cocinar-la-carne-de-vacuno.jpg",
        cantidad: 1
    }

];

// Creamos una variable carrito que se inicializa como un array vacío o se carga desde el localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Recorremos el array de productos y creamos un elemento HTML para cada uno de ellos
productos.forEach((prod) => {
    // Creamos un elemento div con la clase cardProd y cargamos en él la información del producto
    let gondola = document.createElement("div");
    gondola.className = "cardProd";
    gondola.innerHTML = `
        <img src="${prod.img}">
        <h3>${prod.nombre}</h3>
        <h4>${prod.unidad}</h4>
        <p>$${prod.precio}</p>
    `;
    // Agregamos el elemento gondola al elemento market
    market.appendChild(gondola);

    // Creamos un botón comprar para cada producto
    let comprar = document.createElement("button");
    comprar.className = "comprar";
    comprar.innerText = "comprar";

    // Agregamos el botón comprar al elemento gondola
    gondola.appendChild(comprar);
    
    // Agregamos un evento click al botón comprar que agrega el producto al carrito
    comprar.addEventListener("click", () => {
        const repeat = carrito.some((repeatProduct) => repeatProduct.id === prod.id);

        // Si el producto ya está en el carrito, aumentamos su cantidad
        repeat ? carrito.map((producto) => producto.id === prod.id && producto.cantidad++) : carrito.push({
            // Si el producto no está en el carrito, lo agregamos
            id: prod.id,
            img: prod.img,
            nombre: prod.nombre,
            precio: prod.precio,
            cantidad: prod.cantidad,
        }) && (console.log(carrito), console.log(carrito.length), cuentaCarrito(), guardarLocal());
    });
    
});

// Actualizamos la información del carrito y lo guardamos en el localStorage
const guardarLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};
