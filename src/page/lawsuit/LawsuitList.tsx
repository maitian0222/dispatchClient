import React, { useState } from 'react';
import withErrorCatch from '@commons/with-error-catch';
import SearchForm from '@commons/SearchForm';
import useRestPageAPi from '@sinoui/use-rest-page-api';
import DataTable from '@commons/DataTable';
import Lawsuit from './types/Lawsuit';
import transformListRequest from '../../utils/transformListRequest';
/**
 * 纠纷管理列表
 */
function LawsuitList(props: {}) {
  /**
   * 数据管理api
   */
  const dataSource = useRestPageAPi<Lawsuit>('/biz/lawsuit', [], {
    keyName: 'id',
    transformListRequest,
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
      {/* <Row style={{ padding: '0 24px 10px', margin: '20px 10px' }}>
        <Col span={4}>
          <Statistic
            title="待审核"
            value={1128}
            prefix={<Icon type="user" />}
          />
        </Col>
        <Col span={4}>
          <Statistic
            title="未通过"
            value={1128}
            prefix={<Icon type="close-circle" />}
          />
        </Col>

        <Col span={4}>
          <Statistic
            title="代缴费"
            value={1128}
            prefix={<Icon type="money-collect" />}
          />
        </Col>
        <Col span={4}>
          <Statistic
            title="已立案"
            value={1128}
            prefix={<Icon type="like" />}
          />
        </Col>
        <Col span={4}>
          <Statistic
            title="审理中"
            value={1128}
            prefix={<Icon type="like" />}
          />
        </Col>
        <Col span={4}>
          <Statistic
            title="已结案"
            value={1128}
            prefix={<Icon type="poweroff" />}
          />
        </Col>
      </Row> */}

      <SearchForm
        condition={[
          { fieldName: '案号', placeholder: '请输入', name: 'caseNumber' },
          {
            fieldName: '状态',
            name: 'status',
            type: 'select',
            mode: 'false',
            valueName: 'value',
            textName: 'name',
            options: [
              {
                value: 1,
                name: '待审核',
              },
              {
                value: 2,
                name: '拒绝受理',
              },
              {
                value: 3,
                name: '审核通过',
              },
              {
                value: 4,
                name: '审核未通过',
              },
              {
                value: 5,
                name: '已调解',
              },
              {
                value: 6,
                name: '已立案',
              },
              {
                value: 7,
                name: '代缴费',
              },
              {
                value: 8,
                name: '已缴费',
              },
              {
                value: 9,
                name: '结案',
              },
            ],
          },
        ]}
        handleSearch={handleSearch}
      />
      <DataTable
        // onRow={(record) => {
        //   return {
        //     onClick: (event) => {
        //       props.history.push(`/lawsuit/edit/${record.id}`, {
        //         ...record,
        //       });
        //     }, // 点击行
        //   };
        // }}
        columns={[
          {
            title: '编号',
            key: 'index',
            align: 'center',
            render: (value: string, item: Lawsuit, index: number) => {
              return index + 1;
            },
          },
          {
            title: '被告',
            dataIndex: 'defendantName',
            key: 'defendantName',
            align: 'center',
          },
          {
            title: '案号',
            dataIndex: 'caseNumber',
            key: 'caseNumber',
            align: 'center',
          },
          {
            title: '标的金额',
            dataIndex: 'amountMoney',
            key: 'amountMoney',
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
            title: '更新时间',
            dataIndex: 'modifyTime',
            key: 'modifyTime',
            align: 'center',
          },
          {
            title: '状态',
            dataIndex: 'statusName',
            key: 'statusName',
            align: 'center',
          },
          {
            title: '操作',
            dataIndex: 'opt',
            key: 'opt',
            align: 'center',
            render: (value: string, item: Lawsuit, index: number) => {
              return (
                <div>
                  <a
                    href="javascript:;"
                    onClick={() => {
                      props.history.push(`/lawsuit/edit/${item.id}`, {
                        ...item,
                      });
                    }}
                  >
                    查看
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

export default withErrorCatch({ errorTitle: '很抱歉，数据加载失败...' })(
  LawsuitList,
);
