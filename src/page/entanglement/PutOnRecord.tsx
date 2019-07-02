import React, { useState } from 'react';
import { Modal, Icon, Row, Col, Button, Divider, Badge, Table } from 'antd';

import Contact from '../contact/types/Contact';
import ContactList from './ContactList';

/**
 * 联系人列表
 */
function PutOnRecord(props) {
  return (
    <React.Fragment>
      <Row>
        <Col>
          {`共选择${props.dataSource.length}条纠纷数据`}
          <ContactList onSelectContact={props.onSelectContact} />
        </Col>
      </Row>
      {/* <Row>
        <Col>
          <Table
            scroll={{ y: 240 }}
            columns={[
              {
                title: '编号',
                key: 'index',
                align: 'center',
                width: 150,
                render: (value: string, item: Contact, index: number) => {
                  return index + 1;
                },
              },
              {
                title: '合同编号',
                dataIndex: 'contractNumber',
                key: 'contractNumber',
                align: 'center',
                width: 150,
              },
              {
                title: '纠纷对象',
                dataIndex: 'peopleName',
                key: 'peopleName',
                align: 'center',
                width: 150,
                render: (value: string, item: Contact) => {
                  return <span>{item.peopleName || item.companyName}</span>;
                },
              },
              {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                align: 'center',
                width: 150,
                render: (value: string, item: Contact) => {
                  return <a href="#">预览</a>;
                },
              },
            ]}
            dataSource={props.dataSource}
            pagination={false}
          />
        </Col>
      </Row> */}
    </React.Fragment>
  );
}

export default PutOnRecord;
