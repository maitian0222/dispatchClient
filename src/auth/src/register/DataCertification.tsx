import * as React from 'react';
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Rate,
  Checkbox,
  Cascader,
  Row,
  Col,
  Input,
} from 'antd';

const { Option } = Select;

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
class Certification extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.props.next();
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const uploadButton = (
      <div>
        <Icon type={'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="注册人员类型">
          {getFieldDecorator('peopleType')(
            <Radio.Group>
              <Radio.Button value="a">法人</Radio.Button>
              <Radio.Button value="b">非法人组织</Radio.Button>
            </Radio.Group>,
          )}
        </Form.Item>
        <Form.Item label="证照类型" hasFeedback>
          {getFieldDecorator('cardType', {
            rules: [{ required: true, message: '请选择你的证照类型!' }],
          })(
            <Select placeholder="请选择你的证照类型!">
              <Option value="china">社会统一信用代码证</Option>
              <Option value="usa">身份证</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="证件照片">
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              //beforeUpload={beforeUpload}
              //onChange={this.handleChange}
            >
              {uploadButton}
            </Upload>,
          )}
        </Form.Item>
        <Form.Item label="证照号码" hasFeedback>
          {getFieldDecorator('cardNum', {
            rules: [{ required: true, message: '请输入你的证照号码!' }],
          })(<Input placeholder="请输入你的证件号码!" />)}
        </Form.Item>
        <Form.Item label="单位名称" hasFeedback>
          {getFieldDecorator('danweName', {
            rules: [{ required: true, message: '请输入你的单位名称!' }],
          })(<Input placeholder="请输入你的单位名称!" />)}
        </Form.Item>
        <Form.Item label="社会统一信用代码" hasFeedback>
          {getFieldDecorator('danweName', {
            rules: [{ required: true, message: '请输入社会统一信用代码!' }],
          })(<Input placeholder="请输入社会统一信用代码!" />)}
        </Form.Item>
        <Form.Item label="注册地址" hasFeedback>
          {getFieldDecorator('danweName', {
            rules: [{ required: true, message: '请输入注册地址!' }],
          })(<Input placeholder="请输入注册地址!" />)}
        </Form.Item>
        <Form.Item label="证件类型" hasFeedback>
          {getFieldDecorator('danweName', {
            rules: [{ required: true, message: '请输入注册地址!' }],
          })(
            <Select placeholder="请选择你的证件类型!">
              <Option value="usa">居民身份证</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="法定代表人身份证照片">
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              //beforeUpload={beforeUpload}
              //onChange={this.handleChange}
            >
              {uploadButton}
            </Upload>,
          )}
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              //beforeUpload={beforeUpload}
              //onChange={this.handleChange}
            >
              {uploadButton}
            </Upload>,
          )}
        </Form.Item>
        <Form.Item label="法定代表人姓名" hasFeedback>
          {getFieldDecorator('danweName', {
            rules: [{ required: true, message: '请输入姓名!' }],
          })(<Input placeholder="请输入姓名!" />)}
        </Form.Item>
        <Form.Item label="证件号码" hasFeedback>
          {getFieldDecorator('danweName', {
            rules: [{ required: true, message: '请输入证件号码!' }],
          })(<Input placeholder="请输入证件号码!" />)}
        </Form.Item>
        <Form.Item label="户籍地址" hasFeedback>
          {getFieldDecorator('danweName', {
            rules: [{ required: true, message: '请输入详细居住地址!' }],
          })(<Cascader options={options} placeholder="Please select" />)}

          {getFieldDecorator('danweName', {
            rules: [{ required: true, message: '请输入详细居住地址!' }],
          })(<Input placeholder="请输入详细居住地址!" />)}
        </Form.Item>
        <Form.Item label="电子邮箱" hasFeedback>
          {getFieldDecorator('danweName', {
            rules: [{ required: true, message: '请输入电子邮箱!' }],
          })(<Input placeholder="请输入电子邮箱!" />)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const DataCertification = Form.create({ name: 'validate_other' })(
  Certification,
);

export default DataCertification;
