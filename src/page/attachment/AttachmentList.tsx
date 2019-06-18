import React, { useState } from 'react';
import { Divider, Badge, Row, Col, Button, Icon } from 'antd';
import SearchForm from '@commons/SearchForm';
import useRestPageAPi from '@sinoui/use-rest-page-api';
import AddAttachmentModal from './AddAttachmentModal';
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
          { fieldName: '附件类别', placeholder: '请输入', name: 'type' },
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
            title: '分类名称',
            dataIndex: 'name',
            align: 'center',
          },
          {
            title: '所属法院',
            dataIndex: 'status',
            align: 'center',
          },
          {
            title: '主题类型',
            dataIndex: 'themeType',
            align: 'center',
          },
          {
            title: '上传限制',
            dataIndex: 'uploadLimit',
            align: 'center',
          },
          {
            title: '文件类型',
            dataIndex: 'fileType',
            align: 'center',
          },
          {
            title: '描述 ',
            dataIndex: 'description',
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
                  onClick={() => dataSource.remove(`${record.id}`)}
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
      <AddAttachmentModal
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
