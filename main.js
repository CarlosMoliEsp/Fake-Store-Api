indice();
document.addEventListener("DOMContentLoaded", traerProductos);
const contenedor = document.querySelector("#contenedor");
let respuesta;
let nproductos = 8;

let carrito;
crearCarrito();

async function crearCarrito() {
  await fetch('https://fakestoreapi.com/carts', {
    method: "POST",
    body: JSON.stringify(
      {
        userId: 1,
        date: 2023 - 02 - 03,
        products: [{ productId: 1, quantity: 1 }]
      }
    )
  })
    .then(res => res.json())
    .then(json => carrito = json)


}

// Funcion para obtener los productos
async function traerProductos() {
  const url = "https://fakestoreapi.com/products?limit=" + nproductos;

  try {
    // await bloquea la ejecucion del codigo y hasta que no se resuelva no va  a ejecutarse el resultado
    // fetch coger esa parte
    const resultado = await fetch(url);
    respuesta = await resultado.json();
    console.log(respuesta);
    pintarProductos(respuesta);
  } catch (error) {
    console.log(error);
  }
}

// Funcio para mostrar los productos
function pintarProductos(productos) {
  document.getElementById("contenedor").innerHTML = "";
  // console.log(productos);

  productos.forEach((prod) => {
    const { id, title, price, image } = prod;
    document.getElementById("contenedor").innerHTML += `
    <div class="col-3">
        <div class="card" style="width: 18rem;">    
          <img class="card-img-top" src="${image}" alt="Card image cap" with="200px" height="300px">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-subtitle mb-2 text-muted">Precio: ${price} €</p>

            <a href="#" onclick='añadirCarrito(${id})' class="btn btn-primary add-to-cart">Añadir al carrito</a>
    
          </div>
        </div>      
    </div>             
        `;
  });
}
// Scroll infinito
$(window).scroll(function () {
  console.log($(window).scrollTop());
  if (
    $(window).scrollTop() + $(window).height() >=
    $(document).height() - 100
  ) {
    nproductos = nproductos + 8;
    alert("Esta cargando los productos espere porfavor");

    console.log("scroll productos " + nproductos);

    traerProductos();
  }
});

// Funcion para comprar un producto 
function añadirCarrito(id) {
  console.log(id);
  fetch('https://fakestoreapi.com/carts/' + carrito.id, {
    method: "PUT",
    body: JSON.stringify(
      {
        userId: 5,
        date: 2019 - 12 - 10,
        products: [{ productId: id, quantity: 1 }]
      }
    )
  })
    .then(res => res.json())
    .then(json => console.log(json))

  // Como poner el id
  alert("El producto con  se ha añadido al carrito");
}
// Categoria Electronics
fetch('https://fakestoreapi.com/products/category/electronics')
  .then(res => res.json())
  .then(json => categoria1 = json)
function muestraCategoria(j) {
  for (i = 0; i < j.length; i++) {
    document.getElementById("categorias").innerHTML += `
      <div class="col-2">
          <div class="card" style="width: 10rem;">    
              <img class="card-img-top" src="${j[i].image}" alt="Card image cap" with="100px" height="100px">
              <div class="card-body">
                  <h5 class="card-title">${j[i].title}</h5>
                  <p class="card-subtitle mb-2 text-muted">Precio: ${j[i].price} $</p>
                  <h5 class="card-title">${j[i].category}</h5>


                  <button onclick="" class="btn btn-primary"> Ver </button>
                  <a href="#" class="btn btn-primary">Comprar</a>
              </div>
          </div> 
      </div> 
      `;
  }
}
// Categoria Hombre
fetch("https://fakestoreapi.com/products/category/men's clothing")
  .then(res => res.json())
  .then(json => categoria2 = json)
function muestraCategoria(j) {
  for (i = 0; i < j.length; i++) {
    document.getElementById("categorias").innerHTML += `
      <div class="col-2">
          <div class="card" style="width: 15rem;">    
              <img class="card-img-top" src="${j[i].image}" alt="Card image cap" with="200px" height="300px">
              <div class="card-body">
                  <h5 class="card-title">${j[i].title}</h5>
                  <p class="card-subtitle mb-2 text-muted">Precio: ${j[i].price} $</p>
                  <h5 class="card-title">${j[i].category}</h5>


                  <button onclick="" class="btn btn-primary"> Ver </button>
                  <a href="#" class="btn btn-primary">Comprar</a>
              </div>
          </div> 
      </div> 
      `;
  }
}
// Categoria Mujer
fetch("https://fakestoreapi.com/products/category/women's clothing")
  .then(res => res.json())
  .then(json => categoria3 = json)
function muestraCategoria(j) {
  for (i = 0; i < j.length; i++) {
    document.getElementById("categorias").innerHTML += `
      <div class="col-2">
          <div class="card" style="width: 15rem;">    
              <img class="card-img-top" src="${j[i].image}" alt="Card image cap" with="200px" height="300px">
              <div class="card-body">
                  <h5 class="card-title">${j[i].title}</h5>
                  <p class="card-subtitle mb-2 text-muted">Precio: ${j[i].price} $</p>
                  <h5 class="card-title">${j[i].category}</h5>


                  <button onclick="" class="btn btn-primary"> Ver </button>
                  <a href="#" class="btn btn-primary">Comprar</a>
              </div>
          </div> 
      </div> 
      `;
  }
}
// Categoria joya
fetch('https://fakestoreapi.com/products/category/jewelery')
  .then(res => res.json())
  .then(json => categoria4 = json)
function muestraCategoria(j) {
  for (i = 0; i < j.length; i++) {
    contenedor.innerHTML += `
      <div class="col-2">
          <div class="card" style="width: 15rem;">    
              <img class="card-img-top" src="${j[i].image}" alt="Card image cap" with="200px" height="300px">
              <div class="card-body">
                  <h5 class="card-title">${j[i].title}</h5>
                  <p class="card-subtitle mb-2 text-muted">Precio: ${j[i].price} $</p>
                  <h5 class="card-title">${j[i].category}</h5>

                  <button onclick="" class="btn btn-primary"> Ver </button>
                  <a href="#" class="btn btn-primary">Comprar</a>
              </div>
          </div> 
      </div> 
      `;
  }
}

// MOSTRAR POR CAPAS
document.getElementById("indice").addEventListener("click", indice);
function indice() {
  limpiarCapas();
  document.getElementById("contenedor").innerHTML =
    "<h1>Estas en el Inicio de la tienda</h1>";
}
// Funcion para vaciar las capas
function limpiarCapas(){
  document.getElementById("contenedor").innerHTML = "";
  document.getElementById("categorias").innerHTML = "";
}


// Capa de Productos
document.getElementById("Productos").addEventListener("click", function () {
  pintarProductos(respuesta);
});


// Capa de Elctronica
document.getElementById("electronica").addEventListener("click", function () {
  limpiarCapas();
  muestraCategoria(categoria1);
});
// Capa de la Ropa de Hombre
document.getElementById("hombre").addEventListener("click", function () {
  limpiarCapas();
  muestraCategoria(categoria2);
});
// Capa de la Ropa de Mujer
document.getElementById("mujer").addEventListener("click", function () {
  limpiarCapas();
  muestraCategoria(categoria3);
});
// Capa de joyas
document.getElementById("joyas").addEventListener("click", function () {
  limpiarCapas();
  muestraCategoria(categoria4);
});


// Capa de carrito
document.getElementById("carrito").addEventListener("click", function () {
  limpiarCapas();
  fetch('https://fakestoreapi.com/carts')
    .then(res => res.json())
    .then(json => console.log(json))
});


