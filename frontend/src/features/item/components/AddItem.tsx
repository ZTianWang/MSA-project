import { Form, Input, Modal, message } from 'antd';
import React, { useEffect } from 'react'
import { useForm } from 'antd/es/form/Form';
import { createItem } from '../../../api/item';

interface Iprops {
    isModalOpen: boolean;
    closeModal(refresh?: boolean): Promise<void>;
}

function AddItem({ isModalOpen, closeModal }: Iprops) {

    const [form] = useForm();

    useEffect(() => {
        if (!isModalOpen) {
            form.resetFields();
        }
    }, [isModalOpen])

    function handleOk() {
        form.submit();
    }

    async function addItem(item: Item) {
        const res = await createItem(item);
        if (res.success) {
            message.success(res.message);
            await closeModal(true);
        } else {
            message.error(res.message);
        }
    }

    return (
        <Modal
            title='Add Item'
            open={isModalOpen}
            onOk={handleOk}
            onCancel={async () => await closeModal()}
            okText='Add'
        >
            <Form
                form={form}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={addItem}
            >

                <Form.Item
                    label="Name"
                    name={"name"}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your item name!'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Price"
                    name={"price"}
                    rules={[
                        {
                            required: true,
                            message: 'Please input Price!'
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name={"description"}
                    rules={[]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Stock Quantity"
                    name={"stockQuantity"}
                    rules={[]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Sold Quantity"
                    name={"soldQuantity"}
                    rules={[]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddItem