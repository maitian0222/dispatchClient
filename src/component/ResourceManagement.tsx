import React from 'react';
import { Table, Icon, Row, Col, Button } from 'antd';
import SearchForm from '@commons/SearchForm';
import http from '@sinoui/http';
import AddResourceFrom from './Form';

const condition = [
  { fieldName: '菜单名称', placeholder: '请输入', name: 'fileName' },
];
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    filters: [{ text: '菜单', value: '菜单' }, { text: '权限', value: '权限' }],
    onFilter: (value, record) => record.type.includes(value),
  },
  {
    title: '链接',
    dataIndex: 'link',
    align: 'center',
    key: 'link',
  },
  {
    title: '排序',
    dataIndex: 'order',
    key: 'order',
    align: 'center',
    sorter: (a, b) => a.order - b.order,
  },
  {
    title: '可见性',
    dataIndex: 'visiable',
    key: 'visiable',
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'note',
    key: 'note',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'opt',
    key: 'opt',
    align: 'center',
    render: () => {
      return (
        <div>
          <a href="javascript:;">删除</a>&nbsp;<a href="javascript:;">编辑</a>
        </div>
      );
    },
  },
];
class ResourceManagement extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      searchCondition: {},
    };
  }

  public handleSearch(condition) {
    http.post('/dispute/resourceManagement/list', condition).then((data) => {
      this.setState({
        dataSource: data,
      });
    });
  }
  public componentDidMount() {
    http.post('/dispute/resourceManagement/list').then((data) => {
      this.setState({
        dataSource: data,
      });
    });
  }
  public render() {
    return (
      <div style={{ background: '#ffffff' }}>
        <SearchForm
          condition={condition}
          handleSearch={this.handleSearch.bind(this)}
        />
        <Row style={{ padding: '0 24px 10px' }}>
          <Col span={24}>
            <Button type="primary">
              <Icon type="plus" />
              新建
            </Button>
          </Col>
        </Row>
        <Table columns={columns} dataSource={this.state.dataSource} />
      </div>
    );
  }
}

export default ResourceManagement;
