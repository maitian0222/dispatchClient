import * as React from 'react';
import { Cascader } from 'antd';
import Position from './data/Position';
export default class CascadePosition extends React.Component {
  public render() {
    return (
      <Cascader
        {...this.props}
        options={Position}
        placeholder="请选择"
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
      />
    );
  }
}
