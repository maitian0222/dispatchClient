import React from 'react';
import { Icon, Row, Col, Card } from 'antd';
import moment from 'moment';
class NewsFast extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      IconStyle: { float: 'right', visibility: 'hidden' },
    };
  }

  private onDelete = (id: string) => {
    console.log(id);
  };
  private handleMouseOver = () => {
    this.setState({
      IconStyle: { float: 'right' },
    });
  };
  private handleMouseOut = () => {
    this.setState({
      IconStyle: { float: 'right', visibility: 'hidden' },
    });
  };

  public render() {
    return (
      <Row>
        <Card
          onMouseOver={() => this.handleMouseOver()}
          onMouseLeave={() => this.handleMouseOut()}
          style={{ width: 200, cursor: 'pointer' }}
          size="small"
        >
          <Col span={23}>
            <div
              style={{
                width: '100%',
                wordBreak: 'break-all',
                wordWrap: 'break-word',
                overflow: 'hidden',
                display: 'inline-block',
              }}
            >
              {this.props.news.content}
            </div>
            <div style={{ textAlign: 'right' }}>{this.props.news.time}</div>
          </Col>
          <Col span={1}>
            <Icon
              style={this.state.IconStyle}
              type="close"
              onClick={() => this.onDelete(this.props.news.id)}
            />
          </Col>
        </Card>
      </Row>
    );
  }
}
export default NewsFast;
