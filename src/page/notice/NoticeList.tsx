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
import Notice from './types/Notice';
import ResponseResult from '../../types/ResponseResult';

/**
 * 消息管理列表
 */
function NoticeList() {
  const [visible, setVisible] = useState(false);
  const [editItem, setEditItem] = useState<Partial<User>>({});
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

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

  /**
   * 打开Modal
   */
  const openModel = (item?: User, type?: string) => {
    setVisible(true);
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
    setVisible(false);
  };

  /**
   * 数据管理api
   */
  const dataSource = useRestPageAPi<Notice>('/biz/information', [], {
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
          { fieldName: '消息内容', placeholder: '请输入', name: 'content' },
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
            title: '消息状态',
            dataIndex: 'isRead',
            key: 'isRead',
            align: 'center',
            render: (value: number) => {
              return (
                <Badge
                  status={value === 0 ? 'error' : 'default'}
                  text={value === 0 ? '未读' : '已读'}
                />
              );
            },
          },
          {
            title: '消息标题',
            dataIndex: 'title',
            key: 'title',
            align: 'center',
          },
          {
            title: '消息内容',
            dataIndex: 'content',
            key: 'content',
            align: 'center',
          },

          {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            align: 'center',
            sorter: true,
          },
        ]}
        dataSource={dataSource}
      />

      {/* <UserModel
        visible={visible}
        modelTitleType={modelTitleType}
        onClose={onClose}
        onOk={onOk}
        loading={loading}
        editItem={editItem}
        wrappedComponentRef={userFormRef}
      /> */}
    </React.Fragment>
  );
}

export default withErrorCatch({ errorTitle: '很抱歉，数据加载失败...' })(
  NoticeList,
);
