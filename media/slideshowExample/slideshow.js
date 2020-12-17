const slideshowImages = [
  "beachDay.png", "catIdle.gif",
  "froggyDance.gif", "gm48Collect.gif",
  "isometricTree.png", "logo.jpg",
  "profilePic.png", "website.png"
];
var imagePanel, image = 0;
var auto, slideCounter, slideMax = 3;
var clickSound = new Audio("audio/click.wav");

function changeImage() {
  imagePanel.src = "images/" + slideshowImages[image];
  slideCounter = slideMax;
}

function next(sound) {
  image++;
  if (image >= slideshowImages.length) image = 0;
  if (sound) clickSound.play();
  changeImage();
}

function random() {
  image = Math.floor(Math.random() * slideshowImages.length);
  clickSound.play();
  changeImage();
}

function previous() {
  image--;
  if (image < 0) image = slideshowImages.length - 1;
  clickSound.play();
  changeImage();
}

function autoSlide() {
  slideCounter--;
  if (slideCounter <= 0) next(false);
}

function main() {
  imagePanel = document.getElementById("displayImage");
  auto = setInterval(autoSlide, 1000);
  random();
}

window.onload = main;
