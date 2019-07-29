import * as React from 'react';
import { Empty, Button } from 'antd';
export default function Demo() {
  return (
    <Empty
      image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
      imageStyle={{
        height: 60,
      }}
      description={
        <span>
          Customize <a href="#API">Description</a>
        </span>
      }
    >
      <Button type="primary" onClick={() => alert('Create Now')}>
        Create Now
      </Button>
    </Empty>
  );
}
