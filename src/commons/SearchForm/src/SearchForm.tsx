import React from 'react';
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd';
import styles from './form.css';
import moment from 'moment';
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
    expandShow: true,
    inRow: true,
  };
  public getFields() {
    const count = this.state.expand ? 10 : 6;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    this.props.condition.map((item, i) => {
      if (item.type === 'select') {
        children.push(
          <Col
            span={8}
            key={i}
            style={{ display: i < count ? 'block' : 'none' }}
          >
            <Form.Item label={item.fieldName}>
              {getFieldDecorator(item.name, {})(
                <Select mode={item.mode} placeholder={item.placeholder}>
                  {item.options.map((optionItem, index) => {
                    return (
                      <Option key={index} value={optionItem.name}>
                        {optionItem.name}
                      </Option>
                    );
                  })}
                </Select>,
              )}
            </Form.Item>
          </Col>,
        );
      } else if (item.type === 'rangePicker') {
        children.push(
          <Col
            span={8}
            key={i}
            style={{ display: i < count ? 'block' : 'none' }}
          >
            <Form.Item label={item.fieldName}>
              {getFieldDecorator('dateRange', {})(
                <RangePicker
                  placeholder={item.placeholder}
                  format={item.format}
                />,
              )}
            </Form.Item>
          </Col>,
        );
      } else {
        children.push(
          <Col
            span={8}
            key={i}
            style={{ display: i < count ? 'block' : 'none' }}
          >
            <Form.Item label={item.fieldName}>
              {getFieldDecorator(item.name, {})(
                <Input placeholder={item.placeholder} />,
              )}
            </Form.Item>
          </Col>,
        );
      }
    });
    return children;
  }
  public handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      let customFormat = 'YYYY-MM-DD';
      this.props.condition.map((item, index) => {
        if (item.type === 'select') {
          values[item.name] = String(values[item.name]);
        }
        if (item.type === 'rangePicker') {
          customFormat = item.format;
        }
      });
      if (values.dateRange && values.dateRange.length > 0) {
        values.startTime = moment(values.dateRange[0]).format(customFormat);
        values.endTime = moment(values.dateRange[1]).format(customFormat);
        delete values.dateRange;
      }
      //console.log('Received values of form: ', values);
      for (var i in values) {
        if (!values[i] || values[i] === 'undefined') {
          delete values[i];
        }
      }
      this.props.handleSearch(values);
    });
  };

  public handleReset = () => {
    this.props.form.resetFields();
  };

  public toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };
  public componentWillMount() {
    if (this.props.condition.length < 3 || this.props.condition.length === 5) {
      this.setState({ inRow: false });
    }
    if (this.props.condition.length <= 6) {
      this.setState({ expandShow: false });
    }
  }
  public render() {
    return (
      <Form
        className={styles['ant-advanced-search-form']}
        onSubmit={this.handleSearch}
      >
        <Row gutter={24}>
          {this.getFields()}
          {!this.state.inRow ? (
            <Col span={8}>
              <Button style={{ top: 3 }} type="primary" htmlType="submit">
                查询
              </Button>
              <Button
                style={{ marginLeft: 8, top: 3 }}
                onClick={this.handleReset}
              >
                重置
              </Button>
              <a
                style={{
                  marginLeft: 8,
                  fontSize: 12,
                  display: this.state.expandShow ? 'inline-block' : 'none',
                }}
                onClick={this.toggle}
              >
                更多 <Icon type={this.state.expand ? 'up' : 'down'} />
              </a>
            </Col>
          ) : (
            ''
          )}
        </Row>
        {this.state.inRow ? (
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                重置
              </Button>
              <a
                style={{
                  marginLeft: 8,
                  fontSize: 12,
                  display: this.state.expandShow ? 'inline-block' : 'none',
                }}
                onClick={this.toggle}
              >
                更多 <Icon type={this.state.expand ? 'up' : 'down'} />
              </a>
            </Col>
          </Row>
        ) : (
          ''
        )}
      </Form>
    );
  }
}
const SearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);
export default SearchForm;
