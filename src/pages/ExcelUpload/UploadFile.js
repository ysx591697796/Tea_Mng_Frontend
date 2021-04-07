import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { getLogininfo } from '@/utils/logininfo';
import { Button, Upload, Rate, message, Card, Row, Col } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ stuInfo, loading }) => ({
  stuinfoList: stuInfo.stuInfocontent,
  stuinfoLoading: loading.effects['stuInfo/getStuInfo'],
}))
export default class UploadFile extends PureComponent {
  state = {
    visia: false,
    fileList: [],
  };

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

  handleRate = info => {
    const { dispatch, stuinfoList } = this.props;
    let temp = {
      username: stuinfoList.username,
      rateScore: info,
    };
    this.setState({
      visia: false,
    });
    message.success('感谢您的评价！');
    dispatch({
      type: 'user/upInfoPhone',
      payload: temp,
    });
  };

  handleChange = info => {
    let fileList = [...info.fileList];

    fileList = fileList.slice(-1);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        this.errStr = file.response.errStr;
        // window.location.href = `http://localhost:8000/api/fileupload1?name=` + file.response.errFile;
        file.url = `http://localhost:8000/api/fileupload1?name=` + file.response.errFile;
        const { dispatch, stuinfoList } = this.props;
        let temp = {
          username: stuinfoList.username,
        };
        dispatch({
          type: 'user/upInfoPhone',
          payload: temp,
        });
        this.setState({
          visia: true,
        });
      }
      return file;
    });

    this.setState({ fileList });
  };

  render() {
    const { stuinfoList, stuinfoLoading } = this.props;
    const { visia } = this.state;
    const studata = stuinfoList;
    const errStr = null;
    const pen = ((studata.ratescore / studata.ratecount) * 20).toString().substring(0, 5);
    console.log('pen', pen);
    // console.log("studata", studata);

    const uploadFile = {
      name: 'file',
      action: '/api/fileupload', //图片上传接口
      onChange: this.handleChange,
      multiple: true,
      accept: '.docx',
    };

    return (
      <PageHeaderWrapper
        title={'论文格式检测'}
        content={'此处为格式检测，请选择论文文件后进行检测！'}
      >
        <Row>
          <div style={{ float: 'left' }}>
            <Upload {...uploadFile} fileList={this.state.fileList}>
              <Button type={'primary'}>上传论文</Button>
            </Upload>
          </div>
          <div style={{ float: 'left', paddingLeft: '5px' }}>
            <p style={{ color: 'red' }}>点击上传的文件链接即可获取word样式的错误集</p>
          </div>
        </Row>

        <br />
        <br />
        <Row gutter={10}>
          <Col span={12}>
            <div>
              <Card title="错误信息">
                <p>{this.errStr}</p>
              </Card>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <h1>
                已检测 <span>{studata.testcount}</span> 份论文
              </h1>
              <h1>反馈准确率为 {pen}%</h1>
              <br />
              <br />
              <br />
              {visia ? (
                <div>
                  <h1>诚恳望您留下测评准确率，谢谢！</h1>
                  <Rate onChange={this.handleRate} allowHalf defaultValue={4.5} />
                  <br />
                  <br />
                </div>
              ) : null}
            </div>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}
