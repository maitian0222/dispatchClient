import React, { useState } from 'react';
import SearchForm from '@commons/SearchForm';
import useRestPageAPi from '@sinoui/use-rest-page-api';
import DataTable from '@commons/DataTable';
import { PAGE_SIZE } from '../../config/AppConfig';

/**
 * 纠纷模板管理列表
 */
function DisputeList() {
  /**
   * 数据管理api
   */
  const dataSource = useRestPageAPi<{}>('/biz/courtDispute', [], {
    keyName: 'id',
    pageSize: PAGE_SIZE,
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

  return (
    <React.Fragment>
      <SearchForm
        condition={[
          { fieldName: '法院名称', placeholder: '请输入', name: 'name' },
        ]}
        handleSearch={handleSearch}
      />

      <DataTable
        columns={[
          {
            title: '编号',
            key: 'index',
            align: 'center',
            render: (value: string, item: Dispute, index: number) => {
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
            title: '描述',
            dataIndex: 'desc',
            key: 'desc',
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
            render: (value: string, item: {}, index: number) => {
              return (
                <div>
                  <a
                    href={`http://192.168.80.144:8082/oss/attachment/download?id=${
                      item.fileId
                    }`}
                    target="_blank"
                  >
                    下载
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

export default DisputeList;
