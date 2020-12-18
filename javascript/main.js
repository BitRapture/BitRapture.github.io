// --------------
// Constants
// --------------
const colorA = "black";
const colorB = "white";

// toggleNavList : This toggles the navigation menu on the webpage
function toggleNavList() {
  // Get element contexts
  let root = document.documentElement;
  let rootColor = root.style.getPropertyValue("--primary-color");
  let nav = document.getElementById("navList");
  let navB = document.getElementById("navButton");

  // If the navigation menu is invisible, display it and give it a size so that
  // page content scales
  if (nav.style.visibility === "hidden" || nav.style.visibility === "") {
    nav.style.visibility = "visible";
    nav.style.width = "200px";
    nav.style.minWidth = "200px";
    nav.style.marginRight = "3px";
    navB.src = "media/buttons/navListButtonClose"+ ( rootColor === colorA || rootColor === "" ? "" : "Light") +".png";
  } else {
    nav.style.visibility = "hidden";
    nav.style.width = "0px";
    nav.style.minWidth = "0px";
    nav.style.marginRight = "0px";
    navB.src = "media/buttons/navListButtonOpen"+ ( rootColor === colorA || rootColor === "" ? "" : "Light") +".png";
  }
}

// toggleTheme : Toggles the theme between dark mode and light mode
function toggleTheme() {
  // Get element contexts
  let root = document.documentElement;
  let nav = document.getElementById("navList");
  let navB = document.getElementById("navButton");
  let themeB = document.getElementById("themeButton");

  // Reverse the colourscheme
  let toggleB = (root.style.getPropertyValue("--primary-color") === colorB ? colorA : colorB);
  let toggleF = (toggleB === colorB ? colorA : colorB);

  // Invert the declared CSS variables from their current colour
  root.style.setProperty("--primary-color", toggleB);
  root.style.setProperty("--secondary-color", toggleF);

  // Change the navigation menu button to the correct theme verison
  if (nav.style.visibility === "hidden" || nav.style.visibility === "") {
    navB.src = "media/buttons/navListButtonOpen"+ (toggleB === colorA ? "" : "Light") +".png";
  } else {
    navB.src = "media/buttons/navListButtonClose"+ (toggleB === colorA ? "" : "Light") +".png";
  }

  // Change the theme button to the correct theme verison
  if (toggleB === colorA) {
    themeB.src = "media/buttons/themeButtonOff.png";
  } else {
    themeB.src = "media/buttons/themeButtonOn.png";
  }
}
