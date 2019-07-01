import React, { useState } from 'react';
import { Modal, Icon, Row, Col, Button, Divider, Statistic } from 'antd';
import SearchForm from '@commons/SearchForm';
import useRestPageAPi from '@sinoui/use-rest-page-api';
import http from '@sinoui/http';
import DataTable from '@commons/DataTable';
import Lawsuit from './types/Lawsuit';
import { Link } from 'react-router-dom';

/**
 * 纠纷管理列表
 */
function LawsuitList(props) {
  let formRef;
  const disputeFormRef = (ref: any) => {
    formRef = ref;
  };

  const [visible, setVisible] = useState(false);
  const [modelTitleType, setModelTitleType] = useState();
  const [editItem, setEditItem] = useState({});
  const [loading, setLoading] = useState(false);

  /**
   * 打开纠纷Model
   * @param item 数据对象
   * @param type 判断是新建还是修改
   */
  const openModel = (item: any, type?: string) => {
    setVisible(true);
    setModelTitleType(type);
    setEditItem(type === 'edit' ? item : {});
  };

  /**
   * 关闭纠纷Model
   */
  const onClose = () => {
    setVisible(false);
  };

  /**
   * 数据管理api
   */
  const dataSource = useRestPageAPi<Lawsuit>('/biz/lawsuit', [], {
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
        ]}
        handleSearch={handleSearch}
      />
      <DataTable
        onRow={(record) => {
          return {
            onClick: (event) => {
              props.history.push(`/lawsuit/edit/${record.id}`, {
                ...record,
              });
            }, // 点击行
          };
        }}
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
            dataIndex: 'status',
            key: 'status',
            align: 'center',
          },
          // {
          //   title: '操作',
          //   dataIndex: 'opt',
          //   key: 'opt',
          //   align: 'center',
          //   render: (value: string, item: Lawsuit, index: number) => {
          //     return (
          //       <div>
          //         <Link to={`/lawsuit/edit/${item.id}`}>查看</Link>
          //       </div>
          //     );
          //   },
          // },
        ]}
        dataSource={dataSource}
      />
    </React.Fragment>
  );
}

export default LawsuitList;
