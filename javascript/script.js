let v = 0;
let scoreUser = 0;
let scoreComputer = 0;

const cellValues = [];
const divScoreUser = document.getElementById('score-user');
const divScoreComputer = document.getElementById('score-computer');

divScoreUser.textContent = scoreUser;
divScoreComputer.textContent = scoreComputer;

const createFlag = (order,flag='X') => {
    console.log(cellValues)
    v = 0;
    setColorToText(flag); 
    if(cellValues[order]) return;

    const divContainer = document.getElementsByTagName('main')[0];
    const selectedCell = divContainer.querySelectorAll('.cell')[order];
    cellValues[order] = flag;

    const imageTag = document.createElement('img');

    imageTag.src = `image/shape-${flag}.svg`;
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
        if(findWinner('X',h,v) == 'X') {
          console.log('You are win');
          scoreUser += 1;
          divScoreUser.textContent = scoreUser;
          return;
        } else if(findWinner('O',h,v) == 'O') {
            console.log('Computer is win');
            divScoreComputer.textContent = scoreUser;
            return;
        } 
        v++;
   }
}

const findWinner = (flag,h,v) => {
    if((cellValues[h] == `${flag}` && cellValues[h + 1] == `${flag}` && cellValues[h + 2] == `${flag}`) || 
    (cellValues[v] == `${flag}` && cellValues[v + 3] == `${flag}` && cellValues[v + 6] == `${flag}`) || 
    (cellValues[2] == `${flag}` && cellValues[4] == `${flag}` && cellValues[8] == `${flag}`) || 
    (cellValues[0] == `${flag}` && cellValues[4] == `${flag}` && cellValues[8] == `${flag}`)) {
        v = 0;
        return flag;
    }
}

const removeSpecificEl = (removalFromIndex) => {
    for(const i of removalFromIndex.reverse()) {
        cellValues.splice(i,1);
    }
}