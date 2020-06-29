"use strict";

(function ($) {
  $(function () {
    run();
    $.validator.setDefaults({
      errorClass: "invalid",
      validClass: "valid",
      errorPlacement: function (error, element) {
        $(element)
          .closest("form")
          .find("label[for='" + element.attr("id") + "']")
          .attr("data-error", error.text());
      },
    });
    $.validator.addMethod(
      "dniRegistradoRENIEC",
      function (value, element, valorRequerido) {
        let valido = false;
        $.ajax({
          url: `${urlAPI}/validaciones/externa`,
          method: "GET",
          async: false,
          data: { dni: value },
          success: function (response) {
            if (response.valido) {
              $("#formRegistro #nombres").val(response.informacion.nombres);
              $("#formRegistro #apellidos").val(response.informacion.apellidos);
              valido = true;
            } else {
              $("#formRegistro #nombres").val("");
              $("#formRegistro #apellidos").val("");
              valido = false;
            }
          },
          error: function (error) {
            $("#formRegistro #nombres").val("");
            $("#formRegistro #apellidos").val("");
            valido = false;
          },
        });
        return valido;
      },
      "El dni no es válido."
    );

    $("#formRegistro").validate({
      rules: {
        foto_rostro: {
          required: true,
        },
        dni: {
          required: true,
          minlength: 8,
          maxlength: 8,
          digits: true,
          remote: `${urlAPI}/validaciones/interna`,
          dniRegistradoRENIEC: true,
        },
        nombres: {
          required: true,
        },
        apellidos: {
          required: true,
        },
        email: {
          required: true,
          remote: `${urlAPI}/validaciones/interna`,
        },
        password: {
          required: true,
          minlength: 8,
        },
      },
      messages: {
        dni: {
          required: "Campo dni es requerido.",
          minlength: "Campo dni son solo 8 dígitos.",
          maxlength: "Campo dni son solo 8 dígitos.",
          digits: "Campo dni son solo 8 dígitos.",
          remote: "El dni ingresado ya ha sido registrado.",
        },
        nombres: {
          required: "Campo nombres es requerido.",
        },
        apellidos: {
          required: "Campo apellidos es requerido.",
        },
        email: {
          required: "Campo correo electrónico es requerido.",
          email: "Ingrese un correo electrónico válido.",
          remote: "El correo electrónico ingresado ya ha sido registrado.",
        },
        password: {
          required: "Campo contraseña es requerido.",
          minlength: "Campo contraseña debe ser de al menos 8 caracteres.",
        },
      },
      submitHandler: function (form) {
        const facesContainer = document.getElementById("facesContainer");
        if (facesContainer.hasChildNodes() && currentAudioBlob != null) {
          const canvasRostro = facesContainer.firstElementChild;
          new Promise((resolve) =>
            canvasRostro.toBlob(resolve, "image/png")
          ).then(function (fotoRostroBlob) {
            let formData = new FormData();
            formData.append("dni", document.getElementById("dni").value);
            formData.append(
              "nombres",
              document.getElementById("nombres").value
            );
            formData.append(
              "apellidos",
              document.getElementById("apellidos").value
            );
            formData.append("email", document.getElementById("email").value);
            formData.append(
              "password",
              document.getElementById("password").value
            );
            formData.append(
              "foto_rostro",
              fotoRostroBlob,
              `${new Date().toISOString()}.png`
            );
            formData.append(
              "audio_grabacion",
              currentAudioBlob,
              `${new Date().toISOString()}.wav`
            );
            fetch(`/admin/registro`, {
              method: "POST",
              body: formData,
            }).finally(function () {
              window.location.href = "/login";
            });
          });
        }
        return false;
      },
    });
  });
})(jQuery);
