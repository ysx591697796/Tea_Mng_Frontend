import React, { Component } from 'react';
import { connect } from 'dva';
import {
    Form, Card, Row, Col, Layout,
    Select, Button, Table, Modal,
    DatePicker, Input, message
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { Option } = Select;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ vacate, loading, user }) => ({
    gradeList: vacate.Gradecontent,
    gradeListLoading: loading.effects['vacate/getGrade'],
    classList: vacate.Classcontent,
    classListLoading: loading.effects['vacate/getClass'],
    // vacateList: vacate.Vacatecontent,
    // vacateListLoading: loading.effects['vacate/getVacate'],
    infoList: user.InfoListcontent,
    infoListLoading: loading.effects['user/getInfoList'],
    currentUser: user.currentUser,
    vacateRes: vacate.addVacatecontent,
    submitting: loading.effects['vacate/addVacate'],
}))
@Form.create()
export default class DoVacate extends Component {
    state = {
        loading: false,
    }

    componentDidMount() {
        const { dispatch } = this.props;
    }

    handleInsert = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        const { getFieldValue } = this.props.form;
        // var name = getFieldValue('name');
        // var id = getFieldValue('id');
        // var grade = getFieldValue('grade');
        // var class1 = getFieldValue('class1');
        // var phone = getFieldValue('phone');
        // if (getFieldValue('date')) {
        //     var date1 = getFieldValue('date')[0];
        //     var date2 = getFieldValue('date')[1];
        //   }
        // var reason = getFieldValue('reason');
        var type = getFieldValue('type');
        var value = {};
        this.loading();
        value.name = getFieldValue('name');
        value.id = getFieldValue('id');
        value.grade = getFieldValue('grade');
        value.class1 = getFieldValue('class1');
        value.phone = getFieldValue('phone');
        value.reason = getFieldValue('reason');
        if(type && getFieldValue('date')){
            value.type = type['label'];
        if (getFieldValue('date')) {
            value.starttime = getFieldValue('date')[0];
            value.endtime = getFieldValue('date')[1];
        }
        dispatch({
            type: 'vacate/addVacate',
            payload: value,
            callback: function (params) {
                this.setState({
                    loading: false,
                });
                message.success("提交成功！");
            }.bind(this)
        });
        }else{
            message.warning('请填写请假原因及请假时间！');
        }
    }

    loading = () => {
        this.setState({
            loading: true,
        })
    }

    render() {
        const {
            currentUser,
            submitting,
            vacateRes,
        } = this.props;
        const { getFieldDecorator } = this.props.form;

        // const { result } = vacateRes;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
                md: { span: 10 },
            },
        };

        const submitFormLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 10, offset: 7 },
            },
        };

        return (
            <PageHeaderWrapper
                title={"提交请假申请"}
                content={"此表单为短期请假申请表单，请如实填写！"}
            >
                <Card bordered={false}>
                    <Form onSubmit={this.handleInsert}>
                        <FormItem {...formItemLayout} label={"姓名"} >
                            {getFieldDecorator('name', {
                                initialValue: currentUser.name,
                            })(<Input disabled placeholder="请输入" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"学号"} >
                            {getFieldDecorator('id', {
                                initialValue: currentUser.userid,
                            })(<Input disabled placeholder="请输入" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"年级"} >
                            {getFieldDecorator('grade', {
                                initialValue: currentUser.grade,
                            })(<Input disabled placeholder="请输入" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"班级"} >
                            {getFieldDecorator('class1', {
                                initialValue: currentUser.class1,
                            })(<Input disabled placeholder="请输入" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"联系电话"} >
                            {getFieldDecorator('phone', {
                                initialValue: currentUser.phone,
                            })(<Input required placeholder="请输入" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"起止日期"}>
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
                        </FormItem>
                        <FormItem {...formItemLayout} label={"请假原因"}>
                            {getFieldDecorator('reason', {
                                rules: [
                                    {
                                        required: true,
                                        message: ("请输入请假原因！"),
                                    },
                                ],
                            })(
                                <TextArea
                                    style={{ minHeight: 32 }}
                                    placeholder={("请输入请假原因")}
                                    rows={4}
                                />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label={"类型"} >
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
                                <Option key={"1"}>{"病假"}</Option>
                                <Option key={"2"}>{"事假"}</Option>
                            </Select>)}
                        </FormItem>
                        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                            <Button type="primary" htmlType="submit" loading={submitting}>
                                提交
                            </Button>
                            <Button disabled style={{ marginLeft: 8 }}>
                                保存草稿
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </PageHeaderWrapper>
        )
    }
}