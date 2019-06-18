import * as React from 'react';
import { Carousel } from 'antd';
import './Component.css';

function onChange(a) {
  console.log(a);
}

export default function Demo() {
  return (
    <div style={{ width: 200, height: 400 }}>
      <Carousel
        dotPosition="right"
        effect="fade"
        autoplay
        afterChange={onChange}
      >
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel>
    </div>
  );
}
