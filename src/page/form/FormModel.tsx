import * as React from 'react';
import { Modal, Button, Form } from 'antd';
import FormForm from './FormForm';

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
class UserModel extends React.Component<Props, State> {
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
  };

  public render() {
    const { loading } = this.state;
    const { visible, modelTitleType, onClose, form, onOk } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        visible={visible}
        title={modelTitleType ? '表单项修改' : '表单项添加'}
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
        <FormForm
          getFieldDecorator={getFieldDecorator}
          initialValues={this.props.editItem}
        />
      </Modal>
    );
  }
}

export default Form.create({})(UserModel);
