var gallery = document.getElementById("gallery");


function loadContent() {
  let previousNode = null;
  gallerySrc.forEach(item => {
    let galleryItem = document.createElement("div", {class : "item"});
    let giImage = document.createElement("img", {src : item.image, alt : item.name});
    let giCaption = document.createElement("div", {class : "caption"});
    gallery.insertBefore()
  });
}

function main() {
  loadContent();
}

window.onload = main;
