const cellValues = [];
let scoreUser = 0;
let scoreComputer = 0;
let userOrder = 'X';

document.getElementById('score-user').textContent = scoreUser;
document.getElementById('score-computer').textContent = scoreComputer;

const createFlag = (order,flag='X') => {
    if(cellValues[order] && flag === 'O') turnComputer(1);
    if(cellValues[order]) return;

    const divContainer = document.getElementsByTagName('main')[0];
    const selectedCell = divContainer.querySelectorAll('div')[order];
    cellValues[order] = flag;

    const imageTag = document.createElement('img');

    imageTag.src = `image/shape-${flag}.svg`;
    selectedCell.appendChild(imageTag);
}

const turnComputer = (time=1000) => {
    setTimeout(()=>{
        createFlag(Math.round(Math.random() * 8), 'O')
    },time)
}