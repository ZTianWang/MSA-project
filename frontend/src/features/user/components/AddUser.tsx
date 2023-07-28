import { Form, Input, Modal, message } from 'antd';
import React, { useEffect } from 'react'
import { createUser } from '../../../api/user';
import { useForm } from 'antd/es/form/Form';

interface Iprops {
    isModalOpen: boolean;
    closeModal(refresh?: boolean): Promise<void>;

}
function AddUser({ isModalOpen, closeModal }: Iprops) {

    const [form] = useForm();

    useEffect(() => {
        if (!isModalOpen) {
            form.resetFields();
        }
    }, [isModalOpen])


    function handleOk() {
        form.submit();
    }

    async function addUser(user: User) {
        const res = await createUser(user);
        if (res.success) {
            message.success('Success!');
            await closeModal(true);
        } else {
            message.error(res.errorMessage);
        }
    }

    return (
        <Modal
            title='Add User'
            open={isModalOpen}
            onOk={handleOk}
            onCancel={async () => await closeModal()}
            okText='Add'
        >
            <Form
                form={form}     // 获取表单的引用
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={addUser}
            >

                <Form.Item
                    label="用户名"
                    name={"username"}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="邮箱"
                    name={"email"}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!'
                        },
                        {
                            type: 'email',
                            message: 'Illegal email format!'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="密码"
                    name={"password"}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!'
                        },
                        {
                            min: 6,
                            message: 'Password at least 6 digits!'
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddUser