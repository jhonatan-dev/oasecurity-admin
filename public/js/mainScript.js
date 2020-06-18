$(document).ready(function () {
  $(".button-collapse").sideNav({
    menuWidth: 300,
    edge: "left",
    closeOnClick: true,
    draggable: true,
    onOpen: function (el) {},
    onClose: function (el) {},
  });
  $(".parallax").parallax();
  $("#yearWebsite").html(new Date().getFullYear());
});
