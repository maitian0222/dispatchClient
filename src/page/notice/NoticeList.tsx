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
import useRestPageAPi from '@sinoui/use-rest-page-api';
import http from '@sinoui/http';
import DataTable from '@commons/DataTable';
import withErrorCatch from '@commons/with-error-catch';
import transformListRequest from '../../utils/transformListRequest';
import Notice from './types/Notice';
import ResponseResult from '../../types/ResponseResult';
import { getInformation, getNewsQuery } from './apis';
import { PAGE_SIZE } from '../../config/AppConfig';
import { ActionCreators as messageActionCreators } from '@message/message';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/**
 * 消息管理列表
 */
function NoticeList(props) {
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
  const batchDelete = () => {
    http
      .delete(`/biz/information/${selectedRowIds.toString()}`)
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
  };

  // 批量阅毕未读消息
  const batchDeletion = () => {
    http
      .put('/biz/information', {
        ids: selectedRowIds.toString(),
      })
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
  };

  /**
   * 数据管理api
   */
  const dataSource = useRestPageAPi<Notice>('/biz/information', [], {
    transformListRequest,
    pageSize: PAGE_SIZE,
  });

  // 多选配置
  const rowSelection = {
    selectedRowKeys: selectedRowIds,
    onChange: (selectedRowKeys: string[]) => {
      setSelectedRowIds(selectedRowKeys);
    },
  };

  const openModel = (id: string) => {
    getInformation(id).then((result) => {
      Modal.info({
        title: '消息详情',
        content: (
          <div>
            <Row>
              <Col span={6}>
                <p>消息标题：</p>
              </Col>
              <Col span={18}>{result.data.title}</Col>
            </Row>
            <Row>
              <Col span={6}>
                <p>消息内容：</p>
              </Col>
              <Col span={18}>{result.data.content}</Col>
            </Row>
            <Row>
              <Col span={6}>
                <p>时间：</p>
              </Col>
              <Col span={18}>{result.data.createTime}</Col>
            </Row>
          </div>
        ),
        onOk: () => {
          dataSource.reload();
          getNewsQuery().then((result) => {
            props.dispatch(messageActionCreators.messageinSuccess(result.data));
          });
        },
      });
    });
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
      <Row style={{ padding: '0 24px 10px' }}>
        <Col>
          <Button
            type="primary"
            disabled={selectedRowIds.length <= 0}
            onClick={() => batchDeletion()}
          >
            批量阅毕
          </Button>
          <Divider type="vertical" />
          <Button
            type="primary"
            disabled={selectedRowIds.length <= 0}
            onClick={() => batchDelete()}
          >
            批量删除
          </Button>
        </Col>
      </Row>

      <DataTable
        rowSelection={rowSelection}
        rowKey={(record: Notice) => record.id}
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
          {
            title: '操作',
            dataIndex: 'opt',
            key: 'opt',
            align: 'center',
            render: (value: string, item: Notice, index: number) => {
              return (
                <div>
                  <a href="javascript:;" onClick={() => openModel(item.id)}>
                    详情
                  </a>
                </div>
              );
            },
          },
        ]}
        dataSource={dataSource}
      />
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(NoticeList),
);
