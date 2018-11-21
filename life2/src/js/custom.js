jQuery(document).ready(function () {

  // modal
  const modal = $('.modal-block');

  modal.on('click', (e) => {
    const el = $(e.target);
    const insideModal = el.closest('.modal').hasClass('modal');
    const isClose = el.hasClass('modal__close') || el.closest('.modal__close').hasClass('modal__close');
    if (!insideModal || isClose) {
      reInitModalSlide();
      modal.fadeOut(300);
    }
  })

  $('.js-modal').on('click', function (e) {
    e.preventDefault();
    const wind = $(this).data('modal');
    const slide = $(this).data('slide');

    initModalSlide();
    $('.modal .slider-items').slick('slickGoTo', +slide);

    $(`#${wind}`).fadeIn(300);
  })

  $('.password__toggle').on('click', function (e) {
    e.preventDefault();
    $(e.currentTarget).siblings('input').attr('type','text');
  })

  $('.reviews .slider-items').slick({
    dots: true,
    slidesToShow: 2,
    prevArrow: ".slider .slick__prev",
    nextArrow: ".slider .slick__next",
  });

  function initModalSlide() {
    $('.modal .slider-items').slick({
      dots: false,
      slidesToShow: 1,
      prevArrow: ".modal .slick__prev",
      nextArrow: ".modal .slick__next",
    });
  }

  function reInitModalSlide() {
    $('.modal .slider-items').slick('unslick');
  }

});


