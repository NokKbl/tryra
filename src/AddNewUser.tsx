import React from 'react';

import { Button, Modal, Form, Input, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { Select } from 'antd';
import { data, User} from './App';
import App from './App';
import ReactDOM from 'react-dom';

import 'antd/dist/antd.css';
import './AddNewUser.css'

interface State {
    visible: boolean;
}

// const Search = Input.Search;
const { Option } = Select;
let id: number = 4;

const role_opt = [
    <Option value={"Admin"}>Admin</Option>,
    <Option value={"Reader"}>Reader</Option>,
    <Option value={"Writer"}>Writer</Option>
]

class NewUser extends React.Component<FormComponentProps> {
    state: State = {
        visible: false,
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        const form = this.props.form;
        form.resetFields();
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            const newdata: User = {
                id: id++,
                firstName: values['firstName'],
                lastName: values['lastName'],
                roles: values['role'],
            }
            data.push(newdata);
            ReactDOM.render(<App />, document.getElementById('root'));
            form.resetFields();
            this.setState({ visible: false });
        });
    };
    
    render() {
        const { getFieldDecorator } = this.props.form;
        
        function handleChange(value) {
            console.log(`selected ${value}`);
        };

        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    <Icon type="plus" /> Add
                </Button>
                <Modal
                    visible={this.state.visible}
                    title="Add New User"
                    okText="Add User"
                    onCancel={this.handleCancel}
                    onOk={this.handleCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="First Name:">
                            {getFieldDecorator('firstName', {
                                rules: [{ required: true, message: 'Please input your first name!' }],
                            })(<Input style={{ width: '60%' }} />)}
                        </Form.Item>
                        <Form.Item label="Last Name:">
                            {getFieldDecorator('lastName', {
                                rules: [{ required: true, message: 'Please input your last name!' }],
                            })(<Input style={{ width: '60%' }} />)}
                        </Form.Item>
                        <Form.Item label="Role(s):">
                            {getFieldDecorator('role', {
                                rules: [{ required: true, message: 'Please select a role!' }],
                            })(
                                <Select
                                    mode="multiple"
                                    style={{ width: '60%' }}
                                    placeholder="select one role"
                                    onChange={handleChange}
                                >
                                    {role_opt}
                                </Select>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
                {/* <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    style={{ width: 400, paddingLeft: 15 }}
                /> */}
            </div>
        );
    }
}

const AddNewUser = Form.create()(NewUser);

export default AddNewUser;