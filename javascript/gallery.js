var gallery;

function previewContent(item) {
  let galleryItem = gallerySrc.content[gallerySrc.content.findIndex(i => i.name === item)];
  let view = document.getElementById("galleryView");
  view.innerHTML = "";
  if (view.style.visibility !== "visible" || view.style.visibility === "") {
    let items = document.getElementById("gallery").getElementsByClassName("item");
    for (let i = 0; i < items.length; ++i) {
      items[i].style.filter = "blur(4px)";
    }
    view.style.visibility = "visible";
  }
  let viewImage = document.createElement("img");
  let imagePane = document.createElement("div");
  let infoPane = document.createElement("div");
  let closeButton = document.createElement("div");
  let closeLink = document.createElement("a");
  let title = document.createElement("div");
  let desc = document.createElement("div");
  let button = document.createElement("div");

  infoPane.style.width = "40%";
  infoPane.style.minHeight = "400px";
  imagePane.style.width = "60%";
  viewImage.src = galleryItem.image;
  viewImage.alt = galleryItem.name;
  closeButton.id = "closeButton";
  closeLink.href = "#";
  closeLink.setAttribute("onclick", "closePreview()");
  title.id = "title";
  desc.id = "desc";
  button.id = "button";

  closeLink.appendChild(document.createTextNode("[close]"));
  closeButton.appendChild(closeLink);
  imagePane.appendChild(viewImage);
  infoPane.appendChild(closeButton);
  infoPane.appendChild(title);
  infoPane.appendChild(desc);
  infoPane.appendChild(button);
  title.appendChild(document.createTextNode(galleryItem.name));
  desc.appendChild(document.createTextNode(galleryItem.desc));
  view.appendChild(imagePane);
  view.appendChild(infoPane);
}

function closePreview() {
  let view = document.getElementById("galleryView");
  let items = document.getElementById("gallery").getElementsByClassName("item");
  view.innerHTML = "";
  view.style.visibility = "hidden";
  for (let i = 0; i < items.length; ++i) {
    items[i].style.filter = "";
  }
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
    gipLink.setAttribute("onclick", "previewContent('"+ item.name +"')");
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
