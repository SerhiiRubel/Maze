import './scss/main.scss';
import { MazeBuild } from './js/mazeBuild.js';
import { drawBtn } from './js/ui';

let Maze = new MazeBuild(10,10);
let buildBtn = document.querySelector('.build');
let findPath = document.querySelector('.findPath');

buildBtn.addEventListener('click', () => drawBtn(Maze, false) );
findPath.addEventListener('click', () => drawBtn(Maze, true));

Maze.mazeDraw();
