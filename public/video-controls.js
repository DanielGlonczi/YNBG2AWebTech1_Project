$(document).ready(function () {
  var video = document.getElementById('demonVideo');

  if (!video) {
    console.log('Video element not found');
    return;
  }

  // Play button
  $('#playBtn').on('click', function () {
    video.play();
    $(this).fadeOut(200).fadeIn(200);
  });

  // Pause button
  $('#pauseBtn').on('click', function () {
    video.pause();
    $(this).fadeOut(200).fadeIn(200);
  });

  // Rewind button
  $('#rewindBtn').on('click', function () {
    video.currentTime = 0;
    $(this).css('background-color', '#2ecc71');
    setTimeout(function () {
      $('#rewindBtn').css('background-color', '#e74c3c');
    }, 500);
  });

  // Mute/Unmute button
  var isMuted = false;
  $('#muteBtn').on('click', function () {
    if (isMuted) {
      video.muted = false;
      $(this).text('🔇 Némítás');
      isMuted = false;
    } else {
      video.muted = true;
      $(this).text('🔊 Hang be');
      isMuted = true;
    }
    $(this).fadeOut(100).fadeIn(100);
  });

  // Video play event
  video.addEventListener('play', function () {
    console.log('Video started playing');
  });

  // Video pause event
  video.addEventListener('pause', function () {
    console.log('Video paused');
  });

  // Video ended event
  video.addEventListener('ended', function () {
    console.log('Video ended');
    alert('A videó lejátszása befejeződött!');
  });

  // Update progress
  video.addEventListener('timeupdate', function () {
    var progress = (video.currentTime / video.duration) * 100;
    console.log('Video progress: ' + progress.toFixed(2) + '%');
  });
});
