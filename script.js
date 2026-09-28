const boton = document.querySelector("#btnPedido");
const pedido = document.querySelector("#pedido");
const producto = document.querySelector("#producto");
const cantidad = document.querySelector("#cantidad");
const total = document.querySelector("#total");
const agregarProducto = document.querySelector("#agregarProducto");
const listaPedido = document.querySelector("#listaPedido");

let productos = [];

boton.addEventListener("click", function() {
    pedido.style.display = "block";
});

agregarProducto.addEventListener("click", function() {
    const nombreProducto = producto.options[producto.selectedIndex].text;
    const precio = Number(producto.value);
    const cantidadSeleccionada = Number(cantidad.value);

    productos.push({
        nombre: nombreProducto,
        precio: precio,
        cantidad: cantidadSeleccionada
    });

    mostrarPedido();
});

function mostrarPedido() {
    listaPedido.innerHTML = "";

    let totalPedido = 0;

    productos.forEach(function(item, indice) {
        const subtotal = item.precio * item.cantidad;
        totalPedido += subtotal;

        const elemento = document.createElement("div");

        elemento.innerHTML = `
            <p>
                ${item.nombre} x${item.cantidad} = $${subtotal} MXN
                <button onclick="eliminarProducto(${indice})">Eliminar</button>
            </p>
        `;

        listaPedido.appendChild(elemento);
    });

    total.textContent = totalPedido;
}
function eliminarProducto(indice) {
    productos.splice(indice, 1);
    mostrarPedido();
}
const confirmarPedido = document.querySelector("#confirmarPedido");
const datosCliente = document.querySelector("#datosCliente");

confirmarPedido.addEventListener("click", function() {
    if (productos.length === 0) {
        alert("Agrega al menos un producto antes de confirmar.");
        return;
    }

    datosCliente.style.display = "block";
});
const finalizarPedido = document.querySelector("#finalizarPedido");

finalizarPedido.addEventListener("click", function() {
    const nombre = document.querySelector("#nombreCliente").value.trim();
    const direccion = document.querySelector("#direccionCliente").value.trim();
    const telefono = document.querySelector("#telefonoCliente").value.trim();

    if (nombre === "" || direccion === "" || telefono === "") {
        alert("Por favor, completa todos los datos.");
        return;
    }

    let resumen = `PEDIDO - RESTAURANTE SABOR\n\n`;
    resumen += `Cliente: ${nombre}\n`;
    resumen += `Dirección: ${direccion}\n`;
    resumen += `Teléfono: ${telefono}\n\n`;
    resumen += `Productos:\n`;

    productos.forEach(function(item) {
        const subtotal = item.precio * item.cantidad;
        resumen += `${item.nombre} x${item.cantidad} - $${subtotal} MXN\n`;
    });

    resumen += `\nTOTAL: $${total.textContent} MXN`;

    alert(resumen);
});