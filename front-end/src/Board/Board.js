import React from 'react';
import Square from '../Square/Square';
import './Board.scss';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avail_val: 1,
      number_width_square: 7,
      number_height_square: 7,
      top: 100,
      left: 100,
      logic_board: [],
      listHit: [],
      listPosWin: [],
      typeWinner: 0,
      flag: true
    };
    this.checkWin = this.checkWin.bind(this);
    this.setWinResult = this.setWinResult.bind(this);

    //this.reset = this.reset.bind(this);
    this.hitSquare = this.hitSquare.bind(this);
  }
  componentDidMount() {
    let logic_board = [];
    let numWidth = this.state.number_width_square;
    let numHeight = this.state.number_height_square;

    for (let i = 0; i < numWidth + 2; i++) {
      logic_board[i] = [];
      for (let j = 0; j < numHeight + 2; j++) {
        logic_board[i].push(0);
      }
    }

    this.setState({
      ...this.state,
      logic_board: logic_board
    });
  }
  render() {
    let board_main_play = [];
    let numWidth = this.state.number_width_square;
    let numHeight = this.state.number_height_square;
    let top = this.state.top;
    let left = this.state.left;

    for (let i = 0; i < numWidth; i++) {
      for (let j = 0; j < numHeight; j++) {
        board_main_play.push(
          <Square
            top={top}
            left={left}
            x={i}
            y={j}
            hitSquare={() => {
              this.hitSquare(i, j);
            }}
            val={
              this.state.logic_board[i + 1]
                ? this.state.logic_board[i + 1][j + 1]
                : null
            }
          />
        );
      }
    }

    let listHit = this.state.listHit;

    let listHitHtml = [];
    for (let i = 0; i < listHit.length; i++) {
      listHitHtml.push(
        <div id={'turn' + i}>
          Lượt {i + 1}: {listHit[i].split(',')[2]} đánh tại ô (
          {listHit[i].split(',')[0]},{listHit[i].split(',')[1]})
        </div>
      );
    }

    return (
      <div id="board">
        <div className="title">GAME CARO 20x20</div>
        <div id="btn_replay">Chơi lại</div>
        <div id="turn">
          {'Quân cờ được đánh lượt này: '}
          {this.state.avail_val === 1 ? 'O' : null}
          {this.state.avail_val === 2 ? 'X' : null}
        </div>
        <div id="board_main_play">{board_main_play}</div>
        <div id="list_hit_history">{listHitHtml}</div>
      </div>
    );
  }

  hitSquare(i, j) {
    if (
      this.state.logic_board[i + 1][j + 1] === 0 &&
      this.state.typeWinner === 0
    ) {
      let logic_board = [...this.state.logic_board];
      logic_board[i + 1][j + 1] = this.state.avail_val;

      console.log(logic_board);
      if (this.checkWin(i, j, logic_board)) {
        alert('win');
      }

      let listHit = this.state.listHit;
      listHit.push(`${i},${j},${this.state.avail_val}`);
      this.setState({
        ...this.state,
        logic_board: logic_board,
        avail_val: this.state.avail_val === 1 ? 2 : 1,
        listHit: listHit
      });
    }
  }

  setWinResult(pos1, pos2, pos3, pos4, pos5, typeWinner) {
    let listPosWin = this.state.listPosWin;
    listPosWin = [pos1, pos2, pos3, pos4, pos5];
    this.state.listPosWin = listPosWin;
    this.state.typeWinner = typeWinner;
    this.setState = {
      ...this.state,
      listPosWin: listPosWin,
      typeWinner: typeWinner,
      flag: !this.state.flag
    };
  }

  checkWin(i, j, logicBoard, typeHitter = 1) {
    //i,j is real in real board

    const numWidth = this.state.number_width_square;
    const numHeight = this.state.number_height_square;
    const typeEnemy = typeHitter === 1 ? 2 : 1;

    let topLeftCorn = [i, j],
      topCenterCorn = [i, j],
      topRightCorn = [i, j],
      leftCorn = [i, j];
    let countTopLeftCorn = 0,
      countTopCenterCorn = 0,
      countTopRightCorn = 0,
      countLeftCorn = 0;

    //_______________________________________________________________
    while (logicBoard[topLeftCorn[0]][topLeftCorn[1]] === typeHitter) {
      topLeftCorn[0]--;
      topLeftCorn[1]--;
    }
    while (logicBoard[topLeftCorn[0] + 1][topLeftCorn[1] + 1] === typeHitter) {
      countTopLeftCorn++;
      topLeftCorn[0]++;
      topLeftCorn[1]++;
    }
    topLeftCorn[0]--;
    topLeftCorn[1]--;

    if (
      countTopLeftCorn >= 5 &&
      (logicBoard[topLeftCorn[0] + 2][topLeftCorn[1] + 2] !== typeEnemy ||
        logicBoard[topLeftCorn[0] - 4][topLeftCorn[1] - 4] !== typeEnemy)
    ) {
      return true;
    }

    //_______________________________________________________________

    while (logicBoard[topCenterCorn[0] + 1][topCenterCorn[1]] === typeHitter) {
      topCenterCorn[1]--;
    }
    while (
      logicBoard[topCenterCorn[0] + 1][topCenterCorn[1] + 1] === typeHitter
    ) {
      countTopCenterCorn++;
      topCenterCorn[1]++;
    }
    topCenterCorn[1]--;

    if (
      countTopCenterCorn >= 5 &&
      (logicBoard[topCenterCorn[0] + 1][topCenterCorn[1] + 2] !== typeEnemy ||
        logicBoard[topCenterCorn[0] + 1][topCenterCorn[1] - 4] !== typeEnemy)
    ) {
      return true;
    }

    //_______________________________________________________________
    while (logicBoard[topRightCorn[0] + 2][topRightCorn[1]] === typeHitter) {
      topRightCorn[0]++;
      topRightCorn[1]--;
    }
    while (
      logicBoard[topRightCorn[0] + 1][topRightCorn[1] + 1] === typeHitter
    ) {
      countTopRightCorn++;
      topRightCorn[0]--;
      topRightCorn[1]++;
    }
    topRightCorn[0]++;
    topRightCorn[1]--;

    if (
      countTopRightCorn >= 5 &&
      (logicBoard[topRightCorn[0]][topRightCorn[1] + 2] ||
        logicBoard[topRightCorn[0] + 6][topRightCorn[1] - 4])
    ) {
      return true;
    }

    //_______________________________________________________________
    while (logicBoard[leftCorn[0]][leftCorn[1] + 1] === typeHitter) {
      leftCorn[0]--;
    }
    while (logicBoard[leftCorn[0] + 1][leftCorn[1] + 1] === typeHitter) {
      countLeftCorn++;
      leftCorn[0]++;
    }
    if (countLeftCorn >= 5) {
      return true;
    }
    return false;
  }
}
export default Board;
