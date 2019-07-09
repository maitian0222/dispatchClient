import React, { useState } from 'react';
import { Modal, Icon, Row, Col, Button, Divider, Badge } from 'antd';
import SearchForm from '@commons/SearchForm';
import useRestPageAPi from '@sinoui/use-rest-page-api';
import http from '@sinoui/http';
import DataTable from '@commons/DataTable';
import DisputeModel from './ContactModel';
import Contact from './types/Contact';

/**
 * 联系人管理列表
 */
function ContactList() {
  let formRef;
  const disputeFormRef = (ref: any) => {
    formRef = ref;
  };

  const [visible, setVisible] = useState(false);
  const [modelTitleType, setModelTitleType] = useState();
  const [editItem, setEditItem] = useState({});
  const [loading, setLoading] = useState(false);

  /**
   * 打开联系人Model
   * @param item 数据对象
   * @param type 判断是新建还是修改
   */
  const openModel = (item: Contact, type?: string) => {
    setVisible(true);
    setModelTitleType(type);
    // setEditItem(type === 'edit' ? item : {});
    setEditItem({});
    if (type === 'edit' && item) {
      http.get(`/biz/contracts/${item.id}`).then((result) => {
        setEditItem(result);
      });
    }
  };

  /**
   * 关闭联系人Model
   */
  const onClose = () => {
    setVisible(false);
  };

  /**
   * 数据管理api
   */
  const dataSource = useRestPageAPi<Contact>('/biz/contracts', [], {
    keyName: 'id',
  });

  /**
   * 查询
   * @param condition 获取表单数据项
   */
  // tslint:disable-next-line:no-any
  const handleSearch = (condition: any) => {
    console.log(condition);
    dataSource.query({
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
                id: editItem.id,
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
          content: `${oprText}联系人成功!`,
          okText: '确定',
        });
      }).catch(() => {
        setLoading(false);
        Modal.error({
          title: '提示',
          content: `${oprText}联系人失败!`,
          okText: '确定',
        });
      });
    });
  };

  const onDelete = (item: Dispute) => {
    Modal.confirm({
      title: '提示',
      content: '确认删除？',
      onOk: () => {
        dataSource.remove(`${item.id}`, false).then(() => {
          dataSource.reload();
        });
      },
    });
  };

  return (
    <React.Fragment>
      <SearchForm
        condition={[
          { fieldName: '姓名', placeholder: '请输入', name: 'name' },
          { fieldName: '身份证号', placeholder: '请输入', name: 'idNumber' },
          {
            fieldName: '添加时间',
            placeholder: ['开始时间', '结束时间'],
            startTimeName: 'startCreateTime',
            endTimeName: 'endCreateTime',
            format: 'YYYY-MM-DD',
            type: 'rangePicker',
          },
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
            render: (value: string, item: Contact, index: number) => {
              return index + 1;
            },
          },
          {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
          },
          {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            align: 'center',
            render: (value) => {
              return <span>{value === '1' ? '女' : '男'}</span>;
            },
          },
          {
            title: '联系电话',
            dataIndex: 'phone',
            key: 'phone',
            align: 'center',
          },
          {
            title: '身份证号',
            dataIndex: 'idNumber',
            key: 'idNumber',
            align: 'center',
          },
          {
            title: '创建日期',
            dataIndex: 'createTime',
            key: 'createTime',
            align: 'center',
          },
          {
            title: '操作',
            dataIndex: 'opt',
            key: 'opt',
            align: 'center',
            render: (value: string, item: Contact, index: number) => {
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

export default ContactList;
