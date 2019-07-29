import React, { useState } from 'react';
import { Modal, Icon, Row, Col, Button, Divider, Badge } from 'antd';
import SearchForm from '@commons/SearchForm';
import useRestPageAPi from '@sinoui/use-rest-page-api';
import DataTable from '@commons/DataTable';
import Contact from '../contact/types/Contact';

/**
 * 联系人列表
 */
function ContactList(props) {
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
    dataSource.query({
      ...condition,
    });
  };

  const rowRadioSelection = {
    type: 'radio',
    columnTitle: '选择',
    onSelect: (selectedRowKeys: any[], selectedRows: any) => {
      props.onSelectContact(selectedRowKeys);
    },
  };

  return (
    <React.Fragment>
      <SearchForm
        condition={[{ fieldName: '姓名', placeholder: '请输入', name: 'name' }]}
        handleSearch={handleSearch}
      />

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
            render: (value: string) => {
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
        ]}
        dataSource={dataSource}
        rowSelection={rowRadioSelection}
        pagination={false}
      />
    </React.Fragment>
  );
}

export default ContactList;
