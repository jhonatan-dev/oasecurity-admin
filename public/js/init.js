(function ($) {
    $(function () {
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
        /*
        $.validator.addMethod(
            "emailRegistrado",
            function (value, element, valorRequerido) {
                console.log("value: ", valorRequerido);
                console.log("valorRequerido: ", valorRequerido);
                return false;
            },
            "El correo electrónico ingresado ya ha sido registrado."
        );
                        axios.get('/validacion/interna', {
                    params: {
                        email: value
                    }
                })
                    .then(function (response) {
                        console.log(response.data);
                        return response.data.valido;
                    })
                    .catch(function (error) {
                        console.log("error:",error);
                        return false;
                    })
        */
        $("#formRegistro").validate({
            rules: {
                dni: {
                    required: true,
                    minlength: 8,
                    maxlength: 8,
                    digits: true,
                    remote: "/validacion/interna"
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