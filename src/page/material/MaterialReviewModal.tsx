import * as React from 'react';
import { Modal, Button, Form } from 'antd';
import LawsuitCaseEditor from './LawsuitCaseEditor';
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
class MaterialReviewModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  public render() {
    const {
      visible,
      onClose,
      form,
      formOprType,
      loading,
      onOk,
      goBack,
    } = this.props;
    return (
      <Modal
        bodyStyle={{ background: '#f0f2f5' }}
        visible={visible}
        title="材料审核"
        maskClosable={false}
        width={1200}
        keyboard={false}
        destroyOnClose
        onOk={onOk}
        onCancel={onClose}
        footer={
          formOprType === 'accept'
            ? [
                <Button
                  key="submit"
                  type="primary"
                  loading={loading}
                  onClick={onOk}
                >
                  通过并提交
                </Button>,
                <Button key="back" type="danger" onClick={goBack}>
                  回退
                </Button>,
                <Button key="back" onClick={onClose}>
                  取消
                </Button>,
              ]
            : formOprType === 'view'
            ? [
                <Button key="back" onClick={onClose}>
                  取消
                </Button>,
              ]
            : []
        }
      >
        <LawsuitCaseEditor editItme={this.props.editItem} />
      </Modal>
    );
  }
}

export default Form.create({ name: 'materialReviewResource' })(
  MaterialReviewModal,
);
