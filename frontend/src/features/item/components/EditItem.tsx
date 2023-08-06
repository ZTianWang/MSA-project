import { Form, Input, Modal, message } from 'antd'
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react'
import { updateItem } from '../../../api/item';

interface Iporps {
    item: Item;
    isModalOpen: boolean;
    closeModal(): void;
    refresh(): Promise<void>;
}

function EditItem({ item, isModalOpen, closeModal, refresh }: Iporps) {

    const [form] = useForm();

    useEffect(() => {
        if (isModalOpen) {
            form.resetFields();
            // console.log(user);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isModalOpen]);

    function handleOk() {
        form.submit();
    }

    async function handleSaveItem(item: Item) {
        const res = await updateItem(item);
        if (res.success) {
            message.success(res.message);
            closeModal();
            await refresh();
        } else {
            message.error(res.message);
        }
    }

    function handleSubmitFailed() { }

    return (
        <Modal
            forceRender
            title='Edit User Info'
            open={isModalOpen}
            onOk={handleOk}
            onCancel={closeModal}
        >
            <Form
                form={form}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{
                    ...item,
                }}
                onFinish={handleSaveItem}
                onFinishFailed={handleSubmitFailed}
            >
                <Form.Item label="Id" name={"Id"} hidden>
                    <Input />
                </Form.Item>
                <Form.Item label="Item Name" name={"Name"}>
                    <Input />
                </Form.Item>
                <Form.Item label="Price" name={"Price"}>
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name={"Description"}>
                    <Input />
                </Form.Item>
                <Form.Item label="Stock Quantity" name={"StockQuantity"}>
                    <Input />
                </Form.Item>
                <Form.Item label="Sold Quantity" name={"SoldQuantity"}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditItem