import React from 'react'
import { Modal, Button, message} from 'antd';
import {CreatePostForm} from "./CreatePostForm"
import $ from "jquery"
import {API_ROOT, POS_KEY, AUTH_REFLIX, TOKEN_KEY} from "../constants"


export class CreatePostButton extends React.Component {
    state = {
        visible: false,
        confirmLoading: false,
    }

    showModal = () => {
        this.setState({
            visible: true,
            method: 'POST',

        });
    }

    handleOk = () => {
        this.form.validateFields((err, values) => {
            if(!err) {
                console.log(values);

                this.setState({
                    confirmLoading: true,
                });

                const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
                const formData = new FormData();
                formData.set('lat', lat)
                formData.set('lon', lon)

                formData.set('message', values.message)
                formData.set('image', values.image[0])
                $.ajax({
                    url: `${API_ROOT}/post`,
                    method: 'POST',
                    data: formData,
                    headers: {
                        Authorization: `${AUTH_REFLIX} ${localStorage.getItem(TOKEN_KEY)}`,
                    },
                    processData: false,
                    contentType: false,
                    dataType: 'text',
                }).then((res) => {
                    this.props.loadNearbyPosts(lat, lon).then(() => {
                        this.setState({confirmLoading: false, visible: false});
                    })
                }, (err) => {
                    message.error(err.responseText)
                }).catch((err) => {
                    console.log(err);
                });
            }
        });
    }

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }

    saveFormRef = (form) => {
         this.form = form;
    }

    render() {
        const { visible, confirmLoading} = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Create New Post
                </Button>
                <Modal
                    title="Create New Post"
                    visible={visible}
                    onOk={this.handleOk}
                    okText="create"
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <CreatePostForm ref={this.saveFormRef}/>
                </Modal>
            </div>
        );
    }
}
