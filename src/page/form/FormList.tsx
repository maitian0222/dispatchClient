import React, { useState } from 'react';
import { Table, Icon, Row, Col, Button, Divider, Modal } from 'antd';
import SearchForm from '@commons/SearchForm';
import useRestPageAPi from '@sinoui/use-rest-page-api';
import DataTable from '@commons/DataTable';
import Form from './types/Form';
import FormModel from './FormModel';

/**
 * 表单管理列表
 */
function FormList() {
  let formRef;
  const formFormRef = (ref: any) => {
    formRef = ref;
  };
  const [visible, setVisible] = useState(false);
  const [modelTitleType, setModelTitleType] = useState();
  const [editItem, setEditItem] = useState({});
  const [loading, setLoading] = useState(false);

  /**
   * 打开用户Model
   * @param item 数据对象
   * @param type 判断是新建还是修改
   */
  const openModel = (item: any, type?: string) => {
    setVisible(true);
    setModelTitleType(type);
    setEditItem(type ? item : {});
  };

  /**
   * 关闭用户Model
   */
  const onClose = () => {
    setVisible(false);
  };

  /**
   * 数据管理api
   */
  const dataSource = useRestPageAPi<Form>('/dispute/userManagement', [], {
    keyName: 'id',
  });

  /**
   * 查询
   * @param condition 获取表单数据项
   */
  // tslint:disable-next-line:no-any
  const handleSearch = (condition: any) => {
    dataSource.query({
      ...dataSource.searchParams,
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
                userId: editItem.id,
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
          content: `${oprText}表单项成功!`,
          okText: '确定',
        });
      }).catch(() => {
        setLoading(false);
        Modal.error({
          title: '提示',
          content: `${oprText}表单项失败!`,
          okText: '确定',
        });
      });
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
            key: 'name',
            align: 'center',
            render: (value: string, item: User, index: number) => {
              return index + 1;
            },
          },
          {
            title: '字段名称',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
          },
          {
            title: '字段',
            dataIndex: 'zhenshiname',
            key: 'name',
            align: 'center',
          },
          {
            title: '所属法院',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
          },
          {
            title: '数据类型',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
          },
          {
            title: '可选项',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
          },
          {
            title: '是否必填',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
          },
          {
            title: '操作',
            dataIndex: 'opt',
            key: 'opt',
            align: 'center',
            render: (value: string, item: User, index: number) => {
              return (
                <div>
                  <a
                    href="javascript:;"
                    onClick={() => dataSource.remove(`${item.id}`)}
                  >
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

      <FormModel
        visible={visible}
        modelTitleType={modelTitleType}
        onClose={onClose}
        editItem={editItem}
        loading={loading}
        onOk={onOk}
        wrappedComponentRef={formFormRef}
      />
    </React.Fragment>
  );
}

export default FormList;
