
<!--Author Rostislav Dolbilov-->

let squares = [];
let container = document.createElement("div");
container.classList.add("container");
container.style.backgroundColor = 'rgba(236,172,69,0.75)';
let timeOut;

for (let i = 0; i < 15; i++){
    let sq = document.createElement("button");
    let text = document.createElement("p");
    sq.classList.add("square");
    sq.id = (i + 1).toString();
    sq.style.backgroundColor = 'white';
    sq.style.cursor = 'pointer';
    sq.style.userSelect = 'none';

    sq.addEventListener('click', event => {setTimeout(moving, timeOut * 1000000);}, false);    
    sq.addEventListener("transitionend", event => {timeOut = 0;}, false);
  
    function moving(){
        let top = document.getElementById('16').style.top;
        let left = document.getElementById('16').style.left;

        if ((sq.style.top === top && sq.style.left === (parseInt(left) - 10) + 'vw')
            || (sq.style.top === top && sq.style.left === (parseInt(left) + 10) + 'vw')
            || (sq.style.left === left && sq.style.top === (parseInt(top) - 10) + 'vw')
            || (sq.style.left === left && sq.style.top === (parseInt(top) + 10) + 'vw')){

            timeOut = 0.2;
            sq.style.transitionDuration = timeOut + 's';
            let tmpLeft = sq.style.left;
            let tmpTop = sq.style.top;

            sq.style.top = top;
            sq.style.left = left;

            document.getElementById('16').style.top = tmpTop;
            document.getElementById('16').style.left = tmpLeft;

            if (isWinn()){
                let won = document.getElementById('is-won');
                won.innerText = 'YOU WON!!!';
                won.style.color = 'green';
                document.getElementById('start').innerText = 'PLAY AGAIN';
            }
        }
    }

    text.innerText = (i + 1).toString();
    text.style.userSelect = 'none';
    sq.appendChild(text);
    squares.push(sq);
}

let sq = document.createElement("div");
sq.classList.add("square");
sq.id = (16).toString();
sq.style.backgroundColor = 'transparent';
sq.style.border = 'none';
squares.push(sq);

function shuffle() {
    for (let i = squares.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [squares[i], squares[j]] = [squares[j], squares[i]];
    }
    displaySquares();
}

function getNodesByNewPosition() {
    let result = [];
    for (let i = 0; i < 4; i++){
        for (let j = 0; j < 4; j++){
            for (let z = 0; z < 16; z++){
                if (squares[z].style.left === 10 * i + "vw"
                    && squares[z].style.top === 10 * j + "vw"){
                    result.push(squares[z]);
                    break;
                }
            }
        }
    }
    return result;
}

function displaySquares(){
    let index = 0;
    for (let i = 0; i < 4; i++){
        for (let j = 0; j < 4; j++){
            squares[index].style.left = 10 * i + "vw";
            squares[index].style.top = 10 * j + "vw";
            container.appendChild(squares[index]);
            index++;
        }
    }
}

function isWinn(){
    let nodes = getNodesByNewPosition();
    let won = ['1','5','9','13','2','6','10','14','3','7','11','15','4','8','12','16'];
    for (let i = 0; i < won.length; i++){
        if (won[i] !== nodes[i].id){
            return false;
        }
    }
    return true;
}

document.getElementById('start').addEventListener('click', function () {
    document.getElementById('is-won').innerText = '';
    shuffle();
});
shuffle();

root.appendChild(container);

<!--Author Rostislav Dolbilov-->




