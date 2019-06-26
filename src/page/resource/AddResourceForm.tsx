import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, TreeSelect, InputNumber, message } from 'antd';
import http from '@sinoui/http';

interface Props {
  form: FormComponentProps;
  // tslint:disable-next-line:no-any
  getFieldDecorator: any;
  // tslint:disable-next-line:no-any
  initialValues: any;
}

interface State {
  resourceType: 'menu' | 'button';
}
class AddResourceForm extends React.Component<Props, State> {
  private props: any;
  private state: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      resourceType: 'menu',
      fileList: [
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
      ],
      resourceList: [],
    };
  }

  public componentDidMount() {
    http.get('/admin/menu').then((result) => {
      const resourceList = [
        {
          key: '0',
          value: '0',
          title: '虚拟菜单',
          children: result.content,
        },
      ];
      this.setState({
        resourceList,
      });
    });
  }

  public compareToFirstPassword = (rule, value, callback) => {
    if (typeof value === 'string') {
      callback('只能输入数字!');
    } else {
      callback();
    }
  };

  public onChangeFile = ({ fileList }) => {
    this.setState({
      fileList,
    });
  };

  public beforeUpload = () => {
    if (this.state.fileList.length >= 3) {
      message.error('最大允许上传3个附件！');
    }
    return false;
  };

  public render() {
    const { getFieldDecorator } = this.props;
    let { initialValues } = this.props;
    initialValues = initialValues ? initialValues : {};
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
          <Form.Item label="上级菜单">
            {getFieldDecorator('parentId', {
              initialValue: '0',
            })(
              <TreeSelect
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={this.state.resourceList}
                placeholder="请选择上级菜单"
                treeDefaultExpandAll
              />,
            )}
          </Form.Item>
          <Form.Item label="名称">
            {getFieldDecorator('menuName', {
              rules: [
                {
                  required: true,
                  message: '请输入资源名称',
                },
              ],
              initialValue: initialValues && initialValues.menuName,
            })(<Input />)}
          </Form.Item>
          {/* <Form.Item label="资源类型">
            {getFieldDecorator('type', {
              initialValue: initialValues && initialValues.type,
            })(
              <Radio.Group
                onChange={(e) =>
                  this.setState({
                    resourceType: e.target.value,
                  })
                }
              >
                <Radio value="1">菜单</Radio>
                <Radio value="0">按钮</Radio>
              </Radio.Group>,
            )}
          </Form.Item> */}
          {this.state.resourceType === 'menu' ? (
            <React.Fragment>
              <Form.Item label="链接">
                {getFieldDecorator('path', {
                  initialValue: initialValues && initialValues.path,
                  rules: [
                    {
                      required: true,
                      message: '请输入菜单对应的链接',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="排序号">
                {getFieldDecorator('orderNum', {
                  rules: [
                    {
                      // required: true,
                      // message: '请输入菜单的排序号',
                    },
                  ],
                  initialValue: initialValues && initialValues.orderNum,
                })(<InputNumber min={0} style={{ width: '100%' }} />)}
              </Form.Item>
              <Form.Item label="菜单图标">
                {getFieldDecorator('icon', {
                  rules: [
                    {
                      // required: true,
                      // message: '请输入菜单图标',
                    },
                  ],
                  initialValue: initialValues && initialValues.icon,
                })(<Input />)}
              </Form.Item>
              {/*
              <Form.Item label="上传模板">
                {getFieldDecorator('files', {
                  rules: [
                    {
                      required: true,
                      message: '请上传模板',
                    },
                  ],
                })(
                  <Upload
                    accept=".doc,.pdf"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    fileList={this.state.fileList}
                    onChange={this.onChangeFile}
                    beforeUpload={this.beforeUpload}
                  >
                    <Button>
                      <Icon type="upload" /> Upload
                    </Button>
                  </Upload>,
                )}
              </Form.Item> */}
            </React.Fragment>
          ) : (
            <Form.Item label="按钮id">
              {getFieldDecorator('buttonId', {
                rules: [
                  {
                    required: true,
                    message: '请输入按钮id',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          )}
        </Form>
      </div>
    );
  }
}

export default AddResourceForm;
