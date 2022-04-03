/*
            2048
*/


const estilos = {
    '': 'cell', '2': 'c2', '4': 'c4', '8': 'c8',
    '16': 'c16', '32': 'c32', '64': 'c64', '128': 'c128',
    '256': 'c256', '512': 'c512', '1024': 'c1024', 
    '2048': 'c2048', '4096': 'c4096', '8192': 'c8192'
}


// classe que controla o conjunto de cells livres
class Cells {
    constructor(board) {
        this.cellsLivres = [];
        for (let row of board) {
            for (let cell of row) {
                this.cellsLivres.push(cell);
            }
        }
        this.livres = this.cellsLivres.length;
    }
    ocupaCell(cell) {
        let index = this.cellsLivres.indexOf(cell);
        this.cellsLivres.splice(index, 1);
        this.livres--;
    }
    liberaCell(cell) {
        this.cellsLivres.push(cell);
        this.livres++;
    }
    randomCell() {
        let idx = Math.floor(Math.random() * this.livres);
        const rc = this.cellsLivres.splice(idx, 1)[0];
        this.livres--;
        if (Math.random() > 0.9) {
            rc.textContent = '4'; 
            rc.className = estilos['4']    
        } else {
            rc.textContent = '2'; 
            rc.className = estilos['2']    
        }
    }
    reset() {
        this.cellsLivres = [];
        for (let row of board) {
            for (let cell of row) {
                this.cellsLivres.push(cell);
            }
        }
        this.livres = this.cellsLivres.length;
    }
}

// classe que observa se houve alteração do grid 
// após algum movimento
class Movimento {
    constructor() {
        this.moveu = false;
    }
    mover() {
        this.moveu = true;
    }
    reset() {
        this.moveu = false;
    }
}


// movimento de cada célula, individualmente
function cellParaBaixo(row, col, board) {
    if (row === 3) return;
    const val = valorCell(board[row][col]);
    if (val === 0) return;
    const valAbaixo = valorCell(board[row+1][col])
    if (valAbaixo === 0) {
        board[row+1][col].textContent = val;
        board[row][col].textContent = '';
        cellsLivres.liberaCell(board[row][col])
        cellsLivres.ocupaCell(board[row+1][col])
        detectaMovimento.mover();
        cellParaBaixo(row+1, col, board);
    }
    if (valAbaixo === val) {
        board[row+1][col].textContent = val + valAbaixo;
        board[row][col].textContent = '';
        cellsLivres.liberaCell(board[row][col])
        detectaMovimento.mover();
        sc.atualizaScore(2 * val);
    }
}

function moveParaBaixo() {
    for (let i = 3; i >= 0; i--) {
        for (let j = 0; j < 4; j++) {
            cellParaBaixo(i, j, board)
        }
    }
    if (detectaMovimento.moveu) {
        cellsLivres.randomCell();
        detectaMovimento.reset();
    }
}

function cellParaCima(row, col, board) {
    if (row === 0) return;
    const val = valorCell(board[row][col])
    if (val === 0) return;
    const valAcima = valorCell(board[row-1][col])
    if (valAcima === 0) {
        board[row-1][col].textContent = val;
        board[row][col].textContent = '';
        cellsLivres.liberaCell(board[row][col])
        cellsLivres.ocupaCell(board[row-1][col])
        detectaMovimento.mover();
        cellParaCima(row-1, col, board);
    }
    if (valAcima === val) {
        board[row-1][col].textContent = val + valAcima;
        board[row][col].textContent = '';
        cellsLivres.liberaCell(board[row][col])
        detectaMovimento.mover();
        sc.atualizaScore(2 * val);
    }
}

function moveParaCima() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            cellParaCima(i, j, board)
        }
    }
    if (detectaMovimento.moveu) {
        cellsLivres.randomCell();
        detectaMovimento.reset();
    }
}

function cellParaDireita(row, col, board) {
    if (col === 3) return;
    const val = valorCell(board[row][col])
    if (val === 0) return;
    const valDireita = valorCell(board[row][col+1]);
    if (valDireita === 0) {
        board[row][col+1].textContent = val;
        board[row][col].textContent = '';
        cellsLivres.liberaCell(board[row][col])
        cellsLivres.ocupaCell(board[row][col+1])
        detectaMovimento.mover();
        cellParaDireita(row, col + 1, board);
    }
    if (valDireita === val) {
        board[row][col+1].textContent = val + valDireita;
        board[row][col].textContent = '';
        cellsLivres.liberaCell(board[row][col])
        detectaMovimento.mover();
        sc.atualizaScore(2 * val);
    }
}

function moveParaDireita() {
    for (let i = 0; i < 4; i++) {
        for (let j = 3; j >=0; j--) {
            cellParaDireita(i, j, board)
        }
    }
    if (detectaMovimento.moveu) {
        cellsLivres.randomCell();
        detectaMovimento.reset();
    }
}

function cellParaEsquerda(row, col, board) {
    if (col === 0) return;
    const val = valorCell(board[row][col])
    if (val === 0) return;
    const valEsquerda = valorCell(board[row][col-1]);
    if (valEsquerda === 0) {
        board[row][col-1].textContent = val;
        board[row][col].textContent = '';
        cellsLivres.liberaCell(board[row][col])
        cellsLivres.ocupaCell(board[row][col-1])
        detectaMovimento.mover();
        cellParaEsquerda(row, col - 1, board);
    }
    if (valEsquerda === val) {
        board[row][col-1].textContent = val + valEsquerda;
        board[row][col].textContent = '';
        cellsLivres.liberaCell(board[row][col])
        detectaMovimento.mover();
        sc.atualizaScore(2 * val);
    }
}

function moveParaEsquerda() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            cellParaEsquerda(i, j, board)
        }
    }
    if (detectaMovimento.moveu) {
        cellsLivres.randomCell();
        detectaMovimento.reset();
    }
}

//helper function
function valorCell(cell) {
    let val = parseInt(cell.textContent);
    if (isNaN(val)) return 0;
    else return val;
}

// estiliza o tabuleiro após cada jogada
function setEstilo(board) {
    for (let linha of board) {
        for (let cell of linha) {
            cell.className = estilos[cell.textContent];
        }
    }
}

// event listener
function checkKey(e) {
    if (!checkValidMove(board)) alert("GAME OVER");
    e = e || window.event;
    if (e.keyCode == '38') {
        // up arrow
        moveParaCima();
    }
    else if (e.keyCode == '40') {
        // down arrow
        moveParaBaixo();
    }
    else if (e.keyCode == '37') {
       // left arrow
       moveParaEsquerda();
    }
    else if (e.keyCode == '39') {
       // right arrow
       moveParaDireita();
    }
    setEstilo(board);
}

// score
class Score {
    constructor(board) {
        this.board = board;
        this.score = document.getElementById('score');
        this.best = document.getElementById('best');
        this.scoreVal = 0;
        this.bestVal = 0;
    }
    imprimeScore() {
        this.score.textContent = `Score: ${this.scoreVal}`;
        this.best.textContent = `Best Score: ${this.bestVal}`;
    }
    atualizaScore(val) {
        this.scoreVal += val;
        this.bestVal = Math.max(this.scoreVal, this.bestVal);
        this.imprimeScore();
    }
    reset() {
        this.scoreVal = 0;
        this.atualizaScore(0);
    }
}
    

// verifica se há jogadas válidas
function checkCell(row, col, board) {
    const val = valorCell(board[row][col])
    
    if (val === 0) {return true;}
    if (row > 0) {
        const valAcima = valorCell(board[row-1][col]);
        if (val === valAcima) {return true;}
    }
    if (row < 3) {
        const valAbaixo = valorCell(board[row+1][col]); 
        if (val === valAbaixo) {return true;}
    }
    if (col > 0) {
        const valEsquerda = valorCell(board[row][col-1]);
        if (val === valEsquerda) {return true;}
    }
    if (col < 3) {
        const valDireita = valorCell(board[row][col+1]); 
        if (val === valDireita) {return true;}
    }
    return false;
}

function checkValidMove(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (checkCell(i, j, board)) {return true;}
        }
    }
    return false;
}

// reinicia o jogo
function novoJogo() {
    for (let row of board) {
        for (let cell of row) {
            cell.textContent = '';
        }
    }
    sc.reset();
    cellsLivres.reset();
    cellsLivres.randomCell();
    cellsLivres.randomCell();
    setEstilo(board);
}


/* =========================================================================== */

// cria o tabuleiro
const cells = document.getElementsByClassName('cell');
let board = [];
for (let i = 0; i < 4; i++) {
    let row = []
    for (let j = 0; j < 4; j++) {
        row.push(cells[(i*4)+j]);
    }
    board.push(row);
}

// inicia o jogo
const cellsLivres = new Cells(board);   
cellsLivres.randomCell();
cellsLivres.randomCell();

const detectaMovimento = new Movimento();

// eventListener
document.onkeydown = checkKey;

const sc = new Score(board);
sc.imprimeScore();

const bt = document.getElementById('reset');
bt.onclick = novoJogo;