'use strict';

jQuery(document).ready(function () {

  new ClipboardJS('.js-copy');

  $(document).on('click', function (e) {
    if (!$(e.target).closest('.js-select').hasClass('js-select')) {
      $('.select__list').slideUp();
    }
  });

  $('select').on('change', function () {
    $(this).css({ color: '#2E384D' });
  });

  $('.js-select-field .input').on('click', function (e) {
    $(this).closest('.js-select-field').siblings('.select__list').slideDown();
  });

  $('.js-search').on('keydown', function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  });

  $('.js-search').on('keyup', function (e) {
    var value = $(this).val().toLowerCase();
    if (e.keyCode === 13) {
      e.preventDefault();
    }

    $('.select__item').show();
    $('.select__item').each(function () {
      if (!$(this).text().toLowerCase().includes(value)) {
        $(this).hide();
      }
    });
  });

  $('.select__item').on('click', function (e) {
    e.stopPropagation();
    var value = $(this).data('id');
    var label = $(this).html();
    $(this).closest('.js-select').find('.js-select-field input').val(value);
    $(this).closest('.js-select').find('.js-select-field .input span').html(label);
    $(this).closest('.select__list').slideUp();
  });

  $('.tooltip').on('mouseenter', function (e) {
    var offsets = e.target.getBoundingClientRect();
    var containerOffset = e.target.closest('.container_min') ? e.target.closest('.container_min').getBoundingClientRect() : e.target.closest('section').getBoundingClientRect();
    $(this).find('.tooltip__inner').css({
      top: offsets.bottom + 15,
      left: containerOffset.left,
      right: window.innerWidth - containerOffset.right
    });
    $(this).find('.tooltip__inner-arr').css({
      left: offsets.left - containerOffset.left
    });
  });

  $('.menu-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).add('.header').toggleClass('active');
    $('.header__controls, .header__contacts, .signin').fadeToggle();
  });

  // modal

  $('.modal-block').on('click', function (e) {
    var el = $(e.target);
    var insideModal = el.closest('.modal').hasClass('modal');
    var modal = el.closest('.modal-block');
    var isClose = el.hasClass('modal__close') || el.closest('.modal__close').hasClass('modal__close');
    if (!insideModal || isClose) {
      $('body').css({ overflow: 'initial' });
      if (modal.hasClass('modal-block_hided')) {
        modal.removeClass('active');
      } else {
        modal.hide(300);
      }
    }
  });

  $('.js-modal').on('click', function (e) {
    e.preventDefault();
    var wind = $(this).data('modal');
    var modal = $('#' + wind);
    var slide = $(this).data('slide');

    $('body').css({ overflow: 'hidden' });
    if (modal.hasClass('modal-block_hided')) {
      $('.modal .slider-items').slick('slickGoTo', +slide);
      modal.addClass('active');
    } else {
      $('#' + wind).show(300);
    }
  });

  $('.js-scroll').on('click', function (e) {
    e.preventDefault();
    var section = $(this).data('section');
    if (window.innerWidth < 1100) {
      $('.menu-toggle, .header').removeClass('active');
      $('.header__controls, .header__contacts, .signin').fadeOut();
    }
    $('html, body').animate({
      scrollTop: $(section).offset().top - 150
    }, 1000);
  });

  $('.password__toggle').on('click', function (e) {
    e.preventDefault();
    $(e.currentTarget).siblings('input').attr('type', 'text');
    setTimeout(function () {
      $(e.currentTarget).siblings('input').attr('type', 'password');
    }, 1000);
  });

  $('.reviews .slider-items').slick({
    dots: true,
    slidesToShow: 2,
    prevArrow: ".slider .slick__prev",
    nextArrow: ".slider .slick__next",
    responsive: [{
      breakpoint: 769,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });

  // function initModalSlide() {
  $('.modal .slider-items').slick({
    dots: false,
    slidesToShow: 1,
    prevArrow: ".modal .slick__prev",
    nextArrow: ".modal .slick__next"
  });
  // }

  $('.js-pagination').on('click', function (e) {
    e.preventDefault();
    var page = $(this).data('page');
    var selectPage = $('.page[data-page=' + page + ']');

    $('.pagination__item').removeClass('pagination__item_att');
    $(this).addClass('pagination__item_att');

    if (selectPage.length) {
      $('.page').removeClass('page_active');
      selectPage.addClass('page_active');
    }
  });

  $('.js-page-next').on('click', function (e) {
    e.preventDefault();
    var currentPage = $('.page_active');
    var nextPage = currentPage.next();
    var nextNumber = nextPage.data('page');

    if (nextPage.hasClass('page')) {
      currentPage.removeClass('page_active');
      nextPage.addClass('page_active');
      $('.pagination__item').removeClass('pagination__item_att');
      $('.pagination__item[data-page=' + nextNumber + ']').addClass('pagination__item_att');
    } else {
      var scroll = $('.tests').offset().top;
      $('.tests').hide();
      $('.results').show();
      $('html, body').animate({
        scrollTop: scroll
      }, 0);
    }
  });

  $('.js-page-prev').on('click', function (e) {
    e.preventDefault();
    var currentPage = $('.page_active');
    var nextPage = currentPage.prev();
    var nextNumber = nextPage.data('page');

    if (nextPage.hasClass('page')) {
      currentPage.removeClass('page_active');
      nextPage.addClass('page_active');
      $('.pagination__item').removeClass('pagination__item_att');
      $('.pagination__item[data-page=' + nextNumber + ']').addClass('pagination__item_att');
    }
  });

  $('.toggle__head .icon').on('click', function () {
    $(this).toggleClass('active');
    $('.toggle__body').slideToggle();
  });

  $('.bar').each(function (i, el) {
    var bar = $(el),
        width = bar.data('x') + '%',
        height = bar.data('y') + '%';
    bar.css({ width: width, height: height });
  });

  $('.signin__toggle').on('click', function () {
    $(this).toggleClass('active');
    $('.signin__nav').slideToggle();
  });

  $('.form').on('submit', function (e) {
    e.preventDefault();
    var scroll = window.scrollY;
    $(this).closest('.form-block__inner').hide();
    $('.tests').show();
    $('html, body').animate({
      scrollTop: scroll - 100
    }, 0);
  });

  $('.collapse__head').on('click', function () {
    $(this).toggleClass('active');
    $(this).siblings('.collapse__body').slideToggle();
  });

  $('.members__add').on('click', function (e) {
    e.preventDefault();
    $(this).hide().siblings('.members__items_active').hide();
    $(this).siblings('.members__items_all').add('.members-save').show();
  });

  $('.members-category').on('click', function (e) {
    e.preventDefault();
    var category = $(this);
    var categoryId = $(this).data('category');
    $('.members-category, .members__items').removeClass('active');
    category.add(categoryId).addClass('active');
    $('.members-save').hide();
  });

  initRadialChart();
  initLineChart();

  function initRadialChart() {
    var chart = document.getElementById('myChart');
    if (!chart) return null;
    var ctx = chart.getContext('2d');

    var gradient = ctx.createLinearGradient(0, 0, 0, 600);
    gradient.addColorStop(0, 'rgba(255,91,77,.5)');
    gradient.addColorStop(1, 'rgba(255,121,26,.5)');

    var gradient2 = ctx.createLinearGradient(0, 0, 0, 500);
    gradient2.addColorStop(0, 'rgb(255,91,77)');
    gradient2.addColorStop(.5, 'rgb(255,121,26)');

    var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [{
          datalabels: {
            font: {
              size: "22"
            },
            color: '#fff'
          },
          data: [4, 8.5, 5, 4.5],
          borderWidth: 0,
          hoverBackgroundColor: [gradient, gradient2, gradient, gradient2],
          backgroundColor: [gradient, gradient2, gradient, gradient2]
        }]
      },
      options: {
        tooltips: {
          enabled: false
        }
      }
    });
  }

  function initLineChart() {
    var chart = document.getElementById('lineChart');
    if (!chart) return null;
    var arr = [16, 4, 17, 15, 16, 10, 8, 20, 16];
    var visible = true;
    var ctx2 = chart.getContext('2d');
    var gradient = ctx2.createLinearGradient(0, 0, 0, 600);
    gradient.addColorStop(0, 'rgb(255,91,77)');
    gradient.addColorStop(.5, 'rgb(255,121,26)');
    var gradient2 = ctx2.createLinearGradient(0, 0, 0, 600);
    gradient2.addColorStop(0, 'rgb(74,117,248)');
    gradient2.addColorStop(.5, 'rgb(148,175,255)');

    $('#add').on('click', function (e) {
      e.preventDefault();
      visible ? myChart2.data.datasets[1].data = arr : myChart2.data.datasets[1].data = [];
      visible = !visible;
      myChart2.update();
      $(e.currentTarget).toggleClass('active');
      $('.legends').fadeToggle();
    });

    var myChart2 = new Chart(ctx2, {
      type: 'line',
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        datasets: [{
          datalabels: {
            display: false
          },
          lineTension: 0,
          label: "Data",
          borderColor: gradient,
          pointBackgroundColor: 'transparent',
          pointHoverBackgroundColor: '#fff',
          pointBorderWidth: 0,
          pointBorderColor: 'transparent',
          pointHoverBorderColor: gradient,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 3,
          pointRadius: 10,
          fill: false,
          borderWidth: 5,
          data: [6, 14, 7, 15, 16, 12, 18, 22, 16]
        }, {
          datalabels: {
            display: false
          },
          lineTension: 0,
          label: "Data",
          borderColor: gradient2,
          pointBackgroundColor: 'transparent',
          pointHoverBackgroundColor: '#fff',
          pointBorderColor: 'transparent',
          pointHoverBorderColor: gradient2,
          pointBorderWidth: 0,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 3,
          pointRadius: 10,
          fill: false,
          borderWidth: 5,
          data: []
        }]
      },
      options: {
        legend: {
          display: false,
          position: "bottom"
        },
        tooltips: {
          intersect: true,
          yPadding: 10,
          enabled: false,
          custom: function custom(tooltipModel) {
            // Tooltip Element
            var tooltipEl = document.getElementById('chartjs-tooltip');

            // Create element on first render
            if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.id = 'chartjs-tooltip';
              document.body.appendChild(tooltipEl);
            }

            // Hide if no tooltip
            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = 0;
              return;
            }

            // Set caret Position
            tooltipEl.classList.remove('above', 'below', 'no-transform');
            if (tooltipModel.yAlign) {
              tooltipEl.classList.add(tooltipModel.yAlign);
            } else {
              tooltipEl.classList.add('no-transform');
            }

            function getBody(bodyItem) {
              return bodyItem.lines;
            }

            // Set Text
            if (tooltipModel.body) {
              var titleLines = tooltipModel.title || [];
              var bodyLines = tooltipModel.body.map(getBody);
              var innerHtml;

              bodyLines.forEach(function (body, i) {
                innerHtml = '<p>' + parseInt(body[0].replace(/\D+/g, "")) + '</p><span>\u0423\u0432\u0435\u043B\u0438\u0447\u0435\u043D\u043E \u043D\u0430 1.8</span>';
              });

              tooltipEl.innerHTML = innerHtml;
            }

            // `this` will be the overall tooltip
            var position = this._chart.canvas.getBoundingClientRect();

            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1;
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
            tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
            tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
            tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
            tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
            tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
            tooltipEl.style.pointerEvents = 'none';
          }

        },
        scales: {
          yAxes: [{
            ticks: {
              // display: false,
              beginAtZero: true,
              maxTicksLimit: 5
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: true
            },
            ticks: {
              // display: false
            }
          }]
        }
      }
    });
  }
});