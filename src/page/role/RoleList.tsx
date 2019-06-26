import React, { useState } from 'react';
import { Modal, Icon, Row, Col, Button, Divider } from 'antd';
import SearchForm from '@commons/SearchForm';
import RoleModel from './RoleModel';
import UserTreeModel from './UserTreeModel';
import useRestPageAPi from '@sinoui/use-rest-page-api';
import DataTable from '@commons/DataTable';
import Role from './types/Role';
import ResourcesTreeModel from './ResourcesTreeModel';

/**
 * 角色管理列表
 */
function RoleList() {
  let formRef = null;
  const [visible, setVisible] = useState(false);
  const [modelTitleType, setModelTitleType] = useState();
  const [editItem, setEditItem] = useState({});
  const [userTreeModelVisible, setUserTreeModelVisible] = useState(false);
  const [resourcesTreeModelVisible, setresourcesTreeModelVisible] = useState(
    false,
  );
  const [loading, setLoading] = useState(false);

  const roleFormRef = (ref: any) => {
    formRef = ref;
  };
  /**
   * 打开用户Model
   */
  const openModel = (item: any, type?: string) => {
    setVisible(true);
    setModelTitleType(type);
    setEditItem(type ? item : {});
  };

  /**
   * 关闭用户Model
   */
  const onClose = () => {
    setVisible(false);
  };

  /**
   * 打开用户树Model
   */
  const openUserTreeModel = () => {
    setUserTreeModelVisible(true);
  };

  /**
   * 关闭用户树Model
   */
  const onCloseUserTreeModel = () => {
    setUserTreeModelVisible(false);
  };

  /**
   * 打开权限树Model
   */
  const openResourcesTreeModel = (item: Role) => {
    setresourcesTreeModelVisible(true);
    setEditItem(item);
  };

  /**
   * 关闭权限树Model
   */
  const onCloseResourcesTreeModel = () => {
    setresourcesTreeModelVisible(false);
  };

  /**
   * 数据管理api
   */
  const dataSource = useRestPageAPi<Role>('/admin/role', [], {
    keyName: 'roleId',
  });

  /**
   * 角色新增或修改
   */
  const onOk = () => {
    const form = formRef.props.form;

    return form.validateFields((err, values) => {
      // 检验失败return
      if (err) {
        return;
      }

      if (values.menuId) {
        values.menuId = values.menuId.join(',');
      }

      setLoading(true);
      const oprText = modelTitleType === 'edit' ? '修改' : '添加';
      const fn =
        modelTitleType === 'edit'
          ? dataSource.update(
              {
                roleId: editItem.roleId,
                ...values,
              },
              false,
            )
          : dataSource.save(values, false);

      fn.then((result) => {
        // 清空表单数据
        form.resetFields();
        setLoading(false);
        setVisible(false);
        dataSource.reload();
        Modal.success({
          title: '提示',
          content: `${oprText}角色成功!`,
          okText: '确定',
        });
      }).catch(() => {
        setLoading(false);
        Modal.error({
          title: '提示',
          content: `${oprText}角色失败!`,
          okText: '确定',
        });
      });
    });
  };

  /**
   * 查询
   * @param condition 获取表单数据项
   */
  // tslint:disable-next-line:no-any
  const handleSearch = (condition: any) => {
    dataSource.query({
      // ...dataSource.searchParams,
      ...condition,
    });
  };

  const onDelete = (item: Resource) => {
    Modal.confirm({
      title: '提示',
      content: '确认删除？',
      onOk: () => {
        dataSource.remove(`${item.roleId}`, false).then(() => {
          dataSource.reload();
        });
      },
    });
  };

  return (
    <div style={{ background: '#ffffff' }}>
      <SearchForm
        condition={[
          { fieldName: '角色名称', placeholder: '请输入', name: 'roleName' },
        ]}
        handleSearch={handleSearch}
      />
      <Row style={{ padding: '0 24px 10px' }}>
        <Col span={24}>
          <Button type="primary" onClick={openModel}>
            <Icon type="plus" />
            新建
          </Button>
        </Col>
      </Row>
      <DataTable
        columns={[
          {
            title: '编号',
            key: 'index',
            align: 'center',
            render: (value, item, index) => {
              return index + 1;
            },
          },
          {
            title: '角色名称',
            dataIndex: 'roleName',
            key: 'roleName',
            align: 'center',
          },
          {
            title: '描述',
            dataIndex: 'remark',
            key: 'remark',
            align: 'center',
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
                    onClick={() => openModel(item, 'edit')}
                  >
                    编辑
                  </a>
                  {/* <Divider type="vertical" />
                  <a
                    id="edit"
                    href="javascript:;"
                    onClick={() => openUserTreeModel()}
                  >
                    人员配置
                  </a>
                  <Divider type="vertical" />
                  <a
                    id="edit"
                    href="javascript:;"
                    onClick={() => openResourcesTreeModel(item)}
                  >
                    权限配置
                  </a> */}
                </div>
              );
            },
          },
        ]}
        dataSource={dataSource}
      />
      <RoleModel
        visible={visible}
        modelTitleType={modelTitleType}
        onClose={onClose}
        editItem={editItem}
        loading={loading}
        onOk={onOk}
        wrappedComponentRef={roleFormRef}
      />
      <UserTreeModel
        visible={userTreeModelVisible}
        onClose={onCloseUserTreeModel}
      />
      <ResourcesTreeModel
        visible={resourcesTreeModelVisible}
        onClose={onCloseResourcesTreeModel}
        editItem={editItem}
      />
    </div>
  );
}

export default RoleList;
