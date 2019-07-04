import React, { useState, useEffect } from 'react';
import { Descriptions, Button } from 'antd';
import http from '@sinoui/http';
import CardLayout from './CardLayout';
interface Props {
  id: string; // 诉讼案件id
}
interface CaseInfo {
  caseNumber: string; // 案件编号
  registerNumber: string; // 案号
  amountMoney: string; // 标的金额
  amountRecourse: string; // 追偿金额
  amountReality: string; // 实际追偿金额
}
export default function CaseInfoCard(props: Props) {
  const [caseInfo, setCaseInfo] = useState<CaseInfo>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    http
      .get(`/biz/lawsuit/findbyid`, {
        params: {
          id: props.id,
        },
      })
      .then((result: CaseInfo) => {
        setCaseInfo(result);
        setLoading(false);
      });
  }, []);

  return (
    <CardLayout title="案件概况" loading={loading}>
      <Descriptions>
        <Descriptions.Item label="案件编号">
          {caseInfo.caseNumber}
        </Descriptions.Item>
        <Descriptions.Item label="案号">
          {caseInfo.registerNumber}
        </Descriptions.Item>
        <Descriptions.Item label="案由">{caseInfo.caseCause}</Descriptions.Item>

        <Descriptions.Item label="标的总金额">
          {`¥${caseInfo.amountMoney}`}
        </Descriptions.Item>
        <Descriptions.Item label="追偿总金额">
          {`¥${caseInfo.amountRecourse}`}
        </Descriptions.Item>
        <Descriptions.Item label="实际追偿金额">
          {`¥${caseInfo.amountReality}`}
        </Descriptions.Item>
      </Descriptions>
      <div style={{ textAlign: 'right' }}>
        <Button type="primary">诉状书预览</Button>
      </div>
    </CardLayout>
  );
}
