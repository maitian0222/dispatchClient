import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import {
  Form,
  Input,
  Select,
  Typography,
  Row,
  Col,
  Radio,
  Divider,
  DatePicker,
  Icon,
  InputNumber,
} from 'antd';
import UpLoadModule from '../../component/UpLoad';
import DictionarySelect from '../../component/DictionarySelect';
import CourtSelect from '../../component/CourtSelect';
import moment from 'moment';

const { Title, Paragraph } = Typography;

interface Props {
  form: FormComponentProps;
  // tslint:disable-next-line:no-any
  getFieldDecorator: any;
  // tslint:disable-next-line:no-any
  initialValues: any;
}

class EntanglementForm extends React.Component<Props, State> {
  private props: any;
  private state: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      content: [],
      fileList: [],
      respondentType: 0,
      certificateType: '',
    };
  }

  public componentDidMount() {
    this.setState({
      respondentType: this.props.initialValues.respondentType,
      certificateType: this.props.initialValues.certificateType,
    });
  }

  public componentWillReceiveProps(nextProps) {
    if (
      nextProps.initialValues.respondentType !==
      this.props.initialValues.respondentType
    ) {
      this.setState({
        respondentType: nextProps.initialValues.respondentType,
      });
    }
  }

  public render() {
    const { getFieldDecorator, initialValues } = this.props;

    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 16 },
    };

    /**
     * 自然人表单
     */
    const naturalPerson = () => {
      return (
        <React.Fragment>
          <Row>
            <Col span={8}>
              <Form.Item label="姓名">
                {getFieldDecorator('peopleName', {
                  rules: [
                    {
                      required: true,
                      message: '请填写姓名',
                    },
                  ],
                  initialValue: initialValues && initialValues.peopleName,
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="性别">
                {getFieldDecorator('peopleSex', {
                  rules: [
                    {
                      required: true,
                      message: '请选择性别',
                    },
                  ],
                  initialValue: initialValues
                    ? initialValues.peopleSex
                      ? initialValues.peopleSex
                      : '0'
                    : '0',
                })(
                  <Radio.Group>
                    <Radio value="0">男</Radio>
                    <Radio value="1">女</Radio>
                  </Radio.Group>,
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="身份证号">
                {getFieldDecorator('peopleIdNumber', {
                  rules: [
                    {
                      required: true,
                      pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/,
                      message: '请输入正确的身份证号',
                    },
                  ],
                  initialValue: initialValues && initialValues.peopleIdNumber,
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="民族">
                {getFieldDecorator('peopleNationality', {
                  rules: [
                    {
                      required: true,
                      message: '请填写民族',
                    },
                  ],
                  initialValue:
                    initialValues && initialValues.peopleNationality,
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="邮箱">
                {getFieldDecorator('email', {
                  rules: [
                    {
                      pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                      message: '请输入正确的邮箱地址',
                    },
                  ],
                  initialValue: initialValues && initialValues.email,
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="手机">
                {getFieldDecorator('phone', {
                  rules: [
                    {
                      required: true,
                      pattern: /^1[3456789]\d{9}$/,
                      message: '请输入正确的手机号码',
                    },
                  ],
                  initialValue: initialValues && initialValues.phone,
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="固话">
                {getFieldDecorator('fixedPhone', {
                  rules: [
                    {
                      pattern: /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/,
                      message: '请填写正确的固话',
                    },
                  ],
                  initialValue: initialValues ? initialValues.fixedPhone : '',
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 18 }}
                label="地址"
              >
                {getFieldDecorator('peopleAddress', {
                  rules: [
                    {
                      required: true,
                      message: '请填写地址',
                    },
                  ],
                  initialValue: initialValues
                    ? initialValues.peopleAddress
                    : '',
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
        </React.Fragment>
      );
    };

    //  根据类型验证
    const certificateIdValidator = (rule: any, value: any, callback: any) => {
      const { getFieldValue } = this.props.form;

      switch (getFieldValue('certificateType')) {
        case 'ID_CARD':
          const IdCard = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;
          if (!IdCard.test(value)) {
            callback('请输入正确的身份证号');
          } else {
            callback();
          }
          break;
        case 'PASSPORT':
          const passport = /^1[45][0-9]{7}|([P|p|S|s]\d{7})|([S|s|G|g]\d{8})|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8})|([H|h|M|m]\d{8，10})$/;
          if (!passport.test(value)) {
            callback('请输入正确的护照');
          } else {
            callback();
          }
          break;
        default:
          callback();
      }

      // 必须总是返回一个 callback，否则 validateFields 无法响应
      // callback();
    };

    /**
     * 法人
     */
    const legalPerson = () => {
      return (
        <React.Fragment>
          <Row>
            <Col span={8}>
              <Form.Item label="公司名称">
                {getFieldDecorator('companyName', {
                  rules: [
                    {
                      required: true,
                      message: '请填写公司名称',
                    },
                  ],
                  initialValue: initialValues && initialValues.companyName,
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="营业执照号">
                {getFieldDecorator('companyNumber', {
                  rules: [
                    {
                      required: true,
                      message: '请填写营业执照号',
                    },
                  ],
                  initialValue: initialValues && initialValues.companyNumber,
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="注册地址">
                {getFieldDecorator('registeredAddress', {
                  rules: [
                    {
                      required: true,
                      message: '请填写公司注册地址',
                    },
                  ],
                  initialValue:
                    initialValues && initialValues.registeredAddress,
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="单位地址">
                {getFieldDecorator('postalAddress', {
                  rules: [
                    {
                      required: true,
                      message: '请填写单位地址',
                    },
                  ],
                  initialValue: initialValues && initialValues.postalAddress,
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={8} />
            <Col span={8} />
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="法人代表">
                {getFieldDecorator('legalPeopleName', {
                  rules: [
                    {
                      required: true,
                      message: '请填写法人代表',
                    },
                  ],
                  initialValue: initialValues
                    ? initialValues.legalPeopleName
                    : '',
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="证件类型">
                {getFieldDecorator('certificateType', {
                  rules: [
                    {
                      required: true,
                      message: '请选择证件类型',
                    },
                  ],
                  initialValue: initialValues
                    ? initialValues.certificateType
                    : '',
                })(<DictionarySelect mode="dan" fieldCode="ID_TYPE" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="证件号">
                {getFieldDecorator('certificateId', {
                  rules: [
                    {
                      required: true,
                      message: '请填写证件号',
                    },
                    {
                      validator: certificateIdValidator,
                    },
                  ],
                  initialValue: initialValues
                    ? initialValues.certificateId
                    : '',
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="手机">
                {getFieldDecorator('phone', {
                  rules: [
                    {
                      required: true,
                      message: '请填写手机',
                    },
                  ],
                  initialValue: initialValues ? initialValues.phone : '',
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="邮箱">
                {getFieldDecorator('email', {
                  rules: [
                    {
                      pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                      message: '请输入正确的邮箱地址',
                    },
                  ],
                  initialValue: initialValues ? initialValues.email : '',
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="固话">
                {getFieldDecorator('fixedPhone', {
                  initialValue: initialValues ? initialValues.fixedPhone : '',
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
        </React.Fragment>
      );
    };

    return (
      <div
        style={{
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Form {...formItemLayout} style={{ width: '1000px' }}>
          <Typography>
            <Title level={4}>被告基本信息</Title>
          </Typography>
          <Row>
            <Col span={8}>
              <Form.Item label="案件类型">
                {getFieldDecorator('caseType', {
                  rules: [
                    {
                      required: true,
                      message: '请选择案件类型',
                    },
                  ],
                  initialValue: initialValues ? initialValues.caseType : '',
                })(<DictionarySelect mode="false" fieldCode="CASE_TYPE" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="递交法院">
                {getFieldDecorator('courtId', {
                  rules: [
                    {
                      required: true,
                      message: '请选择法院',
                    },
                  ],
                  initialValue: initialValues ? initialValues.courtId : '',
                })(<CourtSelect />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="被告主体人">
                {getFieldDecorator('respondentType', {
                  rules: [
                    {
                      required: true,
                      message: '请选择被告人主体',
                    },
                  ],
                  initialValue: initialValues
                    ? initialValues.respondentType
                      ? initialValues.respondentType
                      : 0
                    : 0,
                })(
                  <Radio.Group
                    name="respondentType"
                    onChange={(e) => {
                      this.setState({
                        respondentType: e.target.value,
                      });
                      this.props.form.resetFields({ ...initialValues });
                    }}
                  >
                    <Radio value={0}>自然人</Radio>
                    <Radio value={1}>法人</Radio>
                  </Radio.Group>,
                )}
              </Form.Item>
            </Col>
          </Row>
          {this.state.respondentType === 1 ? legalPerson() : naturalPerson()}
          <Row>
            <Col span={8}>
              <Form.Item label="身份证正面">
                {getFieldDecorator('idFront', {
                  rules: [
                    {
                      required: true,
                      message: '请上传身份证正面',
                    },
                  ],
                })(
                  <UpLoadModule
                    action="/oss/attachment/fileupload"
                    listType="picture-card"
                    upLoadNumber="1"
                    files={initialValues && initialValues.idFront}
                  >
                    <div>
                      <Icon type="plus" />
                      <div className="ant-upload-text">上传文件</div>
                    </div>
                  </UpLoadModule>,
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="身份证反面">
                {getFieldDecorator('idReverse', {
                  rules: [
                    {
                      required: true,
                      message: '请上传身份证反面',
                    },
                  ],
                })(
                  <UpLoadModule
                    action="/oss/attachment/fileupload"
                    listType="picture-card"
                    upLoadNumber="1"
                    files={initialValues && initialValues.idReverse}
                  >
                    <div>
                      <Icon type="plus" />
                      <div className="ant-upload-text">上传文件</div>
                    </div>
                  </UpLoadModule>,
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                style={
                  this.state.respondentType === 1
                    ? {}
                    : { visibility: 'hidden' }
                }
                label="营业执照"
              >
                {getFieldDecorator('businessLicense', {
                  rules: [
                    {
                      required: this.state.respondentType === 1 ? true : false,
                      message: '请上传营业执照',
                    },
                  ],
                })(
                  <UpLoadModule
                    action="/oss/attachment/fileupload"
                    listType="picture-card"
                    upLoadNumber="1"
                    files={initialValues && initialValues.businessLicense}
                  >
                    <div>
                      <Icon type="plus" />
                      <div className="ant-upload-text">上传文件</div>
                    </div>
                  </UpLoadModule>,
                )}
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Typography>
            <Title level={4}>违约情况</Title>
          </Typography>
          <Row>
            <Col span={8}>
              <Form.Item label="合同编号">
                {getFieldDecorator('contractNumber', {
                  rules: [
                    {
                      required: true,
                      message: '请填写合同编号',
                    },
                  ],
                  initialValue: initialValues && initialValues.contractNumber,
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="购买产品">
                {getFieldDecorator('productName', {
                  rules: [
                    {
                      required: true,
                      message: '请填写购买产品',
                    },
                  ],
                  initialValue: initialValues && initialValues.productName,
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="日利率">
                {getFieldDecorator('annualInterestRate', {
                  rules: [
                    {
                      required: true,
                      message: '请填写日利率',
                    },
                  ],
                  initialValue:
                    initialValues && initialValues.annualInterestRate,
                })(
                  <InputNumber
                    defaultValue={0}
                    min={0}
                    max={100}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace('%', '')}
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="标的金额">
                {getFieldDecorator('amountMoney', {
                  rules: [
                    {
                      required: true,
                      message: '请填写标的金额',
                    },
                  ],
                  initialValue: initialValues && initialValues.amountMoney,
                })(
                  <InputNumber
                    defaultValue={0}
                    min={0}
                    precision={2}
                    formatter={(value) => `￥${value}`}
                    parser={(value) => value.replace('￥', '')}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="借款日期">
                {getFieldDecorator('borrowDateBegin', {
                  rules: [
                    {
                      required: true,
                      message: '请选择借款日期',
                    },
                  ],
                  initialValue:
                    initialValues &&
                    initialValues.borrowDateBegin &&
                    moment(initialValues.borrowDateBegin, 'YYYY-MM-DD'),
                })(<DatePicker format="YYYY-MM-DD" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="截止日期">
                {getFieldDecorator('borrowDateEnd', {
                  rules: [
                    {
                      required: true,
                      message: '请选择截止日期',
                    },
                  ],
                  initialValue:
                    initialValues &&
                    initialValues.borrowDateEnd &&
                    moment(initialValues.borrowDateEnd, 'YYYY-MM-DD'),
                })(<DatePicker format="YYYY-MM-DD" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="逾期日期">
                {getFieldDecorator('overdueDate', {
                  rules: [
                    {
                      required: true,
                      message: '请选择逾期日期',
                    },
                  ],
                  initialValue:
                    initialValues &&
                    initialValues.overdueDate &&
                    moment(initialValues.overdueDate, 'YYYY-MM-DD'),
                })(<DatePicker format="YYYY-MM-DD" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="清偿日">
                {getFieldDecorator('liquidationDate', {
                  rules: [
                    {
                      required: true,
                      message: '请选择清偿日',
                    },
                  ],
                  initialValue:
                    initialValues &&
                    initialValues.liquidationDate &&
                    moment(initialValues.liquidationDate, 'YYYY-MM-DD'),
                })(<DatePicker format="YYYY-MM-DD" />)}
              </Form.Item>
            </Col>
            <Col span={8} />
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="逾期金额">
                {getFieldDecorator('overdueMoney', {
                  rules: [
                    {
                      required: true,
                      message: '请填写逾期金额',
                    },
                  ],
                  initialValue: initialValues && initialValues.overdueMoney,
                })(
                  <InputNumber
                    defaultValue={0}
                    min={0}
                    precision={2}
                    formatter={(value) => `￥${value}`}
                    parser={(value) => value.replace('￥', '')}
                    onChange={(value) => {
                      const owingInterests = this.props.form.getFieldValue(
                        'owingInterests',
                      );
                      if (owingInterests) {
                        this.props.form.setFieldsValue({
                          total: owingInterests + value,
                        });
                      }
                    }}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="欠息">
                {getFieldDecorator('owingInterests', {
                  rules: [
                    {
                      required: true,
                      message: '请填写欠息',
                    },
                  ],
                  initialValue: initialValues && initialValues.owingInterests,
                })(
                  <InputNumber
                    defaultValue={0}
                    min={0}
                    precision={2}
                    formatter={(value) => `￥${value}`}
                    parser={(value) => value.replace('￥', '')}
                    onChange={(value) => {
                      const overdueMoney = this.props.form.getFieldValue(
                        'overdueMoney',
                      );
                      if (overdueMoney) {
                        this.props.form.setFieldsValue({
                          total: overdueMoney + value,
                        });
                      }
                    }}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="合计">
                {getFieldDecorator('total', {
                  rules: [
                    {
                      required: true,
                      message: '请填写合计',
                    },
                  ],
                  initialValue: initialValues && initialValues.total,
                })(
                  <InputNumber
                    readOnly
                    defaultValue={0}
                    min={0}
                    precision={2}
                    formatter={(value) => `￥${value}`}
                    parser={(value) => value.replace('￥', '')}
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 18 }}
                label="事实与理由"
              >
                {getFieldDecorator('reason', {
                  rules: [
                    {
                      required: true,
                      message: '请填写事实与理由',
                    },
                  ],
                  initialValue: initialValues && initialValues.reason,
                })(<Input.TextArea />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 18 }}
                label="证据"
                extra="请上传合同文件"
              >
                {getFieldDecorator('evidence', {
                  rules: [
                    {
                      required: true,
                      message: '请上传合同文件',
                    },
                  ],
                })(
                  <UpLoadModule
                    action="/oss/attachment/fileupload"
                    listType="picture-card"
                    upLoadNumber="1"
                    files={initialValues && initialValues.evidence}
                  >
                    <div>
                      <Icon type="plus" />
                      <div className="ant-upload-text">上传文件</div>
                    </div>
                  </UpLoadModule>,
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default EntanglementForm;
