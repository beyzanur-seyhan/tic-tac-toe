const cellValues = [];
let scoreUser = 0;
let scoreComputer = 0;

document.getElementById('score-user').textContent = scoreUser;
document.getElementById('score-computer').textContent = scoreComputer;

const createFlag = (order,flag='X') => {
    setColorToText(flag) 

    if(cellValues[order]) return;

    const divContainer = document.getElementsByTagName('main')[0];
    const selectedCell = divContainer.querySelectorAll('div')[order];
    cellValues[order] = flag;

    const imageTag = document.createElement('img');

    imageTag.src = `image/shape-${flag}.svg`;
    selectedCell.appendChild(imageTag);
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
