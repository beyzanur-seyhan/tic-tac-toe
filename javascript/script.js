const cellValues = [];
let scoreUser = 0;
let scoreComputer = 0;
let userOrder = 'X';

document.getElementById('score-user').textContent = scoreUser;
document.getElementById('score-computer').textContent = scoreComputer;

const setXorO = (order) => {
    if(cellValues[order]) return;

    const divContainer = document.getElementsByTagName('main')[0];
    const selectedCell = divContainer.querySelectorAll('div')[order];
    cellValues[order] = userOrder;

    const imageTag = document.createElement('img');
    
    if(userOrder === 'X') {
        imageTag.src = 'image/shape-X.svg';
        selectedCell.appendChild(imageTag);
    }
}