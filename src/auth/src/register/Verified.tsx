import * as React from 'react';
import { Button, Select, Radio, Row, Col, Form, Tag, Checkbox } from 'antd';
import DataCertification from './DataCertification';
const styles = require('../css/Register.css');
class Verified extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 1,
      certificationStatus: 0,
    };
  }
  public onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  public certification = () => {
    if (this.state.value === 2) {
      console.log('显示资料认证');
      this.setState({
        certificationStatus: 1,
      });
    }
  };
  public render() {
    return (
      <div className={styles.verifiedContent}>
        {this.state.certificationStatus === 1 ? (
          <DataCertification next={() => this.props.next()} />
        ) : (
          <div>
            <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
              <Col span={6}>身份类型:</Col>
              <Col span={18}>
                <Tag color="blue">我是法人</Tag>
              </Col>
            </Row>
            <Row>
              <Col span={6}>认证方式:</Col>
              <Col span={18}>
                <Radio.Group onChange={this.onChange} value={this.state.value}>
                  <Radio value={1}>支付宝认证</Radio>
                  <Radio value={2}>资料认证</Radio>
                </Radio.Group>
              </Col>
            </Row>
            {this.state.value === 1 ? (
              <Row>
                <Col span={24}>
                  <Checkbox>
                    我同意把支付宝身份认证信息提供给金融纠纷解决平台
                  </Checkbox>
                  <a href="#">查看详情</a>
                  <br />
                  <p>本次信息同步是指：</p>
                  <p>
                    1、 仅提供基础身份信息：姓名/企业或其他组织名称、证件号码。
                  </p>
                  <p>2、 不提供身份信息以外的资金、信用、消费和经营信息。</p>
                  <p>
                    3、
                    不向第三方机构、政府和个人提供信息。依据法律规定，严格保护公民隐私。
                  </p>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col span={6}>资料认证说明：</Col>
                <Col span={18}>
                  <p>
                    详细要求查看平台线下认证指引：金融纠纷解决平台资料认证指引
                  </p>
                  <p>1.营业执照彩色扫描件，并加盖公章，电子版</p>
                  <p>2.法人代表人身份证彩色扫描件，并加盖公章，电子版</p>
                </Col>
              </Row>
            )}
            <Row>
              <Col span={24}>
                <Button type="primary" onClick={this.certification}>
                  马上认证
                </Button>
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}
const VerifiedForm = Form.create({ name: 'Verified' })(Verified);

export default VerifiedForm;
