import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { getLogininfo } from '@/utils/logininfo';
import { Button, Upload, Rate, message, Card, Row, Col } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';
import DataSet from '@antv/data-set';

@connect(({ stuInfo, loading }) => ({
  stuinfoList: stuInfo.stuInfocontent,
  stuinfoLoading: loading.effects['stuInfo/getStuInfo'],
}))
export default class UploadFile extends PureComponent {
  state = {
    visia: false,
    fileList: [],
    fileList2: [],
  };

  componentDidMount() {
    const { dispatch, stuinfoList } = this.props;
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

  downloadFormat = info => {
    window.location.href = `http://localhost:8000/api/fileupload1?name=格式文件.xlsx`;
  };

  handleChange = info => {
    let fileList = [...info.fileList];

    fileList = fileList.slice(-1);

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

  handleChange2 = info => {
    let fileList = [...info.fileList];

    fileList = fileList.slice(-1);

    fileList = fileList.map(file => {
      if (file.response) {
        this.errStr = file.response.errStr;
        // window.location.href = `http://localhost:8000/api/fileupload1?name=` + file.response.errFile;
        // file.url = `http://localhost:8000/api/fileupload1?name=` + file.response.errFile;
        const { dispatch, stuinfoList } = this.props;
        this.setState({
          visia: true,
        });
      }
      return file;
    });
    this.setState({ fileList2: fileList });
  };

  settleData = item => {
    var newData = [
      {
        item: '正文部分',
        count: parseInt(item.text_cata) + parseInt(item.text_lit) + parseInt(item.text_part),
      },
      {
        item: '页面部分',
        count: parseInt(item.page_size),
      },
      {
        item: '页边距部分',
        count: parseInt(item.page_mar),
      },
      {
        item: '页码部分',
        count: parseInt(item.footer_err),
      },
      {
        item: '论文标题部分',
        count: parseInt(item.abstract_header) + parseInt(item.abstract_major),
      },
      {
        item: '论文摘要部分',
        count: parseInt(item.abstract_abs) + parseInt(item.abstract_key),
      },
      {
        item: '大纲标题部分',
        count:
          parseInt(item.text_header1) + parseInt(item.text_header2) + parseInt(item.text_header3),
      },
    ];
    return newData;
  };

  settleData2 = item => {
    var newData = [
      {
        item: '正文',
        count: parseInt(item.text_part),
      },
      {
        item: '目录',
        count: parseInt(item.text_cata),
      },
      {
        item: '论文标题',
        count: parseInt(item.abstract_header),
      },
      {
        item: '专业行',
        count: parseInt(item.abstract_major),
      },
      {
        item: '摘要',
        count: parseInt(item.abstract_abs),
      },
      {
        item: '关键词',
        count: parseInt(item.abstract_key),
      },
      {
        item: '大纲标题1',
        count: parseInt(item.text_header1),
      },
      {
        item: '大纲标题2',
        count: parseInt(item.text_header2),
      },
      {
        item: '大纲标题3',
        count: parseInt(item.text_header3),
      },
      {
        item: '参考文献',
        count: parseInt(item.text_lit),
      },
      {
        item: '页面',
        count: parseInt(item.page_size),
      },
      {
        item: '页边距',
        count: parseInt(item.page_mar),
      },
      {
        item: '页码',
        count: parseInt(item.footer_err),
      },
    ];
    return newData;
  };

  render() {
    const { stuinfoList, stuinfoLoading } = this.props;
    const { visia } = this.state;
    const studata = stuinfoList || [];
    const errStr = null;
    const pen = ((studata.ratescore / studata.ratecount) * 20).toString().substring(0, 5);

    const { DataView } = DataSet;
    const dv = new DataView();
    const cols = {
      percent: {
        formatter: val => {
          val = (val * 100).toFixed(2) + '%';
          return val;
        },
      },
    };
    const cols2 = {
      sales: {
        tickInterval: 20,
      },
    };
    function getXY(c, { index: idx = 0, field = 'percent', radius = 0.5 }) {
      const d = c.get('data');
      if (idx > d.length) return;
      const scales = c.get('scales');
      let sum = 0;
      for (let i = 0; i < idx + 1; i++) {
        let val = d[i][field];
        if (i === idx) {
          val = val / 2;
        }
        sum += val;
      }
      const pt = {
        y: scales[field].scale(sum),
        x: radius,
      };
      const coord = c.get('coord');
      let xy = coord.convert(pt);
      return xy;
    }

    var allItem = [];
    var allItem2 = [];
    var data = this.settleData(studata);
    var data2 = this.settleData2(studata);

    if (studata) {
      var data = this.settleData(studata);
      dv.source(data).transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent',
      });

      allItem = (
        <div>
          <h1>错误部分比例</h1>
          <Chart
            height={350}
            // width={'auto'}
            data={dv}
            scale={cols}
            padding={[0, 10, 80, 10]}
            forceFit={true}
            onGetG2Instance={c => {
              const xy = getXY(c, { index: 0 });
              c.showTooltip(xy);
            }}
          >
            <Coord type="theta" radius={0.75} />
            <Axis name="percent" />
            <Legend
              // position="right"
              offsetX={10}
              offsetY={0}
            />
            <Tooltip
              //triggerOn='none'
              showTitle={false}
              itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
            />
            <Geom
              type="intervalStack"
              position="percent"
              color="item"
              tooltip={[
                'item*percent',
                (item, percent) => {
                  percent = (percent * 100).toFixed(2) + '%';
                  return {
                    name: item,
                    value: percent,
                  };
                },
              ]}
              style={{
                lineWidth: 1,
                stroke: '#fff',
              }}
            >
              <Label
                content="percent"
                formatter={(val, item) => {
                  return item.point.item + ': ' + val;
                }}
              />
            </Geom>
          </Chart>
        </div>
      );
      allItem2 = (
        <div>
          <h1>错误点次数</h1>
          <Chart padding={'auto'} height={350} data={data2} scale={cols2} forceFit>
            <Axis name="item" />
            <Axis name="count" />
            <Tooltip
            // crosshairs用于设置 tooltip 的辅助线或者辅助框
            // crosshairs={{
            //  type: "y"
            // }}
            />
            <Geom type="interval" position="item*count" />
          </Chart>
        </div>
      );
    }

    const uploadFile = {
      name: 'file',
      action: '/api/fileupload', //图片上传接口
      onChange: this.handleChange,
      multiple: true,
      accept: '.docx,.xlsx',
    };

    const uploadFile2 = {
      name: 'file',
      action: '/api/fileupload', //图片上传接口
      onChange: this.handleChange2,
      multiple: true,
      accept: '.xlsx',
    };

    return (
      <PageHeaderWrapper
        title={'论文格式检测'}
        content={'此处为格式检测，请选择论文文件后进行检测！'}
      >
        <Row>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            {allItem}
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            {allItem2}
          </Col>
        </Row>
        <Row>
          <div style={{ float: 'left' }}>
            <Button type={'primary'} onClick={this.downloadFormat}>
              获取格式文档
            </Button>
          </div>
          <div style={{ float: 'left', paddingLeft: '5px' }}>
            <p style={{ color: 'red' }}>通过获取格式文档修改后上传，即可使用自定义格式</p>
          </div>
        </Row>
        <br />
        <Row gutter={20}>
          <Col>
            <div style={{ float: 'left' }}>
              <Upload {...uploadFile2} fileList={this.state.fileList2}>
                <Button type={'primary'}>上传格式文件</Button>
              </Upload>
            </div>
            <div style={{ float: 'left', paddingLeft: '5px' }}>
              <p style={{ color: 'red' }}>上传正确的格式文件即可自适应筛查</p>
            </div>
          </Col>
          <Col>
            <div style={{ float: 'left', marginLeft: '10px' }}>
              <Upload {...uploadFile} fileList={this.state.fileList}>
                <Button type={'primary'}>上传论文</Button>
              </Upload>
            </div>
            <div style={{ float: 'left', paddingLeft: '5px' }}>
              <p style={{ color: 'red' }}>点击上传的文件链接即可获取word样式的错误集</p>
            </div>
          </Col>
        </Row>

        <br />
        <br />
        <Row gutter={10}>
          <Col span={16}>
            <div>
              <Card title="错误信息">
                <p style={{ 'white-space': 'pre-wrap' }}> {this.errStr}</p>
              </Card>
            </div>
          </Col>
          <Col span={8}>
            <div>
              <h1>
                已检测 <span>{studata.testcount}</span> 份论文
              </h1>
              <h1>反馈准确率为 {pen}%</h1>
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
