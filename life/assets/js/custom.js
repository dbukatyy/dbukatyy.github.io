'use strict';

jQuery(document).ready(function () {

  var bottomNav = document.querySelector('.bottom-nav');
  var usefulls = document.querySelector('.usefulls');

  $('.images__left').addClass('bounceInLeft animated');
  $('.images__right').addClass('bounceInRight animated');

  $('.reviews__slider').slick({
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 2,
    centerMode: true,
    arrows: true,
    prevArrow: $('.slider-prev'),
    nextArrow: $('.slider-next')
  });

  $('.price').on('mouseover', function (e) {
    $('.price').removeClass('active');
    $(e.currentTarget).addClass('active');
  });

  $('.menu__control').on('click', function (e) {
    $(e.currentTarget).toggleClass('active');
    $(e.currentTarget).siblings('.menu').toggleClass('active');
  });

  $(document).on('scroll', function (e) {
    window.scrollY > 260 ? $('.header').addClass('active') : $('.header').removeClass('active');

    if (usefulls.getBoundingClientRect().top < window.innerHeight / 2) {
      $('.usefull').addClass('animated flipInX');
    }

    if (bottomNav.getBoundingClientRect().top < window.innerHeight && window.innerWidth > 992) {
      $('.header').addClass('hide');
    } else {
      $('.header').removeClass('hide');
    }
  });

  $('.review').on('click', function (e) {
    var inner = $(e.currentTarget).html();
    $('.review-full__inner').html(inner);
    $('.review-full').addClass('active');
  });

  $('.review-full__close').on('click', function (e) {
    $(e.currentTarget).closest('.review-full').removeClass('active');
  });

  $('.js-scroll-link').on('click', function (e) {
    e.preventDefault();
    var section = $(e.currentTarget).data('section');

    $('body, html').animate({
      scrollTop: $('' + section).offset().top - 55
    }, 1000);
  });

  function initScroll() {
    $('.scroll').baron({
      scroller: '.baron__scroller',
      bar: '.baron__bar',
      scrollingCls: '_scrolling',
      draggingCls: '_dragging'
    });

    $('.scroll-v').baron({
      scroller: '.baron__scroller',
      bar: '.baron__bar',
      scrollingCls: '_scrolling',
      draggingCls: '_dragging'
    });
  }

  function initRange() {
    $('.range input[type="range"]').rangeslider({
      polyfill: false,
      onSlide: function onSlide(position, value) {
        var block = $('#' + this.$element[0].name),
            steps = block.find('.range__step'),
            step = block.find('.range__step[data-val="' + value + '"]');
        steps.removeClass('active');
        step.addClass('active');
      }
    });
  }

  $('.pop-up__wrapper').on('click', function (e) {
    if ($(e.target).hasClass('pop-up__wrapper')) {
      $(e.currentTarget).removeClass('active');
      $('.range input[type="range"]').rangeslider('destroy');
      $('.scroll').baron().dispose();
    }
  });

  $('.pop-up__close').on('click', function (e) {
    $(e.currentTarget).closest('.pop-up__wrapper').removeClass('active');
    $('.range input[type="range"]').rangeslider('destroy');
    $('.scroll').baron().dispose();
  });

  function sendListener() {
    $('.js-btn-send').on('click', function (e) {
      e.preventDefault();
      var $this = $(e.currentTarget),
          window = $this.data('wind'),
          data = $('' + window).html(),
          popUp = $('.pop-up__wrapper');

      popUp.find('.pop-up__inner').html(data);
      popUp.addClass('active');
    });
  }
  sendListener();

  $('.js-btn-popup').on('click', function (e) {
    var $this = $(e.currentTarget),
        window = $this.data('wind'),
        data = $('' + window).html(),
        popUp = $('.pop-up__wrapper'),
        colored = $('' + window).hasClass('colored');

    if (colored) {
      $('.pop-up').addClass('pop-up_colored');
    } else {
      $('.pop-up').removeClass('pop-up_colored');
    }

    popUp.find('.pop-up__inner').html(data);
    initRange();
    initScroll();
    sendListener();
    $('.date').datepicker({
      autoClose: true
    });
    popUp.addClass('active');
  });
});