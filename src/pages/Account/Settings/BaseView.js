import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Upload, Select, Button, DatePicker } from 'antd';
import { connect } from 'dva';
import styles from './BaseView.less';
import GeographicView from './GeographicView';
import PhoneView from './PhoneView';
// import { getTimeDistance } from '@/utils/utils';

const FormItem = Form.Item;
const { Option } = Select;

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }) => (
  <Fragment>
    <div className={styles.avatar_title}>
      <FormattedMessage id="app.settings.basic.avatar" defaultMessage="Avatar" />
    </div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload fileList={[]}>
      <div className={styles.button_view}>
        <Button icon="upload">
          <FormattedMessage id="app.settings.basic.change-avatar" defaultMessage="Change avatar" />
        </Button>
      </div>
    </Upload>
  </Fragment>
);

const validatorGeographic = (rule, value, callback) => {
  const { province, city } = value;
  if (!province.key) {
    callback('Please input your province!');
  }
  if (!city.key) {
    callback('Please input your city!');
  }
  callback();
};

const validatorPhone = (rule, value, callback) => {
  const values = value.split('-');
  if (!values[0]) {
    callback('Please input your area code!');
  }
  if (!values[1]) {
    callback('Please input your phone number!');
  }
  callback();
};

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
@Form.create()
class BaseView extends Component {
  state = {
    loading: false,
  }

  loading = () => {
    this.setState({
      loading: true
    })
  }

  componentDidMount() {
    this.setBaseInfo();
  }

  setBaseInfo = () => {
    const { currentUser, form } = this.props;
    Object.keys(form.getFieldsValue()).forEach(key => {
      const obj = {};
      obj[key] = currentUser[key] || null;
      form.setFieldsValue(obj);
    });
  };

  getAvatarURL() {
    const { currentUser } = this.props;
    if (currentUser.avatar) {
      return currentUser.avatar;
    }
    const url = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';
    return url;
  }

  getViewDom = ref => {
    this.view = ref;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { currentUser, dispatch } = this.props;
    // console.log("curr------------>", currentUser);
    const { getFieldValue } = this.props.form;
    var value = {};
    this.loading();
    value.username = currentUser.username;
    value.phone = getFieldValue('phone');
    value.birthday = getFieldValue('date');
    dispatch({
      type: 'user/upInfoPhone',
      payload: value,
      callback: function (params) {
        this.setState({
          loading: false,
        });
        // dispatch({
        //   type:'user/fetchCurrent'
        // });
      }.bind(this)
    });
  }

  handleChange = () => {
    const { getFieldValue } = this.props.form;
    console.log("asdasd", getFieldValue('date'));
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { currentUser } = this.props;
    console.log('currentuser---------', currentUser);
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            {/* <FormItem label={formatMessage({ id: 'app.settings.basic.email' })}>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.email-message' }, {}),
                  },
                ],
              })(<Input required={true} />)}
            </FormItem> */}
            <FormItem label={formatMessage({ id: 'app.settings.basic.nickname' })}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.nickname-message' }, {}),
                  },
                ],
              })(<Input disabled={true} />)}
            </FormItem>
            <FormItem label={"学号"}>
              {getFieldDecorator('userid')(<Input disabled={true} />)}
            </FormItem>
            <FormItem label={"年级"}>
              {getFieldDecorator('grade')(<Input disabled={true} />)}
            </FormItem>
            <FormItem label={"班级"}>
              {getFieldDecorator('class1')(<Input disabled={true} />)}
            </FormItem>
            {/* <FormItem label={formatMessage({ id: 'app.settings.basic.profile' })}>
              {getFieldDecorator('profile', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.profile-message' }, {}),
                  },
                ],
              })(
                <Input.TextArea
                  placeholder={formatMessage({ id: 'app.settings.basic.profile-placeholder' })}
                  rows={4}
                />
              )}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.basic.country' })}>
              {getFieldDecorator('country', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.country-message' }, {}),
                  },
                ],
              })(
                <Select style={{ maxWidth: 220 }}>
                  <Option value="China">中国</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.basic.geographic' })}>
              {getFieldDecorator('geographic', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.geographic-message' }, {}),
                  },
                  {
                    validator: validatorGeographic,
                  },
                ],
              })(<GeographicView />)}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.basic.address' })}>
              {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.address-message' }, {}),
                  },
                ],
              })(<Input required={true} />)}
            </FormItem> */}
            <FormItem label={formatMessage({ id: 'app.settings.basic.phone' })}>
              {getFieldDecorator('phone')(<Input required />)}
            </FormItem>
            <FormItem label="出生日期">
              {getFieldDecorator('date', {
                rules: [
                  {
                    required: true,
                    message: "请选择出生日期！",
                  },
                ],
              })(
                <DatePicker style={{ width: '100%' }} />
              )}
            </FormItem>
            <Button type="primary" htmlType="submit">
              <FormattedMessage
                id="app.settings.basic.update"
                defaultMessage="Update Information"
              />
            </Button>
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={this.getAvatarURL()} />
        </div>
      </div>
    );
  }
}

export default BaseView;
