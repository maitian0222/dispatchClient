import React, { useState, useEffect } from 'react';
import { Divider, Badge, Row, Col, Button, Icon, Modal, message } from 'antd';
import SearchForm from '@commons/SearchForm';
import withErrorCatch from '@commons/with-error-catch';
import useRestPageAPi from '@sinoui/use-rest-page-api';
import http from '@sinoui/http';
import MaterialModal from './MaterialModal';
import MaterialReviewModal from './MaterialReviewModal';
import Resource from './types/Resource';
import DataTable from '@commons/DataTable';
import transformListRequest from '../../utils/transformListRequest';
import EllipsisText from '../../component/EllipsisText';

function MaterialHasList() {
  let formRef = null;
  const [visible, setVisible] = useState(false);
  const [reviewVisible, setReviewVisible] = useState(false);
  const [formOprType, setFormOprType] = useState('');
  const [editItem, setEditItem] = useState({});
  const [courtList, setCourtList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    http.get('/biz/court/list', {}).then((result) => {
      if (result) {
        courtList = setCourtList(result.content);
      }
    });
  }, [courtList.length]);
  const saveFormRef = (ref: any) => {
    formRef = ref;
  };
  /**
   * 打开新建资源modal
   *
   */
  const showModal = (type?: string, item: any) => {
    if (type === 'refuse') {
      setVisible(true);
    } else {
      setReviewVisible(true);
    }
    setFormOprType(type ? type : '');
    setEditItem({});
    if (item) {
      setEditItem(item);
    }
  };
  const onOk = () => {
    const form = formRef.props.form;
    form.validateFields((err, values) => {
      // 检验失败return
      if (err) {
        return;
      }
      //console.log('Received values of form: ', values);
      setLoading(true);
      http
        .get('/biz/lawsuitVerify/pass', {
          params: {
            id: editItem.id,
          },
        })
        .then((res) => {
          setLoading(false);
          dataSource.reload();
          form.resetFields();
          setReviewVisible(false);
        });
    });
  };
  const goBack = () => {
    setVisible(true);
    setFormOprType('back');
  };
  const refuseAudit = () => {
    const form = formRef.props.form;
    form.validateFields((err, values) => {
      //console.log('values', values);
      setLoading(true);
      if (err) {
        return;
      }
      let url =
        formOprType === 'refuse'
          ? '/biz/lawsuitVerify/kill'
          : '/biz/lawsuitVerify/back';
      http
        .get(url, {
          params: {
            id: editItem.id,
            reason: values.description,
          },
        })
        .then((res) => {
          setLoading(false);
          dataSource.reload();
          form.resetFields();
          setVisible(false);
          if (formOprType === 'back') {
            setReviewVisible(false);
          }
        });
    });
  };
  const handleSearch = (condition) => {
    dataSource.query({
      ...condition,
    });
  };
  const dataSource = useRestPageAPi<Resource>('/biz/lawsuitVerify?type=1', [], {
    keyName: 'id',
    transformListRequest,
  });

  return (
    <React.Fragment>
      <SearchForm
        condition={[
          {
            fieldName: '放款主体',
            placeholder: '请输入',
            name: 'sName',
          },
          {
            fieldName: '案件编号',
            placeholder: '请输入',
            name: 'caseNumber',
          },
          {
            fieldName: '状态',
            placeholder: '请选择',
            name: 'status',
            type: 'select',
            options: [
              { code: '', name: '请选择' },
              { code: 0, name: '已提交' },
              // { code: 1, name: '待审核' },
              { code: 2, name: '拒绝受理' },
              { code: 3, name: '审核通过' },
              { code: 4, name: '审核未通过' },
              { code: 5, name: '已调解' },
              { code: 6, name: '已立案' },
              { code: 7, name: '待缴费' },
              { code: 8, name: '缴费成功' },
              { code: 9, name: '结案' },
            ],
            valueName: 'code',
            textName: 'name',
          },
          {
            fieldName: '提交时间',
            placeholder: ['开始时间', '结束时间'],
            type: 'rangePicker',
            startTimeName: 'stime',
            endTimeName: 'etime',
            format: 'YYYY-MM-DD',
          },
        ]}
        handleSearch={handleSearch}
      />
      <DataTable
        rowKey={(record) => record.id}
        columns={[
          {
            title: '编号',
            dataIndex: 'index',
            align: 'center',
            render: (value: string, item: any, index: number) => {
              if (dataSource && dataSource.pagination) {
                return (
                  dataSource.pagination.pageNo *
                    dataSource.pagination.pageSize +
                  index +
                  1
                );
              }
            },
          },
          {
            title: '案件编号',
            dataIndex: 'caseNumber',
            align: 'center',
          },
          {
            title: '诉讼主体名称',
            dataIndex: 'subjectName',
            align: 'center',
          },
          {
            title: '被告',
            dataIndex: 'defendantName',
            align: 'center',
          },
          {
            title: '标的金额',
            dataIndex: 'amountMoney',
            align: 'center',
          },
          {
            title: '更新时间',
            dataIndex: 'modifyTime',
            align: 'center',
            sorter: true,
          },
          {
            title: '状态',
            dataIndex: 'status',
            align: 'center',
            render: (text, record) => {
              let status = '';
              let text = '';
              switch (record.status) {
                case 0:
                  status = 'red';
                  text = '已提交';
                  break;
                case 1:
                  status = 'default';
                  text = '待审核';
                  break;
                case 2:
                  status = 'error';
                  text = '拒绝受理';
                  break;
                case 3:
                  status = 'processing';
                  text = '审核通过';
                  break;
                case 4:
                  status = 'warning';
                  text = '审核未通过';
                  break;
                case 5:
                  status = 'cyan';
                  text = '已调解';
                  break;
                case 6:
                  status = 'lime';
                  text = '已立案';
                  break;
                case 7:
                  status = 'orange';
                  text = '待缴费';
                  break;
                case 8:
                  status = 'purple';
                  text = '缴费成功';
                  break;
                case 9:
                  status = 'success';
                  text = '结案';
                  break;
                default:
                  status = 'default';
                  text = '待审核';
              }
              return <Badge status={status} text={text} />;
            },
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (text, record) => (
              <span>
                {record.status === 1 ? (
                  <span>
                    <a
                      href="javascript:;"
                      onClick={() => showModal('accept', record)}
                    >
                      受理
                    </a>
                    <Divider type="vertical" />
                    <a
                      href="javascript:;"
                      onClick={() => showModal('refuse', record)}
                    >
                      拒绝
                    </a>
                  </span>
                ) : (
                  <a
                    href="javascript:;"
                    onClick={() => showModal('view', record)}
                  >
                    查看
                  </a>
                )}
              </span>
            ),
          },
        ]}
        dataSource={dataSource}
      />
      <MaterialModal
        visible={visible}
        onOk={refuseAudit}
        loading={loading}
        onClose={() => setVisible(false)}
        formOprType={formOprType}
        editItem={editItem}
        wrappedComponentRef={saveFormRef}
      />
      <MaterialReviewModal
        visible={reviewVisible}
        loading={loading}
        goBack={goBack}
        onOk={onOk}
        onClose={() => setReviewVisible(false)}
        formOprType={formOprType}
        editItem={editItem}
      />
    </React.Fragment>
  );
}
export default withErrorCatch({ errorTitle: '很抱歉，数据加载失败...' })(
  MaterialHasList,
);
