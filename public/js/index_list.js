"use strict";
let btnEntrenarAudio = document.getElementById("btnEntrenarAudio");

function enviar(idUsuario) {
  btnEntrenarAudio.disabled = true;
  fetch(`/admin/entrenar/${idUsuario}`, {
    method: "GET",
  }).finally(function () {
    btnEntrenarAudio.disabled = true;
    window.location.href = "/";
  });
}
