import React, { useState } from 'react';
import { Modal, Icon, Row, Col, Button, Divider, Message } from 'antd';
import SearchForm from '@commons/SearchForm';
import useRestPageAPi from '@sinoui/use-rest-page-api';
import http from '@sinoui/http';
import DataTable from '@commons/DataTable';
import EntanglementModel from './EntanglementModel';
import PutOnRecordModel from './PutOnRecordModel';
import Entanglement from './types/Entanglement';
import { getSaveAndSubmit } from './apis';

/**
 * 纠纷管理列表
 */
function EntanglementList() {
  let formRef;
  const disputeFormRef = (ref: any) => {
    formRef = ref;
  };

  const [visible, setVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [modelTitleType, setModelTitleType] = useState();
  const [editItem, setEditItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  /**
   * 打开纠纷Model
   * @param item 数据对象
   * @param type 判断是新建还是修改
   */
  const openModel = (item: any, type?: string) => {
    setVisible(true);
    setModelTitleType(type);
    setEditItem({});
    if (type === 'edit' && item) {
      setEditItem(item);
      http.get(`/biz/dispute/${item.id}`).then((result) => {
        setTimeout(() => {
          setEditItem(result);
        }, 2000);
      });
    } else {
      setVisible(true);
    }
  };

  /**
   * 打开立案model
   */
  const openRegisterModel = () => {
    if (selectedRows.length === 0) {
      Message.error('请选择纠纷案件');
      return;
    }
    let items = new Map();
    selectedRows.map((item) => {
      items.set(item.caseType, '');
    });

    if (items.size !== 1) {
      Message.error('请选择相同的案件类型');
      return;
    }

    setRegisterVisible(true);
  };
  /**
   * 关闭立案model
   */
  const closeRegisterModel = () => {
    setRegisterVisible(false);
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
  const dataSource = useRestPageAPi<Entanglement>('/biz/dispute', [], {
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

  const onOk = () => {
    const form = formRef.props.form;
    return form.validateFields((err, values) => {
      // 检验失败return
      if (err) {
        return;
      }

      // 身份证正面
      values.idFront = values.idFront.map((item) => {
        if (item.response) {
          return item.response.content[0];
        } else {
          return item;
        }
      });
      // 证据
      values.evidence = values.evidence.map((item) => {
        if (item.response) {
          return item.response.content[0];
        } else {
          return item;
        }
      });

      // 身份证反面
      values.idReverse = values.idReverse.map((item) => {
        if (item.response) {
          return item.response.content[0];
        } else {
          return item;
        }
      });
      if (values.respondentType === 1) {
        // 营业执照
        values.businessLicense = values.businessLicense.map((item) => {
          if (item.response) {
            return item.response.content[0];
          } else {
            return item;
          }
        });
      } else {
        values.businessLicense = [];
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

  /**
   * 保存并提交
   */
  const saveSubmit = () => {
    const form = formRef.props.form;
    return form.validateFields((err, values) => {
      // 检验失败return
      if (err) {
        return;
      }

      // 身份证正面
      values.idFront = values.idFront.map((item) => {
        if (item.response) {
          return item.response.content[0];
        } else {
          return item;
        }
      });
      // 身份证反面
      values.idReverse = values.idReverse.map((item) => {
        if (item.response) {
          return item.response.content[0];
        } else {
          return item;
        }
      });
      // 证据
      values.evidence = values.evidence.map((item) => {
        if (item.response) {
          return item.response.content[0];
        } else {
          return item;
        }
      });

      if (values.respondentType === 1) {
        // 营业执照
        values.businessLicense = values.businessLicense.map((item) => {
          if (item.response) {
            return item.response.content[0];
          } else {
            return item;
          }
        });
      } else {
        values.businessLicense = [];
      }

      setLoading(true);

      getSaveAndSubmit(values)
        .then((result) => {
          // 清空表单数据
          form.resetFields();
          setLoading(false);
          setVisible(false);
          dataSource.reload();
          Modal.success({
            title: '提示',
            content: `提交成功!`,
            okText: '确定',
          });
        })
        .catch(() => {
          setLoading(false);
          Modal.error({
            title: '提示',
            content: `提交失败!`,
            okText: '确定',
          });
        });
    });
  };

  /**
   * 删除纠纷数据
   * @param item
   */
  const onDelete = (item: Entanglement) => {
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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <React.Fragment>
      <SearchForm
        condition={[
          { fieldName: '纠纷对象', placeholder: '请输入', name: 'peopleName' },
        ]}
        handleSearch={handleSearch}
      />

      <Row style={{ padding: '0 24px 10px' }}>
        <Col span={24}>
          <Button type="primary" onClick={openModel}>
            <Icon type="plus" />
            新建
          </Button>
          <Divider type="vertical" />
          <Button type="primary">
            <Icon type="plus" />
            导入
          </Button>
          <Divider type="vertical" />
          <Button type="primary" onClick={() => openRegisterModel()}>
            <Icon type="plus" />
            批量立案
          </Button>
        </Col>
      </Row>

      <DataTable
        rowSelection={rowSelection}
        columns={[
          {
            title: '编号',
            key: 'index',
            align: 'center',
            render: (value: string, item: Entanglement, index: number) => {
              return index + 1;
            },
          },
          {
            title: '纠纷对象',
            dataIndex: 'peopleName',
            key: 'peopleName',
            align: 'center',
            render: (value: string, item: Entanglement, index: number) => {
              return item.peopleName || item.companyName;
            },
          },
          {
            title: '标的金额',
            dataIndex: 'amountMoney',
            key: 'amountMoney',
            align: 'center',
          },
          {
            title: '逾期金额',
            dataIndex: 'overdueMoney',
            key: 'overdueMoney',
            align: 'center',
          },
          {
            title: '案件类型',
            dataIndex: 'caseTypeName',
            key: 'caseTypeName',
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
            render: (value: string, item: Entanglement, index: number) => {
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

      <EntanglementModel
        visible={visible}
        modelTitleType={modelTitleType}
        onClose={onClose}
        editItem={editItem}
        wrappedComponentRef={disputeFormRef}
        loading={loading}
        saveSubmit={saveSubmit}
        onOk={onOk}
      />

      <PutOnRecordModel
        visible={registerVisible}
        onClose={closeRegisterModel}
      />
    </React.Fragment>
  );
}

export default EntanglementList;