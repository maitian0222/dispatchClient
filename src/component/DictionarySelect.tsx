import * as React from 'react';
import { Select } from 'antd';
import http from '@sinoui/http';
const { Option } = Select;

class DictionarySelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      mode: this.props.mode || 'multiple',
    };
  }
  public componentDidMount() {
    http
      .get('/upms/dict/finddict', {
        params: {
          fieldCode: this.props.fieldCode || 'CASE_TYPE',
        },
      })
      .then((result) => {
        this.setState({
          list: result,
        });
      });
  }
  public componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  public render() {
    return (
      <Select
        {...this.props}
        mode={this.state.mode}
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
      >
        {this.state.list.map((item, index) => {
          return (
            <Option key={index} value={item.keyy}>
              {item.valuee}
            </Option>
          );
        })}
      </Select>
    );
  }
}

export default DictionarySelect;
