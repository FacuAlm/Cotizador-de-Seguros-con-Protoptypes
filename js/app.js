let marcas = ["Americano", "Asiatico", "Europeo"];

//Constructores

function Seguro(marca, year, tipo) {
  (this.marca = marca), (this.year = year), (this.tipo = tipo);
}

Seguro.prototype.cotizarSeguro = function () {
  let cantidad;
  const base = 2000;
  switch (this.marca) {
    case "1":
      cantidad = base * 1.15;
      break;
    case "2":
      cantidad = base * 1.05;
      break;
    case "3":
      cantidad = base * 1.35;
      break;
    default:
      break;
  }

  const diferencia = new Date().getFullYear() - this.year;
  cantidad -= (diferencia * 3 * cantidad) / 100;

  if (this.tipo === "basico") {
    cantidad *= 1.3;
  } else {
    cantidad *= 1.5;
  }

  return cantidad;
};
function UI() {}

UI.prototype.llenarOpciones = () => {
  const max = new Date().getFullYear();
  min = max - 20;

  const selectYear = document.querySelector("#year");
  for (let i = max; i >= min; i--) {
    let opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;

    selectYear.appendChild(opcion);
  }
};

UI.prototype.mostrarMensaje = (mensaje, tipo) => {
  const div = document.createElement("div");

  if (tipo === "error") {
    div.classList.add("error");
  } else {
    div.classList.add("correcto");
  }

  div.classList.add("mensaje", "mt-10");
  div.textContent = mensaje;

  const formulario = document.querySelector("#cotizar-seguro");
  formulario.insertBefore(div, document.querySelector("#resultado"));

  setTimeout(() => {
    div.remove();
  }, 3000);
};

UI.prototype.mostarResultado = (total, seguro) => {
  let textoMarca;
  switch (seguro.marca) {
    case "1":
      textoMarca = "Americano";
      break;
    case "2":
      textoMarca = "Asiatico";
      break;
    case "3":
      textoMarca = "Europeo";
      break;
    default:
      break;
  }
  const div = document.createElement("div");
  div.classList.add("mt-10");

  div.innerHTML = `
<p class="header">Tu resumen</p>
<p class="font-bold">Marca: <span class='font-normal'>${textoMarca}</span></p>
<p class="font-bold">Año: <span class='font-normal'>${seguro.year}</span></p>
<p class="font-bold">Tipo: <span class='font-normal capitalize'>${seguro.tipo}</span></p>
<p class="font-bold">Total: <span class='font-normal'>$${total}</span></p>
`;

  const resultadoDiv = document.querySelector("#resultado");
  resultadoDiv.appendChild(div);

  const spinner = document.querySelector("#cargando");
  spinner.style.display = "block";

  setTimeout(() => {
    spinner.style.display = "none";
    resultadoDiv.appendChild(div);
  }, 3000);
};

const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {
  mostrarMarcas();
  ui.llenarOpciones();
});

eventListeners();

function eventListeners() {
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.addEventListener("submit", cotizarSeguro);
}

function mostrarMarcas() {
  const mostrarMarcas = document.querySelector("#marca");
  const options = document.createElement("option");
  options.textContent = "- Seleccionar -";
  options.value = "";
  mostrarMarcas.appendChild(options);
  marcas.map((marca, index) => {
    const mostrarMarcas = document.querySelector("#marca");
    const options = document.createElement("option");
    options.textContent = marca;
    options.value = index + 1;
    mostrarMarcas.appendChild(options);
  });
}

function cotizarSeguro(e) {
  e.preventDefault();

  const marca = document.querySelector("#marca").value;
  const year = document.querySelector("#year").value;

  const tipo = document.querySelector('input[name="tipo"]:checked').value;
  if (marca === "") {
    ui.mostrarMensaje("Todos los campos son obligatorios", "error");
  } else {
    ui.mostrarMensaje("Cotizando...", "exito");
    const resultados = document.querySelector("#resultado div");
    if (resultados != null) {
      resultados.remove();
    }

    const seguro = new Seguro(marca, year, tipo);

    const total = seguro.cotizarSeguro();

    ui.mostarResultado(total, seguro);
  }
}
