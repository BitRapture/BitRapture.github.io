const shiftElements = document.getElementsByClassName("textShift");
const intervalID = setInterval(shiftText, 150);

var loadedText = false;
var originalText = [];
var shift = 0.0;
var dir = 1.0;

function loadOriginalText()
{
    for (const element of shiftElements)
    {
        originalText.push(`${element.textContent}`);
    }
    loadedText = true;
}

function shiftText()
{
    if (!loadedText)
        loadOriginalText();

    shift += 0.0025 * dir;
    if (shift > 1.0 || shift < 0.0)
        dir = dir > 0.0 ? -1.0 : 1.0;

    for (let i = 0; i < shiftElements.length; ++i)
    {
        const element = shiftElements[i];
        const textContent = originalText[i];
        let newText = "";
        
        let j = 0;
        for (let char of textContent)
        {
            let shifter = Math.floor(((Math.cos(shift * Math.PI * 2.0) * 0.5) + 0.5) * textContent.length);
            let chance = (j + 4) > shifter && (j - 4) < shifter;
            newText += chance && Math.random() > 0.8 ? char == char.toLowerCase() ? char.toUpperCase() : char.toLowerCase() : char;
            j++;
        }

        element.textContent = newText;
    }
}
