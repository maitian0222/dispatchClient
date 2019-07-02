import React, { useState, useEffect } from 'react';
import DataTable from '@commons/DataTable';
import http from '@sinoui/http';
import styles from '../Lawsuit.css';
import CardLayout from './CardLayout';
interface Props {
  id: string; // id
  status: string; // 案件状态
}
interface Dispute {
  name?: string;
  phone?: string;
  email?: string;
}
export default function DisputeListCard(props: Props) {
  const [dispute, setDisputeList] = useState<Dispute>({
    loading: true,
    items: [],
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    http
      .get(`/biz/lawsuit/finddispute`, {
        params: {
          id: props.id,
        },
      })
      .then((result) => {
        setDisputeList({
          items: result,
          loading: false,
        });
        setLoading(false);
      });
  }, []);

  return (
    <CardLayout
      title="纠纷列表"
      className={styles['table-card']}
      loading={loading}
    >
      <DataTable
        columns={[
          {
            title: '编号',
            key: 'index',
            align: 'center',
            render: (value: string, item: any, index: number) => {
              return index + 1;
            },
          },
          {
            title: '纠纷对象',
            dataIndex: 'peopleName',
            key: 'peopleName',
            align: 'center',
          },
          {
            title: '标的金额',
            dataIndex: 'amountMoney',
            key: 'amountMoney',
            align: 'center',
          },

          {
            title: '产品',
            dataIndex: 'productName',
            key: 'productName',
            align: 'center',
          },
          {
            title: '添加时间',
            dataIndex: 'createTime',
            key: 'createTime',
            align: 'center',
          },
          {
            title: '操作',
            dataIndex: 'opt',
            key: 'opt',
            align: 'center',
            render: (value: string, item: any, index: number) => {
              return <a href="javascript:;">{props.status === 4 ? '编辑' : '查看'}</a>;
            },
          },
        ]}
        dataSource={dispute}
      />
    </CardLayout>
  );
}
