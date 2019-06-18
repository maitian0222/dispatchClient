import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Radio, Cascader } from 'antd';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

interface Props {
  form: FormComponentProps;
  // tslint:disable-next-line:no-any
  getFieldDecorator: any;
  // tslint:disable-next-line:no-any
  initialValues: any;
}

class AddCourtForm extends React.Component<Props, State> {
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
          <Form.Item label="法院名称">
            {getFieldDecorator('name', {
              initialValue: initialValues ? initialValues.name : null,
              rules: [
                {
                  required: true,
                  message: '请输入法院名称',
                },
              ],
            })(<Input placeholder="法院名称" />)}
          </Form.Item>
          <Form.Item label="状态">
            {getFieldDecorator('status', {
              initialValue: initialValues ? initialValues.status : '1',
            })(
              <Radio.Group>
                <Radio value="1">启用</Radio>
                <Radio value="2">停用</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item label="地址">
            {getFieldDecorator('address', {
              rules: [
                {
                  required: true,
                  message: '请输入地址',
                },
              ],
            })(<Cascader options={options} placeholder="请选择" />)}
            {getFieldDecorator('detailAddress', {
              rules: [
                {
                  required: false,
                  message: '详细地址',
                },
              ],
            })(<Input placeholder="具体地址" />)}
          </Form.Item>
          <Form.Item label="立案咨询电话">
            {getFieldDecorator('tel', {
              rules: [
                {
                  required: true,
                  message: '请输入咨询电话',
                },
              ],
            })(<Input placeholder="法咨询电话院名称" />)}
          </Form.Item>
          <Form.Item label="描述">
            {getFieldDecorator('description', {
              initialValue: initialValues ? initialValues.description : null,
              rules: [
                {
                  required: false,
                  message: '请输入描述内容',
                },
              ],
            })(<Input.TextArea />)}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default AddCourtForm;
