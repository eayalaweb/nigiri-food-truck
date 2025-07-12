// JS UNA VEZ SE CARGE EN EL DOM

// recoger el html en constantes
// recoger todos los imputs a traves de la clase productos
const productos = document.getElementsByClassName("producto")
const tableItems = document.getElementById("tableItems")
const total = document.getElementById("total") //Span donde totalizo la compra


// recorrer en un FOR OF todos los product, en cada interación trabajare con cada uno 
for(const producto of productos){
    producto.addEventListener("change", function(){
        //   console.log(producto)

        // Recojo en constantes los datos de ese INPUT que a sufrido el evento CHANGE (nombre, id y precio)
        const id = producto.getAttribute("data-id")
        const nombre = producto.getAttribute("data-nombre")


        let precio = producto.getAttribute("data-precio") // es una variable para operar con ella
        let cantidad = "2"  //  luego vendria dinamico
        let totalLinea = 0 //  LA usaremos para multiplicar cantidad por precio unitario
        let totalCompraNuevo = 0 // Aqui calcularemos el nuevo total 
        

        let totalCompra = total.getAttribute("data-total") //  aqui tendremos el total como texto y en una data
        totalCompra = parseFloat(totalCompra) // Paso el valor a un número decimal para poder operar

        // GESTIÓN DEL TOTAL POR LINEA
        precio = parseFloat(precio)
        cantidad = parseFloat(cantidad)
        totalLinea = precio * cantidad



        // Condición para actuar en función de si el input esta o no checked
        if(producto.checked){
            // Si ese input esta checked añado a la tabla un nuevo TR (fila) con los TD y los datos de ese producto
            // console.log("el input ${id} lo han checkeado")

            // crear elementos HTML desde JS, para luego meter atributos y valores despues inyectarlos en el HTML

             // EM: Solo hemos creado TR entonces en el tbody tenemos que CREAR los TD 
            const tr = document.createElement("tr")
            const td1 = document.createElement("td")
            const td2 = document.createElement("td")
            const td3 = document.createElement("td")
            const td4 = document.createElement("td")
            const td5 = document.createElement("td")

            // asigno valores
            // EM: Aqui a cada TD le asignamos un constante que hace el evento mediante la data
            tr.setAttribute("id", id)
            td1.innerText = "#"
            td2.innerText = nombre
            td3.innerText = precio + "€"
            td4.innerText = cantidad
            td5.innerText = totalLinea + "€"
            // anidamiento appenChild
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)
            tr.appendChild(td5)
            tableItems.appendChild(tr)

            // Gestión del total de la compra (sumar)
            totalCompraNuevo = totalCompra + totalLinea
            total.setAttribute("data-total", totalCompraNuevo)
            total.innerText = totalCompraNuevo + "€"

        }else{

            // Si ese input NO esta checked, busco el TR que tenga el mismo ID de este data-id del input y lo quito
            // console.log("El input ${id} lo han descheckeado")
            document.getElementById(id).remove()

            // Gestión del total de la compra (restar)
            totalCompraNuevo = totalCompra - totalLinea
            total.setAttribute("data-total", totalCompraNuevo)
            total.innerText = totalCompraNuevo + "€"
        }

    })

}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// GESTION DE MODAL Y CLONACION DE TABLA
const botonPagar = document.getElementById("botonPagar")
const cerrar = document.getElementById("cerrar")
const modal = document.getElementById("modal")

const contenedorModal = document.getElementById("contenedorModal") 
const tablaPedidos = document.getElementById("tablaPedidos")
const totalFinal = document.getElementById("totalFinal")


// si se hace click sobre botonPedido, abro modal
botonPagar.addEventListener("click", function(){

    //Clono el html de la tabla con todos sus hijos(true)
    const tablaPedidosClonada = tablaPedidos.cloneNode(true)
    const totalCompraClonada = totalCompra.cloneNode(true)


    //Comprobamos si hay tabla y si la hay la quito

    const tablaAnterior = contenedorModal.querySelector('table')
    if(tablaAnterior){
        tablaAnterior.remove()
     
    }
    contenedorModal.insertBefore(tablaPedidosClonada, contenedorModal.children[2])
    contenedorModal.insertBefore(totalCompraClonada, contenedorModal.children[3])


    modal.style.display = "flex"

})
     
// si hago click sobre el boton de id close, se cierra
cerrar.addEventListener("click", function(){
    modal.style.display = "none"

})