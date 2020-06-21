"use strict";

(function ($) {
  $(function () {
    $.validator.setDefaults({
      errorClass: "invalid",
      validClass: "valid",
      errorPlacement: function (error, element) {
        $(element)
          .closest("form")
          .find("label[for='" + element.attr("id") + "']")
          .attr("data-error", error.text());
      }
    });
    $("#formLogin").validate({
      rules: {
        email: {
          required: true,
        },
        password: {
          required: true,
          minlength: 8,
        },
      },
      messages: {
        email: {
          required: "Campo correo electrónico es requerido.",
          email: "Ingrese un correo electrónico válido.",
        },
        password: {
          required: "Campo contraseña es requerido.",
          minlength: "Campo contraseña debe ser de al menos 8 caracteres.",
        },
      },
    });
  });
})(jQuery);
