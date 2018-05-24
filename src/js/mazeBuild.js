import { MazeCell } from "./mazeCell.js";

export class MazeBuild {
    constructor(width, height) {
        this.n = width;
        this.m = height;
        this.gridArray = [];
        this.wall = 9999;
        this.mazeArray = this.buildGrid();
    }
    buildGrid() {

        for(let i = 0; i < this.n ; i++) {
            this.gridArray[i] = [];
            for(let j = 0; j < this.m ; j++) {
                if( Math.floor(Math.random() * 10) % 10 === 0 ) {
                    this.gridArray[i][j] =  new MazeCell(i, j, this.wall);
                } else {
                    this.gridArray[i][j] = new MazeCell(i,j, -1);
                }
            }
        }
        return this.gridArray;
    }

    handleClick(e) {
        this.clearPath();
        let x = e.target.getAttribute('x');
        let y = e.target.getAttribute('y');
        this.mazeArray[x][y].weight === 9999 ? this.mazeArray[x][y].weight = -1 : this.mazeArray[x][y].weight = 9999;
        this.pathFinder();
        this.mazeDraw();
    }

    pathFinder() {
        this.mazeArray[0][0] = new MazeCell(0, 0, 0);
        this.mazeArray[9][9] = new MazeCell(9, 9, -2);
        const dx = [0, 1, 0, -1];
        const dy = [-1, 0, 1, 0];
        let wave = [];
        let oldWave = [];

        oldWave.push(this.mazeArray[0][0]);

        while (oldWave.length > 0) {
            wave.length = 0;
            for (let i = 0; i < oldWave.length; i++) {
                let x = oldWave[i].x;
                let y = oldWave[i].y;
                for (let d = 0; d < 4; d++) {
                    let nx = x + dx[d];
                    let ny = y + dy[d];
                    if ( nx >= 0 && nx <= 9 && ny >= 0 && ny <= 9 && (this.mazeArray[nx][ny].weight === -1 || this.mazeArray[nx][ny].weight === -2)) {
                        this.mazeArray[nx][ny].weight = this.mazeArray[x][y].weight + 1;
                        wave.push(this.mazeArray[nx][ny]);
                    }
                }
            }
            oldWave = wave.slice(0);
        }

        let x = this.mazeArray[9][9].x;
        let y = this.mazeArray[9][9].y;
        this.mazeArray[9][9].status = 'path';
        let noPath = 0;

        while( this.mazeArray[x][y].weight !== 0 ) {
            for(let d = 0; d < 4; d++) {
                let nx = x + dx[d];
                let ny = y + dy[d];
                if(nx >= 0 && nx <= 9 && ny >= 0 && ny <= 9 && this.mazeArray[x][y].weight - 1 === this.mazeArray[nx][ny].weight) {
                    x = nx;
                    y = ny;
                    wave.push(this.mazeArray[x][y]);
                    this.gridArray[x][y].status = 'path';
                    break;
                } else {
                    noPath++;
                }
            }
            if( noPath === 4 ) {
                alert('pathFinder is defeated');
                break;
            }
        }
    }
    clearPath() {
        for( let i = 0; i < this.mazeArray.length; i++ ) {
            for(let j = 0; j < this.mazeArray.length; j++) {
                if(this.mazeArray[i][j].weight > 0 && this.mazeArray[i][j].weight !== 9999) {
                    this.mazeArray[i][j].weight = -1; 
                    this.mazeArray[i][j].status = 'justCell';
                }
            }
        }
    }
    mazeDraw() {
        const mazeGrid = document.querySelector('.mazeGrid');

        while(mazeGrid.firstChild) {
            mazeGrid.removeChild(mazeGrid.firstChild);
        }

        for( let i = 0; i < this.mazeArray.length; i++ ) {
            for(let j = 0; j < this.mazeArray.length; j++) {
                let div = document.createElement('div');
                div.onclick = (e) => this.handleClick(e);
                div.setAttribute('x', this.mazeArray[i][j].x);
                div.setAttribute('y', this.mazeArray[i][j].y);
                if ( this.mazeArray[i][j].weight === 9999 ) {
                    div.className = 'wall';
                } else if(this.mazeArray[i][j].status === 'path') {
                    div.className = 'path';
                }
                div.classList.add('cell');
                mazeGrid.appendChild(div);
            }
        }
    }
};
