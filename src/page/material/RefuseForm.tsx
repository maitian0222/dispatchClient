import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input } from 'antd';
interface Props {
  form: FormComponentProps;
  // tslint:disable-next-line:no-any
  getFieldDecorator: any;
}
class RefuseForm extends React.Component<Props, State> {
  private props: any;
  private state: any;
  constructor(props: Props) {
    super(props);
  }
  public render() {
    const { getFieldDecorator } = this.props;
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
          <Form.Item label="理由">
            {getFieldDecorator('description', {
              initialValue: '',
              rules: [
                {
                  max: 400,
                  message: '请输入200字以内拒绝理由',
                },
              ],
            })(<Input.TextArea style={{ height: 200 }} />)}
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default RefuseForm;
