import * as React from 'react';
import { Modal, Button, Form } from 'antd';
import RefuseForm from './RefuseForm';

interface Props {
  visible: boolean;
  onClose: () => void;
  onOk: () => void;
  loading: boolean;
  // tslint:disable-next-line:no-any
  wrappedComponentRef: (formRef: any) => any;
  formOprType: string;
  // tslint:disable-next-line:no-any
  editItem: any;
  form: Form;
}
interface State {
  loading: boolean;
}
class MaterialModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  public render() {
    const { visible, onClose, form, loading, onOk } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="信息填写"
        maskClosable={false}
        width={650}
        keyboard={false}
        destroyOnClose
        onOk={onOk}
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
        <RefuseForm getFieldDecorator={getFieldDecorator} />
      </Modal>
    );
  }
}

export default Form.create({ name: 'materialResource' })(MaterialModal);
