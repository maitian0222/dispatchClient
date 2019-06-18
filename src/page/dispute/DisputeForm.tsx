import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Radio, Select, Upload, Button, Icon } from 'antd';
import http from '@sinoui/http';

const { Option } = Select;

interface Props {
  form: FormComponentProps;
  // tslint:disable-next-line:no-any
  getFieldDecorator: any;
  // tslint:disable-next-line:no-any
  initialValues: any;
}

class DisputeForm extends React.Component<Props, State> {
  private props: any;
  private state: any;
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  public render() {
    const { getFieldDecorator, initialValues } = this.props;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
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
        <Form {...formItemLayout} style={{ width: '600px' }}>
          <Form.Item label="法院名称">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入用户名',
                },
              ],
              initialValue: initialValues ? initialValues.name : '1',
            })(
              <Select>
                <Option value="1">广州互联法院</Option>
                <Option value="2">北京互联法院</Option>
                <Option value="3">杭州互联法院</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="模板文件" extra="Excel模板文件上传">
            {getFieldDecorator('upload', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button>
                  <Icon type="upload" /> 上传文件
                </Button>
              </Upload>,
            )}
          </Form.Item>

          <Form.Item label="描述">
            {getFieldDecorator('description', {
              rules: [
                {
                  message: 'description',
                },
              ],
              initialValue: initialValues && initialValues.description,
            })(<Input.TextArea />)}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default DisputeForm;
