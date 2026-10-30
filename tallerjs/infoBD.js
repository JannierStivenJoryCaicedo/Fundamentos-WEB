// --- EJEMPLO MÓDULO 5: CLASES Y OBJETOS ---
class ProductoEspacial {
    constructor(nombre, precio, stock, exportable) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.exportable = exportable;
    }

    // Método para vender unidades


    /**
 * Realiza la venta de una cantidad específica de producto.
 * Valida el stock, calcula el total, descuenta las unidades, notifica y actualiza la UI.
 * 
 * @param {number} cantidad - [ENTRADA] La cantidad de unidades que se desean vender.
 * @returns {void} [SALIDA] Este método no retorna ningún valor; sus efectos son secundarios (modifica el estado y la interfaz).
 */

    vender(cantidad) {
        // --- EJEMPLO MÓDULO 2: CONDICIONALES ---
        if (this.stock >= cantidad) {
            // --- EJEMPLO MÓDULO 4: FUNCIONES (Lógica integrada) ---
            let total = this.calcularTotal(cantidad);
            this.stock -= cantidad;

            imprimirEnConsola(`VENTA EXITOSA: Se vendieron ${cantidad} unidades de ${this.nombre}. Total: ${total} créditos. Stock restante: ${this.stock}`);
            actualizarInterfaz();
        } else {
            imprimirEnConsola(`❌ ERROR: No hay suficiente stock de ${this.nombre}. Solicitado: ${cantidad}, Disponible: ${this.stock}`);
        }
    }

    /**
 * Calcula el costo total de la venta aplicando un descuento del 10% 
 * si la cantidad de unidades compradas es mayor a 5.
 * 
 * @param {number} cantidad - [ENTRADA] La cantidad de unidades a calcular.
 * @returns {number} [SALIDA] El costo total final con o sin descuento aplicado (en créditos o moneda base).
 */

    calcularTotal(cantidad) {
        // Calculamos el costo base multiplicando el precio unitario por la cantidad
        let totalBruto = this.precio * cantidad;
        // Descuento del 10% si lleva más de 5 unidades
        if (cantidad > 5) {
            totalBruto = totalBruto * 0.9;
        }
        return totalBruto;
    }
}

// --- EJEMPLO MÓDULO 3: ARRAYS Y BUCLES ---
const inventario = [
    new ProductoEspacial("Cristales de Litio", 150, 10, true),
    new ProductoEspacial("Raciones de Plasma", 45, 25, true),
    new ProductoEspacial("Combustible Antimateria", 500, 3, false),
    new ProductoEspacial("latas de atun", 250, 1, true)

];

// Función para renderizar los productos en la página HTML
function actualizarInterfaz() {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = ""; // Limpiar pantalla

    // Bucle para recorrer el array y dibujar las tarjetas
    for (let i = 0; i < inventario.length; i++) {
        const prod = inventario[i];
        contenedor.innerHTML += `
                    <div class="card">
                        <h3>${prod.nombre}</h3>
                        <p><strong>Precio:</strong> ${prod.precio} 🪙</p>
                        <p><strong>Stock:</strong> ${prod.stock} uds</p>
                        <p><strong>Exportable:</strong> ${prod.exportable ? '✅ Sí' : '🚫 No'}</p>
                    </div>
                `;
    }
}

// Función auxiliar para simular clics desde los botones
function simularVenta(nombreProducto, cantidad) {
    const producto = inventario.find(p => p.nombre === nombreProducto);
    if (producto) {
        producto.vender(cantidad);
    }
}

// Función para simular una consola de texto en la pantalla HTML
function imprimirEnConsola(mensaje) {
    const consola = document.getElementById("consola-web");
    consola.innerHTML += `> ${mensaje}<br>`;
    consola.scrollTop = consola.scrollHeight; // Auto-scroll hacia abajo
}

// Inicializar la pantalla al cargar la página
actualizarInterfaz();