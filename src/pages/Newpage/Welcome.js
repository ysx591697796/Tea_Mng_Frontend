import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Card, Input, Typography, Alert, Row, Col, Button, Descriptions, Layout, Divider } from 'antd';
// import { PageHeaderWrapper } from '@ant-design/pro-layout';
import BasicLayout from '../../layouts/BasicLayout';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { getLogininfo } from '@/utils/logininfo';
import HeaderSearch from '@/components/HeaderSearch';
import styles from './index.less';
const Content = Layout;
const FormItem = Form.Item;
import Redirect from 'umi/redirect';

@connect(state => ({
  hellocontent: state.hello.hellocontent,
  testcontent: state.hello.testcontent,
}))
@Form.create()
export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  getList = (e) => {
    e.preventDefault();
    const { getFieldValue } = this.props.form;
    this.loading();
    // var value = new Object;
    var value = {};
    var id = getFieldValue('id');
    value.cid = id || [];
    console.log('value--------->', value);
    this.props.dispatch({
      type: 'hello/test',
      payload: value,
      callback: function (params) {
        this.setState({
          loading: false,
        });
      }.bind(this)
    })
  }

  componentDidMount() {
    // this.create();
    // this.props.dispatch({
    //   type: 'hello/helloc',
    // })
  }

  loading() {
    this.setState({
      loading: true
    })
  }

  // create () {
  //   this.props.dispatch({
  //     type: 'hello/helloc',
  //     // callback: function () {
  //     //   this.setState({
  //     //     loading: false,
  //     //   });
  //     // }.bind(this)
  //   })
  // }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { hellocontent, testcontent } = this.props;
    const data = hellocontent;
    const data1 = testcontent;
    // console.log('data--------->', hellocontent);
    // console.log('data1--------->', testcontent);
    const logininfo = getLogininfo();
    console.log('logininfo---------->', logininfo);
    return (
      // <PageHeaderWrapper>
      // <GridContent>
      <PageHeaderLayout>
        <Layout>
          <Form layout="vertical" onSubmit={this.getList}>
            <Col lg={8}>
              <FormItem>
                {getFieldDecorator('id')(
                  <Input placeholder='id' />
                )}
              </FormItem>
              <FormItem>
                <Button
                  type='primary'
                  htmlType='submit'
                >
                  提交
              </Button>
              </FormItem>
            </Col>
          </Form>
        </Layout>
        <Layout>
          <Content style={{ marginRight: 150, marginLeft: 150 }}>
            <Descriptions title={'个人信息'} bordered>
              <Descriptions.Item label='姓名' span={1.5}><span className={styles.act}>杨圣轩</span></Descriptions.Item>
              <Descriptions.Item label='学号' span={1.5}>
                191<br />st<br />saw<br />
              </Descriptions.Item>
              <Descriptions.Item label='性别'></Descriptions.Item>
              <Descriptions.Item label='民族'></Descriptions.Item>
              <Descriptions.Item label='政治面貌'></Descriptions.Item>
              <Descriptions.Item label='班级' span={3}></Descriptions.Item>
              <Descriptions.Item label='毕业院校' span={3}></Descriptions.Item>
              <Descriptions.Item label='宿舍号' span={1.5}></Descriptions.Item>
              <Descriptions.Item label='手机号' span={1.5}></Descriptions.Item>
            </Descriptions>
          </Content>
        </Layout>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card>
              123
              </Card>
          </Col>
          {/* <Divider dashed /> */}
          <Col lg={17} md={24}>
            <Card>
              123
              </Card>
          </Col>
        </Row>
        <div
          style={{
            textAlign: 'right',
            height: '64px',
            lineHeight: '64px',
            boxShadow: '0 1px 4px rgba(0,21,41,.12)',
            padding: '0 32px',
            width: '400px',
          }}
        >
          <HeaderSearch
            placeholder="站内搜索"
            dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
            onSearch={value => {
              console.log('input', value); // eslint-disable-line
            }}
            onPressEnter={value => {
              console.log('enter', value); // eslint-disable-line
            }}
          />
        </div>
        {/* <Redirect to="/user/login" /> */}
        {/* </GridContent> */}
      </PageHeaderLayout>
      // </PageHeaderWrapper>
    )
  }
}
// const CodePreview = ({ children }) => (
//   <pre
//     style={{
//       background: '#f2f4f5',
//       padding: '12px 20px',
//       margin: '12px 0',
//     }}
//   >
//     <code>
//       <Typography.Text copyable>{children}</Typography.Text>
//     </code>
//   </pre>
// );

// export default () => (
//   <PageHeaderWrapper>
//     <Card>
//       <Alert
//         message="umi ui 现已发布，欢迎使用 npm run ui 启动体验。"
//         type="success"
//         showIcon
//         banner
//         style={{
//           margin: -12,
//           marginBottom: 24,
//         }}
//       />
//       <Typography.Text strong>
//         <a target="_blank" rel="noopener noreferrer" href="https://pro.ant.design/docs/block">
//           <FormattedMessage
//             id="app.welcome.link.block-list"
//             defaultMessage="基于 block 开发，快速构建标准页面"
//           />
//         </a>
//       </Typography.Text>
//       <CodePreview>npx umi block list</CodePreview>
//       <Typography.Text
//         strong
//         style={{
//           marginBottom: 12,
//         }}
//       >
//         <a
//           target="_blank"
//           rel="noopener noreferrer"
//           href="https://pro.ant.design/docs/available-script#npm-run-fetchblocks"
//         >
//           <FormattedMessage id="app.welcome.link.fetch-blocks" defaultMessage="获取全部区块" />
//         </a>
//       </Typography.Text>
//       <CodePreview> npm run fetch:blocks</CodePreview>
//     </Card>
//     <p
//       style={{
//         textAlign: 'center',
//         marginTop: 24,
//       }}
//     >
//       Want to add more pages? Please refer to{' '}
//       <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
//         use block
//       </a>
//       。
//     </p>
//   </PageHeaderWrapper>
// );
