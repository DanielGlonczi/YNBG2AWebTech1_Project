$(document).ready(function () {
  // Counter animation
  function animateCounters() {
    $('.counter-number').each(function () {
      var $this = $(this);
      var target = parseInt($this.data('target'));
      var duration = 2000;
      var increment = target / (duration / 50);
      var current = 0;

      var timer = setInterval(function () {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        $this.text(Math.floor(current));
      }, 50);
    });
  }

  // Trigger counter animation
  var countersAnimated = false;
  $(window).on('scroll', function () {
    var counterSection = $('.stats-counter-section');
    if (counterSection.length && !countersAnimated) {
      var sectionTop = counterSection.offset().top;
      var windowBottom = $(window).scrollTop() + $(window).height();

      if (windowBottom > sectionTop + 100) {
        countersAnimated = true;
        animateCounters();
      }
    }
  });

  // Gallery items fade in on load
  $('.gallery-item').each(function (index) {
    $(this)
      .css({
        opacity: '0',
        transform: 'scale(0.9)',
      })
      .delay(index * 100)
      .animate(
        {
          opacity: '1',
        },
        500
      )
      .css({
        transform: 'scale(1)',
      });
  });

  // Video gallery items animation
  $('.video-gallery-item').each(function (index) {
    $(this)
      .css({
        opacity: '0',
        transform: 'translateY(30px)',
      })
      .delay(index * 200)
      .animate(
        {
          opacity: '1',
        },
        700
      )
      .css({
        transform: 'translateY(0)',
      });
  });

  // Gallery filter
  var galleryItems = document.querySelectorAll('.gallery-item');
  console.log('Total gallery items:', galleryItems.length);

  // Modify gallery items
  galleryItems.forEach(function (item, index) {
    // Add data attribute
    item.setAttribute('data-index', index + 1);

    var clickCount = 0;
    item.addEventListener('click', function () {
      clickCount++;
      console.log(
        'Gallery item ' + (index + 1) + ' clicked ' + clickCount + ' times'
      );
    });
  });

  // Video autoplay on hover
  $('.video-gallery-item video')
    .on('mouseenter', function () {
      $(this).prop('muted', true);
      this.play().catch(function (e) {
        console.log('Autoplay prevented:', e);
      });
    })
    .on('mouseleave', function () {
      this.pause();
    });

  // Lazy loading simulation
  var lazyLoadImages = function () {
    var images = document.querySelectorAll('.gallery-item img');
    images.forEach(function (img) {
      if (img.getBoundingClientRect().top < window.innerHeight + 200) {
        img.style.opacity = '1';
      }
    });
  };

  window.addEventListener('scroll', lazyLoadImages);
  lazyLoadImages();

  // jQuery animation
  $('.gallery-item').hover(
    function () {
      $(this).find('.gallery-overlay').stop().slideDown(300);
    },
    function () {
      $(this).find('.gallery-overlay').stop().slideUp(300);
    }
  );

  // Counter item pulse animation
  $('.counter-item').each(function (index) {
    var $item = $(this);
    setInterval(function () {
      $item
        .find('.counter-number')
        .animate(
          {
            'font-size': '4.2em',
          },
          300
        )
        .animate(
          {
            'font-size': '4em',
          },
          300
        );
    }, 5000 + index * 1000);
  });
});

// Pure JavaScript
document.addEventListener('DOMContentLoaded', function () {
  // Select by tag name
  var allVideos = document.getElementsByTagName('video');
  console.log('Total videos on page:', allVideos.length);

  // Select by class name
  var galleryItems = document.getElementsByClassName('gallery-item');
  console.log('Gallery items:', galleryItems.length);

  // Select by ID
  var gallerySection = document.querySelector('.gallery-section');
  if (gallerySection) {
    console.log('Gallery section found');

    // Modify existing element
    var heading = gallerySection.querySelector('h2');
    if (heading) {
      // Store original text
      var originalText = heading.textContent;

      // Add event listener
      heading.addEventListener('click', function () {
        if (this.textContent === originalText) {
          this.textContent = 'Képek és Videók';
          this.style.color = '#e74c3c';
        } else {
          this.textContent = originalText;
          this.style.color = '#1a1a1a';
        }
      });
    }
  }

  // Create and add new HTML element
  var statsSection = document.querySelector(
    '.stats-counter-section .container'
  );
  if (statsSection) {
    var infoBox = document.createElement('div');
    infoBox.style.marginTop = '30px';
    infoBox.style.padding = '20px';
    infoBox.style.backgroundColor = '#e74c3c';
    infoBox.style.color = '#fff';
    infoBox.style.borderRadius = '10px';
    infoBox.style.textAlign = 'center';
    infoBox.innerHTML =
      '<p>Ez az elem JavaScript-tel lett létrehozva és hozzáadva az oldalhoz!</p>';

    // statsSection.appendChild(infoBox);
    console.log('Info box created (not added to prevent layout changes)');
  }
});
