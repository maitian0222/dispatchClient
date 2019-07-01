import * as React from 'react';
import { Row, Col, Descriptions, Table, List } from 'antd';
const styles = require('./css/styles.css');

const columns = [
  {
    title: '编号',
    dataIndex: 'index',
    render: (text, item, index) => index + 1,
  },
  {
    title: '纠纷对象',
    dataIndex: 'userName',
  },
  {
    title: '添加时间',
    dataIndex: 'createTime',
  },
  {
    title: '标的金额',
    dataIndex: 'money',
  },
  {
    title: '逾期天数',
    dataIndex: 'days',
  },
  {
    title: '产品',
    dataIndex: 'product',
  },
  {
    title: '放款主体',
    dataIndex: 'main',
  },
  {
    title: '操作',
    dataIndex: 'opt',
    render: () => {
      return <a href="javascript:;">查看</a>;
    },
  },
];

const data = [
  {
    name: '胡彦斌',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    name: '胡彦斌',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    name: '胡彦斌',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
];
const data1 = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];
class MaterialReview extends React.Component {
  public render() {
    return (
      <div className={styles.material}>
        <Row>
          <Col span={18}>
            <Descriptions title="案件概况">
              <Descriptions.Item label="案件编号">
                JD201905010001
              </Descriptions.Item>
              <Descriptions.Item label="案号">A201905010001</Descriptions.Item>
              <Descriptions.Item label="案由">借贷纠纷</Descriptions.Item>
              <Descriptions.Item label="标的金额">10000</Descriptions.Item>
              <Descriptions.Item label="立案时间">2019.04.20</Descriptions.Item>
              <Descriptions.Item label="开庭时间">
                2019.05.10 9:00
              </Descriptions.Item>
            </Descriptions>
            <div style={{ marginTop: 20 }} className={styles.content}>
              <h3 className={styles.title}>关联纠纷</h3>
              <Table pagination={false} columns={columns} dataSource={data} />
            </div>
          </Col>
          <Col span={6}>
            <div className={styles.content}>
              <List
                size="small"
                header={<div>法院信息</div>}
                dataSource={data1}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </div>
            <div style={{ marginTop: 20 }} className={styles.content}>
              <List
                size="small"
                header={<div>案件进度</div>}
                dataSource={data1}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MaterialReview;
