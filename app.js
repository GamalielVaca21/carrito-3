const items             =document.getElementById('items')
const templateCard      =document.getElementById('template-card').content
const fragmento         =document.createDocumentFragment()

let carrito = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})

items.addEventListener('click', e => {
    addCarrito(e)
})

const fetchData = async () => {
    try{
        const  res = await fetch('api.json')
        const  data = await res.json()
        mostrarProductos(data)
    }catch (error) {
        console.log(error)
    }
}
// Metodo Mostrar Productos
    const mostrarProductos = data => {
        console.log(data)
         data.forEach(producto => {
            templateCard.querySelector('h5').textContent = producto.title
            templateCard.querySelector('p').textContent = producto.precio
            templateCard.querySelector('img').setAttribute("src", producto.thumbnailURL)
            templateCard.querySelector('.btn-dark').dataset.id = producto.id
            const clone = templateCard.cloneNode(true)
            fragmento.appendChild(clone)
         });
        items.appendChild(fragmento)
}

const addCarrito = e => {

    if (e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    const producto ={
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }
    if (carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id] = {...producto}

    console.log(carrito)
}