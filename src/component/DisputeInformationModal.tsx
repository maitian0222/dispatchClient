import * as React from 'react';
import { Descriptions, Modal, Divider, Icon } from 'antd';
import http from '@sinoui/http';
import UpLoadModule from './UpLoad';
interface Props {
  visible: boolean; // modal的显示或隐藏
  id: string; // 纠纷id
  type: 'edit' | 'view'; // 修改或查看
  onClose: () => void;
}
class DisputeInformation extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      editItem: {},
      respondentType: 1,
    };
  }
  public componentDidMount() {
    // 根据纠纷id获取纠纷详情${this.props.id}
    http
      .get(`/biz/dispute/${this.props.id}`)
      .then((result) => {
        this.setState({
          editItem: result,
          respondentType: result.respondentType,
        });
      })
      .catch((e) => {
        message.error(e.response.data.message);
      });
  }
  public render() {
    const { visible, type, onClose } = this.props;
    const { loading, editItem } = this.state;
    const naturalPerson = () => {
      return (
        <Descriptions
          title="被告基本信息"
          bordered
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="案件类型">
            {editItem.caseType}
          </Descriptions.Item>
          <Descriptions.Item label="递交法院">
            {editItem.courtId}
          </Descriptions.Item>
          <Descriptions.Item label="被告主体人">{'自然人'}</Descriptions.Item>
          <Descriptions.Item label="姓名">
            {editItem.peopleName}
          </Descriptions.Item>
          <Descriptions.Item label="性别">
            {editItem.peopleSex}
          </Descriptions.Item>
          <Descriptions.Item label="身份证号">
            {editItem.peopleIdNumber}
          </Descriptions.Item>
          <Descriptions.Item label="民族">
            {editItem.peopleNationality}
          </Descriptions.Item>
          <Descriptions.Item label="邮箱">{editItem.email}</Descriptions.Item>
          <Descriptions.Item label="手机">{editItem.phone}</Descriptions.Item>
          <Descriptions.Item label="固话">
            {editItem.fixedPhone}
          </Descriptions.Item>
          <Descriptions.Item label="地址">
            {editItem.peopleAddress}
          </Descriptions.Item>
          <Descriptions.Item label="身份证正面">
            {/* {editItem.idFront} */}
          </Descriptions.Item>
          <Descriptions.Item label="身份证反面">
            {/* {editItem.idReverse} */}
          </Descriptions.Item>
        </Descriptions>
      );
    };
    const legalPerson = () => {
      return (
        <Descriptions
          title="被告基本信息"
          bordered
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="案件类型">
            {editItem.caseType}
          </Descriptions.Item>
          <Descriptions.Item label="递交法院">
            {editItem.courtId}
          </Descriptions.Item>
          <Descriptions.Item label="被告主体人">{'法人'}</Descriptions.Item>
          <Descriptions.Item label="公司名称">
            {editItem.companyName}
          </Descriptions.Item>
          <Descriptions.Item label="营业执照号">
            {editItem.companyNumber}
          </Descriptions.Item>
          <Descriptions.Item label="注册地址">
            {editItem.registeredAddress}
          </Descriptions.Item>
          <Descriptions.Item label="单位地址">
            {editItem.postalAddress}
          </Descriptions.Item>
          <Descriptions.Item label="法人代表">
            {editItem.legalPeopleName}
          </Descriptions.Item>
          <Descriptions.Item label="证件类型">
            {editItem.certificateType}
          </Descriptions.Item>
          <Descriptions.Item label="证件号">
            {editItem.certificateId}
          </Descriptions.Item>
          <Descriptions.Item label="手机">{editItem.phone}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{editItem.email}</Descriptions.Item>
          <Descriptions.Item label="固话" span={3}>
            {editItem.fixedPhone}
          </Descriptions.Item>
          <Descriptions.Item label="身份证正面">
            {/* {editItem.idFront} */}
            {editItem.idFront ? (
              <div class="ant-upload-list ant-upload-list-picture-card">
                <div class="ant-upload-list-item ant-upload-list-item-done">
                  <div class="ant-upload-list-item-info">
                    <span>
                      <a
                        class="ant-upload-list-item-thumbnail"
                        href={
                          'http://192.168.80.144:8082/oss/attachment/download?id=' +
                          editItem.idFront[0].id
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={
                            'http://192.168.80.144:8082/oss/attachment/download?id=' +
                            editItem.idFront[0].id
                          }
                          alt="身份证正面.jpg"
                        />
                      </a>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        class="ant-upload-list-item-name"
                        title="身份证正面.jpg"
                        href={
                          'http://192.168.80.144:8082/oss/attachment/download?id=' +
                          editItem.idFront[0].id
                        }
                      >
                        身份证正面.jpg
                      </a>
                    </span>
                    <span class="ant-upload-list-item-actions">
                      <a
                        href={
                          'http://192.168.80.144:8082/oss/attachment/download?id=' +
                          editItem.idFront[0].id
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        title="预览文件"
                      >
                        <Icon type="eye" />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
          </Descriptions.Item>
          <Descriptions.Item label="身份证反面">
            {/* {editItem.idReverse} */}
            {editItem.idReverse ? (
              <div class="ant-upload-list ant-upload-list-picture-card">
                <div class="ant-upload-list-item ant-upload-list-item-done">
                  <div class="ant-upload-list-item-info">
                    <span>
                      <a
                        class="ant-upload-list-item-thumbnail"
                        href={
                          'http://192.168.80.144:8082/oss/attachment/download?id=' +
                          editItem.idReverse[0].id
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={
                            'http://192.168.80.144:8082/oss/attachment/download?id=' +
                            editItem.idReverse[0].id
                          }
                          alt="身份证反面.jpg"
                        />
                      </a>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        class="ant-upload-list-item-name"
                        title="身份证反面.jpg"
                        href={
                          'http://192.168.80.144:8082/oss/attachment/download?id=' +
                          editItem.idReverse[0].id
                        }
                      >
                        身份证反面.jpg
                      </a>
                    </span>
                    <span class="ant-upload-list-item-actions">
                      <a
                        href={
                          'http://192.168.80.144:8082/oss/attachment/download?id=' +
                          editItem.idReverse[0].id
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        title="预览文件"
                      >
                        <Icon type="eye" />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
          </Descriptions.Item>
          <Descriptions.Item label="营业执照">
            {/* {editItem.businessLicense} */}
            {editItem.businessLicense ? (
              <div class="ant-upload-list ant-upload-list-picture-card">
                <div class="ant-upload-list-item ant-upload-list-item-done">
                  <div class="ant-upload-list-item-info">
                    <span>
                      <a
                        class="ant-upload-list-item-thumbnail"
                        href={
                          'http://192.168.80.144:8082/oss/attachment/download?id=' +
                          editItem.businessLicense[0].id
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={
                            'http://192.168.80.144:8082/oss/attachment/download?id=' +
                            editItem.businessLicense[0].id
                          }
                          alt="营业执照.jpg"
                        />
                      </a>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        class="ant-upload-list-item-name"
                        title="营业执照.jpg"
                        href={
                          'http://192.168.80.144:8082/oss/attachment/download?id=' +
                          editItem.businessLicense[0].id
                        }
                      >
                        营业执照.jpg
                      </a>
                    </span>
                    <span class="ant-upload-list-item-actions">
                      <a
                        href={
                          'http://192.168.80.144:8082/oss/attachment/download?id=' +
                          editItem.businessLicense[0].id
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        title="预览文件"
                      >
                        <Icon type="eye" />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
          </Descriptions.Item>
        </Descriptions>
      );
    };
    return (
      <Modal
        visible={visible}
        title="纠纷详情"
        maskClosable={false}
        width={1000}
        keyboard={false}
        destoryOnClose={true}
        onCancel={() => {
          onClose();
          this.setState({
            loading: false,
          });
        }}
        footer={false}
      >
        {this.state.respondentType === 1 ? legalPerson() : naturalPerson()}
        <Divider />
        <Descriptions
          title="违约情况"
          bordered
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="合同编号">
            {editItem.contractNumber}
          </Descriptions.Item>
          <Descriptions.Item label="购买产品">
            {editItem.productName}
          </Descriptions.Item>
          <Descriptions.Item label="日利率">
            {editItem.annualInterestRate}
          </Descriptions.Item>
          <Descriptions.Item label="标的金额">
            {editItem.amountMoney}
          </Descriptions.Item>
          <Descriptions.Item label="借款日期">
            {editItem.borrowDateBegin}
          </Descriptions.Item>
          <Descriptions.Item label="截止日期">
            {editItem.borrowDateEnd}
          </Descriptions.Item>
          <Descriptions.Item label="逾期日期">
            {editItem.overdueDate}
          </Descriptions.Item>
          <Descriptions.Item label="清偿日">
            {editItem.liquidationDate}
          </Descriptions.Item>
          <Descriptions.Item label="逾期金额">
            {editItem.overdueMoney}
          </Descriptions.Item>
          <Descriptions.Item label="欠息">
            {editItem.owingInterests}
          </Descriptions.Item>
          <Descriptions.Item label="合计">{editItem.total}</Descriptions.Item>
          <Descriptions.Item label="事实与理由">
            {editItem.reason}
          </Descriptions.Item>
          <Descriptions.Item label="证据">
            {/* {editItem.v.id} */}
            {/* <UpLoadModule
              action="/oss/attachment/fileupload"
              listType="picture"
              upLoadNumber="1"
              files={editItem.evidence}
            /> */}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    );
  }
}
export default DisputeInformation;
