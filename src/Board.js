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

function Board({ nrows=5, ncols=5, chanceLightStartsOn }) {
    const [board, setBoard] = useState(createBoard());
    // const [isWinner, setIsWinner] = useState(false);

    /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
    function createBoard() {
        // TODO: create array-of-arrays of true/false values
        let initialBoard = [];
        const trueFalse = [true, false];
        for (let y = 0; y < nrows; y++) {
            let row = [];
            for (let x = 0; x < ncols; x++) {
                row.push(trueFalse[getRandomTF()])
            }
            initialBoard.push(row);
        }
        console.log(initialBoard)
        return initialBoard;
    }

    function hasWon() {
        // TODO: check the board in state to determine whether the player has won.
        if (board.every(y => y === false)) {
            return;
        };
    };

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
            const boardCopy = oldBoard.map(row => [...row])
            // TODO: in the copy, flip this cell and the cells around it
            flipCell(y, x, boardCopy);
            flipCell(y-1, x, boardCopy);
            flipCell(y, x+1, boardCopy);
            flipCell(y+1, x, boardCopy);
            flipCell(y, x-1, boardCopy);

            // TODO: return the copy
            return boardCopy;
        });
    }

    // if the game is won, just show a winning msg & render nothing else
    if (hasWon()) {
        return (
            <div>
                <h2>You Won!</h2>
            </div>
        )
    }
    // make board: rows of Cell components
    let tableBoard = [];
    for (let y = 0; y < nrows; y++) {
        let row = [];
        for (let x = 0; x < ncols; x++) {
            let coord = `${y}-${x}`;
            row.push(<Cell
                key={coord}
                isLit={board[y][x]}
                flipCellsAroundMe={() => flipCellsAround(coord)}
            />);
        }
        tableBoard.push(<tr key={y}>{row}</tr>)
    }

    return (
        <div>
            <h1>Lights Out</h1>
            <h4>Clicking on a cell toggles that cell and each of its immediate neighbors - left, right, top and bottom. The goal is to turn out all the lights, ideally with the minimum number of clicks.</h4>
            <table className="Board">
                <tbody>{tableBoard}</tbody>
            </table>
        </div>
    )
}

export default Board;
