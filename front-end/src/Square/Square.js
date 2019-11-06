import React from 'react';
import './Square.scss';
import XIcon from '../assets/imgs/x.png'
import OIcon from '../assets/imgs/o.png'

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      SQUARE_SIZE: 35
    };
  }
  componentDidMount() {
    this.setState({
      ...this.state,
      x: this.props.x,
      y: this.props.y
    });
  }
  render() {
    let isEm=false;
    if(this.props.x==this.props.emSquare[0]&&this.props.y==this.props.emSquare[1]){
      isEm=true
    }
    let classStr='square ';
    if(isEm){
      classStr+='em-square '
    }
    if(this.props.isWin ){
      console.log(this.props.listWin)
      this.props.listWin.forEach(val=>{
        if(val[0]==+this.props.x+1&&val[1]==+this.props.y+1){
          classStr+='win-square'
          return;
        }
      })
      
    }
    return (
      <div
        className={classStr}
        style={{
          top: this.props.top + this.state.y * this.state.SQUARE_SIZE,
          left: this.props.left + this.state.x * this.state.SQUARE_SIZE
        }}
        onClick={this.props.hitSquare}
      >

        {this.props.val === 1 &&
        <img className='hit-icon' src={OIcon}/>
        }
        {this.props.val === 2 &&
        <img className='hit-icon' src={XIcon}/>}
      </div>
    );
  }

  hitSquare() {
    this.props.hitSquare();
  }
}

export default Square;
