import React from 'react';

import { Row, Col, Card, Button, message } from 'antd';
import http from '@sinoui/http';
import CardLayout from './component/CardLayout';
import ContactCard from './component/ContactCard';
import CaseInfoCard from './component/CaseInfoCard';
import DisputeListCard from './component/DisputeListCard';
import CourtInfoCard from './component/CourtInfoCard';

import styles from './Lawsuit.css';
class LawsuitCaseEditor extends React.Component<Props, State> {
  private props: any;
  private state: any;
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  // 案件退回后再次提交案件
  public onSubmit = () => {
    http
      .get(`/biz/lawsuit/pass`, {
        params: {
          id: this.props.match.params.id,
        },
      })
      .then((result) => {
        message.success('案件提交成功');
        this.props.history.goBack();
      });
  };

  public render() {
    // 联系人id 法院id 案件状态 退回理由
    const {
      contactsId,
      courtId,
      status,
      refuseAcceptReason,
    } = this.props.location.state;
    // 诉讼案件id
    const id = this.props.match.params.id;

    return (
      <div className={styles['lawsuit-layout']} style={{ margin: '20px' }}>
        <Row gutter={20}>
          <Col span={16}>
            <CaseInfoCard id={id} />
            <ContactCard contactsId={contactsId} />
            {status === 4 && (
              <CardLayout title="退回理由">
                <p>{refuseAcceptReason}</p>
              </CardLayout>
            )}
            <DisputeListCard id={id} status={status} />
          </Col>
          <Col span={8}>
            <CourtInfoCard courtId={courtId} />
            <Card title="案件进度日志">
              <p style={{ textAlign: 'center' }}>暂无数据</p>
            </Card>
          </Col>
        </Row>
        {status === 4 && (
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" onClick={() => this.onSubmit()}>
                提交
              </Button>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

export default LawsuitCaseEditor;
