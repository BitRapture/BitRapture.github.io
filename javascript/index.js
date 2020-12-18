// --------------
// Type writer variables
// --------------
// twContent is the full text
// twContentv is the text currently displayed on the page
// twContentPreserve contains the html attributes
// twI is the current character index
// typeWrite saves the interval function
var twContent = "", twI = 0,
    twContentV = "", twContentPreserve = "";
var typeWrite;

// typeWriter : Ran every time the interval function calls it. Calculates and
//            : displays the typewriting effect to the page.
function typeWriter(ID) {
  // Set html to visible text
  document.getElementById(ID).innerHTML = twContentV;
  // Increase chracter index
  twI++;
  // Add the character to the visible text or finalize it by
  // appending back the html attributes
  if (twI >= twContent.length) {
    clearInterval(typeWrite);
    document.getElementById(ID).innerHTML = twContentPreserve;
  } else {
    twContentV += twContent[twI];
  }
}

// startTypeWriter : Sets up the typewriting variables and begins the effect
function startTypeWriter(ID) {
  // If the typewriter effect has already finished, dont execute code below
  if (document.getElementById(ID).style.visibility === "visible") return;
  // Set typewriter variables to page contexts
  twI = 0;
  twContent = document.getElementById(ID).textContent;
  twContentPreserve = document.getElementById(ID).innerHTML;
  document.getElementById(ID).innerHTML = twContentV = twContent[twI];
  document.getElementById(ID).style.visibility = "visible";
  document.getElementById(ID).style.height = "auto";
  // Begin typewriter effect
  typeWrite = setInterval(typeWriter, 25, ID);
}

// This function is ran once the page loads
function main() {
  // Begin typewriter
  startTypeWriter("typeWriterDesc");
}

// Load into main function once webpage loads
window.onload = main;
