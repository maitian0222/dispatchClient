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
  Row,
  Col,
} from 'antd';

const treeData = [
  {
    title: '信息管理',
    value: 'info',
    children: [
      {
        title: '刊物管理',
        value: 'public',
      },
      {
        title: '公告管理',
        value: 'announcement',
      },
    ],
  },
  {
    title: '公文管理',
    value: 'archive',
  },
];

const uploadProps = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
  defaultFileList: [
    {
      uid: '1',
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png',
    },
    {
      uid: '2',
      name: 'yyy.png',
      status: 'done',
      url: 'http://www.baidu.com/yyy.png',
    },
    {
      uid: '3',
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/zzz.png',
    },
  ],
};

interface Props {
  form: FormComponentProps;
}
class RegistrationForm extends React.Component<Props, {}> {
  private props: any;
  constructor(props: Props) {
    super(props);
  }

  public handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  public compareToFirstPassword = (rule, value, callback) => {
    if (typeof value === 'string') {
      callback('只能输入数字!');
    } else {
      callback();
    }
  };

  public render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
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
        <Form.Item style={{ width: '600px' }}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="上级菜单">
              {getFieldDecorator('parentName', {
                rules: [
                  {
                    required: true,
                    message: '必须选择上级菜单!',
                  },
                ],
              })(
                <TreeSelect
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeData={treeData}
                  placeholder="请选择上级菜单"
                  treeDefaultExpandAll
                />,
              )}
            </Form.Item>
            <Form.Item label="菜单类型">
              {getFieldDecorator('menuType', {
                initialValue: 'menu',
              })(
                <Radio.Group>
                  <Radio value="menu">菜单</Radio>
                  <Radio value="auth">权限</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
            <Form.Item label="可见">
              {getFieldDecorator('menuHidden', {
                initialValue: 'show',
              })(
                <Radio.Group>
                  <Radio value="hide">隐藏</Radio>
                  <Radio value="show">显示</Radio>
                </Radio.Group>,
              )}
            </Form.Item>

            <Form.Item label="链接">
              {getFieldDecorator('url', {
                rules: [
                  {
                    required: true,
                    message: '请输入菜单对应的链接',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="排序号">
              {getFieldDecorator('order', {
                rules: [
                  {
                    required: true,
                    message: '请输入菜单的排序号',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<InputNumber min={0} style={{ width: '100%' }} />)}
            </Form.Item>
            <Form.Item label="菜单图标">
              {getFieldDecorator('icon', {
                rules: [
                  {
                    required: true,
                    message: '请输入菜单图标',
                  },
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="上传模板">
              {getFieldDecorator('files', {
                rules: [
                  {
                    required: true,
                    message: '请输入菜单图标',
                  },
                ],
              })(
                <Upload {...uploadProps}>
                  <Button>
                    <Icon type="upload" /> Upload
                  </Button>
                </Upload>,
              )}
            </Form.Item>

            <Form.Item label="描述">
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: '请输入描述内容',
                  },
                ],
              })(<Input.TextArea />)}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Form.Item>
      </div>
    );
  }
}

export default Form.create({ name: 'register' })(RegistrationForm);
