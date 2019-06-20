import React, { Component } from "react";

class GameBoard extends Component {
  title = "Conway's Game of Life";
  state = {
    board: this.makeArray(10, 10),
    steps: 0
  };
  interval;
  delay = 1000;
  colStyles = {
    borderColor: "#ccc",
    borderWidth: 1,
    borderStyle: "solid",
    height: 20,
    width: 20,
    margin: 2
  };
  contStyles = {
    width: 400,
    padding: 5
  };
  controlStyle = {
    height: 30,
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10
  };
  render() {
    let board = this.state.board,
      rows = board.length,
      cols = board[0].length,
      rowsArr = [];
    for (let i = 0; i < rows; i++) {
      let colsArr = [];
      for (let j = 0; j < cols; j++) {
        let exp = board[i][j] ? (
          <div
            key={i + "-" + j}
            style={this.colStyles}
            className="col-sm-1 filled"
            onClick={this.toggleCell.bind(this, i, j, 1)}
          />
        ) : (
          <div
            key={i + "-" + j}
            style={this.colStyles}
            className="col-sm-1 blank"
            onClick={this.toggleCell.bind(this, i, j, 0)}
          />
        );
        colsArr.push(exp);
      }
      rowsArr.push(
        <div key={i} className="row">
          {colsArr}
        </div>
      );
    }
    return (
      <div>
        <header>{this.title}</header>
        <div id="content">
          <p>
            The Game of Life, also known simply as Life, is a cellular automaton
            devised by the British mathematician John Horton Conway in 1970. The
            game is a zero-player game, meaning that its evolution is determined
            by its initial state, requiring no further input. You can check the
            rules{" "}
            <a
              target="blank"
              href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life."
            >
              here
            </a>
            .
          </p>
          <h2>Play Game below</h2>
          <div style={this.contStyles} align="center" className="container">
            {rowsArr}
          </div>
          <div id="ctrl-prt">
            <span id="steps">steps: {this.state.steps}</span>
            <button
              style={this.controlStyle}
              className="btn btn-info play"
              onClick={this.startGame.bind(this)}
            >
              Play
            </button>
            <button
              style={this.controlStyle}
              className="btn btn-info pause"
              onClick={this.pauseGame.bind(this)}
            >
              Pause
            </button>
            <button
              style={this.controlStyle}
              className="btn btn-info step"
              onClick={this.stepGame.bind(this)}
            >
              Step
            </button>
            <button
              style={this.controlStyle}
              className="btn btn-info reset"
              onClick={this.resettGame.bind(this)}
            >
              Reset
            </button>
          </div>
        </div>
        <footer>Copyright - xyz</footer>
      </div>
    );
  }

  makeArray(h, w) {
    var arr = [];
    for (let i = 0; i < h; i++) {
      arr[i] = [];
      for (let j = 0; j < w; j++) {
        if (j === 5) {
          arr[i][j] = 1;
        } else {
          arr[i][j] = 0;
        }
      }
    }
    return arr;
  }

  countNeighbours(x, y, board) {
    let neighbors = 0;

    if (board[x - 1] && board[x - 1][y - 1] === 1) neighbors++;
    if (board[x] && board[x][y - 1] === 1) neighbors++;
    if (board[x + 1] && board[x + 1][y - 1] === 1) neighbors++;
    if (board[x + 1] && board[x + 1][y] === 1) neighbors++;
    if (board[x - 1] && board[x - 1][y] === 1) neighbors++;
    if (board[x - 1] && board[x - 1][y + 1] === 1) neighbors++;
    if (board[x] && board[x][y + 1] === 1) neighbors++;
    if (board[x + 1] && board[x + 1][y + 1] === 1) neighbors++;

    return neighbors;
  }

  startGame(newBoard) {
    this.interval = setInterval(this.stepGame.bind(this), this.delay);
  }

  pauseGame() {
    clearInterval(this.interval);
  }

  stepGame() {
    let board = this.state.board;
    let updatedBoard = [];
    board.forEach((row, x) => {
      updatedBoard[x] = [];
      board[x].forEach((col, y) => {
        let alive = 0,
          count = this.countNeighbours(x, y, board);

        if (col > 0) {
          alive = count === 2 || count === 3 ? 1 : 0;
        } else {
          alive = count === 3 ? 1 : 0;
        }

        updatedBoard[x][y] = alive;
      });
    });
    this.setState({ board: updatedBoard, steps: this.state.steps + 1 });
  }

  resettGame() {
    this.pauseGame();
    this.setState({ board: this.makeArray(10, 10), steps: 0 });
  }

  toggleCell(i, j, filled) {
    //console.log(this);
    let board = this.state.board;
    board[i][j] = !filled;
    this.setState({ board: board });
  }
}

export default GameBoard;
