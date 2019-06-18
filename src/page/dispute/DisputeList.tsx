import React, { useState } from 'react';
import { Modal, Icon, Row, Col, Button, Divider, Badge } from 'antd';
import SearchForm from '@commons/SearchForm';
import useRestPageAPi from '@sinoui/use-rest-page-api';
import http from '@sinoui/http';
import DataTable from '@commons/DataTable';
import DisputeModel from './DisputeModel';

/**
 * 纠纷模板管理列表
 */
function DisputeList() {
  let formRef;
  const disputeFormRef = (ref: any) => {
    formRef = ref;
  };

  const [visible, setVisible] = useState(false);
  const [modelTitleType, setModelTitleType] = useState();
  const [editItem, setEditItem] = useState({});
  const [loading, setLoading] = useState(false);

  /**
   * 打开纠纷模板Model
   * @param item 数据对象
   * @param type 判断是新建还是修改
   */
  const openModel = (item: any, type?: string) => {
    setVisible(true);
    setModelTitleType(type);
    setEditItem({});
  };

  /**
   * 关闭纠纷模板Model
   */
  const onClose = () => {
    setVisible(false);
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
                userId: editItem.id,
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
          content: `${oprText}纠纷模板成功!`,
          okText: '确定',
        });
      }).catch(() => {
        setLoading(false);
        Modal.error({
          title: '提示',
          content: `${oprText}纠纷模板失败!`,
          okText: '确定',
        });
      });
    });
  };

  return (
    <React.Fragment>
      <SearchForm
        condition={[
          { fieldName: '模板名称', placeholder: '请输入', name: 'name' },
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
            render: (value: string, item: User, index: number) => {
              return index + 1;
            },
          },
          {
            title: '名称',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
          },
          {
            title: '描述',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
            filters: [
              { text: '描述1', value: 'miaoshu1' },
              { text: '描述2', value: 'miaoshu2' },
            ],
          },
          {
            title: '修改日期',
            dataIndex: 'createTime',
            key: 'createTime',
            align: 'center',
          },
          {
            title: '操作',
            dataIndex: 'opt',
            key: 'opt',
            align: 'center',
            render: (value: string, item: User, index: number) => {
              return (
                <div>
                  <a
                    href="javascript:;"
                    onClick={() => dataSource.remove(`${item.userId}`)}
                  >
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

      <DisputeModel
        visible={visible}
        modelTitleType={modelTitleType}
        onClose={onClose}
        editItem={editItem}
        wrappedComponentRef={disputeFormRef}
        loading={loading}
        onOk={onOk}
      />
    </React.Fragment>
  );
}

export default DisputeList;
