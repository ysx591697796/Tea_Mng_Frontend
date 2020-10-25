import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Card, Row, Col, Layout, Descriptions } from 'antd';
import { getLogininfo } from '@/utils/logininfo';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';
import styles from './Center.less';

const Content = Layout;
const { Description } = DescriptionList;

@connect(({ stuInfo, loading }) => ({
    stuinfoList: stuInfo.stuInfocontent,
    stuinfoLoading: loading.effects['stuInfo/getStuInfo'],
}))
// @Form.create()
export default class InfoQuery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        var value = {};
        var logininfo = getLogininfo().toString();
        value.userName = logininfo || [];
        dispatch({
            type: 'stuInfo/getStuInfo',
            payload: value,
        });
    }

    render() {
        const { stuinfoList, stuinfoLoading } = this.props;
        const studata = stuinfoList;
        return (
            <PageHeaderWrapper>
                <Row gutter={24}>
                    <Col lg={7} md={24}>
                        <Card bordered={false} style={{ marginBottom: 24 }} loading={stuinfoLoading}>
                            {stuinfoList ? (
                                <div>
                                    <div className={styles.avatarHolder}>
                                        <img alt="" src={stuinfoList.avatar} />
                                        <div className={styles.name}>{stuinfoList.name}</div>
                                        {/* <div>{currentUser.signature}</div> */}
                                    </div>
                                </div>
                            ) : (
                                    'loading...'
                                )}
                        </Card>
                    </Col>
                    <Col lg={17} md={24}>
                        <Card bordered={false} loading={stuinfoLoading}>
                            {/* <Layout> */}
                            {/* <Content> */}
                            <Descriptions title={'个人信息'} size="large" bordered>
                                <Descriptions.Item label='姓名' span={1.5}><span >{studata.name}</span></Descriptions.Item>
                                <Descriptions.Item label='学号' span={1.5}>{studata.userid}</Descriptions.Item>
                                <Descriptions.Item label='性别' span={1.5}>{studata.sex}</Descriptions.Item>
                                <Descriptions.Item label='民族' span={1.5}></Descriptions.Item>
                                <Descriptions.Item label='政治面貌' span={3}>{studata.politics}</Descriptions.Item>
                                <Descriptions.Item label='班级' span={3}>{studata.grade + "级" + studata.class1}</Descriptions.Item>
                                <Descriptions.Item label='毕业院校' span={3}></Descriptions.Item>
                                <Descriptions.Item label='家庭住址' span={3}></Descriptions.Item>
                                <Descriptions.Item label='出生日期' span={3}>{studata.birthday}</Descriptions.Item>
                                <Descriptions.Item label='宿舍号' span={1.5}></Descriptions.Item>
                                <Descriptions.Item label='手机号' span={1.5}>{studata.phone}</Descriptions.Item>
                            </Descriptions>
                            {/* </Content> */}
                            {/* </Layout> */}
                        </Card>
                    </Col>
                </Row>
            </PageHeaderWrapper>
        )
    }
}