import * as React from 'react';
import { Modal, Button, Form } from 'antd';
import UserForm from './UserForm';
import User from './types/User';
interface Props {
  visible: boolean;
  modelTitleType: string;
  onClose: () => void;
  editItem: User;
  loading: boolean;
  onOk: () => void;
  form: Form;
}
class UserModel extends React.PureComponent<Props, {}> {
  public render() {
    const {
      visible,
      loading,
      modelTitleType,
      onClose,
      onOk,
      form,
    } = this.props;

    return (
      <Modal
        visible={visible}
        title={modelTitleType ? '修改用户' : '添加用户'}
        maskClosable={false}
        width={800}
        keyboard={false}
        destroyOnClose
        onCancel={onClose}
        footer={[
          <Button key="back" onClick={onClose}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={onOk}>
            确定
          </Button>,
        ]}
      >
        <UserForm
          initialValues={this.props.editItem}
          form={form}
          modelTitleType={modelTitleType}
        />
      </Modal>
    );
  }
}

export default Form.create({ name: 'addUser' })(UserModel);
