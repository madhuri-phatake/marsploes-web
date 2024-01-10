
var viewportWidth = $(window).width();
console.log("Viewport width: " + viewportWidth);

// You can perform actions based on the viewport width
if (viewportWidth < 768) {
  $(".slide__img").removeClass("hide-laptop")
  $(".remove-hide").removeClass("hide-laptop")
  document.addEventListener('DOMContentLoaded', function() {
    let video = document.getElementById('mobileVideo');
    let playButton = document.getElementById('playButton');

    playButton.addEventListener('click', function() {
        video.play();
        // playButton.style.display = 'none'; // Hide the play button after clicking
    });
    console.log("its working")
});
} else {
    // Do something for larger viewports
}

