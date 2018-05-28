# React Circular Slider Bar

[demo](https://alexsyo.github.io/react-circular-slider/)

## Getting started

install
```
npm install --save-dev react-circular-slider-bar
```

usage example
```
import React from 'react';
import CircularSlider from 'react-circular-slider-bar';

const myApp = () => (
  <div>
    ...my awesome stuff...
    <CircularSlider
      r={50}
      trackWidth={10}
      thumbWidth={10}
    />
  </div>
);

export default myApp;
```

## Props

prop             | type   | deafult
-----------------|--------|--------
r                | number | 80
initialAngle     | numver | 90
trackWidth       | number | 2
trackColor       | string | #f5f5dc
arcColor         | string | #7985f1
thumbWidth       | number | 10
thumbColor       | string | white
thumbBorderWidth | number | 2
thumbBorderColor | string | #cccccc
onChange         | func   | value => {}
