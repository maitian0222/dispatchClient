import * as React from 'react';
import { Modal, Button, Form } from 'antd';
import MaterialReview from './MaterialReview';
import RefuseForm from './RefuseForm';

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
class MaterialModal extends React.Component<Props, State> {
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
        bodyStyle={formOprType === 'accept' ? { background: '#f0f2f5' } : {}}
        visible={visible}
        title={formOprType === 'refuse' ? '信息填写' : '材料审核'}
        maskClosable={false}
        width={formOprType === 'refuse' ? 650 : 1200}
        keyboard={false}
        destroyOnClose
        onOk={this.handleOk}
        onCancel={onClose}
        footer={
          formOprType === 'refuse'
            ? [
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
              ]
            : [
                <Button
                  key="submit"
                  type="primary"
                  loading={loading}
                  onClick={this.handleOk}
                >
                  通过并提交
                </Button>,
                <Button key="back" type="danger" onClick={onClose}>
                  回退
                </Button>,
                <Button key="back" onClick={onClose}>
                  取消
                </Button>,
              ]
        }
      >
        {formOprType === 'refuse' ? (
          <RefuseForm
            getFieldDecorator={getFieldDecorator}
            initialValues={formOprType === 'refuse' ? this.props.editItem : ''}
          />
        ) : (
          <MaterialReview />
        )}
      </Modal>
    );
  }
}

export default Form.create({ name: 'materialResource' })(MaterialModal);
