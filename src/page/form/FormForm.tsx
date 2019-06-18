import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import {
  Form,
  Input,
  Radio,
  Button,
  TreeSelect,
  InputNumber,
  Upload,
  Icon,
  Select,
} from 'antd';

const { Option } = Select;

interface Props {
  form: FormComponentProps;
  // tslint:disable-next-line:no-any
  getFieldDecorator: any;
  // tslint:disable-next-line:no-any
  initialValues: any;
}

class FormForm extends React.Component<Props, State> {
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
          <Form.Item label="法院名称">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入用户名',
                },
              ],
              initialValue: initialValues ? initialValues.name : '1',
            })(
              <Select>
                <Option value="1">广州互联法院</Option>
                <Option value="2">北京互联法院</Option>
                <Option value="3">杭州互联法院</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="字段">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入字段',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="名称">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入名称',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="数据类型">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请选择数据类型',
                },
              ],
            })(
              <Select>
                <Option value="1">附件</Option>
                <Option value="2">字符串</Option>
                <Option value="3">数值</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="默认值">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入用户名',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="可选项" help={`多个值用“，”分开`}>
            {getFieldDecorator('name', {})(<Input />)}
          </Form.Item>
          <Form.Item label="描述">
            {getFieldDecorator('name', {})(<Input />)}
          </Form.Item>
          <Form.Item label="是否必填">
            {getFieldDecorator('name', {})(
              <Radio.Group>
                <Radio value="true">是</Radio>
                <Radio value="false">否</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default FormForm;
