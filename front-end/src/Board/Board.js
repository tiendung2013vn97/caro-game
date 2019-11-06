import React from 'react';
import Square from '../Square/Square';
import './Board.scss';

import { Row, Col, Button, Card } from 'antd';
import EnemyAvatar from '../Account/AvatarEnemy/container-avatar';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avail_val: 1,
      number_width_square: 20,
      number_height_square: 20,
      top: 0,
      left: 0,
      logic_board: [],
      listHit: [],
      typeWinner: 0,
      flag: true,
      emSquare: [-1, -1],
      isWin: false
    };
    this.checkWin = this.checkWin.bind(this);

    //this.reset = this.reset.bind(this);
    this.hitSquare = this.hitSquare.bind(this);
  }
  componentDidMount() {
   
   
    this.props.game.socket.on("hit",(val)=>{
        let lb=this.state.logic_board;
        lb[+val.split(',')[0]+1][+val.split(',')[1]+1]=this.props.game.avail_val===1?2:1
        this.setState({...this.state,logic_board:lb})
        this.props.changeTurn()

        let result = this.checkWin(+val.split(',')[0], +val.split(',')[1], lb, 1);
        if (result != false) {
          this.setState({
            ...this.state,
            listWin: result,
            isWin: true,
            typeWinner: 1
          });
          this.props.showFailNotify('Bạn đã thua cuộc')
          return;
        }
  
        result = this.checkWin(+val.split(',')[0], +val.split(',')[1], lb, 2);
        if (result != false) {
          this.setState({
            ...this.state,
            listWin: result,
            isWin: true,
            typeWinner: 2
          });
          this.props.showFailNotify('Bạn đã thua cuộc')
          return;
        }
    })
    let ctx = this;
    document.onkeydown = function(evt) {
      evt = evt || window.event;
      if (evt.keyCode == 27) {
        ctx.setState({ ...ctx.state, emSquare: [-1, -1] });
      }
    };

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
            isWin={this.state.isWin}
            listWin={this.state.listWin}
            emSquare={this.state.emSquare}
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
        <div
          id={'turn' + i}
          className={i % 2 === 0 ? 'history-item' : 'history-item em'}
          onClick={() =>
            this.emSquare(listHit[i].split(',')[0], listHit[i].split(',')[1])
          }
        >
          Lượt {i + 1}: {listHit[i].split(',')[2]} đánh tại ô (
          {listHit[i].split(',')[0]},{listHit[i].split(',')[1]})
        </div>
      );
    }

    let myTurn=this.props.game.myTurn
    let turner='';
    if(myTurn){
      turner=this.props.account.username
    }else{
      turner=this.props.enemyAccount.username
    }
    return (
      <Row id="board">
        {/* <div id="btn_replay">Chơi lại</div>
        <div id="turn">
          {'Quân cờ được đánh lượt này: '}
          {this.state.avail_val === 1 ? 'O' : null}
          {this.state.avail_val === 2 ? 'X' : null}
        </div> */}
        {this.props.game.inGame&&
        <Row>
        Lượt đánh của: {turner}
      </Row>
        }
        
        <Col span={8}>
          <Row>{this.props.game.curMode === 'player' && <EnemyAvatar />}</Row>
          <Row className="list-history">
            <Card
              title="Lịch sử đánh"
              style={{
                width: '100%',
                borderRadius: '10px',
                border: '1px solid black',
                height: 460
              }}
            >
              <div className="history-container">{listHitHtml}</div>
            </Card>
          </Row>
        </Col>

        <Col span={16}>
          <Row className="top-btn">
            <Button className="btn-gg" type="primary">
              Xin đầu hàng
            </Button>
            {this.props.game.curMode === 'player' && (
              <Button className="btn-tie" type="primary">
                Xin hòa
              </Button>
            )}

            <Button className="btn-undo" type="primary">
              Undo
            </Button>
            {this.props.game.curMode === 'computer' && (
              <Button className="btn-redo" type="primary">
                Redo
              </Button>
            )}
          </Row>
          <Row id="board_main_play">{board_main_play}</Row>
        </Col>

        {/* <div id="list_hit_history">{listHitHtml}</div> */}
      </Row>
    );
  }
  emSquare(i, j) {
    this.setState({
      ...this.state,
      emSquare: [i, j]
    });
  }
  hitSquare(i, j) {
    this.props.hitSquare(i, j)
    if(this.props.game.inGame&&this.props.game.myTurn){
     
      if (
        this.state.logic_board[i + 1][j + 1] === 0 &&
        this.state.typeWinner === 0
      ) {
        let logic_board = [...this.state.logic_board];
        logic_board[i + 1][j + 1] = this.props.game.avail_val;
  
        let listHit = this.state.listHit;
        listHit.push(`${i},${j},${this.props.game.avail_val}`);
        this.setState({
          ...this.state,
          logic_board: logic_board,
          listHit: listHit
        });
  
        let result = this.checkWin(i, j, logic_board, 1);
        if (result != false) {
          this.setState({
            ...this.state,
            listWin: result,
            isWin: true,
            typeWinner: 1
          });
          this.props.showSuccessNotify('Chúc mừng bạn đã thắng cuộc!')
          return;
        }
  
        result = this.checkWin(i, j, logic_board, 2);
        if (result != false) {
          this.setState({
            ...this.state,
            listWin: result,
            isWin: true,
            typeWinner: 2
          });
          this.props.showSuccessNotify('Chúc mừng bạn đã thắng cuộc!')
          return;
        }
      }
    }
    
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

    let listWin = [];

    //_______________________________________________________________
    while (logicBoard[topLeftCorn[0]][topLeftCorn[1]] === typeHitter) {
      topLeftCorn[0]--;
      topLeftCorn[1]--;
    }
    while (logicBoard[topLeftCorn[0] + 1][topLeftCorn[1] + 1] === typeHitter) {
      listWin.push([topLeftCorn[0] + 1, topLeftCorn[1] + 1]);
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
      return listWin;
    }

    //_______________________________________________________________
    listWin = [];
    while (logicBoard[topCenterCorn[0] + 1][topCenterCorn[1]] === typeHitter) {
      topCenterCorn[1]--;
    }
    while (
      logicBoard[topCenterCorn[0] + 1][topCenterCorn[1] + 1] === typeHitter
    ) {
      listWin.push([topCenterCorn[0] + 1, topCenterCorn[1] + 1]);
      countTopCenterCorn++;
      topCenterCorn[1]++;
    }
    topCenterCorn[1]--;

    if (
      countTopCenterCorn >= 5 &&
      (logicBoard[topCenterCorn[0] + 1][topCenterCorn[1] + 2] !== typeEnemy ||
        logicBoard[topCenterCorn[0] + 1][topCenterCorn[1] - 4] !== typeEnemy)
    ) {
      return listWin;
    }

    //_______________________________________________________________
    listWin = [];
    while (logicBoard[topRightCorn[0] + 2][topRightCorn[1]] === typeHitter) {
      topRightCorn[0]++;
      topRightCorn[1]--;
    }
    while (
      logicBoard[topRightCorn[0] + 1][topRightCorn[1] + 1] === typeHitter
    ) {
      listWin.push([topRightCorn[0] + 1, topRightCorn[1] + 1]);
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
      return listWin;
    }

    //_______________________________________________________________
    listWin = [];
    while (logicBoard[leftCorn[0]][leftCorn[1] + 1] === typeHitter) {
      leftCorn[0]--;
    }
    while (logicBoard[leftCorn[0] + 1][leftCorn[1] + 1] === typeHitter) {
      listWin.push([leftCorn[0] + 1, leftCorn[1] + 1]);
      countLeftCorn++;
      leftCorn[0]++;
    }
    if (countLeftCorn >= 5) {
      return listWin;
    }
    return false;
  }
}
export default Board;
