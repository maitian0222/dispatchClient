import * as React from 'react';
import { Modal, Button, Form } from 'antd';
import UserForm from './UserForm';

interface Props {
  visible: boolean;
  modelTitleType: string;
  onClose: () => void;
  editItem: any;
}
class UserModel extends React.PureComponent {
  public render() {
    const {
      visible,
      loading,
      modelTitleType,
      onClose,
      onOk,
      form,
    } = this.props;
    const { getFieldDecorator } = form;

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
          getFieldDecorator={getFieldDecorator}
          initialValues={this.props.editItem}
          form={form}
          modelTitleType={modelTitleType}
        />
      </Modal>
    );
  }
}

export default Form.create({ name: 'addUser' })(UserModel);
