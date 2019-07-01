import React from 'react';
import { Select } from 'antd';
import http from '@sinoui/http';

const { Option } = Select;

class CourtSelect extends React.Component<Props, State> {
  private props: any;
  private state: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      content: [],
    };
  }

  public componentWillMount() {
    http.get(`/biz/court/list`).then((result) => {
      this.setState({
        content: result.content,
      });
    });
  }

  public render() {
    return (
      <Select
        {...this.props}
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
        placeholder="请选择"
      >
        {this.state.content.map((item) => (
          <Option value={item.id}>{item.name}</Option>
        ))}
      </Select>
    );
  }
}

export default CourtSelect;
