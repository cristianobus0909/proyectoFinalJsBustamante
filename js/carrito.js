const pintarCarrito = ()=>{
    carritoCompra.innerHTML = "";
    carritoCompra.style.display = "flex"
 // Crea el encabezado del carrito
    const mHeader = document.createElement("div");
    mHeader.className = "modal";
    mHeader.innerHTML = `
        <h1 class="modalTitulo">Mi Carrito </h1>
    `;

    carritoCompra.appendChild(mHeader);
// Agrega un botón para cerrar el carrito
    const cerrarCarrito = document.createElement("h2");
    cerrarCarrito.innerText = "X";

    cerrarCarrito.className = "botonXCarrito";

    cerrarCarrito.addEventListener("click", ()=>{
        carritoCompra.style.display = "none";
    });

    mHeader.appendChild(cerrarCarrito);
// Crea un elemento HTML para cada producto en el carrito
    carrito.forEach((prod)=>{
        
        let carritoContent = document.createElement("div");
        carritoContent.className = "modalContent";
        carritoContent.innerHTML = `
            <img src="${prod.img}">
            <h3>${prod.nombre}</h3>
            <p>$${prod.precio}</p>
            <span class="restar"> - </span>
            <p>${prod.cantidad}</p>
            <span class="sumar"> + </span>
            <p>Total:$${prod.cantidad * prod.precio}</p>
            <span class="deleteProduct"> ❌ </span>
        `;
        carritoCompra.appendChild(carritoContent);
// Agrega un evento para restar la cantidad de un producto
        let restaProd = carritoContent.querySelector(".restar");

        restaProd.addEventListener("click", () => {
            if (prod.cantidad !== 1) {
                prod.cantidad--;
            };
            guardarLocal();
            pintarCarrito();
        });
        // Agrega un evento para sumar la cantidad de un producto
        let sumaProd = carritoContent.querySelector(".sumar");
        sumaProd.addEventListener("click", () => {
            prod.cantidad++;
            guardarLocal();
            pintarCarrito();
        });
// Agrega un evento para eliminar un producto del carrito
        let eliminar = carritoContent.querySelector(".deleteProduct");

        eliminar.addEventListener("click", () => {
            eliminarProducto(prod.id);
            Toastify({
                text: `Eliminaste el producto ${prod.nombre} del carrito `,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right", 
                stopOnFocus: true,
                style: {
                background: "linear-gradient(to right, #0091b6, #013be9",
                },
                onClick: function(){}
            }).showToast();
        });

    })
     // Muestra el total de la compra
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalCompra = document.createElement("div");
    totalCompra.className = "totalCompra";
    totalCompra.innerHTML = `Total a pagar: $${total}`;
    carritoCompra.appendChild(totalCompra);
}
// Agrega un evento para mostrar el carrito
verCarrito.addEventListener("click", pintarCarrito);

// Elimina un producto del carrito
const eliminarProducto = (id)=>{
    const buscarId = carrito.find((element) => element.id === id);
    carrito = carrito.filter((carritoId) => {
        return carritoId !== buscarId;
    });
    cuentaCarrito();
    guardarLocal();
    pintarCarrito();
};

// Actualiza el número de productos en el carrito en la interfaz de usuario
const cuentaCarrito = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};
cuentaCarrito();