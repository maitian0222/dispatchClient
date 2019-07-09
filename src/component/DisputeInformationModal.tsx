import * as React from 'react';
import { Descriptions, Modal, Divider, Icon } from 'antd';
import http from '@sinoui/http';
import UpLoadModule from './UpLoad';
interface Props {
  visible: boolean; // modal的显示或隐藏
  id: string; // 纠纷id
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
  private getData = (id: string) => {
    // 根据纠纷id获取纠纷详情
    http
      .get(`/biz/dispute/${id}`)
      .then((result) => {
        this.setState({
          editItem: result,
          respondentType: result.respondentType,
        });
      })
      .catch((e) => {
        message.error(e.response.data.message);
      });
  };

  public componentDidMount() {
    this.getData(this.props.id);
  }
  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.id && nextProps.id !== this.props.id) {
      this.getData(nextProps.id);
    }
  }
  public render() {
    const { visible, onClose } = this.props;
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
            <UpLoadModule
              action="/oss/attachment/fileupload"
              listType="picture-card"
              upLoadNumber="1"
              files={editItem && editItem.idFront}
              disabled
            >
              <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传文件</div>
              </div>
            </UpLoadModule>
          </Descriptions.Item>
          <Descriptions.Item label="身份证反面">
            <UpLoadModule
              action="/oss/attachment/fileupload"
              listType="picture-card"
              upLoadNumber="1"
              files={editItem && editItem.idReverse}
              disabled
            >
              <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传文件</div>
              </div>
            </UpLoadModule>
          </Descriptions.Item>
          <Descriptions.Item label="营业执照">
            <UpLoadModule
              action="/oss/attachment/fileupload"
              listType="picture-card"
              upLoadNumber="1"
              files={editItem && editItem.businessLicense}
              disabled
            >
              <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传文件</div>
              </div>
            </UpLoadModule>
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
            <UpLoadModule
              action="/oss/attachment/fileupload"
              listType="picture"
              upLoadNumber="1"
              files={editItem.evidence}
              disabled
            />
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    );
  }
}
export default DisputeInformation;
