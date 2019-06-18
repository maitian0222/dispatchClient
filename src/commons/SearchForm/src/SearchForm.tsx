import React from 'react';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
import styles from './form.css';
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
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
          <Form.Item label={item.fieldName}>
            {getFieldDecorator(item.name, {
              rules: [
                {
                  required: false,
                  message: 'Input something!',
                },
              ],
            })(<Input placeholder={item.placeholder} />)}
          </Form.Item>
        </Col>,
      );
    });
    return children;
  }
  public handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      //console.log('Received values of form: ', values);
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
