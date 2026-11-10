const vehiculo = document.querySelector("#vehiculo");
const listaCarrito = document.querySelector("#lista-carrito");
const contador = document.querySelector("#contador");
const totalSpan = document.querySelector("#total");
const btnVaciar = document.querySelector("#btn-vaciar");
const btnModo = document.querySelector("#btn-modo");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}



function mostrarProductos() {
  const html = vehi.map((p) => {
    return `
      <div class="card">
        <img src="img/${p.img}" id="camer" alt="concesionaria camerupt">
        <h3>${p.nombre}</h3>
        <p class="categoria">${p.categoria}</p>
        <p class="precio">$${p.precio.toLocaleString("es-AR")}</p>
        <button class="btn-agregar" data-id="${p.id}">Agregar al carrito</button>
      </div>
    `;
  }).join("");

  vehiculo.innerHTML = html;
}


function agregarAlCarrito(id) {
  const enCarrito = carrito.find((item) => item.id === id);

  if (enCarrito) {
    // si ya estaba, solo aumento la cantidad (no se duplica)
    enCarrito.cantidad++;
  } else {
    const producto = vehi.find((p) => p.id === id);
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarCarrito();
}

function aumentar(id) {
  const item = carrito.find((i) => i.id === id);
  item.cantidad++;
  actualizarCarrito();
}

function disminuir(id) {
  const item = carrito.find((i) => i.id === id);
  item.cantidad--;

  if (item.cantidad <= 0) {
    eliminar(id);
  } else {
    actualizarCarrito();
  }
}

function eliminar(id) {
  carrito = carrito.filter((i) => i.id !== id);
  actualizarCarrito();
}





function actualizarCarrito() {
  if (carrito.length === 0) {
    listaCarrito.innerHTML = "<p>El carrito está vacío</p>";
  } else {
    listaCarrito.innerHTML = carrito.map((item) => {
      return `
        <div class="item-carrito">
          <p><img src="img/${item.img}" class="img_carrito"> ${item.nombre}</p>
          <p>$${(item.precio * item.cantidad).toLocaleString("es-AR")}</p>
          <div class="controles">
            <button class="btn-menos" data-id="${item.id}">-</button>
            <span>${item.cantidad}</span>
            <button class="btn-mas" data-id="${item.id}">+</button>
            <button class="btn-eliminar" data-id="${item.id}">Eliminar</button>
          </div>
        </div>
      `;
    }).join("");
  }

  let total = 0;
  let cantidadTotal = 0;



  carrito.forEach((item) => {
    total += item.precio * item.cantidad;
    cantidadTotal += item.cantidad;
  });

  totalSpan.textContent = total.toLocaleString("es-AR");
  contador.textContent = cantidadTotal;

  guardarCarrito();
}




vehiculo.addEventListener("click", (e) => {
  const boton = e.target.closest(".btn-agregar");
  if (!boton) return;

  agregarAlCarrito(Number(boton.dataset.id));
});


listaCarrito.addEventListener("click", (e) => {
  const boton = e.target.closest("button");
  if (!boton) return;

  const id = Number(boton.dataset.id);

  if (boton.classList.contains("btn-mas")) aumentar(id);
  if (boton.classList.contains("btn-menos")) disminuir(id);
  if (boton.classList.contains("btn-eliminar")) eliminar(id);
});

btnVaciar.addEventListener("click", () => {
  carrito = [];
  actualizarCarrito();
});





function aplicarModo() {
  const oscuro = localStorage.getItem("modoOscuro") === "true";
  document.body.classList.toggle("oscuro", oscuro);
  btnModo.textContent = oscuro ? " ☀️ " : " 🌙 ";
}


btnModo.addEventListener("click", () => {
  const oscuro = document.body.classList.contains("oscuro");
  localStorage.setItem("modoOscuro", !oscuro);
  aplicarModo();
});




mostrarProductos();
actualizarCarrito();
aplicarModo();
