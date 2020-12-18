// --------------
// Constants
// --------------
// Contains all the image names and file types
const slideshowImages = [
  "beachDay.png", "catIdle.gif",
  "froggyDance.gif", "gm48Collect.gif",
  "isometricTree.png", "logo.jpg",
  "profilePic.png", "website.png"
];
// --------------
// Variables
// --------------
// imagePanel element context
// image is the current index of the slideshow array
// auto is for the interval function
// slideCounter is the second timer before the slide changes
// slideMax is how many seconds is needed until the slide changes
// clickSound is for the click sound effect
var imagePanel, image = 0;
var auto, slideCounter, slideMax = 3;
var clickSound = new Audio("audio/click.wav");

// changeImage : Change the image to the current slide
function changeImage() {
  imagePanel.src = "images/" + slideshowImages[image];
  slideCounter = slideMax;
}

// next : Goes to the next image or wraps back around to the beginning of the
//      : slide. Contains a parameter for a sound to be played as auto uses this
//      : function for convenience and it would play automatically otherwise.
function next(sound) {
  image++;
  if (image >= slideshowImages.length) image = 0;
  if (sound) clickSound.play();
  changeImage();
}

// random : Selects a random image from the entire slideshow array
function random() {
  image = Math.floor(Math.random() * slideshowImages.length);
  clickSound.play();
  changeImage();
}

// previous : Goes to the previous image or wraps back around to the end of the
//          : slide.
function previous() {
  image--;
  if (image < 0) image = slideshowImages.length - 1;
  clickSound.play();
  changeImage();
}

// autoSlide : Decrements the slide counter, when it finishes it calls the next
//           : function without playing the sound effect.
function autoSlide() {
  slideCounter--;
  if (slideCounter <= 0) next(false);
}

// This function is ran once the page loads
function main() {
  // Get element context
  imagePanel = document.getElementById("displayImage");
  // Start the auto slideshow
  auto = setInterval(autoSlide, 1000);
  // Randomize the first slide on page load
  random();
}

// Load into main function once webpage loads
window.onload = main;
