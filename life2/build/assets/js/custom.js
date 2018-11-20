'use strict';

jQuery(document).ready(function () {

  // modal
  var modal = $('.modal-block');

  modal.on('click', function (e) {
    var el = $(e.target);
    var insideModal = el.closest('.modal').hasClass('modal');
    var isClose = el.hasClass('modal__close') || el.closest('.modal__close').hasClass('modal__close');
    if (!insideModal || isClose) {
      modal.fadeOut(300);
    }
  });

  $('.js-modal').on('click', function (e) {
    e.preventDefault();
    var wind = $(this).data('modal');

    $('#' + wind).fadeIn(300);
  });

  $('.password__toggle').on('click', function (e) {
    e.preventDefault();
    $(e.currentTarget).siblings('input').attr('type', 'text');
  });

  $('.sloder-items').slick({
    dots: true,
    slidesToShow: 2,
    prevArrow: ".slider .slick__prev",
    nextArrow: ".slider .slick__next"
  });
});