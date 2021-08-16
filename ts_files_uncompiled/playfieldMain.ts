
var playfield:any = {

    playfieldContainer: document.getElementById("playfield_container"),
    allRows: document.getElementsByClassName("row"),
    isResizing: false,
    emptyActive: true,
    sortingActive: false,
    pathingActive: false,
}

function clearPlayfield() {

    for (let i = playfield.playfieldContainer.childNodes.length - 1; i >= 0; i--) {
        playfield.playfieldContainer.childNodes[i].remove();
    }
}

function createPathingPlayfield(height:number, width:number) {

    // active playfield = true, else = false
    playfield.pathingActive = true;
    playfield.sortingActive = false;
    playfield.emptyActive = false;

    let rowCount:number = Math.floor(height/22);
    let cellCount:number = Math.floor(width/24);

    // add rows to playfield container depending on the current window size
    for (let i = 0; i < rowCount; i++) {
        let newRow:any = document.createElement("div");
        playfield.playfieldContainer!.appendChild(newRow).className = "row";
    }

    // add cells to each row element
    for (let j = 0; j < rowCount; j++) {
        for (let k = 0; k < cellCount; k++) {
            let newCell:any = document.createElement("div");
            newCell.id = `${(j * cellCount) + k}`;
            newCell.onclick = "setTargetCell(this.id)";

            if (j == Math.floor(rowCount / 2) && k == Math.floor(cellCount / 2)) {
                newCell.style.backgroundColor = "#FC4445";
                newCell.style.filter = "brigthness(0.8)";
                pathingRelated.startCell = newCell;
            }

            playfield.allRows[j].appendChild(newCell).className = "cell";
        }
    }

    setMenuHeight();
}

function createSortingPlayfield(width:number) {

    // active playfield = true, else = false
    playfield.pathingActive = false;
    playfield.sortingActive = true;
    playfield.emptyActive = false;

    let elementCount:number = Math.floor(width);

    // create divs elements for playfield to be sorted
    for (let i = 0; i < elementCount; i++) {
        let newElement:any = document.createElement("div");
        let elementHeight:number = (i * 10) + 10;
        newElement.id = `${i}`;
        newElement.className = "sortingElement";
        newElement.style.minHeight = `${elementHeight}px`;
        sortingRelated.allSortElements.push(newElement);
    }

    // randomize element order
    for (let j = elementCount; j > 0; j--) {
        let randomIndex:number = Math.floor(Math.random() * j);
        let randomElement:any = sortingRelated.allSortElements[randomIndex]

        sortingRelated.allSortElements.splice(randomIndex, 1);
        playfield.playfieldContainer.appendChild(randomElement);
    }

    setMenuHeight();
}

function createEmptyPlayfield(height:number, width:number) {

    // active playfield = true, else = false
    playfield.pathingActive = false;
    playfield.sortingActive = false;
    playfield.emptyActive = true;

    // create empty playfield
    let emptyElement:any = document.createElement("div");
    emptyElement.setAttribute("style", `border-radius:0px 10px 10px 0px;color:black;min-height:${0.6*height}px;min-width:${0.5*width}px;background-color:white;text-align:center;font-size:22px;`);
    emptyElement.innerHTML = "Select Algorithm Type first!";
    playfield.playfieldContainer.appendChild(emptyElement);

    setMenuHeight();
}
