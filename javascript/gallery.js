var gallery;

function previewContent(item) {
  let index = gallerySrc.content.findIndex(i => i.name === item);
  let view = document.getElementById("galleryView");
  view.style.visibility = "visible";
  view.innerHTML = "hi";
}

function loadContent() {
  gallerySrc.content.forEach(item => {
    let galleryItem = document.createElement("div");
    let giPreview = document.createElement("div");
    let gipLink = document.createElement("a");
    let giImage = document.createElement("img");
    let giCaption = document.createElement("div");
    galleryItem.className = "item";
    giPreview.className = "preview";
    gipLink.setAttribute("onclick", "previewContent('"+ item.name +"')")
    gipLink.href = "#";
    giImage.src = item.image;
    giImage.alt = item.name;
    giCaption.className = "caption";
    giCaption.appendChild(document.createTextNode(item.name));
    giPreview.appendChild(giCaption);
    giPreview.appendChild(giImage);
    gipLink.appendChild(giPreview);
    galleryItem.appendChild(gipLink);
    gallery.insertBefore(galleryItem, null);
  });
}

function main() {
  gallery = document.getElementById("gallery");
  loadContent();
}

window.onload = main;
