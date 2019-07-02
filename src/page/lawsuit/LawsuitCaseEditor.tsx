import React from 'react';

import { Descriptions, Row, Col, Card, Button } from 'antd';
import http from '@sinoui/http';
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
    //
    alert('案件提交！待处理！');
  }

  public render() {
    // 联系人id
    const contactsId = this.props.location.state.contactsId || '';
    // 法院id
    const courtId = this.props.location.state.courtId || '';
    // 案件状态id
    const status = this.props.location.state.status || '';
    // 诉讼案件id
    const id = this.props.match.params.id;
    return (
      <div className={styles['lawsuit-layout']} style={{ margin: '20px' }}>
        <Row gutter={20}>
          <Col span={16}>
            <CaseInfoCard id={id} />
            <ContactCard contactsId={contactsId} />
            <DisputeListCard id={id} status={status}/>
          </Col>
          <Col span={8}>
            <CourtInfoCard courtId={courtId} />
            <Card title="案件进度日志">
              <p style={{ textAlign: 'center' }}>暂无数据</p>
            </Card>
          </Col>
        </Row>
        {status === 4 && <Row>
          <Col span={24} style={{textAlign: 'right'}}>
             <Button type="primary" onClick={() => this.onSubmit()}>提交</Button>
          </Col>
          </Row>}
      </div>
    );
  }
}

export default LawsuitCaseEditor;
