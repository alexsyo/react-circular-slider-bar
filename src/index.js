import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Arc from './Arc';
import Track from './Track';
import Thumb from './Thumb';
import { getRelativeAngle } from './utils';

class App extends Component {
  static propTypes = {
    r: PropTypes.number,
    initialAngle: PropTypes.number,
    trackWidth: PropTypes.number,
    trackColor: PropTypes.string,
    arcColor: PropTypes.string,
    thumbWidth: PropTypes.number,
    thumbColor: PropTypes.string,
    thumbBorderWidth: PropTypes.number,
    thumbBorderColor: PropTypes.string,
    onChange: PropTypes.func
  }

  static defaultProps = {
    r: 80,
    initialAngle: 90,
    trackWidth: 2,
    trackColor: '#f5f5dc',
    arcColor: '#7985f1',
    thumbWidth: 10,
    thumbColor: 'white',
    thumbBorderWidth: 2,
    thumbBorderColor: '#cccccc',
    onChange: value => {}
  }

  constructor(props) {
    super(props)
    document.addEventListener('mouseup', this.thumbMouseUp);
  }

  componentDidMount = () => {
    this.offsets = this.ref.current.getBoundingClientRect()
  }

  thumbMouseDown = () => document.addEventListener('mousemove', this.moveThumb);
  thumbMouseUp = () => document.removeEventListener('mousemove', this.moveThumb)

  moveThumb = evt => {
    const angle = this.calculateAngle(evt.clientX, evt.clientY)
    const thumbPosition = this.calculateThumbPosition(angle)
    this.handleChange(angle)
    this.setState({angle, thumbPosition})
  }

  calculateAngle = (mouseXabs, mouseYabs) => {
    const mouseX = mouseXabs - this.props.r - this.offsets.left;
    const mouseY = - mouseYabs + this.props.r + this.offsets.top;
    const angle = Math.atan(mouseY / mouseX) +
      (mouseX < 0 ? (180 / 57.2957795) : 0) +
      (mouseX >= 0 && mouseY < 0 ? (360 / 57.2957795) : 0);

    return angle;
  }

  calculateThumbPosition = (angle) => {
    const x = Math.cos(angle)
      * (this.props.r + (this.props.trackWidth / 2))
      + this.props.r + this.props.trackWidth
      
    const y = - Math.sin(angle)
      * (this.props.r + (this.props.trackWidth / 2))
      + this.props.r + this.props.trackWidth
      
    return {x, y}
  }

  handleChange = (angle) => {
    const angleDEG = angle * (180 / Math.PI)

    const percent = (getRelativeAngle(angleDEG, this.props.initialAngle) / 360) * 100

    this.props.onChange(percent);
  }

  ref = React.createRef();
  state = {
    angle: this.props.initialAngle * (Math.PI / 180),
    thumbPosition: this.calculateThumbPosition(this.props.initialAngle * (Math.PI / 180))
  }

  render() {
    return (
      <div id="circular-slider"
        style={{
          width: this.props.r * 2,
          height: this.props.r * 2,
          position: 'relative'
        }}
        ref={this.ref}
      >
        <Track
          width={this.props.trackWidth}
          color={this.props.trackColor}
        />
        <Arc 
          r={this.props.r}
          angle={this.state.angle}
          initialAngle={this.props.initialAngle}
          width={this.props.trackWidth}
          color={this.props.arcColor}
        />
        <Thumb
          diameter={this.props.thumbWidth}
          color={this.props.thumbColor}
          borderWidth={this.props.thumbBorderWidth}
          borderColor={this.props.thumbBorderColor}
          position={this.state.thumbPosition}
          handleMouseDown={this.thumbMouseDown}
        />
      </div>
    );
  }
}

export default App;
