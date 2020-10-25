import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Card, Row, Col, Layout, Select, Button, Table, message, DatePicker, Modal, Input, notification } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { Option } = Select;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ vacate, loading, user }) => ({
    // gradeList: vacate.Gradecontent,
    // gradeListLoading: loading.effects['vacate/getGrade'],
    // classList: vacate.Classcontent,
    // classListLoading: loading.effects['vacate/getClass'],
    currentUser: user.currentUser,
    vacateList: vacate.getVacateRedcontent,
    vacateListLoading: loading.effects['vacate/getVacateRed'],
}))
@Form.create()
export default class VacateRecord extends Component {

    state = {
        loading: false,
        visible: false,
        modalData: null,
    }

    componentDidMount() {
        // this.timerID = setInterval(
        //     () => this.test(),
        //     1000
        //   );
        this.test();
    }

    test=()=>{
        const { dispatch, currentUser } = this.props;
        var value = {};
        value.userid = currentUser.userid;
        value.name = currentUser.name;
        dispatch({
            type: 'vacate/getVacateRed',
            payload: value,
        })
    }

    handleOK = () => {
        const { dispatch } = this.props;
        const { getFieldValue } = this.props.form;
        var type = getFieldValue('type');
        var value = {};
        this.loading();
        value.vid = getFieldValue('vid');
        value.status = getFieldValue('statu');
        value.result = getFieldValue('reslut');
        value.name = getFieldValue('name');
        value.id = getFieldValue('id');
        value.grade = getFieldValue('grade');
        value.class1 = getFieldValue('class1');
        value.phone = getFieldValue('phone');
        value.reason = getFieldValue('reason');
        if (type && getFieldValue('date')) {
            value.type = type['label'];
            if (getFieldValue('date')) {
                value.starttime = getFieldValue('date')[0];
                value.endtime = getFieldValue('date')[1];
            }
            dispatch({
                type: 'vacate/updateVacate',
                payload: value,
                callback: function (params) {
                    // notification[type]({
                    //     message: 'Notification Title',
                    //     description:
                    //         'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                    // });
                    message.success("提交成功！");
                    this.setState({
                        loading: false,
                        visible: false,
                    });
                    this.test();
                }.bind(this),
            });
        } else {
            message.warning('请填写请假原因及请假时间！');
        }
    }

    loading = () => {
        this.setState({
            loading: true,
        })
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }

    handleShowModal = (record) => {
        this.setState({
            visible: true,
            modalData: record || {},
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
        // {
        //     title: '状态',
        //     dataIndex: 'status',
        // },
        {
            title: '审核结果',
            dataIndex: 'result',
        },
        {
            title: '操作',
            render: (text, record) => {
                if (record.result == '同意') {
                    return (

                        <a onClick={() => this.handleShowModal(record)}>查看详情</a>
                    )
                } else {
                    return (

                        <a onClick={() => this.handleShowModal(record)}>修改申请</a>
                    )
                }
            }
        },
    ]

    render() {
        const { currentUser, vacateList,
            vacateListLoading } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { modalData } = this.state;

        var data = vacateList || [];
        if (data) {
            var { vacate } = data;
        }

        return (
            <PageHeaderWrapper
                title={"查询请假记录"}
                content={"此处为请假记录查询，结果为个人的请假记录报表！"}
            >
                <Card style={{ marginBottom: 20 }}>
                    <Table
                        size="large"
                        bordered
                        dataSource={vacate}
                        columns={this.columns} />
                </Card>
                {modalData ? modalData.result == '同意' ?
                    <Modal
                        visible={this.state.visible}
                        title="详情"
                        // onOk={this.handleOK}
                        onCancel={this.handleCancel}
                        // okButtonProps={{ disabled: true }}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>
                                取消
                    </Button>,
                            <Button disabled key="submit" type="primary" onClick={this.handleOK}>
                                提交
                    </Button>,
                        ]}
                    >
                        <Form >
                            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                                <Col md={8} sm={24}>
                                    <FormItem label={"姓名"} >
                                        {getFieldDecorator('name', {
                                            initialValue: modalData.name,
                                        })(<Input disabled placeholder="请输入" />)}
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24}>
                                    <FormItem label={"学号"} >
                                        {getFieldDecorator('id', {
                                            initialValue: modalData.userid,
                                        })(<Input disabled placeholder="请输入" />)}
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24}>
                                    <FormItem label={"年级"} >
                                        {getFieldDecorator('grade', {
                                            initialValue: modalData.grade,
                                        })(<Input disabled placeholder="请输入" />)}
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24}>
                                    <FormItem label={"班级"} >
                                        {getFieldDecorator('class1', {
                                            initialValue: modalData.class1,
                                        })(<Input disabled placeholder="请输入" />)}
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24}>
                                    <FormItem label={"联系电话"} >
                                        {getFieldDecorator('phone', {
                                            initialValue: modalData.phone,
                                        })(<Input required placeholder="请输入" />)}
                                    </FormItem>
                                </Col>
                                <Col md={24} sm={24}>
                                    <FormItem label={"起止日期"}>
                                        {getFieldDecorator('date', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: ("请选择起止日期！"),
                                                },
                                            ],
                                        })(
                                            <RangePicker
                                                style={{ width: '100%' }}
                                                placeholder={[
                                                    ("开始日期"),
                                                    ("结束日期"),
                                                ]}
                                            />
                                        )}
                                        原:<span style={{ color: '#CE0000', fontSize: 22, }}>{modalData.starttime}————{modalData.endtime}</span>
                                    </FormItem>
                                </Col>
                                <Col md={24} sm={24}>
                                    <FormItem label={"请假原因"}>
                                        {getFieldDecorator('reason', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: ("请输入请假原因！"),
                                                },
                                            ],
                                            initialValue: modalData.reason,
                                        })(
                                            <TextArea
                                                style={{ minHeight: 32 }}
                                                placeholder={("请输入请假原因")}
                                                rows={4}
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem label={"类型"} >
                                        {getFieldDecorator('type', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: ("请选择请假类型！"),
                                                },
                                            ],
                                        })(<Select
                                            labelInValue
                                            style={{ width: '100%' }}
                                            placeholder={"请选择"}>
                                            <Option value={"病假"}>{"病假"}</Option>
                                            <Option value={"事假"}>{"事假"}</Option>
                                        </Select>)}
                                        原:<span style={{ color: '#CE0000', fontSize: 22, }}>{modalData.type}</span>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </Modal> : <Modal
                        visible={this.state.visible}
                        title="详情"
                        // onOk={this.handleOK}
                        onCancel={this.handleCancel}
                        // okButtonProps={{ disabled: true }}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>
                                取消
                    </Button>,
                            <Button key="submit" type="primary" onClick={this.handleOK}>
                                提交
                    </Button>,
                        ]}
                    >
                        <Form >
                            {getFieldDecorator('vid', {
                                initialValue: modalData.vid,
                            })(<Input hidden disabled placeholder="请输入" />)}
                            {getFieldDecorator('result', {
                                initialValue: modalData.result,
                            })(<Input hidden disabled placeholder="请输入" />)}
                            {getFieldDecorator('status', {
                                initialValue: modalData.status,
                            })(<Input hidden disabled placeholder="请输入" />)}
                            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                                <Col md={8} sm={24}>
                                    <FormItem label={"姓名"} >
                                        {getFieldDecorator('name', {
                                            initialValue: modalData.name,
                                        })(<Input disabled placeholder="请输入" />)}
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24}>
                                    <FormItem label={"学号"} >
                                        {getFieldDecorator('id', {
                                            initialValue: modalData.id,
                                        })(<Input disabled placeholder="请输入" />)}
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24}>
                                    <FormItem label={"年级"} >
                                        {getFieldDecorator('grade', {
                                            initialValue: modalData.grade,
                                        })(<Input disabled placeholder="请输入" />)}
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24}>
                                    <FormItem label={"班级"} >
                                        {getFieldDecorator('class1', {
                                            initialValue: modalData.class1,
                                        })(<Input disabled placeholder="请输入" />)}
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24}>
                                    <FormItem label={"联系电话"} >
                                        {getFieldDecorator('phone', {
                                            initialValue: modalData.phone,
                                        })(<Input required placeholder="请输入" />)}
                                    </FormItem>
                                </Col>
                                <Col md={24} sm={24}>
                                    <FormItem label={"起止日期"}>
                                        {getFieldDecorator('date', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: ("请选择起止日期！"),
                                                },
                                            ],
                                        })(
                                            <RangePicker
                                                style={{ width: '100%' }}
                                                placeholder={[
                                                    ("开始日期"),
                                                    ("结束日期"),
                                                ]}
                                            />
                                        )}
                                        原:<span style={{ color: '#CE0000', fontSize: 22, }}>{modalData.starttime}————{modalData.endtime}</span>
                                    </FormItem>
                                </Col>
                                <Col md={24} sm={24}>
                                    <FormItem label={"请假原因"}>
                                        {getFieldDecorator('reason', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: ("请输入请假原因！"),
                                                },
                                            ],
                                            initialValue: modalData.reason,
                                        })(
                                            <TextArea
                                                style={{ minHeight: 32 }}
                                                placeholder={("请输入请假原因")}
                                                rows={4}
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem label={"类型"} >
                                        {getFieldDecorator('type', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: ("请选择请假类型！"),
                                                },
                                            ],
                                        })(<Select
                                            labelInValue
                                            style={{ width: '100%' }}
                                            placeholder={"请选择"}>
                                            <Option value={"病假"}>{"病假"}</Option>
                                            <Option value={"事假"}>{"事假"}</Option>
                                        </Select>)}
                                        原:<span style={{ color: '#CE0000', fontSize: 22, }}>{modalData.type}</span>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </Modal> : null}

            </PageHeaderWrapper>
        )
    }
}