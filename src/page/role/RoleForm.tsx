import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import ResourcesTreeFrom from './ResourcesTreeFrom';
import {
  Form,
  Input,
  Radio,
  Button,
  TreeSelect,
  InputNumber,
  Upload,
  Icon,
} from 'antd';

const { TextArea } = Input;

interface Props {
  form: FormComponentProps;
  // tslint:disable-next-line:no-any
  getFieldDecorator: any;
  // tslint:disable-next-line:no-any
  initialValues: any;
}

class UserForm extends React.Component<Props, State> {
  private props: any;
  private state: any;
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

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
          <Form.Item label="角色名称">
            {getFieldDecorator('roleName', {
              rules: [
                {
                  required: true,
                  message: '请输入角色名称',
                },
              ],
              initialValue: initialValues && initialValues.roleName,
            })(<Input />)}
          </Form.Item>
          <Form.Item label="资源配置">
            {getFieldDecorator('menuId', {
              // rules: [
              //   {
              //     required: true,
              //     message: '请选择资源',
              //   },
              // ],
            })(<ResourcesTreeFrom initialValues={initialValues} />)}
          </Form.Item>
          <Form.Item label="描述">
            {getFieldDecorator('remark', {
              initialValue: initialValues && initialValues.remark,
            })(<TextArea rows={4} />)}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default UserForm;
