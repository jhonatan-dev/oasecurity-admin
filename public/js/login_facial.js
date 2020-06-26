"use strict";

let smallRostroDetectado = document.getElementById("smallRostroDetectado");
let smallCantidadGestosPorRealizar = document.getElementById(
  "smallCantidadGestosPorRealizar"
);
let smallCantidadGestosRealizados = document.getElementById(
  "smallCantidadGestosRealizados"
);
let smallGestoRealizar = document.getElementById("smallGestoRealizar");
let tiempoEsperaDeteccion = 3000; //milisegundos
let cantidadGestosPorRealizar = 4;
let rostroDectectado = false;
let gestoRealizarActual = resetearGestoRealizarActual();
let gestosRealizados = [];
const contenedorGestos = [
  {
    es: "Enojado",
    en: "angry",
  },
  {
    es: "Neutral",
    en: "neutral",
  },
  {
    es: "Feliz",
    en: "happy",
  },
  {
    es: "Triste",
    en: "sad",
  },
  {
    es: "Sorprendido",
    en: "surprised",
  },
];

function resetearGestoRealizarActual() {
  return { es: "", en: "", realizado: false };
}

function obtenerGestoAleatoriamente() {
  return contenedorGestos[~~(contenedorGestos.length * Math.random())];
}

function obtenerGestoSiguienteParaRealizar() {
  let gesto = obtenerGestoAleatoriamente();
  while (gestosRealizados.includes(gesto.en)) {
    gesto = obtenerGestoAleatoriamente();
  }
  return gesto;
}

function obtenerGestoRealizadoConMayorConfianza(objectoExpresiones) {
  let [clave, valor] = Object.entries(objectoExpresiones)[0];
  for (let [claveActual, valorActual] of Object.entries(objectoExpresiones)) {
    if (valorActual > valor) {
      clave = claveActual;
      valor = valorActual;
    }
  }
  return clave;
}

function controlarDetecciones(result) {
  smallCantidadGestosPorRealizar.innerText = cantidadGestosPorRealizar;
  smallCantidadGestosRealizados.innerText = gestosRealizados.length;

  rostroDectectado = result ? true : false;

  if (rostroDectectado) {
    smallRostroDetectado.innerText = "SI";

    if (gestosRealizados.length < cantidadGestosPorRealizar) {
      if (gestoRealizarActual.en === "" && !gestoRealizarActual.realizado) {
        let gestoRealizar = obtenerGestoSiguienteParaRealizar();
        gestoRealizarActual.en = gestoRealizar.en;
        gestoRealizarActual.es = gestoRealizar.es;
        smallGestoRealizar.innerHTML = `<b>${gestoRealizarActual.es}</b>`;
      } else {
        let intervalo = setInterval(() => {
          gestoRealizarActual.realizado =
            obtenerGestoRealizadoConMayorConfianza(result.expressions) ===
            gestoRealizarActual.en
              ? true
              : false;
        }, 1000);
        setTimeout(function () {
          clearInterval(intervalo);
          if (gestoRealizarActual.realizado) {
            gestosRealizados.push(gestoRealizarActual.en);
            gestoRealizarActual = resetearGestoRealizarActual();
          }
        }, tiempoEsperaDeteccion);
      }
    } else {
      smallGestoRealizar.innerText = "Ninguno";
      if (!mostradoControles()) {
        initializeCameraControls();
        mostrarControles(true);
      }
    }
  } else {
    smallRostroDetectado.innerText = "NO";
  }
}

(function ($) {
  $(function () {
    run();
  });
})(jQuery);
