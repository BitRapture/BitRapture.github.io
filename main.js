
function toggleNavList() {
  let nav = document.getElementById("navList");
  let navB = document.getElementById("navButton");
  if (nav.style.visibility === "hidden" || nav.style.visibility === "") {
    nav.style.visibility = "visible";
    nav.style.width = "200px";
    nav.style.min_width = "200px";
    navB.src = "NavButton2.png";
  } else {
    nav.style.visibility = "hidden";
    nav.style.width = "0px";
    nav.style.min_width = "0px";
    navB.src = "NavButton1.png";
  }
}
