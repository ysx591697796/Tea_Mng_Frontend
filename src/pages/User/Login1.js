import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert } from 'antd';

import styles from './Login.less';
import { RedirectTo } from '../../funcjs/level';
import router from 'umi/router';
const FormItem = Form.Item;

@connect(state => ({
  login: state.login,
}))
@Form.create()
export default class LoginForm extends Component {
  state = {
    count: 0,
    type: 'login',
  }
  componentWillReceiveProps(nextProps) {
  }
  componentWillMount() {

  }

  strToHexCharCode(str) {
    if (str === "")
      return "";
    var hexCharCode = [];
    hexCharCode.push("0x");
    for (var i = 0; i < str.length; i++) {
      hexCharCode.push((str.charCodeAt(i)).toString(16));
    }
    return hexCharCode.join("");
  }
  hexCharCodeToStr(hexCharCodeStr) {
    var trimedStr = hexCharCodeStr.trim();
    var rawStr =
      trimedStr.substr(0, 2).toLowerCase() === "0x"
        ?
        trimedStr.substr(2)
        :
        trimedStr;
    var len = rawStr.length;
    if (len % 2 !== 0) {
      alert("Illegal Format ASCII Code!");
      return "";
    }
    var curCharCode;
    var resultStr = [];
    for (var i = 0; i < len; i = i + 2) {
      curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
      resultStr.push(String.fromCharCode(curCharCode));
    }
    return resultStr.join("");
  }
  lqbzHex(hex) {
    if (!hex) {
      return null
    }
    var tHex = hex.split('a')
    if (tHex[0] == '') {
      tHex[0] = 'k'
    }
    if (tHex[tHex.length - 1] == '') {
      tHex[tHex.length - 1] = 'k'
    }
    tHex.reverse()
    var thexToString = tHex.join('a');
    var newHex = thexToString.replace(/k/g, '')
    return newHex
  }
  getPwdAccount() {
    console.log('get----@@@')
    var pda = localStorage.getItem('pda')
    if (!pda) {
      return null
    }
    let nnhex = this.hexCharCodeToStr('0x' + this.lqbzHex(pda));

    return JSON.parse(nnhex)
  }
  setPwdAccount(values) {
    console.log('set----@@@')
    var code = JSON.stringify(values)

    //替换0x

    var sll = this.strToHexCharCode(code)
    var sls = this.hexCharCodeToStr(sll)
    var str = sll.substring(2, sll.length)//去掉前缀
    let newHex = this.lqbzHex(str);

    localStorage.setItem('pda', newHex);
  }
  clear() {
    //console.log('remove----@@@')
    localStorage.removeItem('pda');
  }
  componentDidMount() {
    var remember = this.props.form.getFieldValue('remember');
    if (remember) {
      var u = this.getPwdAccount();
      if (u) {
        this.props.form.setFieldsValue({ account: u.account, password: u.password })
      }
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onSwitch = (key) => {
    this.setState({
      type: key,
    });
  }

  onGetCaptcha = () => {
    let count = 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { type } = this.state;

    this.props.form.validateFields({ force: true },
      (err, values) => {
        if (!err) {
          this.props.dispatch({
            type: `login/${type}Submit`,
            payload: values,
            callback: function () {
              router.push(RedirectTo());
              if (values.remember) {
                this.setPwdAccount(values)
              } else {
                this.clear()
              }
              //配置导航栏
            }.bind(this)
          });
        }
      }
    );
  }

  renderMessage = (message) => {
    return (
      <Alert
        style={{ marginBottom: 24 }}
        message={message}
        type="error"
        showIcon
      />
    );
  }
  render() {
    const { form, login } = this.props;
    const { getFieldDecorator } = form;
    const { count, type } = this.state;
    return (
      <div className={styles.main} style={{ paddingTop: 20 }}>

        <div style={{ textAlign: 'center', paddingTop: 20, paddingBottom: 20 }}>
          <h1>内容管理后台</h1></div>
        <div>{login.userData.nickName}</div>
        <Form onSubmit={this.handleSubmit}>
          <div key="login">
            {
              login.status === 'error' &&
              login.type === 'login' &&
              login.submitting === false &&
              this.renderMessage('账户或密码错误')
            }
            <FormItem>
              {getFieldDecorator('account', {
                rules: [{
                  required: type === 'login', message: '请输入账户名！',
                }],
              })(
                <Input
                  size="large"
                  prefix={<Icon type="user" className={styles.prefixIcon} />}
                  placeholder="您的账号"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{
                  required: type === 'login', message: '请输入密码！',
                }],
              })(
                <Input
                  size="large"
                  prefix={<Icon type="lock" className={styles.prefixIcon} />}
                  type="password"
                  placeholder="您的密码"
                />
              )}
            </FormItem>
          </div>

          <FormItem className={styles.additional}>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox className={styles.autoLogin}>记住密码</Checkbox>
            )}
            {/* <a className={styles.forgot} disabled>忘记密码?</a> */}
            <Button size="large" loading={login.submitting} className={styles.submit} type="primary" htmlType="submit">
              登录
              </Button>
          </FormItem>
        </Form>

      </div>
    );
  }
}
