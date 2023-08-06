import { Button, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { getUserList } from '../../api/user';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import DeleteUser from './components/DeleteUser';
import EditUser from './components/EditUser';
import AddUser from './components/AddUser';

function User() {

    const [list, setlist] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User>({} as User);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    // 设置分页器：位置 + 是否显示每页条数
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        position: ["bottomCenter"],
        showSizeChanger: false,
    })

    const dataSource = [...list];

    useEffect(() => {
        getListByPage();
    }, []);


    async function getListByPage(currentPage: number = 1) { //参数：
        const res = await getUserList();
        setlist(res.data.list);
        setPagination({
            ...pagination,
            // 后端应返回分页数据（本例后端数据有误）
            // ...res.data,
        });
    }

    async function onDelete(id: number) {
        // 前端分页（无需从后端重新获取list，用于少量数据）
        // setlist(list.filter((user) => user.id !== id));

        // 重新从后端拉取list
        await getListByPage();
    }

    function handleClickEdit(user: User) {
        setCurrentUser(user);
        setIsEditModalOpen(true);
    }

    const columns: ColumnsType<User> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Management',
            render(value, record, index) {
                return (
                    <Space>
                        <Button
                            type='primary'
                            onClick={() => handleClickEdit(record)}
                        >Edit</Button>
                        <DeleteUser id={record.id} onDelete={onDelete} />
                    </Space>
                )
            },
        },
    ];

    function onCloseEditModal(): void {
        setIsEditModalOpen(false);
    }

    async function onCloseAddModal(refresh?: boolean) {
        if (refresh) {
            await getListByPage();
        }
        setIsAddModalOpen(false);
    }

    return (
        <>

            <EditUser
                user={currentUser}
                isModalOpen={isEditModalOpen}
                closeModal={onCloseEditModal}
                refresh={async () => {
                    await getListByPage();
                }}
            />
            <AddUser
                isModalOpen={isAddModalOpen}
                closeModal={onCloseAddModal}
            />
            <Button
                type='primary'
                onClick={() => setIsAddModalOpen(true)}
            >
                Add User
            </Button>
            <Table
                rowKey={"id"}
                pagination={pagination}     // 设置Table分页器
                dataSource={dataSource}
                columns={columns}
            />
        </>
    )
}

export default User