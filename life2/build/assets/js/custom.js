'use strict';

jQuery(document).ready(function () {

  // modal
  var modal = $('.modal-block');

  modal.on('click', function (e) {
    var el = $(e.target);
    var insideModal = el.closest('.modal').hasClass('modal');
    var isClose = el.hasClass('modal__close') || el.closest('.modal__close').hasClass('modal__close');
    if (!insideModal || isClose) {
      reInitModalSlide();
      modal.hide(300);
    }
  });

  $('.js-modal').on('click', function (e) {
    e.preventDefault();
    var wind = $(this).data('modal');
    var slide = $(this).data('slide');

    initModalSlide();
    $('.modal .slider-items').slick('slickGoTo', +slide);

    $('#' + wind).show();
  });

  $('.password__toggle').on('click', function (e) {
    e.preventDefault();
    $(e.currentTarget).siblings('input').attr('type', 'text');
  });

  $('.reviews .slider-items').slick({
    dots: true,
    slidesToShow: 2,
    prevArrow: ".slider .slick__prev",
    nextArrow: ".slider .slick__next"
  });

  function initModalSlide() {
    $('.modal .slider-items').slick({
      dots: false,
      slidesToShow: 1,
      prevArrow: ".modal .slick__prev",
      nextArrow: ".modal .slick__next"
    });
  }

  function reInitModalSlide() {
    $('.modal .slider-items').slick('unslick');
  }
});