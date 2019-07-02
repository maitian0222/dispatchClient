import React from 'react';
import { Skeleton, Card } from 'antd';

interface Props {
  loading: boolean;
  title: string;
  children: React.child;
}
export default function CardLayout(props: Props) {
  return (
    <Card {...props}>
      <Skeleton loading={props.loading} active>
        {props.children}
      </Skeleton>
    </Card>
  );
}
