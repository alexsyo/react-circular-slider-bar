import React, {Component} from 'react';
import CircularSlider from 'react-circular-slider-bar';

class App extends Component {
  state = {
    value: 0
  }

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
      test
        <CircularSlider
          onChange={value => this.setState({value})}
        />
        <p style={{ marginTop: 30}}>{this.state.value}</p>
      </div>
    );
  }
}

export default App;
