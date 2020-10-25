import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Card, Row, Col, Layout, Descriptions, Select, Button, Table, Modal, message, Input } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { Option } = Select;
const FormItem = Form.Item;

@connect(({ vacate, loading, user }) => ({
    gradeList: vacate.Gradecontent,
    gradeListLoading: loading.effects['vacate/getGrade'],
    classList: vacate.Classcontent,
    classListLoading: loading.effects['vacate/getClass'],
    // vacateList: vacate.Vacatecontent,
    // vacateListLoading: loading.effects['vacate/getVacate'],
    infoList: user.InfoListcontent,
    infoListLoading: loading.effects['user/getInfoList'],
}))
@Form.create()
export default class StuInfo extends Component {
    state = {
        visible: false,
        modalData: null,
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'vacate/getGrade',
        })
        dispatch({
            type: 'vacate/getClass',
        })
    }

    selectRed = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        const { getFieldValue } = this.props.form;
        var value = {};
        var grade = getFieldValue('grade');
        var class1 = getFieldValue('class1');
        if (grade && class1) {
            value.grade = grade['label'];
            value.class1 = class1['label'];
            dispatch({
                type: 'user/getInfoList',
                payload: value,
            });
        } else {
            message.warning('请选择搜索范围！');
        }
    }

    handleShowModal = (record) => {
        this.setState({
            visible: true,
            modalData: record || {},
        })
    }

    handleOK = () => {
        this.setState({
            visible: false,
        })
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }

    columns = [
        {
            title: '姓名',
            dataIndex: 'name',
        },
        {
            title: '学号',
            dataIndex: 'userid',
        },
        {
            title: '手机号',
            dataIndex: 'phone',
        },
        {
            title: '性别',
            dataIndex: 'sex',
        },
        {
            title: '操作',
            render: (text, record) => {
                return (
                    <a onClick={() => this.handleShowModal(record)}>详情</a>
                )
            }
        },
    ]

    render() {
        const { gradeList, gradeListLoading, classList, classListLoading,
            infoList, infoListLoading } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { modalData } = this.state;

        var data = infoList || [];
        if (data) {
            var { infoList1 } = data;
        }

        const { gradeList1 } = gradeList;
        var grade = [];
        if (gradeList1) {
            for (var i = 0; i < gradeList1.length; i++) {
                grade.push(<Option value={i.toString()}>{gradeList1[i]}</Option>);
            }
        }

        const { name } = classList;
        var class1 = [];
        if (name) {
            for (var i = 0; i < name.length; i++) {
                class1.push(<Option value={i.toString()}>{name[i]}</Option>);
            }
        }

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
                // md: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
                md: { span: 10 },
            },
        };

        return (
            <PageHeaderWrapper
                title={"查询学生信息"}
                content={"此处为学生信息查询，请选择年级班级后进行查询！"}
            >
                <Card style={{ marginBottom: 20 }}>
                    <Form onSubmit={this.selectRed}>
                        <Row gutter={24}>
                            <Col lg={6} md={6}>
                                {/* <Card> */}
                                {gradeList1 ? <FormItem {...formItemLayout} label={"年级"}>
                                    {getFieldDecorator('grade')(
                                        <Select defaultValue={gradeList1[0]} labelInValue style={{ width: '100%' }}>
                                            {grade}
                                        </Select>
                                    )}
                                </FormItem> : null}

                                {/* </Card> */}
                            </Col>
                            {/* </Row> */}
                            {/* <Row gutter={24}> */}
                            <Col lg={6} md={6}>
                                {/* <Card> */}
                                {name ? <FormItem {...formItemLayout} label={"班级"}>
                                    {getFieldDecorator('class1', {
                                        rules: [
                                            {
                                                required: true,
                                                message: ("请选择班级！"),
                                            },
                                        ],
                                    })(
                                        <Select labelInValue style={{ width: '100%' }}>
                                            {class1}
                                        </Select>
                                    )}
                                </FormItem> : null}

                                {/* </Card> */}
                            </Col>
                            {/* <Col lg={6} md={6}> */}
                            <Button type="primary" htmlType="submit">查询</Button>
                            {/* </Col> */}
                        </Row>
                    </Form>
                    <Table
                        size="large"
                        bordered
                        dataSource={infoList1}
                        columns={this.columns} />
                </Card>



                {modalData ?
                    <Modal
                        visible={this.state.visible}
                        title="详情"
                        // onOk={this.handleOK}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>
                                取消
                    </Button>,
                            <Button disabled key="submit" type="primary" onClick={this.handleOK}>
                                修改
                    </Button>,
                        ]}
                    >
                        <Row>
                            <Col span={24}>
                                <Card>
                                    <Descriptions title={'个人信息'} size="large" bordered>
                                        <Descriptions.Item label='姓名' span={1.5}><span >{modalData.name}</span></Descriptions.Item>
                                        <Descriptions.Item label='学号' span={1.5}>{modalData.id}</Descriptions.Item>
                                        <Descriptions.Item label='性别' span={1.5}>{modalData.sex}</Descriptions.Item>
                                        <Descriptions.Item label='民族' span={1.5}></Descriptions.Item>
                                        <Descriptions.Item label='政治面貌' span={3}>{modalData.politics}</Descriptions.Item>
                                        <Descriptions.Item label='班级' span={3}>{modalData.grade + "级" + modalData.class1}</Descriptions.Item>
                                        <Descriptions.Item label='毕业院校' span={3}></Descriptions.Item>
                                        <Descriptions.Item label='家庭住址' span={3}></Descriptions.Item>
                                        <Descriptions.Item label='出生日期' span={3}>{modalData.birthday}</Descriptions.Item>
                                        <Descriptions.Item label='宿舍号' span={1.5}></Descriptions.Item>
                                        <Descriptions.Item label='手机号' span={1.5}>{modalData.phone}</Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Col>
                        </Row>
                    </Modal> : null}

            </PageHeaderWrapper>
        )
    }
}