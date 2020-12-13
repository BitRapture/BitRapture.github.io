const colorA = "black";
const colorB = "white";

function toggleNavList() {
  let nav = document.getElementById("navList");
  let navB = document.getElementById("navButton");
  let theme = (document.body.style.color === colorA || document.body.style.color === "");
  if (nav.style.visibility === "hidden" || nav.style.visibility === "") {
    nav.style.visibility = "visible";
    nav.style.width = "200px";
    nav.style.minWidth = "200px";
    navB.src = "NavButton2"+ (theme ? "" : " Light") +".png";
  } else {
    nav.style.visibility = "hidden";
    nav.style.width = "0px";
    nav.style.minWidth = "0px";
    navB.src = "NavButton1"+ (theme ? "" : " Light") +".png";
  }
}

function toggleTheme() {
  let nav = document.getElementById("navList");
  let navB = document.getElementById("navButton");
  let themeB = document.getElementById("themeButton");
  let header = document.getElementById("header");
  let footer = document.getElementById("footer");
  let toggleB = (document.body.style.color === colorB ? colorA : colorB);
  let toggleF = (document.body.style.color === colorB ? colorB : colorA);

  document.body.style.color = toggleB;
  document.body.style.backgroundColor = toggleB;
  nav.style.backgroundColor = toggleF;
  nav.style.color = toggleB;
  header.style.backgroundColor = toggleF;
  header.style.color = toggleB;
  header.style.borderBottomColor = toggleB;
  footer.style.backgroundColor = toggleF;
  footer.style.color = toggleB;
  footer.style.borderTopColor = toggleB;

  if (nav.style.visibility === "hidden" || nav.style.visibility === "") {
    navB.src = "NavButton1"+ (toggleB === colorA ? "" : " Light") +".png";
  } else {
    navB.src = "NavButton2"+ (toggleB === colorA ? "" : " Light") +".png";
  }

  if (toggleB === colorA) {
    themeB.src = "LightMode1.png";
  } else {
    themeB.src = "LightMode2.png";
  }
}
