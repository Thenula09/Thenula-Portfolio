class Game2048 {
    constructor() {
        this.grid = [];
        this.score = 0;
        this.bestScore = localStorage.getItem('bestScore') || 0;
        this.size = 4;
        this.won = false;
        this.over = false;
        this.tiles = new Map();
        
        this.init();
        this.bindEvents();
    }
    
    init() {
        this.setupGrid();
        this.updateScore();
        this.updateBestScore();
        this.addRandomTile();
        this.addRandomTile();
        this.updateDisplay();
    }
    
    setupGrid() {
        this.grid = [];
        for (let i = 0; i < this.size; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.size; j++) {
                this.grid[i][j] = 0;
            }
        }
    }
    
    bindEvents() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        const restartButton = document.querySelector('.restart-button');
        restartButton.addEventListener('click', () => this.restart());
        
        let touchStartX = 0;
        let touchStartY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            if (!e.changedTouches.length) return;
            
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            const dx = touchEndX - touchStartX;
            const dy = touchEndY - touchStartY;
            
            const absDx = Math.abs(dx);
            const absDy = Math.abs(dy);
            
            if (Math.max(absDx, absDy) > 30) {
                if (absDx > absDy) {
                    this.move(dx > 0 ? 'right' : 'left');
                } else {
                    this.move(dy > 0 ? 'down' : 'up');
                }
            }
        });
    }
    
    handleKeyPress(e) {
        if (this.over && !this.won) return;
        
        const keyMap = {
            'ArrowUp': 'up',
            'ArrowDown': 'down',
            'ArrowLeft': 'left',
            'ArrowRight': 'right'
        };
        
        const direction = keyMap[e.key];
        if (direction) {
            e.preventDefault();
            this.move(direction);
        }
    }
    
    move(direction) {
        if (this.over && !this.won) return;
        
        const previousGrid = this.grid.map(row => [...row]);
        let moved = false;
        
        switch (direction) {
            case 'left':
                moved = this.moveLeft();
                break;
            case 'right':
                moved = this.moveRight();
                break;
            case 'up':
                moved = this.moveUp();
                break;
            case 'down':
                moved = this.moveDown();
                break;
        }
        
        if (moved) {
            this.addRandomTile();
            this.updateDisplay();
            
            if (this.checkWin() && !this.won) {
                this.won = true;
                this.showMessage('You Win!', 'game-won');
            } else if (this.checkGameOver()) {
                this.over = true;
                this.showMessage('Game Over!', 'game-over');
            }
        }
    }
    
    moveLeft() {
        let moved = false;
        for (let row = 0; row < this.size; row++) {
            const newRow = this.slideAndMerge(this.grid[row]);
            if (JSON.stringify(newRow) !== JSON.stringify(this.grid[row])) {
                moved = true;
                this.grid[row] = newRow;
            }
        }
        return moved;
    }
    
    moveRight() {
        let moved = false;
        for (let row = 0; row < this.size; row++) {
            const reversed = [...this.grid[row]].reverse();
            const newRow = this.slideAndMerge(reversed).reverse();
            if (JSON.stringify(newRow) !== JSON.stringify(this.grid[row])) {
                moved = true;
                this.grid[row] = newRow;
            }
        }
        return moved;
    }
    
    moveUp() {
        let moved = false;
        for (let col = 0; col < this.size; col++) {
            const column = [];
            for (let row = 0; row < this.size; row++) {
                column.push(this.grid[row][col]);
            }
            const newColumn = this.slideAndMerge(column);
            if (JSON.stringify(newColumn) !== JSON.stringify(column)) {
                moved = true;
                for (let row = 0; row < this.size; row++) {
                    this.grid[row][col] = newColumn[row];
                }
            }
        }
        return moved;
    }
    
    moveDown() {
        let moved = false;
        for (let col = 0; col < this.size; col++) {
            const column = [];
            for (let row = 0; row < this.size; row++) {
                column.push(this.grid[row][col]);
            }
            const reversed = column.reverse();
            const newColumn = this.slideAndMerge(reversed).reverse();
            if (JSON.stringify(newColumn) !== JSON.stringify(column)) {
                moved = true;
                for (let row = 0; row < this.size; row++) {
                    this.grid[row][col] = newColumn[row];
                }
            }
        }
        return moved;
    }
    
    slideAndMerge(arr) {
        let newArr = arr.filter(val => val !== 0);
        
        for (let i = 0; i < newArr.length - 1; i++) {
            if (newArr[i] === newArr[i + 1]) {
                newArr[i] *= 2;
                this.score += newArr[i];
                newArr.splice(i + 1, 1);
            }
        }
        
        while (newArr.length < this.size) {
            newArr.push(0);
        }
        
        return newArr;
    }
    
    addRandomTile() {
        const emptyCells = [];
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.grid[row][col] === 0) {
                    emptyCells.push({ row, col });
                }
            }
        }
        
        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.grid[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
        }
    }
    
    updateDisplay() {
        const tileContainer = document.querySelector('.tile-container');
        tileContainer.innerHTML = '';
        
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.grid[row][col] !== 0) {
                    const tile = document.createElement('div');
                    tile.className = `tile tile-${this.grid[row][col]} tile-new`;
                    tile.textContent = this.grid[row][col];
                    tile.style.left = `${col * 121.25 + 15}px`;
                    tile.style.top = `${row * 121.25 + 15}px`;
                    tileContainer.appendChild(tile);
                }
            }
        }
        
        this.updateScore();
        this.updateBestScore();
    }
    
    updateScore() {
        document.getElementById('score').textContent = this.score;
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            this.updateBestScore();
        }
    }
    
    updateBestScore() {
        document.getElementById('best-score').textContent = this.bestScore;
        localStorage.setItem('bestScore', this.bestScore);
    }
    
    checkWin() {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.grid[row][col] === 2048) {
                    return true;
                }
            }
        }
        return false;
    }
    
    checkGameOver() {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.grid[row][col] === 0) {
                    return false;
                }
                
                if (col < this.size - 1 && this.grid[row][col] === this.grid[row][col + 1]) {
                    return false;
                }
                
                if (row < this.size - 1 && this.grid[row][col] === this.grid[row + 1][col]) {
                    return false;
                }
            }
        }
        return true;
    }
    
    showMessage(text, className) {
        const messageContainer = document.querySelector('.game-message');
        const messageText = messageContainer.querySelector('p');
        
        messageText.textContent = text;
        messageContainer.className = `game-message ${className}`;
        messageContainer.style.display = 'block';
    }
    
    hideMessage() {
        const messageContainer = document.querySelector('.game-message');
        messageContainer.style.display = 'none';
    }
    
    restart() {
        this.score = 0;
        this.won = false;
        this.over = false;
        this.hideMessage();
        this.init();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Game2048();
});
