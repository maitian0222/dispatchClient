import * as React from 'react';
import { Modal, Button } from 'antd';
import ContactList from './ContactList';

interface Props {
  visible: boolean;
  loading?: boolean;
  onClose: () => void;
  onOk: () => void;
}
/**
 * 联系人model
 */
class ContactsModel extends React.PureComponent {
  public render() {
    const { visible, loading, onClose, onOk, onSelectContact } = this.props;

    return (
      <Modal
        visible={visible}
        title="选择联系人"
        maskClosable={false}
        width={1000}
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
        <ContactList onSelectContact={onSelectContact} />
      </Modal>
    );
  }
}

export default ContactsModel;
