import React, { useState, useEffect } from 'react';
import { Modal, Icon, Row, Col, Button, Divider, Badge, message } from 'antd';
import SearchForm from '@commons/SearchForm';
import UserModel from './UserModel';
import useRestPageAPi from '@sinoui/use-rest-page-api';
import http from '@sinoui/http';
import DataTable from '@commons/DataTable';
import User from './types/User';

/**
 * 用户管理列表
 */
function UserList() {
  let formRef = null;
  const [visible, setVisible] = useState(false);
  const [modelTitleType, setModelTitleType] = useState('add');
  const [editItem, setEditItem] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // http.get('/oa/info/notice?page=0&size=15');
  }, []);
  const userFormRef = (ref: any) => {
    formRef = ref;
  };
  /**
   * 打开用户Model
   * @param item 数据对象
   * @param type 判断是新建还是修改
   */
  const openModel = (item: any, type?: string) => {
    dataSource.fetch();
    setVisible(true);
    setModelTitleType(type);
    setEditItem({});
    if (type === 'edit' && item) {
      http.get(`/upms/user/${item.username}`).then((result) => {
        setEditItem(result);
      });
    }
  };

  /**
   * 关闭用户Model
   */
  const onClose = () => {
    setVisible(false);
  };

  const onOk = () => {
    const form = formRef.props.form;

    return form.validateFields((err, values) => {
      // 检验失败return

      if (err) {
        return;
      }

      setLoading(true);
      const oprText = modelTitleType === 'edit' ? '修改' : '添加';
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

      fn.then((result) => {
        // 清空表单数据
        form.resetFields();
        setLoading(false);
        setVisible(false);
        dataSource.reload();
        message.success(`${oprText}用户成功!`);
      }).catch(() => {
        message.error(`${oprText}用户失败!`);
        setLoading(false);
      });
    });
  };

  const onDelete = (item: User) => {
    Modal.confirm({
      title: '提示',
      content: '确认删除？',
      onOk: () => {
        dataSource.remove(`${item.userId}`, false);
        dataSource.reload();
      },
    });
  };

  /**
   * 数据管理api
   */
  const dataSource = useRestPageAPi<User>('/upms/user', [], {
    keyName: 'userId',
  });

  /**
   * 查询
   * @param condition 获取表单数据项
   */
  // tslint:disable-next-line:no-any
  const handleSearch = (condition: any) => {
    dataSource.query({
      ...dataSource.searchParams,
      ...condition,
    });
  };

  return (
    <React.Fragment>
      <SearchForm
        condition={[
          { fieldName: '用户名', placeholder: '请输入', name: 'username' },
        ]}
        handleSearch={handleSearch}
      />

      <Row
        type="flex"
        justify="end"
        style={{ padding: '20px 0', borderTop: '20px solid #f5f5f5' }}
      >
        <Col span={24} style={{ textAlign: 'right', padding: '0 10px' }}>
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
            render: (value: string, item: User, index: number) => {
              return index + 1;
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
            render: (value) => {
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

export default UserList;
