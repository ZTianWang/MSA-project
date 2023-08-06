import { Button, Popconfirm, message } from 'antd';
import React from 'react'
import { deleteUserById } from '../../../api/user';

interface IProps {
    id: number;
    onDelete(id: number): void;
}

function DeleteUser({ id, onDelete }: IProps) {

    async function deleteUser() {
        const res = await deleteUserById(id);
        if (res.success) {
            message.success('Delete Success!');
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
            title='Delete User?'
            onCancel={cancelHandle}
            onConfirm={deleteUser}
        >
            <Button type='primary' danger>
                Delete
            </Button>
        </Popconfirm>
    )
}

export default DeleteUser