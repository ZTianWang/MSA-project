import React from 'react'
import { Button, Checkbox, Form, Input, Space, message } from 'antd';
import { doLogin } from '../../api/login';
import './login.scss'
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
    async function login(value: Login) {
        try {
            const res = await doLogin(value);
            if (res.success) {
                localStorage.setItem('token', res.data.token);
                navigate('/');
            } else {
                message.error(res.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div id='login-container'>
                <Form
                    id='login-form'
                    onFinish={login}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ account: 'admin', password: 'admin' }}
                >
                    <Form.Item
                        label="Account: "
                        name="account"
                        // rule检验
                        rules={[
                            {
                                required: true,
                                message: 'Please input your account!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password: "
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!'
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="reset">
                                Reset
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default Login;