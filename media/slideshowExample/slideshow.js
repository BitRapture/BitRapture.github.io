const slideshowImages = [
  "beachDay.png", "catIdle.gif",
  "froggyDance.gif", "gm48Collect.gif",
  "isometricTree.png", "logo.jpg",
  "profilePic.png", "website.png"
];
var imagePanel, image = 0;
var auto, slideCounter, slideMax = 3;

function changeImage() {
  imagePanel.src = "images/" + slideshowImages[image];
  slideCounter = slideMax;
}

function next() {
  image++;
  if (image >= slideshowImages.length) image = 0;
  changeImage();
}

function random() {
  image = Math.floor(Math.random() * slideshowImages.length);
  changeImage();
}

function previous() {
  image--;
  if (image < 0) image = slideshowImages.length - 1;
  changeImage();
}

function autoSlide() {
  slideCounter--;
  if (slideCounter <= 0) next();
}

function main() {
  imagePanel = document.getElementById("displayImage");
  auto = setInterval(autoSlide, 1000);
  random();
}

window.onload = main;
