import React, { useState, useEffect } from 'react';
import { Card, Descriptions } from 'antd';
import http from '@sinoui/http';

interface Props {
  contactsId: string; // 联系人id
}
interface User {
  name: string;
  phone: string;
  email: string;
}
export default function ContactCard(props: Props) {
  const [user, setUser] = useState<User>({});
  useEffect(() => {
    http.get(`/biz/contracts/${props.contactsId}`).then((result) => {
      setUser(result);
    });
  }, []);

  return (
    <Card title="联系人">
      <Descriptions>
        <Descriptions.Item label="姓名">{user.name}</Descriptions.Item>
        <Descriptions.Item label="电话">{user.phone}</Descriptions.Item>
        <Descriptions.Item label="邮箱">{user.email}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
