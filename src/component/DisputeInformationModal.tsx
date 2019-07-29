import * as React from 'react';
import { Descriptions, Modal, Divider, Icon, message } from 'antd';
import http from '@sinoui/http';
import UpLoadModule from './UpLoad';
import moment from 'moment';

interface Props {
  visible: boolean; // modal的显示或隐藏
  id: string; // 纠纷id
  onClose: () => void;
}

const formatRmb = (value: string) => {
  return value !== undefined && value !== null ? `￥${value}` : '';
};
class DisputeInformation extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      editItem: {},
    };
  }
  private getData = (id: string) => {
    // 根据纠纷id获取纠纷详情
    http.get(`/biz/dispute/${id}`).then((result) => {
      this.setState({
        editItem: result,
      });
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

  private naturalPerson = (editItem) => {
    return (
      <Descriptions
        title="被告基本信息"
        bordered
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
      >
        <Descriptions.Item label="案件类型">
          {editItem.caseTypeName}
        </Descriptions.Item>
        <Descriptions.Item label="递交法院" span={2}>
          {editItem.courtName}
        </Descriptions.Item>
        <Descriptions.Item label="被告主体人">{'自然人'}</Descriptions.Item>
        <Descriptions.Item label="姓名">
          {editItem.peopleName}
        </Descriptions.Item>
        <Descriptions.Item label="性别">
          {editItem.peopleSex === 0 ? '男' : '女'}
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
        <Descriptions.Item label="地址" span={3}>
          {editItem.peopleAddress}
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
  private legalPerson = (editItem) => {
    return (
      <Descriptions
        title="被告基本信息"
        bordered
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
      >
        <Descriptions.Item label="案件类型">
          {editItem.caseTypeName}
        </Descriptions.Item>
        <Descriptions.Item label="递交法院" span={2}>
          {editItem.courtName}
        </Descriptions.Item>
        <Descriptions.Item label="被告主体人">{'法人'}</Descriptions.Item>
        <Descriptions.Item label="公司名称" span={2}>
          {editItem.companyName}
        </Descriptions.Item>
        <Descriptions.Item label="营业执照号">
          {editItem.companyNumber}
        </Descriptions.Item>
        <Descriptions.Item label="注册地址" span={2}>
          {editItem.registeredAddress}
        </Descriptions.Item>
        <Descriptions.Item label="单位地址" span={3}>
          {editItem.postalAddress}
        </Descriptions.Item>
        <Descriptions.Item label="法人代表">
          {editItem.legalPeopleName}
        </Descriptions.Item>
        <Descriptions.Item label="证件类型">
          {editItem.certificateTypeName}
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
  public render() {
    const { visible, onClose } = this.props;
    const { loading, editItem } = this.state;

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
        {this.props.respondentType === 1
          ? this.legalPerson(editItem)
          : this.naturalPerson(editItem)}

        <Divider />
        <Descriptions
          title="违约情况"
          bordered
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="合同编号">
            {editItem.contractNumber}
          </Descriptions.Item>
          <Descriptions.Item label="合同名称" span={2}>
            {editItem.contractName}
          </Descriptions.Item>
          <Descriptions.Item label="购买产品">
            {editItem.productName}
          </Descriptions.Item>
          <Descriptions.Item label="日利率">
            {editItem.annualInterestRate}
          </Descriptions.Item>
          <Descriptions.Item label="标的金额">
            {formatRmb(editItem.amountMoney)}
          </Descriptions.Item>
          <Descriptions.Item label="借款日期">
            {moment(editItem.borrowDateBegin).format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="截止日期">
            {moment(editItem.borrowDateEnd).format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="逾期日期">
            {moment(editItem.overdueDate).format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="清偿日">
            {moment(editItem.liquidationDate).format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="逾期金额" span={2}>
            {formatRmb(editItem.overdueMoney)}
          </Descriptions.Item>
          <Descriptions.Item label="复利">
            {formatRmb(editItem.compoundInterest)}
          </Descriptions.Item>
          <Descriptions.Item label="罚息">
            {formatRmb(editItem.penaltyInterest)}
          </Descriptions.Item>
          <Descriptions.Item label="欠息">
            {formatRmb(editItem.owingInterests)}
          </Descriptions.Item>
          <Descriptions.Item label="合计" span={3}>
            {formatRmb(editItem.total)}
          </Descriptions.Item>

          <Descriptions.Item label="证据">
            {/* {editItem.v.id} */}
            <UpLoadModule
              action="/oss/attachment/fileupload"
              listType="text"
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
