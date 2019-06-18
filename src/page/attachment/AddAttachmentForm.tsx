import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Radio, Cascader, Select } from 'antd';
const { Option } = Select;

const options = [
  {
    value: '全部',
    label: '全部',
    children: [
      {
        value: '全部',
        label: '全部',
      },
      {
        value: '自然人',
        label: '自然人',
      },
      {
        value: '法人',
        label: '法人',
      },
    ],
  },
  {
    value: '原告',
    label: '原告',
    children: [
      {
        value: '全部',
        label: '全部',
      },
      {
        value: '自然人',
        label: '自然人',
      },
      {
        value: '法人',
        label: '法人',
      },
    ],
  },
  {
    value: '被告',
    label: '被告',
    children: [
      {
        value: '全部',
        label: '全部',
      },
      {
        value: '自然人',
        label: '自然人',
      },
      {
        value: '法人',
        label: '法人',
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

class AddAttachmentForm extends React.Component<Props, State> {
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
          <Form.Item label="附件分类名称">
            {getFieldDecorator('name', {
              initialValue: initialValues ? initialValues.name : null,
              rules: [
                {
                  required: false,
                  message: '请输入法院名称',
                },
              ],
            })(<Input placeholder="附加名称，用于上传时提示" />)}
          </Form.Item>
          <Form.Item label="法院名称">
            {getFieldDecorator('courtName', {
              initialValue: initialValues ? initialValues.courtName : '',
            })(
              <Select
                placeholder="请选择"
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
              >
                <Option value="hzfy">杭州法院</Option>
                <Option value="gzfy">广州法院</Option>
                <Option value="sxfy">山西法院</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="主体类型">
            {getFieldDecorator('address', {
              rules: [
                {
                  required: false,
                  message: '请输入主体类型',
                },
              ],
            })(
              <Cascader
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                options={options}
                placeholder="请选择"
              />,
            )}
          </Form.Item>
          <Form.Item label="上传限制">
            {getFieldDecorator('tel', {
              rules: [
                {
                  required: false,
                  message: '请选择',
                },
              ],
            })(
              <Select
                placeholder="请选择"
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
              >
                <Option value="hzfy">可选(0个或多个)</Option>
                <Option value="gzfy">可选且唯一(0个或1个)</Option>
                <Option value="sxfy">必选(1个或多个)</Option>
                <Option value="sxfy1">必选且唯一(1个)</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="文件类型">
            {getFieldDecorator('type', {
              initialValue: initialValues ? initialValues.type : null,
              rules: [
                {
                  required: false,
                  message: '请输入文件类型',
                },
              ],
            })(<Input placeholder="文件类型，以英文逗号分隔" />)}
          </Form.Item>
          <Form.Item label="目标描述">
            {getFieldDecorator('description', {
              initialValue: initialValues ? initialValues.description : null,
              rules: [
                {
                  required: false,
                  message: '请输入你的阶段性工作目标',
                },
              ],
            })(<Input.TextArea />)}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default AddAttachmentForm;
