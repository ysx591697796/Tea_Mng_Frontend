import React, { PureComponent } from 'react';
import { Form, Button, Icon, Upload } from 'antd';

export default class UploadFile extends PureComponent {
  render() {
    const uploadFile = {
      name: 'file',
      action: '/api/fileupload', //图片上传接口
      //             listType: "picture-card",
      //             defaultFileList: [... fileList],
      //             className : "upload-list-inline",
      //             beforeUpload : this. beforeUpload,
      //             onChange: this. uplodChange. bind( this),
      //             onRemove ：this.onRemove,
    };

    return (
      <Upload {...uploadFile}>
        <Button>Click to Upload</Button>
      </Upload>
    );
  }
}
