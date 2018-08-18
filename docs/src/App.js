import React, {Component} from 'react';
import CircularSlider from 'react-circular-slider-bar';

const buttonStyle = {
  fontFamily: 'sans-serif',
  fontSize: 15,
  width: 100,
  margin: 3,
  padding: 3,
  backgroundColor: '#7985f1',
  border: 'none',
  borderRadius: 5,
  color: 'white',
  outline: 'none',
  cursor: 'pointer'
}

class App extends Component {
  state = {
    value: 0
  }

  setValue = (n) => this.setState({value: n});

  render() {
    return (
      <div style={{
        fontFamily: 'sans-serif',
        position: 'fixed',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <CircularSlider
          onChange={value => this.setState({value})}
          value={this.state.value}
        />
        <p style={{ marginTop: 30}}>{this.state.value}</p>
        <button style={buttonStyle} onClick={() => this.setValue(0)}>reset</button>
        <button style={buttonStyle} onClick={() => this.setValue(50)}>half</button>
        <button style={buttonStyle} onClick={() => this.setValue(99)}>full</button>
      </div>
    );
  }
}

export default App;
