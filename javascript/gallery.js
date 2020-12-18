// --------------
// Gallery context
// --------------
var gallery;

// --------------
// Functions
// --------------

// previewContent : When an item is clicked, this function renders and displays
//                : The preview pane.
function previewContent(item) {
  // Find the item that was clicked on via its name
  let galleryItem = gallerySrc.content[gallerySrc.content.findIndex(i => i.name === item)];
  // Get the preview pane context
  let view = document.getElementById("galleryView");
  // Set the preview pane to nothing in case another item is clicked
  view.innerHTML = "";
  // Get all items and blur them, set the preview pane to be visible
  if (view.style.visibility !== "visible" || view.style.visibility === "") {
    let items = document.getElementById("gallery").getElementsByClassName("item");
    for (let i = 0; i < items.length; ++i) {
      items[i].style.filter = "blur(4px)";
    }
    view.style.visibility = "visible";
  }
  // Declare and define all new elements to be added to the preview pane
  let viewImage = document.createElement("img");
  let imagePane = document.createElement("div");
  let infoPane = document.createElement("div");
  let closeButton = document.createElement("div");
  let closeLink = document.createElement("a");
  let title = document.createElement("div");
  let desc = document.createElement("div");
  let button = document.createElement("div");
  let buttonButton = document.createElement("div");
  let buttonLink = document.createElement("a");

  // Set the styles and attributes accordingly
  infoPane.style.width = "40%";
  infoPane.style.minHeight = "300px";
  imagePane.style.width = "60%";
  viewImage.src = galleryItem.image;
  viewImage.alt = galleryItem.name;
  closeButton.id = "closeButton";
  closeLink.href = "#";
  closeLink.setAttribute("onclick", "closePreview()");
  title.id = "title";
  desc.id = "desc";
  buttonButton.id = "button";
  buttonLink.href = galleryItem.link;

  // Append the elements inside of each other, and then finally to the preview pane
  buttonLink.appendChild(document.createTextNode("["+ galleryItem.linkdesc +"]"));
  closeLink.appendChild(document.createTextNode("[close]"));
  closeButton.appendChild(closeLink);
  imagePane.appendChild(viewImage);
  infoPane.appendChild(closeButton);
  buttonButton.appendChild(buttonLink);
  button.appendChild(buttonButton);
  infoPane.appendChild(title);
  infoPane.appendChild(desc);
  if (galleryItem.link !== "" && typeof galleryItem.link !== "undefined") {
    infoPane.appendChild(button);
  }
  title.appendChild(document.createTextNode(galleryItem.name));
  desc.appendChild(document.createTextNode(galleryItem.desc));
  view.appendChild(imagePane);
  view.appendChild(infoPane);
}

// closePreview : When the close button is pressed it closes down the preview
//              : pane.
function closePreview() {
  // Get preview and items context
  let view = document.getElementById("galleryView");
  let items = document.getElementById("gallery").getElementsByClassName("item");
  // Reset the preview pane to nothing and hide it
  view.innerHTML = "";
  view.style.visibility = "hidden";
  // Unblur all the items
  for (let i = 0; i < items.length; ++i) {
    items[i].style.filter = "";
  }
}

// loadContent : Load the content from the gallerySrc variable defined outside
//             : of main JavaScript so it can be implemented in more than one
//             : webpage. Render flexbox containers to the page.
function loadContent() {
  // For each item in the array, create a container
  gallerySrc.content.forEach(item => {
    // Declare and define all new elements to be added to the item container
    let galleryItem = document.createElement("div");
    let giPreview = document.createElement("div");
    let gipLink = document.createElement("a");
    let giImage = document.createElement("img");
    let giCaption = document.createElement("div");

    // Set the styles and attributes accordingly
    galleryItem.className = "item";
    giPreview.className = "preview";
    gipLink.setAttribute("onclick", "previewContent('"+ item.name +"')");
    gipLink.href = "#";
    giImage.src = item.image;
    giImage.alt = item.name;
    giCaption.className = "caption";

    // Append the elements inside of each other, and then finally to the item container
    giCaption.appendChild(document.createTextNode(item.name));
    giPreview.appendChild(giCaption);
    giPreview.appendChild(giImage);
    gipLink.appendChild(giPreview);
    galleryItem.appendChild(gipLink);
    gallery.insertBefore(galleryItem, null);
  });
}

// This function is ran once the page loads
function main() {
  // Set global gallery context
  gallery = document.getElementById("gallery");
  // Load and render the items
  loadContent();
}

// Load into main function once webpage loads
window.onload = main;
