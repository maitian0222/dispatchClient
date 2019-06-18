import * as React from 'react';

import { Modal, Button } from 'antd';
import http from '@commons/http';
import Tree from './Tree';
import TreeLoadData from './TreeLoadData';
import TreeSearch from './TreeSearch';
interface State {
  loading: boolean;
  visible: boolean;
}
export default class TestModal extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
    };
  }

  public showModal = () => {
    http.get('/upms/user/?page=0&size=15');
    http.get('/oa/info/notice?page=0&size=15');
    this.setState({
      visible: true,
    });
  };

  public handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  };

  public handleCancel = () => {
    this.setState({ visible: false });
  };

  private uploadWord = () => {
    return http.get('/dispute/test/promise1');
  };

  private uploadPdf = () => {
    return http.get('/dispute/test/promise2');
  };

  public saveFileToEcm = () => {
    return Promise.all([this.uploadWord(), this.uploadPdf()]).then((result) => {
      // result 为数组，result的每一项为每一个异步的返回结果

      // 最后 把上传word成功后的报文return
      return result[0];
    });
  };

  // 刊物编审的saveWord
  public test = () => {
    this.saveFileToEcm().then((result) => console.log(result));
  };

  public render() {
    const { visible, loading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          open Modal
        </Button>
        <Button type="primary" onClick={this.test}>
          测试Promise.all
        </Button>
        <Modal
          visible={visible}
          title="新建菜单"
          maskClosable={false}
          width={800}
          keyboard={false}
          destroyOnClose
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
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
          {/* <Tree /> */}
          <TreeLoadData />
          {/* <TreeSearch /> */}
        </Modal>
      </div>
    );
  }
}
