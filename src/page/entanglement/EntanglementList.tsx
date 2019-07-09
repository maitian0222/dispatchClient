import React, { useState } from 'react';
import {
  Modal,
  Icon,
  Row,
  Col,
  Button,
  Divider,
  Message,
  Table,
  Descriptions,
} from 'antd';
import SearchForm from '@commons/SearchForm';
import useRestPageAPi from '@sinoui/use-rest-page-api';
import http from '@sinoui/http';
import DataTable from '@commons/DataTable';
import EntanglementModel from './EntanglementModel';
import PutOnRecordModel from './PutOnRecordModel';
import ImportModel from './ImportModel';
import Entanglement from './types/Entanglement';
import ContactsModel from './ContactsModel';
import {
  getSaveAndSubmit,
  getBatchSubmit,
  getImport,
  deleteDispute,
} from './apis';
import { PAGE_SIZE } from '../../config/AppConfig';
import RadioOptions from './RadioOptions';

/**
 * 纠纷管理列表
 */
function EntanglementList() {
  let formRef: { props: { form: any } };
  const disputeFormRef = (ref: any) => {
    formRef = ref;
  };

  let importForm: { props: { form: any } };
  const importFormRef = (ref: any) => {
    importForm = ref;
  };

  const [visible, setVisible] = useState(false);
  const [modelTitleType, setModelTitleType] = useState();
  const [editItem, setEditItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // 批量立案
  const [registerVisible, setRegisterVisible] = useState(false);
  // 联系人
  const [contactVisible, setContactVisible] = useState(false);
  // 联系人数据
  const [contact, setContact] = useState({});
  // 选择纠纷数据
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  // 导入数据
  const [importVisible, setImportVisible] = useState(false);
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
      http.get(`/biz/dispute/${item.id}`).then((result) => {
        setEditItem(result);
      });
    }
  };

  /**
   * 关闭纠纷Model
   */
  const onClose = () => {
    const form = formRef.props.form;
    setEditItem({});
    form.resetFields();
    setVisible(false);
  };

  /**
   * 数据管理api
   */
  const dataSource = useRestPageAPi<Entanglement>('/biz/dispute', [], {
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
    setSelectedRowIds([]);
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
        if (result.code !== 0) {
          Modal.error({
            title: '提示',
            content: result.msg,
            okText: '确定',
          });
          setLoading(false);
          return;
        }
        // 清空表单数据
        form.resetFields();
        setLoading(false);
        setVisible(false);
        setSelectedRowIds([]);

        dataSource.reload();
        Modal.success({
          title: '提示',
          content: `${oprText}纠纷成功!`,
          okText: '确定',
        });
      }).catch(() => {
        setLoading(false);
        Modal.error({
          title: '提示',
          content: `${oprText}纠纷失败!`,
          okText: '确定',
        });
      });
    });
  };

  /**
   * 验证表单项，弹出联系人选择框
   */
  const saveSelectContacts = () => {
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

      setContactVisible(true);
    });
  };

  /**
   * 获取选中联系人
   * @param item
   */
  const onSelectContact = (item) => {
    setContact(item);
  };

  /**
   * 保存后提交
   * @param item
   */
  const onSaveSubmit = () => {
    const form = formRef.props.form;

    if (!contact.id) {
      Message.error('请选择联系人');
      return;
    }

    form.validateFields((err, values) => {
      values.contactsId = contact.id;
      if (editItem) {
        values.id = editItem.id;
      }
      getSaveAndSubmit(values)
        .then((result) => {
          if (result.code !== 0) {
            Modal.error({
              title: '提示',
              content: result.msg,
              okText: '确定',
            });
            setLoading(false);
            return;
          }

          // 清空表单数据
          form.resetFields();
          setSelectedRowIds([]);
          setVisible(false);
          setContactVisible(false);
          setContact({});
          dataSource.reload();
          Modal.success({
            title: '提示',
            content: `提交成功!`,
            okText: '确定',
          });
        })
        .catch(() => {
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
        deleteDispute(item.id)
          .then((result) => {
            if (result.code !== 0) {
              Modal.error({
                title: '提示',
                content: result.msg,
                okText: '确定',
              });
              return;
            }
            dataSource.reload();
            Modal.success({
              title: '提示',
              content: result.msg,
              okText: '确定',
            });
          })
          .catch((e) => {
            Message.error(e.response.data.msg);
          });
      },
    });
  };

  /**
   * 关闭联系人model
   */
  const onCloseContactVisible = () => {
    setContactVisible(false);
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
   * 批量立案
   */
  const batchSubmit = () => {
    if (!contact.id) {
      Message.error('请选择联系人');
      return;
    }
    const items = selectedRows.map((item) => {
      return item.id;
    });

    const params = {};
    params.contactsId = contact.id;
    params.disputes = items;

    getBatchSubmit(params)
      .then((result) => {
        setRegisterVisible(false);
        dataSource.reload();
        Modal.success({
          title: '提示',
          content: `提交成功!`,
          okText: '确定',
        });
      })
      .catch(() => {
        Modal.error({
          title: '提示',
          content: `提交失败!`,
          okText: '确定',
        });
      });
  };

  /**
   * 获取选中
   */
  const rowSelection = {
    selectedRowKeys: selectedRowIds,
    onChange: (selectedRowKeys: string[], selectedRows: any) => {
      setSelectedRowIds(selectedRowKeys);
      setSelectedRows(selectedRows);
    },
  };

  /**
   * 打开导入数据model
   */
  const openImportVisible = () => {
    setImportVisible(true);
  };

  /**
   * 关闭导入数据model
   */
  const onCloseImportVisible = () => {
    const form = importForm.props.form;
    setImportVisible(false);
    form.resetFields();
  };

  /**
   * 导入数据
   */
  const onImport = () => {
    const form = importForm.props.form;
    return form.validateFields((err, values) => {
      // 检验失败return
      if (err) {
        return;
      }

      const data = { ...values };

      // 数据导入
      data.attachment = data.attachment[0].response.content[0];

      getImport(data)
        .then((result) => {
          if (result.code !== 0) {
            Modal.error({
              title: '提示',
              content: <ImportInfo data={result.data} />,
              okText: '确定',
              width: 600,
            });
            return;
          }

          setImportVisible(false);
          form.resetFields();
          dataSource.reload();
          Modal.success({
            title: '提示',
            content: `数据导入成功!`,
            okText: '确定',
          });
        })
        .catch(() => {
          Modal.error({
            title: '提示',
            content: `数据导入失败!`,
            okText: '确定',
          });
        });
    });
  };

  /**
   * 导入数据提示信息
   */
  function ImportInfo(props) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Descriptions>
          <Descriptions.Item label="  总条数">
            {props.data.total}
          </Descriptions.Item>
          <Descriptions.Item label="成功条数">
            {props.data.successNum}
          </Descriptions.Item>
          <Descriptions.Item label="失败条数">
            {props.data.failedNum}
          </Descriptions.Item>
        </Descriptions>
        <Table
          pagination={false}
          dataSource={props.data.data}
          columns={[
            {
              title: '编号',
              dataIndex: 'lineNumber',
              key: 'lineNumber',
              align: 'center',
              width: 50,
            },
            {
              title: '合同编号',
              dataIndex: 'contractNumber',
              key: 'contractNumber',
              align: 'center',
              width: 100,
            },
            {
              title: '失败原因',
              dataIndex: 'reason',
              key: 'reason',
              align: 'center',
              width: 150,
            },
          ]}
          size="middle"
          scroll={{ y: 300 }}
        />
      </div>
    );
  }

  const optionsOnChange = (e) => {
    console.log(e.target.value);

    dataSource.query({
      caseType: e.target.value,
    });
  };

  return (
    <React.Fragment>
      <SearchForm
        condition={[
          { fieldName: '纠纷对象', placeholder: '请输入', name: 'peopleName' },
          {
            fieldName: '合同编号',
            placeholder: '请输入',
            name: 'contractNumber',
          },
        ]}
        handleSearch={handleSearch}
      />
      <Row style={{ padding: '0 24px 30px' }}>
        <Col>
          <RadioOptions defaultValue="" onChange={optionsOnChange} />
        </Col>
      </Row>

      <Row style={{ padding: '0 24px 10px' }}>
        <Col span={24}>
          <Button type="primary" onClick={openModel}>
            <Icon type="plus" />
            新建
          </Button>
          <Divider type="vertical" />
          <Button type="primary" onClick={openImportVisible}>
            <Icon type="plus" />
            导入
          </Button>
          <Divider type="vertical" />
          <Button type="primary" onClick={() => openRegisterModel()}>
            <Icon type="plus" />
            批量立案
          </Button>
          <Divider type="vertical" />
          {/* <RadioOptions defaultValue="" onChange={optionsOnChange} /> */}
        </Col>
      </Row>

      <DataTable
        rowSelection={rowSelection}
        rowKey={(record: Entanglement) => record.id}
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
            title: '合同编号',
            dataIndex: 'contractNumber',
            key: 'contractNumber',
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
        saveSubmit={saveSelectContacts}
        onOk={onOk}
      />

      <PutOnRecordModel
        visible={registerVisible}
        onClose={closeRegisterModel}
        selectedRows={selectedRows}
        onSelectContact={onSelectContact}
        onOk={batchSubmit}
      />

      <ContactsModel
        onSelectContact={onSelectContact}
        visible={contactVisible}
        onClose={onCloseContactVisible}
        onOk={onSaveSubmit}
      />

      <ImportModel
        visible={importVisible}
        onClose={onCloseImportVisible}
        onOk={onImport}
        wrappedComponentRef={importFormRef}
      />
    </React.Fragment>
  );
}

export default EntanglementList;
