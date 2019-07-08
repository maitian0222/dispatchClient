import * as React from 'react';
import { Select } from 'antd';
import http from '@sinoui/http';
const { Option } = Select;

class CaseTypeSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  public componentDidMount() {
    http.get('/biz/court/listSubjectCourt').then((result) => {
      this.setState({
        list: result.content,
      });
    });
  }
  public componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  public onChange = (value: string) => {
    const item = this.state.list.filter((item) => item.caseType === value)[0];

    this.props.form.setFieldsValue({ courtId: item.courtId });

    this.props.onChange(value);
  };

  public render() {
    return (
      <Select
        {...this.props}
        onChange={(value: string) => {
          this.onChange(value);
        }}
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
        placeholder="请选择"
      >
        {this.state.list.map((item, index) => {
          return (
            <Option key={index} value={item.caseType}>
              {item.caseName}
            </Option>
          );
        })}
      </Select>
    );
  }
}

export default CaseTypeSelect;
