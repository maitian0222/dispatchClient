import React from 'react';
import { Button, Row, Col, Icon, Steps, Card } from 'antd';

class RegisterSuccess extends React.Component{
    render(){
      return (
        <Card bordered={false} style={{textAlign:'center'}}>
          <Icon style={{
             marginBottom: '24px',
             fontSize: '72px',
             lineHeight: '72px',
             color:"#52C41A",
          }} type="check-circle" theme="filled" />
          <div>你的账户注册成功！</div>
        </Card>
      )
    }
}

export default RegisterSuccess