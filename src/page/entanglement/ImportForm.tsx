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
import CourtSelect from '../../component/CourtSelect';

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
    this.state = {};
  }

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
        <Form {...formItemLayout} style={{ width: '800px' }}>
          {/* <Form.Item label="法院名称">
            {getFieldDecorator('courtId', {
              rules: [
                {
                  required: true,
                  message: '请选择法院',
                },
              ],
            })(<CourtSelect />)}
          </Form.Item> */}
          <Form.Item label="导入数据">
            {getFieldDecorator('attachment', {
              rules: [
                {
                  required: true,
                  message: '请上传导入数据',
                },
              ],
            })(
              <UpLoadModule
                action="/oss/attachment/fileupload"
                upLoadType={['zip', 'rar']}
                listType="text"
                upLoadNumber="1"
                files={initialValues && initialValues.attachment}
              />,
            )}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default EntanglementForm;
