import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Modal, Button, message } from 'antd';
import http from '@sinoui/http';
import ResponseResult from '../../types/ResponseResult';
interface Props {
  form: FormComponentProps;
  // tslint:disable-next-line:no-any
  getFieldDecorator: any;
}

class ChangePwdModal extends React.Component<Props, State> {
  private props: any;
  private state: any;
  constructor(props: Props) {
    super(props);
    this.state = { confirmDirty: false };
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

  // 修改密码
  private onOk = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        http
          .put('/admin/user/password', {
            ...values,
            username: this.props.currentUser.username,
            userId: this.props.currentUser.userId,
          })
          .then((result: ResponseResult) => {
            if (result.code === 0) {
              message.success(result.msg);
              this.props.onClose();
            } else {
              message.success(result.msg);
            }
          })
          .catch((e) => {
            message.error(e.response.data.msg);
          });
      }
    });
  };
  public render() {
    const { visible, onClose } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Modal
        visible={visible}
        title={'修改密码'}
        maskClosable={false}
        width={800}
        keyboard={false}
        destroyOnClose
        onCancel={onClose}
        footer={[
          <Button key="back" onClick={onClose}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={this.state.loading}
            onClick={this.onOk}
          >
            确定
          </Button>,
        ]}
      >
        <div
          style={{
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Form {...formItemLayout} style={{ width: '600px' }}>
            <Form.Item label="旧密码">
              {getFieldDecorator('oldPassword', {
                rules: [
                  {
                    required: true,
                    message: '请输入旧密码',
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="新密码">
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码',
                  },
                  {
                    min: 6,
                    message: '密码最少6位',
                  },
                  {
                    max: 16,
                    message: '密码最长16位',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
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
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
          </Form>
        </div>
      </Modal>
    );
  }
}

const WrappedForm = Form.create({ name: 'pwd_change' })(ChangePwdModal);

export default WrappedForm;
