'use strict';

jQuery(document).ready(function () {

  var email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  var tel = /[^0-9\s-+()]/;
  var bottomNav = document.querySelector('.bottom-nav');
  var usefulls = document.querySelector('.usefulls');
  var about = document.querySelector('#about');
  var $header = $('.header');

  // animation
  $('.images__left').addClass('bounceInLeft animated');
  $('.images__right').addClass('bounceInRight animated');
  $('.price').on('mouseover', function (e) {
    $('.price').removeClass('active');
    $(e.currentTarget).addClass('active');
  });

  // slider
  $('.reviews__slider').slick({
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 2,
    centerMode: true,
    arrows: true,
    prevArrow: $('.slider-prev'),
    nextArrow: $('.slider-next')
  });

  //mobile menu
  $('.menu__control').on('click', function (e) {
    $(e.currentTarget).toggleClass('active');
    $(e.currentTarget).siblings('.menu').toggleClass('active');
  });

  // scroll events
  $(document).on('scroll', function (e) {

    window.scrollY > 260 ? $header.addClass('active') : $header.removeClass('active');
    about.getBoundingClientRect().top < 350 ? $('.to-top').addClass('active') : $('.to-top').removeClass('active');

    if (usefulls.getBoundingClientRect().top < window.innerHeight / 2) {
      $('.usefull').addClass('animated flipInX');
    }

    if (bottomNav.getBoundingClientRect().top < window.innerHeight && window.innerWidth > 992) {
      $header.addClass('hide');
    } else {
      $header.removeClass('hide');
    }
  });

  //review block
  $('.review').on('click', function (e) {
    var inner = $(e.currentTarget).html();
    $('.review-full__inner').html(inner);
    $('body').addClass('overlay');
    $('.review-full').addClass('active');
  });

  $('.review-full__close').on('click', function (e) {
    $(e.currentTarget).closest('.review-full').removeClass('active');
    $('body').removeClass('overlay');
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('.review').hasClass('review') && !$(e.target).closest('.review-full').hasClass('active') && $('.review-full').hasClass('active')) {
      $('.review-full').removeClass('active');
      $('body').removeClass('overlay');
    }
  });

  // navigation scroll
  $('.js-scroll-link').on('click', function (e) {
    e.preventDefault();
    var section = $(e.currentTarget).data('section');
    var space = 55;
    if (section === '#life') space = 95;

    $('body, html').animate({
      scrollTop: $('' + section).offset().top - space
    }, 1000);

    $('.header .menu').removeClass('active');
    $('.menu__control').removeClass('active');
  });

  // custom scroll
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

  // range slider
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

  // pop-up
  $('.pop-up__wrapper').on('click', function (e) {
    if ($(e.target).hasClass('pop-up__wrapper')) {
      $(e.currentTarget).removeClass('active');
      $('.range input[type="range"]').rangeslider('destroy');
      $('.scroll').baron().dispose();
      $('body').removeClass('no-scroll');
      setTimeout(function() {
        $('.pop-up').removeClass('pop-up_min');
      },1000);
    }
  });

  $('.pop-up__close').on('click', function (e) {
    $(e.currentTarget).closest('.pop-up__wrapper').removeClass('active');
    $('.range input[type="range"]').rangeslider('destroy');
    $('.scroll').baron().dispose();
    $('body').removeClass('no-scroll');
    setTimeout(function() {
      $('.pop-up').removeClass('pop-up_min');
    },1000);
  });

  function sendListener() {
    $('.js-btn-send').on('click', function (e) {
      e.preventDefault();
      var $this = $(e.currentTarget),
          window = $this.data('wind'),
          data = $('' + window).html(),
          popUp = $('.pop-up__wrapper');

      $('.baron__track').hide();
      popUp.find('.pop-up__inner').html(data);
      $('.pop-up').addClass('pop-up_min');
      popUp.addClass('active');
    });
  }
  sendListener();

  function addValidation() {
    $('.date').on('keyup', function (e) {
     $(this).val('');
    });

    $('input[type="tel"]').on('keyup', function (e) {
      if (tel.test($(e.currentTarget).val())) {
        $(e.currentTarget).addClass('error');
      } else {
        $(e.currentTarget).removeClass('error');
      }
    });

    $('input[type="email"]').on('keyup', function (e) {

      if (!email.test($(e.currentTarget).val())) {
        $(e.currentTarget).addClass('error');
      } else {
        $(e.currentTarget).removeClass('error');
      }
    });
  }
  
  addValidation();

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
    $('body').addClass('no-scroll');
    initRange();
    initScroll();
    sendListener();
    addValidation();
    $('.baron__track').show();
    $('.date').datepicker({
      autoClose: true
    });

    popUp.addClass('active');
  });
});
