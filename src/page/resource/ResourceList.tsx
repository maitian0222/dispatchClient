import React, { useState } from 'react';
import { Modal, Icon, Row, Col, Button, Divider, message } from 'antd';
import SearchForm from '@commons/SearchForm';
import useRestListApi from '@sinoui/use-rest-list-api';
import AddResourceModal from './AddResourceModal';
import Resource from './types/Resource';
import DataTable from '@commons/DataTable';
import withErrorCatch from '@commons/with-error-catch';
import transformListRequest from '../../utils/transformListRequest';
function ResourceManagement() {
  let formRef = null;
  const [visible, setVisible] = useState(false);
  const [formOprType, setFormOprType] = useState('add');
  const [editItem, setEditItem] = useState({});
  const [loading, setLoading] = useState(false);
  const saveFormRef = (ref: any) => {
    formRef = ref;
  };
  const showModal = (type?: string, item?: any) => {
    setVisible(true);
    setFormOprType(type ? type : 'add');
    setEditItem(type === 'edit' ? item : {});
  };

  const handleSearch = (condition) => {
    dataSource.query({
      // ...dataSource.searchParams,
      ...condition,
    });
  };

  const onOk = () => {
    const form = formRef.props.form;
    form.validateFields((err, values) => {
      // 检验失败return

      if (err) {
        return;
      }
      setLoading(true);
      const oprText = formOprType === 'edit' ? '修改' : '添加';
      const fn =
        formOprType === 'edit'
          ? dataSource.update({
              menuId: editItem.menuId,
              type: '0', // 资源类型为菜单
              ...values,
            })
          : dataSource.save({
              ...values,
              type: '0',
            });
      fn.then((result) => {
        // 清空表单数据
        form.resetFields();
        setLoading(false);
        setVisible(false);
        dataSource.reload();
        message.success(`${oprText}资源成功!`);
      }).catch(() => {
        message.error(`${oprText}资源失败!`);
        setLoading(false);
      });
    });
  };

  const onDelete = (item: Resource) => {
    Modal.confirm({
      title: '提示',
      content: '确认删除？',
      onOk: () => {
        dataSource.remove(`${item.menuId}`, false).then(() => {
          dataSource.reload();
        });
      },
    });
  };
  const dataSource = useRestListApi<Resource>('/admin/menu', [], {
    keyName: 'menuId',
    transformListRequest,
  });

  return (
    <React.Fragment>
      <SearchForm
        condition={[
          { fieldName: '名称', placeholder: '请输入', name: 'menuName' },
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
            title: '名称',
            dataIndex: 'menuName',
            key: 'menuName',
            align: 'center',
          },
          {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            render: (value) => (value === '0' ? '菜单' : '按钮'),
          },
          {
            title: '链接',
            dataIndex: 'path',
            align: 'center',
            key: 'path',
          },
          {
            title: '操作',
            dataIndex: 'opt',
            key: 'opt',
            align: 'center',
            render: (value, item, index) => {
              return (
                <div>
                  <a href="javascript:;" onClick={(event) => onDelete(item)}>
                    删除
                  </a>
                  <Divider type="vertical" />
                  <a
                    id="edit"
                    href="javascript:;"
                    onClick={() => showModal('edit', item)}
                  >
                    编辑
                  </a>
                </div>
              );
            },
          },
        ]}
        dataSource={dataSource}
      />

      <AddResourceModal
        visible={visible}
        onOk={onOk}
        onClose={() => {
          setLoading(false);
          setVisible(false);
        }}
        formOprType={formOprType}
        editItem={editItem}
        wrappedComponentRef={saveFormRef}
        loading={loading}
      />
    </React.Fragment>
  );
}

export default withErrorCatch({ errorTitle: '很抱歉，数据加载失败...' })(
  ResourceManagement,
);
