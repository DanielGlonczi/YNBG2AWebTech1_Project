// Wait for DOM to load
$(document).ready(function () {
  // --- HAMBURGER MENU --- //
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.main-nav ul');

  if (hamburger) {
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('aria-label', 'Menü');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.style.cursor = 'pointer';
  }

  if (hamburger && navMenu) {
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      console.debug('Hamburger clicked');
      const isOpen = navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu
    document.addEventListener('click', (e) => {
      // console debug to trace outside clicks
      // console.debug('Document clicked', e.target);
      if (
        !hamburger.contains(e.target) &&
        !navMenu.contains(e.target) &&
        navMenu.classList.contains('active')
      ) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when a nav link is clicke
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          hamburger.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Smooth scroll for anchor links
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    var target = $(this.getAttribute('href'));
    if (target.length) {
      $('html, body')
        .stop()
        .animate(
          {
            scrollTop: target.offset().top - 80,
          },
          1000
        );
    }
  });

  // Animate stats on scroll
  var statsAnimated = false;
  $(window).on('scroll', function () {
    var statsSection = $('.intro-section');
    if (statsSection.length && !statsAnimated) {
      var statsSectionTop = statsSection.offset().top;
      var windowBottom = $(window).scrollTop() + $(window).height();

      if (windowBottom > statsSectionTop) {
        statsAnimated = true;
        $('.stat-card').each(function (index) {
          $(this)
            .delay(index * 300)
            .fadeIn(500)
            .css({
              opacity: '0',
              transform: 'translateY(20px)',
            })
            .animate(
              {
                opacity: '1',
              },
              500
            )
            .css({
              transform: 'translateY(0)',
            });
        });
      }
    }
  });

  // Highlight text animation
  if ($('#highlight-text').length) {
    $('#highlight-text').hover(
      function () {
        $(this).animate(
          {
            'font-size': '1.15em',
          },
          200
        );
      },
      function () {
        $(this).animate(
          {
            'font-size': '1em',
          },
          200
        );
      }
    );
  }

  // Color selector
  $('input[name="color"]').on('change', function () {
    var colorName = $(this).parent().find('.color-name').text();
    $('#color-choice')
      .text('Kiválasztott szín: ' + colorName)
      .fadeIn();
  });

  // Date selector
  $('#test-drive-date').on('change', function () {
    var selectedDate = $(this).val();
    if (selectedDate) {
      var date = new Date(selectedDate);
      var options = { year: 'numeric', month: 'long', day: 'numeric' };
      var formattedDate = date.toLocaleDateString('hu-HU', options);
      $('#date-choice')
        .text('Választott időpont: ' + formattedDate)
        .fadeIn();
    }
  });

  // Performance slider
  $('#performance-slider').on('input', function () {
    var value = $(this).val();
    $('#slider-value').text(value + ' LE');

    // Change color based on value
    var percentage = (value - 717) / (807 - 717);
    var hue = 0 + percentage * 60;
    $('#slider-value').css('color', 'hsl(' + hue + ', 70%, 50%)');
  });

  // Fuel cost calculator
  $('#monthly-km').on('input', function () {
    var km = parseInt($(this).val());
    var consumption = 14;
    var fuelPrice = 650; // HUF / liter

    var monthlyLiters = (km / 100) * consumption;
    var monthlyCost = monthlyLiters * fuelPrice;

    $('#fuel-cost').text(
      'Becsült havi költség: ' +
        Math.round(monthlyCost).toLocaleString('hu-HU') +
        ' Ft'
    );
  });

  // Datalist selection
  $('#accessories').on('change', function () {
    var selected = $(this).val();
    if (selected) {
      alert('Kiválasztott kiegészítő: ' + selected);
    }
  });

  // Widebody info animation
  if ($('#widebody-info').length) {
    $('#widebody-info')
      .parent()
      .on('click', function () {
        $(this).find('span').fadeOut(300).fadeIn(300);
      });
  }

  // Model cards hover effect
  $('.model-card').hover(
    function () {
      $(this).find('.model-button').css('background-color', '#c0392b');
    },
    function () {
      $(this).find('.model-button').css('background-color', '#e74c3c');
    }
  );

  // Gallery item click
  $('.gallery-item').on('click', function () {
    var imgSrc = $(this).find('img').attr('src');
    // Modal to show full image (basic implementation)
    $('body').append(
      '<div class="image-modal" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:10000;display:flex;align-items:center;justify-content:center;"><img src="' +
        imgSrc +
        '" style="max-width:90%;max-height:90%;"><span style="position:absolute;top:20px;right:40px;color:#fff;font-size:40px;cursor:pointer;" class="close-modal">&times;</span></div>'
    );

    $('.close-modal').on('click', function () {
      $('.image-modal').fadeOut(300, function () {
        $(this).remove();
      });
    });

    $('.image-modal').on('click', function (e) {
      if (e.target === this) {
        $(this).fadeOut(300, function () {
          $(this).remove();
        });
      }
    });
  });

  // Debug
  console.log('Dodge Challenger website loaded successfully!');
});

// Pure JavaScript functions

// Modify HTML element
function createNewElement() {
  var newDiv = document.createElement('div');
  newDiv.className = 'dynamic-element';
  newDiv.textContent = 'This element was created with JavaScript!';
  newDiv.style.padding = '20px';
  newDiv.style.backgroundColor = '#e74c3c';
  newDiv.style.color = '#fff';
  newDiv.style.marginTop = '20px';
  newDiv.style.borderRadius = '5px';
  return newDiv;
}

// Element selection examples
function demonstrateSelectors() {
  // By tag name
  var allDivs = document.getElementsByTagName('div');
  console.log('Total divs:', allDivs.length);

  // By class name
  var cards = document.getElementsByClassName('model-card');
  console.log('Total model cards:', cards.length);

  // By ID
  var hero = document.getElementById('models');
  if (hero) {
    console.log('Models section found');
  }

  // Query selector
  var buttons = document.querySelectorAll('.model-button');
  console.log('Total buttons:', buttons.length);
}

// Call demonstrateSelectors on load
window.addEventListener('load', function () {
  demonstrateSelectors();
});
