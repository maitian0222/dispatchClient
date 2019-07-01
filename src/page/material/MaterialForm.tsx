import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Radio, Cascader, Select, InputNumber } from 'antd';
import CascadePosition from '../../component/CascadePosition';
import DictionarySelect from '../../component/DictionarySelect';
const { Option } = Select;
interface Props {
  form: FormComponentProps;
  // tslint:disable-next-line:no-any
  getFieldDecorator: any;
  // tslint:disable-next-line:no-any
  initialValues: any;
}

class MaterialForm extends React.Component<Props, State> {
  private props: any;
  private state: any;
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { getFieldDecorator, initialValues } = this.props;
    const provinceCityCounty = [
      initialValues.province,
      initialValues.city,
      initialValues.county,
    ];
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
            {getFieldDecorator('enable', {
              initialValue: initialValues ? initialValues.enable : 1,
            })(
              <Radio.Group>
                <Radio value={1}>启用</Radio>
                <Radio value={0}>停用</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item label="每日案件处理量">
            {getFieldDecorator('caseAmount', {
              initialValue: initialValues ? initialValues.caseAmount : null,
              rules: [
                {
                  required: true,
                  message: '请输入每日案件处理量',
                },
              ],
            })(<InputNumber min={0} />)}
          </Form.Item>
          <Form.Item label="案件类型">
            {getFieldDecorator('caseType', {
              initialValue: initialValues
                ? initialValues.caseType.split(',')
                : [],
              rules: [
                {
                  required: true,
                  message: '请选择案件类型',
                },
              ],
            })(<DictionarySelect />)}
          </Form.Item>
          <Form.Item label="地址">
            {getFieldDecorator('provinceCityCounty', {
              initialValue: initialValues ? provinceCityCounty : null,
              rules: [
                {
                  required: true,
                  message: '请选择地址',
                },
              ],
            })(<CascadePosition />)}
            {getFieldDecorator('address', {
              initialValue: initialValues ? initialValues.address : null,
              rules: [
                {
                  required: false,
                  message: '详细地址',
                },
              ],
            })(<Input placeholder="具体地址" />)}
          </Form.Item>
          <Form.Item label="立案咨询电话">
            {getFieldDecorator('phone', {
              initialValue: initialValues ? initialValues.phone : null,
              rules: [
                {
                  required: true,
                  message: '请输入咨询电话',
                },
                {
                  pattern: /^1[3456789]\d{9}$|^0\d{2,3}-?\d{7,8}$/,
                  message: '请输入正确的电话号码',
                },
              ],
            })(<Input placeholder="法咨询电话院名称" />)}
          </Form.Item>
          <Form.Item label="邮箱">
            {getFieldDecorator('email', {
              initialValue: initialValues ? initialValues.email : null,
              rules: [
                {
                  required: true,
                  message: '请输入咨询邮箱',
                },
                {
                  pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                  message: '请输入正确的邮箱地址',
                },
              ],
            })(<Input placeholder="法咨询电话院名称" />)}
          </Form.Item>
          <Form.Item label="描述">
            {getFieldDecorator('description', {
              initialValue: initialValues ? initialValues.description : null,
              rules: [
                {
                  max: 400,
                  message: '请输入200字以内描述内容',
                },
              ],
            })(<Input.TextArea />)}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default MaterialForm;
