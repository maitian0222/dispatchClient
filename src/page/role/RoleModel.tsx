import * as React from 'react';
import { Modal, Button, Form } from 'antd';
import RoleForm from './RoleForm';

interface Props {
  visible: boolean;
  modelTitleType: string;
  onClose: () => void;
  editItem: any;
  onOk: () => void;
}
interface State {
  loading: boolean;
}
class RoleModel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  public render() {
    const { loading } = this.state;
    const { visible, modelTitleType, onClose, form, onOk } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        visible={visible}
        title={modelTitleType ? '修改角色' : '添加角色'}
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
        <RoleForm
          getFieldDecorator={getFieldDecorator}
          initialValues={this.props.editItem}
        />
      </Modal>
    );
  }
}

export default Form.create({ name: 'addRole' })(RoleModel);
