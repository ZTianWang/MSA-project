import { Form, Input, Modal, message } from 'antd'
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react'
import { updateUser } from '../../../api/user';

interface Iporps {
    user: User;
    isModalOpen: boolean;
    closeModal(): void;
    refresh(): Promise<void>;
}
function EditUser({ user, isModalOpen, closeModal, refresh }: Iporps) {

    // 获取表单的引用
    // form.submit()提交表单（调用Form的onFinish事件）
    const [form] = useForm();

    useEffect(() => {
        if (isModalOpen) {
            form.resetFields();     // Form.resetFields(): 重新填充字段
            console.log(user);

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isModalOpen]);

    function handleOk() {
        form.submit();
    }

    async function handleSaveUser(userInfo: User) {
        if (!userInfo.password || userInfo.password === "") {
            delete userInfo.password;
        }
        const res = await updateUser(userInfo);
        if (res.success) {
            message.success('Success!');
            closeModal();
            await refresh();
        } else {
            message.error(res.errorMessage);
        }
    }

    function handleSubmitFailed() { }

    return (
        <Modal
            forceRender     // 强制刷新组件
            title='Edit User Info'
            open={isModalOpen}
            onOk={handleOk}
            onCancel={closeModal}
        >
            <Form
                form={form}     // 获取表单的引用
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{
                    ...user,
                }}
                onFinish={handleSaveUser}
                onFinishFailed={handleSubmitFailed}
            >
                {/* 从表单中获取id的方式 */}
                <Form.Item label="id" name={"id"} hidden>
                    <Input />
                </Form.Item>
                <Form.Item label="用户名" name={"username"}>
                    <Input />
                </Form.Item>
                <Form.Item label="邮箱" name={"email"}>
                    <Input />
                </Form.Item>
                <Form.Item label="密码" name={"password"}>
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditUser