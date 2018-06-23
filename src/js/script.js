(function($) {
  /* ---------------------------------------------
     Section Helpers
--------------------------------------------- */
  function validatedata($attr, $defaultValue) {
    if ($attr !== undefined) {
      return $attr;
    }
    return $defaultValue;
  }

  /* ---------------------------------------------
     Counters
--------------------------------------------- */

  // Number Counters
  function initCounters() {
    $('.count-number-fixed').appear(function() {
      $(this).countTo({
        from: 0,
        to: $(this).html(),
        speed: 1300,
        refreshInterval: 60,
      });
    });
    $('.count-number-decimal').appear(function() {
      $(this).countTo({
        from: 0,
        to: $(this).html(),
        speed: 1300,
        refreshInterval: 60,
        formatter(value, options) {
          return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        },
      });
    });
  }

  // People Icon Counters
  function initPeopleCounter() {
    $('.progress-icons').each(function() {
      const $this = $(this);
      const $total = $this.attr('data-total');
      let htmldata = '';
      $this.css('font-size', `${$this.attr('data-font-size')}px`);
      let i;
      for (i = 0; i < $total; i += 1) {
        htmldata += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="2" r="2"/><path d="M12.7 5c-.5-.1-1.1-.1-1.5 0-3.4.4-4.5 4.3-4.2 7.3.1 1.3 2.2 1.3 2 0-.1-1.1-.1-2.7.5-3.9V12.8c0 3.4 0 6.7-.1 10.1-.1 1.5 2.2 1.5 2.3 0 .1-2.6.1-5.3.1-7.9h.3c0 2.6 0 5.3.1 7.9.1 1.5 2.4 1.5 2.3 0-.1-3.3-.1-6.7-.1-10.1v-.3c0-1.5-.1-2.9 0-4.4.7 1.2.8 2.9.6 4.1-.1 1.3 1.9 1.3 2 0 .3-3-.8-6.9-4.3-7.2z"/></svg>`;
      }
      $this.html(htmldata);
      if ($().appear && $('html').hasClass('cssanimations')) {
        $('.progress-icons').appear(
          () => {
            // const $this = $(this);
            const $active = $this.attr('data-active');
            const $icons = $this.find(`svg:lt(${$active})`);
            const $delay = parseInt(validatedata($this.attr('data-delay'), 20));
            let delay = $delay;
            $('*[data-color]').each(function() {
              $(this).css('color', `#${$(this).data('color')}`);
            });
            for (i = 0; i < $icons.length; i += 1) {
              setTimeout(
                (function(i) {
                  return function() {
                    i.style.fill = $this.attr('data-icon-color');
                  };
                })($icons[i]),
                delay
              );
              delay += $delay;
            }
          },
          {
            accY: -100,
          }
        );
      } else {
        $this.each(() => {
          const $active = $this.attr('data-active');
          const $icons = $this.find(`svg:lt(${$active})`);
          $icons.css('fill', $this.attr('data-icon-color'));
        });
      }
    });
  }

  /* ---------------------------------------------
		Parallax Header
--------------------------------------------- */
  function initParallax() {
    const scrolled = $(window).scrollTop();
    $('.masthead__wrap').css('opacity', 1 - scrolled * 0.002);
  }

  /* ---------------------------------------------
		Chart #1 - Specialties
--------------------------------------------- */

  function initChartAllSpecialties() {
    // based on prepared DOM, initialize echarts instance

    const tooltip = {
      trigger: 'item',
      confine: true,
      formatter: '{a} <br/>{b}: {d}%',
    };

    const color = ['#f58220', '#003c69', '#017581', '#acaeb1', '#62489d', '#a4203d'];

    const toolbox = {
      show: true,
      orient: 'vertical',
      feature: {
        mark: {
          show: true,
          title: {
            mark: 'Markline switch',
            markUndo: 'Undo markline',
            markClear: 'Clear markline',
          },
        },
        dataView: {
          show: true,
          readOnly: false,
          title: 'View data',
          lang: ['View chart data', 'Close', 'Update'],
        },
        magicType: {
          show: true,
          title: {
            pie: 'Switch to pies',
            funnel: 'Switch to funnel',
          },
          type: ['pie', 'funnel'],
          option: {
            funnel: {
              x: '25%',
              y: '20%',
              width: '50%',
              height: '70%',
              funnelAlign: 'left',
              max: 1548,
            },
          },
        },
        restore: {
          show: true,
          title: 'Restore',
        },
        saveAsImage: {
          show: true,
          title: 'Same as image',
          lang: ['Save'],
        },
      },
    };

    const chartAllSpecialties = echarts.init(document.getElementById('chartAllSpecialties'));
    const optionsAllSpecialties = {
      title: {
        text: 'Specialties',
        subtext: '2017 AAPA Salary Survey',
        left: 'center',
        top: 20,
      },

      tooltip,

      legend: {
        orient: 'horizontal',
        bottom: 0,
      },

      color,

      toolbox,

      calculable: true,

      series: [
        {
          name: 'Specialties',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          label: {
            show: false,
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          data: [
            {
              value: 24.6,
              name: 'Primary Care',
            },
            {
              value: 10.7,
              name: 'Internal Med. Subspecialties',
            },
            {
              value: 8.9,
              name: 'Emergency Medicine',
            },
            {
              value: 1.3,
              name: 'Pediatric Subspecialties',
            },
            {
              value: 28.6,
              name: 'Other',
            },
            {
              value: 25.9,
              name: 'Surgical',
            },
          ],
        },
      ],
    };

    chartAllSpecialties.setOption(optionsAllSpecialties);
    // Resize chart
    // ------------------------------

    $(() => {
      // Resize function
      function resize() {
        setTimeout(() => {
          // Resize chart
          chartAllSpecialties.resize();
        }, 200);
      }
      // Resize chart on menu width change and window resize
      $(window).on('resize', resize);
      $('.menu-toggle').on('click', resize);
    });
  }

  /* ---------------------------------------------
		Chart #2 - Work Settings
--------------------------------------------- */
  function initChartWorkSettings() {
    const tooltip = {
      trigger: 'item',
      confine: true,
      formatter: '{a} <br/>{b}: {d}%',
    };

    const color = ['#f58220', '#017581', '#a4203d', '#003c69', '#62489d'];

    const toolbox = {
      show: true,
      orient: 'vertical',
      feature: {
        mark: {
          show: true,
          title: {
            mark: 'Markline switch',
            markUndo: 'Undo markline',
            markClear: 'Clear markline',
          },
        },
        dataView: {
          show: true,
          readOnly: false,
          title: 'View data',
          lang: ['View chart data', 'Close', 'Update'],
        },
        magicType: {
          show: true,
          title: {
            pie: 'Switch to pies',
            funnel: 'Switch to funnel',
          },
          type: ['pie', 'funnel'],
          option: {
            funnel: {
              x: '25%',
              y: '20%',
              width: '50%',
              height: '70%',
              funnelAlign: 'left',
              max: 1548,
            },
          },
        },
        restore: {
          show: true,
          title: 'Restore',
        },
        saveAsImage: {
          show: true,
          title: 'Same as image',
          lang: ['Save'],
        },
      },
    };

    const chartWorkSettings = echarts.init(document.getElementById('chartWorkSettings'));
    const optionsWorkSettings = {
      title: {
        text: 'Work Settings',
        subtext: '2017 AAPA Salary Survey',
        x: 'center',
      },
      tooltip,

      legend: {
        orient: 'horizontal',
        bottom: 0,
      },
      color,
      toolbox,
      calculable: true,
      series: [
        {
          name: 'Work Settings',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          label: {
            show: false,
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          data: [
            {
              value: 38.3,
              name: 'Hospital',
            },
            {
              value: 6.1,
              name: 'Urgent Care Center',
            },
            {
              value: 7.7,
              name: 'Other',
            },
            {
              value: 2.4,
              name: 'School, college or university',
            },
            {
              value: 45.5,
              name: 'Outpatient Office or Clinic',
            },
          ],
        },
      ],
    };

    chartWorkSettings.setOption(optionsWorkSettings);

    $(() => {
      // Resize function
      function resize() {
        setTimeout(() => {
          // Resize chart
          chartWorkSettings.resize();
        }, 200);
      }
      // Resize chart on menu width change and window resize
      $(window).on('resize', resize);
      $('.menu-toggle').on('click', resize);
    });
  }

  /* ---------------------------------------------
     Testimonial Slider
--------------------------------------------- */
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    items: 1,
    autoplay: true,
    autoplayTimeout: 10000,
    autoplayHoverPause: true,
  });

  /* ---------------------------------------------
     Circle Charts
--------------------------------------------- */
  function initCircleCharts() {
    $('.wphts__chart').appear(() => {
      $('#circle-1')
        .circleProgress({
          size: 125,
          value: 0.91,
          fill: {
            color: '#62489d',
          },
        })
        .on('circle-animation-progress', function(event, progress) {
          $(this)
            .find('strong')
            .html(`${Math.round(91 * progress)}<i>%</i>`);
        });
      $('#circle-2')
        .circleProgress({
          size: 125,
          value: 0.92,
          fill: {
            color: '#f58220',
          },
        })
        .on('circle-animation-progress', function(event, progress) {
          $(this)
            .find('strong')
            .html(`${Math.round(92 * progress)}<i>%</i>`);
        });
      $('#circle-3')
        .circleProgress({
          size: 125,
          value: 0.93,
          fill: {
            color: '#017581',
          },
        })
        .on('circle-animation-progress', function(event, progress) {
          $(this)
            .find('strong')
            .html(`${Math.round(93 * progress)}<i>%</i>`);
        });
    });
  }

  /* ---------------------------------------------
     Event Listeners
--------------------------------------------- */
  $(window).on('load', () => {
    $(window).trigger('scroll');
    $(window).trigger('resize');

    // $('body').imagesLoaded(() => {
    // 	$('.page-loader .sk-folding-cube').fadeOut();
    // 	$('.page-loader')
    // 		.delay(200)
    // 		.fadeOut('slow');
    // });
  });

  $(document).ready(() => {
    $(window).trigger('resize');
    initCounters();
    initPeopleCounter();
    initChartAllSpecialties();
    initChartWorkSettings();
    initCircleCharts();
  });

  $(window).on('scroll', () => {
    initParallax();
  });
})(jQuery);
