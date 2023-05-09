// Seleccionamos los elementos HTML que vamos a utilizar
const market = document.getElementById("market");
const verCarrito = document.getElementById("verCarrito");
const carritoCompra = document.getElementById("carritoCompra")
const cantidadCarrito = document.getElementById("cantidadCarrito");

// Creamos un array de objetos con la información de los productos
const getProductos = async() => {
    const respuesta = await fetch("data.json");
    const data = await respuesta.json();
// Recorremos el array de productos y creamos un elemento HTML para cada uno de ellos
    data.forEach((prod) => {
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
};

getProductos();

// Creamos una variable carrito que se inicializa como un array vacío o se carga desde el localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];



// Actualizamos la información del carrito y lo guardamos en el localStorage
const guardarLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};
