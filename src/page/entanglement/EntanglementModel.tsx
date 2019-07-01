import * as React from 'react';
import { Modal, Button, Form } from 'antd';
import EntanglementForm from './EntanglementForm';

interface Props {
  visible: boolean;
  loading?: boolean;
  modelTitleType: string;
  onClose: () => void;
  onOk: () => void;
  editItem: any;
}
/**
 * 纠纷管理model
 */
class EntanglementModel extends React.PureComponent {
  public render() {
    const {
      visible,
      loading,
      modelTitleType,
      onClose,
      onOk,
      form,
      editItem,
      saveSubmit,
    } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        visible={visible}
        title={modelTitleType ? '修改纠纷信息' : '新建纠纷信息'}
        maskClosable={false}
        width={1000}
        keyboard={false}
        destoryOnClose={true}
        onCancel={onClose}
        footer={[
          <Button key="back" onClick={onClose}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={saveSubmit}
          >
            提交
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={onOk}>
            确定
          </Button>,
        ]}
      >
        <EntanglementForm
          getFieldDecorator={getFieldDecorator}
          initialValues={editItem}
          form={form}
        />
      </Modal>
    );
  }
}

export default Form.create({})(EntanglementModel);
