import * as React from 'react';
import { Steps } from 'antd';
import WrappedRegistrationForm from './RegisterForm';
import Verified from './Verified';
import RegisterSuccess from './RegisterSuccess'

const { Step } = Steps;

const steps = [
  {
    title: '注册',
    content: 'First-content',
  },
  {
    title: '实名认证',
    content: 'Second-content',
  },
  {
    title: '注册完成',
    content: 'Last-content',
  },
];

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  public next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  public prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  public render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current} size="small">
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">
          {steps[current].content === 'First-content' ? (
            <WrappedRegistrationForm
              next={() => this.next()}
              goLogin={this.props.goLogin}
            />
          ) : steps[current].content === 'Second-content' ? (
            <Verified next={() => this.next()} />
          ) : steps[current].content === 'Last-content' ?
          (<RegisterSuccess/>):(
            ''
          )}
        </div>
      </div>
    );
  }
}

export default Register;
