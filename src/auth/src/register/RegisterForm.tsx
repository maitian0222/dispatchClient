import React from 'react';
import { Form, Input, Select, Row, Col, Button } from 'antd';

const { Option } = Select;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
  };

  public handleSubmit = (e) => {
    e.preventDefault();
    this.props.next();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        //this.props.next();
      }
    });
  };

  public handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  public compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('您输入的两个密码不一致!');
    } else {
      callback();
    }
  };

  public validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  public render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 24,
          offset: 0,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Row>
          <Col span={24}>
            <h4>注册</h4>
          </Col>
        </Row>
        <Form.Item>
          {getFieldDecorator('nickname', {
            rules: [
              {
                required: true,
                message: '请输入你的用户名!',
                whitespace: true,
              },
            ],
          })(<Input placeholder="用户名" />)}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入你的密码!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password placeholder="用户名密码" />)}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: '请再次输入你的密码!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(
            <Input.Password
              placeholder="确认密码"
              onBlur={this.handleConfirmBlur}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入你的手机号!' }],
          })(
            <Input
              placeholder="11位手机号"
              addonBefore={prefixSelector}
              style={{ width: '100%' }}
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={16}>
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: '请输入你收到的验证码!' }],
              })(<Input placeholder="输入验证码" />)}
            </Col>
            <Col span={4} push={1}>
              <Button>获取验证码</Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
          <Button
            type="link"
            style={{ float: 'right' }}
            onClick={this.props.goLogin()}
          >
            使用已有账户登录
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(
  RegistrationForm,
);

export default WrappedRegistrationForm;
