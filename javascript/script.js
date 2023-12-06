const cellValues = [];
let scoreUser = 0;
let scoreComputer = 0;
let userOrder = 'X';

document.getElementById('score-user').textContent = scoreUser;
document.getElementById('score-computer').textContent = scoreComputer;

const setUserFlag = (order) => {
    if(cellValues[order]) return;

    const divContainer = document.getElementsByTagName('main')[0];
    const selectedCell = divContainer.querySelectorAll('div')[order];
    cellValues[order] = userOrder;

    const imageTag = document.createElement('img');

    imageTag.src = `image/shape-${userOrder}.svg`;
    selectedCell.appendChild(imageTag);

    userOrder = userOrder === 'X' ? 'O' : 'X';
}