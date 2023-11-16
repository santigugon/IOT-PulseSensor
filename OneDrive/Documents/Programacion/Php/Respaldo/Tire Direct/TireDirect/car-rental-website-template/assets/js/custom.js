jQuery(document).ready(function ($) {
  "use strict";

  // Page loading animation

  $("#preloader").animate(
    {
      opacity: "0",
    },
    600,
    function () {
      setTimeout(function () {
        $("#preloader").css("visibility", "hidden").fadeOut();
      }, 300);
    }
  );

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    var box = $(".header-text").height() - 100;
    var header = $("header").height();

    if (scroll >= box - header) {
      $("header").addClass("background-header");
    } else {
      $("header").removeClass("background-header");
    }
  });

  if ($(".owl-clients").length) {
    $(".owl-clients").owlCarousel({
      loop: true,
      nav: false,
      dots: true,
      items: 1,
      margin: 30,
      autoplay: false,
      smartSpeed: 700,
      autoplayTimeout: 6000,
      responsive: {
        0: {
          items: 1,
          margin: 0,
        },
        460: {
          items: 1,
          margin: 0,
        },
        576: {
          items: 2,
          margin: 20,
        },
        992: {
          items: 3,
          margin: 30,
        },
      },
    });
  }

  if ($(".owl-banner").length) {
    $(".owl-banner").owlCarousel({
      loop: true,
      nav: false,
      dots: true,
      items: 1,
      margin: 0,
      autoplay: false,
      smartSpeed: 700,
      autoplayTimeout: 6000,
      responsive: {
        0: {
          items: 1,
          margin: 0,
        },
        460: {
          items: 1,
          margin: 0,
        },
        576: {
          items: 1,
          margin: 20,
        },
        992: {
          items: 1,
          margin: 30,
        },
      },
    });
  }
});

// CODIGO ZOOM IMAGENES RECIBO, POLIZA ETC
let panzoomInstance;

function openModal() {
  document.addEventListener("DOMContentLoaded", function () {
    let zoomableImage = document.getElementById("zoomable-image");
    let panzoomInstance;
  });
  const modal = document.querySelector(".modal");
  console.log("ABRIR");

  modal.style.display = "block";
  modal.classList.remove("fade");
  let zoomableImage = document.getElementById("zoomable-image");
  panzoomInstance = panzoom(zoomableImage, {
    maxZoom: 4,
    contain: "outside",
  });
}

function closeModal() {
  const modal = document.querySelector(".modal");
  console.log("CERRAR");
  modal.style.display = "none";
  modal.classList.add("fade");

  panzoomInstance && panzoomInstance.reset();
}

// console.log("FUNCIONA");
