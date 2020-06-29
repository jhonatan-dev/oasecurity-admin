"use strict";

function enviar(idUsuario) {
  fetch(`/admin/entrenar/${idUsuario}`, {
    method: "GET",
  }).finally(function () {
    window.location.href = "/";
  });
}
