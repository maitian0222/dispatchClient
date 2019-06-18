import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input } from 'antd';

interface Props {
  form: FormComponentProps;
  // tslint:disable-next-line:no-any
  getFieldDecorator: any;
  // tslint:disable-next-line:no-any
  initialValues: any;
}

class AddDictionaryForm extends React.Component<Props, State> {
  private props: any;
  private state: any;
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { getFieldDecorator, initialValues } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
      },
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
          <Form.Item label="字典标识">
            {getFieldDecorator('fieldCode', {
              initialValue: initialValues ? initialValues.fieldCode : null,
              rules: [
                {
                  required: true,
                  message: '请输入字典标识',
                },
              ],
            })(<Input placeholder="字典标识" />)}
          </Form.Item>
          <Form.Item label="类型">
            {getFieldDecorator('keyy', {
              initialValue: initialValues ? initialValues.keyy : '',
              rules: [
                {
                  required: true,
                  message: '请输入类型',
                },
              ],
            })(<Input placeholder="键 int类型" />)}
          </Form.Item>
          <Form.Item label="值">
            {getFieldDecorator('valuee', {
              initialValue: initialValues ? initialValues.valuee : '',
              rules: [
                {
                  required: true,
                  message: '请输入值',
                },
              ],
            })(<Input placeholder="值" />)}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default AddDictionaryForm;
