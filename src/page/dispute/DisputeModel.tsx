import * as React from 'react';
import { Modal, Button, Form } from 'antd';
import DisputeForm from './DisputeForm';

interface Props {
  visible: boolean;
  loading?: boolean;
  modelTitleType: string;
  onClose: () => void;
  onOk: () => void;
  editItem: any;
}
/**
 * 纠纷管理model
 */
class UserModel extends React.PureComponent {
  public render() {
    const {
      visible,
      loading,
      modelTitleType,
      onClose,
      onOk,
      form,
      editItem,
    } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        visible={visible}
        title={modelTitleType ? '修改纠纷模板' : '新建纠纷模板'}
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
        <DisputeForm
          getFieldDecorator={getFieldDecorator}
          initialValues={editItem}
        />
      </Modal>
    );
  }
}

export default Form.create({ name: 'addUser' })(UserModel);
