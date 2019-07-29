import * as React from 'react';
import { Modal, Button } from 'antd';
import PutOnRecord from './PutOnRecord';

interface Props {
  visible: boolean;
  loading?: boolean;
  onClose: () => void;
  onOk: () => void;
}
/**
 * 批量立案model
 */
class PutOnRecordModel extends React.PureComponent {
  public render() {
    const {
      visible,
      loading,
      onClose,
      onOk,
      selectedRows,
      onSelectContact,
    } = this.props;

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
        <PutOnRecord
          dataSource={selectedRows}
          onSelectContact={onSelectContact}
        />
      </Modal>
    );
  }
}

export default PutOnRecordModel;
