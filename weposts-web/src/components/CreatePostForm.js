import {Form, Input, Icon, Upload} from 'antd';
import React from 'react';
const FormItem = Form.Item

class CreateRegularForm extends React.Component {

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    beforeUpload = (e) => {
        return false;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };


        return (
            <Form layout='vertical'>
                <FormItem label="Message" {...formItemLayout}>
                    {getFieldDecorator('message', {
                        rules: [{ required: true, message: 'Please input the message of collection.'}],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Image"
                >
                    <div className="dropbox">
                        {getFieldDecorator('image', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                            rules: [{ required: true, message: 'Please input the image of collection.' }],
                        })(
                            <Upload.Dragger name="files" action="/upload.do" beforeUpload={this.beforeUpload}>
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                            </Upload.Dragger>
                        )}
                    </div>
                </FormItem>
            </Form>
        );
    }
}

 export const CreatePostForm = Form.create()(CreateRegularForm);