import * as React from 'react';
import { Modal, Button, Form } from 'antd';
import ContactForm from './ContactForm';

interface Props {
  visible: boolean;
  loading?: boolean;
  modelTitleType: string;
  onClose: () => void;
  onOk: () => void;
  editItem: any;
}
/**
 * 联系人管理model
 */
class ContactModel extends React.PureComponent {
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
        title={modelTitleType ? '修改联系人' : '新建联系人'}
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
        <ContactForm
          getFieldDecorator={getFieldDecorator}
          initialValues={editItem}
        />
      </Modal>
    );
  }
}

export default Form.create({})(ContactModel);
