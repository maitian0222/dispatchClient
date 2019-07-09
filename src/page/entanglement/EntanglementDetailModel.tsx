import * as React from 'react';
import { Modal, Button, Form, message } from 'antd';
import http from '@sinoui/http';
import EntanglementForm from './EntanglementForm';

interface Props {
  visible: boolean; // modal的显示或隐藏
  id: string; // 纠纷id
  type: 'edit' | 'view'; // 修改或查看
  onClose: () => void;
}
/**
 * 纠纷管理model
 */
class EntanglementDetailModel extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      editItem: {},
    };
  }

  private getData = (id: string) => {
    // 根据纠纷id获取纠纷详情
    http
      .get(`/biz/dispute/${id}`)
      .then((result) => {
        this.setState({
          editItem: result,
        });
      })
      .catch((e) => {
        message.error(e.response.data.message);
      });
  };

  public componentDidMount() {
    this.getData(this.props.id);
  }
  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.id && nextProps.id !== this.props.id) {
      this.getData(nextProps.id);
    }
  }

  // 修改纠纷数据
  public onOk = () => {
    return this.props.form.validateFields((err, values) => {
      // 检验失败return
      if (err) {
        return;
      }
      this.setState({
        loading: true,
      });

      // 身份证正面
      values.idFront = values.idFront.map((item) => {
        if (item.response) {
          return item.response.content[0];
        } else {
          return item;
        }
      });
      // 证据
      values.evidence = values.evidence.map((item) => {
        if (item.response) {
          return item.response.content[0];
        } else {
          return item;
        }
      });

      // 身份证反面
      values.idReverse = values.idReverse.map((item) => {
        if (item.response) {
          return item.response.content[0];
        } else {
          return item;
        }
      });
      if (values.respondentType === 1) {
        // 营业执照
        values.businessLicense = values.businessLicense.map((item) => {
          if (item.response) {
            return item.response.content[0];
          } else {
            return item;
          }
        });
      } else {
        values.businessLicense = [];
      }

      // this.props.id
      http
        .put(`/biz/dispute/${this.props.id}`, {
          ...values,
          id: this.props.id,
        })
        .then((result) => {
          message.success('修改纠纷数据成功！');
          this.setState({
            loading: false,
          });
          this.props.onClose();
        });
    });
  };
  public render() {
    const { visible, type, onClose, form } = this.props;
    const { getFieldDecorator } = form;
    const { loading, editItem } = this.state;
    return (
      <Modal
        visible={visible}
        title="纠纷详情"
        maskClosable={false}
        width={1000}
        keyboard={false}
        destoryOnClose={true}
        bodyStyle={
          type === 'view'
            ? {
                pointerEvents: 'none',
              }
            : {}
        }
        onCancel={() => {
          onClose();
          this.setState({
            loading: false,
          });
        }}
        footer={
          type === 'edit'
            ? [
                <Button
                  key="back"
                  onClick={() => {
                    onClose();
                    this.setState({
                      loading: false,
                    });
                  }}
                >
                  取消
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  loading={loading}
                  onClick={this.onOk}
                >
                  确定
                </Button>,
              ]
            : false
        }
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

export default Form.create({})(EntanglementDetailModel);
