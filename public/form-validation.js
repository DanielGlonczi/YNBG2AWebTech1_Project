$(document).ready(function () {
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();

    // Reset all errors
    $('.error-message').hide();
    $('.error-input').removeClass('error-input');
    $('#successMessage').hide();

    var isValid = true;

    // Validate name
    var name = $('#name').val().trim();
    if (name.length < 3) {
      showError('name', 'nameError');
      isValid = false;
    }

    // Validate email
    var email = $('#email').val().trim();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError('email', 'emailError');
      isValid = false;
    }

    // Validate phone
    var phone = $('#phone').val().trim();
    if (phone.length > 0) {
      var phoneRegex =
        /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
      if (!phoneRegex.test(phone)) {
        showError('phone', 'phoneError');
        isValid = false;
      }
    }

    // Validate model selection
    var model = $('#model').val();
    if (!model) {
      showError('model', 'modelError');
      isValid = false;
    }

    // Validate message
    var message = $('#message').val().trim();
    if (message.length < 10) {
      showError('message', 'messageError');
      isValid = false;
    }

    // Validate privacy checkbox
    var privacy = $('#privacy').is(':checked');
    if (!privacy) {
      $('#privacyError').show();
      $('#privacy').parent().css('color', '#e74c3c');
      isValid = false;
    }

    // If all valid, show success
    if (isValid) {
      // Collect form data
      var formData = {
        name: name,
        email: email,
        phone: phone,
        model: model,
        contactMethod: $('input[name="contact-method"]:checked').val(),
        interests: getCheckedInterests(),
        message: message,
        newsletter: $('#newsletter').is(':checked'),
      };

      console.log('Form data:', formData);

      // Show success message with animation
      $('#successMessage').slideDown(500);

      // Scroll to success message
      $('html, body').animate(
        {
          scrollTop: $('#successMessage').offset().top - 100,
        },
        500
      );

      // Reset form after 3 seconds
      setTimeout(function () {
        $('#contactForm')[0].reset();
        $('#successMessage').slideUp(500);
      }, 3000);
    } else {
      // Scroll to first error
      var firstError = $('.error-input').first();
      if (firstError.length) {
        $('html, body').animate(
          {
            scrollTop: firstError.offset().top - 100,
          },
          500
        );
      }
    }
  });

  // Function to show error
  function showError(inputId, errorId) {
    $('#' + inputId).addClass('error-input');
    $('#' + errorId)
      .show()
      .fadeIn(300);
  }

  // Function to get checked interests
  function getCheckedInterests() {
    var interests = [];
    $('input[name="interests"]:checked').each(function () {
      interests.push($(this).val());
    });
    return interests;
  }

  // Real-time validation
  $('#name').on('blur', function () {
    var name = $(this).val().trim();
    if (name.length >= 3) {
      $(this).removeClass('error-input');
      $('#nameError').hide();
      $(this).css('border-color', '#2ecc71');
    }
  });

  $('#email').on('blur', function () {
    var email = $(this).val().trim();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      $(this).removeClass('error-input');
      $('#emailError').hide();
      $(this).css('border-color', '#2ecc71');
    }
  });

  $('#phone').on('blur', function () {
    var phone = $(this).val().trim();
    if (
      phone.length === 0 ||
      /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/.test(
        phone
      )
    ) {
      $(this).removeClass('error-input');
      $('#phoneError').hide();
      $(this).css('border-color', '#2ecc71');
    }
  });

  $('#model').on('change', function () {
    if ($(this).val()) {
      $(this).removeClass('error-input');
      $('#modelError').hide();
      $(this).css('border-color', '#2ecc71');
    }
  });

  $('#message').on('blur', function () {
    var message = $(this).val().trim();
    if (message.length >= 10) {
      $(this).removeClass('error-input');
      $('#messageError').hide();
      $(this).css('border-color', '#2ecc71');
    }
  });

  $('#privacy').on('change', function () {
    if ($(this).is(':checked')) {
      $('#privacyError').hide();
      $(this).parent().css('color', '#333');
    }
  });

  // Remove error styling on input
  $('.contact-form input, .contact-form select, .contact-form textarea').on(
    'input',
    function () {
      if ($(this).hasClass('error-input')) {
        $(this).removeClass('error-input');
        $(this).css('border-color', '#ddd');
      }
    }
  );
});
