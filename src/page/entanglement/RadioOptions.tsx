import * as React from 'react';
import { Radio } from 'antd';
import http from '@sinoui/http';

interface Props {
  onChange: (e) => void;
  defaultValue: string;
}

class RadioOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  public componentDidMount() {
    http.get('/biz/dispute/count').then((result) => {
      this.setState({
        list: result.content,
      });
    });
  }
  public render() {
    return (
      <Radio.Group
        onChange={this.props.onChange}
        defaultValue={this.props.defaultValue}
        buttonStyle="solid"
      >
        {this.state.list.length > 0 && (
          <Radio.Button value="">全部</Radio.Button>
        )}
        {(this.state.list || []).map((item) => (
          <Radio.Button value={item.caseType}>
            {`${item.caseTypeName}(${item.num})`}
          </Radio.Button>
        ))}
      </Radio.Group>
    );
  }
}

export default RadioOptions;
