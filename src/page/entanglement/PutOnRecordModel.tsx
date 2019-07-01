import * as React from 'react';
import { Modal, Button, Form } from 'antd';

interface Props {
  visible: boolean;
  loading?: boolean;
  onClose: () => void;
  onOk: () => void;
}
/**
 * 立案model
 */
class PutOnRecordModel extends React.PureComponent {
  public render() {
    const { visible, loading, onClose, onOk } = this.props;

    return (
      <Modal
        visible={visible}
        title="立案"
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
        <div />
      </Modal>
    );
  }
}

export default PutOnRecordModel;
