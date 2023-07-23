import { Button, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { getUserList } from '../../api/user';
import { ColumnsType } from 'antd/es/table';
import DeleteUser from './components/DeleteUser';

function User() {

    const [list, setlist] = useState<User[]>([]);
    const dataSource = [...list];

    useEffect(() => {
        getListByPage();
    }, []);


    async function getListByPage() {
        const res = await getUserList();
        setlist(res.data.list);
    }

    async function onDelete(id: number) {
        // 前端分页（无需从后端重新获取list，用于少量数据）
        // setlist(list.filter((user) => user.id !== id));

        // 重新从后端拉取list
        await getListByPage();
    }

    const columns: ColumnsType<User> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '姓名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '管理',
            render(value, record, index) {
                return (
                    <Space>
                        <Button type='primary'>编辑</Button>
                        <DeleteUser id={record.id} onDelete={onDelete} />
                    </Space>
                )
            },
        },
    ];


    return (
        <Table rowKey={"id"} dataSource={dataSource} columns={columns} />
    )
}

export default User