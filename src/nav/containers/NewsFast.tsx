import React from 'react';
import { Icon, Row, Col, Card, Modal } from 'antd';
import { getInformation } from './apis';
import moment from 'moment';
class NewsFast extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      IconStyle: { float: 'right', visibility: 'hidden' },
      CardStyle: { width: 200 },
      visible: false,
    };
  }

  public openModel = (id: string) => {
    getInformation(id).then((result) => {
      Modal.info({
        title: '消息详情',
        content: (
          <div>
            <Row>
              <Col span={6}>
                <p>消息标题：</p>
              </Col>
              <Col span={18}>{result.data.title}</Col>
            </Row>
            <Row>
              <Col span={6}>
                <p>消息内容：</p>
              </Col>
              <Col span={18}>{result.data.content}</Col>
            </Row>
            <Row>
              <Col span={6}>
                <p>时间：</p>
              </Col>
              <Col span={18}>{result.data.createTime}</Col>
            </Row>
          </div>
        ),
        onOk() {
          console.log(111111);
        },
      });
    });
  };

  private onDelete = (id: string) => {
    console.log(id);
  };
  private handleMouseOver = () => {
    this.setState({
      IconStyle: { float: 'right' },
      CardStyle: { width: 200, backgroundColor: '#ddd' },
    });
  };
  private handleMouseOut = () => {
    this.setState({
      IconStyle: { float: 'right', visibility: 'hidden' },
      CardStyle: { width: 200 },
    });
  };

  public render() {
    return (
      <Row>
        <Card
          onMouseOver={() => this.handleMouseOver()}
          onMouseLeave={() => this.handleMouseOut()}
          hoverable
          style={this.state.CardStyle}
          size="small"
        >
          <Col span={23}>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                this.openModel(this.props.news.id);
              }}
            >
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
            </div>
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
// function NewsFastModel(props) {
//   const { visible, onClose } = props;
//   return (
//     <Modal
//       visible={visible}
//       title="消息详情"
//       maskClosable={false}
//       width={600}
//       keyboard={false}
//       destoryOnClose={true}
//       onCancel={onClose}
//     >
//       <div />
//     </Modal>
//   );
// }
export default NewsFast;
