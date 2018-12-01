jQuery(document).ready(function () {

  // modal
  const modal = $('.modal-block');

  modal.on('click', (e) => {
    const el = $(e.target);
    const insideModal = el.closest('.modal').hasClass('modal');
    const isClose = el.hasClass('modal__close') || el.closest('.modal__close').hasClass('modal__close');
    if (!insideModal || isClose) {
      reInitModalSlide();
      modal.hide(300);
    }
  })

  $('.js-modal').on('click', function (e) {
    e.preventDefault();
    const wind = $(this).data('modal');
    const slide = $(this).data('slide');

    initModalSlide();
    $('.modal .slider-items').slick('slickGoTo', +slide);

    $(`#${wind}`).show();
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

  $('.pagination__item').on('click', function (e) {
    e.preventDefault();
    const page = $(this).data('page');
    const selectPage = $(`.page[data-page=${page}]`);
    
    $('.pagination__item').removeClass('pagination__item_att');
    $(this).addClass('pagination__item_att');

    if (selectPage.length) {
      $('.page').removeClass('page_active');
      selectPage.addClass('page_active');
    }
  })

  $('.js-page-next').on('click', function (e) {
    e.preventDefault();
    const currentPage = $('.page_active');
    const nextPage = currentPage.next();
    const nextNumber = nextPage.data('page');

    if(nextPage.hasClass('page')) {
      currentPage.removeClass('page_active');
      nextPage.addClass('page_active');
      $('.pagination__item').removeClass('pagination__item_att');
      $(`.pagination__item[data-page=${nextNumber}]`).addClass('pagination__item_att');
    }
  })

  $('.js-page-prev').on('click', function (e) {
    e.preventDefault();
    const currentPage = $('.page_active');
    const nextPage = currentPage.prev();
    const nextNumber = nextPage.data('page');

    if(nextPage.hasClass('page')) {
      currentPage.removeClass('page_active');
      nextPage.addClass('page_active');
      $('.pagination__item').removeClass('pagination__item_att');
      $(`.pagination__item[data-page=${nextNumber}]`).addClass('pagination__item_att');
    }
  })

  $('.toggle__head .icon').on('click', function() {
    const topSpace = document.querySelector('.toggle').getBoundingClientRect().top;
    $(this).toggleClass('active');
    $('.toggle__body').slideToggle(0, function() {
			$('html, body').animate({
			  scrollTop: $(".toggle").offset().top - topSpace
      }, 0);
    });
  })

  $('.bar').each((i, el) => {
    const bar = $(el),
          width = `${bar.data('x')}%`,
          height = `${bar.data('y')}%`;
    bar.css({ width, height })
  })

  $('.login__toggle').on('click', function() {
    $(this).toggleClass('active');
    $('.login__nav').slideToggle();
  })



  function initRadialChart() {
    var ctx = document.getElementById('myChart').getContext('2d');

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
                backgroundColor: [gradient, gradient2, gradient, gradient2],
            }]
        },
        options: {
          tooltips: {
            enabled: false
          }
        }
    });
  }

  initRadialChart();

  function initLineChart() {
    var arr = [16, 4, 17, 15, 16, 10, 8, 20, 16];
    var visible = true;
    $('#add').on('click', () => {
      visible ? myChart2.data.datasets[1].data = arr : myChart2.data.datasets[1].data = [];
      visible = !visible;
      myChart2.update();
    });
    var ctx2 = document.getElementById('lineChart').getContext('2d');
  
  
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
                borderColor: "#000",
                pointBackgroundColor: 'transparent',
                pointHoverBackgroundColor: '#fff',
                pointBorderWidth: 0,
                pointBorderColor: 'transparent',
                pointHoverBorderColor: "#000",
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
                borderColor: "#355",
                pointBackgroundColor: 'transparent',
                pointHoverBackgroundColor: '#fff',
                pointBorderColor: 'transparent',
                pointHoverBorderColor: "#355",
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
              intersect: false,
              yPadding: 15,
              enabled: false,
              custom: function(tooltipModel) {
                    // Tooltip Element
                    var tooltipEl = document.getElementById('chartjs-tooltip');
  
                    // Create element on first render
                    if (!tooltipEl) {
                        tooltipEl = document.createElement('div');
                        tooltipEl.id = 'chartjs-tooltip';
                        // tooltipEl.innerHTML = "<table></table>";
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
  
    //                     titleLines.forEach(function(title) {
    //                         innerHtml += '<span>' + title + '</span>';
    //                     });
    //                     innerHtml += '</p>';
  
                        bodyLines.forEach(function(body, i) {
                            var colors = tooltipModel.labelColors[i];
                            var style = 'background:' + colors.backgroundColor;
                            style += '; border-color:' + colors.borderColor;
                            style += '; border-width: 2px';
                            var span = '<span style="' + style + '"></span>';
                            innerHtml = `<p>${parseInt(body[0].replace(/\D+/g,""))}</p><span>Увеличено на 1.8</span>`
                        });
                  
  
                        var tableRoot = tooltipEl.querySelector('table');
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
                        maxTicksLimit: 5,
                    },
                    gridLines: {
                        display: false
                    }
                }],
                xAxes: [{
                    gridLines: {
                      display: false
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


