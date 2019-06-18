import React from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
let id = 0;
interface Props {
  form: FormComponentProps;
  // tslint:disable-next-line:no-any
  getFieldDecorator: any;
  // tslint:disable-next-line:no-any
  initialValues: any;
}
class DynamicFieldSet extends React.Component<Props, State> {
  private props: any;
  private state: any;
  constructor(props: Props) {
    super(props);
  }
  public remove = (k) => {
    // can use data-binding to get
    const keys = this.props.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    this.props.setFieldsValue({
      keys: keys.filter((key) => key !== k),
    });
  };

  public add = () => {
    const keys = this.props.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    this.props.setFieldsValue({
      keys: nextKeys,
    });
  };

  public render() {
    const { getFieldDecorator, getFieldValue, initialValues } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 4 },
        sm: { span: 16, offset: 5 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? '诉讼请求' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: false,
              whitespace: true,
              message: '输入诉讼请求',
            },
          ],
        })(
          <Input
            placeholder="请输入"
            style={{ width: '60%', marginRight: 8 }}
          />,
        )}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));
    return (
      <Form onSubmit={this.handleSubmit} {...formItemLayout}>
        <Form.Item label="模板名称">
          {getFieldDecorator('name', {
            initialValue: initialValues ? initialValues.name : null,
            rules: [
              {
                required: false,
                message: '请输入法院名称',
              },
            ],
          })(<Input placeholder="附加名称，用于上传时提示" />)}
        </Form.Item>
        <Form.Item label="事实与理由">
          {getFieldDecorator('description', {
            initialValue: initialValues ? initialValues.description : null,
            rules: [
              {
                required: false,
                message: '请输入事实与理由',
              },
            ],
          })(<Input.TextArea />)}
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> 添加诉讼请求
          </Button>
        </Form.Item>
        {formItems}
      </Form>
    );
  }
}
export default DynamicFieldSet;
