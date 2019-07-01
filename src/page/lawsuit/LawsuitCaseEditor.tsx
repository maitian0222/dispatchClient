import React from 'react';

import { Descriptions, Row, Col, Card } from 'antd';
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

  public componentWillMount() {
    console.log(this.props.match.params.id);
    console.log(this.props.location.state);
  }

  public render() {
    const contactsId = this.props.location.state.contactsId || '';
    const courtId = this.props.location.state.courtId || '';
    const id = this.props.match.params.id;
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
