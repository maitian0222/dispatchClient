import * as React from 'react';
import { Modal, Button, Form } from 'antd';
import ImportForm from './ImportForm';

interface Props {
  visible: boolean;
  loading?: boolean;
  modelTitleType: string;
  onClose: () => void;
  onOk: () => void;
  editItem: any;
}
/**
 * 导入model
 */
class ImportModel extends React.PureComponent {
  public render() {
    const { visible, loading, onClose, onOk, form, editItem } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        visible={visible}
        title="纠纷数据导入"
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
        <ImportForm
          getFieldDecorator={getFieldDecorator}
          initialValues={editItem}
        />
      </Modal>
    );
  }
}

export default Form.create({})(ImportModel);
