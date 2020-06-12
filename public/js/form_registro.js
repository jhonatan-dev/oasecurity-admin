"use strict";

(function ($) {
    $(function () {
        run()
        $('.sidenav').sidenav();
        $.validator.setDefaults({
            errorElement: 'span',
            errorClass: 'invalid',
            validClass: "valid",
            errorPlacement: function (error, element) {
                let errorId = `#${error.attr("id")}`;
                if ($(errorId)) {
                    $(errorId).remove();
                }
                error.removeClass("invalid");
                error.addClass("helper-text");
                error.attr("data-error", error.text());
                error.text("");
                error.insertAfter(element);
            },
            success: function (error) {
                error.remove();
            }
        });
        $.validator.addMethod(
            "dniRegistradoRENIEC",
            function (value, element, valorRequerido) {
                let valido = false;
                $.ajax({
                    url: '/validacion/externa',
                    method: "GET",
                    async: false,
                    data: { dni: value },
                    success: function (response) {
                        if (response.valido) {
                            $("#formRegistro #nombres").val(response.informacion.nombres)
                            $("#formRegistro #apellidos").val(response.informacion.apellidos)
                            valido = true;
                        } else {
                            $("#formRegistro #nombres").val("")
                            $("#formRegistro #apellidos").val("")
                            valido = false;
                        }
                    },
                    error: function (error) {
                        $("#formRegistro #nombres").val("")
                        $("#formRegistro #apellidos").val("")
                        valido = false;
                    }
                })
                return valido
            },
            "El dni no es válido."
        );

        $("#formRegistro").validate({
            rules: {
                dni: {
                    required: true,
                    minlength: 8,
                    maxlength: 8,
                    digits: true,
                    remote: "/validacion/interna",
                    dniRegistradoRENIEC: true
                },
                nombres: {
                    required: true,
                },
                apellidos: {
                    required: true
                },
                email: {
                    required: true,
                    remote: "/validacion/interna"
                },
                password: {
                    required: true,
                    minlength: 8
                }
            },
            messages: {
                dni: {
                    required: "Campo dni es requerido.",
                    minlength: "Campo dni son solo 8 dígitos.",
                    maxlength: "Campo dni son solo 8 dígitos.",
                    digits: "Campo dni son solo 8 dígitos.",
                    remote: "El dni ingresado ya ha sido registrado."
                },
                nombres: {
                    required: "Campo nombres es requerido."
                },
                apellidos: {
                    required: "Campo apellidos es requerido."
                },
                email: {
                    required: "Campo correo electrónico es requerido.",
                    email: "Ingrese un correo electrónico válido.",
                    remote: "El correo electrónico ingresado ya ha sido registrado."
                },
                password: {
                    required: "Campo contraseña es requerido.",
                    minlength: "Campo contraseña debe ser de al menos 8 caracteres.",
                }
            }
        });


    });
})(jQuery);