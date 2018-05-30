import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Arc from './Arc';
import Track from './Track';
import Thumb from './Thumb';
import { 
  toRad,
  toDeg,
  getRelativeAngle
 } from './utils';

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

  calculateAngle = (mouseX, mouseY) => {
    const x = mouseX - this.props.r - this.offsets.left;
    const y = - mouseY + this.props.r + this.offsets.top;
    const angle = toDeg(Math.atan(y / x)) +
      ((x < 0) ? 180 : 0) +
      ((x >= 0 && y < 0) ? 360 : 0);

    return angle;
  }

  calculateThumbPosition = (angle) => {
    const {r, trackWidth} = this.props;

    const x = Math.cos(toRad(angle))
      * (r + (trackWidth / 2))
      + r + trackWidth

    const y = - Math.sin(toRad(angle))
      * (r + (trackWidth / 2))
      + r + trackWidth
      
    return {x, y}
  }

  handleChange = (angle) => {
    const percent = (getRelativeAngle(angle, this.props.initialAngle) / 360) * 100

    this.props.onChange(percent);
  }

  ref = React.createRef();
  state = {
    angle: this.props.initialAngle,
    thumbPosition: this.calculateThumbPosition(this.props.initialAngle)
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
