let v = 0;
let scoreUser = 0;
let scoreComputer = 0;
let winnerCell;
let winner = "";

let cellValues = [];
const divScoreUser = document.getElementById('score-user');
const divScoreComputer = document.getElementById('score-computer');

divScoreUser.textContent = scoreUser;
divScoreComputer.textContent = scoreComputer;

const createFlag = (order,flag='X') => {
    v = 0;
    setColorToText(flag); 
    if(cellValues[order]) return;

    const divContainer = document.getElementsByTagName('main')[0];
    const selectedCell = divContainer.querySelectorAll('.cell')[order];
    cellValues[order] = flag;

    const imageTag = document.createElement('img');

    imageTag.src = `image/shape-${flag}.svg`;
    selectedCell.querySelector('div').id = order;
    selectedCell.appendChild(imageTag);
    selectedCell.removeAttribute('onclick');
    addPointToWinner();
}

const findRandomEmptyIndex = () => {
 const isEmpty = [];

 for (let i = 0; i < 8; i++) {
   if(cellValues[i]) continue;
   isEmpty.push(i);
 }

 return isEmpty[Math.floor(Math.random() * isEmpty.length)];
}

const turnComputer = async() => {
   await setTimeout(()=>{
        if(winner != 'O' && +divScoreUser.textContent > 0) return;
        if(!findRandomEmptyIndex()) {
            alert('Game Over!') 
            return;
        }
        createFlag(findRandomEmptyIndex(), 'O');
    },1000)

    await setTimeout(()=>{
        setColorToText('X');
    },2000)
}

const setColorToText = (flag) => {
    const colorBlack = 'color:black'
    const divScoreUser = document.getElementsByClassName(`score-user`)[0];
    const divScoreComputer = document.getElementsByClassName(`score-computer`)[0];

    if(flag === 'X') {
        if(divScoreComputer.style) divScoreComputer.style = '';
        document.getElementsByClassName(`score-user`)[0].style = colorBlack;
    } else {
        if(divScoreUser.style) divScoreUser.style = '';
        document.getElementsByClassName(`score-computer`)[0].style = colorBlack;
    }
}

// h -> horizontal
// v -> vertical
const addPointToWinner = () => {
    for (let h = 0; h < 9; h += 3) {
        if(findWinner('X',h,v)) {
          winner = 'X';
          scoreUser += 1;
          divScoreUser.textContent = scoreUser;
          cellValues = [];
          winnerCell = undefined;
          removeFlagFromCell();
          break;
        } else if(findWinner('O',h,v)) {
            winner = 'O';
            scoreComputer += 1;
            divScoreComputer.textContent = scoreComputer;
            cellValues = [];
            winnerCell = undefined;
            removeFlagFromCell();
            break;
        } 
        v++;
   }
}

const findWinner = (flag,h,v) => {
    if((cellValues[h] == `${flag}` && cellValues[h + 1] == `${flag}` && cellValues[h + 2] == `${flag}`)) {
        winnerCell = [h, h + 1, h + 2];
        drawLineWinner(flag, winnerCell, 'horizontal-line');
    }
    if((cellValues[v] == `${flag}` && cellValues[v + 3] == `${flag}` && cellValues[v + 6] == `${flag}`)) {
        winnerCell = [v,v + 3, v + 6];
        drawLineWinner(flag, winnerCell, 'vertical-line');
    }
    if((cellValues[2] == `${flag}` && cellValues[4] == `${flag}` && cellValues[6] == `${flag}`)) {
        winnerCell = [2, 4, 6];
        drawLineWinner(flag, winnerCell, 'cross-left-line');
    }
    if((cellValues[0] == `${flag}` && cellValues[4] == `${flag}` && cellValues[8] == `${flag}`)) {
        winnerCell = [0, 4, 8];
        drawLineWinner(flag, winnerCell, 'cross-right-line');
    }
    return winnerCell;
}

const drawLineWinner = (flag, cells, lineType) => {
    cells.forEach((cell) => {
        let winnerContainer = document.getElementById(cell);
        let line = winnerContainer.querySelector(`.${lineType}`)
        
        if(flag == 'X') {
            line.style.backgroundColor = '#383636';
        } else {
            line.style.backgroundColor = '#FFFFFF';
        }   
        line.classList.add('d-block');
    })
}

const removeFlagFromCell = () => {
   setTimeout(() => {
    document.querySelectorAll('.cell').forEach((cell) => {
        let cellChildrenImg = cell.children[1];
        let cellChildrenDiv = cell.children[0].children[2];
 
        if(!cellChildrenImg) return; 
        if(cellChildrenDiv && (cellChildrenDiv.className.includes('d-block'))) {
            cellChildrenDiv.classList.remove('d-block')
        }

        cellChildrenImg.src = "";
    })
   },1400)
}