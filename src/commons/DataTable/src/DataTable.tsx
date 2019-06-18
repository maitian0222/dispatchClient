import React, { useState } from 'react';
import { Table } from 'antd';

interface Props {
  // tslint:disable-next-line:no-any
  columns: any;
  // tslint:disable-next-line:no-any
  dataSource: any;
}
export default function DataTable(props: Props) {
  const onChangeTable = (pagination, filters, sorter) => {
    const filterKeys = Object.keys(filters);
    const filterObj = {};
    filterKeys.map((item) => {
      filterObj[item] =
        filters[item] instanceof Array
          ? filters[item].join(',')
          : filters[item];
    });
    props.dataSource.fetch(
      pagination.current - 1,
      pagination.pageSize,
      sorter.field
        ? [
            {
              property: sorter.field,
              direction: sorter.order === 'ascend' ? 'asc' : 'desc',
            },
          ]
        : [],
      {
        ...props.dataSource.searchParams,
        ...filterObj,
      },
    );
  };

  // 分页配置 分页或者无分页
  let { pagination } = props.dataSource;
  pagination = pagination
    ? {
        current: pagination.pageNo + 1,
        pageSize: pagination.pageSize,
        total: pagination.totalElements,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '15', '50', '100'],
      }
    : false;
  return (
    <Table
      rowSelection={props.rowSelection}
      rowKey={props.rowKey}
      columns={props.columns}
      dataSource={props.dataSource.items}
      loading={props.dataSource.isLoading}
      pagination={pagination}
      onChange={onChangeTable}
    />
  );
}
