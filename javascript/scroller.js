const scrollElements = document.getElementsByClassName("scrollable");
var scrollPositions = [];
var scrollHeights = [];
var movedScrollIndex = 0;

function getPosY(element) {
    return element.getBoundingClientRect().top + window.scrollY;
}

function getHeight(element) {
    return element.getBoundingClientRect().height;
}

function updateScrollInfo() {
    scrollPositions = [];
    scrollHeights = [];

    for (const element of scrollElements) {
        scrollPositions.push(getPosY(element));
        scrollHeights.push(getHeight(element));
    }

    updateMovedScrollIndex();
}

function updateMovedScrollIndex() {
    movedScrollIndex = 0;

    for (let i = 0; i < scrollPositions.length; ++i) {
        let posY = scrollPositions[i];
        let height = scrollHeights[i];

        if (posY < window.scrollY && (posY + height) < window.scrollY)
            movedScrollIndex++;
    }
}

function scroller(index) {
    if (index < 0 || index >= scrollElements.length)
        return;

    scrollElements[index].scrollIntoView({ behavior: "smooth" });
}

function scrollPrevious() {
    scroller(movedScrollIndex - 1);
}

function scrollNext() {
    scroller(movedScrollIndex + 1);
}

window.addEventListener("load", (event) => {
    updateScrollInfo();
})

window.addEventListener("resize", (event) => {
    updateScrollInfo();
})

document.addEventListener("scroll", (event) => {
    updateMovedScrollIndex();
});