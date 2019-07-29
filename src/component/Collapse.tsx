import * as React from 'react';

import { Collapse, Icon } from 'antd';
const Panel = Collapse.Panel;

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};

function callback(key) {
  console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const genExtra = () => (
  <Icon
    type="setting"
    onClick={(event) => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
    }}
  />
);
export default function Demo() {
  return (
    <Collapse
      defaultActiveKey={['1']}
      onChange={callback}
      expandIcon={({ isActive }) => (
        <Icon type="caret-right" rotate={isActive ? 90 : 0} />
      )}
      expandIconPosition={'right'}
    >
      <Panel header="This is panel header 1" key="1" style={customPanelStyle}>
        <Collapse accordion bordered={false}>
          <Panel header="This is panel child" key="11">
            <Panel header="This is panel header 1" key="1">
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 2" key="2">
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 3" key="3">
              <p>{text}</p>
            </Panel>
          </Panel>
        </Collapse>
      </Panel>
      <Panel
        header="This is panel header 2"
        key="2"
        style={customPanelStyle}
        extra={genExtra()}
      >
        <p>{text}</p>
      </Panel>
      <Panel
        header="This is panel header 3"
        key="3"
        style={customPanelStyle}
        showArrow={false}
      >
        <p>{text}</p>
      </Panel>
    </Collapse>
  );
}
