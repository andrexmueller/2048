/*
            2048
*/

// dimensões do grid N x N
const N = 4;

// estilização das células
const estilos = {
    '': 'cell', '2': 'c2', '4': 'c4', '8': 'c8',
    '16': 'c16', '32': 'c32', '64': 'c64', '128': 'c128',
    '256': 'c256', '512': 'c512', '1024': 'c1024', 
    '2048': 'c2048', '4096': 'c4096', '8192': 'c8192'
}


// constroi matriz que conterá os numeros e a lógica do jogo
class Matriz {
    constructor(dim) {
        this.dim = dim;
        // matrix principal contendo os números
        this.matriz = []
        // lista de células livres
        this.cellLivres = new Array;
        for (let i = 0; i < dim; i++) {
            let linha = []
            for (let j = 0; j < dim; j++) {
                linha.push(0);
                // inclui o elemento cell na lista de cells livres
                this.cellLivres.push(document.getElementById(`${i}-${j}`))
            }
            this.matriz.push(linha);
        }
        this.randomCell();
        this.randomCell()
    }

    // getters e setters das linhas e colunas
    // são utilizados para mover e colapsar as celulas
    getLinha(idxLinha) {
        return this.matriz[idxLinha]
    }

    setLinha(idxLinha, novaLinha) {
        for (let j = 0; j < this.dim; j++) {
            this.matriz[idxLinha][j] = novaLinha[j];
        }
        this.updateDisplay();
    }

    getColuna(idxColuna) {
        let coluna = [];
        for (let i = 0; i < this.dim; i++) {
            coluna.push(this.matriz[i][idxColuna])
        }
        return coluna;
    }
    
    setColuna(idxColuna, novaColuna) {
        for (let i = 0; i < this.dim; i++) {
            this.matriz[i][idxColuna] = novaColuna[i]
        }
        this.updateDisplay();
    }

    // preenche uma célula vazia aleatória
    randomCell() {
        let idx = Math.floor(Math.random() * this.cellLivres.length);
        let rc = this.cellLivres.splice(idx, 1)[0];
        let val = 2;
        if (Math.random() > 0.9) val = 4;
        rc.textContent = val;
        rc.className = estilos[val];
        let coord = rc.id.split('-').map((x)=>parseInt(x));
        this.matriz[coord[0]][coord[1]] = val;
        rc.className = 'random';
    }

    // move todo a matriz/grid, conforme a direção
    // depois colapsa os valores e depois move novamente 
    // para remover as celulas vazias
    move(direcao) {
        if (!checkValidMove()) alert('GAME OVER!\nClique em <Novo Jogo> para continuar');
        for (let i = 0; i < this.dim; i++) {
            let arr;
            if (direcao === 'ArrowDown') arr = [...this.getColuna(i).reverse()];
            if (direcao === 'ArrowUp') arr = [...this.getColuna(i)];
            if (direcao === 'ArrowRight') arr = [...this.getLinha(i).reverse()];
            if (direcao === 'ArrowLeft') arr = [...this.getLinha(i)];
            move(arr);
            colapsa(arr);
            move(arr);
            if (direcao === 'ArrowDown') this.setColuna(i, arr.reverse());
            if (direcao === 'ArrowUp')  this.setColuna(i, arr);
            if (direcao === 'ArrowRight') this.setLinha(i, arr.reverse());
            if (direcao === 'ArrowLeft') this.setLinha(i, arr);
        }
        if (detectaMovimento.moveu) this.randomCell();
        detectaMovimento.reset();   
    }

    // sincroniza o elemento html grid com a matriz
    updateDisplay() {
        this.cellLivres = []
        for (let i = 0; i < this.dim; i++) {
            for (let j = 0; j < this.dim; j++) {
                let val = this.matriz[i][j];
                if (val === 0) {
                    this.cellLivres.push(document.getElementById(`${i}-${j}`));
                    val = '';
                }
                document.getElementById(`${i}-${j}`).textContent = val;
                document.getElementById(`${i}-${j}`).className = estilos[val];
            }
        }
    }
}

// classe responsável por detectar se houve movimento do grid
class Movimento {
    constructor() {
        this.moveu = false;
    }
    mover() { this.moveu = true }
    reset() { this.moveu = false }
}


// score
class Score {
    constructor() {
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


// funções para mover e colapsar(somar) as celulas

// recebe um array (linha ou coluna da matriz) e desloca
// as celulas, removendo os espações em branco (com zeros)
// o array é sempre ajustado para o início e reorientado
// quando for settar as linhas e colunas
function move(arr) {
    for (let i = 1; i < 4; i++) {
        if (arr[i] === 0) continue;
        let j = i;
        while (arr[j-1] === 0) {
            arr[j-1] = arr[j];
            arr[j] = 0;
            j--;
            detectaMovimento.mover();
        }
    }
    return arr;
}

// mesma ideia, mas colapsa (soma) apenas a célula contigua uma vez
function colapsa(arr) {
    for (let i = 1; i < 4; i++) {
        if (arr[i] === 0) return;
        let j = i;
        if (arr[i] === arr[i-1]) {
            arr[i-1] += arr[i];
            arr[i] = 0;
            score.atualizaScore(arr[i-1])
            detectaMovimento.mover();
        }
    }
}

function novoJogo() {
    matriz.cellLivres = new Array;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            matriz.matriz[i][j] = 0;
            // inclui o elemento cell na lista de cells livres
            matriz.cellLivres.push(document.getElementById(`${i}-${j}`))
        }
    }
    matriz.randomCell();
    matriz.randomCell();
    matriz.updateDisplay();
    score.reset();
}

// verifica se há movimento possível para uma célula 
function checkCell(row, col) {
    const val = matriz.matriz[row][col]
    if (val === 0) return true;
    if (row > 0) {
        const valAcima = matriz.matriz[row-1][col];
        if (val === valAcima) return true;
    }
    if (row < 3) {
        const valAbaixo = matriz.matriz[row+1][col]; 
        if (val === valAbaixo) return true; 
    }
    if (col > 0) {
        const valEsquerda = matriz.matriz[row][col-1];
        if (val === valEsquerda) return true;
    }
    if (col < 3) {
        const valDireita = matriz.matriz[row][col+1]; 
        if (val === valDireita) return true;
    }
    return false;
}

function checkValidMove() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (checkCell(i, j)) return true;
        }
    }
    return false;
}

/* ------------------------------------------------------------------------------------------------*/
/* ------------------------------------------------------------------------------------------------*/
/* ------------------------------------------------------------------------------------------------*/
// constrói o grid no html
const grid = document.querySelector('#grid')
for (let i = 0; i < N; i++) {
    let row = document.createElement('tr');
    for (let j = 0; j < N; j++) {
        let cell = document.createElement('td');
        cell.classList.add('cell');
        cell.setAttribute('id', `${i}-${j}`);
        row.appendChild(cell);
    }
    grid.appendChild(row);
}

const matriz = new Matriz(N);
const detectaMovimento = new Movimento();
const score = new Score();

score.imprimeScore();

const bt = document.getElementById('reset');
bt.onclick = novoJogo;

window.addEventListener('keydown', (e) => {
    const eventos = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
    if (eventos.includes(e.key)) matriz.move(e.key)
} )


// teste swipe on android browser

let touchstartX = 0
let touchendX = 0
    
function checkDirection() {
  if (touchendX < touchstartX) alert('swiped left!')
  if (touchendX > touchstartX) alert('swiped right!')
}

document.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX
})

document.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX
  checkDirection()
})
