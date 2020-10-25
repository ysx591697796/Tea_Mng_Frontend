import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Card, Row, Col, Descriptions, Layout, Select, Button, Table, Modal, message, Input } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { Option } = Select;
const FormItem = Form.Item;

@connect(({ vacate, loading }) => ({
    gradeList: vacate.Gradecontent,
    gradeListLoading: loading.effects['vacate/getGrade'],
    classList: vacate.Classcontent,
    classListLoading: loading.effects['vacate/getClass'],
    vacateList: vacate.Vacatecontent,
    vacateListLoading: loading.effects['vacate/getVacate'],
}))
@Form.create()
export default class Vacate extends Component {
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
        this.resultList();
    }

    resultList = () =>{
        const { dispatch } = this.props;
        const { getFieldValue } = this.props.form;
        var value = {};
        var grade = getFieldValue('grade');
        var class1 = getFieldValue('class1');
        if (grade && class1) {
            value.grade = grade['label'];
            value.class1 = class1['label'];
            dispatch({
                type: 'vacate/getVacate',
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
        const { dispatch } = this.props;
        const { getFieldValue } = this.props.form;
        var value = {};
        if(getFieldValue('vid')){
            value.vid = getFieldValue('vid');
            dispatch({
                type: 'vacate/changeAgree',
                payload: value,
                callback: function (params) {
                    // notification[type]({
                    //     message: 'Notification Title',
                    //     description:
                    //         'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                    // });
                    message.success("提交成功！");
                    this.setState({
                        // loading: false,
                        visible: false,
                    });
                    this.resultList();
                }.bind(this),
            })
        }else {
            message.warning('服务器出错！');
        }
    }

    handleNO=()=>{
        const { dispatch } = this.props;
        const { getFieldValue } = this.props.form;
        var value = {};
        if(getFieldValue('vid')){
            value.vid = getFieldValue('vid');
            dispatch({
                type: 'vacate/changeRefuse',
                payload: value,
                callback: function (params) {
                    // notification[type]({
                    //     message: 'Notification Title',
                    //     description:
                    //         'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                    // });
                    message.success("提交成功！");
                    this.setState({
                        // loading: false,
                        visible: false,
                    });
                    this.resultList();
                }.bind(this),
            })
        }else {
            message.warning('服务器出错！');
        }
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
            dataIndex: 'id',
        },
        {
            title: '手机号',
            dataIndex: 'phone',
        },
        {
            title: '审核结果',
            dataIndex: 'result',
        },
        {
            title: '操作',
            render: (text, record) => {
                if (record.result == '同意' || record.result == '驳回') {
                    return (

                        "已审核"
                    )
                } else {
                    return (

                        <a onClick={() => this.handleShowModal(record)}>查看申请</a>
                    )
                }
            }
        },
    ]


    render() {
        const { gradeList, gradeListLoading, classList, classListLoading,
            vacateList, vacateListLoading } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { modalData } = this.state;

        var data = vacateList || [];
        if (data) {
            var { vacate } = data;
        }

        var { gradeList1 } = gradeList;
        var grade = [];
        if (gradeList1) {
            for (var i = 0; i < gradeList1.length; i++) {
                grade.push(<Option key={i.toString()}>{gradeList1[i]}</Option>);
            }
        }

        var { name } = classList;
        var class1 = [];
        if (name) {
            for (var i = 0; i < name.length; i++) {
                class1.push(<Option key={i.toString()}>{name[i]}</Option>);
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
                title={"查询请假信息"}
                content={"此处为请假信息查询，请选择年级班级后进行查询！"}
            >
                <Card style={{ marginBottom: 20 }}>
                    <Form onSubmit={this.selectRed}>
                        <Row gutter={24}>
                            <Col lg={6} md={6}>
                                <FormItem {...formItemLayout} label={"年级"}>
                                    {getFieldDecorator('grade')(
                                        <Select labelInValue style={{ width: '100%' }}>
                                            {grade}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col lg={6} md={6}>
                                <FormItem {...formItemLayout} label={"班级"}>
                                    {getFieldDecorator('class1')(
                                        <Select labelInValue style={{ width: '100%' }}>
                                            {class1}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Button type="primary" htmlType="submit">查询</Button>
                        </Row>
                    </Form>
                    <Table
                        dataSource={vacate}
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
                            <Button key="submit" type="primary" onClick={this.handleOK}>
                                同意
                    </Button>,
                            <Button key="submit" type="danger" onClick={this.handleNO}>
                                驳回
        </Button>,
                        ]}
                    >
                        <Row>
                            <Col span={24}>
                                <Card>
                                    {getFieldDecorator('vid', {
                                        initialValue: modalData.vid,
                                    })(<Input hidden disabled placeholder="请输入" />)}
                                    <Descriptions title={'请假信息'} size="large" bordered>
                                        <Descriptions.Item label='姓名' span={1.5}><span >{modalData.name}</span></Descriptions.Item>
                                        <Descriptions.Item label='学号' span={1.5}>{modalData.id}</Descriptions.Item>
                                        <Descriptions.Item label='年级' span={1.5}>{modalData.grade}</Descriptions.Item>
                                        <Descriptions.Item label='班级' span={1.5}>{modalData.class1}</Descriptions.Item>
                                        <Descriptions.Item label='联系电话' span={3}>{modalData.phone}</Descriptions.Item>
                                        <Descriptions.Item label='开始日期' span={3}>{modalData.starttime}</Descriptions.Item>
                                        <Descriptions.Item label='结束日期' span={3}>{modalData.endtime}</Descriptions.Item>
                                        <Descriptions.Item label='请假原因' span={3}>{modalData.reason}</Descriptions.Item>
                                        <Descriptions.Item label='请假类型' span={3}>{modalData.type}</Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Col>
                        </Row>
                    </Modal> : null}

            </PageHeaderWrapper>
        )
    }
}