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
            message.success('删除成功');
            onDelete(id);
        } else {
            message.error(res.errorMessage);
        }
    }

    function cancelHandle() {
        message.info('Cancel.')
    }
    return (
        <Popconfirm
            title='删除用户'
            onCancel={cancelHandle}
            onConfirm={deleteUser}
        >
            <Button type='primary' danger>
                删除
            </Button>
        </Popconfirm>
    )
}

export default DeleteUser