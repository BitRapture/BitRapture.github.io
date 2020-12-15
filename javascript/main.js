const colorA = "black";
const colorB = "white";

function toggleNavList() {
  let root = document.documentElement;
  let rootColor = root.style.getPropertyValue("--primary-color");
  let nav = document.getElementById("navList");
  let navB = document.getElementById("navButton");
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

function toggleTheme() {
  let root = document.documentElement;
  let nav = document.getElementById("navList");
  let navB = document.getElementById("navButton");
  let themeB = document.getElementById("themeButton");
  let toggleB = (root.style.getPropertyValue("--primary-color") === colorB ? colorA : colorB);
  let toggleF = (toggleB === colorB ? colorA : colorB);

  root.style.setProperty("--primary-color", toggleB);
  root.style.setProperty("--secondary-color", toggleF);

  if (nav.style.visibility === "hidden" || nav.style.visibility === "") {
    navB.src = "media/buttons/navListButtonOpen"+ (toggleB === colorA ? "" : "Light") +".png";
  } else {
    navB.src = "media/buttons/navListButtonClose"+ (toggleB === colorA ? "" : "Light") +".png";
  }

  if (toggleB === colorA) {
    themeB.src = "media/buttons/themeButtonOff.png";
  } else {
    themeB.src = "media/buttons/themeButtonOn.png";
  }
}
