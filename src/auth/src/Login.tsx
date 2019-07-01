import React from 'react';
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Typography,
  message,
  Tooltip,
} from 'antd';
import { connect } from 'react-redux';
import { ActionCreators } from './actions';
import Register from './register/Register';

import http from '@sinoui/http';
import { withRouter } from 'react-router-dom';
const styles = require('./css/Login.css');

const { Title } = Typography;

interface VerficationcodeResult {
  imgsrc: string;
  tokenCode: string;
}

interface State {
  isLoginPage: boolean;
  verficationcodeImgSrc: string;
}
class NormalLoginForm extends React.PureComponent<Props, State> {
  private tokenCode = '';
  constructor(props: {}) {
    super(props);
    this.state = {
      isLoginPage: true,
      verficationcodeImgSrc:
        'http://s1.sinaimg.cn/bmiddle/003bsgbmgy6R6ekxkl2e0',
    };
  }

  public componentDidMount() {
    this.onChangeVerficationcode();
  }

  public onChangeVerficationcode = () => {
    http
      .get('/admin/validata/changeValidata', {
        params: {
          tokenCode: this.tokenCode,
        },
      })
      .then((result: VerficationcodeResult) => {
        if (result) {
          this.setState({
            verficationcodeImgSrc: result.imgsrc,
          });
          this.tokenCode = result.tokenCode;
        }
      });
  };

  // 跳转到登录页
  public goLogin = (e) => {
    this.setState({ isLoginPage: true });
  };

  public handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        http
          .post('/admin/login', {
            ...values,
            tokenCode: this.tokenCode,
          })
          .then((result) => {
            if (result && result.status == 'success') {
              message.success('登录成功！');
              this.props.dispatch(
                ActionCreators.loginSuccess(result.data.user),
              );
            } else {
              message.success(`${result.message}`);
            }
          })
          .catch((e) => {
            if (e.response && e.response.data) {
              message.error(e.response.data.message);
            }
          });
      }
    });
  };
  public componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  public render() {
    const { getFieldDecorator } = this.props.form;
    const { verficationcodeImgSrc, isLoginPage } = this.state;
    return (
      <div className={styles.loginLayout}>
        <Title style={{ margin: '60px 0' }}>金融纠纷解决平台</Title>

        {isLoginPage === true ? (
          <div className={styles.loginContainer}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名!' }],
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="用户名"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!' }],
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type="password"
                    placeholder="密码"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('verficationcode', {
                  rules: [{ required: true, message: '请输入验证码!' }],
                })(
                  <Input
                    placeholder="验证码"
                    addonAfter={
                      verficationcodeImgSrc && (
                        <Tooltip placement="top" title="点击重新获取验证码">
                          <img
                            height="29"
                            style={{
                              height: '29px',
                              cursor: 'pointer',
                            }}
                            onClick={this.onChangeVerficationcode}
                            src={`data:image/png;base64,${verficationcodeImgSrc}`}
                          />
                        </Tooltip>
                      )
                    }
                  />,
                )}
              </Form.Item>

              <Form.Item>
                {/* <div style={{ display: 'flex' }}>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(<Checkbox>记住我</Checkbox>)}
                  <a className={styles['login-form-forgot']} href="">
                    找回密码
                  </a>
                </div> */}
                <div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    block
                  >
                    登录
                  </Button>
                </div>
                {/* <a
                  href="javascript:;"
                  onClick={() => this.setState({ isLoginPage: false })}
                >
                  注册
                </a> */}
              </Form.Item>
            </Form>
          </div>
        ) : (
          <div className={styles.registerContainer}>
            <Register goLogin={() => this.goLogin} />
          </div>
        )}
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
  NormalLoginForm,
);

const mapDispatchToProps = (dispatch: any) => ({
  dispatch,
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(WrappedNormalLoginForm),
);
