import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import ContactCard from '../lawsuit/component/ContactCard';
import CaseInfoCard from '../lawsuit/component/CaseInfoCard';
import DisputeListCard from '../lawsuit/component/DisputeListCard';
import CourtInfoCard from '../lawsuit/component/CourtInfoCard';
import styles from '../lawsuit/Lawsuit.css';
class LawsuitCaseEditor extends React.Component<Props, State> {
  private props: any;
  private state: any;
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  public render() {
    // 联系人id 法院id 案件状态 退回理由
    const {
      contactsId,
      courtId,
      status,
      checkFailReason,
      id,
    } = this.props.editItme;
    // 诉讼案件id
    return (
      <div className={styles['lawsuit-layout']} style={{ margin: '20px' }}>
        <Row gutter={20}>
          <Col span={16}>
            <CaseInfoCard id={id} />
            <ContactCard contactsId={contactsId} />
            <DisputeListCard id={id} />
          </Col>
          <Col span={8}>
            <CourtInfoCard courtId={courtId} />
            <Card title="案件进度日志">
              <p style={{ textAlign: 'center' }}>暂无数据</p>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default LawsuitCaseEditor;
