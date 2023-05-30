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
async function login() {
  await fetch('https://fakestoreapi.com/users')
    .then(res => res.json())
    .then(json => { comprueba(json) })

}
function comprueba(j) {
  let salir = true;
  let i = 0;
  const usuario = document.getElementById('email').value;
  const clave = document.getElementById('password').value;
  // m38rmF$
  console.log("Login");
  console.log(j);
  while(i < j.length && salir){
    if(j[i].username == usuario && j[i].password == clave)
      salir = false;
    i++;
  }
  console.log(salir);
  // Operador ternario
  alert(salir == false?'El usuario es correcto' : 'El usuario es invalido');
}
document.getElementById("login").addEventListener("click", function () {
  limpiarCapas();
  pintarLogin();
});
function pintarLogin(){
  document.getElementById("contenedor").innerHTML = "";
  // console.log(productos);
    document.getElementById("contenedor").innerHTML =`
    <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">El usuario debe existir en la Api</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="password" placeholder="Password">
  </div>
  <a href="#" onclick='login()' class="btn btn-primary">Submit</a>

</form>            
        `;
}

// Registrar
async function register() {
  fetch('https://fakestoreapi.com/users',{
            method:"POST",
            body:JSON.stringify(
                {
                    email:document.getElementById('usuario').value,
                    username:'johnd',
                    password:document.getElementById('contrasena').value,
                    name:{
                        firstname:document.getElementById('nombre').value,
                        lastname:document.getElementById('apellidos').value
                    },
                    address:{
                        city:'kilcoole',
                        street:'7835 new road',
                        number:3,
                        zipcode:'12926-3874',
                        geolocation:{
                            lat:'-37.3159',
                            long:'81.1496'
                        }
                    },
                    phone:'1-570-236-7033'
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
            alert("Usuario registrado");

}
document.getElementById("register").addEventListener("click", function () {
  limpiarCapas();
  pintarRegister();
});
function pintarRegister(){
  document.getElementById("contenedor").innerHTML = "";
  // console.log(productos);
    document.getElementById("contenedor").innerHTML =`
    <form>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Email</label>
      <input type="email" class="form-control" id="usuario" placeholder="Email">
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">Password</label>
      <input type="password" class="form-control" id="contrasena" placeholder="Password">
    </div>
  </div>
  <div class="form-group">
    <label for="inputAddress">Nombre</label>
    <input type="text" class="form-control" id="nombre" placeholder="Nombre">
  </div>
  <div class="form-group">
    <label for="inputAddress2">Apellidos</label>
    <input type="text" class="form-control" id="apellidos" placeholder="Apellidos">
  </div>
  <a href="#" onclick='register()' class="btn btn-primary">Submit</a>

</form>           
        `;
}

// Carrito Api
async function carro() {
  fetch('https://fakestoreapi.com/carts/6')
            .then(res=>res.json())
            .then(json=>{
              pintarCarro(json);
            })
}
document.getElementById("carritoApi").addEventListener("click", function () {
  limpiarCapas();
  carro();
});
function pintarCarro(json){
  document.getElementById("contenedor").innerHTML = "";
  // console.log(productos);
    document.getElementById("contenedor").innerHTML =`
    <ul>
      <li>Id: ${json.id}</li>
      <li>Usuario Id: ${json.userId}</li>
      <li>Fecha: ${json.date}</li>
      <li>Productos: ${JSON.stringify(json.products)}</li>
    </ul>       
        `;
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
    const { id, title, price, image, category, description } = prod;
    document.getElementById("contenedor").innerHTML += `
    <div class="col-3">
        <div class="card" style="width: 18rem;">    
          <img class="card-img-top" src="${image}" alt="Card image cap" with="200px" height="300px">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-subtitle mb-2 text-muted">Precio: ${price} €</p>
            
            <div id="modal${id}" class="modal">
            <h2>Modal</h2>
            <img width="150" src="${image}" alt="Card image cap">
		        <h5 >${title}</h5>
            <p>${category}</p>
            <p>${description}</p>
		        <p>Precio: ${price}</p>
            <button onclick='cerrar(${id})' class="close">Close</button> 
		        <a href="#" onclick='añadirCarrito(${id})' class="btn btn-primary add-to-cart">Añadir al carrito</a>		  
          </div>
          <a href="#" id="${id}" onclick='abrir(${id})' class="btn btn-primary add-to-cart">ver</a>

          <a href="#" onclick='añadirCarrito(${id})' class="btn btn-primary add-to-cart">Comprar</a>

          </div>
        </div>      
    </div>             
        `;
  });
}
// Scroll infinito
$(window).scroll(function () {
  // console.log($(window).scrollTop());
  if (
    $(window).scrollTop() + $(window).height() >=
    $(document).height() - 100
  ) {
    nproductos = nproductos + 8;
    alert("Esta cargando los productos...");

    console.log("scroll productos " + nproductos);

    traerProductos();
  }
});

// modal para ver el producto
function abrir(id) {
  $("#modal" + id).show();
}

function cerrar(id) {
  $("#modal" + id).hide();
}

// Funcion para comprar un producto 
function añadirCarrito(id) {
  console.log(id);

  fetch('https://fakestoreapi.com/products/' + id)
    .then(res => res.json())
    // Al comprar da un alerte con el titulo del producto
    .then(json => alert("El producto con " + json.title + " se ha añadido al carrito"));

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


                  <a href="#" id="${j[i].id}" onclick='abrir(${j[i].id})' class="btn btn-primary add-to-cart">ver</a>
                  <a href="#" onclick='añadirCarrito(${j[i].id})' class="btn btn-primary add-to-cart">Comprar</a>
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


                  <a href="#" id="${j[i].id}" onclick='abrir(${j[i].id})' class="btn btn-primary add-to-cart">ver</a>
                  <a href="#" onclick='añadirCarrito(${j[i].id})' class="btn btn-primary add-to-cart">Comprar</a>
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


                  <a href="#" id="${j[i].id}" onclick='abrir(${j[i].id})' class="btn btn-primary add-to-cart">ver</a>
                  <a href="#" onclick='añadirCarrito(${j[i].id})' class="btn btn-primary add-to-cart">Comprar</a>
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

                  <a href="#" id="${j[i].id}" onclick='abrir(${j[i].id})' class="btn btn-primary add-to-cart">ver</a>
                  <a href="#" onclick='añadirCarrito(${j[i].id})' class="btn btn-primary add-to-cart">Comprar</a>
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
function limpiarCapas() {
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
  document.getElementById("contenedor").innerHTML ="Mira en la consola los diferentes usuarios";

});

// Capa del carrito de la Api
document.getElementById("carritoApi").addEventListener("click", function () {
  limpiarCapas();

});

