import React, { useState, useEffect } from 'react';
import {
  Form,
  Modal,
  Icon,
  Row,
  Col,
  Button,
  Divider,
  Badge,
  message,
} from 'antd';
import SearchForm from '@commons/SearchForm';
import UserModel from './UserModel';
import useRestPageAPi from '@sinoui/use-rest-page-api';
import http from '@sinoui/http';
import DataTable from '@commons/DataTable';
import withErrorCatch from '@commons/with-error-catch';
import transformListRequest from '../../utils/transformListRequest';
import User from './types/User';
import ResponseResult from '../../types/ResponseResult';
/**
 * 用户管理列表
 */
function UserList() {
  let formRef: Form;
  const [visible, setVisible] = useState(false);
  const [modelTitleType, setModelTitleType] = useState('add');
  const [editItem, setEditItem] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  const userFormRef = (ref: Form) => {
    formRef = ref;
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

  // 新增和修改
  const onOk = () => {
    const form = formRef.props.form;

    return form!.validateFields((err, values) => {
      // 检验失败return

      if (err) {
        return;
      }

      setLoading(true);
      const fn =
        modelTitleType === 'edit'
          ? dataSource.update(
              {
                userId: editItem.userId,
                ...values,
              },
              false,
            )
          : dataSource.save(values, false);

      // tslint:disable-next-line:no-any
      fn.then((result: any) => {
        if (result.code === 0) {
          // 清空表单数据
          form!.resetFields();
          setLoading(false);
          setVisible(false);
          dataSource.reload();
        }
        message.success(result.msg);
      }).catch((e) => {
        message.error(e.response.data.msg);
        setLoading(false);
      });
    });
  };

  // 重置密码
  const resetPassword = (item: User) => {
    Modal.confirm({
      title: '提示',
      content: '确认要重置密码？',
      onOk: () => {
        http
          .put(`/admin/user/password/reset/${item.userId}`)
          .then((result: ResponseResult) => {
            message.success(result.msg);
          })
          .catch((e) => {
            message.error(e.response.data.msg);
          });
      },
    });
  };

  // 批量删除
  const batchDeletion = () => {
    Modal.confirm({
      title: '提示',
      content: '确认删除？',
      onOk: () => {
        dataSource
          .remove(selectedRowIds)
          .then((result: ResponseResult) => {
            if (result.code === 0) {
              dataSource.reload();
              setSelectedRowIds([]);
            }
            message.success(result.msg);
          })
          .catch((e) => {
            message.error(e.response.data.msg);
          });
      },
    });
  };

  // 单条删除
  const onDelete = (item: User) => {
    Modal.confirm({
      title: '提示',
      content: '确认删除？',
      onOk: () => {
        dataSource
          .remove(`${item.userId}`, false)
          .then((result: ResponseResult) => {
            if (result.code === 0) {
              dataSource.reload();
            }
            message.success(result.msg);
          })
          .catch((e) => {
            message.error(e.response.data.msg);
          });
      },
    });
  };

  /**
   * 打开用户Model
   * @param item 数据对象
   * @param type 判断是新建还是修改
   */
  const openModel = (item?: User, type?: string) => {
    setVisible(true);
    setModelTitleType(type || 'add');
    setEditItem({});
    if (type === 'edit' && item) {
      http.get(`/admin/user/${item.username}`).then((result: User) => {
        setEditItem(result);
      });
    }
  };

  /**
   * 关闭用户Model
   */
  const onClose = () => {
    setLoading(false);
    setVisible(false);
  };

  /**
   * 数据管理api
   */
  const dataSource = useRestPageAPi<User>('/admin/user', [], {
    keyName: 'userId',
    transformListRequest,
  });

  // 多选配置
  const rowSelection = {
    selectedRowKeys: selectedRowIds,
    onChange: (selectedRowKeys: string[]) => {
      setSelectedRowIds(selectedRowKeys);
    },
  };

  return (
    <React.Fragment>
      <SearchForm
        condition={[
          { fieldName: '用户名', placeholder: '请输入', name: 'username' },
        ]}
        handleSearch={handleSearch}
      />
      {/* style={{ padding: '20px 0', borderTop: '20px solid #f5f5f5' }} */}
      <Row>
        <Col span={24} style={{ padding: '0 10px' }}>
          <Button type="primary" onClick={() => openModel()}>
            <Icon type="plus" />
            新建
          </Button>
          <Button
            type="primary"
            disabled={selectedRowIds.length <= 0}
            style={{ marginLeft: 20 }}
            onClick={() => batchDeletion()}
          >
            批量删除
          </Button>
        </Col>
      </Row>

      <DataTable
        rowSelection={rowSelection}
        rowKey={(record: User) => record.userId}
        columns={[
          {
            title: '编号',
            key: 'index',
            align: 'center',
            render: (value: string, item: User, index: number) => {
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
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
          },
          {
            title: '真实姓名',
            dataIndex: 'truename',
            key: 'truename',
            align: 'center',
          },
          {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (value: string) => {
              return (
                <Badge
                  color={value === '1' ? 'green' : 'red'}
                  text={value === '1' ? '有效' : '锁定'}
                />
              );
            },
          },
          {
            title: '电话',
            dataIndex: 'mobile',
            key: 'mobile',
            align: 'center',
          },
          {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            align: 'center',
            sorter: true,
          },
          {
            title: '操作',
            dataIndex: 'opt',
            key: 'opt',
            align: 'center',
            render: (value: string, item: User, index: number) => {
              return (
                <div>
                  <a href="javascript:;" onClick={(e) => onDelete(item)}>
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
                  <Divider type="vertical" />
                  <a
                    id="edit"
                    href="javascript:;"
                    onClick={() => resetPassword(item)}
                  >
                    重置密码
                  </a>
                </div>
              );
            },
          },
        ]}
        dataSource={dataSource}
      />

      <UserModel
        visible={visible}
        modelTitleType={modelTitleType}
        onClose={onClose}
        onOk={onOk}
        loading={loading}
        editItem={editItem}
        wrappedComponentRef={userFormRef}
      />
    </React.Fragment>
  );
}

export default withErrorCatch({ errorTitle: '很抱歉，数据加载失败...' })(
  UserList,
);
