import * as React from 'react';
import { Modal, Button, Form } from 'antd';
import AddResourceForm from './AddResourceForm';
import { FromTo } from 'moment';

interface Props {
  loading: boolean;
  visible: boolean;
  onClose: () => void;
  onOk: () => void;
  // tslint:disable-next-line:no-any
  wrappedComponentRef: (formRef: Form) => Form;
  formOprType: string;
  // tslint:disable-next-line:no-any
  editItem: any;
  form: FromTo;
}

class AddResourceModal extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { visible, onClose, form, formOprType, onOk, loading } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title={formOprType === 'edit' ? '修改资源' : '新增资源'}
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
        <AddResourceForm
          getFieldDecorator={getFieldDecorator}
          initialValues={this.props.editItem}
          form={form}
        />
      </Modal>
    );
  }
}

export default Form.create({ name: 'addResource' })(AddResourceModal);
