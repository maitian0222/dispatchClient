import React, { useState, useEffect } from 'react';
import { Card, Typography } from 'antd';
import http from '@sinoui/http';
interface Props {
  courtId: string; // 诉讼案件id
}
interface Court {
  namcaseNumbere?: string; // 案件编号
  registerNumber?: string; // 案号
  amountMoney?: string; // 标的金额
  amountRecourse?: string; // 追偿金额
  amountReality?: string; // 实际追偿金额
}
export default function CourtInfoCard(props: Props) {
  const [courtInfo, setCourtInfo] = useState<Court>({});
  useEffect(() => {
    http.get(`/biz/court/${props.courtId}`).then((result) => {
      setCourtInfo(result);
    });
  }, []);

  return (
    <Card title="法院信息">
      {courtInfo.id && (
        <React.Fragment>
          <Typography.Title level={4} style={{ fontSize: '14px' }}>
            {courtInfo.name}
          </Typography.Title>
          <Typography.Paragraph>
            <div style={{ marginBottom: '5px' }}>
              立案咨询电话：{courtInfo.phone}
            </div>
            <div style={{ marginBottom: '5px' }}>邮箱：{courtInfo.email}</div>
            <div style={{ marginBottom: '5px' }}>
              法院地址：
              {`${courtInfo.province}${courtInfo.city}${courtInfo.county}${
                courtInfo.address
              }`}
            </div>
          </Typography.Paragraph>
        </React.Fragment>
      )}
    </Card>
  );
}
