import React, { useState, useEffect } from 'react';
import { Divider, Badge, Row, Col, Button, Icon, Modal } from 'antd';
import SearchForm from '@commons/SearchForm';
import withErrorCatch from '@commons/with-error-catch';
import useRestPageAPi from '@sinoui/use-rest-page-api';
import http from '@sinoui/http';
import { Link } from 'react-router-dom';
import MaterialModal from './MaterialModal';
import Resource from './types/Resource';
import DataTable from '@commons/DataTable';
import EllipsisText from '../../component/EllipsisText';

function MaterialManagement() {
  let formRef = null;
  const [visible, setVisible] = useState(false);
  const [formOprType, setFormOprType] = useState('');
  const [editItem, setEditItem] = useState({});
  const [courtList, setCourtList] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  useEffect(() => {
    http.get('/biz/court/list', {}).then((result) => {
      if (result) {
        courtList = setCourtList(result.content);
      }
    });
  }, [courtList.length]);
  const saveFormRef = (ref: any) => {
    formRef = ref;
  };
  /**
   * 打开新建资源modal
   *
   */
  const showModal = (type?: string, item: any) => {
    setVisible(true);
    setFormOprType(type ? type : '');
    setEditItem({});
    if ((type === 'refuse' || type === 'accept') && item) {
      setEditItem(item);
    }
  };
  const onOk = () => {
    const form = formRef.props.form;
    form.validateFields((err, values) => {
      // 检验失败return
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);

      // const fn =
      //   formOprType === 'refuse'
      //     ? dataSource.update({
      //         id: editItem.id,
      //         ...values,
      //       })
      //     : dataSource.save(values);
      // fn.then(() => {
      //   // 清空表单数据
      //   form.resetFields();
      //   setVisible(false);
      //   dataSource.reload();
      // });
    });
  };
  const handleSearch = (condition) => {
    dataSource.query({
      ...condition,
    });
  };
  const dataSource = useRestPageAPi<Resource>('/biz/court', [], {
    keyName: 'id',
  });
  // 多选配置
  const rowSelection = {
    selectedRowKeys: selectedRowIds,
    onChange: (selectedRowKeys: string[]) => {
      setSelectedRowIds(selectedRowKeys);
    },
  };
  // 批量通过
  const batchPass = () => {
    Modal.confirm({
      title: '提示',
      content: '确认通过？',
      onOk: () => {
        // dataSource.remove(selectedRowIds).then(() => {
        //   dataSource.reload();
        //   setSelectedRowIds([]);
        // });
      },
    });
  };

  return (
    <React.Fragment>
      <SearchForm
        condition={[
          {
            fieldName: '放款主体',
            placeholder: '请输入',
            name: 'name',
          },
          {
            fieldName: '案件编号',
            placeholder: '请输入',
            name: 'number',
          },
          {
            fieldName: '状态',
            placeholder: '请选择',
            name: 'status',
            type: 'select',
            options: [
              { code: 1, name: '已受理' },
              { code: 2, name: '未受理' },
              { code: 3, name: '已提交立案' },
            ],
            valueName: 'code',
            textName: 'name',
          },
          {
            fieldName: '提交时间',
            placeholder: ['开始时间', '结束时间'],
            type: 'rangePicker',
          },
        ]}
        handleSearch={handleSearch}
      />
      <Row style={{ padding: '20px 0', borderTop: '20px solid #f5f5f5' }}>
        <Col span={24} style={{ padding: '0 10px' }}>
          <Button
            type="primary"
            disabled={selectedRowIds.length <= 0}
            style={{ marginLeft: 20 }}
            onClick={() => batchPass()}
          >
            批量通过
          </Button>
        </Col>
      </Row>
      <DataTable
        rowSelection={rowSelection}
        rowKey={(record) => record.id}
        columns={[
          {
            title: '编号',
            dataIndex: 'index',
            align: 'center',
            render: (value: string, item: any, index: number) => {
              if (dataSource && dataSource.pagination) {
                return (
                  dataSource.pagination.pageNo *
                    dataSource.pagination.pageSize +
                  index +
                  1
                );
              }
            },
          },
          {
            title: '案件编号',
            dataIndex: 'name',
            align: 'center',
          },
          {
            title: '标的金额',
            dataIndex: 'money',
            align: 'center',
          },
          {
            title: '被告',
            dataIndex: 'people',
            align: 'center',
          },
          {
            title: '提交时间',
            dataIndex: 'createTime',
            align: 'center',
          },
          {
            title: '状态',
            dataIndex: 'enable',
            align: 'center',
            render: (text, record) => {
              let status = 'success';
              let text = '已受理';
              switch (record.enable) {
                case 1:
                  status = 'success';
                  text = '已受理';
                  break;
                case 0:
                  status = 'default';
                  text = '未受理';
                  break;
                default:
                  status = 'success';
                  text = '已受理';
              }
              return <Badge status={status} text={text} />;
            },
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (text, record) => (
              <span>
                <a
                  href="javascript:;"
                  onClick={() => showModal('accept', record)}
                >
                  受理
                </a>
                <Divider type="vertical" />
                <a
                  href="javascript:;"
                  onClick={() => showModal('refuse', record)}
                >
                  拒绝
                </a>
              </span>
            ),
          },
        ]}
        dataSource={dataSource}
      />
      <MaterialModal
        visible={visible}
        onOk={onOk}
        onClose={() => setVisible(false)}
        formOprType={formOprType}
        editItem={editItem}
        wrappedComponentRef={saveFormRef}
      />
    </React.Fragment>
  );
}
export default withErrorCatch({ errorTitle: '很抱歉，数据加载失败...' })(
  MaterialManagement,
);
