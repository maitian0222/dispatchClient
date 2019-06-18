import * as React from 'react';
import { Modal, Button, Form } from 'antd';
import AddAttachmentForm from './AddAttachmentForm';

interface Props {
  visible: boolean;
  onClose: () => void;
  onOk: () => void;
  // tslint:disable-next-line:no-any
  wrappedComponentRef: (formRef: any) => any;
  formOprType: string;
  // tslint:disable-next-line:no-any
  editItem: any;
}
interface State {
  loading: boolean;
}
class AddAttachmentModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  // tslint:disable-next-line:no-any
  public handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
    this.props.onOk();
  };

  public render() {
    const { loading } = this.state;
    const { visible, onClose, form, formOprType } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title={formOprType === 'edit' ? '修改信息' : ' 附件类别添加'}
        maskClosable={false}
        width={800}
        keyboard={false}
        destroyOnClose
        onOk={this.handleOk}
        onCancel={onClose}
        footer={[
          <Button key="back" onClick={onClose}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={this.handleOk}
          >
            确定
          </Button>,
        ]}
      >
        <AddAttachmentForm
          getFieldDecorator={getFieldDecorator}
          initialValues={this.props.editItem}
        />
      </Modal>
    );
  }
}

export default Form.create({ name: 'addResource' })(AddAttachmentModal);
