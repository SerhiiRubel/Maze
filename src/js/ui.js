export function drawBtn(maze, action) {
    maze.clearPath();
    action ? maze.pathFinder() : maze.buildGrid();
    maze.mazeDraw();
}