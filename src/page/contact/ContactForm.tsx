import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Radio, Select, InputNumber } from 'antd';

const { Option } = Select;

interface Props {
  form: FormComponentProps;
  // tslint:disable-next-line:no-any
  getFieldDecorator: any;
  // tslint:disable-next-line:no-any
  initialValues: any;
}

class ContactForm extends React.Component<Props, State> {
  private props: any;
  private state: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      content: [],
    };
  }

  public normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  public render() {
    const { getFieldDecorator, initialValues } = this.props;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <div
        style={{
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Form {...formItemLayout} style={{ width: '600px' }}>
          <Form.Item label="姓名">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入姓名',
                },
              ],
              initialValue: initialValues && initialValues.name,
            })(<Input />)}
          </Form.Item>
          <Form.Item label="性别">
            {getFieldDecorator('sex', {
              rules: [
                {
                  required: true,
                  message: '请选择性别',
                },
              ],
              initialValue: initialValues
                ? initialValues.sex
                  ? initialValues.sex
                  : '0'
                : '0',
            })(
              <Radio.Group>
                <Radio value="0">男</Radio>
                <Radio value="1">女</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item label="联系电话">
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  pattern: /^1[3456789]\d{9}$/,
                  message: '请输入正确的电话号码',
                },
              ],
              initialValue: initialValues && initialValues.phone,
            })(<Input />)}
          </Form.Item>
          <Form.Item label="电子邮箱">
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                  message: '请输入正确的邮箱地址',
                },
              ],
              initialValue: initialValues && initialValues.email,
            })(<Input />)}
          </Form.Item>
          <Form.Item label="身份证号">
            {getFieldDecorator('idNumber', {
              rules: [
                {
                  required: true,
                  pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/,
                  message: '请输入正确的身份证号',
                },
              ],
              initialValue: initialValues && initialValues.idNumber,
            })(<Input />)}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default ContactForm;
