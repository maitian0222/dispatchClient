import React, { useState } from 'react';
import { Divider, Badge, Row, Col, Button, Icon } from 'antd';
import SearchForm from '@commons/SearchForm';
import useRestPageAPi from '@sinoui/use-rest-page-api';
import AddDictionaryModal from './AddDictionaryModal';
import Resource from './types/Resource';
import DataTable from '@commons/DataTable';

function DictionaryManagement() {
  let formRef = null;
  const [visible, setVisible] = useState(false);
  const [formOprType, setFormOprType] = useState('add');
  const [editItem, setEditItem] = useState({});
  const [selectedRowIds, setSelectedRowIds] = useState([]);
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
          ? dataSource
              .update({
                dictId: editItem.dictId,
                ...values,
              })
              .then(() => dataSource.reload())
          : dataSource.save(values).then(() => dataSource.reload());
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
  const dataSource = useRestPageAPi<Resource>('/upms/dict', [], {
    keyName: 'dictId',
    //syncToUrl: true,
  });
  const rowSelection = {
    selectedRowKeys: selectedRowIds,
    onChange: (selectedRowKeys, selectedRows) => {
      selectedRowIds = setSelectedRowIds(selectedRowKeys);
    },
  };
  const hasSelected = selectedRowIds.length > 0;
  const batchDeletion = () => {
    dataSource.remove(selectedRowIds).then(() => {
      dataSource.reload();
      selectedRowIds = setSelectedRowIds([]);
    });
  };

  return (
    <React.Fragment>
      <SearchForm
        condition={[
          { fieldName: '字典名称', placeholder: '请输入', name: 'name' },
        ]}
        handleSearch={handleSearch}
      />
      <Row style={{ padding: '0 24px 10px' }}>
        <Col span={24}>
          <Button type="primary" onClick={() => showModal()}>
            <Icon type="plus" />
            新建
          </Button>
          <Button
            type="primary"
            disabled={!hasSelected}
            style={{ marginLeft: 20 }}
            onClick={() => batchDeletion()}
          >
            批量删除
          </Button>
        </Col>
      </Row>
      <DataTable
        rowSelection={rowSelection}
        rowKey={(record) => record.dictId}
        columns={[
          {
            title: '编号',
            dataIndex: 'index',
            align: 'center',
            render: (value: string, item: any, index: number) => {
              return index + 1;
            },
          },
          {
            title: '字典标识',
            dataIndex: 'fieldCode',
            align: 'center',
          },
          {
            title: '类型',
            dataIndex: 'keyy',
            align: 'center',
            sorter: true,
          },
          {
            title: '值',
            dataIndex: 'valuee',
            align: 'center',
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (text, record) => (
              <span>
                <a
                  href="javascript:;"
                  onClick={() => {
                    dataSource
                      .remove(`${record.dictId}`)
                      .then(() => dataSource.reload());
                  }}
                >
                  删除
                </a>

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
      <AddDictionaryModal
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
export default DictionaryManagement;
