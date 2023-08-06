import { Button, Popconfirm, message } from 'antd';
import React from 'react'
import { deleteItemById } from '../../../api/item';

interface IProps {
    id: number;
    onDelete(id: number): void;
}

function DeleteItem({ id, onDelete }: IProps) {

    async function deleteItem() {
        const res = await deleteItemById(id);
        if (res.success) {
            message.success(res.message);
            onDelete(id);
        } else {
            message.error(res.message);
        }
    }

    function cancelHandle() {
        message.info('Cancel.')
    }

    return (
        <Popconfirm
            title='Delete Item?'
            onCancel={cancelHandle}
            onConfirm={deleteItem}
        >
            <Button type='primary' danger>
                Delete
            </Button>
        </Popconfirm>
    )
}

export default DeleteItem