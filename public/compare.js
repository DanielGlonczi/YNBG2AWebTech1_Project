// Compare page JavaScript with AJAX and JSON

$(document).ready(function () {
  var carsData = {
    demon: {
      name: 'Demon 170',
      image: '../images/card_demon_170.jpg',
      hp: '1025 LE',
      torque: '1281 Nm',
      acceleration: '1.9 mp',
      engine: '6.2L V8 Supercharged',
      price: '~120 millió Ft',
      topSpeed: '270 km/h',
      hpValue: 1025,
    },
    hellcat: {
      name: 'Hellcat Redeye',
      image: '../images/card_srt_hellcat_redeye.jpg',
      hp: '807 LE',
      torque: '972 Nm',
      acceleration: '3.4 mp',
      engine: '6.2L V8 Supercharged',
      price: '~45 millió Ft',
      topSpeed: '327 km/h',
      hpValue: 807,
    },
    jailbreak: {
      name: 'Jailbreak',
      image: '../images/card_jailbreak.jpg',
      hp: '717-807 LE',
      torque: '881-972 Nm',
      acceleration: '3.4-3.6 mp',
      engine: '6.2L V8 Supercharged',
      price: '~48 millió Ft',
      topSpeed: '327 km/h',
      hpValue: 807,
    },
    srt: {
      name: 'SRT 392',
      image: '../images/card_392.png',
      hp: '485 LE',
      torque: '644 Nm',
      acceleration: '4.2 mp',
      engine: '6.4L V8',
      price: '~28 millió Ft',
      topSpeed: '285 km/h',
      hpValue: 485,
    },
  };

  // Compare button click
  $('#compareBtn').on('click', function () {
    var model1 = $('#model1').val();
    var model2 = $('#model2').val();

    if (!model1 || !model2) {
      alert('Kérlek válassz ki mindkét modellt!');
      return;
    }

    if (model1 === model2) {
      alert('Kérlek válassz két különböző modellt!');
      return;
    }

    // Get car data
    var car1 = carsData[model1];
    var car2 = carsData[model2];

    // Populate comparison
    populateComparison(car1, car2);

    // Show results with animation
    $('#comparisonResults').slideDown(800);

    // Scroll to results
    $('html, body').animate(
      {
        scrollTop: $('#comparisonResults').offset().top - 100,
      },
      1000
    );
  });

  // Function to populate comparison
  function populateComparison(car1, car2) {
    // Car 1
    $('#car1-name').text(car1.name);
    $('#car1-image').attr('src', car1.image).attr('alt', car1.name);
    $('#car1-hp').text(car1.hp);
    $('#car1-torque').text(car1.torque);
    $('#car1-acceleration').text(car1.acceleration);
    $('#car1-engine').text(car1.engine);
    $('#car1-price').text(car1.price);
    $('#car1-topspeed').text(car1.topSpeed);

    // Car 2
    $('#car2-name').text(car2.name);
    $('#car2-image').attr('src', car2.image).attr('alt', car2.name);
    $('#car2-hp').text(car2.hp);
    $('#car2-torque').text(car2.torque);
    $('#car2-acceleration').text(car2.acceleration);
    $('#car2-engine').text(car2.engine);
    $('#car2-price').text(car2.price);
    $('#car2-topspeed').text(car2.topSpeed);

    // Highlight better specs
    highlightBetterSpecs(car1, car2);

    // Determine winner
    determineWinner(car1, car2);

    // Animate tables
    $('.comparison-table tr').each(function (index) {
      $(this)
        .hide()
        .delay(index * 100)
        .fadeIn(500);
    });
  }

  // Highlight better specs
  function highlightBetterSpecs(car1, car2) {
    // Compare HP
    if (car1.hpValue > car2.hpValue) {
      $('#car1-hp').css({ color: '#2ecc71', 'font-weight': 'bold' });
      $('#car2-hp').css({ color: '#e74c3c', 'font-weight': 'normal' });
    } else if (car2.hpValue > car1.hpValue) {
      $('#car2-hp').css({ color: '#2ecc71', 'font-weight': 'bold' });
      $('#car1-hp').css({ color: '#e74c3c', 'font-weight': 'normal' });
    }
  }

  // Determine winner
  function determineWinner(car1, car2) {
    var winner = '';

    if (car1.hpValue > car2.hpValue) {
      winner = car1.name + ' a teljesítmény győztese ' + car1.hp + ' lóerővel!';
    } else if (car2.hpValue > car1.hpValue) {
      winner = car2.name + ' a teljesítmény győztese ' + car2.hp + ' lóerővel!';
    } else {
      winner = 'Mindkét modell ugyanolyan teljesítménnyel rendelkezik!';
    }

    $('#winnerText').text(winner);
    $('#winnerSection').slideDown(500);
  }

  // Load JSON button
  $('#loadJsonBtn').on('click', function () {
    // Disable button during loading
    $(this).prop('disabled', true).text('Betöltés...');

    // AJAX call to load JSON
    $.ajax({
      url: 'cars.json',
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        console.log('JSON data loaded:', data);
        displayJsonData(data);
        $('#loadJsonBtn')
          .prop('disabled', false)
          .text('JSON Adatok Újratöltése');
      },
      error: function (xhr, status, error) {
        console.error('Error loading JSON:', error);
        // Fallback: display local data
        displayJsonData({ cars: carsData });
        $('#loadJsonBtn')
          .prop('disabled', false)
          .text('JSON Adatok Betöltve (Fallback)');
      },
    });
  });

  // Display JSON data
  function displayJsonData(data) {
    var formattedJson = JSON.stringify(data, null, 2);
    $('#jsonData').text(formattedJson).hide().fadeIn(800);

    // Animate JSON display
    $('#jsonData').css('opacity', '0').animate(
      {
        opacity: '1',
      },
      1000
    );
  }

  // Alternative jQuery AJAX method
  function loadJsonWithJquery() {
    $.getJSON('cars.json', function (data) {
      console.log('Data loaded with $.getJSON:', data);
    }).fail(function () {
      console.log('Failed to load JSON file');
    });
  }

  // Pure JavaScript AJAX example
  function loadJsonWithVanillaJS() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'cars.json', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        console.log('Data loaded with vanilla JS:', data);
      }
    };
    xhr.send();
  }
});
