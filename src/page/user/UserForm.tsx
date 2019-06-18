import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Radio, Select } from 'antd';
import http from '@sinoui/http';

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
    this.state = { confirmDirty: false, roleList: [] };
  }

  public componentDidMount() {
    http
      .get(' /upms/role', { params: { page: 0, size: 10000 } })
      .then((result) => {
        this.setState({
          roleList: result.content,
        });
      });
  }

  public compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  };

  public validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['rePassword'], { force: true });
    }
    callback();
  };

  public handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  // 判断用户名是否重名
  public checkUserName = (rule, value, callback) => {
    callback();
    if (value && !this.props.initialValues.username) {
      http.get(`/upms/user/check/${value}`).then((result) => {
        if (!result) {
          callback('该用户名已被使用！');
        }
      });
    } else {
      callback();
    }
  };

  public render() {
    const { getFieldDecorator, modelTitleType } = this.props;
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
          <Form.Item label="用户名">
            {getFieldDecorator('username', {
              validateTrigger: 'onBlur',
              rules: [
                {
                  required: true,
                  message: '请输入用户名',
                },
                {
                  validator: this.checkUserName,
                },
              ],
              initialValue: initialValues && initialValues.username,
            })(<Input disabled={initialValues && initialValues.username} />)}
          </Form.Item>
          <Form.Item label="真实姓名">
            {getFieldDecorator('truename', {
              rules: [
                {
                  required: true,
                  message: '请输入真实姓名',
                },
              ],
              initialValue: initialValues && initialValues.truename,
            })(<Input />)}
          </Form.Item>
          <Form.Item label="角色">
            {getFieldDecorator('roleIds', {
              initialValue: initialValues && initialValues.roleIds,
              rules: [
                //   {
                //     required: true,
                //     message: '必须选择角色!',
                //   },
              ],
            })(
              <Select mode="multiple" style={{ width: '100%' }}>
                {this.state.roleList.map((item) => (
                  <Select.Option key={item.roleId} value={item.roleId}>
                    {item.roleName}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="性别">
            {getFieldDecorator('sex', {
              rules: [
                {
                  required: true,
                  message: '请选择用户性别',
                },
              ],
              initialValue: initialValues.sex ? initialValues.sex : '0',
            })(
              <Radio.Group
                onChange={(e) =>
                  this.setState({
                    resourceType: e.target.value,
                  })
                }
              >
                <Radio value="0">男</Radio>
                <Radio value="1">女</Radio>
                <Radio value="2">保密</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item label="状态">
            {getFieldDecorator('status', {
              rules: [
                {
                  required: true,
                  message: '请选择用户状态',
                },
              ],
              initialValue: initialValues.status ? initialValues.status : '1',
            })(
              <Radio.Group
                onChange={(e) =>
                  this.setState({
                    resourceType: e.target.value,
                  })
                }
              >
                <Radio value="0">锁定</Radio>
                <Radio value="1">有效</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          {modelTitleType !== 'edit' && (
            <React.Fragment>
              <Form.Item label="密码">
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '请输入密码',
                    },
                    // {
                    //   min: 6,
                    //   message: '密码最少6位',
                    // },
                    // {
                    //   max: 16,
                    //   message: '密码最长16位',
                    // },

                    {
                      validator: this.validateToNextPassword,
                    },
                  ],
                  initialValue: initialValues && initialValues.password,
                })(<Input.Password />)}
              </Form.Item>
              <Form.Item label="确认密码">
                {getFieldDecorator('rePassword', {
                  rules: [
                    {
                      required: true,
                      message: '请确认密码',
                    },

                    {
                      validator: this.compareToFirstPassword,
                    },
                  ],
                  initialValue: initialValues && initialValues.password,
                })(<Input.Password onBlur={this.handleConfirmBlur} />)}
              </Form.Item>
            </React.Fragment>
          )}

          <Form.Item label="电话号码">
            {getFieldDecorator('mobile', {
              rules: [
                {
                  pattern: /^1[3456789]\d{9}$/,
                  message: '请输入正确的电话号码',
                },
              ],
              initialValue: initialValues && initialValues.mobile,
            })(<Input />)}
          </Form.Item>
          <Form.Item label="邮箱地址">
            {getFieldDecorator('email', {
              rules: [
                {
                  pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                  message: '请输入正确的邮箱地址',
                },
              ],
              initialValue: initialValues && initialValues.email,
            })(<Input />)}
          </Form.Item>
          <Form.Item label="描述">
            {getFieldDecorator('description', {
              rules: [
                {
                  message: 'description',
                },
              ],
              initialValue: initialValues && initialValues.description,
            })(<Input.TextArea />)}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default UserForm;
