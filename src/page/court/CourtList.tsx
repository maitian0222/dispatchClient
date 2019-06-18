import React, { useState } from 'react';
import { Divider, Badge, Row, Col, Button, Icon } from 'antd';
import SearchForm from '@commons/SearchForm';
import useRestPageAPi from '@sinoui/use-rest-page-api';
import AddCourtModal from './AddCourtModal';
import Resource from './types/Resource';
import transformListResponse from '../../utils/transformListResponse';
import DataTable from '@commons/DataTable';

function CourtManagement() {
  let formRef = null;
  const [visible, setVisible] = useState(false);
  const [formOprType, setFormOprType] = useState('add');
  const [editItem, setEditItem] = useState({});
  const saveFormRef = (ref: any) => {
    formRef = ref;
  };
  /**
   * 打开新建资源modal
   *
   */
  const showModal = (type?: string, item: any) => {
    setVisible(true);
    setFormOprType(type ? type : 'add');
    setEditItem(type === 'edit' ? item : {});
  };
  const onOk = () => {
    const form = formRef.props.form;
    form.validateFields((err, values) => {
      // 检验失败return
      if (err) {
        return;
      }
      const fn =
        formOprType === 'edit'
          ? dataSource.update({
              id: editItem.id,
              ...values,
            })
          : dataSource.save(values);
      console.log('Received values of form: ', values);
      fn.then(() => {
        // 清空表单数据
        form.resetFields();
        setVisible(false);
      });
    });
  };
  const handleSearch = (condition) => {
    dataSource.query({
      ...dataSource.searchParams,
      ...condition,
    });
  };
  const dataSource = useRestPageAPi<Resource>('/dispute/courtManagement', [], {
    keyName: 'id',
    syncToUrl: true,
    transformListResponse,
  });

  return (
    <React.Fragment>
      <SearchForm
        condition={[
          { fieldName: '法院名称', placeholder: '请输入', name: 'name' },
        ]}
        handleSearch={handleSearch}
      />
      <Row style={{ padding: '0 24px 10px' }}>
        <Col span={24}>
          <Button type="primary" onClick={() => showModal()}>
            <Icon type="plus" />
            新建
          </Button>
        </Col>
      </Row>
      <DataTable
        columns={[
          {
            title: '编号',
            dataIndex: 'id',
            align: 'center',
          },
          {
            title: '名称',
            dataIndex: 'name',
            align: 'center',
          },
          {
            title: '状态',
            dataIndex: 'status',
            align: 'center',
            render: (text, record) => {
              let status = 'success';
              let text = '启用';
              switch (record.status) {
                case '1':
                  status = 'success';
                  text = '启用';
                  break;
                case '2':
                  status = 'default';
                  text = '停用';
                  break;
                case '3':
                  status = 'processing';
                  text = '启用';
                  break;
                case '4':
                  status = 'warning';
                  text = '停用';
                  break;
                case '5':
                  status = 'error';
                  text = '停用';
                  break;
                default:
                  status = 'default';
                  text = '启用';
              }
              return <Badge status={status} text={text} />;
            },
          },
          {
            title: '描述',
            dataIndex: 'description',
            align: 'center',
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (text, record) => (
              <span>
                {record.status==="1"?(<a
                  href="javascript:;"
                  onClick={() =>
                    dataSource.setItem(`${record.id}`, { status: '2' })
                  }
                >
                  停用
                </a>):(<a
                  href="javascript:;"
                  onClick={() =>
                    dataSource.setItem(`${record.id}`, { status: '1' })
                  }
                >
                  启用
                </a>)}
                
                <Divider type="vertical" />

                <a
                  href="javascript:;"
                  onClick={() => showModal('edit', record)}
                >
                  编辑
                </a>
              </span>
            ),
          },
        ]}
        dataSource={dataSource}
      />
      <AddCourtModal
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
export default CourtManagement;
