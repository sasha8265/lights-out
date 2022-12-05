import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/
function getRandomTF() {
    return Math.floor(Math.random() * 2)
}

function Board({ nrows, ncols, chanceLightStartsOn }) {
    const [board, setBoard] = useState(createBoard());
    const [isWinner, setIsWinner] = useState(false);

    /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
    function createBoard() {
        // TODO: create array-of-arrays of true/false values
        let initialBoard = [];
        const trueFalse = [true, false];
        for (y = 0; y < nrows; y++) {
            initialBoard.push([])
            for (x = 0; x < ncols; x++) {
                initialBoard[y].push(trueFalse[getRandomTF()])
            }
        }
        console.log(initialBoard)
        return initialBoard;
    }

    function hasWon() {
        // TODO: check the board in state to determine whether the player has won.
        for (y = 0; y < nrows; y++) {
            if (board[y].every(x => x === false)) {
                setIsWinner(true)
            }
        }
    }

    function flipCellsAround(coord) {
        setBoard(oldBoard => {
            const [y, x] = coord.split("-").map(Number);

            const flipCell = (y, x, boardCopy) => {
                // if this coord is actually on board, flip it

                if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
                    boardCopy[y][x] = !boardCopy[y][x];
                }
            };

            // TODO: Make a (deep) copy of the oldBoard

            // TODO: in the copy, flip this cell and the cells around it

            // TODO: return the copy
        });
    }

    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
}

export default Board;
