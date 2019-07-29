import * as React from 'react';
import { Modal, Button, Form } from 'antd';
import UserTree from './UserTree';

interface Props {
  visible: boolean;
  modelTitleType: string;
  onClose: () => void;
  editItem: any;
  RefUserTreeModel: (any) => void;
}
interface State {
  loading: boolean;
  visible: boolean;
}
class UserTreeModel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
    };
  }

  public render() {
    const { loading } = this.state;
    const { visible, onClose } = this.props;

    return (
      <Modal
        visible={visible}
        title="人员角色配置"
        maskClosable={false}
        width={800}
        keyboard={false}
        destroyOnClose
        onCancel={onClose}
        footer={[
          <Button key="back" onClick={onClose}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading}>
            确定
          </Button>,
        ]}
      >
        <UserTree />
      </Modal>
    );
  }
}

export default UserTreeModel;
