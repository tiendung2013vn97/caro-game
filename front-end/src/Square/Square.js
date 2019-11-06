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
    return (
      <div
        className={'square'}
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
