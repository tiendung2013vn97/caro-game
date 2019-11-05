import React from 'react';
import './Square.css';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      SQUARE_SIZE: 25
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
        {this.props.val === 1 ? 'O' : null}
        {this.props.val === 2 ? 'X' : null}
      </div>
    );
  }

  hitSquare() {
    this.props.hitSquare();
  }
}

export default Square;
